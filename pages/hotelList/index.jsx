import Navbar from "../../components/Navbar";
import Link from "next/link";
import { CaretLeft } from "phosphor-react";
import HotelCard from "../../components/hotelCard";
import { Skeleton, Pagination, Loader } from "@mantine/core";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { useTranslation } from "next-i18next";

import { Suspense } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HotelListMenu from "../../components/hotelListMenu";
export async function getServerSideProps({ locale }) {
  // Fetch data from the database

  const { data, error } = await supabase.from("features").select();
  const { data: residenceTypes } = await supabase
    .from("residenceTypes")
    .select();
  return {
    props: {
      features: data,
      residenceTypes: residenceTypes,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function HotelList({ features, residenceTypes }) {
  const [filters, setFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [to, setTo] = useState(4);
  const [ascention, setAscention] = useState("");
  const [hotels, setHotels] = useState([]);
  const [order, setOrder] = useState("");
  const [alignLeft, setAlignLeft] = useState(false);

  const { t, i18n } = useTranslation("common");
  const lng = i18n.language;

  const [from, setFrom] = useState(1);
  // dynamic imports
  const HotelListModal = dynamic(
    () => import("../../components/hotelListModal"),
    {
      suspense: false,
    }
  );
  async function changeAlignment() {
    console.log(lng);
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
  const Footer = dynamic(() => import("../../components/Footer"), {
    suspense: false,
  });

  const [filteredHotels, setFilteredHotels] = useState([]);

  let stars = useSelector((state) => state.filter.stars);

  const mainPageBg = useRef();
  const firstContainer = useRef();
  const secondContainer = useRef();
  useEffect(() => {
    var tl = gsap.timeline();
    tl.to(mainPageBg.current, {
      opacity: "1",
      duration: 0.8,
    });
    tl.to(firstContainer.current, { opacity: "1", duration: 0.4 });
    tl.to(secondContainer.current, { opacity: "1", duration: 0.4, delay: 0.5 });
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    changeAlignment();
    getHotels();
    if (getHotels.data !== null) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    sortFetch(stars);
  }, [stars]);
  async function getHotels() {
    setTo(to + 2);
    setLoading(true);
    const { data, error } = await supabase
      .from("Hotels")
      .select()
      .range(from, to);
    setHotels(data);
    if (error) throw error;
    setFilters(true);
    setFilteredHotels(data);
    console.log(data);
    setLoading(false);
  }
  async function filterFetch() {
    setLoading(true);
    const { data, error } = await supabase
      .from("Hotels")
      .select()
      .order(order, { ascending: ascention });

    if (error) throw error;
    setFilters(true);
    setFilteredHotels(data);
    console.log(filteredHotels);
    setLoading(false);
  }

  async function sortFetch(stars) {
    setLoading(true);

    if (stars >= 4) {
      const { data, error } = await supabase
        .from("Hotels")
        .select()
        .gte("stars", stars);

      if (error) throw error;
      setFilters(true);
      setLoading(false);

      setFilteredHotels(data);
      console.log(filteredHotels);
    } else {
      const { data, error } = await supabase
        .from("Hotels")
        .select()
        .lte("stars", stars);

      if (error) throw error;
      setFilters(true);
      setFilteredHotels(data);
      setLoading(false);

      console.log(filteredHotels);
    }
  }

  // reservation info

  let selectedCity = useSelector((state) => state.reserve.city);

  return (
    <div className="w-screen h-auto bg-gray-100">
      <Navbar />
      <div
        className={`${
          alignLeft === true
            ? "h-full w-full pt-28 flex lg:px-36 space-x-20"
            : "h-full w-full pt-28 flex flex-row-reverse lg:px-36 space-x-20"
        }`}
      >
        <div className=" w-full lg:w-3/4 h-full  p-6  ">
          <div
            ref={mainPageBg}
            className={`${
              alignLeft === true
                ? "h-auto w-full space-x-3 flex items-center justify-end opacity-0"
                : "h-auto w-full   space-x-3 flex flex-row-reverse items-center justify-end opacity-0"
            }`}
          >
            <Link className="text-lg items-center flex text-black" href="/">
              <CaretLeft
                className={`${
                  alignLeft === true ? " " : "transform rotate-180"
                }`}
                size={20}
              />
              {t("hotels")} {selectedCity}
            </Link>
            <Link className="text-lg items-center flex text-gray-700" href="/">
              <CaretLeft
                className={`${
                  alignLeft === true ? " " : "transform rotate-180"
                }`}
                size={20}
              />
              {t("home")}
            </Link>
          </div>

          <div
            ref={firstContainer}
            className={`${
              alignLeft === true
                ? "w-full  opacity-0 lg:text-lg text-sm text-center py-2 h-10 lg:pl-44 flex items-center justify-end my-7 space-x-4 "
                : "w-full  opacity-0 lg:text-lg text-sm text-center py-2 h-10 lg:pl-44 flex items-center flex-row-reverse justify-end my-7 space-x-4"
            }`}
          >
            <div className="lg:h-10 h-auto py-2 lg:py-8 w-full flex items-center justify-center space-x-4   ">
              <h2 className="text-gray-600 cursor-pointer flex items-center transition border ease-in duration-100 hover:text-mainBlue lg:px-4 py-2 bg-white drop-shadow-sm hover:bg-darkPurple rounded-md text-xs lg:text-base">
                {t("mRerserve")}{" "}
              </h2>
              <h2
                onClick={() => {
                  setAscention(false);
                  setOrder("stars");
                  filterFetch();
                }}
                className="text-gray-600 cursor-pointer flex items-center transition border ease-in duration-100 hover:text-mainBlue lg:px-4 py-2 bg-white drop-shadow-sm rounded-md hover:bg-darkPurple text-xs lg:text-base"
              >
                {t("mStar")}{" "}
              </h2>
              <h2
                onClick={() => {
                  setAscention(false);
                  setOrder("prices");

                  filterFetch();
                }}
                className="text-gray-600 cursor-pointer flex items-center transition border ease-in duration-100 hover:text-mainBlue lg:px-4 py-2 bg-white drop-shadow-sm rounded-md hover:bg-darkPurple text-xs lg:text-base"
              >
                {t("mPrice")}{" "}
              </h2>
              <h2
                onClick={() => {
                  setAscention(true);
                  setOrder("prices");

                  filterFetch();
                }}
                className="text-gray-600 cursor-pointer flex items-center transition border ease-in duration-100 hover:text-mainBlue lg:px-4 py-2 bg-white drop-shadow-sm rounded-md hover:bg-darkPurple text-xs lg:text-base"
              >
                {t("lPrice")}{" "}
              </h2>
            </div>
            <h3 className="w-28">{t("sortBy")}</h3>
          </div>
          <div
            className={`${
              alignLeft === true
                ? "w-full flex justify-end my-3 lg:hidden"
                : "w-full flex justify-start my-3 lg:hidden "
            }`}
          >
            <Suspense
              fallback={
                <div>
                  <Loader color="grape" />
                </div>
              }
            >
              <HotelListModal
                residenceTypes={residenceTypes}
                features={features}
              />
            </Suspense>
          </div>
          {loading === false ? (
            <div className="w-full h-full flex flex-col items-end justify-center space-y-9 my-10  ">
              {!filters
                ? hotels.map((hotel) => {
                    return <HotelCard key={hotel.id} hotel={hotel} />;
                  })
                : filteredHotels.map((hotel) => {
                    return <HotelCard key={hotel.id} hotel={hotel} />;
                  })}
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-end justify-center space-y-9 my-10  ">
              <Skeleton height={200} width="88%" />{" "}
              <Skeleton height={200} width="88%" />{" "}
              <Skeleton height={200} width="88%" />{" "}
              <Skeleton height={200} width="88%" />{" "}
              <Skeleton height={200} width="88%" />
            </div>
          )}
          <div className="h-full  w-full flex justify-center">
            <button
              onClick={() => {
                getHotels();
              }}
              className="px-14 rounded-md transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-xl font-mainFont"
            >
              {t("showMore")}
            </button>
          </div>
        </div>
        <div
          ref={secondContainer}
          className=" w-1/4 h-screen hidden lg:flex opacity-0"
        >
          <div className="w-full h-96 py-6">
            <HotelListMenu
              features={features}
              residenceTypes={residenceTypes}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
