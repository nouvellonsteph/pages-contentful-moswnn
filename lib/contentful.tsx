// lib/contentful.ts
import { createClient, Entry, EntrySkeletonType } from 'contentful';

// Load environment variables (this will work if you're using Next.js or other frameworks that support it)
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
  space: spaceId,
  accessToken: accessToken,
});

// Define the Contentful fields structure for an article.  Note optional picture field.
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

// Extend EntrySkeletonType to define a compatible structure
interface ContentfulArticleSkeleton extends EntrySkeletonType {
  fields: ContentfulArticleFields;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string | null;
}

// Use Contentful's `Entry` type with `ContentfulArticleSkeleton`
export async function fetchArticles(): Promise<Article[] | null> {
  if (!spaceId || !accessToken) {
    console.error('Contentful Space ID or Access Token not found in environment variables.');
    return null;
  }

  const response = await client.getEntries<ContentfulArticleSkeleton>({
    content_type: 'article',
  });

  return response.items.map((item: Entry<ContentfulArticleSkeleton>) => ({
    id: item.sys.id,
    title: item.fields.title,
    excerpt: item.fields.excerpt,
    content: item.fields.content,
    image: item.fields.picture ? item.fields.picture.fields.file.url : null,
  }));
}

export async function fetchArticleById(id: string): Promise<Article | null> {
  if (!spaceId || !accessToken) {
    console.error('Contentful Space ID or Access Token not found in environment variables.');
    return null;
  }

  try {
    const response = await client.getEntry<ContentfulArticleSkeleton>(id);
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
