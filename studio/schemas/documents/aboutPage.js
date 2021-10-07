const aboutPage = {
  type: "document",
  title: "Über Uns",
  name: "aboutPage",
  fields: [
    {
      name: "image",
      title: "Bild",
      type: "image",
    },
    {
      name: "content",
      title: "Inhalt",
      type: "richText",
    },
    {
      name: "excerpt",
      title: "Kurzer Inhalt",
      type: "richText",
    },
  ],
};

export default aboutPage;
