import Image from "next/image";
import { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { isUrl, xor } from "@/components";
import { useRouter } from "next/router";
import { MdExitToApp as Exit } from "react-icons/md";
import Link from "next/link";
const NavSearch = () => {
  const router = useRouter();
  const input = useRef<HTMLInputElement | null>(null);
  const Search = async () => {
    if (input.current?.value === "") return;
    let url = input.current?.value;
    if (!isUrl(url))
      url = `https://search.brave.com/search?q=${url}`; // eslint-disable-line
    else if (!(url?.startsWith("https://") || url?.startsWith("http://")))
      url = `http://${url}`; // eslint-disable-line
    url = xor.encode(url);
    await router
      .push({
        pathname: `/service`,
        query: { q: url },
      })
      .catch((err) => console.error(err))
      .then(() => console.log("succeeded"))
      .catch(() => "obligatory catch");
  };

  return (
    <nav className="flex h-16 w-full items-center justify-center rounded-b-lg bg-primary-400 drop-shadow-lg">
      <div className="m-2 flex h-full w-full items-center justify-between">
        <div className="flex flex-row items-center justify-center space-x-2 text-center">
          <Image
            src={"/images/emerald.png"}
            alt="emerald"
            width={50}
            height={50}
            className="m-5"
          />
          <h1 className="flex text-4xl text-primary-100">Emerald</h1>
        </div>
        <div
          onClick={() => input.current?.focus()}
          className="mr-40 flex w-[26rem] items-center rounded-md border-[1px] border-white text-primary-100 "
        >
          <FaSearch className="mx-2 text-xl" />
          <input
            ref={input}
            type="text"
            className="w-96 border-0 bg-transparent p-2 text-base outline-none"
            placeholder="https://google.com"
            onKeyDown={(e) => {
              if (e.key === "Enter") Search(); // eslint-disable-line
            }}
          />
        </div>
        <div className="mr-5 flex flex-row space-x-3">
          <Link href={"/"}>
            <button className="rounded-md bg-primary-500 p-2 text-3xl text-white transition-all hover:bg-primary-600">
              <Exit />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavSearch;
