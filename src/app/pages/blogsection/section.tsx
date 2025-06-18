import React from "react";
import { Link } from "react-router-dom";
import BlogCard from "../../../components/Blogs/card";

interface Blog {
  id: string;
  title: string;
  imageUrl: string;
  metadata: string;
  createdAt: string;
  content: string;
  slug: string;
  alt: string;
}

const BlogSection: React.FC = () => {
  // Fake blog data
  const blogs: Blog[] = [
    {
      id: '1',
      title: 'Getting Started with Next.js',
      imageUrl: JSON.stringify(['/images/blog1.jpg', 'Next.js Introduction']),
      metadata: '5 min read • Web Development',
      createdAt: '2023-05-15T10:30:00Z',
      content: 'Learn the basics of Next.js and how to build modern web applications with it.',
      slug: 'getting-started-with-nextjs',
      alt: 'Next.js Introduction'
    },
    {
      id: '2',
      title: 'Mastering React Hooks',
      imageUrl: JSON.stringify(['/images/blog2.jpg', 'React Hooks']),
      metadata: '7 min read • React',
      createdAt: '2023-05-10T14:20:00Z',
      content: 'A comprehensive guide to understanding and using React Hooks effectively.',
      slug: 'mastering-react-hooks',
      alt: 'React Hooks'
    },
    {
      id: '3',
      title: 'CSS Grid Layout Guide',
      imageUrl: JSON.stringify(['/images/blog3.jpg', 'CSS Grid']),
      metadata: '6 min read • CSS',
      createdAt: '2023-05-05T09:15:00Z',
      content: 'Learn how to create complex layouts with CSS Grid.',
      slug: 'css-grid-layout-guide',
      alt: 'CSS Grid Layout'
    },
    {
      id: '4',
      title: 'TypeScript Best Practices',
      imageUrl: JSON.stringify(['/images/blog4.jpg', 'TypeScript']),
      metadata: '8 min read • TypeScript',
      createdAt: '2023-04-28T16:45:00Z',
      content: 'Best practices and patterns for writing clean and maintainable TypeScript code.',
      slug: 'typescript-best-practices',
      alt: 'TypeScript'
    }
  ];

  return (
    <section className="w-full px-4 sm:px-8 py-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Title and optional CTA */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--surface-darker)]">
            Latest Blog Posts
          </h2>
          <Link
            to="/blogs"
            className="text-[var(--primary)] hover:text-[var(--secondary)] font-medium text-sm sm:text-base"
          >
            View All →
          </Link>
        </div>

        {/* Blog cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-200">
              <BlogCard
                blog={{
                  id: blog.id,
                  title: blog.title,
                  slug: blog.slug,
                  content: blog.content,
                  metadata: blog.metadata,
                  imageUrl: JSON.parse(blog.imageUrl)[0],
                  alt: JSON.parse(blog.imageUrl)[1],
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
