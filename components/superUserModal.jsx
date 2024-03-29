import { useState, useEffect } from "react";

import { Modal } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { useMediaQuery } from "@mantine/hooks";
import { supabase } from "../lib/supabaseClient";
import { Coffee, User, Tag, CheckFat } from "phosphor-react";
import { Loader } from "@mantine/core";
export default function SuperUserModal({ user }) {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState();
  async function getHotels() {
    if (user) {
      const { data: hotels, error } = await supabase
        .from("hotels")
        .select("id, title, prices,stars")
        .eq("owner", user.id);

      if (error) throw error;
      setHotels(hotels);
    }
  }

  async function updateRole() {
    if (user) {
      setLoading(true);
      const { error } = await supabase
        .from("profiles")
        .update({ role: "Colleage" })
        .eq("id", user.id);
      setDone(true);
    }
    setLoading(false);
  }
  async function downGradeRole() {
    if (user) {
      setLoading(true);
      const { error } = await supabase
        .from("profiles")
        .update({ role: "customer" })
        .eq("id", user.id);
      setDone(true);
    }
    setLoading(false);
  }
  const [alignLeft, setAlignLeft] = useState(false);

  const isMobile = useMediaQuery("(max-width: 50em)");

  const [opened, setOpened] = useState(false);
  const { t, i18n } = useTranslation("");
  const lng = i18n.language;

  async function changeAlignment() {
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
  useEffect(() => {
    changeAlignment();
    if (!hotels) {
      getHotels();
    }
  }, []);
  return (
    <>
      <Modal
        fullScreen={isMobile}
        centered
        size="650px"
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        exitTransitionDuration={600}
        opened={opened}
        onClose={() => setOpened(false)}
        className="text-right w-full flex justify-end"
      >
        {" "}
        <div className="h-full w-full flex items-center  p-4 flex-col space-y-6">
          <h2 className="text-2xl border-b-4 rounded-md border-mainBlue my-6 pb-2">
            {t("colleagueInfo")}
          </h2>
          <div className="flex   justify-center items-center lg:flex-row flex-col space-y-5 lg:space-y-0   space-x-0 lg:space-x-5 w-full ">
            <h2 className="py-1 rounded-md px-4 border-2     border-mainPurple">
              {t("fullName")} : <strong>{user ? user.fullName : null}</strong>
            </h2>
            <h2 className="py-1  lg:mb-2 rounded-md px-4 border-2 border-mainPurple">
              {t("email")} : <strong>{user ? user.email : null}</strong>
            </h2>
          </div>
          <div className="flex   justify-center items-center lg:flex-row flex-col space-y-5 lg:space-y-0   space-x-0 lg:space-x-5 w-full ">
            <h2 className="py-1   rounded-md px-4 border-2   border-mainBlue">
              {t("hotelCount")} :
              <strong>
                {hotels ? hotels.length : null} {t("singleHotel")}
              </strong>
            </h2>
            <h2 className="py-1   rounded-md px-4 border-2   border-mainBlue">
              {t("userType")} : <strong>{user ? user.role : null}</strong>
            </h2>
          </div>
          {user && user.role === "customer" ? (
            <button
              onClick={() => {
                updateRole();
              }}
              className="py-2 font-mainFont  hover:text-white bg-green-500 border-green-800 border-r-8   ease-in duration-300 hover:bg-green-900 transition rounded-lg  text-white   px-6   "
            >
              {loading ? (
                <Loader color="violet" size="sm" />
              ) : done ? (
                <p>{t("done")}</p>
              ) : (
                t("addAdmin")
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                downGradeRole();
              }}
              className="py-2 font-mainFont  hover:text-white bg-red-500 border-red-800 border-r-8   ease-in duration-300 hover:bg-red-900 transition rounded-lg  text-white   px-6   "
            >
              {loading ? (
                <Loader color="violet" size="sm" />
              ) : done ? (
                <p>{t("done")}</p>
              ) : (
                <p>{t("deleteCol")}</p>
              )}
            </button>
          )}
          <div className="w-full h-auto flex items-center flex-col">
            <h2 className="text-xl border-b-4 rounded-md border-mainBlue my-6 pb-2">
              {t("hotels")}
            </h2>
            {hotels ? (
              hotels.map((hotel) => {
                return (
                  <div
                    key={hotel.id}
                    className="flex border lg:flex-row flex-col-reverse border-gray-300 bg-white justify-around divide-x my-5 divide-gray-300 rounded-md w-full h-full lg:h-44"
                  >
                    <div className="h-full w-full lg:w-1/4 flex flex-col items-center justify-around py-8 ">
                      <div className="flex space-x-1 p-2 justify-center items-center">
                        <h2 className="text-xs">{t("currency")}</h2>
                        <h2 className="  text-lg text-mainPurple">
                          {alignLeft ? (
                            <p> {hotel.prices}</p>
                          ) : (
                            <p> {hotel.pricesL}</p>
                          )}
                        </h2>
                      </div>
                      <h2 className="text-sm">{t("price1Night")}</h2>
                      <button className="py-2 font-mainFont  hover:text-white bg-mainPurple border-mainBlue border-r-8   ease-in duration-300 hover:bg-mainBlue transition rounded-lg  text-white my-5 px-6   ">
                        {t("seeHotel")}
                      </button>
                    </div>
                    <div className="h-full flex flex-col items-end justify-start  p-4 w-full lg:w-3/4  ">
                      <div className="h-14 w-full flex items-start  justify-end ">
                        <h2 className="text-2xl my-2">{hotel.title}</h2>
                      </div>

                      <div className="flex flex-col items-end justify-center space-y-3   h-full">
                        <h2 className="flex items-center  text-sm">
                          {t("roomMeal")}
                          <Coffee className="ml-2" size={19} weight="fill" />
                        </h2>
                        <h2 className="flex items-center  text-sm">
                          {t("person")} 1
                          <User className="ml-2" size={19} weight="fill" />
                        </h2>
                        <h2 className="flex items-center  text-sm">
                          {alignLeft ? (
                            <p className="text-2xl "> {hotel.prices}</p>
                          ) : (
                            <p className="text-2xl "> {hotel.pricesL}</p>
                          )}
                          {t("currency")}
                          <Tag className="ml-2" size={19} weight="fill" />
                        </h2>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="p-3 text-2xl border-2 border-dashed border-red-600 rounded-md">
                {t("nothing")}
              </p>
            )}
          </div>
        </div>
      </Modal>

      <button
        onClick={() => {
          setOpened(true);
        }}
        className="py-1 font-mainFont  hover:text-white bg-mainPurple border-mainBlue border-r-8   ease-in duration-300 hover:bg-mainBlue transition rounded-lg  text-white  px-8   "
      >
        <p>{t("details")}</p>
      </button>
    </>
  );
}
