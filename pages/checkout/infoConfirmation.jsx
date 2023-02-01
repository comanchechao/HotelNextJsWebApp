import { Star, SignIn, SignOut, Bed } from "phosphor-react";

export default function InfoConfirmation() {
  return (
    <div className=" mb-10 h-auto w-full lg:w-textArea flex mt-5 flex-col items-center space-y-7">
      <div className="h-24 w-full bg-white divide-x-2 flex">
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
              5 ستاره
              <Star className="mx-2" size={19} color="#4405a8" weight="fill" />
            </h2>
            <h1 className="text-xl font-bold">هتل پارسیان استقلال</h1>
          </div>
          <h2>آدرس: پارک وی - ابتدای اتوبان چمران</h2>
        </div>
      </div>
      <div className="h-auto w-full bg-white flex flex-col justify-start items-center px-9">
        <div className="h-20 w-full flex items-end justify-start  flex-col   py-3">
          <h1 className="text-2xl font-bold items-center flex">
            مشخصات اتاق و مسافران
            <Bed className="ml-3" size={45} color="#3c15d5" weight="fill" />
          </h1>
        </div>
        <div className=" w-5/6 h-28 self-end flex flex-wrap-reverse items-center justify-end  py-4 space-x-5 ">
          <h5>به همراه صبحانه</h5>
          <h4 className="text-lg">
            <strong>نام اتاق : </strong>يک تخته
          </h4>
          <h4 className="text-lg">
            <strong>تعداد مسافران : </strong>1 نفر
          </h4>
          <h4 className="text-lg">
            <strong>اطلاعات تلفن تماس: </strong>
            09256354488
          </h4>
          <h4 className="text-lg">
            <strong>اطلاعات سرپرست: </strong>
            آروین نیک بین
          </h4>
        </div>
        <div className="h-16 w-full bg-Cyan-100 flex items-center justify-around">
          <h4 className="font-bold text-lg">جنسیت</h4>
          <h4 className="font-bold text-lg">کد ملی</h4>
          <h4 className="font-bold text-lg">نام مسافر</h4>
          <h4 className="font-bold text-lg">نوع مسافر</h4>
        </div>
        <div className="h-16 mb-9 w-full  flex items-center justify-around">
          <h4 className="text-lg">زن</h4>
          <h4 className="text-lg">002357744</h4>
          <h4 className="text-lg">آروین نیک بین</h4>
          <h4 className="text-lg">بزرگسال</h4>
        </div>
      </div>
      <div className="h-28 w-full bg-white flex flex-col justify-center items-end px-9">
        <h1 className="text-2xl font-bold items-center flex py-2">
          قوانین کنسلی
        </h1>
        <h2 className="text-lg"> غیرقابل استرداد </h2>
      </div>
      <div className="h-auto w-full bg-white flex flex-col justify-center items-end px-9 py-4">
        <h1 className="text-2xl font-bold items-center flex py-2">
          هزینه‌های جانبی
        </h1>
        <h2 className="text-lg">هزینه اقامت کودک زیر دوسال رایگان می‌باشد </h2>
        <h2 className="text-lg">
          هزینه اقامت کودک دو تا شش سال طبق قوانین هتل در خود هتل مبلغ پرداخت
          می‌گردد
        </h2>
        <h2 className="text-lg">
          هزینه اقامت کودک بالای شش سال یک نفر کامل محاسبه می‌گردد
        </h2>
      </div>
    </div>
  );
}
