import Footer from "../components/Footer";
import Nav from "../components/Nav";

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
