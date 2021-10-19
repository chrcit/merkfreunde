import Link from "next/link";
import Image from "next/image";
import BubblesPlayground from "../components/bubblesPlayground";

const Header = () => {
  return (
    <>
      <section className="relative z-40 h-96">
        <header className="flex flex-col px-5 sm:py-5 md:px-12 py-5 z-20 absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 shadow rounded-lg items-center">
          <Link href="/">
            <a className="">
              <Image
                alt="Professor"
                width="143"
                height="180"
                layout="fixed"
                src="/Merkfreunde-Professor.png"
                className="mx-auto block filter drop-shadow-xl"
              ></Image>
            </a>
          </Link>
          <div className="flex flex-col space-y-3 justify-center">
            <Link href="/">
              <a className="flex flex-col justify-center text-center">
                <h1 className="block text-5xl break-words">Merkfreunde</h1>
                <h2 className="block text-lg">
                  by&nbsp;MKT&nbsp;München&nbsp;Ost
                </h2>
              </a>
            </Link>

            <nav className="border-top">
              <ul className="flex justify-center space-x-5">
                <li className="">
                  <Link href="/ueber-uns">
                    <a>Über&nbsp;Uns</a>
                  </Link>
                </li>

                <li className="">
                  <Link href="/angebote/hausaufgabenbetreuung">
                    <a>Angebot</a>
                  </Link>
                </li>

                <li className="">
                  <Link href="/#kontakt">
                    <a>Kontakt</a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </section>
    </>
  );
};

export default Header;
