import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { supabase } from "../lib/supabaseClient";
import { useMediaQuery } from "@mantine/hooks";
import { Coffee, User, Tag } from "phosphor-react";
import { Loader } from "@mantine/core";
import { Modal } from "@mantine/core";

export default function SuperUserValidation({ user }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  const [done, setDone] = useState(false);
  async function getHotels() {
    if (user) {
      const { data: hotels, error } = await supabase
        .from("hotels")
        .select("id, title, prices,stars , validated , rejected")
        .eq("owner", user.id, "validated", false);

      if (error) throw error;
      setHotels(hotels);
    }
  }
  useEffect(() => {
    getHotels();
  }, []);

  useEffect(() => {
    if (hotels.length) {
      hotels.forEach((hotel) => {
        if (hotel.validated === false && hotel.rejected !== true) {
          setConfirmed(true);
        }
      });
    }
  }, [hotels]);
  const isMobile = useMediaQuery("(max-width: 50em)");

  const [opened, setOpened] = useState(false);
  const { t, i18n } = useTranslation("");
  const [alignLeft, setAlignLeft] = useState();
  const [confirmed, setConfirmed] = useState(false);

  const lng = i18n.language;

  async function changeAlignment() {
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }

  async function confirmHotel(id) {
    if (user) {
      setLoading(true);
      const { error } = await supabase
        .from("hotels")
        .update({ validated: true })
        .eq("id", id)
        .select();
      if (error) throw error;
      setDone(true);
    }
    setLoading(false);
  }

  async function rejectHotel(id) {
    if (user) {
      setLoading(true);
      const { error } = await supabase
        .from("hotels")
        .update({ rejected: true })
        .eq("id", id)
        .select();
      if (error) throw error;
      setDone(true);
    }
    setLoading(false);
  }
  useEffect(() => {
    changeAlignment();
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
        <div className="h-full w-full flex items-center  p-4 flex-col space-y-6">
          <div className="w-full h-auto flex items-center flex-col">
            <h2 className="text-xl border-b-4 rounded-md border-mainBlue my-6 pb-2">
              {t("needConfirmHotel")}
            </h2>
            <div className="flex flex-col w-full  ">
              {hotels.map((hotel, i) => {
                if (hotel.validated === false && hotel.rejected === false) {
                  return (
                    <div
                      key={i}
                      className="flex border lg:flex-row flex-col-reverse border-gray-300 bg-white justify-around divide-x my-5 divide-gray-300 rounded-md w-full h-full lg:h-44"
                    >
                      <div className="h-full w-full lg:w-1/3 flex flex-col items-center justify-around py-8 ">
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

                        <div className="flex items-center flex-col justify-center space-y-3 mt-2">
                          <button
                            onClick={() => {
                              confirmHotel(hotel.id);
                            }}
                            className="py-2 font-mainFont  hover:text-white bg-green-500 border-green-800 border-r-8   ease-in duration-300 hover:bg-green-900 transition rounded-lg  text-white   px-6   "
                          >
                            {loading ? (
                              <Loader color="violet" size="sm" />
                            ) : done ? (
                              <p>{t("done")}</p>
                            ) : (
                              t("confirmHotel")
                            )}
                          </button>{" "}
                          <button
                            onClick={() => {
                              rejectHotel(hotel.id);
                            }}
                            className="py-2 font-mainFont  hover:text-white bg-red-500 border-red-800 border-r-8   ease-in duration-300 hover:bg-red-900 transition rounded-lg  text-white px-6   "
                          >
                            {loading ? (
                              <Loader color="violet" size="sm" />
                            ) : done ? (
                              <p>{t("done")}</p>
                            ) : (
                              t("declineHotel")
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="h-full flex flex-col items-end justify-start  p-4 w-full lg:w-2/3  ">
                        <div className="h-14 w-full flex items-start  justify-end ">
                          <h2 className="text-2xl my-2">{hotel.title}</h2>
                        </div>

                        <div className="flex flex-col items-end justify-center space-y-3   h-full">
                          <h2 className="flex items-center  text-sm">
                            {t("roomMeal")}
                            <Coffee className="ml-2" size={19} weight="fill" />
                          </h2>
                          <h2 className="flex items-center  text-sm">
                            {t("stars")} {hotel.stars}
                            <User className="ml-2" size={19} weight="fill" />
                          </h2>
                          <h2 className="flex items-center  text-sm">
                            {t("price1Night")} :
                            {alignLeft ? (
                              <p> {hotel.prices}</p>
                            ) : (
                              <p> {hotel.pricesL}</p>
                            )}
                            {t("currency")}
                            <Tag className="ml-2" size={19} weight="fill" />
                          </h2>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </Modal>
      {confirmed ? (
        <button
          onClick={() => {
            setOpened(true);
          }}
          className="  font-mainFont  hover:text-white bg-transparent border-red-500 border-2 border-dashed   ease-in duration-300 hover:bg-red-600 transition rounded-lg  text-mainPurple  px-6   "
        >
          <p>{t("needsConfirm")}</p>
        </button>
      ) : (
        <button
          onClick={() => {
            setOpened(true);
          }}
          className="  font-mainFont  hover:text-white bg-transparent border-green-500 border-2 border-dashed   ease-in duration-300 hover:bg-green-600 transition rounded-lg  text-mainPurple  px-6   "
        >
          <p>{t("confirmed")}</p>
        </button>
      )}
    </>
  );
}
