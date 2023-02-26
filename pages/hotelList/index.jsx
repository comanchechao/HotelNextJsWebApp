import Navbar from "../../components/Navbar";
import Link from "next/link";
import { CaretLeft } from "phosphor-react";
import HotelCard from "../../components/hotelCard";
import { Skeleton, Pagination, Loader } from "@mantine/core";
import Footer from "../../components/Footer";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HotelListMenu from "../../components/hotelListMenu";
export async function getServerSideProps({ locale }) {
  // Fetch data from the database
  const { data, error } = await supabase.from("Hotels").select();
  if (error) throw error;
  return {
    props: {
      hotels: data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function HotelList({ hotels }) {
  const [filters, setFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // dynamic imports
  const HotelListModal = dynamic(
    () => import("../../components/hotelListModal"),
    {
      suspense: true,
    }
  );

  const Footer = dynamic(() => import("../../components/Footer"), {
    suspense: true,
  });

  const [filteredHotels, setFilteredHotels] = useState([]);

  let stars = useSelector((state) => state.filter.stars);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (hotels.data !== null) {
      setLoading(false);
    } else {
      setLoading(true);
    }

    sortFetch(stars);
  }, [stars]);

  async function filterFetch(ascention) {
    setLoading(true);
    const { data, error } = await supabase
      .from("Hotels")
      .select()
      .order("prices", { ascending: ascention });

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
    <div className="w-screen h-auto bg-gray-200">
      <Navbar />
      <div className="h-full w-full pt-28 flex lg:px-44 space-x-16">
        <div className=" w-full lg:w-3/4 h-full  p-6 ">
          <div className="h-auto w-full space-x-3 flex items-center justify-end">
            <Link className="text-lg items-center flex text-black" href="/">
              <CaretLeft size={20} />
              هتل های شهر {selectedCity}
            </Link>
            <Link className="text-lg items-center flex text-gray-700" href="/">
              <CaretLeft size={20} />
              خونه
            </Link>
          </div>

          <div className=" w-full lg:text-lg text-xs text-center py-2 h-10 lg:pl-44 flex items-center justify-end my-7 space-x-4">
            <div className="lg:h-10 h-auto py-2 lg:py-8 w-full flex items-center justify-around bg-white drop-shadow-sm rounded-full">
              <h2 className="text-gray-600 cursor-pointer flex items-center transition ease-in duration-100 hover:text-mainBlue">
                بیشترین رزرو
              </h2>
              <h2 className="text-gray-600 cursor-pointer flex items-center transition ease-in duration-100 hover:text-mainBlue">
                بالاترین امتیاز
              </h2>
              <h2
                onClick={() => {
                  filterFetch(true);
                }}
                className="text-gray-600 cursor-pointer flex items-center transition ease-in duration-100 hover:text-mainBlue"
              >
                کمترین قیمت
              </h2>
              <h2
                onClick={() => {
                  filterFetch(false);
                }}
                className="text-gray-600 cursor-pointer flex items-center transition ease-in duration-100 hover:text-mainBlue"
              >
                بیشترین قیمت
              </h2>
            </div>
            <h3 className="w-28">مرتب سازی</h3>
          </div>
          <div className="w-full flex justify-end my-3 lg:hidden">
            <Suspense
              fallback={
                <div>
                  <Loader color="grape" />
                </div>
              }
            >
              <HotelListModal />
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
            <Pagination total={10} color="yellow" size="lg" />
          </div>
        </div>
        <div className=" w-1/4 h-screen hidden lg:flex">
          <div className="w-full h-96 py-6">
            <HotelListMenu />
          </div>
        </div>
      </div>
      <Suspense
        fallback={
          <div>
            <Skeleton height={800} width="100%" />
          </div>
        }
      >
        <Footer />
      </Suspense>
    </div>
  );
}
