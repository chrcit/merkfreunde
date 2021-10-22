import { m } from "framer-motion";
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
import CSS from "csstype";
import service from "../../../studio/schemas/documents/service";
import Link from "next/link";
import ServiceCard from "../../components/AngebotCard";

export interface ServiceItem {
  title: string;
  description: any;
  price: string;
  descriptionShort: any;
  slug: string;
  color: CSS.Property.BackgroundColor;
  isActive: boolean;
}

interface Props {
  currentService: ServiceItem;
  services: ServiceItem[];
  preview: boolean;
}

const Angebot: NextPage<Props> = ({ currentService, services, preview }) => {
  return (
    <>
      <NextSeo
        title={currentService.title}
        description={currentService.description}
      ></NextSeo>
      <Layout>
        <section className="max-w-5xl mx-auto space-y-20 py-20">
          <div className="flex flex-col md:flex-row md:space-x-8 lg:space-x-12 mx-auto">
            <div className="mb-8 md:mb-0">
              <AccordionSidebar
                className="sticky top-3"
                entries={services}
                activeEntry={currentService}
              ></AccordionSidebar>
            </div>
            <m.article
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
                className="prose mb-10"
                blocks={currentService.description.text}
              ></PortableText>

              <ServiceCard service={currentService}></ServiceCard>
            </m.article>
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
  const currentService: ServiceItem = await getClient(preview).fetch(
    groq`
        *[_type == "service" && slug.current == $slug][0] {
            title,
            description,
            descriptionShort,
            price,
            "slug": '/angebote/' + slug.current,
            "color": color.hex
        }
    `,
    { slug: params.slug }
  );

  const services: Array<ServiceItem> = await getClient(preview).fetch(groq`
         *[_type == "service"] {
            title,
            description,
            descriptionShort,
            price,
            "slug": '/angebote/' + slug.current,
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
