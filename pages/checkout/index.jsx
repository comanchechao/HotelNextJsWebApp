import Navbar from "../../components/Navbar";
import { useState } from "react";
import { Stepper } from "@mantine/core";
import {
  Users,
  Buildings,
  Files,
  Money,
  ClosedCaptioning,
} from "phosphor-react";
import PassengerInfo from "./passengerInfo";
import Link from "next/link";
import InfoConfirmation from "./infoConfirmation";
export default function Checkout() {
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <div className="w-screen  h-auto bg-gray-200">
      <Navbar />
      <div className="w-screen h-full flex-col text-right flex items-center pt-24 justify-center ">
        <Stepper
          color="violet"
          size="lg"
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
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
            <PassengerInfo />
          </Stepper.Step>
          <Stepper.Step icon={<Files size={28} />} label="تایید اطلاعات">
            <InfoConfirmation />
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
        <div className="h-24 w-full bg-white flex px-7 items-center justify-around">
          <button
            onClick={nextStep}
            className="px-14 rounded-full transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-lg font-mainFont"
          >
            تایید و ادامه ی خرید
          </button>
          <h3>
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
