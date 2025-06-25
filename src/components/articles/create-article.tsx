import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TiptapEditor from "@/components/ui/tiptapeditor";
import axios from "axios";
import { env } from "../../config/env";

interface FormErrors {
  title?: string;
  category?: string;
  content?: string;
  featuredImage?: string;
  formErrors?: string;
}

export function CreateArticlePage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validate input
    const validationErrors: FormErrors = {};
    if (!title.trim()) validationErrors.title = "Title is required";
    if (!category) validationErrors.category = "Category is required";
    if (!content.trim()) validationErrors.content = "Content is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // First, upload the image if it exists
      let imageUrl = null;
      if (featuredImage) {
        console.log('Preparing to upload file:', featuredImage);
        const imageFormData = new FormData();
        imageFormData.append('featuredImage', featuredImage);
        
        // Log FormData contents for debugging
        for (let [key, value] of (imageFormData as any).entries()) {
          console.log(key, value);
        }
        
        console.log('Sending upload request to:', env.API + '/upload');
        try {
          const uploadRes = await axios.post(env.API + '/upload', imageFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('Upload response:', uploadRes.data);
          imageUrl = uploadRes.data.url;
        } catch (uploadError: any) {
          console.error('Upload failed:', uploadError);
          throw uploadError;
        }
      }

      // Then send the article data as JSON
      const articleData = {
        title,
        category,
        content,
        imageUrl,
        authorId: "1"
      };

      // Remove the /api from the URL since it's already included in env.API
      const res = await axios.post(env.API + '/articles', articleData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 201) {
        alert("Article created successfully!");
        setTitle("");
        setCategory("");
        setContent("");
        setFeaturedImage(null);
      } else {
        throw new Error("Unexpected error while creating article");
      }
    } catch (error) {
      console.error("Failed to create article:", error);
      setErrors({
        formErrors: "Failed to create article. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center py-8">
      <Card className="w-full max-w-3xl rounded-2xl shadow-2xl border border-blue-200/60 bg-white/95 backdrop-blur-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl font-bold text-blue-900 drop-shadow-sm">Create New Article</CardTitle>
        </CardHeader>
        <CardContent>
          {errors.formErrors && (
            <div className="mb-4 p-4 bg-red-50 border border-red-300 text-red-700 rounded-lg text-base font-medium">
              {errors.formErrors}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-blue-800 font-semibold">Article Title</Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter article title"
                className={`rounded-lg border-2 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-blue-50/60 ${errors.title ? "border-red-400" : "border-blue-200"}`}
              />
              {errors.title && (
                <p className="text-sm text-red-500 font-medium">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-blue-800 font-semibold">Category</Label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`flex h-11 w-full rounded-lg border-2 px-3 py-2 text-base bg-blue-50/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 ${errors.category ? "border-red-400" : "border-blue-200"}`}
              >
                <option value="">Select Category</option>
                <option value="technology">Technology</option>
                <option value="programming">Programming</option>
                <option value="web-development">Web Development</option>
              </select>
              {errors.category && (
                <p className="text-sm text-red-500 font-medium">{errors.category}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuredImage" className="text-blue-800 font-semibold">Featured Image</Label>
              <Input
                id="featuredImage"
                name="featuredImage"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setFeaturedImage(file);
                }}
                className={`rounded-lg border-2 bg-blue-50/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 ${errors.featuredImage ? "border-red-400" : "border-blue-200"}`}
              />
              {errors.featuredImage && (
                <p className="text-sm text-red-500 font-medium">{errors.featuredImage}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-blue-800 font-semibold">Content</Label>
              <div
                className={`rounded-lg border-2 bg-blue-50/60 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 ${errors.content ? "border-red-400" : "border-blue-200"}`}
              >
                <TiptapEditor
                  content={content}
                  onChange={(html) => {
                    setContent(html);
                    if (errors.content) {
                      setErrors((prev) => ({ ...prev, content: undefined }));
                    }
                  }}
                />
              </div>
              {errors.content && (
                <p className="text-sm text-red-500 font-medium">{errors.content}</p>
              )}
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="rounded-lg border-blue-300 text-blue-700 hover:bg-blue-50"
                onClick={() => {
                  setTitle("");
                  setCategory("");
                  setContent("");
                  setFeaturedImage(null);
                  setErrors({});
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 shadow-lg text-white font-semibold px-6 py-2 text-base"
              >
                {isSubmitting ? "Publishing..." : "Publish Article"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
