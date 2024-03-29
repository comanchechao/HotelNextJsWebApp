import Navbar from "../../components/Navbar.jsx";
import ReservationManagement from "../../components/reservationManagement.js";
import UserManagement from "../../components/userManagement";
import HotelManagement from "../../components/hotelManagement";
import { Drawer, Group, useMantineTheme } from "@mantine/core";
import Footer from "../../components/Footer";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient.js";
import { adminAuthClient } from "../../lib/supbaseServer";
import WebsiteInfo from "../../components/websiteInfo";
import AddCity from "../../components/addCity";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router.js";
import { useTranslation } from "next-i18next";
import {
  Desktop,
  MapTrifold,
  Buildings,
  Users,
  Newspaper,
  SignOut,
} from "phosphor-react";

export async function getServerSideProps(context) {
  // Fetch data from the database

  const refreshToken = context.req.cookies["my-refresh-token"];
  const accessToken = context.req.cookies["my-access-token"];

  if (!refreshToken && !accessToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  await supabase.auth.setSession({
    refresh_token: refreshToken,
    access_token: accessToken,
  });

  const { data: user, error5 } = await supabase.auth.getUser(accessToken);

  const { data: userRole, error6 } = await supabase
    .from("profiles")
    .select()
    .eq("id", user.user.id);

  if (error6) throw error6;

  if (userRole[0].role !== "admin" && userRole[0].role !== "colleage") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const { data: cities, error2 } = await supabase.from("cities").select();
  const { data: residenceTypes, error4 } = await supabase
    .from("residenceTypes")
    .select();
  const { data: countries } = await supabase.from("countries").select();

  const { data: features, error3 } = await supabase.from("features").select();

  const {
    data: { users },
    error,
  } = await adminAuthClient.listUsers();

  if (error) throw error;

  return {
    props: {
      cities: cities,
      role: userRole[0].role,
      users: users,
      countries: countries,

      residenceTypes: residenceTypes,
      features: features,
      user: user.user,
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
}

export default function AdminPage({
  user,
  cities,
  features,
  residenceTypes,
  users,
  role,
  countries,
}) {
  const [hotelIds, setHotelIds] = useState([]);
  const [hotels, setHotels] = useState([]);

  async function getHotels() {
    const { data: hotels, error } = await supabase
      .from("hotels")
      .select()
      .order("id", { ascending: false });
    if (error) throw error;

    setHotels(hotels);
    if (hotels) {
      hotels.forEach((hotel, i) => {
        if (hotelIds.indexOf(hotel.id) === -1) {
          hotelIds.push(hotel.id);
        }
      });
    }
  }
  useEffect(() => {
    changeAlignment();
    getHotels();
  }, []);
  const router = useRouter();
  const [tab, setTab] = useState("user");
  const [bg, setBg] = useState("");
  const { t, i18n } = useTranslation("common");
  const lng = i18n.language;
  const [opened, setOpened] = useState(false);
  const [alignLeft, setAlignLeft] = useState(false);

  const theme = useMantineTheme();
  async function changeAlignment() {
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
  const handleSignOut = async (e) => {
    try {
      let { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };
  if (role === "admin") {
    return (
      <div className="h-auto w-screen bg-mainWhite  ">
        <Navbar />
        <div
          className={`${
            alignLeft === true
              ? "h-full  w-full items-center pt-14 lg:pt-0 flex lg:flex-row flex-col-reverse space-y-3 lg:space-x-8 lg:px-40"
              : "h-full  w-full items-center pt-14 lg:pt-0 flex lg:flex-row-reverse flex-col-reverse space-y-3 lg:space-x-8 lg:px-40"
          }`}
        >
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
                features={features}
                hotels={hotels}
                cities={cities}
                user={user}
                residenceTypes={residenceTypes}
                countries={countries}
              />
            ) : null}
          </div>
          <div
            className={`${
              alignLeft === true
                ? "rounded-md  flex   lg:space-x-0 mt-44   lg:space-y-1 lg:mt-0   flex-col items-end  justify-center lg:justify-center lg:w-1/4 w-full h-auto  bg-white text-gray-800"
                : "rounded-md  flex   lg:space-x-0 mt-44   lg:space-y-1 lg:mt-0   flex-col items-start lg:items-end  justify-center lg:justify-center lg:w-1/4 w-full h-auto  bg-white text-gray-800"
            }`}
          >
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
              <div
                className={`${
                  alignLeft === true
                    ? "flex justify-evenly items-center    transition   text-gray-800 w-full"
                    : "flex justify-around flex-row-reverse items-center  transition   text-gray-800 w-full"
                }`}
              >
                <Users className="mx-2" weight="fill" size={30} />
                <h2 className="lg:text-xl text-sm  "> {t("users")} </h2>
              </div>
            </div>{" "}
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
              <div
                className={`${
                  alignLeft === true
                    ? "flex justify-evenly items-center    transition   text-gray-800 w-full"
                    : "flex justify-around flex-row-reverse items-center  transition   text-gray-800 w-full"
                }`}
              >
                <Buildings className="mx-2" weight="fill" size={30} />
                <h2 className="lg:text-xl  text-sm  "> {t("hotels")} </h2>
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
              <div
                className={`${
                  alignLeft === true
                    ? "flex justify-evenly items-center    transition   text-gray-800 w-full"
                    : "flex justify-around flex-row-reverse items-center  transition   text-gray-800 w-full"
                }`}
              >
                <MapTrifold className="mx-2" weight="fill" size={30} />
                <h2 className="lg:text-xl text-sm  "> {t("city")} </h2>
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
              <div
                className={`${
                  alignLeft === true
                    ? "flex justify-evenly items-center    transition   text-gray-800 w-full"
                    : "flex justify-around flex-row-reverse items-center  transition   text-gray-800 w-full"
                }`}
              >
                <Newspaper className="mx-2" weight="fill" size={30} />
                <h2 className="lg:text-xl text-sm  "> {t("reservations")} </h2>
              </div>
            </div>
            <div
              onClick={() => {
                setTab("websiteInfo");
              }}
              className={`${
                tab === "websiteInfo"
                  ? "flex cursor-pointer rounded-md  bg-mainBlue ease-in duration-150 transition  text-white justify-center items-center h-full lg:h-auto p-3 w-auto lg:w-full"
                  : "flex cursor-pointer rounded-md  hover:bg-mainBlue ease-in duration-150 transition hover:text-white justify-center text-center items-center h-full lg:h-auto p-3 w-auto lg:w-full"
              }`}
            >
              <div
                className={`${
                  alignLeft === true
                    ? "flex justify-evenly items-center    transition   text-gray-800 w-full"
                    : "flex justify-around flex-row-reverse items-center  transition   text-gray-800 w-full"
                }`}
              >
                <Desktop className="mx-2" weight="fill" size={30} />
                <h2 className="lg:text-xl text-sm  "> {t("websiteInfo")} </h2>
              </div>
            </div>
            <div className="rounded-md flex lg:mt-0  cursor-pointer hover:bg-red-500 transition hover justify-center items-center h-full lg:h-auto p-3 w-auto lg:w-full ">
              <div
                onClick={handleSignOut}
                className={`${
                  alignLeft === true
                    ? "flex justify-evenly items-center    transition   text-gray-800 w-full"
                    : "flex justify-around flex-row-reverse items-center  transition   text-gray-800 w-full"
                }`}
              >
                <SignOut className="mx-2" weight="fill" size={30} />
                <h2 className="lg:text-xl text-sm  "> {t("exit")} </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (role === "colleage") {
    return (
      <div className="h-auto w-screen bg-mainWhite  ">
        <Navbar />
        <div
          className={`${
            alignLeft === true
              ? "h-full  w-full items-center pt-14 lg:pt-0 flex lg:flex-row flex-col-reverse space-y-3 lg:space-x-8 lg:px-40"
              : "h-full  w-full items-center pt-14 lg:pt-0 flex lg:flex-row-reverse flex-col-reverse space-y-3 lg:space-x-8 lg:px-40"
          }`}
        >
          <div className="lg:w-3/4 w-full flex items-center justify-center h-screen lg:p-6 py-6">
            {tab === "reserve" ? (
              <ReservationManagement Hotels={hotelIds} />
            ) : tab === "hotel" ? (
              <HotelManagement
                features={features}
                hotels={hotels}
                cities={cities}
                user={user}
                residenceTypes={residenceTypes}
              />
            ) : null}
          </div>
          <div
            className={`${
              alignLeft === true
                ? "rounded-md  flex   lg:space-x-0 mt-44   lg:space-y-2 lg:mt-0   flex-col items-end  justify-center lg:justify-center lg:w-1/4 w-full h-auto  bg-white text-gray-800"
                : "rounded-md  flex   lg:space-x-0 mt-44   lg:space-y-2 lg:mt-0   flex-col items-start lg:items-end  justify-center lg:justify-center lg:w-1/4 w-full h-auto  bg-white text-gray-800"
            }`}
          >
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
              <div
                className={`${
                  alignLeft === true
                    ? "flex justify-evenly items-center    transition   text-gray-800 w-full"
                    : "flex justify-around flex-row-reverse items-center  transition   text-gray-800 w-full"
                }`}
              >
                <Buildings className="mx-2" weight="fill" size={30} />
                <h2 className="lg:text-xl  text-sm  "> {t("hotels")} </h2>
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
              <div
                className={`${
                  alignLeft === true
                    ? "flex justify-evenly items-center    transition   text-gray-800 w-full"
                    : "flex justify-around flex-row-reverse items-center  transition   text-gray-800 w-full"
                }`}
              >
                <Newspaper className="mx-2" weight="fill" size={30} />
                <h2 className="lg:text-xl text-sm  "> {t("reservations")} </h2>
              </div>
            </div>

            <div className="rounded-md flex lg:mt-0  cursor-pointer hover:bg-red-500 transition hover justify-center items-center h-full lg:h-auto p-3 w-auto lg:w-full ">
              <div
                onClick={handleSignOut}
                className={`${
                  alignLeft === true
                    ? "flex justify-evenly items-center    transition   text-gray-800 w-full"
                    : "flex justify-around flex-row-reverse items-center  transition   text-gray-800 w-full"
                }`}
              >
                <SignOut className="mx-2" weight="fill" size={30} />
                <h2 className="lg:text-xl text-sm  "> {t("exit")} </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
