import hotelOne from "../assets/images/hotelone.jpg";
import hotelTwo from "../assets/images/hoteltwo.jpg";
import hotelThree from "../assets/images/hotelthree.jpg";
import hotelFour from "../assets/images/hotelfour.jpg";
import Image from "next/image";
import AddHotel from "./addHotel";
import {
  IconBed,
  IconToolsKitchen,
  IconMassage,
  IconBath,
  IconStar,
  IconBuildingSkyscraper,
  IconUser,
  IconUsers,
} from "@tabler/icons";
import Link from "next/link";
import { Tabs } from "@mantine/core";
import { MagnifyingGlass } from "phosphor-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import HotelImage from "./hotelImage";
import { useTranslation } from "next-i18next";
import AdminHotelCard from "./adminHotelCard";
import { supabase } from "../lib/supabaseClient";

const HotelMap = dynamic(() => import("./hotelMap"), {
  ssr: false,
});
export default function HotelManagement({ user, hotels }) {
  const { t, i18n } = useTranslation("common");

  const [cities, setCities] = useState([]);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data: cities, error2 } = await supabase.from("cities").select();

    const { data: features, error3 } = await supabase
      .from("features")
      .select("title");

    setCities(cities);
    setFeatures(features);
  }

  return (
    <div className="flex flex-col w-full h-full  lg:h-carousel   ">
      <div className="flex w-full space-y-4 flex-col   h-full">
        <div class="pt-4 px-2 flex w-full justify-center items-center relative text-black ">
          <div className="flex flex-reverse w-full items-center space-x-2 justify-center">
            <button
              type="submit"
              className="bg-white justify-center items-center border-2 h-10 px-3  flex"
            >
              <MagnifyingGlass size={20} weight="bold" />
            </button>
            <input
              className="border-2 p-0 placeholder-gray-400 text-right transition ease-in duration-300 text-darkPurple w-textArea hover:bg-white   bg-white font-mainFont h-10 px-5 pr-4 md:pr-16 rounded-sm  text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder={t("hotelNameSearch")}
            />
          </div>
        </div>
        <Tabs color="yellow" variant="pills" defaultValue="gallery">
          <Tabs.List grow position="center" className="px-2">
            <Tabs.Tab
              color="pink"
              value="settings"
              icon={<IconUsers size={14} />}
            >
              {t("otherHotels")}
            </Tabs.Tab>
            <Tabs.Tab
              color="violet"
              value="messages"
              icon={<IconUser size={14} />}
            >
              {t("myHotels")}
            </Tabs.Tab>
            <Tabs.Tab
              color="indigo"
              value="gallery"
              icon={<IconBuildingSkyscraper size={14} />}
            >
              {t("hotels")}
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="gallery" pt="xs">
            <div
              className="flex w-full  overflow-y-scroll  h-rem28
               space-y-7  flex-col"
            >
              {hotels.map((hotel, i) => {
                console.log(hotel.locationLat);
                return <AdminHotelCard key={hotel.id} hotel={hotel} />;
              })}
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="messages" pt="xs">
            <div className="flex w-full p-5  lg:h-rem28 lg:overflow-y-scroll space-y-7  flex-col">
              {hotels.map((hotel, i) => {
                return (
                  <div
                    key={i}
                    className="lg:space-x-2 lg:flex-row flex-col-reverse  flex px-0 items-center justify-between h-full shadow-2xl w-full rounded bg-white"
                  >
                    <div className="flex lg:border-r border-gray-900 flex-col h-full w-full lg:w-2/3 justify-center items-center">
                      <div className="flex justify-center items-center w-full h-full">
                        <div className="flex text-center justify-center items-center">
                          <IconBed />
                        </div>
                      </div>
                      <div className="flex flex-col p-5 h-full w-full justify-between  items-around">
                        <Link
                          className="w-full h-full"
                          href={"/admin/hoteldetail/" + hotel.id}
                        >
                          <button className="w-full py-4 bg-mainPurple transition ease-in duration-300 font-mainFont rounded-md text-white hover:bg-mainBlue">
                            ویرایش هتل
                          </button>
                        </Link>
                      </div>
                      <div className="flex space-x-2 p-1 justify-start items-end w-full h-full font-medium text-sm">
                        <p>من</p> <p>ساخته شده توسط</p>
                      </div>
                    </div>
                    <div className="flex px-4 lg:px-0  border-black w-full justify-end items-center text-right flex-col">
                      <div className="flex flex-col text-right">
                        <h2 className="text-2xl">{hotel.title}</h2>
                        <div className="flex justify-center text-md">
                          <IconStar size={15} />
                          <h3>5</h3>
                        </div>
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
                        <HotelMap location={hotel.location} />
                      </div>
                    </div>
                    <div className="flex w-full h-full lg:h-52 justify-center items-center">
                      <Image
                        alt=""
                        src={hotelOne}
                        className="w-full lg:h-52 object-contain"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="settings" pt="xs">
            Settings tab content
          </Tabs.Panel>
        </Tabs>
        <div className="lg:absolute right-8 bottom-3   fixed">
          <AddHotel user={user} featuresData={features} cities={cities} />
        </div>
      </div>
    </div>
  );
}
