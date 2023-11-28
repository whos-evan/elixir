import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-control", "max-age=1800");
  res.status(200).json([
    {
      title: "Youtube",
      source: "https://youtube.com",
      icon: "/images/youtube.png",
    },
    {
      title: "invidious - Youtube alternative",
      source: "https://vid.puffyan.us",
      icon: "/images/invidious.png",
    },
    {
      title: "Spotify",
      source: "https://open.spotify.com/",
      icon: "/images/Spotify.png",
    },
    {
      title: "Discord",
      source: "https://discord.com",
      icon: "/images/Discord.png",
    },
    {
      title: "Instagram",
      source: "https://instagram.com/",
      icon: "/images/instagram.png",
    },
    {
      title: "Reddit",
      source: "https://reddit.com",
      icon: "/images/reddit.png",
    },
    {
      title: "Mathway",
      source: "https://www.mathway.com",
      icon: "/images/Mathway.png",
    },
    {
      title: "Goku.sx - Watch movies and shows for free",
      source: "https://goku.sx/",
      icon: "/images/goku.png",
    },
    {
      title: "Aniwatch.to - watch anime for free",
      source: "https://aniwatch.to",
      icon: "/images/zoro.jpg",
    },
    {
      title: "Phantom Games",
      source: "https://phantom.delusionz.xyz/",
      icon: "/images/phantom.png",
    },
  ]);
}
