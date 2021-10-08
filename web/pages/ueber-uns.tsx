import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/dist/client/link";
import { motion } from "framer-motion";
import { getClient } from "../lib/sanity.server";
import { groq } from "next-sanity";
import { PortableText, useSanityImage } from "../lib/sanity";
import Layout from "../components/Layout";
import { NextSeo } from "next-seo";

const UeberUns: NextPage = ({ data, preview }: any) => {
  return (
    <Layout>
      <NextSeo title={"Über Uns"} />
      <motion.section className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-20">
          <motion.div className="w-full md:w-4/12">
            <Image
              {...useSanityImage(data.image)}
              sizes="(max-width: 800px) 100vw, 800px"
              alt="placeholder"
            ></Image>
          </motion.div>

          <motion.div className="w-full md:w-8/12 space-y-3">
            <PortableText className="prose" blocks={data.content.text} />
          </motion.div>
        </div>
      </motion.section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}: any) => {
  const data = await getClient(preview).fetch(groq`
        *[_type == "aboutPage"][0] {
            image,
            content,
            excerpt
        }
    `);

  return {
    props: {
      data,
      preview,
    },
    revalidate: 60,
  };
};

export default UeberUns;
