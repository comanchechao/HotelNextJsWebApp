import Link from "next/link";
import {
  Question,
  Scroll,
  IdentificationCard,
  House,
  Buildings,
} from "phosphor-react";
import i18next from "i18next";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import LoginModal from "./loginModal";
import { gsap } from "gsap";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import Logo from "../assets/images/LOGO.webp";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const boxRef = useRef();
  const changeTo = router.locale === "fa" ? "tr" : "fa";
  const NavDrawer = dynamic(() => import("./NavDrawer"), {
    suspense: true,
  });
  useEffect(() => {
    gsap.to(boxRef.current, { opacity: "1", duration: 1.3 });
  }, []);
  // async function getSetUser() {
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();
  //   if (user) {
  //     console.log("logged");
  //     SetisLogged(true);
  //   } else {
  //     console.log("Logged out");
  //     SetisLogged(false);
  //   }
  // }
  const { t } = useTranslation("common");

  let isManager = useSelector((state) => state.user.isManager);

  const [nextLocale, setNextLocale] = useState("tr");
  const { pathname, asPath, query } = router;

  useEffect(() => {
    console.log(router.locale);
  }, []);

  // change just the locale and maintain all other route information including href's query

  return (
    <div
      ref={boxRef}
      className=" w-screen h-14 opacity-0 items-center justify-between z-50 bg-white flex flex-row-reverse fixed drop-shadow-xl px-4 lg:px-52"
    >
      <div className="text-sm flex items-center space-x-4">
        <Link
          href="/hotelList"
          className="border-r-8 border-transparent hover:border-r-mainBlue hidden lg:flex    p-2  items-center cursor-pointer text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
        >
          {t("hotel")}

          <Buildings className="mx-2" size={30} />
        </Link>

        <Link
          href="/"
          className="border-r-8 border-transparent hover:border-r-mainBlue hidden lg:flex    p-2  items-center cursor-pointer text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
        >
          <h4 className=" ">{t("home")}</h4>
          <House className="mx-2" size={28} weight="light" />
        </Link>
        <LoginModal />

        <Link
          href="/"
          className="flex rounded-sm p-2 border-r-8 border-transparent hover:border-r-mainBlue items-center cursor-pointer text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
          locale={changeTo}
        >
          {router.locale === "tr" ? <p> فارسی 🇮🇷</p> : <p>Turkish 🇹🇷</p>}
        </Link>
        <Link href="/">
          <Image
            src={Logo}
            alt="Logo"
            className="object-contain h-12 w-11    rounded-sm   cursor-pointer transition ease-in duration-200 hover:bg-mainPurple p-2"
          />
        </Link>
      </div>

      <div className="lg:text-sm text-sm lg:flex items-center lg:space-x-4 hidden">
        {isManager ? (
          <Link
            href="/admin"
            className="flex rounded-sm justify-center  items-center cursor-pointer p-2 border-r-8 border-transparent hover:border-r-mainBlue text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
          >
            <h4 className=" ">{t("admin")}</h4>
            <IdentificationCard className="mx-1" weight="light" size={30} />
          </Link>
        ) : null}
        <Link
          href="/aboutUs"
          className="flex  rounded-sm  justify-center  items-center cursor-pointer md:text-xs p-2 border-r-8 border-transparent hover:border-r-mainBlue text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
        >
          <h4>{t("aboutUs")}</h4>
          <Scroll className="mx-2" size={24} weight="light" />
        </Link>
        <Link
          href="/contactUs"
          className="flex rounded-sm justify-center  items-center cursor-pointer p-2 border-r-8 border-transparent hover:border-r-mainBlue text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
        >
          <h4>{t("contactUs")}</h4>
          <Question className="ml-1" size={24} weight="light" />
        </Link>
      </div>
      <div className="lg:hidden flex ">
        <Suspense fallback={<div> </div>}>
          <NavDrawer />
        </Suspense>
      </div>
    </div>
  );
}
