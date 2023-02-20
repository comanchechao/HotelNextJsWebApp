import Link from "next/link";
import {
  CaretDown,
  Question,
  Scroll,
  Bed,
  HouseLine,
  IdentificationCard,
  House,
} from "phosphor-react";
import i18next from "i18next";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import LoginModal from "./loginModal";
import { gsap } from "gsap";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
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

  const [nextLocale, setNextLocale] = useState("tr");
  const { pathname, asPath, query } = router;

  useEffect(() => {
    console.log(router.locale);
  });

  // change just the locale and maintain all other route information including href's query

  return (
    <div
      ref={boxRef}
      className=" w-screen h-16 opacity-0 items-center justify-between z-50 bg-white flex flex-row-reverse fixed drop-shadow-xl px-4 lg:px-32"
    >
      <div className="text-lg flex items-center space-x-4">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="border-r-8 border-transparent hover:border-r-mainBlue hidden lg:flex    p-3  items-center cursor-pointer text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
          >
            <CaretDown className="mx-2" size={20} weight="bold" />
            {t("inhabitancy")}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu  text-right bg-white rounded-sm     w-auto"
          >
            <li className="text-gray-900 ">
              <Link
                href="/hotelList"
                className="w-full text-center flex items-center justify-end"
              >
                هتل
                <Bed size={30} />
              </Link>
            </li>
            <li className="text-gray-900">
              <Link
                href="#"
                className="w-full text-center flex items-center justify-end"
              >
                ویلا و اقامتگاه
                <HouseLine size={40} />
              </Link>
            </li>
          </ul>
        </div>
        <Link
          href="/"
          className="border-r-8 border-transparent hover:border-r-mainBlue hidden lg:flex    p-3  items-center cursor-pointer text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
        >
          <h4 className=" ">{t("home")}</h4>
          <House className="mx-1" size={28} weight="light" />
        </Link>

        <LoginModal />
        <Link
          href="/"
          className="flex rounded-sm p-3 border-r-8 border-transparent hover:border-r-mainBlue items-center cursor-pointer text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
          locale={changeTo}
        >
          {router.locale === "tr" ? <p> فارسی 🇮🇷</p> : <p>Turkish 🇹🇷</p>}
        </Link>
      </div>

      <div className="lg:text-lg text-sm lg:flex items-center lg:space-x-4 hidden">
        <Link
          href="/admin"
          className="flex rounded-sm justify-center  items-center cursor-pointer p-3 border-r-8 border-transparent hover:border-r-mainBlue text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
        >
          <h4 className=" ">{t("admin")}</h4>
          <IdentificationCard className="mx-1" weight="light" size={30} />
        </Link>
        <Link
          href="/aboutUs"
          className="flex rounded-sm  justify-center  items-center cursor-pointer p-3 border-r-8 border-transparent hover:border-r-mainBlue text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
        >
          <h4>{t("aboutUs")}</h4>
          <Scroll className="mx-2" size={24} weight="light" />
        </Link>
        <Link
          href="/contactUs"
          className="flex rounded-sm justify-center  items-center cursor-pointer p-3 border-r-8 border-transparent hover:border-r-mainBlue text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
        >
          <h4>{t("contactUs")}</h4>
          <Question className="ml-1" size={24} weight="light" />
        </Link>
      </div>
      <div className="lg:hidden flex ">
        <Suspense fallback={<div>Loading...</div>}>
          <NavDrawer />
        </Suspense>
      </div>
    </div>
  );
}
