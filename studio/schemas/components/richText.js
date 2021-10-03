const richText = {
    title: 'Rich Text',
    name: 'richText',
    type: 'object',
    fields: [
        {
            name: 'text',
            title: 'Text',
            type: 'array',
            of: [
                {
                    type: 'block'
                },
                {
                    type: 'image'
                }
            ]
        }
    ]   
}

export default richText