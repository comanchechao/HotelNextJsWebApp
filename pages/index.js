import Head from "next/head";
import { Inter } from "@next/font/google";
import Navbar from "../components/Navbar";
// const inter = Inter({ subsets: ["latin"] });
import { Select } from "@mantine/core";
// import { MapPin } from "phosphor-react";
import Image from "next/image";
import mainBg from "../assets/images/mainBg.webp";
import { DatePicker } from "@mantine/dates";
import "dayjs/locale/fa";
export default function Home() {
  return (
    <>
      <div className="h-screen w-screen flex-col items-center bg-gray-200 flex">
        {/* <Navbar /> */}
        <div className="w-screen h-96 ">
          <Image
            className=" h-rem26 w-full object-cover"
            src={mainBg}
            alt="Main Background"
          />
        </div>
        <div className="w-full  h-72 px-56">
          <div className="w-full h-full flex flex-row-reverse items-center justify-center space-x-6 bg-white rounded-lg p-14  ">
            <Select
              className="text-4xl mx-6 text-right flex flex-col items-end justify-end"
              data={["تهران", "تبریز", "ارومیه", "مشهد"]}
              placeholder="مقصد یا هتل ( داخلی و خارجی )"
              label="مقصد یا هتل ( داخلی و خارجی )"
              variant="filled"
              radius="lg"
              withAsterisk
              clearable
              searchable
            />
            <DatePicker
              locale="fa"
              className="text-4xl text-right flex flex-col items-end justify-end"
              placeholder="تاریخ ورود"
              label="تاریخ ورود"
              withAsterisk
              variant="filled"
              radius="lg"
            />
            <DatePicker
              locale="fa"
              className="text-4xl text-right flex flex-col items-end justify-end"
              placeholder="تاریخ خروج"
              label="تاریخ خروج"
              withAsterisk
              variant="filled"
              radius="lg"
            />
          </div>
        </div>
      </div>
    </>
  );
}
