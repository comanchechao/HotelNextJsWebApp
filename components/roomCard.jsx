import { Accordion } from "@mantine/core";
import Link from "next/link";
import CheckLoginModal from "./checkLoginModal";
import { Coffee, User, Tag } from "phosphor-react";
import { useDispatch } from "react-redux";
import { reservationActions } from "../store/reservation";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function RoomCard({ room, hotelDetail }) {
  // setting reservation info
  const [alignLeft, setAlignLeft] = useState(false);
  const [userSigned, setUserSigned] = useState(false);
  async function checkUser() {
    const { data: user, error } = await supabase.auth.getSession();

    if (user.session) {
      setUserSigned(true);
    } else {
      setUserSigned(false);

      console.log("User not found");
    }
  }

  const { t, i18n } = useTranslation("");
  const lng = i18n.language;
  async function changeAlignment() {
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
  useEffect(() => {
    checkUser();
    changeAlignment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dispatch = useDispatch();
  {
    return (
      <div
        className={`${
          alignLeft === true
            ? " flex border border-gray-300 bg-white lg:flex-row flex-col-reverse justify-around divide-x my-5 divide-gray-300 rounded-md w-full h-full lg:h-44"
            : "flex border border-gray-300 bg-white lg:flex-row-reverse flex-col-reverse justify-around divide-x my-5 divide-gray-300 rounded-md w-full h-full lg:h-44"
        }`}
      >
        <div className="h-full lg:w-1/4 flex flex-col items-center justify-around py-8 lg:border-t-0  border-t-2 border-mainBlue">
          <div className="flex space-x-1 p-2 justify-center items-center">
            <h2>{t("currency")}</h2>
            {alignLeft ? (
              <h2 className="  text-xl text-mainPurple">
                {JSON.stringify(room.price)}
              </h2>
            ) : (
              <h2 className="  text-xl text-mainPurple">
                {JSON.stringify(room.priceL)}
              </h2>
            )}
          </div>
          <h2 className="text-sm">{t("avrgNight")}</h2>

          <CheckLoginModal room={room} hotelDetail={hotelDetail} />
        </div>
        <div
          className={`${
            alignLeft === true
              ? "h-full flex flex-col items-end justify-start  p-4 lg:w-3/4   "
              : "h-full flex flex-col items-start justify-start  p-4 lg:w-3/4  "
          }`}
        >
          <div
            className={`${
              alignLeft === true
                ? "h-14 w-full flex items-center justify-end"
                : "h-14 w-full flex items-center justify-end flex-row-reverse"
            }`}
          >
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
            <h2 className="text-xl my-2">{JSON.stringify(room.title)}</h2>
          </div>

          <div
            className={`${
              alignLeft === true
                ? "flex flex-col items-end justify-center space-y-3   h-full"
                : " flex flex-col items-start justify-center space-y-3   h-full"
            }`}
          >
            <h2
              className={`${
                alignLeft === true
                  ? "flex items-center  text-sm"
                  : "flex flex-row-reverse items-center  text-sm"
              }`}
            >
              {t("roomMeal")} {JSON.stringify(room.meal)}
              <Coffee className="mx-2" size={19} weight="fill" />
            </h2>
            <h2
              className={`${
                alignLeft === true
                  ? "flex items-center  text-sm"
                  : "flex flex-row-reverse items-center  text-sm"
              }`}
            >
              {t("person")} 1
              <User className="mx-2" size={19} weight="fill" />
            </h2>
            <h2
              className={`${
                alignLeft === true
                  ? "flex items-center  text-sm"
                  : " flex flex-row-reverse items-center  text-sm"
              }`}
            >
              {t("price1Night")} :{" "}
              {alignLeft ? (
                <h2 className="  text-xl text-mainPurple">
                  {JSON.stringify(room.price)}
                </h2>
              ) : (
                <h2 className="  text-xl text-mainPurple">
                  {JSON.stringify(room.priceL)}
                </h2>
              )}{" "}
              {t("currency")}
              <Tag className="mx-2" size={19} weight="fill" />
            </h2>
          </div>
        </div>
      </div>
    );
  }
}
