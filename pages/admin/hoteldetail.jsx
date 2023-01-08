import hotelOne from "../../assets/images/hotelone.jpg";
import hotelTwo from "../../assets/images/hoteltwo.jpg";
import hotelThree from "../../assets/images/hotelthree.jpg";
import hotelFour from "../../assets/images/hotelfour.jpg";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import { IconStar } from "@tabler/icons";
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
        <div className="p-4 bg-gray-100 flex space-y-3 flex-col w-full">
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
        </div>
      </div>
    </div>
  );
}
