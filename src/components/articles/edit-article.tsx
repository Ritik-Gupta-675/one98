"use client";
import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TiptapEditor from "@/components/ui/tiptapeditor";


type Article = {
  id: string;
  title: string;
  content: string;
  category?: string;
  featuredImage?: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string | Date;
  updatedAt?: string | Date;
  author: {
    name: string;
    email: string;
    imageUrl?: string;
  };
};

type EditPropsPage = {
  article: Article;
};

const EditArticlePage: React.FC<EditPropsPage> = ({ article }) => {
  const [content, setContent] = useState<string>(article.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const formData = new FormData(event.currentTarget);
      formData.append("content", content);

      // Here you would typically make an API call to update the article
      console.log("Form data:", Object.fromEntries(formData.entries()));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Handle success
      alert("Article updated successfully!");
    } catch (error) {
      console.error("Error updating article:", error);
      setErrors({ form: "Failed to update article. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Edit Article</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Article Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={article.title}
                placeholder="Enter article title"
                required
              />
              {errors.title && (
                <span className="font-medium text-sm text-red-500">
                  {errors.title}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                defaultValue={article.category || ""}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                <option value="">Select Category</option>
                <option value="technology">Technology</option>
                <option value="programming">Programming</option>
                <option value="web-development">Web Development</option>
              </select>
              {errors.category && (
                <span className="font-medium text-sm text-red-500">
                  {errors.category}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image</Label>
              {article.featuredImage && (
                <div className="mb-4">
                  <img
                    src={article.featuredImage}
                    alt="Current featured"
                    width={192}
                    height={128}
                    className="object-cover rounded-md"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Current featured image
                  </p>
                </div>
              )}
              <Input
                id="featuredImage"
                name="featuredImage"
                type="file"
                accept="image/*"
              />
              {errors.featuredImage && (
                <span className="font-medium text-sm text-red-500">
                  {errors.featuredImage}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <TiptapEditor 
                content={content} 
                onChange={(newContent: string) => setContent(newContent)} 
              />
              {errors.content && (
                <span className="font-medium text-sm text-red-500">
                  {errors.content}
                </span>
              )}
            </div>

            {errors.form && (
              <div className="text-red-500 text-sm mt-2">
                {errors.form}
              </div>
            )}

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" disabled={isSubmitting}>
                Discard Changes
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Update Article"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditArticlePage;