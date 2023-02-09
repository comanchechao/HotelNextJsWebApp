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
        size="55%"
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="اطلاعات کاربر"
        className="text-right w-full flex justify-end"
      >
        <div className="w-full h-full">
          <div className="flex w-full justify-around items-center">
            <div className="flex w-full items-center justify-around">
              <div className="flex items-center space-x-1">
                <p>Hotel Ana</p>
                <p>:نام کاربری</p>
              </div>
              <div className="flex items-center space-x-1">
                <p>آرنیک نرمال</p>
                <p>:نام مالک</p>
              </div>
            </div>
            <div className="flex">
              <IconUserCircle size={50} />
            </div>
          </div>
          <div className="flex w-full justify-center items-center">
            <Accordion
              variant="separated"
              chevronPosition="left"
              color="violet"
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
              <h1 className="bg-gray-900 p-3 text-gray-100">مدارک هتل</h1>
            </div>
            <div className="flex w-full justify-around items-center p-4">
              <button className="lg:w-32 w-24 py-3 border-2 text-lg border-gray-100  bg-green-800 transition ease-in duration-300 font-mainFont rounded-md text-gray-50 hover:bg-green-500 hover:text-gray-100 ">
                <p>تایید</p>
              </button>
              <button className="lg:w-32 w-24 py-3 border-2 text-lg border-gray-100  bg-red-800 transition ease-in duration-300 font-mainFont rounded-md text-gray-50 hover:bg-red-500 hover:text-gray-100 ">
                <p>رد</p>
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Group position="center">
        <button
          onClick={() => {
            setOpened(true);
          }}
          className="lg:w-32 w-24 py-2 border-2 text-lg border-mainYellow border-dashed bg-transparent transition ease-in duration-300 font-mainFont rounded-md text-darkPurple hover:bg-yellow-500 "
        >
          <p>اطلاعات</p>
        </button>
      </Group>
    </>
  );
}
