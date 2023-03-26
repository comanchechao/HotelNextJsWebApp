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
import { supabase } from "../lib/supabaseClient";

const EditHotel = dynamic(() => import("./editHotel"));
export default function AdminHotelCard({ hotel, user, featuresData, cities }) {
  const HotelMap = dynamic(() => import("./hotelMap"), {
    ssr: false,
  });
  const [singleImage, setSingleImage] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  const [imageThree, setImageThree] = useState("");
  const { t, i18n } = useTranslation("");
  const [loading, setLoading] = useState(false);

  const lng = i18n.language;
  const [alignLeft, setAlignLeft] = useState(false);

  useEffect(() => {
    changeAlignment();
    if (hotel.firstImage) {
      downloadImage1();
    }
    if (hotel.secondImage) {
      downloadImage2();
    }
  }, []);
  const downloadImage1 = async () => {
    if (hotel.firstImage) {
      setLoading(true);
      const { data, error } = await supabase.storage
        .from("/public/hotel-images")
        .download(hotel.firstImage);

      if (data) {
        const url = URL.createObjectURL(data);
        setSingleImage(url);
      }
      setLoading(false);
    }
  };
  const downloadImage2 = async () => {
    if (hotel.secondImage) {
      setLoading(true);
      const { data, error } = await supabase.storage
        .from("/public/hotel-images")
        .download(hotel.secondImage);

      if (data) {
        const url = URL.createObjectURL(data);
        setImageTwo(url);
      }
      setLoading(false);
    }
    downloadImage3();
  };
  const downloadImage3 = async () => {
    if (hotel.thirdImage) {
      setLoading(true);
      const { data, error } = await supabase.storage
        .from("/public/hotel-images")
        .download(hotel.thirdImage);

      if (data) {
        const url = URL.createObjectURL(data);
        setImageThree(url);
      }
      setLoading(false);
    }
  };

  async function changeAlignment() {
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
          ? "w-full lg:w-full h-auto lg:h-40 bg-white rounded-md flex lg:flex-row flex-col-reverse justify-between items-center border"
          : "w-full lg:w-full h-auto lg:h-40 bg-white rounded-md flex lg:flex-row-reverse flex-col-reverse justify-between items-center border"
      }`}
    >
      <div className="w-56 h-full flex flex-col p-4 items-center lg:items-center justify-center space-y-4">
        <h2 className="text-mainPurple   flex items-start justify-center">
          <p className="text-sm font-bold mx-2">{t("currency")}</p>

          <p className="text-2xl "> {hotel.prices}</p>
        </h2>
        <EditHotel
          identifier={hotel.id}
          hotel={hotel}
          user={user}
          featuresData={featuresData}
          cities={cities}
        />
      </div>

      <div
        className={`${
          alignLeft === true
            ? "w-96 h-full flex flex-col items-center lg:space-y-0 space-y-3 lg:items-end justify-between p-3 lg:border-l border-mainBlue"
            : "w-96 h-full flex flex-col items-center lg:space-y-0 space-y-3 lg:items-start justify-between p-3   border-mainBlue"
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
          breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: 2 }]}
          slideGap="sm"
          align="start"
          loop
          slideSize="100%"
          width="100%"
          height="160px"
        >
          <Carousel.Slide>
            {singleImage ? (
              <Image
                className=" w-full  lg:object-fit h-40 lg:w-full"
                alt="antalia"
                src={singleImage}
                width={400}
                height={200}
              />
            ) : null}
          </Carousel.Slide>
          <Carousel.Slide>
            {imageTwo ? (
              <Image
                alt="antalia"
                className=" w-full lg:object-fit h-40 lg:w-full"
                src={imageTwo}
                width={400}
                height={200}
              />
            ) : null}
          </Carousel.Slide>
          <Carousel.Slide>
            {imageThree ? (
              <Image
                alt="antalia"
                className="  w-full lg:object-fit h-40 lg:w-full"
                src={imageThree}
                width={400}
                height={200}
              />
            ) : null}
          </Carousel.Slide>
        </Carousel>
      </div>
    </div>
  );
}
