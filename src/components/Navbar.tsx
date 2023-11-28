import React, { useEffect } from "react";
import Image from "next/image";
import { IoIosApps } from "react-icons/io";
import { FaDiscord } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { Gamepad2 } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { xor } from "./xor";
import { useRouter } from "next/router";
import type { AppType } from "@/types";
const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>();
  const [apps, setApps] = React.useState<AppType[]>();
  useEffect(() => {
    const fetchApps = async () => {
      await fetch("/api/apps/")
        .then((res) => res.json())
        .catch((err: unknown) => console.error(err))
        .then((data: AppType[]) => setApps(data));
    };
    fetchApps(); // eslint-disable-line
  }, []);
  return (
    <>
      <nav className="fixed top-0 flex h-16 w-6/12 items-center justify-center rounded-b-lg bg-primary-400 drop-shadow-lg">
        <div className="m-2 flex h-full w-full items-center justify-between">
          <div className="flex flex-row items-center justify-center space-x-3">
            <Image
              src={"/emerald.png"}
              alt="emerald"
              width={45}
              height={45}
              className="m-5"
            />
            <h1 className="flex text-4xl text-primary-100">Emerald</h1>
          </div>
          {/* buttons */}
          <div className="mr-5 flex flex-row space-x-4">
            <Link href={"https://discord.gg/nq5xqEbHtp"} target="_blank">
              <button className="flex items-center justify-center rounded-md  border-[1px]  border-[#5865F2] px-3 py-2 text-center text-lg text-white transition-all ease-linear hover:bg-[#5865F2]">
                <FaDiscord className=" mr-2 mt-[.5px] w-5" />
                Discord
              </button>
            </Link>
            <Link href={"/"}>
              <button
                disabled // border-[#c656e7] hover:bg-[#c656e7]
                className="flex items-center justify-center rounded-md border-[1px] border-zinc-700 px-3 py-2 text-center text-lg text-zinc-500 transition-all ease-linear "
              >
                <Gamepad2 className=" mr-2 mt-[.5px] w-5" />
                Games
              </button>
            </Link>
            <button
              className="flex items-center justify-center rounded-md  border-[1px]  border-primary-200 px-3 py-2 text-center text-lg text-white transition-all ease-linear hover:bg-primary-200"
              onClick={() => setOpen(true)}
            >
              <IoIosApps className=" mr-2 mt-[.5px] w-5" />
              Apps
            </button>
          </div>
        </div>
      </nav>
      <AnimatePresence mode="wait">
        {open && (
          <>
            <motion.div
              className="fixed h-full w-full bg-black/40"
              variants={{
                open: {
                  opacity: 1,
                  transition: {
                    duration: 0.1
                  }
                },
                closed: {
                  opacity: 0
                }
              }}
              exit="closed"
              initial="closed"
              animate="open"
              onClick={() => setOpen(false)}
            ></motion.div>
            {/* Drawer */}
            <motion.div
              className="absolute right-0 z-20 flex h-full flex-col space-y-16 overflow-x-hidden  bg-primary-400 "
              variants={{
                open: {
                  width: "50rem",
                  transition: {
                    delayChildren: 0.4,
                    staggerChildren: 0.04
                  }
                },
                closed: {
                  width: "0rem"
                }
              }}
              exit="closed"
              initial="closed"
              animate="open"
            >
              <motion.h1
                className="mt-4 pl-7 text-5xl text-primary-100"
                variants={{
                  open: {
                    y: 0,
                    opacity: 1
                  },
                  closed: {
                    y: -40,
                    opacity: 0
                  }
                }}
              >
                Emerald Apps
              </motion.h1>
              <motion.div className="flex flex-wrap justify-center space-x-5">
                {Array.isArray(apps)
                  ? Array.from(apps).map((app, i) => {
                      return (
                        <motion.div
                          key={i}
                          variants={{
                            open: {
                              y: 0,
                              opacity: 1
                            },
                            closed: {
                              y: -40,
                              opacity: 0
                            }
                          }}
                          className="group z-10 my-2 drop-shadow-lg"
                          // eslint-disable-next-line
                          onClick={() => {
                            // eslint-disable-next-line
                            router.push({
                              pathname: "/service",
                              query: { q: xor.encode(app.source) }
                            });
                          }}
                        >
                          <div className=" flex w-28 justify-center rounded-lg bg-primary-500 p-1 transition-all hover:cursor-pointer hover:bg-primary-300">
                            <span>
                              <Image
                                src={app.icon}
                                alt={app.title}
                                width={200}
                                height={200}
                                className="rounded-xl"
                              />
                            </span>
                          </div>
                        </motion.div>
                      );
                    })
                  : null}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
