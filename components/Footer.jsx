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
import Image from "next/image";
import Logo from "../assets/images/LOGO.webp";

export default function Footer({ websiteInfo }) {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [telegram, setTelegram] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const { t, i18n } = useTranslation();
  const lng = i18n.language;
  useEffect(() => {
    changeAlignment();
  }, [lng]);

  const [alignLeft, setAlignLeft] = useState(false);
  async function changeAlignment() {
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
  async function getWebsiteInfo() {
    setLoading(true);
    console.log(websiteInfo);
    websiteInfo.map((object) => {
      setAddress(object.address);
      setPhoneNumber(object.phoneNumber);
      setTelegram(object.telegram);
      setInstagram(object.instagram);
      setFacebook(object.facebook);
      setWhatsapp(object.whatsapp);
    });
    setLoading(false);
  }
  useEffect(() => {
    getWebsiteInfo();
    console.log(facebook);
    console.log(address);
    console.log(phoneNumber);
  }, []);

  return (
    <div className="w-screen h-auto  bg-white drop-shadow-lg lg:px-28 flex flex-col items-center mt-20 -z-50">
      <div
        className={`${
          alignLeft === true
            ? "flex justify-around lg:flex-row flex-col items-center w-full h-full my-4"
            : "flex justify-around lg:flex-row-reverse flex-col items-center w-full h-full my-4"
        }`}
      >
        <Image
          src={Logo}
          alt="Logo"
          className="object-contain h-48 w-48 rounded-sm   cursor-pointer transition ease-in duration-200 hover:bg-mainBlue   p-2"
        ></Image>

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
              href="/rules"
            >
              {t("rules")}
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex lg:flex-row flex-col items-center justify-evenly lg:justify-between h-24 lg:px-20 border-t border-dashed border-mainPurple">
        <div className="flex items-center justify-start space-x-5">
          <a
            href={"https://www.instagram.com/" + instagram}
            className="transition ease-in duration-300 p-1 rounded-sm  hover:bg-mainBlue cursor-pointer"
          >
            <InstagramLogo size={30} weight="fill" />
          </a>
          <a
            href={"https://www.facebook.com/" + facebook}
            className="transition ease-in duration-300 p-1 rounded-sm  hover:bg-mainBlue cursor-pointer"
          >
            <FacebookLogo size={30} weight="fill" />
          </a>
          <a
            href={"https://wa.me/" + whatsapp}
            className="transition ease-in duration-300 p-1 rounded-sm  hover:bg-mainBlue cursor-pointer"
          >
            <WhatsappLogo size={30} weight="fill" />
          </a>
          <a
            href={"https://www.telegram.org/" + telegram}
            className="transition ease-in duration-300 p-1 rounded-sm  hover:bg-mainBlue cursor-pointer"
          >
            <TelegramLogo size={30} weight="fill" />
          </a>
          <a
            className="transition ease-in duration-300 p-1 rounded-sm  hover:bg-mainBlue cursor-pointer"
            href={"tel:" + phoneNumber}
          >
            <Phone size={30} weight="fill" />
          </a>
        </div>
        <h4 className="text-gray-600 text-xs">{t("copyright")}</h4>
      </div>
    </div>
  );
}
