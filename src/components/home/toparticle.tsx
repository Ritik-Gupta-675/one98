import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
// Using regular img tag since this is a Vite project

interface Comment {
  id: string;
  // Add other comment properties as needed
}

interface Author {
  name: string | null;
  email: string | null;
  imageUrl: string | null;
}

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  category?: string;
  slug: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  author: Author;
  comments: Comment[];
  // Add other article properties as needed
}

export function TopArticles() {
  let articles: Article[] = [];
  
  // Mock data for articles
  articles = [
    {
      id: '1',
      title: 'Getting Started with React',
      category: 'Web Development',
      featuredImage: 'https://source.unsplash.com/random/800x400?react',
      author: {
        name: 'Jane Doe',
        email: 'jane@example.com',
        imageUrl: 'https://i.pravatar.cc/150?img=1'
      },
      createdAt: new Date('2025-06-15'),
      updatedAt: new Date('2025-06-15'),
      content: 'Learn the basics of React and start building modern web applications.',
      slug: 'getting-started-with-react',
      comments: []
    },
    {
      id: '2',
      title: 'Mastering TypeScript',
      category: 'Programming',
      featuredImage: 'https://source.unsplash.com/random/800x400?typescript',
      author: {
        name: 'John Smith',
        email: 'john@example.com',
        imageUrl: 'https://i.pravatar.cc/150?img=2'
      },
      createdAt: new Date('2025-06-10'),
      updatedAt: new Date('2025-06-10'),
      content: 'Take your TypeScript skills to the next level with these advanced patterns.',
      slug: 'mastering-typescript',
      comments: []
    },
    {
      id: '3',
      title: 'The Future of Web Development',
      category: 'Technology',
      featuredImage: 'https://source.unsplash.com/random/800x400?web',
      author: {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        imageUrl: 'https://i.pravatar.cc/150?img=3'
      },
      createdAt: new Date('2025-06-05'),
      updatedAt: new Date('2025-06-05'),
      content: 'Exploring the latest trends and technologies shaping the future of web development.',
      slug: 'future-of-web-development',
      comments: []
    }
  ];

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.slice(0, 3).map((article) => (
        <Card
          key={article.id}
          className={cn(
            "group relative overflow-hidden transition-all hover:scale-[1.02]",
            "border border-gray-200/50 dark:border-white/10",
            "bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg"
          )}
        >
          <div className="p-6">
            <Link to={`/articles/${article.id}`}>
              {/* Image Container */}
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
                {article.featuredImage && (
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={article.author.imageUrl as string} />
                  <AvatarFallback>
                    {article.author?.name || 'Unknown Author'}
                  </AvatarFallback>
                </Avatar>
                <span>{article.author?.name || 'Unknown Author'}</span>
              </div>

              {/* Article Title */}
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                {article.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {article.category || 'Uncategorized'}
              </p>

              {/* Article Meta Info */}
              <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{new Date(article.createdAt).toDateString()}</span>
                <span>{12} min read</span>
              </div>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}