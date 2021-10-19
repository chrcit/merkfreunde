import { AnimatePresence, motion } from "framer-motion";
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  NextPage,
} from "next";
import { groq } from "next-sanity";
import { NextSeo } from "next-seo";
import AccordionSidebar from "../../components/AccordionSidebar";
import Layout from "../../components/Layout";
import { itemVariant } from "../../components/motionVariants";
import { PortableText } from "../../lib/sanity";
import { getClient } from "../../lib/sanity.server";

const Angebot: NextPage = ({ currentService, services, preview }: any) => {
  const accordionEntries = services.map((service: any) => {
    return {
      title: service.title,
      text: service.description,
      url: `/angebote/${service.slug}`,
      color: service.color,
      isActive: currentService.slug === service.slug,
    };
  });

  return (
    <>
      <NextSeo
        title={currentService.title}
        description={currentService.description}
      ></NextSeo>
      <Layout>
        <section className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:space-x-5 lg:space-x-8 mx-auto">
            <div className="mb-8 md:mb-0">
              <AccordionSidebar
                className="sticky top-3"
                entries={accordionEntries}
              ></AccordionSidebar>
            </div>
            <motion.article
              variants={itemVariant}
              initial="hidden"
              animate="show"
              exit="exit"
              className="w-full md:w-2/3"
            >
              <h1
                style={{
                  color: currentService.color,
                }}
                className="text-2xl sm:text-3xl md:text-5xl mb-3 font-semibold break-words"
              >
                {currentService.title}
              </h1>
              <PortableText
                className="prose"
                blocks={currentService.description.text}
              ></PortableText>
            </motion.article>
          </div>
        </section>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}: any) => {
  const currentService = await getClient(preview).fetch(
    groq`
        *[_type == "service" && slug.current == $slug][0] {
            title,
            description,
            "slug": slug.current,
            "color": color.hex
        }
    `,
    { slug: params.slug }
  );

  const services: Array<object> = await getClient(preview).fetch(groq`
         *[_type == "service"] {
            title,
            description,
            "slug": slug.current,
            "color": color.hex
        }   
    `);

  return {
    props: {
      currentService,
      services,
      preview,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async (
  context: GetStaticPathsContext
) => {
  const services: Array<object> = await getClient().fetch(groq`
        *[_type == "service"] {
            "slug": slug.current
        }
    `);

  const paths = services.map((service: any) => {
    return {
      params: { slug: service.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default Angebot;
