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
import hotelTwo from "../assets/images/hoteltwo.jpg";
import hotelThree from "../assets/images/hotelthree.jpg";
import hotelFour from "../assets/images/hotelfour.jpg";
import Image from "next/image";
import Link from "next/link";
export default function SuperUserModal() {
  let hotels = [
    { title: "هتل", rooms: 32, image: hotelOne },
    { title: "دلتا", rooms: 32, image: hotelTwo },
  ];
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        size="auto"
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        className="text-right w-full flex justify-end"
      >
        <div className="w-full h-full">
          <div className="flex w-full justify-center items-center">
            <div className="flex w-full items-center justify-center flex-col space-y-5">
              <div className="flex items-center space-x-1 text-2xl">
                <p>Hotel Ana</p>
                <p>:نام کاربری</p>
              </div>
              <div className="flex items-center space-x-1 text-2xl">
                <p>آرنیک نرمال</p>
                <p>:نام مالک</p>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center items-center my-8">
            <Accordion
              variant="separated"
              chevronPosition="left"
              color="yellow"
            >
              <Accordion.Item value="customization">
                <Accordion.Control className="text-right w-full">
                  <p>اطلاعات بیشتر</p>
                </Accordion.Control>
                <Accordion.Panel>
                  <div className="flex w-full space-x-4 justify-around items-center">
                    <div className="flex items-center space-x-1">
                      <p>021 555 8789</p>
                      <p>:شماره تماس</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <p>423940234</p>
                      <p>:شماره ملی</p>
                    </div>
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="flex m-2 flex-col w-full">
            <div className="flex w-full border-b-2 border-gray-900 justify-end text-right">
              <h1 className="bg-mainPurple text-mainBlue p-3  ">
                هتل های ثبت شده
              </h1>
            </div>
            <div className="flex space-y-4 justify-center items-center  w-full h-full py-3 flex-col">
              {hotels.map((hotel, i) => {
                return (
                  <div
                    key={i}
                    className="lg:space-x-2 lg:flex-row flex-col-reverse border border-gray-300   flex px-0 items-center justify-between h-full shadow-xl w-full rounded bg-mainWhite"
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
                      <Image
                        alt=""
                        className=" object-cover h-52"
                        src={hotel.image}
                      />
                    </div>
                  </div>
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
          className="lg:w-32 w-24 py-2 border-2 text-lg border-darkPurple border-dashed bg-transparent transition ease-in duration-300 font-mainFont rounded-md text-darkPurple hover:bg-mainBlue"
        >
          <p>اطلاعات</p>
        </button>
      </Group>
    </>
  );
}
