import { Link } from 'react-router-dom';

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

const Blogs = () => {
  // Sample blog data - in a real app, this would come from an API
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Latest articles, tutorials, and insights from our team
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedBlogs.map((blog) => (
            <Link 
              key={blog.id} 
              to={`/blog/${blog.slug}`}
              className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={blog.imageUrl}
                  alt={blog.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}</span>
                  <span className="mx-2">•</span>
                  <span>{blog.metadata}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {blog.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">
                  {blog.content}
                </p>
                <div className="mt-4 flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                  Read more
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;