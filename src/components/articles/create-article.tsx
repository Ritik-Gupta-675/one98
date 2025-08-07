import { ArticleForm } from "./ArticleForm";

export default function CreateArticlePage() {
  return <ArticleForm onSubmit={(data) => console.log(data)} />;
}
