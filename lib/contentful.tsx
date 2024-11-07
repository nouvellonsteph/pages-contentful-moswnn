// lib/contentful.ts
import { createClient, Entry } from 'contentful';

// Load environment variables (this will work if you're using Next.js or other frameworks that support it)
const spaceId = process.env.CONTENTFUL_SPACE_ID!;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN!;

const client = createClient({
  space: spaceId,
  accessToken: accessToken,
});

// Define the Contentful fields structure for an article
interface ContentfulArticleFields {
  title: string;
  excerpt: string;
  content: string;
  picture?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string | null;
}

// Use Contentful's `Entry` type with `ContentfulArticleFields`
export async function fetchArticles(): Promise<Article[] | null> {
  const response = await client.getEntries<ContentfulArticleFields>({
    content_type: 'article',
  });

  return response.items.map((item: Entry<ContentfulArticleFields>) => ({
    id: item.sys.id,
    title: item.fields.title,
    excerpt: item.fields.excerpt,
    content: item.fields.content,
    image: item.fields.picture ? item.fields.picture.fields.file.url : null,
  }));
}

export async function fetchArticleById(id: string): Promise<Article | null> {
  try {
    const response = await client.getEntry<ContentfulArticleFields>(id);
    return {
      id: response.sys.id,
      title: response.fields.title,
      excerpt: response.fields.excerpt,
      content: response.fields.content,
      image: response.fields.picture
        ? response.fields.picture.fields.file.url
        : null,
    };
  } catch (error) {
    console.error(`Error fetching article with ID ${id}:`, error);
    return null;
  }
}
