import "../css/reset.css";
import Head from "next/head";
import { Fragment, useEffect } from "react";
const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <Fragment>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
};

export default MyApp;
