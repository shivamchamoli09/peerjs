import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect, useState, createContext } from "react";
import initHttpInterceptor from "../core/interceptors/http.interceptor";
import { RouteGuard, ThemeWrapper } from "@wrappers";
import LoaderComponent from "../components/common/Loader/index";
import { ILoaderContext, LoaderContext } from "../core/context/loader.context";
import { Button } from "@mui/material";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import AlertComponent from "../components/alert";
import store from "../core/stores/root/store";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeWrapper>
        <RouteGuard>
          <Layout>
            <LoaderComponent />
            <Component {...pageProps} />
          </Layout>
        </RouteGuard>
      </ThemeWrapper>
    </Provider>
  );
}

export default MyApp;
