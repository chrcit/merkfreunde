const contactPage = {
  type: "document",
  title: "Kontakt",
  name: "contactPage",
  fields: [
    {
      name: "mapCode",
      title: "Google Maps Embed URL",
      type: "url",
    },
    {
      name: "content",
      title: "Inhalt",
      type: "richText",
    },
    {
      name: "contactOptions",
      title: "Kontakt Optionen",
      type: "array",
      of: [{ type: "contactLink" }],
    },
  ],
};

export default contactPage;
