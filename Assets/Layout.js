import Head from "next/head";
import Navbar from "./Navbar.js";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Next Firebase App</title>
        <meta
          name="description"
          content="Simple Crud App using NextJS and Firebase"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto|Poppins|Lato|Inter"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="container mx-auto">{children}</div>
    </>
  );
};

export default Layout;
