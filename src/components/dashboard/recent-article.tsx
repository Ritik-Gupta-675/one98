"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { env } from "@/config/env";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export interface Article {
  id: string;
  title: string;
  category: string;
  featuredImage: string;
  createdAt: string;
  status: 'draft' | 'published' | 'archived';
  comments?: Array<{
    id: string;
    content: string;
    author: string;
    createdAt: string;
  }>;
}

export function RecentArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${env.API}/articles`);
        setArticles(response.data);
      } catch (error) {
        console.error("Failed to fetch articles", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <p>Loading recent articles...</p>;
  if (articles.length === 0) return <p>No articles found.</p>;

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Articles</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            asChild
          >
            <a href="/dashboard/articles">View All →</a>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {articles.slice(0, 5).map((article) => (
            <div
              key={article.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <p className="font-medium">{article.title}</p>
                <p className="text-sm text-muted-foreground">
                  {article.category} • {new Date(article.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <a href={`/dashboard/articles/edit/${article.id}`}>
                    Edit
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => alert("Delete coming soon")}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default RecentArticles;