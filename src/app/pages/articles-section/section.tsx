import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { env } from "@/config/env";

// Function to strip HTML tags from content
const stripHtml = (html: string) => {
  if (typeof window === 'undefined') return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

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
    <section className="w-full px-4 sm:px-8 py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Title and CTA */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Latest <span className="text-blue-600">Articles</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our latest insights, stories, and expert opinions on various topics.
          </p>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => {
            const plainTextContent = stripHtml(article.content);
            const truncatedContent = plainTextContent.length > 120 
              ? `${plainTextContent.substring(0, 120)}...` 
              : plainTextContent;
              
            return (
              <article key={article.id} className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full transform hover:-translate-y-1">
                <div className="h-56 overflow-hidden bg-gray-100">
                  
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-xs font-medium text-gray-500 mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {article.category || 'Uncategorized'}
                    </span>
                    <span className="mx-2">•</span>
                    <time dateTime={new Date(article.createdAt).toISOString()}>
                      {new Date(article.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">
                    <Link 
                      to={`/articles/${article.id}`}
                      className="hover:text-blue-600 transition-colors duration-200"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {truncatedContent}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center">
                      {article.author?.imageUrl ? (
                        <img 
                          src={article.author.imageUrl} 
                          alt={article.author.name} 
                          className="w-8 h-8 rounded-full mr-3 object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-medium mr-3">
                          {article.author?.name ? article.author.name.charAt(0).toUpperCase() : 'A'}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{article.author?.name || 'Anonymous'}</p>
                        <p className="text-xs text-gray-500">Author</p>
                      </div>
                    </div>
                    <Link 
                      to={`/articles/${article.id}`}
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                      aria-label={`Read more about ${article.title}`}
                    >
                      Read more
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 pt-8">
            <div className="text-sm text-gray-600 mb-4 sm:mb-0">
              Showing page {pagination.currentPage} of {pagination.totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPreviousPage}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  pagination.hasPreviousPage
                    ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-blue-600'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                aria-label="Previous page"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let pageNum;
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (pagination.currentPage <= 3) {
                  pageNum = i + 1;
                } else if (pagination.currentPage >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i;
                } else {
                  pageNum = pagination.currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-md text-sm font-medium transition-colors duration-200 ${
                      pageNum === pagination.currentPage
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                    aria-current={pageNum === pagination.currentPage ? 'page' : undefined}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  pagination.hasNextPage
                    ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-blue-600'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                aria-label="Next page"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
