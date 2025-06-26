"use client";
import { useEffect, useState } from 'react';
import { env } from '@/config/env';
import axios from 'axios';
interface Article {
  id: number;
  slug: string;
  title: string;
}

interface RelatedTopicsProps {
  currentBlogSlug: string;
}

export const RelatedTopics = ({ currentBlogSlug }: RelatedTopicsProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchRandomArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${env.API}/articles`);
        
        // Debug: log the response structure
        console.log('RelatedTopics API response:', response.data);

        let result = response.data;

        // If response.data is an object with a property holding the array, extract it
        if (result && typeof result === 'object' && !Array.isArray(result)) {
          // Try common property names
          if (Array.isArray(result.items)) {
            result = result.items;
          } else if (Array.isArray(result.data)) {
            result = result.data;
          } else if (Array.isArray(result.results)) {
            result = result.results;
          }
        }

        // Check if data exists and is an array
        if (!result || !Array.isArray(result)) {
          throw new Error('Invalid response format');
        }

        // Filter out the current blog and shuffle the results
        // Use id for filtering if slug is missing
        const filteredArticles = result.filter((article: Article) => {
          // If slug exists, use it, otherwise use id
          if (article.slug) {
            return article.slug !== currentBlogSlug;
          }
          return String(article.id) !== currentBlogSlug;
        });
        const shuffled = [...filteredArticles].sort(() => 0.5 - Math.random());

        // If we have less than itemsPerPage articles after filtering, show all we have
        const displayArticles = shuffled.length >= itemsPerPage
          ? shuffled.slice(0, itemsPerPage)
          : shuffled;

        setArticles(displayArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRandomArticles();
  }, [currentBlogSlug]);

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Related Topics</h2>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Related Topics</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-300 hover:shadow-md transition-all duration-300 p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">
        Related Topics
      </h2>
      {articles.length === 0 ? (
        <p className="text-gray-500 text-sm pt-4 flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          No related topics found
        </p>
      ) : (
        <div className="space-y-3">
          {articles.map((article) => (
            <div
              key={article.id}
              className="group relative hover:bg-gray-50/70 rounded-lg transition-all duration-200"
            >
              <a
                href={`/blog/${article.slug || article.id}`}
                className="block p-2.5 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                title={article.title}
              >
                <div className="flex items-center space-x-2">
                  <svg 
                    className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5-5 5M5 7l5 5-5 5"
                    />
                  </svg>
                  <span className="line-clamp-2 group-hover:underline">
                    {article.title}
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};