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
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const HotelMap = dynamic(() => import("./hotelMap"), {
  ssr: false,
});
export default function HotelCard({ hotel }) {
  // setting reservatoin info
  const { t, i18n } = useTranslation("common");
  const lng = i18n.language;
  const [singleImage, setSingleImage] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  const [imageThree, setImageThree] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    changeAlignment();
    downloadImage1();
    downloadImage2();
  }, []);
  const downloadImage1 = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from("/public/hotel-images")
      .download(hotel.firstImage);

    if (error) {
      throw error;
    }
    const url = URL.createObjectURL(data);
    setSingleImage(url);
    setLoading(false);
  };
  const downloadImage2 = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from("/public/hotel-images")
      .download(hotel.secondImage);

    if (error) {
      throw error;
    }
    const url = URL.createObjectURL(data);
    setImageTwo(url);
    setLoading(false);
    downloadImage3();
  };
  const downloadImage3 = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from("/public/hotel-images")
      .download(hotel.thirdImage);

    if (error) {
      throw error;
    }
    const url = URL.createObjectURL(data);
    setImageThree(url);
    setLoading(false);
  };
  const [alignLeft, setAlignLeft] = useState(false);
  async function changeAlignment() {
    console.log(lng);
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
  const dispatch = useDispatch();
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
        <Link href={"/hotelList/hotelDetail/" + hotel.id}>
          <button
            onClick={() => {
              dispatch(reservationActions.setHotelInfo(hotel));
            }}
            className="px-6 w-full rounded-md transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-xs font-mainFont"
          >
            {t("seeRoom")}{" "}
          </button>
        </Link>
        <p className="text-gray-500 text-xs">{t("price1Night")}</p>
      </div>
      <div
        className={`${
          alignLeft === true
            ? "w-96 h-full flex flex-col items-center lg:space-y-0 space-y-3 lg:items-end justify-between p-3 lg:border-l border-mainBlue"
            : "w-96 h-full flex flex-col items-center lg:space-y-0 space-y-3 lg:items-start justify-between p-3 lg:border-l border-mainBlue"
        }`}
      >
        <div className="flex items-center lg:flex-row flex-col justify-center space-x-2">
          <Chip defaultChecked color="green" variant="filled" size="md">
            <span className="text-xs">بالاترین درصد رضایتمندی</span>{" "}
          </Chip>
          <Chip defaultChecked color="red" variant="filled" size="md">
            <span className="text-xs">تحفیف ویژه بوتک</span>{" "}
          </Chip>
        </div>
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
          breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: 2 }]}
          slideGap="sm"
          align="start"
          loop
          slideSize="100%"
          width="100%"
          height="190px"
        >
          <Carousel.Slide>
            <Image
              className=" w-full  lg:object-fit h-full lg:w-full"
              alt="antalia"
              src={singleImage}
              width={400}
              height={200}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image
              alt="antalia"
              className=" w-full lg:object-fit h-full lg:w-full"
              src={imageTwo}
              width={400}
              height={200}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image
              alt="antalia"
              className="  w-full lg:object-fit h-full lg:w-full"
              src={imageThree}
              width={400}
              height={200}
            />
          </Carousel.Slide>
        </Carousel>
      </div>
      {/* <div className="h-full w-full bg-green-500"></div> */}
    </div>
  );
}
