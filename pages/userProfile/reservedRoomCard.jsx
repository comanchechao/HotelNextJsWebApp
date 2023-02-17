import { Accordion } from "@mantine/core";
import Link from "next/link";
import { Coffee, User, Tag } from "phosphor-react";

export default function ReservedRoomCard() {
  return (
    <div className="flex border lg:flex-row flex-col-reverse border-gray-300 bg-white justify-around divide-x my-5 divide-gray-300 rounded-md w-full h-full lg:h-44">
      <div className="h-full w-full lg:w-1/4 flex flex-col items-center justify-around py-8 ">
        <div className="flex space-x-1 p-2 justify-center items-center">
          <h2>ریال</h2>
          <h2 className="  text-xl text-mainPurple">22,550,000</h2>
        </div>
        <h1 className="text-sm">قیمت برای 1 شب</h1>
        <Link href="/checkout">
          <p className="py-2    bg-transparent border-mainPurple border-2 border-dashed   ease-in duration-300     rounded-lg  text-black my-5 px-5   ">
            رزرو شده
          </p>
        </Link>
      </div>
      <div className="h-full flex flex-col items-end justify-start  p-4 w-full lg:w-3/4  ">
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
          <h1 className="text-2xl my-2">اتاق یک تخته</h1>
        </div>

        <div className="flex flex-col items-end justify-center space-y-3   h-full">
          <h2 className="flex items-center  text-sm">
            به همراه صبحانه
            <Coffee className="ml-2" size={19} weight="fill" />
          </h2>
          <h2 className="flex items-center  text-sm">
            نفر 1
            <User className="ml-2" size={19} weight="fill" />
          </h2>
          <h2 className="flex items-center  text-sm">
            قیمت هر شب: 18,000,000 ریال
            <Tag className="ml-2" size={19} weight="fill" />
          </h2>
        </div>
      </div>
    </div>
  );
}
