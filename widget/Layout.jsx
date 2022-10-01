import Head from "next/head";
import { Hero } from "../components";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const Layout = ({ home, children }) => {
  return (
    <>
      <Head>
        <title>E-Commerce</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      {home && <Hero />}
      {children}
      <Footer home={home} />
    </>
  );
};

export default Layout;
