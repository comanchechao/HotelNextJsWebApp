import { Select, TextInput } from "@mantine/core";
import { Star, SignIn, SignOut, Bed, Plus, Minus } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reservationActions } from "../store/reservation";

export default function PassengerInfo() {
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
  const [passengerTwoName, setPassengerTwoName] = useState("");
  const [passengerTwoPhoneNumber, setPassengerTwoPhoneNumber] = useState("");
  const [passengerTwoSocialNumber, setPassengerTwoSocialNumber] = useState("");
  const [passengerTwoGender, setPassengerTwoGender] = useState(null);
  const [passengerThreeName, setPassengerThreeName] = useState("");
  const [passengerThreePhoneNumber, setPassengerThreePhoneNumber] =
    useState("");
  const [passengerThreeSocialNumber, setPassengerThreeSocialNumber] =
    useState("");
  const [passengerThreeGender, setPassengerThreeGender] = useState(null);
  const [passengerFourName, setPassengerFourName] = useState("");
  const [passengerFourPhoneNumber, setPassengerFourPhoneNumber] = useState("");
  const [passengerFourSocialNumber, setPassengerFourSocialNumber] =
    useState("");
  const [passengerFourGender, setPassengerFourGender] = useState(null);

  useEffect(() => {
    dispatch(
      reservationActions.setPassengerOne({
        passengerOneName,
        passengerOnePhoneNumber,
        passengerOneSocialNumber,
        passengerOneGender,
      })
    );
  }, [
    passengerOneName,
    passengerOnePhoneNumber,
    passengerOneSocialNumber,
    passengerOneGender,
    dispatch,
  ]);
  useEffect(() => {
    dispatch(
      reservationActions.setPassengerTwo({
        passengerTwoName,
        passengerTwoPhoneNumber,
        passengerTwoSocialNumber,
        passengerTwoGender,
      })
    );
  }, [
    passengerTwoName,
    passengerTwoPhoneNumber,
    passengerTwoSocialNumber,
    passengerTwoGender,
    dispatch,
  ]);
  useEffect(() => {
    dispatch(
      reservationActions.setPassengerThree({
        passengerThreeName,
        passengerThreePhoneNumber,
        passengerThreeSocialNumber,
        passengerThreeGender,
      })
    );
  }, [
    passengerThreeName,
    passengerThreePhoneNumber,
    passengerThreeSocialNumber,
    passengerThreeGender,
    dispatch,
  ]);
  useEffect(() => {
    dispatch(
      reservationActions.setPassengerFour({
        passengerFourName,
        passengerFourPhoneNumber,
        passengerFourSocialNumber,
        passengerFourGender,
      })
    );
  }, [
    passengerFourName,
    passengerFourPhoneNumber,
    passengerFourSocialNumber,
    passengerFourGender,
    dispatch,
  ]);
  return (
    <div className=" mb-10 h-auto lg:h-full w-screen lg:w-textArea flex mt-5 flex-col items-center space-y-7 lg:px-0 px-6">
      <div className=" h-auto lg:h-24 w-full bg-white divide-x-2 flex">
        <div className="h-full w-1/2 flex lg:flex-row flex-col items-center justify-center ">
          <div className="h-full w-1/2 flex my-4 lg:my-0 flex-col items-center justify-center">
            <div className="flex items-center space-x-2">
              <h2>تاریخ خروج</h2>
              <SignOut size={40} color="#e0ab19" weight="fill" />
            </div>
            <h1 className="font text-lg">
              {JSON.stringify(enterDate)} - ساعت 12:00:00
            </h1>
          </div>
          <div className="h-full w-1/2 flex my-4 lg:my-0 flex-col justify-center items-center">
            <div className="flex items-center space-x-2">
              <h2>تاریخ ورود</h2>
              <SignIn size={40} color="#e0ab19" weight="fill" />
            </div>
            <h1 className="font text-lg">1401/11/05 - ساعت 14:00:00</h1>
          </div>
        </div>
        <div className="h-full w-1/2 px-5 lg:px-3 p-3 flex flex-col justify-center items-center lg:items-end lg:justify-start space-y-3">
          <div className="flex items-center space-x-4">
            <h2 className="flex items-center">
              {hotelInfo.stars} ستاره
              <Star className="mx-2" size={19} color="#e0ab19" weight="fill" />
            </h2>
            <h1 className="text-xl font-bold">هتل {hotelInfo.title}</h1>
          </div>
          <h2>آدرس: پارک وی- ابتدای اتوبان چمران</h2>
        </div>
      </div>
      <div className=" h-full lg:h-full w-full my-6 bg-white flex flex-col items-center">
        <div className="h-20 w-full flex items-end justify-start    flex-col  px-9 py-3">
          <h1 className="text-2xl font-bold items-center flex">
            اتاق اول
            <Bed className="ml-3" size={45} color="#e0ab19" weight="fill" />
          </h1>
          <div className="flex items-center space-x-6">
            <h3 className="font-bold">1 بزرگسال</h3>
            <h3>وعده {room.meal}</h3>
            <h2 className="text-md font-bold">اتاق {room.title}</h2>
          </div>
        </div>
        {passenger}
        <form className="h-full    space-y-9 my-10 w-full    flex items-start flex-col px-9">
          {passenger >= 1 ? (
            <div className="  border-2 border-dashed border-mainPurple  my-5 py-6 px-3 rounded-lg">
              <div className="w-full flex items-center justify-end">
                <h2 className="   items-center mb-4 py-1   rounded-full border-2 px-6 border-dashed border-mainPurple ">
                  بزرگسال 1- سرپرست
                </h2>
              </div>
              <div className="w-full h-full flex lg:flex-row flex-col  justify-center items-center space-x-4 px-6">
                <TextInput
                  onChange={(e) => {
                    setPassengerOneSocialNumber(e.target.value);
                  }}
                  className="text-4xl text-right flex flex-col items-end"
                  placeholder="کد ملی"
                  label="کد ملی"
                  variant="default"
                  radius="md"
                  size="md"
                  withAsterisk
                />
                <TextInput
                  onChange={(e) => {
                    setPassengerOnePhoneNumber(e.target.value);
                  }}
                  className="text-4xl text-right flex flex-col items-end"
                  placeholder="شماره تلفن"
                  label="شماره تلفن"
                  variant="default"
                  radius="md"
                  size="md"
                  withAsterisk
                />
                <TextInput
                  onChange={(e) => {
                    setPassengerOneName(e.target.value);
                  }}
                  className="text-4xl text-right flex flex-col items-end"
                  placeholder="نام کامل"
                  label="نام"
                  variant="default"
                  radius="md"
                  size="md"
                  withAsterisk
                />
                <Select
                  onChange={setPassengerOneGender}
                  className="text-2xl mx-6 text-right flex flex-col items-end"
                  data={["مرد", "زن"]}
                  placeholder="جنسیت مسافر "
                  label="جنسیت"
                  variant="default"
                  radius="md"
                  withAsterisk
                  clearable
                  searchable
                  size="md"
                />
              </div>
            </div>
          ) : null}
          {passenger >= 2 ? (
            <div className="border-2 border-dashed border-mainPurple  my-5 py-9 px-3 rounded-lg">
              <h2 className="items-center mb-4 py-1 font-bold rounded-full  ">
                بزرگسال2 - سرپرست
              </h2>
              <div className="w-full h-full flex lg:flex-row flex-col  justify-center items-center space-x-4 px-6">
                <TextInput
                  onChange={(e) => {
                    setPassengerTwoSocialNumber(e.target.value);
                  }}
                  className="text-4xl text-right flex flex-col items-end"
                  placeholder="کد ملی"
                  label="کد ملی"
                  variant="default"
                  radius="md"
                  size="md"
                  withAsterisk
                />
                <TextInput
                  onChange={(e) => {
                    setPassengerTwoPhoneNumber(e.target.value);
                  }}
                  className="text-4xl text-right flex flex-col items-end"
                  placeholder="شماره تلفن"
                  label="شماره تلفن"
                  variant="default"
                  radius="md"
                  size="md"
                  withAsterisk
                />
                <TextInput
                  onChange={(e) => {
                    setPassengerTwoName(e.target.value);
                  }}
                  className="text-4xl text-right flex flex-col items-end"
                  placeholder="نام کامل"
                  label="نام"
                  variant="default"
                  radius="md"
                  size="md"
                  withAsterisk
                />
                <Select
                  onChange={setPassengerTwoGender}
                  className="text-2xl mx-6 text-right flex flex-col items-end"
                  data={["مرد", "زن"]}
                  placeholder="جنسیت مسافر "
                  label="جنسیت"
                  variant="default"
                  radius="md"
                  withAsterisk
                  clearable
                  searchable
                  size="md"
                />
              </div>
            </div>
          ) : null}
          {passenger >= 3 ? (
            <div className="border-2 border-dashed border-mainPurple  my-5 py-9 px-3 rounded-lg">
              <h2 className="items-center mb-4 py-1 font-bold rounded-full  ">
                بزرگسال3 - سرپرست
              </h2>
              <div className="w-full h-full flex lg:flex-row flex-col  justify-center items-center space-x-4 px-6">
                <TextInput
                  onChange={(e) => {
                    setPassengerThreeSocialNumber(e.target.value);
                  }}
                  className="text-4xl text-right flex flex-col items-end"
                  placeholder="کد ملی"
                  label="کد ملی"
                  variant="default"
                  radius="md"
                  size="md"
                  withAsterisk
                />
                <TextInput
                  onChange={(e) => {
                    setPassengerThreePhoneNumber(e.target.value);
                  }}
                  className="text-4xl text-right flex flex-col items-end"
                  placeholder="شماره تلفن"
                  label="شماره تلفن"
                  variant="default"
                  radius="md"
                  size="md"
                  withAsterisk
                />

                <TextInput
                  onChange={(e) => {
                    setPassengerThreeName(e.target.value);
                  }}
                  className="text-4xl text-right flex flex-col items-end"
                  placeholder="نام کامل"
                  label="نام"
                  variant="default"
                  radius="md"
                  size="md"
                  withAsterisk
                />
                <Select
                  onChange={setPassengerThreeGender}
                  className="text-2xl mx-6 text-right flex flex-col items-end"
                  data={["مرد", "زن"]}
                  placeholder="جنسیت مسافر "
                  label="جنسیت"
                  variant="default"
                  radius="md"
                  withAsterisk
                  clearable
                  searchable
                  size="md"
                />
              </div>
            </div>
          ) : null}
          {passenger >= 4 ? (
            <div className="border-2 border-dashed border-mainPurple  my-5 py-9 px-3 rounded-lg">
              <h2 className="items-center mb-4 py-1 font-bold rounded-full  ">
                بزرگسال 4- سرپرست
              </h2>
              <div className="w-full h-full flex lg:flex-row flex-col  justify-center items-center space-x-4 px-6">
                <TextInput
                  onChange={(e) => {
                    setPassengerFourSocialNumber(e.target.value);
                  }}
                  className="text-4xl text-right flex flex-col items-end"
                  placeholder="کد ملی"
                  label="کد ملی"
                  variant="default"
                  radius="md"
                  size="md"
                  withAsterisk
                />
                <TextInput
                  onChange={(e) => {
                    setPassengerFourPhoneNumber(e.target.value);
                  }}
                  className="text-4xl text-right flex flex-col items-end"
                  placeholder="شماره تلفن"
                  label="شماره تلفن"
                  variant="default"
                  radius="md"
                  size="md"
                  withAsterisk
                />

                <TextInput
                  onChange={(e) => {
                    setPassengerFourName(e.target.value);
                  }}
                  className="text-4xl text-right flex flex-col items-end"
                  placeholder="نام کامل"
                  label="نام"
                  variant="default"
                  radius="md"
                  size="md"
                  withAsterisk
                />
                <Select
                  onChange={setPassengerFourGender}
                  className="text-2xl mx-6 text-right flex flex-col items-end"
                  data={["مرد", "زن"]}
                  placeholder="جنسیت مسافر "
                  label="جنسیت"
                  variant="default"
                  radius="md"
                  withAsterisk
                  clearable
                  searchable
                  size="md"
                />
              </div>
            </div>
          ) : null}
        </form>
        <div className="w-full flex items-center justify-around">
          <button
            onClick={() => {
              dispatch(reservationActions.decreamentPassenger());
            }}
            className="px-4 rounded-lg flex items-center justify-center transition ease-in duration-300 hover:bg-gray-200 border-r-8 border-red-500  border  py-2 bg-white text-red-500 text-sm font-mainFont"
          >
            پاک کردن
            <Minus className="ml-2" size={20} weight="fill" />
          </button>
          <button
            onClick={() => {
              dispatch(reservationActions.increasePassenger());
            }}
            className="px-4 rounded-lg self-end m-4 transition flex justify-center items-center ease-in duration-300 hover:text-white border-2 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-white text-mainPurple text-sm font-mainFont"
          >
            اضافه کردن مسافر
            <Plus className="ml-2" size={20} weight="fill" />
          </button>
        </div>
      </div>

      <div className="w-full h-auto lg:h-24 flex lg:flex-row flex-col-reverse items-center justify-around py-2 lg:justify-between bg-white px-7">
        <TextInput
          className="text-4xl text-right flex flex-col items-end lg:mb-0 mb-5"
          placeholder="ساعت ورود"
          label="ساعت ورود"
          variant="default"
          radius="md"
          size="sm"
          withAsterisk
        />
        <h1 className="text-sm  lg:w-carousel lg:my-0 my-4">
          در صورتی که زمان ورود شما به هتل پس از ساعت ۸ شب به وقت مقصد میباشد،
          لطفا ساعات ورود خود را به هتل انتخاب کنید، در غیر اینصورت بوتک
          هیچ‌گونه مسولیتی در خصوص لغو یا کنسلی هتل نمی‌پذیرد
        </h1>
      </div>
    </div>
  );
}
