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
} from "phosphor-react";
import NavDrawer from "./NavDrawer";
export default function Navbar() {
  return (
    <div className=" w-screen h-16 items-center justify-end lg:justify-between z-50 bg-white flex flex-row-reverse fixed drop-shadow-xl px-4 lg:px-32">
      <div className="lg:text-lg text-sm  flex items-center w-auto  ">
        <div className="h-full lg:w-60 bg-mainPurple"></div>
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
      </div>
      <div className="lg:text-lg text-sm lg:flex items-center lg:space-x-10 hidden">
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
              <Link
                href="#"
                className="w-full text-center text-sm flex items-center justify-end"
              >
                خروج از حساب کاربری <SignOut size={20} />
              </Link>
            </li>
          </ul>
        </div>
        <Link
          href="/admin"
          className="flex rounded-sm  items-center cursor-pointer p-2 text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
        >
          <IdentificationCard className="mx-1" size={30} />
          <h4 className=" ">ادمین</h4>
        </Link>
        <h4 className="flex rounded-sm p-2 items-center cursor-pointer text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200">
          سفرهای من <Scroll className="mx-2" size={24} weight="thin" />
        </h4>
        <h4 className="flex rounded-sm p-2 items-center cursor-pointer text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200">
          مرکز پشتیبانی آنلاین
          <Question className="mx-2" size={24} weight="thin" />
        </h4>
      </div>
      <div className="lg:hidden flex ">
        <NavDrawer />
      </div>
    </div>
  );
}
