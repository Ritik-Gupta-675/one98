"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { env } from "@/config/env";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { FileText } from "lucide-react";

export interface Article {
  id: string;
  title: string;
  category: string;
  featuredImage: string;
  createdAt: string;
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
        // Handle different response formats
        const articlesData = Array.isArray(response.data) 
          ? response.data 
          : (response.data?.data || []);
        
        if (!Array.isArray(articlesData)) {
          console.error('Unexpected articles format:', articlesData);
          setArticles([]);
          return;
        }
        
        setArticles(articlesData);
      } catch (error) {
        console.error("Failed to fetch articles", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <Card className="mb-10 rounded-2xl border border-blue-200/60 shadow-lg bg-white/95 backdrop-blur-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-blue-800 font-bold">Recent Articles</CardTitle>
            <Button variant="ghost" size="sm" disabled className="animate-pulse">Loading...</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-blue-100/40 animate-pulse">
                <div className="space-y-2">
                  <div className="h-4 bg-blue-200/60 rounded w-48"></div>
                  <div className="h-3 bg-blue-200/40 rounded w-32"></div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled className="w-16 bg-blue-100/60"></Button>
                  <Button variant="outline" size="sm" disabled className="w-16 bg-blue-100/60"></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (articles.length === 0) {
    return (
      <Card className="mb-10 rounded-2xl border border-blue-200/60 shadow-lg bg-white/95 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-lg text-blue-800 font-bold">Recent Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10">
            <FileText className="mx-auto h-14 w-14 text-blue-300 mb-4" />
            <h3 className="text-lg font-semibold text-blue-700">No articles found</h3>
            <p className="text-sm text-blue-500 mt-1">Get started by creating a new article</p>
            <Button className="mt-5 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold px-6 py-2 rounded-lg shadow" asChild>
              <a href="/dashboard/articles/create">Create Article</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-10 rounded-2xl border border-blue-200/60 shadow-lg bg-white/95 backdrop-blur-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-blue-800 font-bold">Recent Articles</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-blue-600 hover:text-blue-800 font-semibold"
            asChild
          >
            <a href="/dashboard/articles" className="flex items-center gap-1">
              View All <span className="text-blue-400">→</span>
            </a>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-blue-100">
          {articles.slice(0, 5).map((article) => (
            <div
              key={article.id}
              className="group px-6 py-4 hover:bg-blue-50/80 transition-colors rounded-xl flex items-center justify-between"
            >
              <div className="space-y-1">
                <h3 className="font-semibold text-blue-900 group-hover:text-blue-700 transition-colors text-base">
                  {article.title}
                </h3>
                <div className="flex items-center gap-3 text-sm text-blue-500">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium">
                    {article.category}
                  </span>
                  <span>•</span>
                  <time dateTime={article.createdAt} className="text-blue-400">
                    {new Date(article.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 px-3 text-xs border-blue-300 text-blue-700 hover:bg-blue-100 hover:text-blue-900"
                  asChild
                >
                  <a href={`/dashboard/articles/edit/${article.id}`}>
                    Edit
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700"
                  onClick={(e) => {
                    e.preventDefault();
                    if (confirm('Are you sure you want to delete this article?')) {
                      alert("Delete coming soon");
                    }
                  }}
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