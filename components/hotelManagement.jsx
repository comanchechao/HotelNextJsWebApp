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
const AddHotel = dynamic(() => import("./addHotel"));
const HotelMap = dynamic(() => import("./hotelMap"), {
  ssr: false,
});
export default function HotelManagement({
  cities,
  features,
  user,
  hotels,
  residenceTypes,
}) {
  const { t, i18n } = useTranslation("common");
  const [initialHotels, setInitialHotels] = useState(hotels);

  function searchFunction(input) {
    const filteredArray = hotels.filter((item) =>
      item.title.toLowerCase().includes(input.toLowerCase())
    );
    setInitialHotels(filteredArray);
  }

  return (
    <div className="flex flex-col w-full h-full  lg:h-carousel   px-4 py-7">
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
              onChange={(e) => {
                searchFunction(e.target.value);
              }}
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
              {initialHotels.map((hotel, i) => {
                return (
                  <AdminHotelCard
                    user={user}
                    featuresData={features}
                    cities={cities}
                    key={hotel.id}
                    hotel={hotel}
                  />
                );
              })}
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="messages" pt="xs">
            <div
              className="flex w-full  overflow-y-scroll  h-rem28
               space-y-7  flex-col"
            >
              {initialHotels.map((hotel, i) => {
                return (
                  <AdminHotelCard
                    user={user}
                    featuresData={features}
                    cities={cities}
                    key={hotel.id}
                    hotel={hotel}
                  />
                );
              })}
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="settings" pt="xs">
            Settings tab content
          </Tabs.Panel>
        </Tabs>
        <div className="lg:absolute right-8 bottom-3   fixed">
          <AddHotel
            user={user}
            featuresData={features}
            cities={cities}
            residenceTypes={residenceTypes}
          />
        </div>
      </div>
    </div>
  );
}
