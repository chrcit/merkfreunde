import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  NextPage,
} from "next";
import { groq } from "next-sanity";
import { NextSeo } from "next-seo";
import Layout from "../components/Layout";
import { PortableText, usePreviewSubscription } from "../lib/sanity";
import { getClient } from "../lib/sanity.server";
import Image from "next/image";
import { motion } from "framer-motion";
import { useNextSanityImage } from "next-sanity-image";

const pagesQuery = groq`
    *[_type == "page"]{
        "slug": slug.current
    }
`;
const singlePageQuery = groq`
    *[_type == "page" && slug.current == $slug][0]{
        "slug": slug.current,
        title,
        content
    }
`;

const Page: NextPage = ({ data, preview }: any) => {
  const { data: page } = usePreviewSubscription(singlePageQuery, {
    params: { slug: data?.slug },
    initialData: data,
    enabled: preview && data.slug,
  });

  const imageProps = useNextSanityImage(getClient(preview), page.image);

  return (
    <>
      <NextSeo title={page.title} description={page.description} />
      <Layout>
        <motion.article className="py-10 max-w-5xl mx-auto">
          <h1 className="text-6xl mb-5 text-center">{page.title}</h1>
          <section className="flex flex-col md:flex-row md:items-start space-y-10 md:space-y-0 md:space-x-20">
            <PortableText
              className="prose mx-auto"
              blocks={page.content.text}
            />
          </section>
        </motion.article>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}: any) => {
  const data = await getClient(preview).fetch(singlePageQuery, {
    slug: params.page,
  });

  return {
    props: {
      data,
      preview,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async (
  context: GetStaticPathsContext
) => {
  const pages = await getClient().fetch(pagesQuery);

  const paths = pages.map((page: any) => {
    return {
      params: {
        page: page.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default Page;
