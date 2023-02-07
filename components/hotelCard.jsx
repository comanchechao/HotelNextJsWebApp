import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import Link from "next/link";
import hotelone from "../assets/images/hotelone.webp";
import hotelthree from "../assets/images/hotelthree.webp";
import hotelfour from "../assets/images/hotelfour.webp";
import dynamic from "next/dynamic";

export default function HotelCard({ hotel }) {
  const HotelMap = dynamic(() => import("./hotelMap"), {
    ssr: false,
  });
  return (
    <div className=" w-full lg:w-carousel h-auto lg:h-48 bg-white rounded-md flex lg:flex-row flex-col-reverse justify-between items-center ">
      <div className="w-56 h-full flex flex-col p-4 items-center justify-center space-y-2">
        <h2 className="text-mainPurple text-lg">{hotel.price}</h2>
        <Link href="/hotelList/hotelDetail">
          <button className="px-6 w-full rounded-md transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-xs font-mainFont">
            مشاهده ی اتاق ها و رزرو
          </button>
        </Link>
        <p className="text-gray-500 text-xs">قیمت برای 1 شب</p>
      </div>
      <div className=" w-96 h-full flex flex-col items-center justify-between p-3 border-l border-mainBlue">
        <h1 className="text-center text-lg">{hotel.title}</h1>
        <HotelMap lat={hotel.locationLat} lng={hotel.locationLng} />
      </div>
      <div className=" w-full flex items-center lg:w-56 h-full">
        <Carousel
          slideSize="100%"
          height="190px"
          slideGap="xs"
          controlSize={25}
          loop
          dragFree
          withIndicators
        >
          <Carousel.Slide>
            <Image
              className=" object-fit h-full"
              alt="antalia"
              src={hotelone}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <div className="h-full w-full flex items-center">
              <Image
                className=" object-fit h-full"
                alt="antalia"
                src={hotelthree}
              />
            </div>
          </Carousel.Slide>
          <Carousel.Slide>
            <div className="h-full w-full flex items-center">
              <Image
                className=" object-fit h-full"
                alt="antalia"
                src={hotelfour}
              />
            </div>
          </Carousel.Slide>
        </Carousel>
      </div>
      {/* <div className="h-full w-full bg-green-500"></div> */}
    </div>
  );
}
