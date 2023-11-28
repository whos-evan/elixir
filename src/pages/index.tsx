/* eslint-disable */
import { type NextPage } from "next";
import Head from "next/head";
import { Navbar } from "@/components";
import { FaSearch } from "react-icons/fa";
import { useRef } from "react";
import { xor, isUrl } from "@/components";
import { useRouter } from "next/router";
import useStore from "@/stores/useStore";
import useSettingStore from "@/stores/settingStore";

const Home: NextPage = () => {
  const router = useRouter();
  const input = useRef<HTMLInputElement | null>(null);
  const settingStore = useStore(useSettingStore, (state) => state);

  const Search = async () => {
    if (input.current?.value === "") return;
    let url = input.current?.value;
    if (!isUrl(url)) url = `https://search.brave.com/search?q=${url}`;
    else if (!(url?.startsWith("https://") || url?.startsWith("http://")))
      url = `http://${url}`;
    url = xor.encode(url);
    await router
      .push({
        pathname: `/service`,
        query: { q: url }
      })
      .catch((err) => console.error(err))
      .then(() => console.log("this will succeed"))
      .catch(() => "obligatory catch");
  };

  return (
    <>
      <Head>
        <title>Emerald | Home</title>
        <meta name="description" content="A Delusions production" />
        <link rel="shortcut icon" href="/emerald.png" type="image/png" />
      </Head>

      <main className="flex h-screen w-full flex-col items-center justify-center space-y-2">
        <Navbar />
        {/* Search bar */}
        <div
          onClick={() => input.current?.focus()}
          className="flex w-[26rem] items-center rounded-md border-[1px] border-white text-primary-100 "
        >
          <FaSearch className="mx-2 text-xl" />
          <input
            ref={input}
            type="text"
            className="w-96 border-0 bg-transparent p-2 text-base outline-none"
            placeholder={`https://google.com on ${settingStore?.settings?.proxy}`}
            onKeyDown={(e) => {
              if (e.key === "Enter") Search();
            }}
          />
        </div>
        <div className="flex w-[26rem] items-center  space-x-2">
          <h2 className="text-lg text-primary-100">Proxy: </h2>
          <div className="space-x-4">
            <button
              className={`rounded-md ${
                settingStore?.settings.proxy === "uv"
                  ? "bg-primary-300 p-2 text-white"
                  : "bg-primary-400 p-2 text-gray-200"
              } transition-all`}
              onClick={() => {
                if (settingStore?.settings.proxy != "uv") {
                  settingStore?.change({
                    ...settingStore,
                    proxy: "uv"
                  });
                }
              }}
            >
              Ultraviolet
            </button>
            <button
              className={`rounded-md ${
                settingStore?.settings.proxy === "dynamic"
                  ? "bg-primary-300 p-2 text-white"
                  : "bg-primary-400 p-2 text-gray-200"
              } transition-all`}
              onClick={() => {
                if (settingStore?.settings.proxy != "dynamic") {
                  settingStore?.change({
                    ...settingStore,
                    proxy: "dynamic"
                  });
                }
              }}
            >
              Dynamic (faster)
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
