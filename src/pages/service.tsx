/* eslint-disable */
import NavSearch from "@/components/NavSearch";
import { useEffect, useRef, useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import useStore from "@/stores/useStore";
import useSettingStore from "@/stores/settingStore";
const Service: NextPage<{ query: string }> = ({ query }) => {
  const settingStore = useStore(useSettingStore, (state) => state);
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    iframeRef.current?.addEventListener("load", () => {
      setLoading(!loading);
    });
  }, []);
  return (
    <div className="relative flex h-screen w-full flex-col">
      <NavSearch />
      <div className="h-full w-full">
        <div className="flex h-full w-full">
          {loading ? (
            <div className="flex h-full w-full flex-col items-center justify-center space-y-2">
              <h1 className="text-4xl text-primary-100">
                Loading {settingStore?.settings.proxy}...
              </h1>
            </div>
          ) : null}
          <iframe
            ref={iframeRef}
            width={"100%"}
            className={loading ? `hidden` : `border-none`}
            height="100%"
            src={`/~/${settingStore?.settings.proxy}/${query}`}
          ></iframe>
        </div>
      </div>
    </div>
  );
};
/*eslint require-await: "off"*/
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      query: context.query.q
    }
  };
};

export default Service;
