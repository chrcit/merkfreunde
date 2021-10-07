// deskStructure.js
import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title("Base")
    .items([
      S.listItem()
        .title("Über Uns")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.listItem()
        .title("Kontakt")
        .child(
          S.document().schemaType("contactPage").documentId("contactPage")
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !["aboutPage", "contactPage"].includes(listItem.getId())
      ),
    ]);
