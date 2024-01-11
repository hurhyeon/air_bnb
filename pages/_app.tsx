import { AppProps } from "next/app";
import GlobalStyle from "../styles/Globalstyle";
import React from "react";

const app = ({Component, pageProps}: AppProps) => {
  return(
    <>
    <GlobalStyle/>
    <Component {...pageProps}/>
    </>
  );
};

export default app;