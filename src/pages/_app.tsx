import { type AppType } from "next/dist/shared/lib/utils";
import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { useSw } from "@/components";
const MyApp: AppType = ({ Component, pageProps }) => {
  useSw("/sw.js", "/~/");
  return (
    <>
      <AnimatePresence mode="wait">
        <Component {...pageProps} />
      </AnimatePresence>
    </>
  );
};

export default MyApp;
