import { Loader, Notification } from "@mantine/core";
import { Star, SignIn, SignOut, Bed } from "phosphor-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../lib/supabaseClient";
import { useTranslation } from "next-i18next";

export default function InfoConfirmation() {
  const [seshId, setSeshId] = useState();
  //getting reservation info
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  let passenger = useSelector((state) => state.reserve.passenger);
  let room = useSelector((state) => state.reserve.room);
  let enterDate = useSelector((state) => state.reserve.enterDate);

  let exitDate = useSelector((state) => state.reserve.exitDate);

  let passengerOne = useSelector((state) => state.reserve.passengerOne);
  let passengerTwo = useSelector((state) => state.reserve.passengerTwo);
  let hotelInfo = useSelector((state) => state.reserve.hotelInfo);
  let passengerThree = useSelector((state) => state.reserve.passengerThree);
  let passengerFour = useSelector((state) => state.reserve.passengerFour);
  async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    setSeshId(data.session.user.id);
  }
  const { t, i18n } = useTranslation("");
  const lng = i18n.language;
  const [alignLeft, setAlignLeft] = useState(false);
  const [formattedEnterDate, setFormattedEnterDate] = useState(false);
  const [formattedExitDate, setFormattedExitDate] = useState(false);

  let formattedEnterDatefa = enterDate.toLocaleString("fa-IR", {
    timeZone: "Asia/Tehran",
    hour12: false,
  });

  let formattedExitDatefa = exitDate.toLocaleString("fa-IR", {
    timeZone: "Asia/Tehran",
    hour12: false,
  });
  let formattedEnterDatetr = enterDate.toLocaleString("tr-TR", {
    timeZone: "Europe/Istanbul",
    hour12: false,
  });

  let formattedExitDatetr = exitDate.toLocaleString("tr-TR", {
    timeZone: "Europe/Istanbul",
    hour12: false,
  });
  async function changeAlignment() {
    console.log(lng);
    if (lng === "tr") {
      await setAlignLeft(false);
      setFormattedEnterDate(formattedEnterDatetr);
      setFormattedExitDate(formattedExitDatetr);
    } else {
      setFormattedEnterDate(formattedEnterDatefa);
      setFormattedExitDate(formattedExitDatefa);
      setAlignLeft(true);
    }
  }
  useEffect(() => {
    changeAlignment();
  }, []);

  async function handleReservation() {
    setLoading(true);
    getSession();
    let passengers = [];
    if (passengerOne.name !== "") {
      passengers.push(passengerOne);
    }
    if (passengerTwo.name !== "") {
      passengers.push(passengerTwo);
    }
    if (passengerThree.name !== "") {
      passengers.push(passengerThree);
    }
    if (passengerFour.name !== "") {
      passengers.push(passengerFour);
    }

    const { data: session, error2 } = await supabase.auth.getSession();

    const { error } = await supabase.from("reservations").insert({
      name: passengers[0].name,
      hotel_name: hotelInfo.title,
      hotel_id: hotelInfo.id,
      passengers: passengers,
      user_id: session.session.user.id,
      passengerCount: passenger,
      room: room,
    });
    setLoading(false);
    setConfirm(true);

    if (error) throw error;
    console.log(
      "passenger count",
      passenger,
      "roomDetail ",
      room,
      "passengers",
      passengers,
      "hotel info",
      hotelInfo.id
    );
  }
  return (
    <div className=" mb-10 h-auto w-screen lg:w-textArea flex mt-5 flex-col items-center space-y-7 lg:px-0 px-6">
      <div
        className={`${
          alignLeft === true
            ? "h-auto lg:h-24 w-full bg-white divide-x-2 flex"
            : "h-auto lg:h-24 w-full bg-white divide-x-2 flex flex-row-reverse"
        }`}
      >
        <div className="h-full w-1/2 flex lg:flex-row flex-col items-center justify-center ">
          <div className="h-full w-1/2 flex my-4 lg:my-0 flex-col items-center justify-center">
            <div className="flex items-center space-x-2">
              <h2>{t("exitTime")}</h2>
              <SignOut size={40} color="#e0ab19" weight="fill" />
            </div>
            <h1 className="font text-lg">
              {JSON.stringify(formattedEnterDate)}
            </h1>
          </div>
          <div className="h-full w-1/2 flex my-4 lg:my-0 flex-col justify-center items-center">
            <div className="flex items-center space-x-2">
              <h2>{t("enterTime")}</h2>
              <SignIn size={40} color="#e0ab19" weight="fill" />
            </div>
            <h1 className="font text-lg">
              {" "}
              {JSON.stringify(formattedExitDate)}
            </h1>
          </div>
        </div>
        <div
          className={`${
            alignLeft === true
              ? "h-full w-1/2 px-5 lg:px-3 p-3 flex flex-col justify-center items-center lg:items-end lg:justify-start space-y-3"
              : "h-full w-1/2 px-5 lg:px-3 p-3 flex flex-col justify-center items-center lg:items-start lg:justify-start space-y-3"
          }`}
        >
          <div
            className={`${
              alignLeft === true
                ? "flex items-center flex-col"
                : "flex items-center flex-col"
            }`}
          >
            <h1 className="text-xl font-bold">
              {t("singleHotel")} {hotelInfo.title}
            </h1>
            <h2 className="flex items-center">
              {hotelInfo.stars} {t("star")}
              <Star className="mx-2" size={19} color="#e0ab19" weight="fill" />
            </h2>
          </div>
          <h2>{hotelInfo.address}</h2>
        </div>
      </div>
      <div className="h-auto w-full bg-white flex flex-col justify-start items-center px-9">
        <div
          className={`${
            alignLeft === true
              ? "h-20 w-full flex items-end justify-start  flex-col   py-3"
              : "h-20 w-full flex items-start justify-start  flex-col   py-3"
          }`}
        >
          <h1 className="text-2xl font-bold items-center flex">
            {t("passengerInfo")}
            <Bed className="ml-3" size={45} color="#e0ab19" weight="fill" />
          </h1>
        </div>
        <div
          className={`${
            alignLeft === true
              ? "lg:flex-row flex-col  lg:self-end flex flex-wrap-reverse items-center justify-end  py-4 space-x-5 "
              : "lg:flex-row flex-col  lg:self-end flex flex-wrap-reverse items-center justify-start  py-4 space-x-5 "
          }`}
        >
          <h5>
            <strong>{t("roomMeal")}</strong> : {room.meal}
          </h5>
          <h4 className="text-lg">
            <strong>{t("roomName")} : </strong>
            {room.title}
          </h4>
          <h4 className="text-lg">
            <strong>
              {t("passengerCount")} : {passenger}
            </strong>{" "}
            {t("person")}
          </h4>
          <h4 className="text-lg">
            <strong>{t("phone")} : </strong>
            {passengerOne.phoneNumber}
          </h4>
          <h4 className="text-lg">
            {passengerOne.name}
            <strong>:{t("supervisor")} </strong>
          </h4>
        </div>
        <div className="h-auto p-3 w-full bg-blue-700 text-white grid justify-items-center grid-cols-4">
          <h4 className="font-bold text-lg">{t("idCode")}</h4>
          <h4 className="font-bold text-lg">{t("phone")}</h4>
          <h4 className="font-bold text-lg">{t("fullName")}</h4>
          <h4 className="font-bold text-lg">{t("gender")}</h4>
        </div>
        {passengerOne.name !== "" ? (
          <div className="h-auto p-3 mb-9 w-full  grid justify-items-center grid-cols-4">
            <h4 className="text-lg">{passengerOne.socialNumber}</h4>
            <h4 className="text-lg">{passengerOne.phoneNumber}</h4>
            <h4 className="text-lg">{passengerOne.name}</h4>
            <h4 className="text-lg">{passengerOne.gender}</h4>
          </div>
        ) : null}
        {passengerTwo.name !== "" ? (
          <div className="h-16 mb-9 w-full  grid justify-items-center grid-cols-4">
            <h4 className="text-lg">{passengerTwo.socialNumber}</h4>
            <h4 className="text-lg">{passengerTwo.phoneNumber}</h4>
            <h4 className="text-lg">{passengerTwo.name}</h4>
            <h4 className="text-lg">{passengerTwo.gender}</h4>
          </div>
        ) : null}
        {passengerThree.name !== "" ? (
          <div className="h-16 mb-9 w-full  grid justify-items-center grid-cols-4">
            <h4 className="text-lg">{passengerOne.socialNumber}</h4>
            <h4 className="text-lg">{passengerOne.phoneNumber}</h4>
            <h4 className="text-lg">{passengerOne.gender}</h4>
            <h4 className="text-lg">{passengerOne.name}</h4>
          </div>
        ) : null}
        {passengerFour.name !== "" ? (
          <div className="h-16 mb-9 w-full  grid justify-items-center grid-cols-4">
            <h4 className="text-lg">{passengerOne.socialNumber}</h4>
            <h4 className="text-lg">{passengerOne.phoneNumber}</h4>
            <h4 className="text-lg">{passengerOne.name}</h4>
            <h4 className="text-lg">{passengerOne.gender}</h4>
          </div>
        ) : null}
      </div>
      <div className="flex">
        {confirm ? (
          <Notification
            transition="fade"
            transitionDuration={600}
            transitionTimingFunction="ease"
            color="green"
            withCloseButton
            variant="outline"
          >
            <h1 className="text-2xl text-center">{t("infoConfirmSuccess")}</h1>
          </Notification>
        ) : (
          <button
            className="px-14 rounded-md transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-lg font-mainFont"
            onClick={() => {
              handleReservation();
            }}
          >
            {loading ? (
              <Loader size="sm" color="yellow" variant="bars" />
            ) : (
              <p> {t("confirmInfo")}</p>
            )}
          </button>
        )}
      </div>
      <div
        className={`${
          alignLeft === true
            ? "h-28 w-full bg-white flex flex-col justify-center items-end px-9"
            : "h-28 w-full bg-white flex flex-col justify-center items-start px-9"
        }`}
      >
        <h1 className="text-lg font-bold items-center flex py-2">
          {t("cancelRule")}
        </h1>
      </div>
    </div>
  );
}
