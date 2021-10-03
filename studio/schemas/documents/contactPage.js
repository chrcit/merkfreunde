const contactPage = {
    type: 'object',
    title: 'Über Uns Seite',
    name: 'aboutPage',
    fields: [
        {
            name: 'aboutImage',
            title: 'Bild',
            type: 'image'
        },
        {
            name: 'content',
            title: 'Inhalt',
            type: 'richText',
        }
    ]
}

export default contactPage;