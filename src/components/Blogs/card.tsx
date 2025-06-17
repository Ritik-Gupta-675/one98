import React from 'react';
import { Link } from 'react-router-dom';

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  metadata: string;
  imageUrl: string;
  alt: string;
}

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <Link to={`/blog/${blog.slug}`} className="group block bg-white border border-[var(--border-light)] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-[360px] w-full">
      <div className="relative h-[160px] w-full overflow-hidden">
        <img
          src={blog.imageUrl}
          alt={blog.alt || 'Blog Image'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[var(--surface-darker)] mb-2 line-clamp-2 group-hover:text-[var(--secondary)] transition-colors duration-200">
            {blog.title}
          </h3>
          <div className="flex items-center text-xs text-[var(--text-secondary)] mb-2 gap-2">
            <span>By ritik gupta</span>
            <span>•</span>
            <span>{blog.metadata || '2 min read'}</span>
          </div>
          <p className="text-[var(--text-strong)] text-sm line-clamp-4">
            {blog.content
              ? blog.content
                  .replace(/<[^>]*>/g, '')
                  .replace(/&nbsp;/g, ' ')
                  .slice(0, 150)
                  .trim() + (blog.content.length > 150 ? '...' : '')
              : 'No content available'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;