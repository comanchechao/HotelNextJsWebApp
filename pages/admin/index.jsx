import Navbar from "../../components/Navbar.jsx";
import { Menu, Button, Text } from "@mantine/core";
import ReservationManagement from "../../components/reservationManagement.js";
import UserManagement from "../../components/userManagement";
import HotelManagement from "../../components/hotelManagement";
import { Drawer, Group, useMantineTheme } from "@mantine/core";
import Footer from "../../components/Footer";
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconSortDescending2,
  IconStars,
  IconMenu2,
  IconBuildingSkyscraper,
  IconStarsOff,
  IconUserCheck,
  IconSortAscending,
  IconLogout,
  IconBook,
} from "@tabler/icons";
import { useState } from "react";

export default function adminPage() {
  const [tab, setTab] = useState("hotel");
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <div className="w-screen h-full">
      <Navbar />
      <div className="flex pt-16 w-full h-full">
        <div className="hidden pt-5 lg:flex flex-col h-screen w-96 divide-y bg-CoolGray-900">
          <div className="flex w-full justify-center items-center ">
            <div className="flex h-28 justify-around items-center text-gray-100 w-full">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <div className="text-gray-100 font-bold text-2xl">
                <h1>ادمین</h1>
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              setTab("hotel");
            }}
            className="flex cursor-pointer hover:bg-mainPurple transition hover:text-white justify-center items-center h-28 w-full "
          >
            <div className="flex justify-around items-center  transition   text-gray-50 w-full">
              <IconBuildingSkyscraper size={24} />
              <h1 className="text-2xl font-bold"> هتل ها </h1>
            </div>
          </div>
          <div
            onClick={() => {
              setTab("user");
            }}
            className="flex cursor-pointer hover:bg-mainPurple transition hover justify-center items-center h-28 w-full "
          >
            <div className="flex justify-around items-center  transition   text-gray-50 w-full">
              <IconUserCheck size={24} />
              <h1 className="text-2xl font-bold"> همکاران </h1>
            </div>
          </div>
          <div
            onClick={() => {
              setTab("reserve");
            }}
            className="flex cursor-pointer hover:bg-mainPurple transition hover justify-center items-center h-28 w-full "
          >
            <div className="flex justify-around items-center  transition   text-gray-50 w-full">
              <IconBook size={24} />
              <h1 className="text-2xl font-bold"> رزرو ها </h1>
            </div>
          </div>
          <div className="flex cursor-pointer hover:bg-mainPurple transition hover justify-center items-center h-28 w-full ">
            <div className="flex justify-around items-center  transition   text-gray-50 w-full">
              <IconBuildingSkyscraper size={24} />
              <h1 className="text-2xl font-bold"> هتل ها </h1>
            </div>
          </div>
          <div className="flex cursor-pointer hover:bg-red-700 transition hover justify-center items-center h-28 w-full ">
            <div className="flex justify-around items-center  transition   text-gray-50 w-full">
              <IconLogout size={24} />
              <h1 className="text-2xl font-bold"> خروج </h1>
            </div>
          </div>
        </div>
        <div className="flex  py-0 flex-col w-full h-full bg-gray-200">
          <div className="flex border-b border-gray-900 shadow-2xl h-14 lg:justify-end justify-between w-full items-center">
            <div className="lg:hidden flex px-2 justify-center items-center">
              <IconMenu2
                onClick={() => setOpened(true)}
                size={32}
                className="text-gray-900"
              />
            </div>

            <div className="flex h-full item-center justify-around">
              <Menu shadow="md" width={250} height={200}>
                <Menu.Target>
                  <Button className=" transition hover:text-black hover:bg-gray-50 text-gray-900 w-full h-full rounded-none">
                    <IconSearch size={30} />
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <input
                    placeholder="...جستوجو در هتل ها "
                    className=" lg:block text-right rounded-xl p-4 bg-gray-100"
                    type="text"
                  />
                </Menu.Dropdown>
              </Menu>
              <div className="flex justify-center items-center bg-yellow-500 h-full">
                <Menu
                  trigger="hover"
                  openDelay={100}
                  closeDelay={200}
                  shadow="md"
                  width={200}
                >
                  <Menu.Target>
                    <Button className="hover:bg-gray-100 transition text-gray-900 w-full h-full rounded-none">
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
                      <button className="w-full py-4 bg-darkPurple transition ease-in duration-300 font-mainFont rounded-full text-white hover:bg-Sky-500">
                        شهر جدید
                      </button>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>

              <div className="flex h-full">
                {" "}
                <Menu
                  trigger="hover"
                  openDelay={100}
                  closeDelay={200}
                  shadow="md"
                  width={200}
                >
                  <Menu.Target>
                    <Button className="hover:bg-gray-100 hover:text-gray-900 transition  w-full h-full rounded-none text-gray-900">
                      دسته بندی
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
              <HotelManagement />
            ) : tab === "user" ? (
              <UserManagement />
            ) : tab === "reserve" ? (
              <ReservationManagement />
            ) : null}
          </div>
          <Drawer
            opened={opened}
            onClose={() => setOpened(false)}
            className="bg-CoolGray-900"
            size="xl"
            overlayOpacity={0.1}
            overlayBlur={0.1}
            overlayColor={
              theme.colorScheme === "dark"
                ? theme.colors.dark[9]
                : theme.colors.gray[2]
            }
          >
            <div className=" lg:flex flex-col h-full w-full divide-y bg-CoolGray-900">
              <div className="flex w-full justify-center items-center ">
                <div className="flex h-28 justify-around items-center text-gray-100 w-full">
                  <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  <div className="text-gray-100 font-bold text-2xl">
                    <h1>ادمین</h1>
                  </div>
                </div>
              </div>
              <div
                onClick={() => {
                  setTab("hotel");
                }}
                className="flex cursor-pointer hover:bg-mainPurple transition hover:text-white justify-center items-center h-28 w-full "
              >
                <div className="flex justify-around items-center  transition   text-gray-50 w-full">
                  <IconBuildingSkyscraper size={24} />
                  <h1 className="text-2xl font-bold"> هتل ها </h1>
                </div>
              </div>
              <div
                onClick={() => {
                  setTab("user");
                }}
                className="flex cursor-pointer hover:bg-mainPurple transition hover justify-center items-center h-28 w-full "
              >
                <div className="flex justify-around items-center  transition   text-gray-50 w-full">
                  <IconUserCheck size={24} />
                  <h1 className="text-2xl font-bold"> همکاران </h1>
                </div>
              </div>
              <div
                onClick={() => {
                  setTab("reserve");
                }}
                className="flex cursor-pointer hover:bg-mainPurple transition hover justify-center items-center h-28 w-full "
              >
                <div className="flex justify-around items-center  transition   text-gray-50 w-full">
                  <IconBook size={24} />
                  <h1 className="text-2xl font-bold"> رزرو ها </h1>
                </div>
              </div>
              <div className="flex cursor-pointer hover:bg-mainPurple transition hover justify-center items-center h-28 w-full ">
                <div className="flex justify-around items-center  transition   text-gray-50 w-full">
                  <IconBuildingSkyscraper size={24} />
                  <h1 className="text-2xl font-bold"> هتل ها </h1>
                </div>
              </div>
              <div className="flex cursor-pointer hover:bg-red-700 transition hover justify-center items-center h-28 w-full ">
                <div className="flex justify-around items-center  transition   text-gray-50 w-full">
                  <IconLogout size={24} />
                  <h1 className="text-2xl font-bold"> خروج </h1>
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  );
}
