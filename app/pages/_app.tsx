import { AppProps } from "next/app";
import { CachedItemsContextProvider } from "../context/CachedItemsContext";
import Layout from "../layouts/Layout";
import "../styles/globals.css";

if (!!process.env.NEXT_PUBLIC_MOCK_RESPONSE_PATH) {
  require("../mocks");
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <CachedItemsContextProvider>
        <Component {...pageProps} />
      </CachedItemsContextProvider>
    </Layout>
  );
}
