import Link from "next/link";
import {
  CaretDown,
  Question,
  Scroll,
  Bed,
  HouseLine,
  User,
  SignOut,
  IdentificationCard,
  House,
} from "phosphor-react";
import i18next from "i18next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavDrawer from "./NavDrawer";
import LoginModal from "./loginModal";
import { useSelector } from "react-redux";
import { user } from "../store/user/user";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const router = useRouter();
  // const [isLogged, SetisLogged] = useState(false);
  const changeTo = router.locale === "fa" ? "tr" : "fa";

  const isLogged = useSelector((state) => state.isLogged);

  const handleSignOut = async (e) => {
    try {
      let { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };
  const [nextLocale, setNextLocale] = useState("tr");
  const { pathname, asPath, query } = router;

  useEffect(() => {
    console.log(router.locale);
  });

  // change just the locale and maintain all other route information including href's query

  return (
    <div className=" w-screen h-16 items-center justify-between z-50 bg-white flex flex-row-reverse fixed drop-shadow-xl px-4 lg:px-32">
      <div className="text-lg flex items-center space-x-4">
        <Link
          href="/"
          className="flex rounded-sm p-2 items-center cursor-pointer text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
          locale={changeTo}
        >
          {router.locale === "tr" ? <p> فارسی 🇮🇷</p> : <p>Turkish 🇹🇷</p>}
        </Link>
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn font-normal  text-lg  bg-transparent rounded-sm px-3 m-1 border-none text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
          >
            <CaretDown className="mx-2" size={20} weight="bold" />
            اقامت
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
          className=" hidden lg:flex  rounded-sm  items-center cursor-pointer p-2 text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
        >
          <h4 className=" ">خونه</h4>
          <House className="mx-1" size={28} weight="light" />
        </Link>
        {isLogged ? (
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn font-normal text-sm  bg-transparent rounded-sm px-1 m-1 border-none  text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
            >
              <CaretDown className="mx-2" size={20} weight="bold" />
              <User size={30} />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu  w-52  text-right bg-white rounded-sm  "
            >
              <li className="text-gray-900 ">
                <Link
                  href="/userProfile"
                  className="w-full text-center text-sm flex items-center justify-end"
                >
                  اطلاعات حساب کاربری
                  <User size={20} />
                </Link>
              </li>
              <li className="text-gray-900">
                <button
                  onClick={handleSignOut}
                  className="w-full font-mainFont text-center text-sm flex items-center justify-end"
                >
                  خروج از حساب کاربری <SignOut size={20} />
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <LoginModal />
        )}
      </div>

      <div className="lg:text-lg text-sm lg:flex items-center lg:space-x-4 hidden">
        <Link
          href="/admin"
          className="flex rounded-sm justify-center  items-center cursor-pointer p-2 text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
        >
          <h4 className=" ">ادمین</h4>
          <IdentificationCard className="mx-1" weight="light" size={30} />
        </Link>
        <Link
          href="/aboutUs"
          className="flex rounded-sm  justify-center  items-center cursor-pointer p-2 text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
        >
          <h4>درباره ما</h4>
          <Scroll className="mx-2" size={24} weight="light" />
        </Link>
        <Link
          href="/contactUs"
          className="flex rounded-sm justify-center  items-center cursor-pointer p-2 text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
        >
          <h4>تماس با ما</h4>
          <Question className="ml-1" size={24} weight="light" />
        </Link>
      </div>
      <div className="lg:hidden flex ">
        <NavDrawer />
      </div>
    </div>
  );
}
