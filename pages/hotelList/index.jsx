import Navbar from "../../components/Navbar";
import Link from "next/link";
import { CaretLeft } from "phosphor-react";
export default function HotelList() {
  return (
    <div className="w-screen h-screen bg-gray-200">
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
            <div className="h-10 w-full bg-white drop-shadow-sm rounded-full"></div>
            <h3 className="w-28">مرتب سازی</h3>
          </div>
        </div>
        <div className=" w-1/4 h-full bg-mainBlue"></div>
      </div>
    </div>
  );
}
