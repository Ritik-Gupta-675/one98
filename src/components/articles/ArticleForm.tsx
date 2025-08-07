"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import TiptapEditor from "@/components/ui/tiptapeditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TagInput } from "@/components/ui/tag-input";

const articleSchema = z.object({
  title: z.string(),
  content: z.string(),
  imageUrl: z.string(), // Will store stringified array
  tags: z.array(z.string()).optional(),
  category: z.array(z.string()).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  robots: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
  ogType: z.string().optional(),
  twitterCard: z.string().optional(),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  twitterImage: z.string().optional(),
  canonicalUrl: z.string().optional(),
  schemaData: z.string().optional(),
  header: z.string().optional(),
  body: z.string().optional(),
  showInNav: z.boolean().default(false),
  questionNumber: z.number().optional(),
  FAQ: z.string().optional(),
});

type ArticleFormData = z.infer<typeof articleSchema>;

interface ArticleFormProps {
  initialData?: ArticleFormData;
  onSubmit: (data: ArticleFormData) => void;
}

export const ArticleForm: React.FC<ArticleFormProps> = ({
  initialData,
  onSubmit,
}) => {
  const parseImageUrl = (url: string | undefined): [string, string] => {
    try {
      return JSON.parse(url || "[]") as [string, string];
    } catch (error) {
      return ["", ""];
    }
  };

  const getImageUrl = (url: string | undefined): string => {
    const [imageUrl] = parseImageUrl(url);
    return imageUrl;
  };

  const getImageAlt = (url: string | undefined): string => {
    const [, altText] = parseImageUrl(url);
    return altText;
  };

  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.imageUrl ? getImageUrl(initialData.imageUrl) : null
  );
  const [isUploading, setIsUploading] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    type: "error" | "success" | "warning";
  } | null>(null);

  const form = useForm<ArticleFormData>({
    resolver: (values) => {
      let errors = {};
      const messages = [];

      if (!values.title || values.title.length < 2) {
        messages.push("Title must be at least 2 characters");
        errors = {
          ...errors,
          title: { message: "" },
        };
      }

      if (!values.content || values.content.length < 10) {
        messages.push("Content must be at least 10 characters");
        errors = {
          ...errors,
          content: { message: "" },
        };
      }

      if (!values.imageUrl || !getImageUrl(values.imageUrl)) {
        messages.push("Image is required");
        errors = {
          ...errors,
          imageUrl: "Image URL is required",
        };
      }

      if (messages.length > 0) {
        setAlert({
          message: `Please fix the following:\n• ${messages.join("\n• ")}`,
          type: "error",
        });
        return { values: {}, errors };
      }

      setAlert(null);
      return { values, errors: {} };
    },
    defaultValues: {
      ...initialData,
      category: initialData?.category || [],
    },
  });

  const handleSubmitForm = (data: ArticleFormData) => {
    const transformedData = {
      ...data,
      category: data.category?.filter(Boolean) as string[],
    };

    onSubmit(transformedData);
  };

  const handleEditorChange = (content: string) => {
    form.setValue("content", content, { shouldValidate: true });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    
    if (!file) return;

    // Check file type
    if (!file.type.match('image.*')) {
      setAlert({
        message: 'Please upload an image file (JPEG, PNG, etc.)',
        type: 'error'
      });
      return;
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setAlert({
        message: 'Image size should be less than 5MB',
        type: 'error'
      });
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    
    reader.onloadend = async () => {
      try {
        // Show preview
        const result = reader.result as string;
        setImagePreview(result);

        // Upload to server
        const formData = new FormData();
        formData.append('featuredImage', file);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/upload`, {
          method: 'POST',
          body: formData,
          // Don't set Content-Type header, let the browser set it with the correct boundary
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const data = await response.json();
        
        // Update form with the new image URL
        form.setValue('imageUrl', JSON.stringify([data.url, '']), {
          shouldValidate: true,
        });
        
        setAlert({
          message: 'Image uploaded successfully',
          type: 'success'
        });
      } catch (error) {
        console.error('Error uploading image:', error);
        setAlert({
          message: 'Failed to upload image. Please try again.',
          type: 'error'
        });
      } finally {
        setIsUploading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="relative">
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className="space-y-8"
        >
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} className="border-[var(--admin-border)]" />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Image Upload */}
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <div className="space-y-4">
                <div>
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field: altField }) => (
                      <FormItem>
                        <FormLabel>Featured Image</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                disabled={isUploading}
                                className="border-[var(--admin-border)] cursor-pointer flex-1"
                              />
                            </div>
                            
                            {isUploading && (
                              <div className="flex items-center text-sm text-gray-500">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                                Uploading image...
                              </div>
                            )}
                            
                            <Input
                              placeholder="Image alt text"
                              value={getImageAlt(altField.value || '')}
                              onChange={(e) => {
                                const [imageUrl] = parseImageUrl(altField.value || '');
                                altField.onChange(
                                  JSON.stringify([imageUrl, e.target.value])
                                );
                              }}
                              className="mt-2"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {imagePreview ? (
                  <div className="space-y-2">
                    <div className="mt-4 relative w-full h-48 rounded-lg overflow-hidden border border-[var(--admin-border)]">
                      <img
                        src={imagePreview}
                        alt={getImageAlt(form.getValues('imageUrl')) || 'Preview'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-green-500">
                      Image ready to be saved with your article
                    </p>
                  </div>
                ) : initialData?.imageUrl ? (
                  <div className="space-y-2">
                    <div className="mt-4 relative w-full h-48 rounded-lg overflow-hidden border border-[var(--admin-border)]">
                      <img
                        src={getImageUrl(initialData.imageUrl)}
                        alt={getImageAlt(initialData.imageUrl) || 'Current article image'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-gray-500">Current article image</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-sm text-gray-500">No image selected</p>
                  </div>
                )}
              </div>
            )}
          />

          {/* Main Content */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Main Content <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <TiptapEditor
                    content={field.value}
                    onChange={handleEditorChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Tags */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <TagInput
                    value={value || []}
                    onChange={onChange}
                    placeholder="Add tags..."
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Metadata */}
          <div className="grid  gap-6">
            <FormField
              control={form.control}
              name="metaTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaKeywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Keywords</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="robots"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Robots</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value || "index,follow"}
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue="index,follow"
                    >
                      <SelectTrigger className="text-white">
                        <SelectValue placeholder="noindex, nofollow" />
                      </SelectTrigger>
                      <SelectContent className="text-white max-h-60 overflow-y-auto">
                        <SelectItem value="index,follow">
                          Index & Follow (Default)
                        </SelectItem>
                        <SelectItem value="noindex,follow">
                          No Index, Follow
                        </SelectItem>
                        <SelectItem value="index,nofollow">
                          Index, No Follow
                        </SelectItem>
                        <SelectItem value="noindex,nofollow">
                          No Index & No Follow
                        </SelectItem>
                        <SelectItem value="noarchive">No Archive</SelectItem>
                        <SelectItem value="nosnippet">No Snippet</SelectItem>
                        <SelectItem value="data-nosnippet">
                          Data No Snippet
                        </SelectItem>
                        <SelectItem value="max-snippet:0">
                          Max Snippet: None
                        </SelectItem>
                        <SelectItem value="max-snippet:-1">
                          Max Snippet: Unlimited
                        </SelectItem>
                        <SelectItem value="max-snippet:50">
                          Max Snippet: 50 Characters
                        </SelectItem>
                        <SelectItem value="noimageindex">
                          No Image Index
                        </SelectItem>
                        <SelectItem value="nocache">No Cache</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="all">All</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="canonicalUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Canonical URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="schemaData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Schema Data</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="header"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Header</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* FAQ Editor Section */}
            {/* <div className="space-y-4">
              <div>
                <Label>FAQs</Label>
                <FormField
                  control={form.control}
                  name="FAQ"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FAQEditor
                          value={field.value}
                          onChange={(value) => field.onChange(value)}
                        />
                      </FormControl>
                      <FormDescription>
                        Add frequently asked questions in a structured format.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div> */}
          </div>

          <Button
            disabled={isUploading}
            type="submit"
            className="mt-6 bg-slate-700 hover:bg-slate-800 text-white"
          >
            {isUploading ? "Uploading..." : "Save"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
