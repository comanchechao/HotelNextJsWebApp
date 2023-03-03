import { useState } from "react";
import {
  IconBed,
  IconStar,
  IconBath,
  IconToolsKitchen,
  IconMassage,
} from "@tabler/icons";
import { Modal, Button, Group, Accordion } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons";
import hotelOne from "../assets/images/hotelone.jpg";
import Image from "next/image";
import Link from "next/link";
export default function ReservationInfo({
  hotel,
  passengerCount,
  passengers,
  room,
}) {
  let hotels = [{ title: "هتل", rooms: 32, image: hotelOne }];
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        size="70%"
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="جزئیات رزرو"
        className="text-right w-full flex justify-end"
      >
        <div className="w-full h-full">
          <div className="flex w-full justify-around items-center">
            <div className="flex lg:flex-row flex-col-reverse w-full items-center justify-around">
              <div className="flex items-center space-x-1">
                <p>{hotel}</p>
                <p>:نام کاربری</p>
              </div>
              <div className="flex items-center space-x-1">
                <p>{passengers[0].name}</p>
                <p>:نام مالک</p>
              </div>
            </div>
            <div className="flex">
              <IconUserCircle size={50} />
            </div>
          </div>
          <div className="flex w-full justify-center items-center">
            <div className="lg:space-x-2 lg:flex-row flex-col-reverse border border-gray-400 border-dashed flex px-0 items-center justify-between h-full shadow-xl w-full rounded bg-gray-100">
              <div className="flex lg:border-r border-gray-900 flex-col h-full w-full lg:w-2/3 justify-center items-center">
                <div className="flex justify-center items-center w-full h-full">
                  <div className="flex text-center justify-center items-center">
                    <IconBed />
                    <h2>{hotel.rooms}</h2>
                  </div>
                </div>
                <div className="flex flex-col p-5 h-full w-full justify-between  items-around">
                  <Link className="w-full h-full" href="/admin/hoteldetail">
                    <button className="w-full py-4 bg-mainPurple transition ease-in duration-150 font-mainFont rounded-md text-white hover:bg-mainBlue">
                      نمایش هتل
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
                  <h2>مشاهده روی نقشه</h2>
                </div>
              </div>
              <div className="flex w-full h-full lg:h-52 justify-center items-center">
                <Image alt="" className="w-full lg:h-52 object-contain" />
              </div>
            </div>
          </div>
          <div className="flex m-2 flex-col w-full">
            <div className="flex w-full border-b-2 border-gray-900 justify-end text-right">
              <h1 className="bg-gray-900 p-3 text-gray-100">درخواست</h1>
            </div>
            <div className="flex">
              <div className="flex border border-gray-300 bg-white justify-around divide-y my-5 divide-gray-300 rounded-sm flex-col w-full h-64">
                <div className="flex flex-col py-4 px-5 justify-center items-end ">
                  <h1 className="text-2xl border-b-2 p-3 border-mainPurple rounded-md">
                    {room ? room.title : null}
                  </h1>
                  <h2 className="my-3"> {room ? room.meal : null}</h2>
                </div>
                <div className="flex items-center h-full w-full px-5 justify-between">
                  <div className="flex space-x-1 p-2 justify-center items-center">
                    <h2>ریال</h2>
                    <h2 className="  text-3xl text-mainPurple">
                      {" "}
                      {room ? room.price : null}
                    </h2>
                  </div>
                  <h1 className="text-lg">قیمت برای هرشب</h1>
                </div>
                <div className="flex justify-center items-center h-full">
                  <Link href="/checkout">
                    <button className="py-3  hover:text-white border-mainPurple border-2 border-dashed ease-in duration-300 hover:bg-darkPurple transition rounded-full  text-mainPurple my-5 px-12 bg-transparent  ">
                      <p>رزرو مجدد</p>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex s justify-around bg-gray-600 items-center  w-full h-full p-3 ">
              {passengers.map((pass, i) => {
                return (
                  <Accordion
                    key={i}
                    variant="separated"
                    chevronPosition="left"
                    color="yellow"
                    className=""
                  >
                    <Accordion.Item value="customization">
                      <Accordion.Control className="text-right w-full">
                        <p>مسافر {i + 1}</p>
                      </Accordion.Control>
                      <Accordion.Panel>
                        <div className="flex w-full space-x-4 justify-around items-center">
                          <div className="flex items-center space-x-1">
                            <p>{pass.phoneNumber}</p>
                            <p>:شماره تماس</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <p>{pass.socialNumber}</p>
                            <p>:شماره ملی</p>
                          </div>
                        </div>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                );
              })}
            </div>
          </div>
        </div>
      </Modal>

      <Group position="center">
        <button
          onClick={() => {
            setOpened(true);
          }}
          className="lg:w-32 w-24 py-2 border-2 text-mainPurple text-lg border-mainPurple border-dashed  urple transition ease-in duration-300 font-mainFont rounded-md   hover:bg-mainBlue"
        >
          <p>جزئیات</p>
        </button>
      </Group>
    </>
  );
}
