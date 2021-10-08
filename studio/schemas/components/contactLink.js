const contactLink = {
  title: "Kontakt Link",
  name: "contactLink",
  type: "object",
  fields: [
    {
      name: "linkText",
      title: "Link Text",
      type: "string",
    },
    {
      name: "linkType",
      title: "Link Art",
      type: "string",
      options: {
        list: [
          "Facebook",
          "Instagram",
          "Telefon",
          "Whatsapp",
          "Email",
          "Url",
          "Adresse",
        ],
      },
    },
    {
      title: "Icon",
      name: "icon",
      type: "iconPicker",
      options: {
        providers: ["fa"],
        outputFormat: "react",
        filter: ["FaPhoneAlt", "FaEnvelope", "FaWhatsapp", "FaMapPin"],
      },
    },
    {
      name: "linkTarget",
      title: "Link Ziel",
      type: "string",
    },
  ],
};

export default contactLink;
