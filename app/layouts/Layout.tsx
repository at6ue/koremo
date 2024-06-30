import { ThemeProvider } from "@mui/material";
import Head from "next/head";
import { ReactNode } from "react";
import RakutenWebServiceAttribution from "../components/RakutenWebServicesAttribution";
import styles from "../styles/Layout.module.css";
import MuiTheme from "./MuiTheme";

type LayoutProps = {
  children?: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>koremo</title>
      </Head>
      <ThemeProvider theme={MuiTheme}>
        <div className={styles.container}>
          {children}
          <RakutenWebServiceAttribution />
        </div>
      </ThemeProvider>
    </>
  );
}
