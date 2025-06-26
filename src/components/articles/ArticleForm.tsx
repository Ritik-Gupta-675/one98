import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TiptapEditor from "@/components/ui/tiptapeditor";
import axios from "axios";
import { env } from "../../config/env";

export interface Article {
  id?: string;
  title: string;
  content: string;
  category: string;
  featuredImage?: string;
  authorId?: string;
}

interface ArticleFormProps {
  isEditMode?: boolean;
  initialArticle?: Article;
  onSuccess?: () => void;
}

interface FormErrors {
  title?: string;
  category?: string;
  content?: string;
  featuredImage?: string;
  formErrors?: string;
}

export function ArticleForm({ isEditMode = false, initialArticle, onSuccess }: ArticleFormProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [title, setTitle] = useState<string>(initialArticle?.title || "");
  const [category, setCategory] = useState<string>(initialArticle?.category || "");
  const [content, setContent] = useState<string>(initialArticle?.content || "");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string>(initialArticle?.featuredImage || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(isEditMode && !initialArticle);

  // Fetch article data if in edit mode and no initialArticle is provided
  useEffect(() => {
    const fetchArticle = async () => {
      if (!isEditMode || !id || initialArticle) return;
      
      try {
        setIsLoading(true);
        const response = await axios.get(`${env.API}/articles/${id}`);
        const data = response.data;
        setTitle(data.title);
        setCategory(data.category);
        setContent(data.content);
        setExistingImageUrl(data.featuredImage || "");
      } catch (error) {
        console.error('Error fetching article:', error);
        setErrors({ formErrors: 'Failed to load article' });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticle();
  }, [id, isEditMode, initialArticle]);

  const validateForm = (): boolean => {
    const validationErrors: FormErrors = {};
    if (!title.trim()) validationErrors.title = "Title is required";
    if (!category) validationErrors.category = "Category is required";
    if (!content.trim()) validationErrors.content = "Content is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});

    try {
      let imageUrl = existingImageUrl;

      // Upload new image if provided
      if (featuredImage) {
        const imageFormData = new FormData();
        imageFormData.append('featuredImage', featuredImage);
        
        const uploadRes = await axios.post(env.API + '/upload', imageFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        imageUrl = uploadRes.data.url;
      }

      // Prepare article data
      const articleData = {
        title,
        category,
        content,
        imageUrl,
        ...(!isEditMode && { authorId: "1" }) // Only include authorId for new articles
      };

      // Create or update article
      if (isEditMode && id) {
        await axios.put(`${env.API}/articles/${id}`, articleData);
        alert("Article updated successfully!");
      } else {
        await axios.post(env.API + '/articles', articleData, {
          headers: { 'Content-Type': 'application/json' },
        });
        alert("Article created successfully!");
      }

      // Handle success
      if (onSuccess) {
        onSuccess();
      } else if (isEditMode) {
        navigate("/admin/articles");
      } else {
        // Reset form for new article
        setTitle("");
        setCategory("");
        setContent("");
        setFeaturedImage(null);
        setExistingImageUrl("");
      }
    } catch (error) {
      console.error(`Failed to ${isEditMode ? 'update' : 'create'} article:`, error);
      setErrors({
        formErrors: `Failed to ${isEditMode ? 'update' : 'create'} article. Please try again.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center py-8">
      <Card className="w-full max-w-3xl rounded-2xl shadow-2xl border border-blue-200/60 bg-white/95 backdrop-blur-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl font-bold text-blue-900 drop-shadow-sm">
            {isEditMode ? 'Edit Article' : 'Create New Article'}
          </CardTitle>
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
              {existingImageUrl && (
                <div className="mb-2">
                  <p className="text-sm text-gray-500 mb-1">Current Image:</p>
                  <img 
                    src={existingImageUrl} 
                    alt="Current featured" 
                    className="h-32 object-cover rounded-lg border border-gray-200"
                  />
                </div>
              )}
              <Input
                id="featuredImage"
                name="featuredImage"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setFeaturedImage(file);
                  // Clear the error if file is selected
                  if (file && errors.featuredImage) {
                    setErrors(prev => ({ ...prev, featuredImage: undefined }));
                  }
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
                  if (isEditMode) {
                    navigate(-1); // Go back
                  } else {
                    // Reset form
                    setTitle("");
                    setCategory("");
                    setContent("");
                    setFeaturedImage(null);
                    setExistingImageUrl("");
                  }
                }}
                disabled={isSubmitting}
              >
                {isEditMode ? 'Cancel' : 'Reset'}
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2 font-medium transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? (isEditMode ? 'Updating...' : 'Creating...') 
                  : (isEditMode ? 'Update Article' : 'Create Article')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// Wrapper component for edit route
export const EditArticlePageWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const handleSuccess = () => {
    navigate('/admin/articles');
  };
  
  if (!id) {
    return <div>No article ID provided</div>;
  }
  
  return (
    <ArticleForm 
      isEditMode={true} 
      onSuccess={handleSuccess}
    />
  );
};

// Default export for create page
export default ArticleForm;
