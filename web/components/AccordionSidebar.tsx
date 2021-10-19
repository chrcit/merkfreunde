import Link from "next/link";
import CSS from "csstype";
import { m } from "framer-motion";
import { ServiceItem } from "../pages/angebote/[slug]";
interface Props {
  className?: string;
  activeEntry: ServiceItem;
  entries: ServiceItem[];
}

const AccordionSidebar = ({ activeEntry, entries, className }: Props) => {
  return (
    <>
      <aside className={`${className}`}>
        <m.ul className="flex flex-col w-full">
          {entries.map((entry, index) => {
            let isActive = entry.slug === activeEntry.slug;

            return (
              <m.li
                className={`text-white transition-colors hover:opacity-100 ${
                  isActive ? "opacity-100 " : "opacity-70"
                }`}
                style={{
                  backgroundColor: entry.color,
                }}
                initial={{
                  opacity: 0,
                  y: -25,
                  scale: isActive ? 1.05 : 1,
                  shadow: isActive ? "3px 3px 3px #333" : "none",
                }}
                whileHover={{
                  scale: 1.05,
                  zIndex: 3,
                  opacity: 1,
                  shadow: "3px 3px 3px #333",
                }}
                animate={{
                  opacity: isActive ? 1 : 0.7,
                  y: 0,
                  scale: isActive ? 1.05 : 1,
                  zIndex: isActive ? 2 : 1,
                }}
                transition={{ delay: index * 0.1, duration: 0.1 }}
                key={index}
              >
                <Link href={entry.slug}>
                  <a className="p-3 block">{entry.title}</a>
                </Link>
              </m.li>
            );
          })}
        </m.ul>
      </aside>
    </>
  );
};

export default AccordionSidebar;
