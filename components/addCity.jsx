import { Loader, Select } from "@mantine/core";
import dynamic from "next/dynamic.js";
import { useEffect, useState } from "react";
import IRCities from "../assets/cities/ir";
import { supabase } from "../lib/supabaseClient";
import { Suspense } from "react";

export default function WebsiteInfo({ cities }) {
  const DisplayCities = dynamic(() => import("./displayMap"), {
    ssr: false,
    suspense: true,
  });
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [searchValue, onSearchChange] = useState("");

  useEffect(() => {
    IRCities.forEach((city) => {
      if (city.value === value) {
        setLat(city.lat);
        setLng(city.lng);
      }
    });
  }, [value]);

  async function addCity() {
    setLoading(true);
    const { error } = await supabase.from("cities").insert({
      name: value,
      lat: lat,
      lng: lng,
    });
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center  w-full h-full  ">
      <div className="py-20 overflow-y-scroll w-full h-full   px-14 bg-white flex flex-col items-center justify-center">
        <h1 className="border-b-4 pb-4 border-mainBlue my-3">افزودن شهر</h1>
        <DisplayCities className="z-10" LatLng={[lat, lng]} cities={cities} />
        <div className="flex">
          <Select
            label="Your favorite framework/library"
            placeholder="Pick one"
            onChange={setCountry}
            value={country}
            data={[
              { value: "turkey", label: "turkey" },
              { value: "iran", label: "iran" },
            ]}
          />
        </div>
        <div className="flex justify-center items-center w-full h-full">
          <Select
            value={value}
            onChange={setValue}
            onSearchChange={onSearchChange}
            searchValue={searchValue}
            label="یک شهر رو انتخاب کنید"
            placeholder="انتخاب شهر"
            searchable
            nothingFound="No options"
            dropdownPosition="bottom"
            data={IRCities}
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
        </div>
        <div className="flex space-y-4 flex-col items-center w-full justify-center">
          <div className="flex w-52 justfy-center border-b-4 border-mainBlue">
            <p className=" px-4">{value}</p>: <h2>شهر انتخاب شده</h2>
          </div>
          <div className="flex justify-center">
            <button
              className="px-14 rounded-md transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-lg font-mainFont"
              onClick={() => {
                addCity();
              }}
            >
              {loading ? (
                <Loader size="sm" color="yellow" variant="bars" />
              ) : (
                <p> ثبت شهر</p>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
