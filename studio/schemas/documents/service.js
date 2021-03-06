const service = {
  title: "Angebot",
  name: "service",
  type: "document",
  fields: [
    {
      name: "slug",
      type: "slug",
      title: "URL",
      options: {
        source: "title",
      },
    },
    {
      name: "title",
      type: "string",
      title: "Angebot Name",
    },
    {
      title: "Angebots Preis",
      name: "price",
      type: "string",
    },
    {
      title: "Angebot Kurze Beschreibung",
      name: "descriptionShort",
      type: "richText",
    },
    {
      title: "Beschreibung",
      name: "description",
      type: "richText",
    },
    {
      title: "Auszug",
      name: "excerpt",
      type: "richText",
    },
    {
      title: "Farbe",
      name: "color",
      type: "color",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
};

export default service;
