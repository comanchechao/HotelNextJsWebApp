import hotelOne from "../../assets/images/hotelone.jpg";
import hotelTwo from "../../assets/images/hoteltwo.jpg";
import hotelThree from "../../assets/images/hotelthree.jpg";
import hotelFour from "../../assets/images/hotelfour.jpg";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import RoomModal from "../../components/roomModal";
import {
  IconStar,
  IconBarbell,
  IconCoffee,
  IconChefHat,
  IconHotelService,
  IconDoor,
  IconDoorOff,
  IconBath,
  IconWifi,
  IconWashMachine,
} from "@tabler/icons";
import { Tabs } from "@mantine/core";

export default function hotelDetail() {
  let images = [hotelOne, hotelTwo, hotelThree, hotelFour];
  let rooms = [
    {
      title: "دو تخته برای یک نفر",
      meal: "صبحانه",
      max: "1",
      price: 400000,
    },
    {
      title: "دو تخته برای دو نفر",
      meal: "صبحانه",
      max: "1",
      price: 400000,
    },
    {
      title: "یک تخته برای یک نفر",
      meal: "شام",
      max: "1",
      price: 35500000,
    },
    {
      title: "دو تخته برای یک نفر",
      meal: "صبحانه",
      max: "3",
      price: 5500000,
    },
    {
      title: "دو تخته برای یک نفر",
      meal: "بدون وعده غذایی",
      max: "1",
      price: 4233000,
    },
  ];
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="flex pt-10 flex-col w-full">
        <div className="flex w-full overflow-x-scroll">
          {images.map((image, i) => {
            return <Image key={i} alt="" className="h-96 w-96" src={image} />;
          })}
        </div>
        <div className="p-5 bg-white drop-shadow-lg flex flex-col w-full">
          <div className="flex items-center space-x-1 w-full justify-end">
            <h2 className="font-bold text-xl">Grand Hotel</h2>
            <h1>هتل</h1>
          </div>
          <div className="flex space-x-1 justify-end w-full">
            <h2>ستاره</h2>
            <h2>4</h2>
            <h2>
              <IconStar />
            </h2>
          </div>
        </div>
        <div className="mt-5  bg-white drop-shadow-lg flex flex-col w-full">
          <div className="flex p-5 items-center space-x-1 w-full justify-end">
            <h1 className="font-bold text-gray-700 text-lg">اتاق ها</h1>
          </div>
          <div className="flex  justify-center w-full">
            <Tabs color="grape" defaultValue="first">
              <Tabs.List grow position="center">
                <Tabs.Tab value="second">صبحانه</Tabs.Tab>
                <Tabs.Tab value="third">بدون وعده غذایی</Tabs.Tab>
                <Tabs.Tab value="first">همه موارد</Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </div>
        </div>
        <div className="p-4 bg-gray-200 flex space-y-3 flex-col lg:px-20 w-full">
          {rooms.map((room) => {
            return (
              <div className="flex bg-white justify-around divide-y my-5 divide-gray-300 rounded-sm flex-col w-full h-64">
                <div className="flex flex-col py-4 px-5 justify-center items-end ">
                  <h1 className="text-lg">{room.title}</h1>
                  <h2>{room.meal}</h2>
                </div>
                <div className="flex items-center h-full w-full px-5 justify-between">
                  <div className="flex space-x-1 p-2 justify-center items-center">
                    <h2>ریال</h2>
                    <h2 className="font-bold text-3xl text-mainPurple">
                      {room.price}
                    </h2>
                  </div>
                  <h1 className="text-lg">قیمت برای هرشب</h1>
                </div>
                <div className="flex justify-center items-center h-full">
                  <RoomModal Room={room} />
                </div>
              </div>
            );
          })}
          <div className="flex">
            <button className="w-52 py-4 bg-darkPurple transition ease-in duration-300 font-mainFont rounded-full text-white hover:bg-Sky-500">
              بیشتر نشونم بده
            </button>
          </div>
        </div>
        <div className="flex p-5 items-center bg-gray-300 space-x-1 w-full justify-between">
          <h1 className="font-bold text-mainPurple text-sm cursor-pointer hover:text-blue-800">
            مشاهده همه
          </h1>
          <h1 className="font-bold text-gray-700 text-lg">
            امکانات و ویژگی ها
          </h1>
        </div>
        <div className="flex w-full bg-gray-300 px-4 lg:px-20 flex-col">
          <div className="rounded-sm bg-gray-100 grid grid-cols-2 grid-rows-2 lg:grid-cols-3 lg:grid-rows-3 lg:p-5 divdie-x divide-black  m-4 shadow-2xl">
            <div className="flex px-3 justify-between items-center">
              <h2>
                <IconBarbell size={32} />
              </h2>
              <h2>سالن بدنسازی</h2>
            </div>
            <div className="flex px-3 justify-between items-center">
              <h2>
                <IconCoffee size={32} />
              </h2>
              <h2>کافی شاپ</h2>
            </div>
            <div className="flex px-3 justify-between items-center">
              <h2>
                <IconChefHat size={32} />
              </h2>
              <h2>رستوران</h2>
            </div>
            <div className="flex px-3 justify-between items-center">
              <h2>
                <IconHotelService size={32} />
              </h2>
              <h2>سرویس روزانه</h2>
            </div>
            <div className="flex px-3 justify-between items-center">
              <h2>
                <IconBath size={32} />
              </h2>
              <h2>حمام</h2>
            </div>
            <div className="flex px-3 justify-between items-center">
              <h2>
                <IconWifi size={32} />
              </h2>
              <h2>خدمات اینترنت</h2>
            </div>
            <div className="flex px-3 justify-between items-center">
              <h2>
                <IconWashMachine size={32} />
              </h2>
              <h2>خشکشویی</h2>
            </div>
          </div>
        </div>
        <div className="flex p-5 items-center space-x-1 w-full justify-end">
          <h1 className="font-bold text-gray-700 text-lg">مکان و موقیت </h1>
        </div>
        <div className="flex bg-gray-200 items-center dropshadow-2xl justify-center p-5">
          <div className="flex  items-center dropshadow-2xl justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12659.458400775064!2d45.0234385!3d37.5111115!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9bafc107d7fb8ae0!2z2YfYqtmEINii2YbYpw!5e0!3m2!1sen!2sfr!4v1673414835237!5m2!1sen!2sfr"
              width="800"
              height="350"
              style={{ border: "0" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="flex p-5 items-center space-x-1 w-full justify-end">
          <h1 className="font-bold text-gray-700 text-lg">قوانین و مقررات </h1>
        </div>
        <div className="flex p-5  bg-gray-200 px-8 justify-center w-full">
          <div className="flex rounded-sm drop-shadow-2xl flex-col w-full bg-gray-50">
            <div className="flex p-2 justify-end  h-18 w-full">
              <div className="p-5  flex justify-end w-full lg:w-1/2">
                <div className="flex items-end justify-center w-full text-sm font-medium flex-col">
                  <div className="flex items-center justify-center">
                    <IconDoor size={25} />
                    <p className="text-md font-bold">ساعت ورود</p>
                  </div>
                  <p className="text-lg font-bold">14:00</p>
                </div>
                <div className="flex items-end justify-center w-full text-sm font-medium flex-col">
                  <div className="flex items-center justify-center">
                    <IconDoorOff size={25} />
                    <p className="text-md font-bold">ساعت خروج</p>
                  </div>
                  <p className="text-lg font-bold">12:00</p>
                </div>
              </div>
            </div>
            <div className="p-5 flex w-full flex-col">
              <div className="flex  w-full justify-end items-center">
                <h1 className="text-lg text-black font-bold">نکات ضروری</h1>
              </div>
              <div className="flex text-right flex-col">
                <p>
                  *طبق اعلام هتل اقامت های اکونومی و اقامت های ساعتی خدمات
                  صبحانه و همچنین امکان کنسلی ندارد*طبق اعلام هتل خدمات خانه
                  داری در اقامت اکونومی به صورت محدود ارائه می گردد* نرخ میهمان
                  غیر ایرانی در این هتل متفاوت می باشد. لطفا قبل از رزرو استعلام
                  بفرمایید و در صورت عدم پرداخت به سامانه علی بابا، باید مابه
                  .تفاوت در هتل پرداخت گردد
                </p>
                <h1 className="text-lg text-black font-bold">
                  هزینه های جانبی
                </h1>
                <p>
                  افراد 0 تا 7 سال، بدون استفاده از تخت اضافه به صورت رایگان از
                  خدمات اقامتی بهره‌مند می شوند. قیمت خدمات برای افراد با 7 سال
                  سن و بیشتر به صورت یک فرد کامل محاسبه می‌گردد. استفاده از تخت
                  اضافه حتی برای افراد زیر 7 سال مشمول پرداخت هزینه كامل نفر سوم
                  است.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
