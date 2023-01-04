import Script from "next/script";
import { ThemeProvider } from "next-themes";
import { ChakraProvider } from "@chakra-ui/react";

import { NFTProvider } from "../context/NFTContext";
import { Footer, Navbar } from "../components";
import "../styles/globals.css";

const Marketplace = ({ Component, pageProps }) => (
  <NFTProvider>
    <ChakraProvider>
      <ThemeProvider attribute="class">
        <div className="dark:bg-nft-dark bg-white min-h-screen">
          <Navbar />
          <div className="pt-65">
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>

        <Script
          src="https://kit.fontawesome.com/d45b25ceeb.js"
          crossorigin="anonymous"
        />
      </ThemeProvider>
    </ChakraProvider>
  </NFTProvider>
);

export default Marketplace;
