import Head from "next/head";
import { Hero } from "../components";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const Layout = ({ home, children }) => {
  return (
    <>
      <Head>
        <title>E-Commerce</title>
        <meta name="description" content="Homepad murah, DISKON 75%, mudah dibawa kemana-mana" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="HTML, CSS, JavaScript, Product, Ecommerce" />
        <meta name="author" content="R. Agus Iman Sudrajat" />
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
