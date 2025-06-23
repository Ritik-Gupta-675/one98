
import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { env } from "@/config/env";
import { TableOfContents } from '@/components/navigation/TableOfContents';
import { RelatedTopics } from '@/components/navigation/relatedTopics';

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  category?: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string | null;
    email: string | null;
    imageUrl: string | null;
  };
  metadata?: string | Record<string, any>;
}

export default function BlogPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${env.API}/articles/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            navigate('/not-found', { replace: true });
            return;
          }
          throw new Error('Failed to fetch article');
        }
        
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError('Failed to load article. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    } else {
      setLoading(false);
      setError('No article ID provided');
    }
  }, [id, navigate]);



  // Early return if still loading, has error, or no article
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  if (!article) {
    return <div className="text-center p-4">Article not found</div>;
  }

  const { title, content, featuredImage, author, createdAt, slug } = article;
  const displayImage = featuredImage;
  const displayImageAlt = title;

  return (
    <>
      <main className="bg-gray-50 min-h-screen">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content Column */}
            <article className="lg:col-span-8">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Featured Image */}
                {displayImage && (
                  <div className="w-full overflow-hidden">
                    <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96">
                      <img
                        src={displayImage}
                        alt={displayImageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Article Content */}
                <div className="p-6 sm:p-8">
                  <div className="mb-6">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
                      {title}
                    </h1>

                    <div className="flex items-center flex-wrap gap-3 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-2">
                        {author?.imageUrl && (
                          <img 
                            src={author.imageUrl} 
                            alt={author.name || 'Author'} 
                            className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                          />
                        )}
                        <span className="font-medium text-gray-700">{author?.name || 'Unknown Author'}</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <time dateTime={createdAt} className="text-gray-500">
                        {new Date(createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                  </div>

                  <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none
                    prose-headings:font-bold
                    prose-headings:tracking-tight
                    prose-headings:mt-8
                    prose-headings:mb-4
                    
                    prose-h1:text-3xl sm:prose-h1:text-4xl
                    prose-h1:text-gray-900
                    prose-h1:border-b
                    prose-h1:border-gray-200
                    prose-h1:pb-4
                    
                    prose-h2:text-2xl sm:prose-h2:text-3xl
                    prose-h2:text-gray-800
                    prose-h2:mt-10
                    
                    prose-h3:text-xl sm:prose-h3:text-2xl
                    prose-h3:text-gray-700
                    
                    prose-p:text-gray-600
                    prose-p:leading-relaxed
                    prose-p:my-4
                    
                    prose-strong:text-gray-800
                    
                    prose-a:text-blue-600
                    prose-a:font-medium
                    prose-a:no-underline
                    prose-a:border-b-2
                    prose-a:border-blue-200
                    prose-a:hover:border-blue-500
                    
                    prose-blockquote:border-l-4
                    prose-blockquote:border-blue-500
                    prose-blockquote:bg-blue-50
                    prose-blockquote:px-6
                    prose-blockquote:py-4
                    prose-blockquote:my-6
                    prose-blockquote:rounded-r-lg
                    
                    prose-pre:bg-gray-50
                    prose-pre:rounded-lg
                    prose-pre:p-4
                    prose-pre:overflow-x-auto
                    
                    prose-img:rounded-lg
                    prose-img:shadow-md
                    prose-img:my-6
                    
                    prose-ul:list-disc
                    prose-ul:pl-6
                    prose-ul:my-4
                    
                    prose-ol:list-decimal
                    prose-ol:pl-6
                    prose-ol:my-4
                    
                    /* Responsive iframe/video container */
                    .youtube-container,
                    .video-container {
                      position: relative;
                      width: 100%;
                      padding-bottom: 56.25%; /* 16:9 aspect ratio */
                      margin: 1.5rem 0;
                    }
                    
                    .youtube-container iframe,
                    .video-container iframe {
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100% !important;
                      height: 100% !important;
                      border: none;
                      border-radius: 0.5rem;
                    }
                    
                    /* Responsive images */
                    img {
                      max-width: 100%;
                      height: auto;
                      display: block;
                      margin: 1.5rem auto;
                    }
                    
                    /* Tables */
                    table {
                      width: 100%;
                      margin: 1.5rem 0;
                      border-collapse: collapse;
                    }
                    
                    th, td {
                      padding: 0.75rem;
                      border: 1px solid #e5e7eb;
                      text-align: left;
                    }
                    
                    th {
                      background-color: #f9fafb;
                      font-weight: 600;
                    }
                    
                    tr:nth-child(even) {
                      background-color: #f9fafb;
                    }
                  ">
                    <div
                      className="prose-content"
                      dangerouslySetInnerHTML={{ __html: content || "" }}
                    />
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6 sticky top-6 self-start">
              {/* Table of Contents */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <TableOfContents content={content} />
              </div>
              
              {/* Related Topics */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <RelatedTopics currentBlogSlug={slug} />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
