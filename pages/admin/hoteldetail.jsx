import hotelOne from "../../assets/images/hotelone.jpg";
import hotelTwo from "../../assets/images/hoteltwo.jpg";
import hotelThree from "../../assets/images/hotelthree.jpg";
import hotelFour from "../../assets/images/hotelfour.jpg";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import {
  IconStar,
  IconBarbell,
  IconCoffee,
  IconChefHat,
  IconHotelService,
  IconBath,
  IconWifi,
  IconWashMachine,
} from "@tabler/icons";
import { Tabs } from "@mantine/core";

export default function hotelDetail() {
  let images = [hotelOne, hotelTwo, hotelThree, hotelFour];
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
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="flex flex-col w-full">
        <div className="flex w-full overflow-x-scroll">
          {images.map((image, i) => {
            return <Image key={i} alt="" className="h-96 w-96" src={image} />;
          })}
        </div>
        <div className="p-5 bg-gray-200 shadow-xl flex flex-col w-full">
          <div className="flex items-center space-x-1 w-full justify-end">
            <h2 className="font-bold text-xl">Grand Hotel</h2>
            <h1>هتل</h1>
          </div>
          <div className="flex space-x-1 justify-end w-full">
            <h2>ستاره</h2>
            <h2>4</h2>
            <h2>
              <IconStar />
            </h2>
          </div>
        </div>
        <div className="mt-5  bg-gray-200 shadow-xl flex flex-col w-full">
          <div className="flex p-5 items-center space-x-1 w-full justify-end">
            <h1 className="font-bold text-gray-700 text-lg">اتاق ها</h1>
          </div>
          <div className="flex  justify-center w-full">
            <Tabs color="grape" defaultValue="first">
              <Tabs.List grow position="center">
                <Tabs.Tab value="second">صبحانه</Tabs.Tab>
                <Tabs.Tab value="third">بدون وعده غذایی</Tabs.Tab>
                <Tabs.Tab value="first">همه موارد</Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </div>
        </div>
        <div className="p-4 bg-gray-100 flex space-y-3 flex-col lg:px-20 w-full">
          {rooms.map((room) => {
            return (
              <div className="flex bg-white h-full justify-around divide-y divide-gray-300 border border-gray-300 rounded-2xl flex-col w-full h-52">
                <div className="flex flex-col py-4 px-5 justify-center items-end ">
                  <h1 className="text-lg">{room.title}</h1>
                  <h2>{room.meal}</h2>
                </div>
                <div className="flex items-center h-full w-full px-5 justify-between">
                  <div className="flex space-x-1 p-2 justify-center items-center">
                    <h2>ریال</h2>
                    <h2 className="font-bold text-3xl text-mainPurple">
                      {room.price}
                    </h2>
                  </div>
                  <h1 className="text-lg">قیمت برای هرشب</h1>
                </div>
                <div className="flex justify-center items-center h-full">
                  <button className="py-4 hover:bg-purple-800 transition rounded-xl font-bold text-gray-100 px-12 bg-mainPurple shadow-2xl">
                    <p>ویرایش</p>
                  </button>
                </div>
              </div>
            );
          })}
          <div className="flex">
            <button className="w-52 py-4 bg-darkPurple transition ease-in duration-300 font-mainFont rounded-full text-white hover:bg-Sky-500">
              بیشتر نشونم بده
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex p-5 items-center bg-gray-300 space-x-1 w-full justify-between">
            <h1 className="font-bold text-mainPurple text-sm cursor-pointer hover:text-blue-800">
              مشاهده همه
            </h1>
            <h1 className="font-bold text-gray-700 text-lg">
              امکانات و ویژگی ها
            </h1>
          </div>
          <div className="rounded grid grid-cols-2 grid-rows-2 lg:grid-cols-3 lg:grid-rows-3 p-5 divdie-x divide-black  m-4 shadow-2xl">
            <div className="flex px-3 justify-between items-center">
              <h2>سالن بدنسازی</h2>
              <h2>
                <IconBarbell size={32} />
              </h2>
            </div>
            <div className="flex px-3 justify-between items-center">
              <h2>کافی شاپ</h2>
              <h2>
                <IconCoffee size={32} />
              </h2>
            </div>
            <div className="flex px-3 justify-between items-center">
              <h2>رستوران</h2>
              <h2>
                <IconChefHat size={32} />
              </h2>
            </div>
            <div className="flex px-3 justify-between items-center">
              <h2>سرویس روزانه</h2>
              <h2>
                <IconHotelService size={32} />
              </h2>
            </div>
            <div className="flex px-3 justify-between items-center">
              <h2>حمام</h2>
              <h2>
                <IconBath size={32} />
              </h2>
            </div>
            <div className="flex px-3 justify-between items-center">
              <h2>خدمات اینترنت</h2>
              <h2>
                <IconWifi size={32} />
              </h2>
            </div>
            <div className="flex px-3 justify-between items-center">
              <h2>خشکشویی</h2>
              <h2>
                <IconWashMachine size={32} />
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
