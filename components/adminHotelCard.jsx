import Link from "next/link";

import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import hotelone from "../assets/images/hotelone.webp";
import hotelthree from "../assets/images/hotelthree.webp";
import hotelfour from "../assets/images/hotelfour.webp";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { Star } from "phosphor-react";
import dynamic from "next/dynamic";

export default function AdminHotelCard({ hotel }) {
  const HotelMap = dynamic(() => import("./hotelMap"), {
    ssr: false,
  });
  const { t, i18n } = useTranslation("");
  const lng = i18n.language;
  const [alignLeft, setAlignLeft] = useState(false);
  async function changeAlignment() {
    console.log(lng);
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
  useEffect(() => {
    changeAlignment();
  }, []);

  return (
    <div
      className={`${
        alignLeft === true
          ? "w-full lg:w-carousel h-auto lg:h-48 bg-white rounded-md flex lg:flex-row flex-col-reverse justify-between items-center border"
          : "w-full lg:w-carousel h-auto lg:h-48 bg-white rounded-md flex lg:flex-row-reverse flex-col-reverse justify-between items-center border"
      }`}
    >
      <div className="w-56 h-full flex flex-col p-4 items-center lg:items-center justify-center space-y-4">
        <h2 className="text-mainPurple   flex items-start justify-center">
          <p className="text-sm font-bold mx-2">{t("currency")}</p>

          <p className="text-2xl "> {hotel.prices}</p>
        </h2>
        <Link className="w-full h-full" href={"/admin/hoteldetail/" + hotel.id}>
          <button className="w-full py-4 bg-mainPurple border-r-8 border-2 hover:text-mainPurple border-mainBlue transition ease-in duration-150 font-mainFont rounded-md text-white hover:bg-mainBlue">
            ویرایش هتل
          </button>
        </Link>
        <p className="text-gray-500 text-xs">Ana Hotel ساخته شده توسط</p>
      </div>

      <div
        className={`${
          alignLeft === true
            ? "w-96 h-full flex flex-col items-center lg:space-y-0 space-y-3 lg:items-end justify-between p-3 lg:border-l border-mainBlue"
            : "w-96 h-full flex flex-col items-center lg:space-y-0 space-y-3 lg:items-start justify-between p-3 lg:border-l border-mainBlue"
        }`}
      >
        <h1 className="text-center   text-lg">{hotel.title}</h1>
        <div className="flex items-center   text-sm space-x-1">
          <h2>{t("star")}</h2>
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
    </div>
  );
}
