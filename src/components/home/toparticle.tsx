import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { env } from "../../config/env";
import { ArrowRight } from "lucide-react";

interface Comment {
  id: string;
  // Add other comment properties as needed
}

interface Author {
  name: string | null;
  email: string | null;
  imageUrl: string | null;
}

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  category?: string;
  slug: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  author: Author;
  comments: Comment[];
  // Add other article properties as needed
}

export function TopArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${env.API}/articles`, {
          params: {
            limit: 3,
            sort: 'createdAt:desc'
          }
        });
        const articlesData = Array.isArray(response.data) 
          ? response.data 
          : response.data?.data || [];
        setArticles(articlesData);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Skeleton className="h-10 w-1/3 mx-auto mb-12" />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-6">
                <Skeleton className="h-6 w-24 mb-4" />
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-5 w-5/6 mb-4" />
                <Skeleton className="h-4 w-3/4 mb-6" />
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-4" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-red-500 p-8 bg-red-50 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-gray-500 p-8 bg-gray-50 rounded-lg">
          No articles found.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
        News and Blog Being Solution
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, 3).map((article) => (
          <Card
            key={article.id}
            className={cn(
              "group relative overflow-hidden transition-all duration-300 hover:shadow-lg",
              "border border-gray-200",
              "bg-white",
              "h-full flex flex-col"
            )}
          >
            <Link to={`/articles/${article.id}`} className="flex flex-col h-full">
              {/* Image Container */}
              <div className="w-full h-48 overflow-hidden">
                {article.featuredImage ? (
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col">
                {/* Category */}
                {article.category && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full mb-3 self-start">
                    {article.category}
                  </span>
                )}

                {/* Article Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <div 
                  className="text-gray-600 text-sm mb-4 line-clamp-3 prose prose-sm"
                  dangerouslySetInnerHTML={{ 
                    __html: article.excerpt || 
                      (article.content 
                        ? article.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + 
                          (article.content.length > 150 ? '...' : '')
                        : '') 
                  }} 
                />

                {/* Read More Link */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                  <span className="text-sm font-medium">Read More</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}