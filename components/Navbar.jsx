import { CaretDown, Question, Scroll } from "phosphor-react";

export default function Navbar() {
  return (
    <div className=" w-screen h-16 items-center justify-between z-50 bg-white flex flex-row-reverse fixed drop-shadow-xl px-32">
      <div className="text-lg flex items-center  ">
        <div className="h-full w-60 bg-mainPurple"></div>
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn font-normal text-lg bg-transparent rounded-sm px-6 m-1 border-none text-gray-900 transition ease-in hover:bg-gray-900 hover:text-white duration-300"
          >
            <CaretDown className="mx-2" size={20} weight="bold" />
            اقامت
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu  text-right bg-white rounded-sm     w-auto"
          >
            <li className="text-gray-900 ">
              <a className="w-full text-center flex items-center justify-end">
                هتل
              </a>
            </li>
            <li className="text-gray-900">
              <a className="w-full text-center flex items-center justify-end">
                ویلا و اقامتگاه
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-lg flex items-center space-x-10 ">
        <h4 className="flex items-center cursor-pointer transition ease-in duration-300 hover:text-mainBlue">
          سفرهای من <Scroll className="mx-2" size={24} weight="thin" />
        </h4>
        <h4 className="flex items-center cursor-pointer transition ease-in duration-300 hover:text-mainBlue">
          مرکز پشتیبانی آنلاین
          <Question className="mx-2" size={24} weight="thin" />
        </h4>
      </div>
    </div>
  );
}
