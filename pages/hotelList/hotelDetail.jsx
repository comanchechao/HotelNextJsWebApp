import hotelOne from "../../assets/images/hotelone.jpg";
import hotelTwo from "../../assets/images/hoteltwo.jpg";
import hotelThree from "../../assets/images/hotelthree.jpg";
import hotelFour from "../../assets/images/hotelfour.jpg";
import Navbar from "../../components/Navbar";
import {
  IconChevronLeft,
  IconStar,
  IconBarbell,
  IconCoffee,
  IconChefHat,
  IconHotelService,
  IconBath,
  IconWifi,
  IconWashMachine,
} from "@tabler/icons";
import Link from "next/link";
import Image from "next/image";
import { ImageSquare } from "phosphor-react";
export default function HotelDetailPage() {
  let Images = [hotelOne, hotelTwo, hotelThree, hotelFour];
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="flex w-full p-20 h-full bg-gray-200">
        <div className="flex flex-col p-5 w-full bg-white h-full">
          <div className="flex justify-end items-center  text-gray-700 w-full h-10">
            <Link href="/hotelList/hotelDetail">
              <p>هتل آنا</p>
            </Link>
            <IconChevronLeft />
            <p>هتل های شهر تهران</p>
            <IconChevronLeft />
            <Link href="/">
              <p>هتل ها</p>
            </Link>
          </div>
          <div className="flex p-5 flex-col">
            <div className="flex cursor-pointer w-full justify-center  h-96 rounded-lg">
              <div className="flex">
                <Image className=" w-full h-full" src={hotelOne} />
              </div>
              <div className="grid grid-cols-2 grid-rows-2">
                {Images.map((image) => {
                  return (
                    <div className="flex w-full h-full justify-center items-center">
                      <Image className=" w-full h-full" src={image} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-center py-5  w-full h-10">
              <button className="text-mainPurple py-4  text-center flex items-center justify-center w-32 font-bold hover:bg-mainPurple hover:text-gray-100 transition">
                <p>عکس های بیشتر</p>
              </button>
            </div>
          </div>
          <div className="flex w-full justify-end h-20">
            <div className="flex w-full justify-center items-end flex-col">
              <h1>هتل آنا</h1>
              <div className="flex space-x-8 justify-center items-center">
                <div className="flex">
                  <p>اول بند ، روبه روی خیابان گلشهر</p>
                </div>
                <div className="flex justify-center items-center space-x-2">
                  <p className="text-lg">ستاره</p>
                  <p className="text-lg">4</p>
                  <IconStar />
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-96 h-96 border rounded"></div>
            <div className="flex flex-col w-full mt-8">
              <div className="flex text-gray-400 font-bold w-full justify-end">
                <h1>امکانات و ویژگی ها</h1>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white grid grid-cols-2 grid-rows-2 lg:grid-cols-3 lg:grid-rows-3 lg:p-5 divdie-x divide-black  m-4 ">
                <div className="flex px-3 justify-between items-center">
                  <h2>
                    <IconWashMachine size={32} />
                  </h2>
                  <h2>خشکشویی</h2>
                </div>
                <div className="flex px-3 justify-between items-center">
                  <h2>
                    <IconWashMachine size={32} />
                  </h2>
                  <h2>خشکشویی</h2>
                </div>
                <div className="flex px-3 justify-between items-center">
                  <h2>
                    <IconWashMachine size={32} />
                  </h2>
                  <h2>خشکشویی</h2>
                </div>
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
              </div>
              <div className="flex p-5 items-center space-x-1 w-full justify-between">
                <h1 className="  text-mainPurple font-bold text-sm cursor-pointer hover:text-blue-800">
                  تغییر موقعیت
                </h1>
                <h1 className="  text-gray-700 text-2xl">
                  مکان های مهم اطراف هتل
                </h1>
              </div>
              <div className="flex space-x-2 p-3">
                <div className="flex w-full">
                  {" "}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12659.458400775064!2d45.0234385!3d37.5111115!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9bafc107d7fb8ae0!2z2YfYqtmEINii2YbYpw!5e0!3m2!1sen!2sfr!4v1673414835237!5m2!1sen!2sfr"
                    width="500"
                    height="350"
                    style={{ border: "0" }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="flex flex-col border rounded-lg border-gray-200 divide-y divide-gray-200 w-full h-full">
                  <div className="flex flex-col justify-around items-around space-y-2 p-5 w-full">
                    <h1 className="text-lg self-end">پارک لاله</h1>
                    <div className="flex w-full">
                      <div className="flex w-full">
                        <p>23213</p>
                        <p>متر</p>
                      </div>
                      <div className="flex justify-end w-full">
                        <div className="flex">
                          <p>4 دقیقه</p>
                        </div>
                        <div className="flex">
                          <p>4</p>
                          <p>دقیقه</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-around items-around space-y-2 p-5 w-full">
                    <h1 className="text-lg self-end">پارک لاله</h1>
                    <div className="flex w-full">
                      <div className="flex w-full">
                        <p>23213</p>
                        <p>متر</p>
                      </div>
                      <div className="flex justify-end w-full">
                        <div className="flex">
                          <p>4 دقیقه</p>
                        </div>
                        <div className="flex">
                          <p>4</p>
                          <p>دقیقه</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
