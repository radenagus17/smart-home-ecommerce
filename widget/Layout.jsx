import { Hero } from "../components";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const Layout = ({ home, children }) => {
  return (
    <>
      <Nav />
      {home && <Hero />}
      {children}
      <Footer home={home} />
    </>
  );
};

export default Layout;
