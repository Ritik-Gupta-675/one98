"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// Using standard anchor tags instead of Next.js Link

// Mock data type
type Article = {
  id: string;
  title: string;
  status: 'draft' | 'published' | 'archived';
  comments: any[];
  createdAt: string | Date;
  author: {
    name: string;
    email: string;
    imageUrl?: string;
  };
};

type RecentArticlesProps = {
  articles?: Article[]; // Make articles optional to handle initial loading
};

const RecentArticles: React.FC<RecentArticlesProps> = ({ articles }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Articles</CardTitle>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            View All →
          </Button>
        </div>
      </CardHeader>
      {!articles?.length ? (
        <CardContent>No articles found.</CardContent>
      ) : (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.slice(0, 5).map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      {article.status === 'published' ? 'Published' : article.status === 'draft' ? 'Draft' : 'Archived'}
                    </span> 
                  </TableCell>
                  <TableCell>{article.comments.length}</TableCell>
                  <TableCell>{new Date(article.createdAt).toDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <a href={`#/dashboard/articles/${article.id}/edit`} className="inline-block">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </a>
                      <DeleteButton articleId={article.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  );
};

export default RecentArticles;

type DeleteButtonProps = {
  articleId: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ articleId }) => {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeleting(true);
    // In a real app, you would call your API here
    console.log('Deleting article:', articleId);
    // Simulate API call
    setTimeout(() => {
      setIsDeleting(false);
      // You would typically update the parent component's state here
    }, 1000);
  };

  return (
    <form onSubmit={handleDelete}>
      <Button disabled={isDeleting} variant="ghost" size="sm" type="submit">
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>
    </form>
  );
};

// Default mock data
export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    status: 'published',
    comments: [{}, {}],
    createdAt: new Date('2025-06-10'),
    author: {
      name: 'John Doe',
      email: 'john@example.com',
      imageUrl: '/placeholder-user.jpg'
    }
  },
  {
    id: '2',
    title: 'React Hooks Explained',
    status: 'published',
    comments: [{}],
    createdAt: new Date('2025-06-05'),
    author: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      imageUrl: '/placeholder-user.jpg'
    }
  },
  {
    id: '3',
    title: 'TypeScript Best Practices',
    status: 'draft',
    comments: [],
    createdAt: new Date('2025-05-28'),
    author: {
      name: 'John Doe',
      email: 'john@example.com',
      imageUrl: '/placeholder-user.jpg'
    }
  }
];