import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TiptapEditor from "@/components/ui/tiptapeditor";
import axios from "axios";
import { env } from "../../config/env";

// Wrapper component to handle route parameters
const EditArticlePageWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`${env.API}/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticle();
  }, [id]);
  
  if (!id) {
    return <div>No article ID provided</div>;
  }
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!article) {
    return <div>Article not found</div>;
  }
  
  return <EditArticlePage id={id} article={article} />;
};

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  // Add other article properties as needed
}

interface EditArticlePageProps {
  id: string;
  article: Article;
}

const EditArticlePage = ({ id, article }: EditArticlePageProps) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState(article?.title || "");
  const [category, setCategory] = useState(article?.category || "");
  const [content, setContent] = useState(article?.content || "");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      const res = await axios.get(`${env.API}/articles/${id}`);
      const data = res.data;
      setTitle(data.title);
      setCategory(data.category);
      setContent(data.content);
      setExistingImageUrl(data.featuredImage);
    }
    fetchArticle();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = existingImageUrl;

      if (featuredImage) {
        const imageFormData = new FormData();
        imageFormData.append("featuredImage", featuredImage);

        const uploadRes = await axios.post(env.API + "/upload", imageFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = uploadRes.data.url;
      }

      await axios.put(`${env.API}/articles/${id}`, {
        title,
        category,
        content,
        imageUrl,
      });

      alert("Article updated successfully!");
      navigate("/admin/articles"); // or your article list route
    } catch (error) {
      console.error("Failed to update article:", error);
      alert("Failed to update. Try again.");
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
              <Label>Article Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border px-3 py-2">
                <option value="">Select Category</option>
                <option value="technology">Technology</option>
                <option value="programming">Programming</option>
                <option value="web-development">Web Development</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Featured Image</Label>
              {existingImageUrl && (
                <img src={existingImageUrl} alt="Current" className="h-32 object-cover" />
              )}
              <Input type="file" accept="image/*" onChange={(e) => setFeaturedImage(e.target.files?.[0] || null)} />
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <TiptapEditor content={content} onChange={setContent} />
            </div>

            <div className="flex justify-end gap-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Article"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// Export both components
export { EditArticlePageWrapper as default, EditArticlePage };
