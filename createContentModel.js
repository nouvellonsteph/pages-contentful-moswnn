const contentful = require('contentful-management');

const apiToken = 'token';
const spaceId = 'spaceId';

const client = contentful.createClient({
  accessToken: apiToken, // Replace with your API key
});

async function createContentModel() {
  try {
    const space = await client.getSpace(spaceId); // Replace with your space ID
    const environment = await space.getEnvironment('master');

    // Check if content type "article" already exists
    const existingContentType = await environment
      .getContentTypes()
      .then((types) => types.items.find((type) => type.sys.id === 'article'));

    if (existingContentType) {
      console.log('Content type "article" already exists.');
      return;
    }

    // Create content type "article"
    const contentType = await environment.createContentTypeWithId('article', {
      name: 'Article',
      description: 'Content type for articles',
      fields: [
        {
          id: 'title',
          name: 'Title',
          type: 'Text',
          required: true,
        },
        {
          id: 'excerpt',
          name: 'Excerpt',
          type: 'Text',
          required: false,
        },
        {
          id: 'content',
          name: 'Content',
          type: 'Text',
          required: true,
          localized: false,
        },
      ],
    });

    // Publish the content type
    await contentType.publish();
    console.log('Content type "article" created and published.');
  } catch (error) {
    console.error('Error creating content model:', error);
  }
}

createContentModel();
