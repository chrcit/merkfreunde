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
        <section className="max-w-5xl mx-auto space-y-20">
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
                className="prose"
                blocks={currentService.description.text}
              ></PortableText>
            </m.article>
          </div>

          <div className="grid gap-10 grid-cols-1 md:grid-cols-2">
            {services.map((item: ServiceItem, index: number) => {
              return (
                <m.article
                  className={`justify-center text-center text-white transition-colors shadow-lg rounded-lg ${
                    item.isActive ? "opacity-100" : "opacity-70"
                  }`}
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                  }}
                  whileHover={{
                    scale: 1.05,
                    opacity: 1,
                  }}
                  animate={{
                    opacity: item.isActive ? 1 : 0.7,
                    scale: item.isActive ? 1.05 : 1,
                  }}
                  style={{
                    backgroundColor: item.color,
                  }}
                  key={index}
                >
                  <Link href={item.slug}>
                    <a className="p-10 block">
                      <h2 className="text-xl lg:text-3xl mb-3 font-semibold break-words">
                        {item.title}
                      </h2>
                      <p className="font-bold">{item.price}</p>
                      <div className="prose text-white">
                        <PortableText
                          blocks={item.descriptionShort.text}
                        ></PortableText>
                      </div>
                    </a>
                  </Link>
                </m.article>
              );
            })}
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
