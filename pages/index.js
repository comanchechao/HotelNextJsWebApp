import Head from "next/head";
import { Inter } from "@next/font/google";
import Navbar from "../components/Navbar";
import Faq from "../components/Faq";
// const inter = Inter({ subsets: ["latin"] });
import { Select, Popover, useMantineTheme, TextInput } from "@mantine/core";
import Image from "next/image";
import mainBg from "../assets/images/mainBg.webp";
import { DatePicker } from "@mantine/dates";
import { MapPin, PlusCircle, MinusCircle, CaretLeft } from "phosphor-react";
import Antalia from "../assets/images/Antalia.webp";
import Istanbul from "../assets/images/Istanbul.webp";
import Van from "../assets/images/Van.webp";
import Dubai from "../assets/images/Dubai.webp";
import Amsterdam from "../assets/images/Amsterdam.webp";
import Berlin from "../assets/images/Berlin.webp";
import Paris from "../assets/images/Paris.webp";
import Baku from "../assets/images/Baku.webp";
import Milan from "../assets/images/Milan.webp";
import Irvan from "../assets/images/Irvan.webp";
import Rome from "../assets/images/Rome.webp";
import Moscow from "../assets/images/Moscow.webp";
import Kish from "../assets/images/Kish.webp";
import Tehran from "../assets/images/Tehran.webp";
import Mashhad from "../assets/images/Mashhad.webp";
import Shiraz from "../assets/images/Shiraz.webp";
import Tabriz from "../assets/images/Tabriz.webp";
import Esfahan from "../assets/images/Esfahan.webp";

