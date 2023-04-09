import { Loader, Select, Notification } from "@mantine/core";
import dynamic from "next/dynamic.js";
import { useEffect, useState } from "react";
import IRCities from "../assets/cities/ir";
import TRCities from "../assets/cities/tr";
import { supabase } from "../lib/supabaseClient";
import { useTranslation } from "next-i18next";

export default function WebsiteInfo({ cities }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [alignLeft, setAlignLeft] = useState(false);
  async function changeAlignment() {
    if (lang === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
  useEffect(() => {
    changeAlignment();
  }, [lang]);
  const DisplayCities = dynamic(() => import("./displayMap"), {
    ssr: false,
    suspense: true,
  });
  const [country, setCountry] = useState("iran");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [searchValue, onSearchChange] = useState("");
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    IRCities.forEach((city) => {
      if (city.value === value) {
        setLat(city.lat);
        setLng(city.lng);
      }
    });
  }, [value]);

  useEffect(() => {
    TRCities.forEach((city) => {
      if (city.value === value) {
        setLat(city.latitude);
        setLng(city.longitude);
      }
    });
  }, [value]);

  async function addCity() {
    setLoading(true);
    const { error } = await supabase.from("cities").insert({
      name: value,
      lat: lat,
      lng: lng,
      country: country,
    });
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center  w-screen h-screen  ">
      <div className="py-10 overflow-y-scroll space-y-10 w-full h-full   px-14 bg-white flex flex-col items-center justify-center">
        <h1 className="border-b-4 pb-4 border-mainBlue my-3">{t("addCity")}</h1>
        <DisplayCities
          className="w-full h-full z-10"
          LatLng={[lat, lng]}
          cities={cities}
        />
        <div className="flex justify-center lg:flex-row flex-col items-center w-full h-full">
          {country === t("iran") ? (
            <Select
              value={value}
              onChange={(e) => {
                setValue(e);
                console.log(e);
              }}
              onSearchChange={onSearchChange}
              searchValue={searchValue}
              label={t("enterCity")}
              placeholder={t("hotelCity")}
              searchable
              nothingFound="No options"
              dropdownPosition="bottom"
              data={IRCities}
              transitionDuration={150}
              transition="pop-top-left"
              transitionTimingFunction="ease"
              variant="default"
              className="text-2xl   mx-6 text-right flex flex-col items-end"
              radius="md"
              withAsterisk
              clearable
              size="md"
            />
          ) : (
            <Select
              value={value}
              onChange={setValue}
              label={t("enterCity")}
              placeholder={t("hotelCity")}
              searchable
              nothingFound="No options"
              dropdownPosition="bottom"
              data={TRCities}
              transitionDuration={150}
              transition="pop-top-left"
              transitionTimingFunction="ease"
              variant="default"
              className="text-2xl z-50 mx-6 text-right flex flex-col items-end"
              radius="md"
              withAsterisk
              clearable
              size="md"
            />
          )}
          <Select
            searchable
            transitionDuration={150}
            transition="pop-top-left"
            transitionTimingFunction="ease"
            variant="default"
            className="text-2xl   mx-6 text-right flex flex-col items-end"
            radius="md"
            dropdownPosition="bottom"
            withAsterisk
            clearable
            size="md"
            label={t("enterCountry")}
            placeholder={t("enterCountry")}
            onChange={setCountry}
            value={country}
            data={[
              { value: t("turkey"), label: t("turkey") },
              { value: t("iran"), label: t("iran") },
            ]}
          />
        </div>
        <div className="flex space-y-4 flex-col items-center w-full justify-center">
          <div className="flex w-auto justfy-center space-x-5">
            <p className=" bg-mainBlue border-2 rounded-md border-dashed border-mainPurple px-4">
              {value}
            </p>{" "}
            <h2> : {t("chosenCity")}</h2>
          </div>
          <div className="flex justify-center">
            {alert ? (
              <Notification
                transition="fade"
                transitionDuration={600}
                transitionTimingFunction="ease"
                color="green"
                withCloseButton
                variant="outline"
              >
                <h1 className="text-2xl text-center">{t("addCitySuccess")}</h1>
              </Notification>
            ) : (
              <button
                className="px-14 rounded-md transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-lg font-mainFont"
                onClick={() => {
                  addCity();
                }}
              >
                {loading ? (
                  <Loader size="sm" color="yellow" variant="bars" />
                ) : (
                  <p> {t("confirmChanges")}</p>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
