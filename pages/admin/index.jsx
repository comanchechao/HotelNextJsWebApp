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

  if (error) throw error;
  if (error2) throw error2;
  if (error3) throw error3;
  return {
    props: {
      cities: cities,
      hotels: hotels,
      features: features,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function AdminPage({ hotels, cities, features }) {
  const [tab, setTab] = useState("user");
  const [bg, setBg] = useState("");

  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <div className="w-screen h-auto bg-gray-200 overflow-y-hidden">
      <Navbar />
      <div className="flex  w-full h-screen lg:flex-row flex-col-reverse lg:pt-20 pt-40  items-center justify-center lg:space-x-5 lg:px-36 py-20 lg:py-36 ">
        <div className="flex   lg:px-12 lg:py-24     flex-col w-full px-5 lg:w-3/4 h-screen     lg:h-screen ">
          {/* <div className="flex   bg-white   h-auto lg:justify-end justify-between w-full items-center">
            <div className="lg:hidden flex px-2 justify-center items-center">
              <IconMenu2
                onClick={() => setOpened(true)}
                size={32}
                className="text-gray-900"
              />
            </div>

            <div className="flex   h-full items-center justify-around">
              <div className="flex justify-center items-center h-full">
                <Menu
                  trigger="hover"
                  openDelay={100}
                  closeDelay={200}
                  shadow="md"
                  width={200}
                >
                  <Menu.Target>
                    <Button className="hover:bg-gray-100 font-normal text-lg transition text-gray-900 w-full h-full rounded-none">
                      شهر ها
                    </Button>
                  </Menu.Target>

                  <Menu.Dropdown className="text-right">
                    <Menu.Label>شهر های ایران</Menu.Label>
                    {cities.map((city) => {
                      return (
                        <Menu.Item
                          key={city.id}
                          className="font-medium text-right"
                          icon={<IconBuildingSkyscraper size={14} />}
                        >
                          {city.name}
                        </Menu.Item>
                      );
                    })}

                    <Menu.Divider />

                    <Menu.Label>شهر های ترکیه</Menu.Label>
                    <Menu.Item
                      className="font-medium text-right"
                      icon={<IconBuildingSkyscraper size={14} />}
                    >
                      استانبول
                    </Menu.Item>
                    <Menu.Item
                      className="font-medium text-right"
                      icon={<IconBuildingSkyscraper size={14} />}
                    >
                      استانبول
                    </Menu.Item>
                    <Menu.Item
                      className="font-medium text-right"
                      icon={<IconBuildingSkyscraper size={14} />}
                    >
                      استانبول
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Label>افزودن هتل</Menu.Label>
                    <Menu.Item className="font-medium text-right">
                      <button className="w-full py-4 bg-mainPurple border-r-8 border-mainBlue transition ease-in duration-300 font-mainFont rounded-md text-white hover:bg-mainBlue">
                        شهر جدید
                      </button>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>

              <div className="flex h-full">
                <Menu
                  trigger="hover"
                  openDelay={100}
                  closeDelay={200}
                  shadow="md"
                  width={200}
                >
                  <Menu.Target>
                    <Button className="hover:bg-gray-100 font-normal text-lg hover:text-gray-900 transition w-full h-full rounded-none text-gray-900">
                      مرتب سازی
                    </Button>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>بروز رسانی</Menu.Label>
                    <Menu.Item
                      className="text-right"
                      icon={<IconSortAscending size={14} />}
                    >
                      تازه ترین
                    </Menu.Item>
                    <Menu.Item
                      className="text-right"
                      icon={<IconSortDescending2 size={14} />}
                    >
                      قدیمی ترین
                    </Menu.Item>
                    <Menu.Label>ستاره ها</Menu.Label>
                    <Menu.Item
                      className="text-right"
                      icon={<IconStars size={14} />}
                    >
                      بیشترین
                    </Menu.Item>
                    <Menu.Item
                      className="text-right"
                      icon={<IconStarsOff size={14} />}
                    >
                      کمترین
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
            </div>
          </div> */}
          <div className="w-full h-screen    rounded-md    justify-center items-center">
            {tab === "hotel" ? (
              <HotelManagement
                features={features}
                hotels={hotels}
                cities={cities}
              />
            ) : tab === "user" ? (
              <UserManagement />
            ) : tab === "city" ? (
              <AddCity cities={cities} />
            ) : tab === "reserve" ? (
              <ReservationManagement />
            ) : tab === "websiteInfo" ? (
              <WebsiteInfo />
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
