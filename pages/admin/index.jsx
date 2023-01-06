import Navbar from "../../components/Navbar.jsx";
import { Menu, Button, Text } from "@mantine/core";
import ReservationManagement from "../../components/reservationManagement.js";
import UserManagement from "../../components/userManagement";
import HotelManagement from "../../components/hotelManagement";
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconSortDescending2,
  IconStars,
  IconBuildingSkyscraper,
  IconStarsOff,
  IconUserCheck,
  IconSortAscending,
  IconLogout,
  IconBook,
} from "@tabler/icons";
import { useState } from "react";

export default function adminPage() {
  const [tab, setTab] = useState("");
  return (
    <div className="w-screen h-full">
      <Navbar />
      <div className="flex w-full h-full">
        <div className="flex flex-col h-screen w-96 divide-y bg-black">
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
            className="flex cursor-pointer hover:bg-gray-700 transition hover:text-white justify-center items-center h-28 w-full "
          >
            <div className="flex justify-around items-center  transition   text-gray-100 w-full">
              <IconBuildingSkyscraper size={24} />
              <h1 className="text-2xl font-bold"> هتل ها </h1>
            </div>
          </div>
          <div
            onClick={() => {
              setTab("user");
            }}
            className="flex cursor-pointer hover:bg-gray-700 transition hover justify-center items-center h-28 w-full "
          >
            <div className="flex justify-around items-center  transition   text-gray-100 w-full">
              <IconUserCheck size={24} />
              <h1 className="text-2xl font-bold"> همکاران </h1>
            </div>
          </div>
          <div
            onClick={() => {
              setTab("reserve");
            }}
            className="flex cursor-pointer hover:bg-gray-700 transition hover justify-center items-center h-28 w-full "
          >
            <div className="flex justify-around items-center  transition   text-gray-100 w-full">
              <IconBook size={24} />
              <h1 className="text-2xl font-bold"> رزرو ها </h1>
            </div>
          </div>
          <div className="flex cursor-pointer hover:bg-gray-700 transition hover justify-center items-center h-28 w-full ">
            <div className="flex justify-around items-center  transition   text-gray-100 w-full">
              <IconBuildingSkyscraper size={24} />
              <h1 className="text-2xl font-bold"> هتل ها </h1>
            </div>
          </div>
          <div className="flex cursor-pointer hover:bg-red-700 transition hover justify-center items-center h-28 w-full ">
            <div className="flex justify-around items-center  transition   text-gray-100 w-full">
              <IconLogout size={24} />
              <h1 className="text-2xl font-bold"> خروج </h1>
            </div>
          </div>
        </div>
        <div className="flex py-0 flex-col w-full h-full bg-gray-800">
          <div className="flex h-14 justify-end w-full items-center">
            <div className="flex mx-4">
              <div className="flex">
                <input
                  placeholder="...جستوجو در هتل ها "
                  className="text-right rounded-xl p-4 bg-gray-100"
                  type="text"
                />
              </div>
            </div>
            <div className="flex justify-center items-center bg-yellow-500 h-full">
              {" "}
              <Menu
                trigger="hover"
                openDelay={100}
                closeDelay={400}
                shadow="md"
                width={200}
              >
                <Menu.Target>
                  <Button className="hover:bg-gray-100 transition text-gray-900 w-full h-full rounded-none">
                    شهر ها
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Danger zone</Menu.Label>
                  <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
                    Transfer my data
                  </Menu.Item>
                  <Menu.Item color="red" icon={<IconTrash size={14} />}>
                    Delete my account
                  </Menu.Item>
                  <Menu.Divider />

                  <Menu.Label>Application</Menu.Label>
                  <Menu.Item icon={<IconSettings size={14} />}>
                    Settings
                  </Menu.Item>
                  <Menu.Item icon={<IconMessageCircle size={14} />}>
                    Messages
                  </Menu.Item>
                  <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
                  <Menu.Item
                    icon={<IconSearch size={14} />}
                    rightSection={
                      <Text size="xs" color="dimmed">
                        ⌘K
                      </Text>
                    }
                  >
                    Search
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>

            <div className="flex h-full">
              {" "}
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button className="hover:bg-gray-100 hover:text-gray-900 transition  w-full h-full rounded-none text-gray-100">
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
          <div className="w-10/12 h-full  justify-center items-center">
            {tab === "hotel" ? (
              <HotelManagement />
            ) : tab === "user" ? (
              <UserManagement />
            ) : tab === "reserve" ? (
              <ReservationManagement />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
