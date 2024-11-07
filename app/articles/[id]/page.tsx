// app/articles/[id]/page.tsx
import { fetchArticleById } from '../../../lib/contentful';
import { notFound } from 'next/navigation';

interface ArticlePageProps {
  params: { id: string };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await fetchArticleById(params.id);

  if (!article) {
    notFound(); // If article is not found, it will show the 404 page
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center my-4">{article.title}</h1>
        <div className="flex justify-center mb-6">
          {/*{article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="w-80 object-cover rounded-lg"
            />
          )}*/}
        </div>
        <div className="text-lg text-gray-800 dark:text-gray-100">
          <p>{article.content}</p>
        </div>
      </main>
    </div>
  );
}
