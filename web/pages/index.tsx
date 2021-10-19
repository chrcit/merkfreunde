import type { GetStaticProps, NextPage } from "next";
import Layout from "../components/Layout";
import { getClient } from "../lib/sanity.server";
import { groq } from "next-sanity";
import { PortableText, useSanityImage } from "../lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { m } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaMapPin } from "react-icons/fa";

const ServicesSection = ({ serviceExcerpts }: any) => {
  return (
    <section className="max-w-5xl mx-auto pt-20">
      <h2 className="text-4xl text-center mb-10">Angebote</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {serviceExcerpts.map((excerpt: any, index: any) => (
          <li key={index}>
            <Link passHref href={`/angebote/${excerpt.slug}`}>
              <m.a
                initial={{
                  opacity: 0,
                  scale: 0.5,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                whileHover={{
                  scale: 1.05,
                  opacity: 1,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="w-full h-full justify-center text-center text-white p-5 rounded-lg flex flex-col"
                style={{ backgroundColor: excerpt.color.hex }}
              >
                <m.h2 className="text-xl font-semibold ">{excerpt.title}</m.h2>
                <div className="prose prose-sm text-white">
                  <PortableText blocks={excerpt.excerpt.text} />
                </div>
              </m.a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

const AboutSection = ({ aboutExcerpts }: any) => {
  return (
    <m.section className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center space-y-10 md:space-y-0 md:space-x-20">
        <m.div className="w-full md:w-4/12">
          <Image
            {...useSanityImage(aboutExcerpts.image)}
            sizes="(max-width: 800px) 100vw, 800px"
            alt="placeholder"
          ></Image>
        </m.div>

        <m.div className="w-full md:w-8/12 space-y-3">
          <PortableText className="prose" blocks={aboutExcerpts.excerpt.text} />

          <Link href="/ueber-uns" passHref>
            <m.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xl inline-block font-semibold text-center text-white p-3 rounded-sm bg-link"
            >
              Mehr lesen
            </m.a>
          </Link>
        </m.div>
      </div>
    </m.section>
  );
};

const ContactLink = ({ index, linkData }: any) => {
  let icon: any;
  let link: string;
  switch (linkData.icon.name) {
    case "FaPhoneAlt":
      icon = <FaPhoneAlt className="inline-block" size="3em" />;
      link = `tel:${linkData.linkTarget}`;
      break;
    case "FaEnvelope":
      icon = <FaEnvelope className="inline-block" size="3em" />;
      link = `mailto:${linkData.linkTarget}`;
      break;
    case "FaWhatsapp":
      icon = <FaWhatsapp className="inline-block" size="3em" />;
      link = `https://wa.me/${linkData.linkTarget}`;
      break;
    case "FaMapPin":
      icon = <FaMapPin className="inline-block" size="3em" />;
      link = `https://www.google.com/maps/search/?api=1&query=${linkData.linkTarget}`;
      break;
    default:
      link = "";
  }

  return (
    <div key={index}>
      <m.a
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className="flex flex-col space-y-3 text-center group"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="group-hover:text-link text-center">{icon}</div>
        <h3 className="group-hover:text-link text-xl font-semibold text-center">
          {linkData.linkText}
        </h3>
        <span className="group-hover:text-link">{linkData.linkTarget}</span>
      </m.a>
    </div>
  );
};

const ContactSection = ({ contactData }: any) => {
  return (
    <section id="kontakt" className="max-w-5xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center space-y-10 md:space-y-0 md:space-x-5">
        <div className="w-full md:w-1/2 space-y-10">
          <div>
            <PortableText
              className="prose text-center"
              blocks={contactData.content.text}
            />
          </div>

          <div className="grid grid-cols-2 gap-7">
            {contactData.contactOptions.map((option: any, index: any) => (
              <ContactLink key={index} linkData={option} />
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <m.iframe
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={contactData.mapCode}
            className="w-full"
            height="450"
            loading="lazy"
          ></m.iframe>
        </div>
      </div>
    </section>
  );
};

const Home: NextPage = ({
  serviceExcerpts,
  aboutUsExcerpt,
  contactData,
}: any) => {
  return (
    <>
      <Layout className="space-y-40">
        <ServicesSection serviceExcerpts={serviceExcerpts} />
        <AboutSection aboutExcerpts={aboutUsExcerpt} />
        <ContactSection contactData={contactData} />
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const serviceExcerpts = await getClient(preview).fetch(groq`
    *[_type == "service"] {
      "slug": slug.current,
      title,
      excerpt,
      color
    }
  `);

  const aboutUsExcerpt = await getClient(preview).fetch(groq`
    *[_type == "aboutPage"][0] {
      image,
      excerpt
    }
  `);

  const contactData = await getClient(preview).fetch(groq`
    *[_type == "contactPage"][0] {
      mapCode,
      content,
      contactOptions[] {
        icon,
        linkTarget,
        linkText,
        linkType
      }
    }
  `);

  return {
    props: {
      serviceExcerpts,
      aboutUsExcerpt,
      contactData,
      preview,
    },
    revalidate: 60,
  };
};

export default Home;
