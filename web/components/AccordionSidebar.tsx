import Link from "next/link";
import CSS from "csstype";
import { motion } from "framer-motion";
interface Props {
  className?: string;
  entries: {
    title: String;
    description: any;
    url: URL;
    color: CSS.Property.BackgroundColor;
    isActive: boolean;
  }[];
}

const AccordionSidebar = ({ entries, className }: Props) => {
  return (
    <>
      <aside className={`${className}`}>
        <motion.ul className="flex flex-col w-full">
          {entries.map((entry, index) => {
            return (
              <motion.li
                className={`text-white transition-colors hover:opacity-100 ${
                  entry.isActive
                    ? "opacity-100 transform scale-105"
                    : "opacity-70"
                }`}
                style={{
                  backgroundColor: entry.color,
                }}
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: entry.isActive ? 1 : 0.7, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.1 }}
                key={index}
              >
                <Link href={entry.url}>
                  <a className="p-3 block">{entry.title}</a>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </aside>
    </>
  );
};

export default AccordionSidebar;
