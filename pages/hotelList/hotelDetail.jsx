import hotelOne from "../../assets/images/hotelone.jpg";
import hotelTwo from "../../assets/images/hoteltwo.jpg";
import hotelThree from "../../assets/images/hotelthree.jpg";
import hotelFour from "../../assets/images/hotelfour.jpg";
import Navbar from "../../components/Navbar";
import { Tabs, Popover, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import {
  IconChevronLeft,
  IconStar,
  IconBarbell,
  IconCoffee,
  IconChefHat,
  IconHotelService,
  IconBath,
  IconWifi,
  IconWashMachine,
} from "@tabler/icons";
import Link from "next/link";
import Image from "next/image";
import { PlusCircle, MinusCircle } from "phosphor-react";
import Footer from "../../components/Footer";
export default function HotelDetailPage() {
  let rooms = [
    {
      title: "دو تخته برای یک نفر",
      meal: "صبحانه",
      max: "1",
      price: 400000,
    },
    {
      title: "دو تخته برای دو نفر",
      meal: "صبحانه",
      max: "1",
      price: 400000,
    },
    {
      title: "یک تخته برای یک نفر",
      meal: "شام",
      max: "1",
      price: 35500000,
    },
    {
      title: "دو تخته برای یک نفر",
      meal: "صبحانه",
      max: "3",
      price: 5500000,
    },
    {
      title: "دو تخته برای یک نفر",
      meal: "بدون وعده غذایی",
      max: "1",
      price: 4233000,
    },
  ];
  let Images = [hotelOne, hotelTwo, hotelThree, hotelFour];
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="flex w-full p-20 h-full bg-gray-200">
        <div className="flex flex-col p-5 w-full h-full">
          <div className="flex justify-end items-center  text-gray-700 w-full h-10">
            <Link href="/hotelList/hotelDetail">
              <p>هتل آنا</p>
            </Link>
            <IconChevronLeft />
            <p>هتل های شهر تهران</p>
            <IconChevronLeft />
            <Link href="/">
              <p>هتل ها</p>
            </Link>
          </div>
          <div className="flex p-5 flex-col">
            <div className="flex cursor-pointer w-full justify-center  h-96 rounded-lg">
              <div className="flex">
                <Image className=" w-full h-full" src={hotelOne} />
              </div>
              <div className="grid grid-cols-2 grid-rows-2">
                {Images.map((image) => {
                  return (
                    <div className="flex w-full h-full justify-center items-center">
                      <Image className=" w-full h-full" src={image} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-center py-5  w-full h-10">
              <button className="text-mainPurple rounded-sm border-2 border-dashed border-mainPurple  text-center flex items-center justify-center px-6 py-5 hover:bg-mainPurple hover:text-gray-100 transition">
                <p>عکس های بیشتر</p>
              </button>
            </div>
          </div>
          <div className="flex w-full justify-end h-20">
            <div className="flex w-full justify-center items-end flex-col">
              <h1 className="text-3xl my-2">هتل آنا</h1>
              <div className="flex space-x-8 justify-center items-center">
                <div className="flex">
                  <p>اول بند ، روبه روی خیابان گلشهر</p>
                </div>
                <div className="flex justify-center items-center space-x-2">
                  <p className="text-lg">ستاره</p>
                  <p className="text-lg">4</p>
                  <IconStar />
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-96 h-96 sticky  border -top-14  rounded">
              <div className="flex bg-white flex-col items-center w-full h-full">
                <DatePicker
                  locale="fa"
                  dropdownPosition="bottom-start"
                  className="text-4xl text-center flex flex-col items-end"
                  placeholder="تاریخ ورود"
                  label="تاریخ ورود"
                  withAsterisk
                  variant="default"
                  radius="md"
                  size="md"
                />
                <DatePicker
                  locale="fa"
                  dropdownPosition="bottom-start"
                  className="text-4xl text-center flex flex-col items-end"
                  placeholder="تاریخ خروج"
                  label="تاریخ خروج"
                  withAsterisk
                  variant="default"
                  radius="md"
                  size="md"
                />
                <Popover width={300} position="bottom" withArrow shadow="md">
                  <Popover.Target>
                    <TextInput
                      className="text-4xl text-right flex flex-col items-end"
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
                <div className="flex">
                  <Link href="/checkout">
                    <button className="py-3  hover:text-white border-mainPurple border-2 border-dashed ease-in duration-300 hover:bg-darkPurple transition rounded-full  text-mainPurple my-5 px-12 bg-transparent  shadow-2xl">
                      <p>رزرو اتاق</p>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full mt-8">
              <div className="flex items-center space-x-1 w-full justify-between pl-5 ">
                <h1 className="  text-mainPurple   text-sm cursor-pointer hover:text-blue-800">
                  مشاهده همه
                </h1>
                <h1 className="  text-gray-900   text-xl">
                  امکانات و ویژگی ها
                </h1>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white grid grid-cols-2 grid-rows-2 lg:grid-cols-3 lg:grid-rows-3 lg:p-5 divdie-x divide-black  m-4 ">
                <div className="flex px-3 justify-between items-center">
                  <h2>
                    <IconWashMachine size={32} />
                  </h2>
                  <h2>خشکشویی</h2>
                </div>
                <div className="flex px-3 justify-between items-center">
                  <h2>
                    <IconWashMachine size={32} />
                  </h2>
                  <h2>خشکشویی</h2>
                </div>
                <div className="flex px-3 justify-between items-center">
                  <h2>
                    <IconWashMachine size={32} />
                  </h2>
                  <h2>خشکشویی</h2>
                </div>
                <div className="flex px-3 justify-between items-center">
                  <h2>
                    <IconBarbell size={32} />
                  </h2>
                  <h2>سالن بدنسازی</h2>
                </div>
                <div className="flex px-3 justify-between items-center">
                  <h2>
                    <IconCoffee size={32} />
                  </h2>
                  <h2>کافی شاپ</h2>
                </div>
                <div className="flex px-3 justify-between items-center">
                  <h2>
                    <IconChefHat size={32} />
                  </h2>
                  <h2>رستوران</h2>
                </div>
                <div className="flex px-3 justify-between items-center">
                  <h2>
                    <IconHotelService size={32} />
                  </h2>
                  <h2>سرویس روزانه</h2>
                </div>
                <div className="flex px-3 justify-between items-center">
                  <h2>
                    <IconBath size={32} />
                  </h2>
                  <h2>حمام</h2>
                </div>
                <div className="flex px-3 justify-between items-center">
                  <h2>
                    <IconWifi size={32} />
                  </h2>
                  <h2>خدمات اینترنت</h2>
                </div>
              </div>
              <div className="flex p-5 items-center space-x-1 w-full justify-between">
                <h1 className="  text-mainPurple   text-sm cursor-pointer hover:text-blue-800">
                  تغییر موقعیت
                </h1>
                <h1 className="  text-gray-700 text-2xl">
                  مکان های مهم اطراف هتل
                </h1>
              </div>
              <div className="flex space-x-2 p-3 bg-white">
                <div className="flex w-full">
                  {" "}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12659.458400775064!2d45.0234385!3d37.5111115!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9bafc107d7fb8ae0!2z2YfYqtmEINii2YbYpw!5e0!3m2!1sen!2sfr!4v1673414835237!5m2!1sen!2sfr"
                    width="500"
                    height="350"
                    style={{ border: "0" }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="flex flex-col border rounded-lg border-gray-200 divide-y divide-gray-200 w-full h-full">
                  <div className="flex flex-col justify-around items-around space-y-2 p-5 w-full">
                    <h1 className="text-lg self-end">پارک لاله</h1>
                    <div className="flex w-full">
                      <div className="flex w-full">
                        <p>23213</p>
                        <p>متر</p>
                      </div>
                      <div className="flex justify-end w-full">
                        <div className="flex">
                          <p>4 دقیقه</p>
                        </div>
                        <div className="flex">
                          <p>4</p>
                          <p>دقیقه</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-around items-around space-y-2 p-5 w-full">
                    <h1 className="text-lg self-end">پارک لاله</h1>
                    <div className="flex w-full">
                      <div className="flex w-full">
                        <p>23213</p>
                        <p>متر</p>
                      </div>
                      <div className="flex justify-end w-full">
                        <div className="flex">
                          <p>4 دقیقه</p>
                        </div>
                        <div className="flex">
                          <p>4</p>
                          <p>دقیقه</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex p-5 items-center space-x-1 w-full justify-end">
                <h1 className=" text-gray-800 text-3xl">اتاق ها</h1>
              </div>
              <div className="flex  justify-center w-full text-lg">
                <Tabs color="violet" defaultValue="first">
                  <Tabs.List grow position="center">
                    <Tabs.Tab value="second">
                      <span className="text-lg">صبحانه</span>
                    </Tabs.Tab>
                    <Tabs.Tab value="third">
                      <span className="text-lg">بدون وعده غذایی</span>
                    </Tabs.Tab>
                    <Tabs.Tab value="first">
                      <span className="text-lg">همه موارد</span>
                    </Tabs.Tab>
                  </Tabs.List>
                </Tabs>
              </div>
              <div className="p-4  flex space-y-3 flex-col  w-full">
                {rooms.map((room, i) => {
                  return (
                    <div
                      key={i}
                      className="flex border border-gray-300 bg-white justify-around divide-y my-5 divide-gray-300 rounded-sm flex-col w-full h-64"
                    >
                      <div className="flex flex-col py-4 px-5 justify-center items-end ">
                        <h1 className="text-2xl border-b-2 p-3 border-mainPurple rounded-md">
                          {room.title}
                        </h1>
                        <h2 className="my-3">{room.meal}</h2>
                      </div>
                      <div className="flex items-center h-full w-full px-5 justify-between">
                        <div className="flex space-x-1 p-2 justify-center items-center">
                          <h2>ریال</h2>
                          <h2 className="  text-3xl text-mainPurple">
                            {room.price}
                          </h2>
                        </div>
                        <h1 className="text-lg">قیمت برای هرشب</h1>
                      </div>
                      <div className="flex justify-center items-center h-full">
                        <Link href="/checkout">
                          <button className="py-3  hover:text-white border-mainPurple border-2 border-dashed ease-in duration-300 hover:bg-darkPurple transition rounded-full  text-mainPurple my-5 px-12 bg-transparent  shadow-2xl">
                            <p>رزرو اتاق</p>
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
                <div className="flex justify-around">
                  <button className="w-48 py-4 my-6 bg-darkPurple transition ease-in duration-300 font-mainFont rounded-full text-white hover:bg-mainBlue">
                    بیشتر نشونم بده
                  </button>
                </div>
              </div>
              <div className="flex h-full p-5 items-center space-x-1 w-full justify-end">
                <h1 className="  text-gray-700 text-2xl">قوانین و مقررات </h1>
              </div>
              <div className="flex divide-x divide-gray-300 p-5 border border-gray-300 rounded bg-white">
                <div className="flex justify-end text-right px-4 w-full h-full">
                  <ul>
                    <li>هزینه های جانبی</li>
                    <li>هزینه اقامت کودک زیر دوسال رایگان می‌باشد</li>
                    <li>
                      هزینه اقامت کودک دو تا شش سال طبق قوانین هتل در خود هتل
                      مبلغ پرداخت می‌گردد
                    </li>
                    <li>
                      هزینه اقامت کودک بالای شش سال یک نفر کامل محاسبه می‌گردد
                    </li>
                  </ul>
                </div>
                <div className="flex w-1/3 justify-center items-center flex-col">
                  <div className="flex flex-col justify-center items-center">
                    <p>ساعت ورود</p>
                    <p>14:00</p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p>ساعت خروج</p>
                    <p>14:00</p>
                  </div>
                </div>
              </div>
              <div className="flex h-full p-5 items-center space-x-1 w-full justify-end">
                <h1 className="  text-gray-700 text-2xl">درباره هتل آنا </h1>
              </div>
              <div className="flex text-right p-5 border border-gray-300 rounded bg-white">
                <p>
                  گزینه‌ای بسیار مطلوب برای کسانی است که هم هتلی مجلل و شیک
                  می‌خواهند و هم دلشان می‌خواهد به مرکز شهر، شرکت‌های خصوصی و
                  دولتی و مکان‌هایی از این دست نزدیک باشند. البته موقعیت مکانی
                  یکی از امتیازات این هتل است؛ اتاق‌ها و سوئیت‌هایی راحت و مجهز،
                  رستورانی شیک و مدرن، کافی‌شاپ آرام و مرتب و امکانات رفاهی
                  متناسب، از دیگر مزیت‌های این هتل 4 ستاره به شمار می‌آیند
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
