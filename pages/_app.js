import GlobalProvider from "../context/GlobalContext";
import "../styles/globals.css";
import dynamic from "next/dynamic";
import "nprogress/nprogress.css";

const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar");
  },
  { ssr: false }
);

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <TopProgressBar />
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default MyApp;
