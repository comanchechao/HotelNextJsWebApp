import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { Stepper } from "@mantine/core";
import {
  Users,
  Buildings,
  Files,
  Money,
  ClosedCaptioning,
} from "phosphor-react";
import PassengerInfo from "../../components/passengerInfo";
import Link from "next/link";
import InfoConfirmation from "../../components/infoConfirmation";
import { useSelector } from "react-redux";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
export default function Checkout(props) {
  // getting and setting reservation info

  let room = useSelector((state) => state.reserve.room);

  useEffect(() => {
    console.log(room);
  });
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <div className="w-screen flex items-center justify-start flex-col  h-auto bg-gray-200">
      <Navbar />
      <div className="w-screen h-full flex-col text-right flex items-center p-10  lg:px-0 pt-36 justify-center ">
        <Stepper
          color="yellow"
          size="lg"
          active={active}
          onStepClick={setActive}
          iconSize={47}
        >
          <Stepper.Step icon={<Buildings size={28} />} label="انتخاب هتل">
            Step 1 content: Create an account
          </Stepper.Step>
          <Stepper.Step
            size="xl"
            icon={<Users size={28} />}
            label="مشخصات مسافران"
          >
            <div className="flex items-center justify-center">
              <PassengerInfo />
            </div>
          </Stepper.Step>
          <Stepper.Step icon={<Files size={28} />} label="تایید اطلاعات">
            <div className="flex items-center justify-center">
              <InfoConfirmation />
            </div>
          </Stepper.Step>
          <Stepper.Step icon={<Money size={28} />} label="پرداخت">
            Step 3 content: Get full access
          </Stepper.Step>
          <Stepper.Step icon={<ClosedCaptioning size={28} />} label="صدور واچر">
            Step 3 content: Get full access
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
        <div className=" h-44 lg:space-y-0  lg:flex-row flex-col-reverse lg:h-24 w-full bg-white flex lg:px-7 items-center justify-center lg:justify-around">
          <button
            onClick={nextStep}
            className="px-14 rounded-md transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-lg font-mainFont"
          >
            تایید و ادامه ی خرید
          </button>
          <h3 className="lg:text-right text-center my-3">
            با کلیک روی تایید و ادامه خرید با
            <Link className=" underline text-Indigo-500 mx-1" href="/">
              قوانین سایت
            </Link>
            و
            <Link className=" underline text-Indigo-500 mx-1" href="/">
              قوانین هتل
            </Link>
            موافقت کرده‌اید
          </h3>
        </div>
      </div>
    </div>
  );
}
