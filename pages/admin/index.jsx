import Navbar from "../../components/Navbar.jsx";
import { Menu, Button, Text } from "@mantine/core";
import ReservationManagement from "../../components/reservationManagement.js";
import UserManagement from "../../components/userManagement";
import HotelManagement from "../../components/hotelManagement";
import { Drawer, Group, useMantineTheme } from "@mantine/core";
import Footer from "../../components/Footer";
import {
  IconSortDescending2,
  IconStars,
  IconMenu2,
  IconBuildingSkyscraper,
  IconStarsOff,
  IconUserCheck,
  IconSortAscending,
  IconLogout,
  IconBook,
  IconUser,
  IconBuildingCommunity,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient.js";
import WebsiteInfo from "../../components/websiteInfo";
import AddCity from "../../components/addCity";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {
  // Fetch data from the database

  const { data: hotels, error } = await supabase.from("Hotels").select();
  const { data: cities, error2 } = await supabase.from("cities").select();
  const { data: features, error3 } = await supabase
    .from("features")
    .select("title");
  const { data: reservations, error4 } = await supabase
    .from("reservations")
    .select();

  if (error) throw error;
  if (error2) throw error2;
  if (error3) throw error3;
  if (error4) throw error4;
  return {
    props: {
      reservations: reservations,
      cities: cities,
      hotels: hotels,
      features: features,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function AdminPage({ hotels, cities, features, reservations }) {
  const [tab, setTab] = useState("hotel");
  const [bg, setBg] = useState("");

  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <div className="w-screen h-auto bg-gray-100 overflow-y-hidden">
      <Navbar />
      <div className="flex  w-full h-screen lg:flex-row flex-col-reverse lg:pt-20 pt-44  items-center justify-center lg:space-x-20 lg:px-20 py-20 lg:py-36 ">
        <div className="flex   lg:px-12 lg:py-24     flex-col w-full px-5 lg:w-3/4 h-screen     lg:h-screen ">
          <div className="w-full h-screen    rounded-md    justify-center items-center">
            {tab === "user" ? (
              <UserManagement />
            ) : tab === "city" ? (
              <AddCity cities={cities} />
            ) : tab === "reserve" ? (
              <ReservationManagement reservations={reservations} />
            ) : tab === "websiteInfo" ? (
              <WebsiteInfo />
            ) : tab === "hotel" ? (
              <HotelManagement
                features={features}
                hotels={hotels}
                cities={cities}
              />
            ) : null}
          </div>
        </div>
        <div className=" text-right flex-row-reverse rounded-md  flex   lg:space-x-0 mt-44   lg:space-y-2 lg:mt-0  lg:flex-col items-end lg:h-rem33 h-full justify-around lg:justify-center w-full lg:w-1/4   bg-white text-gray-800">
          <div
            onClick={() => {
              setTab("hotel");
            }}
            className={`${
              tab === "hotel"
                ? "flex cursor-pointer rounded-md  bg-mainBlue ease-in duration-150 transition  text-white justify-center items-center h-full lg:h-28 w-auto lg:w-full"
                : "flex cursor-pointer rounded-md  hover:bg-mainBlue ease-in duration-150 transition hover:text-white justify-center items-center h-full lg:h-28 w-auto lg:w-full"
            }`}
          >
            <div className="flex justify-around items-center  transition   text-gray-800 w-full">
              <IconBuildingSkyscraper size={24} />
              <h1 className="lg:text-2xl text-sm  "> هتل ها </h1>
            </div>
          </div>
          <div
            onClick={() => {
              setTab("user");
            }}
            className={`${
              tab === "user"
                ? "flex cursor-pointer rounded-md  bg-mainBlue ease-in duration-150 transition  text-white justify-center items-center h-full lg:h-28 w-auto lg:w-full"
                : "flex cursor-pointer rounded-md  hover:bg-mainBlue ease-in duration-150 transition hover:text-white justify-center items-center h-full lg:h-28 w-auto lg:w-full"
            }`}
          >
            <div className="flex justify-around items-center  transition   text-gray-800 w-full">
              <IconUserCheck size={24} />
              <h1 className="lg:text-2xl text-sm  "> همکاران </h1>
            </div>
          </div>
          <div
            onClick={() => {
              setTab("city");
            }}
            className={`${
              tab === "city"
                ? "flex cursor-pointer rounded-md  bg-mainBlue ease-in duration-150 transition  text-white justify-center items-center h-full lg:h-28 w-auto lg:w-full"
                : "flex cursor-pointer rounded-md  hover:bg-mainBlue ease-in duration-150 transition hover:text-white justify-center items-center h-full lg:h-28 w-auto lg:w-full"
            }`}
          >
            <div className="flex justify-around items-center  transition   text-gray-800 w-full">
              <IconUserCheck size={24} />
              <h1 className="lg:text-2xl text-sm  "> شهر </h1>
            </div>
          </div>
          <div
            onClick={() => {
              setTab("reserve");
            }}
            className={`${
              tab === "reserve"
                ? "flex cursor-pointer rounded-md  bg-mainBlue ease-in duration-150 transition  text-white justify-center items-center h-full lg:h-28 w-auto lg:w-full"
                : "flex cursor-pointer rounded-md  hover:bg-mainBlue ease-in duration-150 transition hover:text-white justify-center items-center h-full lg:h-28 w-auto lg:w-full"
            }`}
          >
            <div className="flex justify-around items-center  transition   text-gray-800 w-full">
              <IconBook size={24} />
              <h1 className="lg:text-2xl text-sm  "> رزرو ها </h1>
            </div>
          </div>
          <div
            onClick={() => {
              setTab("websiteInfo");
            }}
            className={`${
              tab === "websiteInfo"
                ? "flex cursor-pointer rounded-md  bg-mainBlue ease-in duration-150 transition  text-white justify-center items-center h-full lg:h-28 w-auto lg:w-full"
                : "flex cursor-pointer rounded-md  hover:bg-mainBlue ease-in duration-150 transition hover:text-white justify-center items-center h-full lg:h-28 w-auto lg:w-full"
            }`}
          >
            <div className="flex justify-around items-center  transition   text-gray-800 w-full">
              <IconUser size={24} />
              <h1 className="lg:text-2xl text-sm  "> اطلاعات سایت </h1>
            </div>
          </div>
          <div className="rounded-md flex lg:mt-0 mt-6 cursor-pointer hover:bg-red-500 transition hover justify-center items-center h-full lg:h-28 w-auto lg:w-full ">
            <div className="flex justify-around items-center  transition   text-gray-800 w-full">
              <IconLogout size={24} />
              <h1 className="lg:text-2xl text-sm  "> خروج </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
