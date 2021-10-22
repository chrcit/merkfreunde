import { PortableText } from "../lib/sanity";
import Link from "next/link";
import { ServiceItem } from "./angebote/[slug]";
import { GetStaticProps, NextPage } from "next";
import { m } from "framer-motion";
import { getClient } from "../lib/sanity.server";
import { groq } from "next-sanity";
import Layout from "../components/Layout";
import service from "../../studio/schemas/documents/service";
import ServiceCard from "../components/AngebotCard";

interface Props {
  services: ServiceItem[];
  preview: boolean;
}

const Angebote: NextPage<Props> = ({ services, preview }) => {
  return (
    <Layout>
      <section className="max-w-5xl mx-auto space-y-20 py-20">
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2">
          {services.map((item: ServiceItem, index: number) => (
            <ServiceCard key={index} service={item} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}: any) => {
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
      services,
      preview,
    },
    revalidate: 60,
  };
};

export default Angebote;
