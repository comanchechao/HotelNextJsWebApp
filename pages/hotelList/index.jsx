import Navbar from "../../components/Navbar";
import Link from "next/link";
import { CaretLeft } from "phosphor-react";
import HotelCard from "../../components/hotelCard";
import { Accordion } from "@mantine/core";
import HotelListMenu from "../../components/hotelListMenu";

export default function HotelList() {
  return (
    <div className="w-screen h-auto bg-gray-200">
      <Navbar />
      <div className="h-full w-full pt-28 flex px-56">
        <div className=" w-3/4 h-full  p-6 ">
          <div className="h-auto w-full space-x-3 flex items-center justify-end">
            <Link className="text-lg items-center flex text-black" href="/">
              <CaretLeft size={20} />
              هتل های شهر استانبول
            </Link>
            <Link className="text-lg items-center flex text-gray-700" href="/">
              <CaretLeft size={20} />
              خونه
            </Link>
          </div>

          <div className=" w-full h-10 pl-44 flex items-center justify-end my-4 space-x-4">
            <div className="h-10 w-full flex items-center justify-around bg-white drop-shadow-sm rounded-full">
              <h2 className="text-gray-600 cursor-pointer flex items-center transition ease-in duration-100 hover:text-mainBlue">
                پیش فرض
              </h2>
              <h2 className="text-gray-600 cursor-pointer flex items-center transition ease-in duration-100 hover:text-mainBlue">
                بالاترین امتیاز
              </h2>
              <h2 className="text-gray-600 cursor-pointer flex items-center transition ease-in duration-100 hover:text-mainBlue">
                کمترین قیمت
              </h2>
              <h2 className="text-gray-600 cursor-pointer flex items-center transition ease-in duration-100 hover:text-mainBlue">
                بیشترین قیمت
              </h2>
            </div>
            <h3 className="w-28">مرتب سازی</h3>
          </div>
          <div className="w-full h-full flex flex-col items-center justify-center space-y-9 my-10">
            <HotelCard />
            <HotelCard /> <HotelCard />
            <HotelCard />
            <HotelCard /> <HotelCard />
          </div>
        </div>
        <div className=" w-1/4 h-full">
          <div className="w-full h-96 p-6">
            <HotelListMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
