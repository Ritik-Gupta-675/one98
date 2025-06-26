import { useParams, useNavigate } from "react-router-dom";
import { ArticleForm } from "./ArticleForm";

// Wrapper component to handle route parameters
export const EditArticlePageWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  if (!id) {
    return <div>No article ID provided</div>;
  }
  
  const handleSuccess = () => {
    navigate('/admin/articles');
  };
  
  return (
    <ArticleForm 
      isEditMode={true}
      onSuccess={handleSuccess}
    />
  );
};

export default EditArticlePageWrapper;
