import type { GetStaticProps, NextPage } from "next";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { getClient } from "../lib/sanity.server";
import { groq } from "next-sanity";
import { PortableText, useSanityImage } from "../lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Home: NextPage = ({ serviceExcerpts, aboutUsExcerpt }: any) => {
  return (
    <>
      <Layout className="space-y-40">
        <section className="max-w-5xl mx-auto mt-20">
          <h2 className="text-4xl text-center mb-10">Angebote</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {serviceExcerpts.map((excerpt: any, index: any) => (
              <li className="w-full" key={index}>
                <Link href={`/angebote/${excerpt.slug}`}>
                  <a className="flex flex-col space-y-3">
                    <motion.h2
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-xl inline-block font-semibold text-center text-white p-3 rounded-sm"
                      style={{ backgroundColor: excerpt.color.hex }}
                    >
                      {excerpt.title}
                    </motion.h2>

                    <PortableText blocks={excerpt.excerpt.text} />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <motion.section className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center space-y-10 md:space-y-0 md:space-x-20">
            <motion.div className="w-4/12">
              <Image
                {...useSanityImage(aboutUsExcerpt.image)}
                sizes="(max-width: 800px) 100vw, 800px"
                alt="placeholder"
              ></Image>
            </motion.div>

            <motion.div className="w-8/12 space-y-3">
              <PortableText
                className="prose"
                blocks={aboutUsExcerpt.excerpt.text}
              />

              <Link href="/ueber-uns" passHref>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-xl inline-block font-semibold text-center text-white p-3 rounded-sm bg-heroBlue"
                >
                  Mehr lesen
                </motion.a>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        <section id="kontakt" className="max-w-5xl mx-auto pb-20">
          <div className="flex flex-col md:flex-row md:items-center space-y-10 md:space-y-0 md:space-x-5">
            <div className="w-full md:w-1/2 space-y-10">
              <div>
                <h3 className="text-2xl text-center mb-5">
                  Kontaktieren Sie Uns
                </h3>
                <p className="text-center">
                  Unsere Telefonsprechstunde:
                  <br />
                  Montag-Donnerstag
                  <br />
                  10.00-11.30 Uhr
                  <br />
                </p>
              </div>

              <div className="grid grid-cols-2 gap-7">
                {[0, 1, 2, 3].map((index: any) => (
                  <div key={index}>
                    <a
                      className="flex flex-col space-y-3 text-center group"
                      href="tel:+4917614300141"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="group-hover:text-heroBlue">Icon</div>
                      <h3 className="text-xl font-semibold text-center">
                        Telefon
                      </h3>
                      <span className="group-hover:text-heroBlue">
                        +49 17614300141
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d170488.18578010958!2d11.685056!3d48.112591!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479de030162b14ab%3A0x6f73ff1599e6b8f9!2sMarburger%20Konzentrationstraining%20M%C3%BCnchen%20Ost!5e0!3m2!1sen!2sus!4v1632331430111!5m2!1sen!2sus"
                className="w-full"
                height="450"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>
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

  return {
    props: {
      serviceExcerpts,
      aboutUsExcerpt,
      preview,
    },
    revalidate: 60,
  };
};

export default Home;
