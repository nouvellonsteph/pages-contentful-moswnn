// app/articles/[id]/page.tsx
import { fetchArticleById, fetchArticles } from '../../../lib/contentful';
import { notFound } from 'next/navigation';
import { Article } from '../../../types/contentful';

export const dynamicParams = false;
export const runtime = 'edge';

type Params = Promise<{ id: string }>;

// This function will be called at build time to pre-render pages for each article
/*export async function generateStaticParams(): Promise<{ id: string }[]> {
  try {
    const articles = await fetchArticles();

    // If no articles are found, return an empty array to avoid build errors
    if (!articles) {
      console.error("No articles found.");
      return [];
    }

    // Return an array of plain objects with { id: string } structure, not Promises
    return articles.map((article) => ({
      id: article.sys.id,
    }));
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  } finally {
    return [];
  }
}*/


export default async function ArticlePage({ params }: {params: Params}) {
  const { id } = await params
  const article: Article | null = await fetchArticleById(id);
  //console.log(article)

  // Show 404 page if the article is not found
  if (!article) {
    notFound();
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center my-4">{article.fields.title}</h1>
        <div className="flex justify-center mb-6">
          {article.fields.picture && article.fields.picture.fields?.file.url && (
            <img
              src={article.fields.picture.fields.file.url}
              alt={article.fields.title}
              className="w-80 object-cover rounded-lg"
            />
          )}
        </div>
        <div className="text-lg text-gray-800 dark:text-gray-100">
          <p>{article.fields.content}</p>
        </div>
      </main>
    </div>
  );
}
