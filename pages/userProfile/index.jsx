import Navbar from "../../components/Navbar";
import { useState } from "react";
import { User, Bed, Info, Money } from "phosphor-react";
import PaymentHistory from "../../components/paymentHistory";
import ProfileInfo from "../../components/profileInfo";
import Footer from "../../components/Footer";
export default function UserProfile() {
  const [tab, setTab] = useState("Profile");
  return (
    <div className="h-screen w-screen bg-gray-200">
      <Navbar />

      <div className="h-full  w-full pt-28 flex space-x-3 px-64">
        <div className=" w-3/4 h-full p-6">
          {tab === "Profile" ? (
            <ProfileInfo />
          ) : tab === "Payment" ? (
            <PaymentHistory />
          ) : null}
        </div>
        <div className=" w-1/4 h-full  ">
          <div className="w-full h-auto  bg-white drop-shadow-sm">
            <button
              onClick={() => {
                setTab("Profile");
              }}
              className="w-full p-6 flex text-sm font-light items-center justify-end font-mainFont transition ease-in duration-200 hover:bg-mainBlue text-gray-900"
            >
              حساب کاربری
              <User className="mx-2" size={20} />
            </button>
            {/* <button className="w-full p-6 flex text-sm font-light items-center justify-end font-mainFont transition ease-in duration-200 hover:bg-mainBlue text-gray-900">
              رزورهای من
              <User className="mx-2" size={20} />
            </button> */}
            {/* <button className="w-full p-6 flex text-sm font-light items-center justify-end font-mainFont transition ease-in duration-200 hover:bg-mainBlue text-gray-900">
              لیست هتل
              <Bed className="mx-2" size={20} />
            </button> */}
            <button className="w-full p-6 flex text-sm font-light items-center justify-end font-mainFont transition ease-in duration-200 hover:bg-mainBlue text-gray-900">
              درخواست پشتیبانی
              <Info className="mx-2" size={20} />
            </button>
            <button
              onClick={() => {
                setTab("Payment");
              }}
              className="w-full p-6 flex text-sm font-light items-center justify-end font-mainFont transition ease-in duration-200 hover:bg-mainBlue text-gray-900"
            >
              موجودی و تراکنش ها <Money className="mx-2" size={20} />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
