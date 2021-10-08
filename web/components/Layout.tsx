import Footer from "./Footer";
import Header from "./Header";
import BubblesPlayground from "./bubblesPlayground";
import CloudShape from "./CloudShape";
import { motion } from "framer-motion";

type Props = {
  children?: React.ReactNode;
  className?: String;
};

const Layout: React.FC<Props> = ({ children, className }) => {
  return (
    <>
      <div className="bg-heroBlue h-full w-full">
        <BubblesPlayground></BubblesPlayground>
        <Header></Header>

        <CloudShape
          svgClasses="transform rotate-180 relative z-20 filter drop-shadow-lg bg-opacity-95 relative top-1"
          pathClasses="fill-current text-white"
        />

        <motion.main
          className={`relative z-20 px-5  py-10 sm:px-15 md:px-15 lg:px-25 mx-auto bg-white bg-opacity-95 ${className}`}
        >
          {children}
        </motion.main>

        <CloudShape
          svgClasses="transform relative z-20 filter drop-shadow-lg bg-opacity-95 relative bottom-1"
          pathClasses="fill-current text-white"
        />

        <Footer></Footer>
      </div>
    </>
  );
};

export default Layout;
