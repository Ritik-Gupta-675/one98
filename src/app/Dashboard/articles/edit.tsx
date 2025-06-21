import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EditArticlePage } from '@/components/articles/edit-article';

const EditArticlePageWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      
      try {
        const response = await fetch(`/api/articles/${id}`);
        if (!response.ok) throw new Error('Failed to fetch article');
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
        navigate('/Dashboard/articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, navigate]);

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (!id || !article) {
    return <div className="container mx-auto p-4">Article not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <EditArticlePage id={id} article={article} />
    </div>
  );
};

export default EditArticlePageWrapper;