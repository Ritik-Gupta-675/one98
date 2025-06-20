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
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create New Article</CardTitle>
        </CardHeader>
        <CardContent>
          {errors.formErrors && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.formErrors}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Article Title</Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter article title"
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`flex h-10 w-full rounded-md border ${
                  errors.category ? "border-red-500" : "border-input"
                } bg-background px-3 py-2 text-sm`}
              >
                <option value="">Select Category</option>
                <option value="technology">Technology</option>
                <option value="programming">Programming</option>
                <option value="web-development">Web Development</option>
              </select>
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image</Label>
              <Input
                id="featuredImage"
                name="featuredImage"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setFeaturedImage(file);
                }}
                className={errors.featuredImage ? "border-red-500" : ""}
              />
              {errors.featuredImage && (
                <p className="text-sm text-red-500">{errors.featuredImage}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <div
                className={`border rounded-md ${
                  errors.content ? "border-red-500" : "border-input"
                }`}
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
                <p className="text-sm text-red-500">{errors.content}</p>
              )}
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
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
                className="bg-blue-600 hover:bg-blue-700"
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
