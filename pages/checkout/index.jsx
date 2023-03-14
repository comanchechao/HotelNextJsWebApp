import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { Stepper, StepperProps } from "@mantine/core";
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
import { useTranslation } from "next-i18next";

function StyledStepper(props) {
  return (
    <Stepper
      styles={{
        stepBody: {
          display: "flex",
          "@media (max-width: 600px)": {
            display: "none",
          },
        },

        step: {
          padding: 10,
          "@media (max-width: 600px)": {
            padding: 15,
          },
        },

        stepIcon: {
          borderWidth: 2,
        },

        separator: {
          marginLeft: -2,
          marginRight: -2,
          height: 10,
          "@media (max-width: 600px)": {
            display: "none",
          },
        },
      }}
      {...props}
    />
  );
}
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function Checkout(props) {
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

  // getting and setting reservation info

  let room = useSelector((state) => state.reserve.room);

  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <div className="w-screen flex items-center justify-start flex-col  h-auto bg-gray-100">
      <Navbar />
      <div className="w-screen h-full flex-col text-right flex items-center p-10  lg:px-0 pt-36 justify-center ">
        <StyledStepper
          color="yellow"
          size="lg"
          active={active}
          onStepClick={setActive}
          iconSize={47}
          breakpoint="md"
        >
          <Stepper.Step
            icon={<Buildings size={28} />}
            label={t("hotelPick")}
          ></Stepper.Step>
          <Stepper.Step
            size="xl"
            icon={<Users size={28} />}
            label={t("passengerInfo")}
          >
            <div className="flex items-center justify-center">
              <PassengerInfo />
            </div>
          </Stepper.Step>
          <Stepper.Step icon={<Files size={28} />} label={t("confirmInfo")}>
            <div className="flex items-center justify-center">
              <InfoConfirmation />
            </div>
          </Stepper.Step>
          <Stepper.Step icon={<Money size={28} />} label={t("payment")}>
            Step 3 content: Get full access
          </Stepper.Step>
          <Stepper.Step
            icon={<ClosedCaptioning size={28} />}
            label={t("voucher")}
          >
            Step 3 content: Get full access
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </StyledStepper>
        <div className=" h-44 lg:space-y-0  lg:flex-row flex-col-reverse lg:h-24 w-full bg-white flex lg:px-7 items-center justify-center lg:justify-around">
          <button
            onClick={nextStep}
            className="px-14 rounded-md transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-lg font-mainFont"
          >
            {t("confirmToNext")}
          </button>
          <h3 className="lg:text-right text-center my-3">
            {t("confirmRules")}
            <Link className=" underline text-Indigo-500 mx-1" href="/">
              {t("hotelRules")}
            </Link>
            و
            <Link className=" underline text-Indigo-500 mx-1" href="/">
              {t("websiteRules")}
            </Link>
            {t("ifYouClick")}
          </h3>
        </div>
      </div>
    </div>
  );
}
