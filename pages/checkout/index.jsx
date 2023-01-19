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

export default function Checkout() {
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <div className="w-screen h-screen bg-gray-200">
      <Navbar />
      <div className="w-full text-right h-auto bg-white flex items-start pt-44 justify-center ">
        <Stepper
          color="violet"
          size="md"
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          iconSize={47}
        >
          <Stepper.Step icon={<Buildings size={28} />} label="انتخاب هتل">
            Step 1 content: Create an account
          </Stepper.Step>
          <Stepper.Step icon={<Users size={28} />} label="مشخصات مسافران">
            Step 2 content: Verify email
          </Stepper.Step>
          <Stepper.Step icon={<Files size={28} />} label="تایید اطلاعات">
            Step 3 content: Get full access
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
      </div>
    </div>
  );
}
