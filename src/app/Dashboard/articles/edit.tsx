import EditArticlePage from '@/components/articles/edit-article';

type Props = {
  params: Promise<{ id: string }>;
};

// Mock article data
const mockArticle = {
  id: '1',
  title: 'Sample Article Title',
  content: 'This is a sample article content. Replace this with your actual content.',
  excerpt: 'Sample excerpt for the article',
  featuredImage: 'https://via.placeholder.com/800x400',
  status: 'draft' as const, // Added required status field with const assertion
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  author: { // Added required author object
    name: 'Admin User',
    email: 'admin@example.com',
    imageUrl: 'https://via.placeholder.com/150'
  }
};

const page = async ({ params }: Props) => {
  // For now, we'll use the mock data instead of making a database call
  const article = mockArticle;
  
  // Uncomment this when you're ready to use real data
  /*
  const id = (await params).id;
  const article = await prisma.articles.findUnique({
    where: { id }
  });
  */

  if (!article) {
    return <h1>Article not found.</h1>;
  }


  return (
    <div className="container mx-auto p-4">
      <EditArticlePage article={article} />
    </div>
  );
};

export default page;