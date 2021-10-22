import { m } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { PortableText } from "../lib/sanity";
import { ServiceItem } from "../pages/angebote/[slug]";
import service from "../../studio/schemas/documents/service";

type Props = {
  service: ServiceItem;
};

const ServiceCard = ({ service }: Props) => {
  const router = useRouter();

  return (
    <m.article
      className={`justify-center text-center text-white transition-colors shadow-lg rounded-lg ${
        service.isActive ? "opacity-100" : "opacity-70"
      }`}
      initial={{
        opacity: 0,
        scale: 0.5,
      }}
      whileHover={{
        scale: router.asPath == service.slug ? 1 : 1.05,
      }}
      whileTap={{
        scale: router.asPath == service.slug ? 1 : 0.95,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      style={{
        backgroundColor: service.color,
      }}
    >
      <Link href={service.slug}>
        <a className="p-10 block">
          <h2 className="text-xl lg:text-3xl mb-3 font-semibold break-words">
            {service.title}
          </h2>
          <p className="font-bold">{service.price}</p>
          <div className="prose text-white">
            <PortableText blocks={service.descriptionShort.text}></PortableText>
          </div>
        </a>
      </Link>
    </m.article>
  );
};

export default ServiceCard;
