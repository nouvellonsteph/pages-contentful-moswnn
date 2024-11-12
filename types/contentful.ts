// types/contentful.ts
export interface Article {
    sys: {
      id: string;
    };
    fields: {
      title: string;
      excerpt: string;
      picture?: {
        fields: {
          file: {
            url: string;
          };
        };
      };
    };
  }
  