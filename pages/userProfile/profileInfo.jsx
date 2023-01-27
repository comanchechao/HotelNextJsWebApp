import { Money, User } from "phosphor-react";

export default function ProfileInfo() {
  return (
    <div className="w-full h-full p-3 flex space-y-8 flex-col">
      <div className="w-full h-auto flex-col flex items-end justify-end bg-white drop-shadow-md">
        <h2 className="flex items-center text-xl m-3 ">
          اطلاعات حساب کاربری
          <User className="mx-2 text-mainPurple" size={25} />
        </h2>
        <div className="w-full h-36 border-t border-darkPurple border-dashed p-6 justify-center flex items-center">
          <div className="flex flex-col items-end justify-end space-y-7 my-3 text-right">
            <div className="flex items-end justify-end space-x-4">
              <h2 className="text-lg text-gray-800 border-b-2 border-mainPurple pb-1">
                0914522448
              </h2>
              <h2 className="text-lg text-gray-500">شماره تلفن</h2>
              <h2 className="text-lg text-gray-800 border-b-2 border-mainPurple pb-1">
                chao.comanche@gmail.com
              </h2>
              <h2 className="text-lg text-gray-500">ایمیل</h2>
            </div>
            <div className="flex items-end justify-end space-x-4">
              <h2 className="text-lg text-gray-800 border-b-2 border-mainPurple pb-1">
                0023470011
              </h2>
              <h2 className="text-lg text-gray-500">کد ملی</h2>
              <h2 className="text-lg text-gray-800 border-b-2 border-mainPurple pb-1">
                آروین نیک بین
              </h2>
              <h2 className="text-lg text-gray-500">نام و نام خانوادگی</h2>
            </div>
          </div>
        </div>
        <button className="px-10 rounded-full transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-sm m-3 self-start font-mainFont">
          ویرایش اطلاعات
        </button>
      </div>
      <div className="w-full h-auto flex-col flex items-end justify-end bg-white drop-shadow-md">
        <h2 className="flex items-center text-xl m-3 ">
          اطلاعات حساب بانکی
          <Money className="mx-2 text-mainPurple" size={25} />
        </h2>
        <div className="w-full h-36 border-t border-darkPurple border-dashed p-6 justify-center flex items-center">
          <div className="flex flex-col items-end justify-end space-y-7 my-3 text-right">
            <div className="flex items-end justify-end space-x-4">
              <h2 className="text-lg text-gray-800 border-b-2 border-mainPurple pb-1">
                000000000000000000
              </h2>
              <h2 className="text-lg text-gray-500">شماره شبا</h2>
              <h2 className="text-lg text-gray-800 border-b-2 border-mainPurple pb-1">
                6037-6975-5828-9838
              </h2>
              <h2 className="text-lg text-gray-500">شماره حساب</h2>
            </div>
          </div>
        </div>
        <button className="px-10 rounded-full transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-sm m-3 self-start font-mainFont">
          ویرایش اطلاعات
        </button>
      </div>
    </div>
  );
}
