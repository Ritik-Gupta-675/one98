import React from "react";
import { Link } from "react-router-dom";

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  metadata: string;
  imageUrl: string;
  alt: string;
  createdAt: string;
}

const BlogSection: React.FC = () => {
  // Sample blog data - same as in blogs.tsx
  const blogs: Blog[] = [
    {
      id: '1',
      title: 'Getting Started with Next.js',
      slug: 'getting-started-with-nextjs',
      content: 'Learn the basics of Next.js and how to build modern web applications with it.',
      metadata: '5 min read • Web Development',
      imageUrl: '/images/blog1.jpg',
      alt: 'Next.js Introduction',
      createdAt: '2023-05-15T10:30:00Z',
    },
    {
      id: '2',
      title: 'Mastering React Hooks',
      slug: 'mastering-react-hooks',
      content: 'A comprehensive guide to understanding and using React Hooks effectively.',
      metadata: '7 min read • React',
      imageUrl: '/images/blog2.jpg',
      alt: 'React Hooks',
      createdAt: '2023-05-10T14:20:00Z',
    },
    {
      id: '3',
      title: 'CSS Grid Layout Guide',
      slug: 'css-grid-layout-guide',
      content: 'Learn how to create complex layouts with CSS Grid.',
      metadata: '6 min read • CSS',
      imageUrl: '/images/blog3.jpg',
      alt: 'CSS Grid Layout',
      createdAt: '2023-05-05T09:15:00Z',
    },
    {
      id: '4',
      title: 'TypeScript Best Practices',
      slug: 'typescript-best-practices',
      content: 'Best practices and patterns for writing clean and maintainable TypeScript code.',
      metadata: '8 min read • TypeScript',
      imageUrl: '/images/blog4.jpg',
      alt: 'TypeScript',
      createdAt: '2023-04-28T16:45:00Z',
    },
  ];

  // Sort blogs by date (newest first)
  const sortedBlogs = [...blogs].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Only show the 4 most recent blogs in the section
  const recentBlogs = sortedBlogs.slice(0, 4);

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

        {/* Blog cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentBlogs.map((blog) => (
            <Link 
              key={blog.id}
              to={`/blog/${blog.slug}`}
              className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={blog.imageUrl}
                  alt={blog.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}</span>
                  <span className="mx-2">•</span>
                  <span>{blog.metadata}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {blog.content}
                </p>
                <div className="mt-auto text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
                  Read more →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
