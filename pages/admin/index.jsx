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
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import WebsiteInfo from "../../components/websiteInfo.jsx";

export async function getServerSideProps() {
  // Fetch data from the database

  const { data, error } = await supabase.from("Hotels").select();

  if (error) throw error;
  return {
    props: {
      hotels: data,
    },
  };
}

export default function AdminPage({ hotels }) {
  const [tab, setTab] = useState("user");
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <div className="w-full h-screen bg-gray-200">
      <Navbar />
      <div className="flex pt-5 w-full h-screen items-center justify-center lg:space-x-5 lg:px-44">
        <div className="hidden pt-9 p-10 lg:flex flex-col items-center h-carousel justify-center w-full divide-y bg-white text-gray-800">
          <div className="flex w-full justify-center items-center ">
            <div className="flex h-28 justify-around items-center w-full">
              <div className="text-gray-800 mx-14 text-2xl">
                <h1>ادمین</h1>
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              setTab("hotel");
            }}
            className="flex cursor-pointer hover:bg-mainBlue ease-in duration-150 transition hover:text-white justify-center items-center h-28 w-full "
          >
            <div className="flex justify-around items-center  transition   text-gray-800 w-full">
              <IconBuildingSkyscraper size={24} />
              <h1 className="text-2xl  "> هتل ها </h1>
            </div>
          </div>
          <div
            onClick={() => {
              setTab("user");
            }}
            className="flex cursor-pointer hover:bg-mainBlue ease-in duration-150 transition hover justify-center items-center h-28 w-full "
          >
            <div className="flex justify-around items-center  transition   text-gray-800 w-full">
              <IconUserCheck size={24} />
              <h1 className="text-2xl  "> همکاران </h1>
            </div>
          </div>
          <div
            onClick={() => {
              setTab("reserve");
            }}
            className="flex cursor-pointer hover:bg-mainBlue ease-in duration-150 transition hover justify-center items-center h-28 w-full "
          >
            <div className="flex justify-around items-center  transition   text-gray-800 w-full">
              <IconBook size={24} />
              <h1 className="text-2xl  "> رزرو ها </h1>
            </div>
          </div>
          <div
            onClick={() => {
              setTab("websiteInfo");
            }}
            className="flex cursor-pointer hover:bg-mainBlue ease-in duration-150 transition hover justify-center items-center h-28 w-full "
          >
            <div className="flex justify-around items-center  transition   text-gray-800 w-full">
              <IconUser size={24} />
              <h1 className="text-2xl  "> اطلاعات سایت </h1>
            </div>
          </div>
          <div className="flex cursor-pointer hover:bg-red-500 transition hover justify-center items-center h-28 w-full ">
            <div className="flex justify-around items-center  transition   text-gray-800 w-full">
              <IconLogout size={24} />
              <h1 className="text-2xl  "> خروج </h1>
            </div>
          </div>
        </div>
        <div className="flex py-0 flex-col w-10/12 h-full mt-28">
          <div className="flex py-5  bg-white z-20   drop-shadow-lg h-20 lg:justify-end justify-between w-full items-center">
            <div className="lg:hidden flex px-2 justify-center items-center">
              <IconMenu2
                onClick={() => setOpened(true)}
                size={32}
                className="text-gray-900"
              />
            </div>

            <div className="flex h-full items-center justify-around">
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
                    <Menu.Item
                      className="font-medium text-right"
                      icon={<IconBuildingSkyscraper size={14} />}
                    >
                      مشهد
                    </Menu.Item>
                    <Menu.Item
                      className="font-medium text-right"
                      icon={<IconBuildingSkyscraper size={14} />}
                    >
                      مشهد
                    </Menu.Item>
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
                      <button className="w-full py-4 bg-darkPurple transition ease-in duration-300 font-mainFont rounded-md text-white hover:bg-mainBlue">
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
          </div>
          <div className="w-full h-full  justify-center items-center">
            {tab === "hotel" ? (
              <HotelManagement hotels={hotels} />
            ) : tab === "user" ? (
              <UserManagement />
            ) : tab === "reserve" ? (
              <ReservationManagement />
            ) : tab === "websiteInfo" ? (
              <WebsiteInfo />
            ) : null}
          </div>
          <Drawer
            opened={opened}
            onClose={() => setOpened(false)}
            className=""
            size="lg"
            overlayOpacity={0.1}
            overlayBlur={0.1}
            overlayColor={
              theme.colorScheme === "dark"
                ? theme.colors.dark[9]
                : theme.colors.gray[2]
            }
          >
            <div className=" lg:flex flex-col items-center h-screen justify-center w-full divide-y bg-white text-gray-800">
              <div className="flex w-full justify-center items-center ">
                <div className="flex h-24 justify-around items-center w-full">
                  <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  <div className="text-gray-800   text-2xl">
                    <h1>ادمین</h1>
                  </div>
                </div>
              </div>
              <div
                onClick={() => {
                  setTab("hotel");
                }}
                className="flex cursor-pointer hover:bg-mainBlue ease-in duration-150 transition hover:text-white justify-center items-center h-24 w-full "
              >
                <div className="flex justify-around items-center  transition   text-gray-800 w-full">
                  <IconBuildingSkyscraper size={24} />
                  <h1 className="text-2xl  "> هتل ها </h1>
                </div>
              </div>
              <div
                onClick={() => {
                  setTab("user");
                }}
                className="flex cursor-pointer hover:bg-mainBlue ease-in duration-150 transition hover justify-center items-center h-24 w-full "
              >
                <div className="flex justify-around items-center  transition   text-gray-800 w-full">
                  <IconUserCheck size={24} />
                  <h1 className="text-2xl  "> همکاران </h1>
                </div>
              </div>
              <div
                onClick={() => {
                  setTab("websiteInfo");
                  console.log(tab);
                }}
                className="flex cursor-pointer hover:bg-mainBlue ease-in duration-150 transition hover justify-center items-center h-28 w-full "
              >
                <div className="flex justify-around items-center  transition   text-gray-800 w-full">
                  <IconUser size={24} />
                  <h1 className="text-2xl  "> اطلاعات سایت </h1>
                </div>
              </div>
              <div
                onClick={() => {
                  setTab("reserve");
                }}
                className="flex cursor-pointer hover:bg-mainBlue ease-in duration-150 transition hover justify-center items-center h-24 w-full "
              >
                <div className="flex justify-around items-center  transition   text-gray-800 w-full">
                  <IconBook size={24} />
                  <h1 className="text-2xl  "> رزرو ها </h1>
                </div>
              </div>
              <div className="flex cursor-pointer hover:bg-mainBlue ease-in duration-150 transition hover justify-center items-center h-24 w-full ">
                <div className="flex justify-around items-center  transition   text-gray-800 w-full">
                  <IconBuildingSkyscraper size={24} />
                  <h1 className="text-2xl  "> هتل ها </h1>
                </div>
              </div>
              <div className="flex cursor-pointer hover:bg-red-500 transition hover justify-center items-center h-24 w-full ">
                <div className="flex justify-around items-center  transition   text-gray-800 w-full">
                  <IconLogout size={24} />
                  <h1 className="text-2xl  "> خروج </h1>
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  );
}
