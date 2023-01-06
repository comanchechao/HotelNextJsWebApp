import hotelOne from "../assets/images/hotelone.jpg";
import hotelTwo from "../assets/images/hoteltwo.jpg";
import hotelThree from "../assets/images/hotelthree.jpg";
import hotelFour from "../assets/images/hotelfour.jpg";
import Image from "next/image";
import {
  IconBed,
  IconToolsKitchen,
  IconMassage,
  IconBath,
  IconStar,
} from "@tabler/icons";

export default function hotelManagement() {
  let hotels = [
    { title: "هتل", rooms: 32, image: hotelOne },
    { title: "دلتا", rooms: 32, image: hotelTwo },
    { title: "هتل", rooms: 32, image: hotelThree },
    { title: "هتل", rooms: 32, image: hotelFour },
  ];
  return (
    <div className="flex p-8 w-full h-full  justify-center font-bold  items-center">
      <div className="flex w-full space-y-4 flex-col">
        {hotels.map((hotel, i) => {
          return (
            <div
              key={i}
              className="space-x-2  flex px-0 items-center justify-between h-52 shadow-2xl w-full rounded bg-gray-200"
            >
              <div className="flex border-r border-gray-900 flex-col h-full w-2/3 justify-center items-center">
                <div className="flex justify-center items-center w-full h-full">
                  {" "}
                  <div className="flex text-center justify-center items-center">
                    <IconBed />
                    <h2>{hotel.rooms}</h2>
                  </div>
                  <div className="flex text-center justify-center items-center">
                    <IconStar />
                    <h2>4</h2>
                  </div>
                </div>
                <div className="flex p-5 w-full justify-center items-center">
                  <button className="w-full py-4 bg-Sky-800 rounded-xl shadow-2xl text-white hover:bg-Sky-500">
                    ویرایش هتل
                  </button>
                </div>
              </div>
              <div className="flex  border-black w-full justify-end items-center text-right flex-col">
                <div className="flex text-right">
                  <h2>{hotel.title}</h2>
                </div>
                <div className="flex w-full flex-col text-right">
                  <div className="flex space-y-1 flex-col w-full">
                    <div className="flex  border-black justify-between w-full items-center">
                      <IconBath />
                      <h2>حمام ترکی</h2>
                    </div>
                    <div className="flex justify-between w-full items-center">
                      <IconToolsKitchen />
                      <h2>رستوران</h2>
                    </div>
                    <div className="flex justify-between w-full items-center">
                      <IconMassage />
                      <h2>ماساژ</h2>
                    </div>
                  </div>
                </div>
                <div className="flex text-blue-500 transition hover:text-blue-600 cursor-pointer justify-center items-center">
                  <h2>مشاهده روی نقشه</h2>
                </div>
              </div>
              <div className="flex w-full h-52 justify-center items-center">
                <Image
                  className="w-full h-52 object-contain"
                  src={hotel.image}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
