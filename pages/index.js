import Head from "next/head";
import { Inter } from "@next/font/google";
import Navbar from "../components/Navbar";
// const inter = Inter({ subsets: ["latin"] });
import { Select, Popover, useMantineTheme, TextInput } from "@mantine/core";
// import { MapPin, PlusCircle, MinusCircle } from "phosphor-react";
import Image from "next/image";
import mainBg from "../assets/images/mainBg.webp";
import { DatePicker } from "@mantine/dates";
import "dayjs/locale/fa";
export default function Home() {
  const theme = useMantineTheme();
  return (
    <>
      <div className="h-screen w-screen flex-col items-center bg-gray-200 flex">
        <Navbar />
        <div className="w-screen h-96 ">
          <Image
            className=" h-rem26 w-full object-cover"
            src={mainBg}
            alt="Main Background"
          />
        </div>
        <div className="w-full  h-72 px-56">
          <div className="w-full h-full flex flex-col items-center justify-center space-x-6 transform drop-shadow-xl -translate-y-11 bg-white rounded-lg p-14  ">
            <div className="flex w-full h-full items-center flex-row-reverse justify-center space-x-5 mb-5">
              <Select
                className="text-2xl mx-6 text-right flex flex-col items-end   shadow-md "
                data={["تهران", "تبریز", "ارومیه", "مشهد"]}
                placeholder="مقصد یا هتل ( داخلی و خارجی )"
                label="مقصد یا هتل ( داخلی و خارجی )"
                variant="default"
                radius="xl"
                withAsterisk
                clearable
                searchable
                size="md"
                icon={<MapPin size={20} weight="fill" />}
              />
              <DatePicker
                locale="fa"
                className="text-4xl text-right flex flex-col items-end   shadow-md"
                placeholder="تاریخ ورود"
                label="تاریخ ورود"
                withAsterisk
                variant="default"
                radius="xl"
                size="md"
              />
              <DatePicker
                locale="fa"
                className="text-4xl text-right flex flex-col items-end   shadow-md"
                placeholder="تاریخ خروج"
                label="تاریخ خروج"
                withAsterisk
                variant="default"
                radius="xl"
                size="md"
              />
              <Popover width={300} position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <TextInput
                    className="text-4xl text-right flex flex-col items-end   shadow-md"
                    placeholder="انتخاب مسافر"
                    label="انتخاب مسافر"
                    variant="default"
                    radius="xl"
                    size="md"
                    withAsterisk
                  />
                </Popover.Target>
                <Popover.Dropdown>
                  <div className="w-full h-auto space-y-10 justify-center  flex flex-col items-center">
                    <h1 className="text-sm font-bold">اتاق اول</h1>
                    <div className="w-full flex flex-row-reverse justify-between items-center h-full ">
                      <h1 className="text-sm">بزرگسال(۱۲ سال به بالا)</h1>
                      <div className="flex text-blue-800  items-center justify-center space-x-5">
                        <PlusCircle size={27} weight="fill" />
                        <h1 className="text-sm font-bold">1</h1>
                        <MinusCircle size={27} weight="fill" />
                      </div>
                    </div>
                    <div className="w-full  flex flex-row-reverse justify-between items-center h-full ">
                      <h1 className="text-sm">کودک(تا ۱۲ سال)</h1>
                      <div className="flex text-blue-800 items-center justify-center space-x-5">
                        <PlusCircle size={27} weight="fill" />
                        <h1 className="text-sm font-bold">1</h1>
                        <MinusCircle size={27} weight="fill" />
                      </div>
                    </div>
                  </div>
                </Popover.Dropdown>
              </Popover>
            </div>
            <button className="px-14 rounded-full transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-xl font-mainFont">
              جستجو
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
