const page = {
  type: "document",
  title: "Seite",
  name: "page",
  fields: [
    {
      name: "slug",
      title: "Url",
      type: "slug",
      options: {
        source: "title",
      },
    },
    {
      name: "image",
      title: "Bild",
      type: "image",
    },
    {
      name: "title",
      title: "Titel",
      type: "string",
    },
    {
      name: "content",
      title: "Inhalt",
      type: "richText",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
      media: "image",
    },
  },
};

export default page;
