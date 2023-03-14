import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { User, Bed, Info, Money } from "phosphor-react";
import Footer from "../../components/Footer";
import ProfileInfo from "../../components/profileInfo";
import PaymentHistory from "../../components/paymentHistory";
import SupportRequest from "../../components/supportRequest";
import ReservationList from "../../components/reservationList";
import { supabase } from "../../lib/supabaseClient";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getServerSideProps({ req, locale }) {
  const refreshToken = req.cookies["my-refresh-token"];
  const accessToken = req.cookies["my-access-token"];

  if (!refreshToken && !accessToken) {
    throw new Error("User is not authenticated.");
  }

  await supabase.auth.setSession({
    refresh_token: refreshToken,
    access_token: accessToken,
  });

  const { data: user, error } = await supabase.auth.getUser(accessToken);

  const { data: reservations, error2 } = await supabase
    .from("reservations")
    .select()
    .eq("user_id", user.user.id);

  // If there is a user, return it.
  return {
    props: {
      user: user,
      reservations: reservations,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
export default function UserProfile({ user }) {
  const [tab, setTab] = useState("Profile");
  const { t, i18n } = useTranslation("");
  const lng = i18n.language;
  const [alignLeft, setAlignLeft] = useState(false);
  async function changeAlignment() {
    console.log(lng);
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
  useEffect(() => {
    changeAlignment();
  }, []);

  return (
    <div className="h-auto w-screen bg-gray-100">
      <Navbar />

      <div
        className={`${
          alignLeft === true
            ? "h-full  w-full items-center pt-14 lg:pt-28 flex lg:flex-row flex-col-reverse space-y-3 lg:space-x-8 lg:px-40"
            : "h-full  w-full items-center pt-14 lg:pt-28 flex lg:flex-row-reverse flex-col-reverse space-y-3 lg:space-x-8 lg:px-40"
        }`}
      >
        <div className=" lg:w-3/4 w-full h-auto lg:p-6">
          {tab === "Profile" ? (
            <ProfileInfo user={user} />
          ) : tab === "Reservation" ? (
            <ReservationList user={user} />
          ) : tab === "Support" ? (
            <SupportRequest />
          ) : tab === "Payment" ? (
            <PaymentHistory />
          ) : null}
        </div>
        <div className=" lg:w-1/4 w-full h-full  ">
          <div className="w-full h-auto  bg-white drop-shadow-sm rounded-lg">
            <button
              onClick={() => {
                setTab("Profile");
              }}
              className={`${
                alignLeft === true
                  ? "w-full p-6 flex text-sm font-light items-center justify-end font-mainFont transition ease-in duration-200 hover:bg-mainBlue text-gray-900"
                  : "w-full p-6 flex text-sm font-light flex-row-reverse items-center justify-end font-mainFont transition ease-in duration-200 hover:bg-mainBlue text-gray-900"
              }`}
            >
              {t("userAccount")}
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
            <button
              onClick={() => {
                setTab("Reservation");
              }}
              className={`${
                alignLeft === true
                  ? "w-full p-6 flex text-sm font-light items-center justify-end font-mainFont transition ease-in duration-200 hover:bg-mainBlue text-gray-900"
                  : "w-full p-6 flex text-sm font-light flex-row-reverse items-center justify-end font-mainFont transition ease-in duration-200 hover:bg-mainBlue text-gray-900"
              }`}
            >
              {t("reservedRoom")}
              <Bed className="mx-2" size={20} />
            </button>
            <button
              onClick={() => {
                setTab("Support");
              }}
              className={`${
                alignLeft === true
                  ? "w-full p-6 flex text-sm font-light items-center justify-end font-mainFont transition ease-in duration-200 hover:bg-mainBlue text-gray-900"
                  : "w-full p-6 flex text-sm font-light flex-row-reverse items-center justify-end font-mainFont transition ease-in duration-200 hover:bg-mainBlue text-gray-900"
              }`}
            >
              {t("support")}
              <Info className="mx-2" size={20} />
            </button>
            <button
              onClick={() => {
                setTab("Payment");
              }}
              className={`${
                alignLeft === true
                  ? "w-full p-6 flex text-sm font-light items-center justify-end font-mainFont transition ease-in duration-200 hover:bg-mainBlue text-gray-900"
                  : "w-full p-6 flex text-sm font-light flex-row-reverse items-center justify-end font-mainFont transition ease-in duration-200 hover:bg-mainBlue text-gray-900"
              }`}
            >
              {t("finances")} <Money className="mx-2" size={20} />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
