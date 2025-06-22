import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { env } from "../../config/env";

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
        setArticles(response.data);
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
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-48 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  if (articles.length === 0) {
    return <div className="text-center text-gray-500 p-4">No articles found.</div>;
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.slice(0, 3).map((article) => (
        <Card
          key={article.id}
          className={cn(
            "group relative overflow-hidden transition-all hover:scale-[1.02]",
            "border border-gray-200/50 dark:border-white/10",
            "bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg"
          )}
        >
          <div className="p-6">
            <Link to={`/articles/${article.id}`}>
              {/* Image Container */}
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
                {article.featuredImage && (
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={article.author.imageUrl as string} />
                  <AvatarFallback>
                    {article.author?.name || 'Unknown Author'}
                  </AvatarFallback>
                </Avatar>
                <span>{article.author?.name || 'Unknown Author'}</span>
              </div>

              {/* Article Title */}
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                {article.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {article.category || 'Uncategorized'}
              </p>

              {/* Article Meta Info */}
              <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{new Date(article.createdAt).toDateString()}</span>
                <span>{12} min read</span>
              </div>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}