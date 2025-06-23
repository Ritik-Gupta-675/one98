
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { env } from "@/config/env";

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

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  if (!article) {
    return <div className="text-center p-4">Article not found</div>;
  }

  const { title, content, featuredImage, author, createdAt } = article;
  const displayImage = featuredImage;
  const displayImageAlt = title;

  return (
    <>
      <main>
        <div className="min-h-screen bg-white relative w-full overflow-x-hidden">
          <div className="w-full max-w-[1400px] xl:max-w-6.5xl mx-auto px-2 lg:px-8 py-4 sm:py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-6 mt-5">
              {/* Main Content Column */}
              <main className="lg:col-start-1 lg:col-span-9 space-y-4 sm:space-y-6">
                <div className="bg-white border shadow-lg rounded-xl">
                  {/* Featured Image */}
                  {displayImage && (
                    <div className="w-full">
                      <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] bg-gray-50">
                        <img
                          src={displayImage}
                          alt={displayImageAlt}
                          className="object-cover rounded-t-xl"
                        />
                      </div>
                    </div>
                  )}

                  {/* Article Content */}
                  <div className="p-4 sm:p-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[var(--surface-darker)] mb-4">
                      {title}
                    </h1>

                    <div className="flex items-center gap-3 text-sm text-[var(--text-tertiary)] mb-4">
                      <div className="flex items-center gap-2">
                        {author?.imageUrl && (
                          <img 
                            src={author.imageUrl} 
                            alt={author.name || 'Author'} 
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        )}
                        <span>{author?.name || 'Unknown Author'}</span>
                      </div>
                      <span>•</span>
                      <span>{new Date(createdAt).toLocaleDateString()}</span>
                    </div>

                    <div
                      className="prose prose-sm sm:prose-base lg:prose-lg max-w-none
                      prose-headings:font-semibold
                      prose-headings:tracking-normal
                      prose-headings:text-left
                      prose-headings:relative
                      prose-headings:mb-6
                      
                      prose-h1:text-2xl sm:prose-h1:text-3xl lg:prose-h1:text-4xl
                      prose-h1:font-bold
                      prose-h1:text-gray-800
                      prose-h1:leading-tight
                      
                      prose-h2:text-2xl sm:prose-h2:text-3xl
                      prose-h2:text-gray-700
                      prose-h2:pb-2
                      prose-h2:after:content-['']
                      prose-h2:after:block
                      prose-h2:after:w-16
                      prose-h2:after:h-[2px]
                      prose-h2:after:mt-2
                      prose-h2:after:bg-yellow-500
                      prose-h2:after:rounded-full
                      
                      prose-h3:text-xl sm:prose-h3:text-2xl
                      prose-h3:text-gray-600
                      prose-h3:font-medium
                      prose-h3:pl-3
                      
                      prose-h4:text-lg sm:prose-h4:text-xl
                      prose-h4:text-gray-600
                      prose-h4:font-medium
                      prose-h4:before:content-['§']
                      prose-h4:before:text-yellow-500
                      prose-h4:before:mr-2
                      prose-h4:before:opacity-70
                      
                      prose-p:text-gray-600
                      prose-p:leading-relaxed
                      prose-p:tracking-wide
                      prose-strong:text-gray-800
                      prose-a:text-blue-600
                      prose-a:no-underline
                      prose-a:border-b-2
                      prose-a:border-blue-200
                      prose-a:transition-colors
                      prose-a:hover:border-blue-500
                      prose-blockquote:border-l-blue-500
                      prose-blockquote:bg-blue-50
                      prose-blockquote:p-3 sm:prose-blockquote:p-4
                      prose-blockquote:rounded-r-lg
                      prose-pre:bg-gray-50
                      prose-pre:rounded-lg
                      prose-pre:p-3 sm:prose-pre:p-4
                      prose-img:rounded-lg
                      prose-img:shadow-md
                      prose-ul:list-disc
                      prose-ul:pl-4 sm:prose-ul:pl-6
                      prose-ol:list-decimal
                      prose-ol:pl-4 sm:prose-ol:pl-6
                      [&>*]:w-full
                      
                      /* YouTube Video Styles */
                      iframe {
                        width: 100% !important;
                        height: 100% !important;
                        max-width: 100%;
                        aspect-ratio: 16/9;
                      }
                      
                      /* Responsive YouTube Container */
                      .youtube-container {
                        position: relative;
                        width: 100%;
                        padding-bottom: 56.25%; /* 16:9 aspect ratio */
                        margin: 1rem 0;
                      }
                      
                      .youtube-container iframe {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100% !important;
                        height: 100% !important;
                        border: none;
                      }
                      
                      /* Prevent overflow */
                      .prose-video {
                        overflow: hidden;
                        max-width: 100%;
                        margin: 1rem 0;
                      }
                      
                      /* Responsive images */
                      img {
                        max-width: 100%;
                        height: auto;
                        display: block;
                        margin: 0 auto;
                      }"
                    >
                      <div
                        dangerouslySetInnerHTML={{ __html: content || "" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </main>

              {/* Sidebar */}
              <aside className="lg:col-start-10 lg:col-span-4 space-y-4 sm:space-y-8 mt-5 lg:mt-0">
                {/* <RelatedTopics currentBlogSlug={slug} /> */}
              </aside>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
