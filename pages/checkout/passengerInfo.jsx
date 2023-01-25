import { Select, TextInput } from "@mantine/core";
import { Star, SignIn, SignOut, Bed } from "phosphor-react";

export default function PassengerInfo() {
  return (
    <div className=" mb-10 h-rem33 w-textArea flex mt-5 flex-col items-center space-y-7">
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
              5 ستاره{" "}
              <Star className="mx-2" size={19} color="#4405a8" weight="fill" />
            </h2>
            <h1 className="text-xl font-bold">هتل پارسیان استقلال</h1>
          </div>
          <h2>آدرس: پارک وی- ابتدای اتوبان چمران</h2>
        </div>
      </div>
      <div className="h-72 w-full bg-white flex flex-col items-center">
        <div className="h-20 w-full flex items-end justify-start  flex-col  px-9 py-3">
          <h1 className="text-2xl font-bold items-center flex">
            اتاق اول
            <Bed className="ml-3" size={45} color="#3c15d5" weight="fill" />
          </h1>
          <div className="flex items-center space-x-6">
            <h3 className="font-bold">1 بزرگسال</h3>
            <h3>به همراه صبحانه</h3>
            <h2 className="text-md font-bold">اتاق یک تخته ی شرقی</h2>
          </div>
        </div>
        <div className="h-full w-full  flex items-end my-8 flex-col px-6">
          <h2 className="px-7 mb-4 py-1 rounded-full border-dashed border-2 border-mainPurple">
            بزرگسال - سرپرست
          </h2>
          <div className="w-full h-full flex  justify-center items-center space-x-4 px-6">
            <TextInput
              className="text-4xl text-right flex flex-col items-end"
              placeholder="کد ملی"
              label="کد ملی"
              variant="default"
              radius="xl"
              size="md"
              withAsterisk
            />
            <TextInput
              className="text-4xl text-right flex flex-col items-end"
              placeholder="شماره تلفن"
              label="شماره تلفن"
              variant="default"
              radius="xl"
              size="md"
              withAsterisk
            />
            <TextInput
              className="text-4xl text-right flex flex-col items-end"
              placeholder="نام خانوادگی"
              label="نام خانوادگی"
              variant="default"
              radius="xl"
              size="md"
              withAsterisk
            />
            <TextInput
              className="text-4xl text-right flex flex-col items-end"
              placeholder="نام"
              label="نام"
              variant="default"
              radius="xl"
              size="md"
              withAsterisk
            />
            <Select
              className="text-2xl mx-6 text-right flex flex-col items-end"
              data={["مرد", "زن"]}
              placeholder="جنسیت مسافر "
              label="جنسیت"
              variant="default"
              radius="xl"
              withAsterisk
              clearable
              searchable
              size="md"
            />
          </div>
        </div>
      </div>
      <div className="w-full h-24 flex items-center justify-between bg-white px-7">
        <TextInput
          className="text-4xl text-right flex flex-col items-end"
          placeholder="ساعت ورود"
          label="ساعت ورود"
          variant="default"
          radius="xl"
          size="sm"
          withAsterisk
        />
        <h1 className="text-sm  w-carousel">
          در صورتی که زمان ورود شما به هتل پس از ساعت ۸ شب به وقت مقصد میباشد،
          لطفا ساعات ورود خود را به هتل انتخاب کنید، در غیر اینصورت بوتک
          هیچ‌گونه مسولیتی در خصوص لغو یا کنسلی هتل نمی‌پذیرد
        </h1>
      </div>
    </div>
  );
}
