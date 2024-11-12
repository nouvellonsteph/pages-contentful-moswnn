// lib/contentful.ts
import { createClient, EntrySkeletonType } from 'contentful';

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
  picture: {
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

// Use Contentful's `Entry` type with `ContentfulArticleSkeleton`
export async function fetchArticles(){
  const response = await client.getEntries<ContentfulArticleSkeleton>({
    content_type: 'article',
  });
  return response.items
}

export async function fetchArticleById(id: string) {
  try {
    const response = await client.getEntry<ContentfulArticleSkeleton>(id);
    return response.fields;
  } catch (error) {
    console.error(`Error fetching article with ID ${id}:`, error);
    return null;
  }
}
