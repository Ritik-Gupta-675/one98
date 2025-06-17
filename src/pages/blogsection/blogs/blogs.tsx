const Blogs = () => {
  // Sample blog data - replace with your actual data
  const featuredPost = {
    id: 1,
    title: 'The Future of Web Development in 2024',
    excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
    date: 'June 15, 2024',
    author: 'John Doe',
    category: 'Technology',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  };

  const recentPosts = [
    {
      id: 2,
      title: 'Getting Started with React Hooks',
      excerpt: 'Learn how to use React Hooks to simplify your components and reuse stateful logic.',
      date: 'June 10, 2024',
      category: 'React',
      readTime: '4 min read',
    },
    {
      id: 3,
      title: 'Mastering Tailwind CSS',
      excerpt: 'Advanced techniques and best practices for working with Tailwind CSS in your projects.',
      date: 'June 5, 2024',
      category: 'CSS',
      readTime: '6 min read',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={featuredPost.image}
            alt={featuredPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-center px-4 max-w-4xl mx-auto">
              <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                {featuredPost.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{featuredPost.title}</h1>
              <p className="text-xl mb-6">{featuredPost.excerpt}</p>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <span>{featuredPost.author}</span>
                <span>•</span>
                <span>{featuredPost.date}</span>
                <span>•</span>
                <span>{featuredPost.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <main className="w-full lg:w-2/3">
            {/* Featured Post */}
            <article className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Featured Post</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-4">
                    This is where the main content of the featured blog post will go. You can add your blog content here, 
                    including text, images, code snippets, and other rich media elements.
                  </p>
                  <p className="text-gray-700 mb-6">
                    The layout is fully responsive and will adapt to different screen sizes. On larger screens, 
                    the sidebar will appear to the right of the main content.
                  </p>
                  <a 
                    href="#" 
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </article>

            {/* Recent Posts */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {recentPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <span className="inline-block bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </main>

          {/* Sidebar - Empty for now */}
          <aside className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Sidebar</h3>
              <p className="text-gray-600">
                This is where you can add your sidebar content, such as categories, tags, about section, 
                or any other widgets you'd like to include.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Blogs;