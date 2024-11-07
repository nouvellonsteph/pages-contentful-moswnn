// app/page.tsx
import Link from 'next/link';
import { fetchArticles } from '../lib/contentful';

export default async function Home() {
  // Fetch the articles during build time
  const articles = await fetchArticles();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Main content */}
      <main className="container mx-auto px-4">
        <h1 className="text-4xl text-center my-8 text-black dark:text-white">
          Latest articles
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles?.map((article) => (
            <div
              key={article.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex transition-colors duration-200"
            >
              {/* Image section */}
              {article.image && (
                <div className="w-32 m-4">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover rounded-l-lg"
                  />
                </div>
              )}
              {/* Text content section */}
              <div className="flex-1 p-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {article.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {article.excerpt}
                </p>
                <Link
                  href={`/articles/${article.id}`}
                  className="text-blue-500 hover:underline mt-4 block"
                >
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
