import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import Script from 'next/script';
import { Navbar, Footer } from '../components';
import { NFTProvider } from '../context/NFTContext';

const MyApp = ({ Component, pageProps }) => (
  <NFTProvider>
    <ThemeProvider attribute="class">
      <div className="dark:bg-nft-dark bg-white min-h-screen">
        <Navbar />

        <div className="pt-65">
          <Component {...pageProps} />
        </div>

        <Footer />
      </div>
      <Script
        src="https://kit.fontawesome.com/f6332599ff.js"
        crossorigin="anonymous"
      />
    </ThemeProvider>
  </NFTProvider>
);

export default MyApp;
