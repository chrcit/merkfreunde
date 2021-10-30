import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaWhatsapp, FaGoogle, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 p-5 sm:p-10 sm:justify-center sm:space-x-20 relative z-20">
        <section className="flex flex-col space-y-3 items-center bg-white bg-opacity-95 p-5 shadow w-full sm:w-1/2 md:w-1/3 xl:w-1/4">
          <Image
            alt="Merkfreunde Logo"
            width="250"
            height="250"
            layout="fixed"
            src="/logo.png"
            className="block"
          ></Image>

          <p className="text-center">
            strukturiert und konzentriert erfolgreich durch die Schule
          </p>

          <nav>
            <ul className="flex space-x-3">
              <li>
                <Link href="/impressum">
                  <a className="underline">Impressum</a>
                </Link>
              </li>
              <li>
                <Link href="/datenschutz">
                  <a className="underline">Datenschutz</a>
                </Link>
              </li>
            </ul>
          </nav>
        </section>

        <section className="flex flex-col text-center space-y-5 bg-white bg-opacity-95 p-5 shadow sm:justify-center w-full sm:w-1/2 md:w-1/3 xl:w-1/4">
          <div>
            <h3 className="text-2xl mb-3">Kontakt</h3>
            <address className="not-italic space-y-2">
              <a
                className="block underline"
                title="Google Maps Link to business address"
                href="https://www.google.com/maps/place/Edeltraudstra%C3%9Fe+24,+81827+M%C3%BCnchen,+Germany/@48.1125913,11.6850559,17z/data=!3m1!4b1!4m5!3m4!1s0x479de0301638b689:0x63fa5974218fccb1!8m2!3d48.1125913!4d11.6850559"
              >
                Edeltraudstr. 24 81827 München
              </a>

              <a className="block underline" href="tel:+4917614300141">
                (+49) 17614300141
              </a>

              <a className="block underline" href="mailto:info@merk-freunde.de">
                info@merk-freunde.de
              </a>
            </address>
          </div>

          <div>
            <h3 className="text-2xl mb-3">Folgen Sie Uns</h3>
            <ul className="flex space-x-5 justify-center">
              <li>
                <a
                  href="https://de-de.facebook.com/konzentration.mwerner/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook color="#4267B2" size={30} />
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/mkt_muenchen_ost/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram color="#833AB4" size={30} />
                </a>
              </li>

              <li>
                <a
                  href="https://api.whatsapp.com/send?phone=4917614300141"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp color="#075e54" size={30} />
                </a>
              </li>

              <li>
                <a
                  href="https://www.google.com/search?client=firefox-b-d&q=mkt+m%C3%BCnchen+ost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGoogle color="#818a91" size={30} />
                </a>
              </li>
            </ul>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