import "dayjs/locale/fa";
import Footer from "../components/Footer";
export default function Home() {
  const theme = useMantineTheme();
  return (
    <>
      <div className="h-full w-screen bg-gray-200 overflow-x-hidden">
        <Navbar />
        <div className="w-screen h-96 ">
          <Image
            className=" h-rem26 w-full object-cover"
            src={mainBg}
            alt="Main Background"
          />
        </div>
        <div className="w-full h-auto lg:h-72 lg:px-56 z-40">
          <div className="w-full z-30 h-full flex flex-col items-center justify-center space-x-6 transform drop-shadow-xl -translate-y-11 bg-white rounded-sm p-14  ">
            <div className="flex w-full h-full items-center flex-col lg:flex-row-reverse justify-center space-x-5 mb-5">
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
                dropdownPosition="top-start"
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
                dropdownPosition="top-start"
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
        <div className="w-full h-auto  lg:h-60 lg:px-56 z-10">
          <div className="w-full h-full flex flex-col lg:flex-row-reverse items-center justify-around lg:mb-10 lg:py-0 my-10 py-14 space-y-5 lg:space-x-0 drop-shadow-xl bg-white rounded-sm lg:p-14  ">
            <div className="flex flex-col items-center space-y-2">
              <svg
                viewBox="0 0 24 24"
                width="40"
                height="40"
                fill="currentColor"
                className="text-blue-400 bg-blue-100 rounded-full p-2 ml-3 md:ml-0"
              >
                <path
                  d="M12 1.5c5.799 0 10.5 4.7 10.5 10.5S17.799 22.5 12 22.5C6.2 22.5 1.5 17.799 1.5 12c0-.289.012-.578.035-.865a.75.75 0 0 1 1.495.123 9 9 0 1 0 2.637-5.653l2.445.003a.75.75 0 0 1 .744.664l.005.087a.75.75 0 0 1-.663.744l-.088.005-4.029-.005a.75.75 0 0 1-.744-.663l-.002-.014a.752.752 0 0 1-.003-.19l.006-3.913a.75.75 0 0 1 1.495-.085l.005.087-.004 2A10.474 10.474 0 0 1 12 1.5Zm0 4.381c.48 0 .87.39.87.87v1.212a4.46 4.46 0 0 1 1.46.518c.405.239.49.794.21 1.172a.814.814 0 0 1-1.066.205 3.618 3.618 0 0 0-1.772-.457c-.731 0-1.144.316-1.144.802 0 1.279 4.662.415 4.662 3.447 0 1.262-.781 2.253-2.35 2.525v1.075a.87.87 0 0 1-1.74 0v-1.049c-.798-.106-1.457-.364-1.993-.723-.373-.25-.443-.772-.185-1.14a.82.82 0 0 1 1.125-.21c.525.348 1.19.594 1.966.594.962 0 1.412-.427 1.412-.902 0-1.412-4.676-.426-4.676-3.482 0-1.17.878-2.162 2.352-2.41V6.75c0-.48.389-.869.869-.869Z"
                  fill-rule="evenodd"
                ></path>
              </svg>
              <h2 className="font-bold text-lg">درخواست استرداد</h2>
              <h3 className=" font-extralight text-sm">
                سریع‌ترین راه برای کنسلی و لغو رزرو
              </h3>
              <a
                href="/profile/orders"
                className=" text-blue-500 flex items-center transition ease-in duration-100 hover:text-mainBlue flex-row-reverse "
              >
                <span>سفرهای من</span>
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="mr-2"
                >
                  <path d="M16.698 21.266a.75.75 0 0 1-1.08 1.037l-.066-.069-8.25-9.75a.75.75 0 0 1-.058-.89l.058-.078 8.25-9.75a.75.75 0 0 1 1.202.893l-.056.075L8.858 12l7.84 9.266Z"></path>
                </svg>
              </a>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <svg
                viewBox="0 0 24 24"
                width="40"
                height="40"
                fill="currentColor"
                className="text-blue-400 bg-blue-100 rounded-full p-2 ml-3 md:ml-0"
              >
                <path
                  d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5 22.5 17.8 22.5 12 17.8 1.5 12 1.5ZM12 3a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9Zm.242 12.634a.72.72 0 0 0-.72.72v.36a.72.72 0 0 0 .636.715l.084.005a.72.72 0 0 0 .72-.72v-.36a.72.72 0 0 0-.72-.72Zm-.285-9.068c-.5 0-.943.07-1.33.208a2.664 2.664 0 0 0-.98.592c-.264.258-.467.57-.605.937a3.48 3.48 0 0 0-.206 1.229c0 .354.054.683.164.99.108.308.257.6.441.878.185.279.394.541.629.788.232.247.475.488.724.721.286.266.48.565.578.897.1.334.147.693.147 1.078h1.445a6.226 6.226 0 0 0-.079-.96 2.803 2.803 0 0 0-.226-.726 3.122 3.122 0 0 0-.41-.636 11.256 11.256 0 0 0-.627-.69 56.686 56.686 0 0 0-.511-.519 3.796 3.796 0 0 1-.43-.507 2.073 2.073 0 0 1-.403-1.268c0-.546.144-.973.43-1.283.287-.31.703-.464 1.25-.464.228 0 .448.03.659.09.21.059.396.153.56.28a1.4 1.4 0 0 1 .395.484c.1.195.148.428.148.698h1.444a2.797 2.797 0 0 0-.258-1.186 2.65 2.65 0 0 0-.678-.885 3.035 3.035 0 0 0-1.01-.555 4.033 4.033 0 0 0-1.26-.191Z"
                  fill-rule="evenodd"
                ></path>
              </svg>
              <h2 className="font-bold text-lg">راهنمای سفر</h2>
              <h3 className=" font-extralight text-sm">
                راهنمای خرید و استرداد، قوانین و پرسش‌ها
              </h3>
              <a
                href="/profile/orders"
                className=" text-blue-500 flex items-center transition ease-in duration-100 hover:text-mainBlue flex-row-reverse "
              >
                <span>مرکز پشتیبانی آنلاین </span>
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="mr-2"
                >
                  <path d="M16.698 21.266a.75.75 0 0 1-1.08 1.037l-.066-.069-8.25-9.75a.75.75 0 0 1-.058-.89l.058-.078 8.25-9.75a.75.75 0 0 1 1.202.893l-.056.075L8.858 12l7.84 9.266Z"></path>
                </svg>
              </a>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <svg
                viewBox="0 0 24 24"
                width="40"
                height="40"
                fill="currentColor"
                className="text-blue-400 bg-blue-100 rounded-full p-2 ml-3 md:ml-0"
              >
                <path
                  d="M12 2.25c4.069 0 7.386 3.182 7.497 7.156l.003.206v1.58l1.029.193a1.49 1.49 0 0 1 1.216 1.34l.005.119v.883c0 .717-.515 1.328-1.221 1.46l-1.029.191v.847c0 2.39-1.927 4.333-4.332 4.42l-.168.003h-.158a1.853 1.853 0 0 1-1.694 1.102h-2.296a1.852 1.852 0 0 1 0-3.703h2.296c.756 0 1.406.452 1.694 1.1H15c1.609 0 2.916-1.23 2.996-2.772l.004-.15v-.515l-1.14.28c-.906.221-1.79-.42-1.856-1.33L15 14.549v-3.261c0-.97.919-1.672 1.86-1.441l1.14.278v-.513c0-3.234-2.683-5.862-6-5.862-3.255 0-5.899 2.53-5.997 5.68L6 9.612v.514l1.14-.279c.905-.222 1.79.419 1.856 1.33l.004.111v3.261c0 .97-.918 1.67-1.86 1.441l-2.049-.502-1.62-.301a1.49 1.49 0 0 1-1.216-1.341l-.005-.119v-.883c0-.716.516-1.327 1.222-1.46l1.027-.191v-.7H4.5v-.88c0-4.07 3.361-7.363 7.5-7.363Zm1.148 17.297h-2.296a.351.351 0 1 0 0 .703h2.296a.352.352 0 1 0 0-.703Zm-5.649-8.245L6 11.669v2.497l1.5.368v-3.232Zm9.001 0v3.232l1.5-.368V11.67l-1.5-.367Zm-12 1.416-.75.14v.854l.75.14v-1.134Zm15 0v1.134l.75-.14v-.854l-.75-.14Z"
                  fill-rule="evenodd"
                ></path>
              </svg>
              <h2 className="font-bold text-lg">درخواست پشتیبانی</h2>
              <h3 className=" font-extralight text-sm">
                سریع‌ترین راه برای بررسی مشکلات شما
              </h3>
              <a
                href="/profile/orders"
                className=" text-blue-500 flex items-center transition ease-in duration-100 hover:text-mainBlue flex-row-reverse "
              >
                <span>سفرهای من</span>
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="mr-2"
                >
                  <path d="M16.698 21.266a.75.75 0 0 1-1.08 1.037l-.066-.069-8.25-9.75a.75.75 0 0 1-.058-.89l.058-.078 8.25-9.75a.75.75 0 0 1 1.202.893l-.056.075L8.858 12l7.84 9.266Z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="w-full h-auto lg:space-y-0 space-y-2 lg:h-rem26 py-6 flex-col lg:flex-row flex items-center justify-center space-x-5 lg:px-56 my-10">
          <div className=" w-full h-full flex flex-col items-center justify-around lg:space-y-0 space-y-4">
            <a className="h-20  w-full flex flex-row-reverse items-center justify-between p-5 cursor-pointer transition ease-in duration-300 hover:drop-shadow-2xl bg-white">
              <div className="flex flex-row-reverse items-center">
                <Image alt="antalia" src={Van} />
                <h3 className="text-lg ml-1 mr-2">هتل‌های</h3>
                <strong>وان</strong>
              </div>
              <CaretLeft size={20} weight="bold" />
            </a>

            <a className="h-20   w-full flex flex-row-reverse items-center justify-between p-5 cursor-pointer transition ease-in duration-300 hover:drop-shadow-2xl bg-white">
              <div className="flex flex-row-reverse items-center">
                <Image alt="antalia" src={Irvan} />
                <h3 className="text-lg ml-1 mr-2">هتل‌های</h3>
                <strong>ایروان</strong>
              </div>
              <CaretLeft size={20} weight="bold" />
            </a>
            <a className="h-20   w-full flex flex-row-reverse items-center justify-between p-5 cursor-pointer transition ease-in duration-300 hover:drop-shadow-2xl bg-white">
              <div className="flex flex-row-reverse items-center">
                <Image alt="antalia" src={Rome} />
                <h3 className="text-lg ml-1 mr-2">هتل‌های</h3>
                <strong>رم</strong>
              </div>
              <CaretLeft size={20} weight="bold" />
            </a>
            <a className="h-20   w-full flex flex-row-reverse items-center justify-between p-5 cursor-pointer transition ease-in duration-300 hover:drop-shadow-2xl bg-white">
              <div className="flex flex-row-reverse items-center">
                <Image alt="antalia" src={Moscow} />
                <h3 className="text-lg ml-1 mr-2">هتل‌های</h3>
                <strong>مسکو</strong>
              </div>
              <CaretLeft size={20} weight="bold" />
            </a>
          </div>
          <div className=" w-full h-full flex flex-col items-center justify-around  lg:space-y-0 space-y-2">
            <a className="h-20  w-full flex flex-row-reverse items-center justify-between p-5 cursor-pointer transition ease-in duration-300 hover:drop-shadow-2xl bg-white">
              <div className="flex flex-row-reverse items-center">
                <Image alt="antalia" src={Istanbul} />
                <h3 className="text-lg ml-1 mr-2">هتل‌های</h3>
                <strong>استانبول</strong>
              </div>
              <CaretLeft size={20} weight="bold" />
            </a>

            <a className="h-20   w-full flex flex-row-reverse items-center justify-between p-5 cursor-pointer transition ease-in duration-300 hover:drop-shadow-2xl bg-white">
              <div className="flex flex-row-reverse items-center">
                <Image alt="antalia" src={Paris} />
                <h3 className="text-lg ml-1 mr-2">هتل‌های</h3>
                <strong>پاریس</strong>
              </div>
              <CaretLeft size={20} weight="bold" />
            </a>
            <a className="h-20   w-full flex flex-row-reverse items-center justify-between p-5 cursor-pointer transition ease-in duration-300 hover:drop-shadow-2xl bg-white">
              <div className="flex flex-row-reverse items-center">
                <Image alt="antalia" src={Baku} />
                <h3 className="text-lg ml-1 mr-2">هتل‌های</h3>
                <strong>باکو</strong>
              </div>
              <CaretLeft size={20} weight="bold" />
            </a>
            <a className="h-20   w-full flex flex-row-reverse items-center justify-between p-5 cursor-pointer transition ease-in duration-300 hover:drop-shadow-2xl bg-white">
              <div className="flex flex-row-reverse items-center">
                <Image alt="antalia" src={Milan} />
                <h3 className="text-lg ml-1 mr-2">هتل‌های</h3>
                <strong>میلان</strong>
              </div>
              <CaretLeft size={20} weight="bold" />
            </a>
          </div>
          <div className=" w-full h-full flex flex-col items-center justify-around  lg:space-y-0 space-y-2">
            <a className="h-20  w-full flex flex-row-reverse items-center justify-between p-5 cursor-pointer transition ease-in duration-300 hover:drop-shadow-2xl bg-white">
              <div className="flex flex-row-reverse items-center">
                <Image alt="antalia" src={Antalia} />
                <h3 className="text-lg ml-1 mr-2">هتل‌های</h3>
                <strong>آنتالیا</strong>
              </div>
              <CaretLeft size={20} weight="bold" />
            </a>

            <a className="h-20   w-full flex flex-row-reverse items-center justify-between p-5 cursor-pointer transition ease-in duration-300 hover:drop-shadow-2xl bg-white">
              <div className="flex flex-row-reverse items-center">
                <Image alt="antalia" src={Dubai} />
                <h3 className="text-lg ml-1 mr-2">هتل‌های</h3>
                <strong>دبی</strong>
              </div>
              <CaretLeft size={20} weight="bold" />
            </a>
            <a className="h-20   w-full flex flex-row-reverse items-center justify-between p-5 cursor-pointer transition ease-in duration-300 hover:drop-shadow-2xl bg-white">
              <div className="flex flex-row-reverse items-center">
                <Image alt="antalia" src={Amsterdam} />
                <h3 className="text-lg ml-1 mr-2">هتل‌های</h3>
                <strong>آمستردام</strong>
              </div>
              <CaretLeft size={20} weight="bold" />
            </a>
            <a className="h-20   w-full flex flex-row-reverse items-center justify-between p-5 cursor-pointer transition ease-in duration-300 hover:drop-drop-shadow-2xl bg-white">
              <div className="flex flex-row-reverse items-center">
                <Image alt="antalia" src={Berlin} />
                <h3 className="text-lg ml-1 mr-2">هتل‌های</h3>
                <strong>برلین</strong>
              </div>
              <CaretLeft size={20} weight="bold" />
            </a>
          </div>
        </div>
        <div className="w-full h-auto py-6 flex items-center lg:flex-row flex-col space-y-2 lg:space-y-0 justify-center space-x-5 lg:px-56 my-10">
          <div className=" w-full h-full flex flex-col space-y-3 items-center justify-center">
            <a className="h-20  w-full flex flex-row-reverse items-center justify-between p-5 cursor-pointer transition ease-in duration-300 hover:drop-shadow-2xl bg-white">
              <div className="flex flex-row-reverse items-center">
                <Image
                  className="h-16 w-14 object-contain"
                  alt="antalia"
                  src={Kish}
                />
                <h3 className="text-lg ml-1 mr-2">هتل‌های</h3>
                <strong>کیش</strong>
              </div>
              <CaretLeft size={20} weight="bold" />
            </a>

            <a className="h-20   w-full flex flex-row-reverse items-center justify-between p-5 cursor-pointer transition ease-in duration-300 hover:drop-shadow-2xl bg-white">
              <div className="flex flex-row-reverse items-center">
                <Image
                  className="h-10 w-14 object-contain"
                  alt="antalia"
                  src={Shiraz}
                />
                <h3 className="text-lg ml-1 mr-2">هتل‌های</h3>
                <strong>شیراز</strong>
              </div>
              <CaretLeft size={20} weight="bold" />
            </a>
          </div>
          <div className=" w-full h-full flex flex-col space-y-3 items-center justify-center">
            <a className="h-20  w-full flex flex-row-reverse items-center justify-between p-5 cursor-pointer transition ease-in duration-300 hover:drop-shadow-2xl bg-white">
              <div className="flex flex-row-reverse items-center">
                <Image
                  className="h-16 w-14 object-contain"
                  alt="antalia"
                  src={Tehran}
                />
                <h3 className="text-lg ml-1 mr-2">هتل‌های</h3>
                <strong>تهران</strong>
              </div>
              <CaretLeft size={20} weight="bold" />
            </a>

            <a className="h-20   w-full flex flex-row-reverse items-center justify-between p-5 cursor-pointer transition ease-in duration-300 hover:drop-shadow-2xl bg-white">
              <div className="flex flex-row-reverse items-center">
                <Image
                  className="h-16 w-10 object-contain"
                  alt="antalia"
                  src={Esfahan}
                />
                <h3 className="text-lg ml-1 mr-2">هتل‌های</h3>
                <strong>اصفهان</strong>
              </div>
              <CaretLeft size={20} weight="bold" />
            </a>
          </div>
          <div className=" w-full h-full flex flex-col space-y-3 items-center justify-center">
            <a className="h-20  w-full flex flex-row-reverse items-center justify-between p-5 cursor-pointer transition ease-in duration-300 hover:drop-shadow-2xl bg-white">
              <div className="flex flex-row-reverse items-center">
                <Image
                  className="h-16 w-14 object-contain"
                  alt="antalia"
                  src={Mashhad}
                />
                <h3 className="text-lg ml-1 mr-2">هتل‌های</h3>
                <strong>مشهد</strong>
              </div>
              <CaretLeft size={20} weight="bold" />
            </a>

            <a className="h-20   w-full flex flex-row-reverse items-center justify-between p-5 cursor-pointer transition ease-in duration-300 hover:drop-shadow-2xl bg-white">
              <div className="flex flex-row-reverse items-center">
                <Image
                  className="h-16 w-14 object-contain"
                  alt="antalia"
                  src={Tabriz}
                />
                <h3 className="text-lg ml-1 mr-2">هتل‌های</h3>
                <strong>تبریز</strong>
              </div>
              <CaretLeft size={20} weight="bold" />
            </a>
          </div>
        </div>
        <div className="w-full  h-auto lg:px-56 mb-7">
          <div className="w-full h-full flex flex-col justify-center items-center lg:items-end space-y-3 rounded-sm">
            <h1 className="font-bold mb-3 text-center">
              پرسش‌های متداول درباره رزرو هتل
            </h1>
            <Faq />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
