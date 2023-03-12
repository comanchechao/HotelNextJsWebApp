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
import { adminAuthClient } from "../../lib/supbaseServer";
import WebsiteInfo from "../../components/websiteInfo";
import AddCity from "../../components/addCity";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router.js";

export async function getServerSideProps(context) {
  // Fetch data from the database

  const refreshToken = context.req.cookies["my-refresh-token"];
  const accessToken = context.req.cookies["my-access-token"];

  if (!refreshToken && !accessToken) {
    throw new Error("user not authenticated");
  }
  await supabase.auth.setSession({
    refresh_token: refreshToken,
    access_token: accessToken,
  });

  const { data: user, error5 } = await supabase.auth.getUser(accessToken);
  if (error5) throw error;

  const {
    data: { users },
    error7,
  } = await adminAuthClient.listUsers();

  const { data: hotels, error } = await supabase
    .from("Hotels")
    .select()
    .eq("owner", user.user.id);
  const { data: cities, error2 } = await supabase.from("cities").select();

  const { data: features, error3 } = await supabase
    .from("features")
    .select("title");

  const { data: userRole, error6 } = await supabase
    .from("profiles")
    .select()
    .eq("id", user.user.id);

  if (error6) throw error6;

  if (error) throw error;
  if (error2) throw error2;
  if (error3) throw error3;
  if (userRole[0].role !== "admin" && userRole[0].role !== "colleage") {
    throw new Error("you are not authorized");
  }
  return {
    props: {
      user: user.user,
      users: users,
      cities: cities,
      hotels: hotels,
      features: features,
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
}

export default function AdminPage({
  session,
  user,
  hotels,
  cities,
  features,
  users,
}) {
  const [hotelIds, setHotelIds] = useState([]);
  useEffect(() => {
    if (hotels) {
      hotels.forEach((hotel, i) => {
        if (hotelIds.indexOf(hotel.id) === -1) {
          hotelIds.push(hotel.id);
        }
      });
    }
  }, []);
  const router = useRouter();
  const [tab, setTab] = useState("hotel");
  const [bg, setBg] = useState("");

  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <div className="h-auto w-screen bg-gray-100  ">
      <Navbar />
      <div className="h-full  w-full items-center pt-14 lg:pt-0 flex lg:flex-row flex-col-reverse space-y-3 lg:space-x-8 lg:px-40">
        <div className="lg:w-3/4 w-full flex items-center justify-center h-screen lg:p-6 py-6">
          {tab === "user" ? (
            <UserManagement users={users} />
          ) : tab === "city" ? (
            <AddCity cities={cities} />
          ) : tab === "reserve" ? (
            <ReservationManagement Hotels={hotelIds} />
          ) : tab === "websiteInfo" ? (
            <WebsiteInfo />
          ) : tab === "hotel" ? (
            <HotelManagement
              user={user}
              hotels={hotels}
              cities={cities}
              features={features}
            />
          ) : null}
        </div>
        <div className=" text-right  rounded-md  flex   lg:space-x-0 mt-44   lg:space-y-2 lg:mt-0   flex-col items-center lg:items-end  justify-around lg:justify-center lg:w-1/4 w-full h-full  bg-white text-gray-800">
          <div
            onClick={() => {
              setTab("hotel");
            }}
            className={`${
              tab === "hotel"
                ? "flex cursor-pointer rounded-md  bg-mainBlue ease-in duration-150 transition  text-white justify-center items-center h-full lg:h-auto p-3 w-auto lg:w-full"
                : "flex cursor-pointer rounded-md  hover:bg-mainBlue ease-in duration-150 transition hover:text-white justify-center items-center h-full lg:h-auto p-3 w-auto lg:w-full"
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
                ? "flex cursor-pointer rounded-md  bg-mainBlue ease-in duration-150 transition  text-white justify-center items-center h-full lg:h-auto p-3 w-auto lg:w-full"
                : "flex cursor-pointer rounded-md  hover:bg-mainBlue ease-in duration-150 transition hover:text-white justify-center items-center h-full lg:h-auto p-3 w-auto lg:w-full"
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
                ? "flex cursor-pointer rounded-md  bg-mainBlue ease-in duration-150 transition  text-white justify-center items-center h-full lg:h-auto p-3 w-auto lg:w-full"
                : "flex cursor-pointer rounded-md  hover:bg-mainBlue ease-in duration-150 transition hover:text-white justify-center items-center h-full lg:h-auto p-3 w-auto lg:w-full"
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
                ? "flex cursor-pointer rounded-md  bg-mainBlue ease-in duration-150 transition  text-white justify-center items-center h-full lg:h-auto p-3 w-auto lg:w-full"
                : "flex cursor-pointer rounded-md  hover:bg-mainBlue ease-in duration-150 transition hover:text-white justify-center items-center h-full lg:h-auto p-3 w-auto lg:w-full"
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
                ? "flex cursor-pointer rounded-md  bg-mainBlue ease-in duration-150 transition  text-white justify-center items-center h-full lg:h-auto p-3 w-auto lg:w-full"
                : "flex cursor-pointer rounded-md  hover:bg-mainBlue ease-in duration-150 transition hover:text-white justify-center items-center h-full lg:h-auto p-3 w-auto lg:w-full"
            }`}
          >
            <div className="flex justify-around items-center  transition   text-gray-800 w-full">
              <IconUser size={24} />
              <h1 className="lg:text-2xl text-sm  "> اطلاعات سایت </h1>
            </div>
          </div>
          <div className="rounded-md flex lg:mt-0 mt-6 cursor-pointer hover:bg-red-500 transition hover justify-center items-center h-full lg:h-auto p-3 w-auto lg:w-full ">
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
