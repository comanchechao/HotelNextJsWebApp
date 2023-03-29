import { useState, useEffect } from "react";

import { Modal } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { useMediaQuery } from "@mantine/hooks";

export default function ReservationInfo({
  hotel,
  passengerCount,
  passengers,
  room,
}) {
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
          <div className="grid justify-items-center grid-cols-2 gap-5 w-full ">
            <h2 className="py-1 rounded-md px-4 border-2     border-mainPurple">
              {t("hotelName")} : <strong>{hotel}</strong>
            </h2>
            <h2 className="py-1 rounded-md px-4 border-2 border-mainPurple">
              {t("fullName")} : <strong>{passengers[0].name}</strong>
            </h2>
          </div>
          <div className="grid justify-items-center grid-cols-2  w-full">
            <h2 className="py-1 rounded-md px-4 border-2   border-mainBlue">
              {t("roomName")} : <strong>{room ? room.title : null}</strong>
            </h2>{" "}
            <h2 className="py-1 rounded-md px-4  border-2   border-mainBlue">
              {t("roomCapacity")} : <strong>{passengerCount}</strong>
            </h2>
          </div>
          <div className="w-full h-auto flex items-center">
            <div className="  my-3 space-y-2  h-full grid lg:grid-rows-2 lg:grid-cols-1    lg:grid-flow-col grid-cols-2  justify-items-center    w-full   border-dashed    rounded-md">
              {passengers.map((passenger, i) => {
                return (
                  <div
                    key={i}
                    className="  w-full grid grid-rows-4 bg-white lg:grid-cols-4 lg:grid-rows-1 lg:order-1  justify-items-center rounded-sm"
                  >
                    {" "}
                    <h3 className="text-mainPurple">
                      {passenger.socialNumber}
                    </h3>{" "}
                    <h3 className="text-mainPurple">{passenger.phoneNumber}</h3>
                    <h3 className="text-mainPurple">{passenger.gender}</h3>{" "}
                    <h3 className="text-mainPurple">{passenger.name}</h3>
                  </div>
                );
              })}
              <div className="bg-blue-600 w-full grid grid-rows-4 lg:grid-rows-1 lg:grid-cols-4 justify-items-center  rounded-sm">
                {" "}
                <h3 className="text-white">{t("idCode")}</h3>{" "}
                <h3 className="text-white">{t("phone")}</h3>
                <h3 className="text-white">{t("gender")}</h3>{" "}
                <h3 className="text-white">{t("fullName")}</h3>
              </div>
            </div>
          </div>
          <button className="py-2 font-mainFont  hover:text-white bg-mainPurple border-mainBlue border-r-8   ease-in duration-300 hover:bg-mainBlue transition rounded-lg  text-white my-5 px-6   ">
            {t("seeHotel")}
          </button>
        </div>
      </Modal>

      <button
        onClick={() => {
          setOpened(true);
        }}
        className="py-1 font-mainFont  hover:text-white bg-mainPurple border-mainBlue border-r-8   ease-in duration-300 hover:bg-mainBlue transition rounded-lg  text-white  px-8   "
      >
        <p>{t("details")}</p>
      </button>
    </>
  );
}
