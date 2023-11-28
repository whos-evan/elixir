import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

function Document() {
  return (
    <Html>
      <Head>
        <meta name="theme-color" content="#2F3E46" />
        <link rel="shortcut icon" href="/emerald.png" type="image/x-icon" />
      </Head>
      <body>
        <Main />
        <Script src="/uv/uv.bundle.js" strategy="beforeInteractive" />
        <Script src="/uv/uv.config.js" strategy="beforeInteractive" />
        <NextScript />
      </body>
    </Html>
  );
}
export default Document;
