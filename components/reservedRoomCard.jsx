import { Accordion } from "@mantine/core";
import Link from "next/link";
import { Coffee, User, Tag } from "phosphor-react";
import { useTranslation } from "next-i18next";
import { SignIn, SignOut, Timer } from "phosphor-react";

export default function ReservedRoomCard({ reserve }) {
  const { t, i18n } = useTranslation("");

  return (
    <div className="flex border lg:flex-row flex-col-reverse border-gray-300 bg-white justify-around divide-x my-5 divide-gray-300 rounded-md w-full h-full lg:h-44">
      <div className="h-full w-full lg:w-1/4 flex flex-col items-center justify-around py-8 ">
        <div className="flex space-x-1 p-2 justify-center items-center">
          <h2>{t("currency")}</h2>
          <h2 className="  text-xl text-mainPurple">22,550,000</h2>
        </div>
        <h2 className="text-sm">{t("price1Night")}</h2>
        <Link href="/checkout">
          <p className="py-2    bg-transparent border-mainPurple border-2 border-dashed   ease-in duration-300     rounded-lg  text-black my-5 px-5   ">
            {t("reservedRoom")}
          </p>
        </Link>
      </div>
      <div className="h-full flex flex-col items-end justify-start  p-4 w-full lg:w-3/4    ">
        <div className="h-14 w-full flex items-center justify-end  ">
          {/* <Accordion
            variant="separated"
            chevronPosition="left"
            color="yellow"
            size="sm"
          >
            <Accordion.Item value="customization">
              <Accordion.Control className="text-right text-red-700 ">
                <p className="text-sm">{t("cancelRules")}</p>
              </Accordion.Control>
              <Accordion.Panel>
                <p className="text-sm text-right">
                  از لحظه‌ی خرید تا ساعت 00:00 تاریخ 1401/11/12 میزان جریمه
                  5,000,000 ریال خواهد بود از ساعت 00:00 تاریخ 1401/11/12 غیر
                  قابل استرداد خواهد بود
                </p>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion> */}

          <h2 className="text-2xl my-2">
            {t("room")} {JSON.stringify(reserve.hotel_name)}
          </h2>
        </div>
        <div className="w-full   flex items-center justify-between">
          <div className="h-auto   flex-col flex space-y-2  items-center justify-center">
            {" "}
            <div className="flex items-center space-x-2">
              <h2 className="text-xs">{t("exitDay")}</h2>
              <SignOut size={25} color="#e0ab19" weight="fill" />
            </div>
            <h2 className="font text-xs"> {reserve.exitingDate}</h2>
            <div className="flex items-center space-x-2">
              <h2 className="text-xs">{t("enterDay")}</h2>
              <SignIn size={25} color="#e0ab19" weight="fill" />
            </div>
          </div>{" "}
          <div className="h-auto   flex-col flex  space-y-2  items-center justify-center">
            <div className="flex items-center space-x-2">
              <h2 className="text-xs">{t("enterTime")}</h2>
              <Timer size={25} color="#e0ab19" weight="fill" />
            </div>
            <h2 className="font text-xs"> {reserve.enteringDate}</h2>{" "}
            <div className="flex items-center space-x-2">
              <h2 className="text-xs">{t("exitTime")}</h2>
              <Timer size={25} color="#e0ab19" weight="fill" />
            </div>
            <h2 className="font text-xs"> </h2>
          </div>
          <div className="flex flex-col items-end justify-center space-y-3     h-full">
            <h2 className="flex items-center  text-sm">
              به همراه صبحانه
              <Coffee className="ml-2" size={19} weight="fill" />
            </h2>
            <h2 className="flex items-center  text-sm">
              {t("person")} 1
              <User className="ml-2" size={19} weight="fill" />
            </h2>
            <h2 className="flex items-center  text-sm">
              {t("price1Night")}: 18,000,000 {t("currency")}
              <Tag className="ml-2" size={19} weight="fill" />
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
