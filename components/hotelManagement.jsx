import hotelOne from "../assets/images/hotelone.jpg";
import hotelTwo from "../assets/images/hoteltwo.jpg";
import hotelThree from "../assets/images/hotelthree.jpg";
import hotelFour from "../assets/images/hotelfour.jpg";
import Image from "next/image";
import AddHotel from "../components/addHotel";
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
import { useEffect } from "react";
import dynamic from "next/dynamic";
import HotelImage from "./hotelImage";

export default function HotelManagement({ hotels }) {
  const HotelMap = dynamic(() => import("./hotelMap"), {
    ssr: false,
  });
  return (
    <div className="flex flex-col w-full h-full bg-gray-200">
      <div className="flex w-full space-y-4 flex-col">
        <div class="pt-4 px-2 flex w-full justify-center items-center relative text-black ">
          <div className="flex flex-reverse w-full items-center space-x-2 justify-center">
            <button
              type="submit"
              className="bg-gray-100 justify-center items-center border-2 h-10 px-3  flex"
            >
              <MagnifyingGlass size={20} weight="bold" />
            </button>
            <input
              className="border-2 p-0 placeholder-gray-400 text-right transition ease-in duration-300 text-darkPurple w-textArea hover:bg-white   bg-gray-100 font-mainFont h-10 px-5 pr-4 md:pr-16 rounded-sm  text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="جستجو نام هتل"
            />
          </div>
        </div>
        <Tabs color="violet" variant="pills" defaultValue="gallery">
          <Tabs.List className="px-2" position="center">
            <Tabs.Tab value="settings" icon={<IconUsers size={14} />}>
              هتل های همکاران
            </Tabs.Tab>
            <Tabs.Tab value="messages" icon={<IconUser size={14} />}>
              هتل های من
            </Tabs.Tab>
            <Tabs.Tab
              value="gallery"
              icon={<IconBuildingSkyscraper size={14} />}
            >
              همه هتل ها
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="gallery" pt="xs">
            <div className="flex w-full p-5  lg:h-rem28 lg:overflow-y-scroll space-y-7  flex-col">
              {hotels.map((hotel, i) => {
                console.log(hotel.locationLat);
                return (
                  <div
                    key={i}
                    className="lg:space-x-2 lg:flex-row flex-col-reverse  flex px-0 items-center justify-between h-full shadow-xl w-full rounded bg-gray-100"
                  >
                    <div className="flex lg:border-r border-gray-900 flex-col h-full w-full lg:w-2/3 justify-center items-center">
                      <div className="flex justify-center items-center w-full h-full">
                        <div className="flex text-center justify-center items-center">
                          <IconBed />
                          <h2>{hotel.rooms}</h2>
                        </div>
                      </div>
                      <div className="flex flex-col p-5 h-full w-full justify-between  items-around">
                        <Link
                          className="w-full h-full"
                          href="/admin/hoteldetail"
                        >
                          <button className="w-full py-4 bg-mainPurple transition ease-in duration-150 font-mainFont rounded-full text-white hover:bg-mainBlue">
                            ویرایش هتل
                          </button>
                        </Link>
                      </div>
                      <div className="flex space-x-2 p-1 justify-start items-end w-full h-full font-medium text-sm">
                        <p>Ana Hotel</p> <p>ساخته شده توسط</p>
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
                        <HotelMap
                          lat={hotel.locationLat}
                          lng={hotel.locationLng}
                        />
                      </div>
                    </div>
                    <div className="flex w-full h-full lg:h-52 justify-center items-center">
                      <HotelImage image={hotel.firstImage} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="messages" pt="xs">
            <div className="flex w-full p-5  lg:h-rem34 lg:overflow-y-scroll space-y-4 flex-col">
              {hotels.map((hotel, i) => {
                return (
                  <div
                    key={i}
                    className="lg:space-x-2 lg:flex-row flex-col-reverse  flex px-0 items-center justify-between h-full shadow-2xl w-full rounded bg-gray-100"
                  >
                    <div className="flex lg:border-r border-gray-900 flex-col h-full w-full lg:w-2/3 justify-center items-center">
                      <div className="flex justify-center items-center w-full h-full">
                        <div className="flex text-center justify-center items-center">
                          <IconBed />
                          <h2>{hotel.rooms}</h2>
                        </div>
                      </div>
                      <div className="flex flex-col p-5 h-full w-full justify-between  items-around">
                        <Link
                          className="w-full h-full"
                          href="/admin/hotelDetail"
                        >
                          <button className="w-full py-4 bg-mainPurple transition ease-in duration-300 font-mainFont rounded-full text-white hover:bg-mainBlue">
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
        <div className="absolute right-8 bottom-8">
          <AddHotel />
        </div>
      </div>
    </div>
  );
}
