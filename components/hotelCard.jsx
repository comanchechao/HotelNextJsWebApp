import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import Link from "next/link";
import hotelone from "../assets/images/hotelone.webp";
import hotelthree from "../assets/images/hotelthree.webp";
import hotelfour from "../assets/images/hotelfour.webp";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { reservationActions } from "../store/reservation";
import { Star } from "phosphor-react";
import { Chip } from "@mantine/core";

export default function HotelCard({ hotel }) {
  const HotelMap = dynamic(() => import("./hotelMap"), {
    ssr: false,
  });

  // setting reservatoin info

  const dispatch = useDispatch();
  return (
    <div className=" w-full lg:w-carousel h-auto lg:h-48 bg-white rounded-md flex lg:flex-row flex-col-reverse justify-between items-center ">
      <div className="w-56 h-full flex flex-col p-4 items-center justify-center space-y-2">
        <h2 className="text-mainPurple text-lg">{hotel.prices}</h2>
        <Link href={"/hotelList/hotelDetail/" + hotel.id}>
          <button
            onClick={() => {
              dispatch(reservationActions.setHotelInfo(hotel));
            }}
            className="px-6 w-full rounded-md transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-xs font-mainFont"
          >
            مشاهده ی اتاق ها و رزرو
          </button>
        </Link>
        <p className="text-gray-500 text-xs">قیمت برای 1 شب</p>
      </div>
      <div className=" w-96 h-full flex flex-col items-end justify-between p-3 border-l border-mainBlue">
        <div className="flex items-center justify-center space-x-2">
          <Chip defaultChecked color="green" variant="filled" size="md">
            <span className="text-xs">بالاترین درصد رضایتمندی</span>{" "}
          </Chip>
          <Chip defaultChecked color="pink" variant="filled" size="md">
            <span className="text-sm">تحفیف ویژه بوتک</span>{" "}
          </Chip>
        </div>
        <h1 className="text-center   text-lg">{hotel.title}</h1>
        <div className="flex items-center   text-sm space-x-1">
          <h2>ستاره</h2>
          <h2>{hotel.stars}</h2>
          <Star size={15} weight="fill" />{" "}
        </div>
        <HotelMap lat={hotel.locationLat} lng={hotel.locationLng} />
      </div>
      <div className=" w-auto flex items-center lg:w-56 h-full">
        <Carousel
          slideSize="100%"
          width="100%"
          height="190px"
          controlSize={25}
          loop
          withIndicators
        >
          <Carousel.Slide>
            <Image
              className=" w-full  lg:object-fit h-full lg:w-full"
              alt="antalia"
              src={hotelone}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image
              className=" w-full lg:object-fit h-full lg:w-full"
              alt="antalia"
              src={hotelthree}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image
              className="  w-full lg:object-fit h-full lg:w-full"
              alt="antalia"
              src={hotelfour}
            />
          </Carousel.Slide>
        </Carousel>
      </div>
      {/* <div className="h-full w-full bg-green-500"></div> */}
    </div>
  );
}
