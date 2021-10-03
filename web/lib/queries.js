export const getBySlug = groq`
    *[slug.current == $slug][0]
`