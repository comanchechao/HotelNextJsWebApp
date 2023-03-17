import Link from "next/link";
import {
  InstagramLogo,
  FacebookLogo,
  WhatsappLogo,
  TelegramLogo,
  Phone,
} from "phosphor-react";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useTranslation } from "next-i18next";

export default function Footer() {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const { t, i18n } = useTranslation();
  const lng = i18n.language;
  useEffect(() => {
    changeAlignment();
  }, [lng]);

  const [alignLeft, setAlignLeft] = useState(false);
  async function changeAlignment() {
    console.log(lng);
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
  useEffect(() => {
    getWebsiteInfo();
  }, []);

  async function getWebsiteInfo() {
    setLoading(true);
    const { data } = await supabase.from("websiteInfo").select();
    data.map((object) => {
      setAddress(object.address);
      setPhoneNumber(object.phoneNumber);
    });
    setLoading(false);
  }
  return (
    <div className="w-screen h-auto lg:h-rem26 bg-white drop-shadow-lg lg:px-28 flex flex-col items-center mt-5 -z-50">
      <div
        className={`${
          alignLeft === true
            ? "flex lg:flex-row flex-col items-center w-full h-full my-4"
            : "flex lg:flex-row-reverse flex-col items-center w-full h-full my-4"
        }`}
      >
        <div className="lg:w-1/2   lg:h-3/5 w-full h-auto text-base font-bold lg:px-20 flex items-center lg:items-start justify-center space-y-3 flex-col">
          <p className=" ">
            {t("phone")} : {phoneNumber}
          </p>
          <p className=" ">
            {t("address")} : {address}
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-20 h-20 bg-mainYellow drop-shadow-lg"></div>
            <div className="w-20 h-20 bg-mainYellow drop-shadow-lg"></div>
            <div className="w-20 h-20 bg-mainYellow drop-shadow-lg"></div>
            <div className="w-20 h-20 bg-mainYellow drop-shadow-lg"></div>
          </div>
        </div>
        <div
          className={`${
            alignLeft === true
              ? "lg:w-1/2 lg:h-3/5 w-full h-auto   flex items-end py-6 justify-center lg:justify-end"
              : "lg:w-1/2 lg:h-3/5 w-full h-auto   flex items-end py-6 justify-center lg:justify-start"
          }`}
        >
          <div
            className={`${
              alignLeft === true
                ? "flex items-end flex-col space-y-1"
                : "flex items-start flex-col space-y-1"
            }`}
          >
            <h3 className="font-bold text-4xl my-1">{t("singleHotel")}</h3>
            <Link
              className="transition text-lg ease-in duration-200 hover:text-mainBlue"
              href="/aboutUs"
            >
              {t("aboutUs")}
            </Link>
            <Link
              className="transition text-lg ease-in duration-200 hover:text-mainBlue"
              href="/contactUs"
            >
              {t("contactUs")}
            </Link>
            {/* <Link
              className="transition ease-in duration-200 hover:text-mainBlue"
              href="/"
            >
              چرا هتل
            </Link> */}{" "}
            <Link
              className="transition text-lg ease-in duration-200 hover:text-mainBlue"
              href="/"
            >
              {t("rules")}
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex lg:flex-row flex-col items-center justify-evenly lg:justify-between h-24 lg:px-20 border-t border-dashed border-mainPurple">
        <div className="flex items-center justify-start space-x-5">
          <a
            className="transition ease-in duration-300 p-1 rounded-sm  hover:bg-mainBlue cursor-pointer"
            href={phoneNumber}
          >
            <InstagramLogo size={40} weight="fill" />
          </a>
          <FacebookLogo
            className="transition ease-in duration-300 p-1 rounded-sm  hover:bg-mainBlue cursor-pointer"
            size={40}
            weight="fill"
          />
          <WhatsappLogo
            className="transition ease-in duration-300 p-1 rounded-sm  hover:bg-mainBlue cursor-pointer"
            size={40}
            weight="fill"
          />
          <TelegramLogo
            className="transition ease-in duration-300 p-1 rounded-sm  hover:bg-mainBlue cursor-pointer"
            size={40}
            weight="fill"
          />
          <Phone
            className="transition ease-in duration-300 p-1 rounded-sm  hover:bg-mainBlue cursor-pointer"
            size={40}
            weight="fill"
          />
        </div>
        <h4 className="text-gray-600 text-xs">{t("copyright")}</h4>
      </div>
    </div>
  );
}
