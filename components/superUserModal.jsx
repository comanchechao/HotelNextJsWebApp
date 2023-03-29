import { useState, useEffect } from "react";

import { Modal } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { useMediaQuery } from "@mantine/hooks";

import { Coffee, User, Tag } from "phosphor-react";
export default function SuperUserModal() {
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
        {" "}
        <div className="h-full w-full flex items-center  p-4 flex-col space-y-6">
          <h1 className="text-2xl border-b-4 rounded-md border-mainBlue my-6 pb-2">
            {t("colleagueInfo")}
          </h1>
          <div className="flex flex-wrap items-center lg:flex-row flex-col space-y-5 lg:space-y-0 space-x-0 lg:space-x-5 w-full ">
            <h2 className="py-1 rounded-md px-4 border-2     border-mainPurple">
              {t("fullName")} : <strong>آروین نیک بین</strong>
            </h2>
            <h2 className="py-1  lg:mb-2 rounded-md px-4 border-2 border-mainPurple">
              {t("email")} : <strong>Arvin.nikbin22@gmail.com</strong>
            </h2>
          </div>
          <h2 className="py-1   rounded-md px-4 border-2   border-mainBlue">
            {t("hotelCount")} : <strong>5 {t("singleHotel")}</strong>
          </h2>{" "}
          <button className="py-2 font-mainFont  hover:text-white bg-green-500 border-green-800 border-r-8   ease-in duration-300 hover:bg-green-900 transition rounded-lg  text-white   px-6   ">
            {t("addAdmin")}
          </button>{" "}
          <div className="w-full h-auto flex items-center flex-col">
            <h1 className="text-xl border-b-4 rounded-md border-mainBlue my-6 pb-2">
              {t("hotels")}
            </h1>
            <div className="flex border lg:flex-row flex-col-reverse border-gray-300 bg-white justify-around divide-x my-5 divide-gray-300 rounded-md w-full h-full lg:h-44">
              <div className="h-full w-full lg:w-1/4 flex flex-col items-center justify-around py-8 ">
                <div className="flex space-x-1 p-2 justify-center items-center">
                  <h2 className="text-xs">{t("currency")}</h2>
                  <h2 className="  text-lg text-mainPurple">22,550,000</h2>
                </div>
                <h1 className="text-sm">{t("price1Night")}</h1>
                <button className="py-2 font-mainFont  hover:text-white bg-mainPurple border-mainBlue border-r-8   ease-in duration-300 hover:bg-mainBlue transition rounded-lg  text-white my-5 px-6   ">
                  {t("seeHotel")}
                </button>
              </div>
              <div className="h-full flex flex-col items-end justify-start  p-4 w-full lg:w-3/4  ">
                <div className="h-14 w-full flex items-start  justify-end ">
                  <h1 className="text-2xl my-2">{t("room")}</h1>
                </div>

                <div className="flex flex-col items-end justify-center space-y-3   h-full">
                  <h2 className="flex items-center  text-sm">
                    {t("roomMeal")}
                    <Coffee className="ml-2" size={19} weight="fill" />
                  </h2>
                  <h2 className="flex items-center  text-sm">
                    {t("person")} 1
                    <User className="ml-2" size={19} weight="fill" />
                  </h2>
                  <h2 className="flex items-center  text-sm">
                    {t("price1Night")} : 18,000,000 {t("currency")}
                    <Tag className="ml-2" size={19} weight="fill" />
                  </h2>
                </div>
              </div>
            </div>
          </div>
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
