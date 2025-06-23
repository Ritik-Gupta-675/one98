import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { env } from "@/config/env";

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  imageUrl: string;
  createdAt: string;
  author: {
    name: string;
    imageUrl: string;
  };
  _count: {
    comments: number;
    likes: number;
  };
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const BlogSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`${env.API}/articles?page=${page}`);
      setArticles(response.data.data);
      setPagination(response.data.pagination);
      setError(null);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to load articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchArticles(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section className="w-full px-4 sm:px-8 py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading articles...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full px-4 sm:px-8 py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading articles</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => fetchArticles(pagination.currentPage)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-4 sm:px-8 py-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Title and CTA */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Latest Blog Posts
          </h2>
          <Link
            to="/blogs"
            className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base transition-colors"
          >
            View All →
          </Link>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
              <div className="h-48 overflow-hidden">
                <img
                  src={article.imageUrl || '/images/placeholder-article.jpg'}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{new Date(article.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}</span>
                  <span className="mx-2">•</span>
                  <span>{article.category}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                  <Link to={`/articles/${article.id}`}>
                    {article.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {article.content.substring(0, 150)}...
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center">
                    {article.author?.imageUrl && (
                      <img 
                        src={article.author.imageUrl} 
                        alt={article.author.name} 
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    )}
                    <span className="text-sm text-gray-600">{article.author?.name || 'Anonymous'}</span>
                  </div>
                  <Link 
                    to={`/articles/${article.id}`}
                    className="text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-12 flex items-center justify-between">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPreviousPage}
              className={`px-4 py-2 rounded-md ${pagination.hasPreviousPage 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className={`px-4 py-2 rounded-md ${pagination.hasNextPage 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
