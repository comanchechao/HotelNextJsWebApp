import { useState, useEffect } from "react";
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
import { useTranslation } from "next-i18next";
import { useMediaQuery } from "@mantine/hooks";

export default function ReservationInfo({
  hotel,
  passengerCount,
  passengers,
  room,
}) {
  let hotels = [{ title: "هتل", rooms: 32, image: hotelOne }];
  const [alignLeft, setAlignLeft] = useState(false);
  const isMobile = useMediaQuery("(max-width: 50em)");

  const [opened, setOpened] = useState(false);
  const { t, i18n } = useTranslation("");
  const lng = i18n.language;

  async function changeAlignment() {
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
  useEffect(() => {
    changeAlignment();
  }, []);
  return (
    <>
      <Modal
        fullScreen={isMobile}
        centered
        size="650px"
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        exitTransitionDuration={600}
        opened={opened}
        onClose={() => setOpened(false)}
        className="text-right w-full flex justify-end"
      >
        <div className="h-full w-full flex items-center  p-4 flex-col space-y-6">
          <h1 className="text-2xl border-b-4 rounded-md border-mainBlue my-6 pb-2">
            {t("reserveInfo")}
          </h1>
          <div className="grid justify-items-center grid-cols-2 w-full ">
            <h2 className="py-1 rounded-md px-4 border-2 border-dashed border-mainPurple">
              {t("hotelName")} : <strong>هتل چت جی پی تی</strong>
            </h2>
            <h2 className="py-1 rounded-md px-4 border-2 border-dashed border-mainPurple">
              {t("fullName")} : <strong>آروین نیک بین</strong>
            </h2>
          </div>
          <div className="grid justify-items-center grid-cols-2  w-full">
            <h2 className="py-1 rounded-md px-4 border-2 border-dashed border-mainPurple">
              {t("roomName")} : <strong>اتاق مشتی</strong>
            </h2>{" "}
            <h2 className="py-1 rounded-md px-4 border-2 border-dashed border-mainPurple">
              {t("roomCapacity")} : <strong>3</strong>
            </h2>
          </div>
          <div className="w-full h-auto flex items-center">
            <div className=" border-b-2 my-3 space-y-2  h-full flex-col   w-full border-mainPurple border-dashed flex items-start  rounded-md">
              <div className="bg-blue-600 w-full grid grid-cols-4 justify-items-center  rounded-sm">
                {" "}
                <h3 className="text-white">{t("idCode")}</h3>{" "}
                <h3 className="text-white">{t("phone")}</h3>
                <h3 className="text-white">{t("gender")}</h3>{" "}
                <h3 className="text-white">{t("fullName")}</h3>
              </div>
              <div className="  w-full grid grid-cols-4 justify-items-center rounded-sm">
                {" "}
                <h3 className="text-mainPurple">0023470011</h3>{" "}
                <h3 className="text-mainPurple">09145248936</h3>
                <h3 className="text-mainPurple">مرد</h3>{" "}
                <h3 className="text-mainPurple">آروین نیک بین</h3>
              </div>
            </div>
          </div>
          <button className="py-2 font-mainFont  hover:text-white bg-mainPurple border-mainBlue border-r-8   ease-in duration-300 hover:bg-mainBlue transition rounded-lg  text-white my-5 px-6   ">
            {t("seeHotel")}
          </button>
        </div>
      </Modal>

      <Group position="center">
        <button
          onClick={() => {
            setOpened(true);
          }}
          className="py-1 font-mainFont  hover:text-white bg-mainPurple border-mainBlue border-r-8   ease-in duration-300 hover:bg-mainBlue transition rounded-lg  text-white  px-8   "
        >
          <p>{t("details")}</p>
        </button>
      </Group>
    </>
  );
}
