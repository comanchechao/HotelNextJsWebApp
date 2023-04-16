import { Select, TextInput, NumberInput, Notification } from "@mantine/core";
import { Star, SignIn, SignOut, Bed, Plus, Minus, Timer } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reservationActions } from "../store/reservation";
import { useTranslation } from "next-i18next";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import jalaliday from "jalaliday";
export default function PassengerInfo() {
  const faLocale = {
    name: "fa",
    weekdays: [
      "چهارشنبه",
      "پنج‌شنبه",
      "جمعه",
      "شنبه",
      "یک‌شنبه",
      "دوشنبه",
      "سه‌شنبه",
    ],
    weekStart: 1,
    months: [
      "دی",
      "بهمن",
      "اسفند",
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
    ],
    relativeTime: {
      future: "%s بعد",
      past: "%s قبل",
      s: "چند ثانیه",
      m: "1 دقیقه",
      mm: "%d دقیقه",
      h: "1 ساعت",
      hh: "%d ساعت",
      d: "1 روز",
      dd: "%d روز",
      M: "1 ماه",
      MM: "%d ماه",
      y: "1 سال",
      yy: "%d سال",
    },
    formats: {
      L: "DD/MM/YYYY",
      LTS: "HH:mm:ss",
      LLLL: "dddd, D MMMM YYYY HH:mm",
      LLL: "D MMMM YYYY HH:mm",
    },
  };

  const [dates, setDates] = useState([Date | null, Date | null]);
  // You need to extend the custom locale and localeData
  dayjs.extend(jalaliday);
  dayjs.extend(customParseFormat);
  dayjs.extend(localeData);
  dayjs.localeData("fa", faLocale);
  const [passengers, setPassengers] = useState([]);
  // getting reservatoin info
  const dispatch = useDispatch();
  let enterDate = useSelector((state) => state.reserve.enterDate);
  let exitDate = useSelector((state) => state.reserve.exitDate);

  let hotelInfo = useSelector((state) => state.reserve.hotelInfo);
  let room = useSelector((state) => state.reserve.room);
  let passenger = useSelector((state) => state.reserve.passenger);
  let passengerCount = passenger;
  const [passengerOneName, setPassengerOneName] = useState("");
  const [passengerOnePhoneNumber, setPassengerOnePhoneNumber] = useState("");
  const [passengerOneSocialNumber, setPassengerOneSocialNumber] = useState("");
  const [passengerOneGender, setPassengerOneGender] = useState(null);
  const [passengerOnePassportCode, setPassengerOnePassportCode] =
    useState(null);
  const [passengerTwoName, setPassengerTwoName] = useState("");
  const [passengerTwoPhoneNumber, setPassengerTwoPhoneNumber] = useState("");
  const [passengerTwoSocialNumber, setPassengerTwoSocialNumber] = useState("");
  const [passengerTwoGender, setPassengerTwoGender] = useState(null);
  const [passengerTwoPassportCode, setPassengerTwoPassportCode] =
    useState(null);
  const [passengerThreeName, setPassengerThreeName] = useState("");
  const [passengerThreePhoneNumber, setPassengerThreePhoneNumber] =
    useState("");
  const [passengerThreeSocialNumber, setPassengerThreeSocialNumber] =
    useState("");
  const [passengerThreeGender, setPassengerThreeGender] = useState(null);
  const [passengerThreePassportCode, setPassengerThreePassportCode] =
    useState(null);
  const [passengerFourName, setPassengerFourName] = useState("");
  const [passengerFourPhoneNumber, setPassengerFourPhoneNumber] = useState("");
  const [passengerFourSocialNumber, setPassengerFourSocialNumber] =
    useState("");
  const [passengerFourGender, setPassengerFourGender] = useState(null);
  const [passengerFourPassportCode, setPassengerFourPassportCode] =
    useState(null);
  const { t, i18n } = useTranslation("");
  const lng = i18n.language;
  const [alignLeft, setAlignLeft] = useState(false);
  const [formattedEnterDate, setFormattedEnterDate] = useState(false);
  const [formattedExitDate, setFormattedExitDate] = useState(false);
  const [errorValue, setErrorValue] = useState("");
  const [alert, setAlert] = useState(false);

  const [specific, setSpecific] = useState(false);

  let country = useSelector((state) => state.filter.country);
  async function CountrySpecific() {
    if (country === "ایران") {
      setSpecific(false);
    } else {
      setSpecific(true);
    }
  }
  async function changeAlignment() {
    if (lng === "tr") {
      setAlignLeft(false);
    } else {
      setAlignLeft(true);
    }
  }

  function checkFields() {
    const myDiv = document.querySelector(".myDiv");
    const inputs = myDiv.querySelectorAll("input");
    var empty = false; // Initialize empty flag

    for (let input of inputs) {
      if (input.value.trim() === "") {
        empty = true;
      }
    }

    if (empty) {
      setErrorValue("   ");
      setAlert(true);

      // Show error message
    } else {
      dispatch(reservationActions.increasePassenger());

      setErrorValue("");
      setAlert(false);
      // Show error message
    }
  }
  useEffect(() => {
    changeAlignment();
    CountrySpecific();
  }, []);

  useEffect(() => {
    dispatch(
      reservationActions.setPassengerOne({
        passengerOneName,
        passengerOnePhoneNumber,
        passengerOneSocialNumber,
        passengerOneGender,
        passengerOnePassportCode,
      })
    );
  }, [
    passengerOneName,
    passengerOnePhoneNumber,
    passengerOneSocialNumber,
    passengerOneGender,
    passengerOnePassportCode,
    dispatch,
  ]);
  useEffect(() => {
    dispatch(
      reservationActions.setPassengerTwo({
        passengerTwoName,
        passengerTwoPhoneNumber,
        passengerTwoSocialNumber,
        passengerTwoGender,
        passengerTwoPassportCode,
      })
    );
  }, [
    passengerTwoName,
    passengerTwoPhoneNumber,
    passengerTwoSocialNumber,
    passengerTwoGender,
    passengerTwoPassportCode,
    dispatch,
  ]);
  useEffect(() => {
    dispatch(
      reservationActions.setPassengerThree({
        passengerThreeName,
        passengerThreePhoneNumber,
        passengerThreeSocialNumber,
        passengerThreeGender,
        passengerThreePassportCode,
      })
    );
  }, [
    passengerThreeName,
    passengerThreePhoneNumber,
    passengerThreeSocialNumber,
    passengerThreeGender,
    passengerThreePassportCode,
    dispatch,
  ]);
  useEffect(() => {
    dispatch(
      reservationActions.setPassengerFour({
        passengerFourName,
        passengerFourPhoneNumber,
        passengerFourSocialNumber,
        passengerFourGender,
        passengerFourPassportCode,
      })
    );
  }, [
    passengerFourName,
    passengerFourPhoneNumber,
    passengerFourSocialNumber,
    passengerFourGender,
    passengerFourPassportCode,
    dispatch,
  ]);

  return (
    <div className=" mb-10 h-auto lg:h-full w-screen lg:w-full flex mt-5 flex-col items-center space-y-7 lg:px-0 px-6">
      <div
        className={`${
          alignLeft === true
            ? "h-auto lg:flex-row flex-col-reverse lg:h-24 w-full bg-white divide-x-2 space-x-3 flex"
            : "h-auto lg:flex-row-reverse flex-col-reverse lg:h-24 w-full bg-white divide-x-2 flex "
        }`}
      >
        <div className="h-full w-full   lg:w-1/3 flex lg:flex-row flex-col items-center justify-center p-2">
          <div className="h-full w-full lg:w-1/2 flex my-4 lg:my-0 flex-col items-center justify-center">
            <div className="flex items-center space-x-2">
              <h2>{t("exitDay")}</h2>
              <SignOut size={30} color="#e0ab19" weight="fill" />
            </div>
            <h1 className="font text-sm">
              {dayjs(exitDate).locale("fa").format("DD/MM/YYYY")}
            </h1>
          </div>
          <div className="h-full w-1/2 flex my-4 lg:my-0 flex-col justify-center items-center">
            <div className="flex items-center space-x-2">
              <h2>{t("enterDay")}</h2>
              <SignIn size={30} color="#e0ab19" weight="fill" />
            </div>
            <h1 className="font text-sm">
              {dayjs(enterDate).locale("fa").format("DD/MM/YYYY")}
            </h1>
          </div>
        </div>
        <div className="h-full w-full   lg:w-1/3 flex lg:flex-row flex-col items-center justify-center p-2">
          <div className="h-full w-full lg:w-1/2 flex my-4 lg:my-0 flex-col items-center justify-center">
            <div className="flex items-center space-x-2">
              <h2>{t("exitTime")}</h2>
              <Timer size={25} color="#e0ab19" weight="fill" />
            </div>
            <h1 className="font text-sm"> {hotelInfo.exitTime}</h1>
          </div>
          <div className="h-full w-1/2 flex my-4 lg:my-0 flex-col justify-center items-center">
            <div className="flex items-center space-x-2">
              <h2>{t("enterTime")}</h2>
              <Timer size={25} color="#e0ab19" weight="fill" />
            </div>
            <h1 className="font text-sm"> {hotelInfo.enterTime}</h1>
          </div>
        </div>
        <div
          className={`${
            alignLeft === true
              ? "h-full lg:w-1/3 px-5 lg:px-3 p-3 flex flex-col justify-center items-center lg:items-end lg:justify-start space-y-3"
              : "h-full lg:w-1/3 px-5 lg:px-3 p-3 flex flex-col justify-center items-center lg:items-start lg:justify-start space-y-3"
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
      <div className=" h-full lg:h-full w-full my-6 bg-white flex flex-col items-center">
        <div
          className={`${
            alignLeft === true
              ? "h-20 w-full flex items-end justify-start    flex-col  px-9 py-3"
              : "h-20 w-full flex items-start justify-start    flex-col  px-9 py-3"
          }`}
        >
          <h1 className="text-2xl font-bold items-center flex">
            {t("firstRoom")}
            <Bed className="ml-3" size={45} color="#e0ab19" weight="fill" />
          </h1>
          <div className="flex items-center space-x-6">
            <h3 className="font-bold">1 {t("adult")}</h3>
            <h3>
              {t("roomMeal")} {room.meal}
            </h3>
            <h2 className="text-md font-bold">
              {t("roomName")} {room.title}
            </h2>
          </div>
        </div>
        {passenger}
        <form className="h-full  myDiv   space-y-9 my-10 w-full    flex items-start flex-col px-9">
          {passenger >= 1 ? (
            <div className="  border-2 border-dashed border-mainPurple  my-5 py-6 px-3 rounded-lg">
              <div
                className={`${
                  alignLeft === true
                    ? "w-full flex items-center justify-end"
                    : "w-full flex items-center justify-start"
                }`}
              >
                <h2 className="   items-center mb-4 py-1   rounded-full border-2 px-6 border-dashed border-mainPurple ">
                  {t("adultSupervisor")} <strong>1</strong> {t("supervisor")}
                </h2>
              </div>
              <form
                className={`${
                  alignLeft === true
                    ? "w-full h-full flex lg:flex-row flex-col  justify-center items-center space-x-4 px-6"
                    : "w-full h-full flex lg:flex-row flex-col  justify-center items-center space-x-4 px-6"
                }`}
              >
                {specific ? (
                  <NumberInput
                    onChange={(e) => {
                      setPassengerOnePassportCode(e);
                    }}
                    className={`${
                      alignLeft === true
                        ? "text-4xl text-right flex flex-col items-end"
                        : "text-4xl text-right flex flex-col items-start"
                    }`}
                    placeholder={t("passport")}
                    label={t("passport")}
                    hideControls
                    variant="default"
                    radius="md"
                    size="md"
                    withAsterisk
                    error={errorValue}
                  />
                ) : (
                  <div></div>
                )}

                <NumberInput
                  onChange={(e) => {
                    setPassengerOneSocialNumber(e);
                  }}
                  className={`${
                    alignLeft === true
                      ? "text-4xl text-right flex flex-col items-end"
                      : "text-4xl text-right flex flex-col items-start"
                  }`}
                  placeholder={t("idCode")}
                  label={t("idCode")}
                  hideControls
                  variant="default"
                  radius="md"
                  size="md"
                  withAsterisk
                  error={errorValue}
                />
                <NumberInput
                  onChange={(e) => {
                    setPassengerOnePhoneNumber(e);
                  }}
                  className={`${
                    alignLeft === true
                      ? "text-4xl text-right flex flex-col items-end"
                      : "text-4xl text-right flex flex-col items-start"
                  }`}
                  required
                  placeholder={t("phone")}
                  label={t("phone")}
                  hideControls
                  variant="default"
                  radius="md"
                  size="md"
                  withAsterisk
                  error={errorValue}
                />
                <TextInput
                  onChange={(e) => {
                    setPassengerOneName(e.target.value);
                  }}
                  className={`${
                    alignLeft === true
                      ? "text-4xl text-right flex flex-col items-end"
                      : "text-4xl text-right flex flex-col items-start"
                  }`}
                  required
                  placeholder={t("fullName")}
                  label={t("fullName")}
                  variant="default"
                  radius="md"
                  size="md"
                  withAsterisk
                  error={errorValue}
                />
                <Select
                  transitionDuration={150}
                  transition="pop-top-left"
                  transitionTimingFunction="ease"
                  variant="default"
                  onChange={setPassengerOneGender}
                  className={`${
                    alignLeft === true
                      ? "text-4xl text-right flex flex-col items-end"
                      : "text-4xl text-right flex flex-col items-start"
                  }`}
                  data={[t("man"), t("woman")]}
                  placeholder={t("gender")}
                  label={t("gender")}
                  radius="md"
                  withAsterisk
                  clearable
                  searchable
                  error={errorValue}
                  size="md"
                />
              </form>
            </div>
          ) : null}
          {passenger >= 2 ? (
            <div className=" border-2 border-dashed border-mainPurple  my-5 py-9 px-3 rounded-lg">
              <div
                className={`${
                  alignLeft === true
                    ? "w-full flex items-center justify-end"
                    : "w-full flex items-center justify-start"
                }`}
              >
                <h2 className="   items-center mb-4 py-1   rounded-full border-2 px-6 border-dashed border-mainPurple ">
                  {t("adultSupervisor")} <strong>2</strong> {t("supervisor")}
                </h2>
              </div>
              <form
                className={`${
                  alignLeft === true
                    ? "w-full h-full flex lg:flex-row flex-col  justify-center items-center space-x-4 px-6"
                    : "w-full h-full flex lg:flex-row flex-col  justify-center items-center space-x-4 px-6"
                }`}
              >
                {" "}
                {specific ? (
                  <NumberInput
                    onChange={(e) => {
                      setPassengerTwoPassportCode(e);
                    }}
                    className={`${
                      alignLeft === true
                        ? "text-4xl text-right flex flex-col items-end"
                        : "text-4xl text-right flex flex-col items-start"
                    }`}
                    placeholder={t("passport")}
                    label={t("passport")}
                    hideControls
                    variant="default"
                    radius="md"
                    size="md"
                    withAsterisk
                    error={errorValue}
                  />
                ) : (
                  <div></div>
                )}
                <NumberInput
                  onChange={(e) => {
                    setPassengerTwoSocialNumber(e);
                  }}
                  className={`${
                    alignLeft === true
                      ? "text-4xl text-right flex flex-col items-end"
                      : "text-4xl text-right flex flex-col items-start"
                  }`}
                  required
                  placeholder={t("idCode")}
                  label={t("idCode")}
                  hideControls
                  variant="default"
                  radius="md"
                  size="md"
                  withAsterisk
                  error={errorValue}
                />
                <NumberInput
                  onChange={(e) => {
                    setPassengerTwoPhoneNumber(e);
                  }}
                  className={`${
                    alignLeft === true
                      ? "text-4xl text-right flex flex-col items-end"
                      : "text-4xl text-right flex flex-col items-start"
                  }`}
                  required
                  placeholder={t("phone")}
                  label={t("phone")}
                  hideControls
                  variant="default"
                  radius="md"
                  size="md"
                  withAsterisk
                  error={errorValue}
                />
                <TextInput
                  onChange={(e) => {
                    setPassengerTwoName(e.target.value);
                  }}
                  className={`${
                    alignLeft === true
                      ? "text-4xl text-right flex flex-col items-end"
                      : "text-4xl text-right flex flex-col items-start"
                  }`}
                  required
                  placeholder={t("fullName")}
                  label={t("fullName")}
                  variant="default"
                  radius="md"
                  size="md"
                  withAsterisk
                  error={errorValue}
                />
                <Select
                  onChange={setPassengerTwoGender}
                  className={`${
                    alignLeft === true
                      ? "text-4xl text-right flex flex-col items-end"
                      : "text-4xl text-right flex flex-col items-start"
                  }`}
                  data={[t("man"), t("woman")]}
                  placeholder={t("gender")}
                  label={t("gender")}
                  variant="default"
                  radius="md"
                  withAsterisk
                  clearable
                  searchable
                  size="md"
                  error={errorValue}
                />
              </form>
            </div>
          ) : null}
          {passenger >= 3 ? (
            <div className=" border-2 border-dashed border-mainPurple  my-5 py-9 px-3 rounded-lg">
              <div
                className={`${
                  alignLeft === true
                    ? "w-full flex items-center justify-end"
                    : "w-full flex items-center justify-start"
                }`}
              >
                <h2 className="   items-center mb-4 py-1   rounded-full border-2 px-6 border-dashed border-mainPurple ">
                  {t("adultSupervisor")} <strong>3</strong> {t("supervisor")}
                </h2>
              </div>
              <form
                className={`${
                  alignLeft === true
                    ? "w-full h-full flex lg:flex-row flex-col  justify-center items-center space-x-4 px-6"
                    : "w-full h-full flex lg:flex-row flex-col  justify-center items-center space-x-4 px-6"
                }`}
              >
                {" "}
                {specific ? (
                  <NumberInput
                    onChange={(e) => {
                      setPassengerThreePassportCode(e);
                    }}
                    className={`${
                      alignLeft === true
                        ? "text-4xl text-right flex flex-col items-end"
                        : "text-4xl text-right flex flex-col items-start"
                    }`}
                    placeholder={t("passport")}
                    label={t("passport")}
                    hideControls
                    variant="default"
                    radius="md"
                    size="md"
                    withAsterisk
                    error={errorValue}
                  />
                ) : (
                  <div></div>
                )}
                <NumberInput
                  onChange={(e) => {
                    setPassengerThreeSocialNumber(e);
                  }}
                  className={`${
                    alignLeft === true
                      ? "text-4xl text-right flex flex-col items-end"
                      : "text-4xl text-right flex flex-col items-start"
                  }`}
                  required
                  placeholder={t("idCode")}
                  label={t("idCode")}
                  hideControls
                  variant="default"
                  radius="md"
                  size="md"
                  withAsterisk
                  error={errorValue}
                />
                <NumberInput
                  onChange={(e) => {
                    setPassengerThreePhoneNumber(e);
                  }}
                  className={`${
                    alignLeft === true
                      ? "text-4xl text-right flex flex-col items-end"
                      : "text-4xl text-right flex flex-col items-start"
                  }`}
                  required
                  placeholder={t("phone")}
                  label={t("phone")}
                  hideControls
                  variant="default"
                  radius="md"
                  size="md"
                  withAsterisk
                  error={errorValue}
                />
                <TextInput
                  onChange={(e) => {
                    setPassengerThreeName(e.target.value);
                  }}
                  className={`${
                    alignLeft === true
                      ? "text-4xl text-right flex flex-col items-end"
                      : "text-4xl text-right flex flex-col items-start"
                  }`}
                  required
                  placeholder={t("fullName")}
                  label={t("fullName")}
                  variant="default"
                  radius="md"
                  error={errorValue}
                  size="md"
                  withAsterisk
                />
                <Select
                  onChange={setPassengerThreeGender}
                  className={`${
                    alignLeft === true
                      ? "text-4xl text-right flex flex-col items-end"
                      : "text-4xl text-right flex flex-col items-start"
                  }`}
                  data={[t("man"), t("woman")]}
                  placeholder={t("gender")}
                  label={t("gender")}
                  error={errorValue}
                  variant="default"
                  radius="md"
                  withAsterisk
                  clearable
                  searchable
                  size="md"
                />
              </form>
            </div>
          ) : null}
          {passenger >= 4 ? (
            <div className=" border-2 border-dashed border-mainPurple  my-5 py-9 px-3 rounded-lg">
              <div
                className={`${
                  alignLeft === true
                    ? "w-full flex items-center justify-end"
                    : "w-full flex items-center justify-start"
                }`}
              >
                <h2 className="   items-center mb-4 py-1   rounded-full border-2 px-6 border-dashed border-mainPurple ">
                  {t("adultSupervisor")} <strong>4</strong> {t("supervisor")}
                </h2>
              </div>
              <form
                className={`${
                  alignLeft === true
                    ? "w-full h-full flex lg:flex-row flex-col  justify-center items-center space-x-4 px-6"
                    : "w-full h-full flex lg:flex-row flex-col  justify-center items-center space-x-4 px-6"
                }`}
              >
                {" "}
                {specific ? (
                  <NumberInput
                    onChange={(e) => {
                      setPassengerFourPassportCode(e);
                    }}
                    className={`${
                      alignLeft === true
                        ? "text-4xl text-right flex flex-col items-end"
                        : "text-4xl text-right flex flex-col items-start"
                    }`}
                    placeholder={t("passport")}
                    label={t("passport")}
                    hideControls
                    variant="default"
                    radius="md"
                    size="md"
                    withAsterisk
                    error={errorValue}
                  />
                ) : (
                  <div></div>
                )}
                <NumberInput
                  onChange={(e) => {
                    setPassengerFourSocialNumber(e);
                  }}
                  className={`${
                    alignLeft === true
                      ? "text-4xl text-right flex flex-col items-end"
                      : "text-4xl text-right flex flex-col items-start"
                  }`}
                  required
                  placeholder={t("idCode")}
                  label={t("idCode")}
                  hideControls
                  variant="default"
                  radius="md"
                  size="md"
                  withAsterisk
                  error={errorValue}
                />
                <NumberInput
                  onChange={(e) => {
                    setPassengerFourPhoneNumber(e);
                  }}
                  className={`${
                    alignLeft === true
                      ? "text-4xl text-right flex flex-col items-end"
                      : "text-4xl text-right flex flex-col items-start"
                  }`}
                  required
                  placeholder={t("phone")}
                  label={t("phone")}
                  hideControls
                  variant="default"
                  radius="md"
                  error={errorValue}
                  size="md"
                  withAsterisk
                />
                <TextInput
                  onChange={(e) => {
                    setPassengerFourName(e.target.value);
                  }}
                  className={`${
                    alignLeft === true
                      ? "text-4xl text-right flex flex-col items-end"
                      : "text-4xl text-right flex flex-col items-start"
                  }`}
                  required
                  placeholder={t("fullName")}
                  label={t("fullName")}
                  variant="default"
                  radius="md"
                  error={errorValue}
                  size="md"
                  withAsterisk
                />
                <Select
                  onChange={setPassengerFourGender}
                  className={`${
                    alignLeft === true
                      ? "text-4xl text-right flex flex-col items-end"
                      : "text-4xl text-right flex flex-col items-start"
                  }`}
                  data={[t("man"), t("woman")]}
                  placeholder={t("gender")}
                  label={t("gender")}
                  variant="default"
                  radius="md"
                  error={errorValue}
                  withAsterisk
                  clearable
                  searchable
                  size="md"
                />
              </form>
            </div>
          ) : null}
        </form>{" "}
        {alert ? (
          <Notification
            transition="fade"
            transitionDuration={600}
            transitionTimingFunction="ease"
            color="red"
            withCloseButton
            variant="outline"
          >
            <h1 className="text-sm text-center">{t("errorMsg")}</h1>
          </Notification>
        ) : (
          <div></div>
        )}
        <div className="w-full flex lg:flex-row flex-col-reverse   items-center justify-center  lg:justify-around">
          <button
            onClick={() => {
              dispatch(reservationActions.decreamentPassenger());
            }}
            className="px-4 rounded-md flex items-center justify-center lg:mb-0 mb-4 transition ease-in duration-300 hover:bg-mainWhite border-r-8 border-red-500  border  py-2 bg-white text-red-500 text-sm font-mainFont"
          >
            {t("removePassenger")}{" "}
            <Minus className="ml-2" size={20} weight="fill" />
          </button>
          <button
            onClick={() => {
              checkFields();
            }}
            className="px-4 rounded-md lg:self-end m-4 transition flex justify-center items-center ease-in duration-300 hover:text-white border-2 hover:bg-mainPurple border-r-8 border-mainBlue py-2 bg-white text-mainPurple text-sm font-mainFont"
          >
            {t("addPassenger")}
            <Plus className="ml-2" size={20} weight="fill" />
          </button>
        </div>
      </div>

      <div
        className={`${
          alignLeft === true
            ? "w-full h-auto lg:h-24 flex lg:flex-row flex-col-reverse text-right items-center justify-around py-2 lg:justify-between bg-white px-7"
            : "w-full h-auto lg:h-24 flex lg:flex-row-reverse text-left flex-col-reverse items-center justify-around py-2 lg:justify-between bg-white px-7"
        }`}
      >
        <TextInput
          className="text-4xl  flex flex-col items-end lg:mb-0 mb-5"
          placeholder={t("enterTime")}
          label={t("enterTime")}
          variant="default"
          radius="md"
          size="sm"
          withAsterisk
        />
        <h1 className="text-sm  lg:w-carousel lg:my-0 my-4">{t("ifLate")}</h1>
      </div>
    </div>
  );
}
