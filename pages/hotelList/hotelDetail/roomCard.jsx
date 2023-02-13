import { Accordion } from "@mantine/core";
import Link from "next/link";
import { Coffee, User, Tag } from "phosphor-react";

export default function RoomCard() {
  {
    return (
      <div className="flex border border-gray-300 bg-white justify-around divide-x my-5 divide-gray-300 rounded-md w-full h-full lg:h-60">
        <div className="h-full w-1/4 flex flex-col items-center justify-around py-8 ">
          <div className="flex space-x-1 p-2 justify-center items-center">
            <h2>ریال</h2>
            <h2 className="  text-3xl text-mainPurple">22,550,000</h2>
          </div>
          <h1 className="text-lg">قیمت برای 1 شب</h1>
          <Link href="/checkout">
            <button className="py-3  hover:text-white bg-mainPurple border-mainBlue border-r-8   ease-in duration-300 hover:bg-mainBlue transition rounded-lg  text-white my-5 px-12   ">
              <p>رزرو اتاق</p>
            </button>
          </Link>
        </div>
        <div className="h-full flex flex-col items-end justify-start  p-4 w-3/4  ">
          <div className="h-14 w-full flex items-center justify-between">
            <Accordion
              variant="separated"
              chevronPosition="left"
              color="violet"
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
}
