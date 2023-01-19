import Link from "next/link";
import {
  InstagramLogo,
  FacebookLogo,
  WhatsappLogo,
  TelegramLogo,
  Phone,
} from "phosphor-react";
export default function Footer() {
  return (
    <div className="w-screen h-auto lg:h-rem26 bg-white drop-shadow-lg lg:px-44 flex flex-col items-center mt-5">
      <div className="flex lg:flex-row flex-col items-center w-full h-full my-4">
        <div className="lg:w-1/2 lg:h-3/5 w-full h-auto text-sm lg:px-20 flex items-center lg:items-start justify-center space-y-3 flex-col">
          <div className="w-52 h-24 bg-mainPurple"></div>
          <p className="text-gray-600">تلفن پشتیبانی : 32344455</p>
          <p className="text-gray-600">
            دفتر پشتیبانی : لورم ایپسوم، متن ساختگی، استفاده در صنعت چاپ 2
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-20 h-20 bg-mainYellow drop-shadow-lg"></div>
            <div className="w-20 h-20 bg-mainYellow drop-shadow-lg"></div>
            <div className="w-20 h-20 bg-mainYellow drop-shadow-lg"></div>
            <div className="w-20 h-20 bg-mainYellow drop-shadow-lg"></div>
            <div className="w-20 h-20 bg-mainYellow drop-shadow-lg"></div>
          </div>
        </div>
        <div className="lg:w-1/2 lg:h-3/5 w-full h-auto flex items-start py-6 justify-around">
          <div className="flex items-end flex-col space-y-1">
            <h3 className="font-bold text-lg my-1">هتل</h3>
            <Link
              className="transition ease-in duration-200 hover:text-mainBlue"
              href="/"
            >
              درباره ما
            </Link>{" "}
            <Link
              className="transition ease-in duration-200 hover:text-mainBlue"
              href="/"
            >
              تماس با ما
            </Link>
            <Link
              className="transition ease-in duration-200 hover:text-mainBlue"
              href="/"
            >
              چرا هتل
            </Link>
          </div>
          <div className="flex  items-end flex-col space-y-1">
            <h3 className="font-bold text-lg my-1">تماس با مشتریان</h3>
            <Link
              className="transition ease-in duration-200 hover:text-mainBlue"
              href="/"
            >
              مرکز پشتیبانی آنلاین
            </Link>
            <Link
              className="transition ease-in duration-200 hover:text-mainBlue"
              href="/"
            >
              راهنمای خرید
            </Link>
            <Link
              className="transition ease-in duration-200 hover:text-mainBlue"
              href="/"
            >
              راهنمای استرداد
            </Link>
            <Link
              className="transition ease-in duration-200 hover:text-mainBlue"
              href="/"
            >
              قوانین و مقررات
            </Link>
            <Link
              className="transition ease-in duration-200 hover:text-mainBlue"
              href="/"
            >
              پرسش و پاسخ
            </Link>
          </div>
          <div className="flex items-end flex-col space-y-1">
            <h3 className="font-bold text-lg my-1">اطلاعات تکمیلی</h3>
            <Link
              className="transition ease-in duration-200 hover:text-mainBlue"
              href="/"
            >
              باشگاه همسفران
            </Link>
            <Link
              className="transition ease-in duration-200 hover:text-mainBlue"
              href="/"
            >
              فروش سازمانی
            </Link>
            <Link
              className="transition ease-in duration-200 hover:text-mainBlue"
              href="/"
            >
              همکاری با آزانس ها
            </Link>
            <Link
              className="transition ease-in duration-200 hover:text-mainBlue"
              href="/"
            >
              فرصت های شغلی
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex lg:flex-row flex-col items-center justify-evenly lg:justify-between h-24 lg:px-20 border-t border-dashed border-mainPurple">
        <div className="flex items-center justify-start space-x-5">
          <InstagramLogo
            className="transition ease-in duration-300 p-1 rounded-sm  hover:bg-mainBlue cursor-pointer"
            size={40}
            weight="fill"
          />
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
        <h4 className="text-gray-600 text-lg">کلیه حقوق این سرویس محفوظ است</h4>
      </div>
    </div>
  );
}
