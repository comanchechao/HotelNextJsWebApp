import Head from "next/head";
import { Inter } from "@next/font/google";
import Navbar from "../components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="h-screen w-screen bg-mainPurple items-center justify-center p-10 flex">
        <Navbar />
      </div>
    </>
  );
}
