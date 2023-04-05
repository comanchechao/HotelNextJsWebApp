import Navbar from "../../components/Navbar";
import Link from "next/link";
import { CaretLeft, MagnifyingGlass } from "phosphor-react";
import HotelCard from "../../components/hotelCard";
import { Skeleton, Pagination, Loader, filterProps } from "@mantine/core";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { useTranslation } from "next-i18next";
import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HotelListMenu from "../../components/hotelListMenu";
import Head from "next/head";
export async function getServerSideProps({ locale }) {
  // Fetch data from the database

  const { data, error } = await supabase.from("features").select();
  const { data: residenceTypes } = await supabase
    .from("residenceTypes")
    .select();
  const { data: websiteInfo } = await supabase.from("websiteInfo").select();

  const { data: cities } = await supabase.from("cities").select();
  const { data: countries } = await supabase.from("countries").select();

  return {
    props: {
      cities: cities,
      countries: countries,
      websiteInfo: websiteInfo,

      features: data,
      residenceTypes: residenceTypes,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function HotelList({
  features,
  residenceTypes,
  cities,
  countries,
  websiteInfo,
}) {
  const [filters, setFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  const [alignLeft, setAlignLeft] = useState(false);

  const { t, i18n } = useTranslation("common");
  const lng = i18n.language;

  // dynamic imports
  const HotelListModal = dynamic(
    () => import("../../components/hotelListModal"),
    {
      suspense: false,
    }
  );
  async function changeAlignment() {
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
  const Footer = dynamic(() => import("../../components/Footer"), {
    suspense: false,
  });

  const [filteredHotels, setFilteredHotels] = useState([]);

  let stars = useSelector((state) => state.filter.stars);
  let filterFeatures = useSelector((state) => state.filter.features);
  let filterCities = useSelector((state) => state.reserve.cities);
  let selectedCity = useSelector((state) => state.reserve.city);
  let selectedCountry = useSelector((state) => state.filter.country);
  let filterResidenceTypes = useSelector(
    (state) => state.filter.residenceTypes
  );
  let selectedResidenceType = useSelector(
    (state) => state.filter.residenceType
  );
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
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    changeAlignment();
    getHotels();
  }, []);

  const [to, setTo] = useState(4);
  const [hotels, setHotels] = useState([]);
  const [order, setOrder] = useState("");
  const [ascention, setAscention] = useState(null);
  const [initialHotels, setInitialHotels] = useState([]);
  // handling products

  async function getHotels() {
    setTo(to + 2);
    setLoading(true);
    const { data, error } = await supabase
      .from("Hotels")
      .select(
        "id , residenceType , country , features , city , trTitle , stars , title , prices , pricesL , locationLng , locationLat, firstImage , secondImage , thirdImage"
      )
      .order("id", { ascending: false });
    if (lng === "fa") {
      if (selectedCity !== "") {
        const filteredData = data.filter((obj) => {
          return obj.city.includes(selectedCity);
        });
        setHotels(filteredData);
      }
    }
    if (lng === "tr") {
      if (selectedCity !== "") {
        const filteredData = data.filter((obj) => {
          return obj.trTitle.includes(selectedCity);
        });
        setHotels(filteredData);
      }
    }
    if (selectedCity === "") {
      setHotels(data);
    }
    setInitialHotels(data);

    if (error) throw error;
    setLoading(false);
  }

  useEffect(() => {
    filter(filterFeatures);
  }, [filterFeatures]);

  function filter(filterFeatures) {
    let filteredArray = initialHotels.filter((obj) =>
      obj.features.some((hobby) => filterFeatures.includes(hobby))
    );

    setHotels(filteredArray);
    if (hotels === []) {
      setHotels(initialHotels);
    }
  }

  let minPrice = useSelector((state) => state.filter.minPrice);

  useEffect(() => {
    sortStars();
  }, [stars]);

  function sortStars() {
    if (stars === 5) {
      const filteredProducts = initialHotels.filter(
        (hotel) => 5 < hotel.stars < 6
      );
      setHotels(filteredProducts);
    } else if (stars === 4) {
      const filteredProducts = initialHotels.filter((hotel) => hotel.stars < 5);
      setHotels(filteredProducts);
    } else if (stars === 3) {
      const filteredProducts = initialHotels.filter((hotel) => hotel.stars < 4);
      setHotels(filteredProducts);
    }
  }
  useEffect(() => {
    filter();
  }, [filterCities]);

  function filter() {
    let filteredArray = initialHotels.filter((obj) =>
      obj.city((hobby) => filterCities.includes(hobby))
    );

    setHotels(filteredArray);
    if (hotels === []) {
      setHotels(initialHotels);
    }
  }
  useEffect(() => {
    sortCity();
  }, [selectedCity]);

  function sortCity() {
    if (lng === "fa") {
      const filteredData = initialHotels.filter((obj) => {
        return obj.city.includes(selectedCity);
      });
      setHotels(filteredData);
    } else {
      const filteredData = initialHotels.filter((obj) => {
        return obj.trTitle.includes(selectedCity);
      });
      setHotels(filteredData);
    }
  }

  // useEffect(() => {
  //   filter(filterResidenceTypes);
  // }, [filterResidenceTypes]);

  // function filter(filterResidenceTypes) {
  //   let filteredArray = initialHotels.filter((obj) =>
  //     obj.residenceType.some((hobby) => filterResidenceTypes.includes(hobby))
  //   );

  //   setHotels(filteredArray);
  //   if (hotels === []) {
  //     setHotels(initialHotels);
  //   }
  // }
  useEffect(() => {
    sortResidenceType();
  }, [selectedResidenceType]);

  function sortResidenceType() {
    const filteredData = initialHotels.filter((obj) => {
      if (obj.residenceType !== null) {
        return obj.residenceType.includes(selectedResidenceType);
      }
    });
    setHotels(filteredData);
  }
  useEffect(() => {
    sortCountries();
  }, [selectedCountry]);

  function sortCountries() {
    const filteredData = initialHotels.filter((obj) => {
      if (obj.country !== null) {
        return obj.country.includes(selectedCountry);
      }
    });
    setHotels(filteredData);
  }
  // async function getFilteredHotels() {
  //   setTo(to + 2);
  //   setLoading(true);
  //   const { data, error } = await supabase
  //     .from("Hotels")
  //     .select()
  //     .containedBy("features", filterFeatures);
  //   setHotels(data);
  //   if (error) throw error;
  //   setLoading(false);
  // }

  // handling products

  async function orderFetch() {
    setTo(to + 2);
    setLoading(true);

    if (ascention) {
      let orderedHotels = initialHotels.sort((a, b) => a.prices - b.prices);
      setHotels(orderedHotels);
    } else {
      let orderedHotels = initialHotels.sort((a, b) => b.prices - a.prices);
      setHotels(orderedHotels);
    }

    setLoading(false);
  }

  async function priceRange() {
    if (minPrice) {
      const filteredData = initialHotels.filter(
        (obj) => obj.prices >= minPrice[0] && obj.prices <= minPrice[1]
      );
      setHotels(filteredData);
    }
  }

  function searchFunction(input) {
    const filteredArray = initialHotels.filter((item) =>
      item.title.toLowerCase().includes(input.toLowerCase())
    );
    setHotels(filteredArray);
  }

  // reservation info

  useEffect(() => {
    priceRange();
  }, [minPrice]);

  return (
    <>
      <Head>
        <title>
          {selectedCity} , {t("boutak")} , {t("seo")}
        </title>
        <meta name="description" content={t("description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen  bg-mainWhite h-full">
        <Navbar />
        <div
          className={`${
            alignLeft === true
              ? "h-auto w-full pt-24 flex lg:px-36 space-x-20 "
              : "h-auto w-full pt-24 flex flex-row-reverse lg:px-36 space-x-20"
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
              <Link
                className="text-sm  space-x-1  items-center flex text-black"
                href="/"
              >
                <CaretLeft
                  className={`${
                    alignLeft === true ? " " : "transform rotate-180"
                  }`}
                  size={20}
                />
                <span>{selectedCity}</span>
                <span>{t("hotelsOf")}</span>
              </Link>
              <Link
                className="text-sm   items-center flex text-gray-700"
                href="/"
              >
                <CaretLeft
                  className={`${
                    alignLeft === true ? " " : "transform rotate-180"
                  }`}
                  size={20}
                />
                {t("home")}
              </Link>
            </div>
            <div class=" mt-4 relative text-black lg:pl-7  self-center   flex items-center justify-center">
              <input
                className="border-2 placeholder-gray-400 text-right transition ease-in duration-300 text-darkPurple w-full hover:bg-gray-100   bg-white font-mainFont h-8 px-5 pr-4 md:pr-16 rounded-3xl  text-sm focus:outline-none"
                type="search"
                onChange={(e) => {
                  searchFunction(e.target.value);
                }}
                name="search"
                placeholder={t("hotelNameSearch")}
              />
              <MagnifyingGlass
                className="absolute flex items-center left-0 top-0 mt-2   lg:left-4 ml-3 lg:ml-6 inset-0"
                size={18}
                weight="bold"
              />
            </div>
            <div
              ref={firstContainer}
              className={`${
                alignLeft === true
                  ? "w-full  opacity-0 lg:text-lg text-sm text-center py-2 h-10 lg:pl-44 flex items-center justify-end my-7 space-x-4 "
                  : "w-full  opacity-0 lg:text-lg text-sm text-center py-2 h-10 lg:pl-44 flex items-center flex-row-reverse justify-end my-7 space-x-4"
              }`}
            >
              <div className="lg:h-10 h-auto py-2 lg:py-8 w-full flex lg:flex-nowrap   lg:space-y-0   items-center justify-center space-x-4   ">
                <h2
                  onClick={() => {
                    setAscention(false);
                    setOrder("stars");
                    orderFetch();
                  }}
                  className="text-gray-600 cursor-pointer flex items-center transition   ease-in duration-100 border-2 border-mainPurple hover:text-mainBlue px-2 lg:px-4 py-2 bg-white drop-shadow-sm rounded-md hover:bg-mainPurple text-xs lg:text-sm"
                >
                  {t("mStar")}{" "}
                </h2>
                <h2
                  onClick={() => {
                    setAscention(true);
                    setOrder("prices");
                    orderFetch();
                  }}
                  className="text-gray-600 cursor-pointer flex items-center transition   ease-in duration-100 border-2 border-mainPurple hover:text-mainBlue px-2 lg:px-4 py-2 bg-white drop-shadow-sm rounded-md hover:bg-mainPurple text-xs lg:text-sm"
                >
                  {t("mPrice")}{" "}
                </h2>
                <h2
                  onClick={() => {
                    setAscention(false);
                    setOrder("prices");
                    orderFetch();
                  }}
                  className="text-gray-600 cursor-pointer flex items-center transition   ease-in duration-100 border-2 border-mainPurple hover:text-mainBlue px-2 lg:px-4 py-2 bg-white drop-shadow-sm rounded-md hover:bg-mainPurple text-xs lg:text-sm"
                >
                  {t("lPrice")}{" "}
                </h2>
              </div>

              <h3 className="w-28 hidden lg:flex">{t("sortBy")}</h3>
            </div>
            <div
              className={`${
                alignLeft === true
                  ? "w-full flex justify-end my-3 lg:hidden"
                  : "w-full flex justify-start my-3 lg:hidden "
              }`}
            >
              <HotelListModal
                residenceTypes={residenceTypes}
                features={features}
                cities={cities}
                countries={countries}
              />
            </div>
            {loading === false ? (
              <div className="w-full h-full flex flex-col items-end justify-center space-y-9 my-10  ">
                {hotels.map((hotel) => {
                  return <HotelCard key={hotel.id} hotel={hotel} />;
                })}
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center lg:items-end justify-center space-y-9 my-10  ">
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
            className=" w-1/4 h-rem50 hidden lg:flex opacity-0"
          >
            <div className="w-full   py-6 ">
              <HotelListMenu
                features={features}
                residenceTypes={residenceTypes}
                cities={cities}
                countries={countries}
              />
            </div>
          </div>
        </div>

        <Footer websiteInfo={websiteInfo} />
      </div>
    </>
  );
}
