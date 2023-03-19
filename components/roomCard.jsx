import { Accordion } from "@mantine/core";
import Link from "next/link";
import LoginCheckModal from "./LoginCheckModal";
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
      <div className="flex border border-gray-300 bg-white lg:flex-row flex-col justify-around divide-x my-5 divide-gray-300 rounded-md w-full h-full lg:h-44">
        <div className="h-full lg:w-1/4 flex flex-col items-center justify-around py-8 ">
          <div className="flex space-x-1 p-2 justify-center items-center">
            <h2>{t("currency")}</h2>
            <h2 className="  text-xl text-mainPurple">
              {JSON.stringify(room.price)}
            </h2>
          </div>
          <h1 className="text-sm">{t("avrgNight")}</h1>
          {userSigned ? (
            <Link href="/checkout">
              <button
                onClick={() => {
                  dispatch(reservationActions.setRoom(room));
                  dispatch(reservationActions.setHotelInfo(hotelDetail));
                }}
                className="py-1  hover:text-white bg-mainPurple border-mainBlue border-r-8   ease-in duration-300 hover:bg-mainBlue transition rounded-lg  text-white my-5 px-6   "
              >
                <p>{t("roomReserve")}</p>
              </button>
            </Link>
          ) : (
            <LoginCheckModal />
          )}
        </div>
        <div className="h-full flex flex-col items-end justify-start  p-4 lg:w-3/4  ">
          <div className="h-14 w-full flex items-center justify-between">
            <Accordion
              variant="separated"
              chevronPosition="left"
              color="yellow"
              size="sm"
            >
              <Accordion.Item value="customization">
                <Accordion.Control className="text-right text-red-700 ">
                  <p className="text-sm">قوانین کنسلی</p>
                </Accordion.Control>
                <Accordion.Panel>
                  <p className="text-sm text-right">
                    از لحظه‌ی خرید تا ساعت 00:00 تاریخ 1401/11/12 میزان جریمه
                    5,000,000 ریال خواهد بود از ساعت 00:00 تاریخ 1401/11/12 غیر
                    قابل استرداد خواهد بود
                  </p>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
            <h1 className="text-xl my-2">{JSON.stringify(room.title)}</h1>
          </div>

          <div className="flex flex-col items-end justify-center space-y-3   h-full">
            <h2 className="flex items-center  text-sm">
              وعده {JSON.stringify(room.meal)}
              <Coffee className="ml-2" size={19} weight="fill" />
            </h2>
            <h2 className="flex items-center  text-sm">
              نفر 1
              <User className="ml-2" size={19} weight="fill" />
            </h2>
            <h2 className="flex items-center  text-sm">
              قیمت هر شب: {JSON.stringify(room.price)} ریال
              <Tag className="ml-2" size={19} weight="fill" />
            </h2>
          </div>
        </div>
      </div>
    );
  }
}
