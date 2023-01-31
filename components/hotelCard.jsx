import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import Link from "next/link";
import hotelone from "../assets/images/hotelone.webp";
import hotelthree from "../assets/images/hotelthree.webp";
import hotelfour from "../assets/images/hotelfour.webp";

export default function HotelCard() {
  return (
    <div className=" w-full lg:w-carousel h-auto lg:h-48 bg-white rounded-sm flex lg:flex-row flex-col-reverse justify-between items-center ">
      <div className="w-56 h-full flex flex-col p-4 items-center justify-center space-y-2">
        <h2 className="text-mainPurple text-lg">11,016,000</h2>
        <Link href="/hotelList/hotelDetail">
          <button className="px-6 w-full rounded-full transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-xs font-mainFont">
            مشاهده ی اتاق ها و رزرو
          </button>
        </Link>
        <p className="text-gray-500 text-xs">قیمت برای 1 شب</p>
      </div>
      <div className=" w-96 h-full flex flex-col items-center justify-between p-3 border-x border-dashed border-mainPurple">
        <h1 className="text-center text-lg">Hotel Sinem Hotel Istanbul</h1>
        <Link
          href="/"
          className="text-blue-500 flex items-center transition ease-in duration-100 hover:text-mainBlue"
        >
          مشاهده روی نقشه
        </Link>
      </div>
      <div className=" w-full flex items-center lg:w-56 h-full">
        <Carousel
          slideSize="100%"
          height="100%"
          slideGap="xs"
          controlsOffset="xl"
          controlSize={25}
          loop
          dragFree
          withIndicators
        >
          <Carousel.Slide>
            <div className="h-full w-full flex items-center">
              <Image className=" object-cover" alt="antalia" src={hotelone} />
            </div>
          </Carousel.Slide>
          <Carousel.Slide>
            <div className="h-full w-full flex items-center">
              <Image className=" object-cover" alt="antalia" src={hotelthree} />
            </div>
          </Carousel.Slide>
          <Carousel.Slide>
            <div className="h-full w-full flex items-center">
              <Image className=" object-cover" alt="antalia" src={hotelfour} />
            </div>
          </Carousel.Slide>
        </Carousel>
      </div>
      {/* <div className="h-full w-full bg-green-500"></div> */}
    </div>
  );
}
