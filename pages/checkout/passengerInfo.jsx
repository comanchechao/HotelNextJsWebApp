import { Star, SignIn, SignOut } from "phosphor-react";

export default function PassengerInfo() {
  return (
    <div className=" h-24 w-textArea flex mt-5 divide-x-2 bg-white">
      <div className="h-full w-1/2 flex items-center justify-center ">
        <div className="h-full w-1/2 flex flex-col items-center justify-center">
          <div className="flex items-center space-x-2">
            <h2>تاریخ خروج</h2>
            <SignOut size={40} color="#3c15d5" weight="fill" />
          </div>
          <h1 className="font text-lg">1401/11/06 - ساعت 12:00:00</h1>
        </div>
        <div className="h-full w-1/2 flex flex-col justify-center items-center">
          <div className="flex items-center space-x-2">
            <h2>تاریخ ورود</h2>
            <SignIn size={40} color="#3c15d5" weight="fill" />
          </div>
          <h1 className="font text-lg">1401/11/05 - ساعت 14:00:00</h1>
        </div>
      </div>
      <div className="h-full w-1/2 p-3 flex flex-col items-end justify-start space-y-3">
        <div className="flex items-center space-x-4">
          <h2 className="flex items-center">
            5 ستاره{" "}
            <Star className="mx-2" size={19} color="#4405a8" weight="fill" />
          </h2>
          <h1 className="text-xl font-bold">هتل پارسیان استقلال</h1>
        </div>
        <h2>آدرس: پارک وی- ابتدای اتوبان چمران</h2>
      </div>
    </div>
  );
}
