import Navbar from "../../../components/Navbar";
import Head from "next/head";
import { reservationActions } from "../../../store/reservation/index";
import { Tabs, Popover, TextInput, Skeleton } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { supabase } from "../../../lib/supabaseClient";
import { useTranslation } from "next-i18next";
import isToday from "dayjs/plugin/isToday.js";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import dayjs from "dayjs";
import {
  IconChevronLeft,
  IconStar,
  IconBarbell,
  IconCoffee,
  IconChefHat,
  IconHotelService,
  IconBath,
  IconWifi,
  IconWashMachine,
} from "@tabler/icons";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

import { PlusCircle, MinusCircle } from "phosphor-react";
import ImagesModal from "../../../components/imagesModal";
import FeaturesModal from "../../../components/FeaturesModal";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState, useRef } from "react";
import RoomCard from "../../../components/roomCard";
import { useDispatch, useSelector } from "react-redux";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Comments from "../../../components/comments";
import Reply from "../../../components/reply";

export const getStaticPaths = async ({ locales }) => {
  const { data, error } = await supabase.from("Hotels").select();
  if (error) throw error;

  // const paths = data.map((hotel) => {
  //   locales
  //     .map((locale) => {
  //       return {
  //         params: { id: hotel.id.toString() },
  //         locale,
  //       };
  //     })
  //     .flat();
  // });

  const paths = data
    .map((hotel) =>
      locales.map((locale) => ({
        params: { id: hotel.id.toString() },
        locale, // Pass locale here
      }))
    )
    .flat(); // Flatten array to avoid nested arrays

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const { data, error } = await supabase.from("Hotels").select().eq("id", id);

  return {
    props: {
      hotel: data[0],
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
};

// const DynamicMap = dynamic(
//   () => import("../../../components/mapWithLocation"),
//   {
//     ssr: false,
//   }
// );

export default function HotelDetailPage({ hotel }) {
  const ReserveInfoModal = dynamic(
    () => import("../../../components/reserveInfoModal"),
    {
      suspense: true,
    }
  );
  const Footer = dynamic(() => import("../../../components/Footer"), {
    suspense: true,
  });

  const [alignLeft, setAlignLeft] = useState(false);
  const { t, i18n } = useTranslation("");
  const [loading, setLoading] = useState(false);
  const [displayImages, setDisplayImages] = useState([]);
  const [singleImage, setSingleImage] = useState("");
  const lng = i18n.language;

  async function changeAlignment() {
    console.log(lng);
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }

  const downloadImage1 = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from("/public/hotel-images")
      .download(hotel.firstImage);

    if (error) {
      throw error;
    }
    const url = URL.createObjectURL(data);
    setSingleImage(url);

    setLoading(false);
    downloadImage2();
  };

  const downloadImage2 = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.storage
        .from("/public/hotel-images")
        .download(hotel.secondImage);

      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      if (displayImages.indexOf(url) === -1) {
        displayImages.push(url);
      }
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    } finally {
      setLoading(false);
      downloadImage3();
    }
  };
  const downloadImage3 = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.storage
        .from("/public/hotel-images")
        .download(hotel.thirdImage);

      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      if (displayImages.indexOf(url) === -1) {
        displayImages.push(url);
      }
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    changeAlignment();

    downloadImage1();
    getComments(hotel);
  }, []);
  const myDivRef = useRef(null);
  useEffect(() => {
    const divTop = myDivRef.current.offsetTop;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY >= divTop) {
        myDivRef.current.classList.add(
          "fixed",
          "left-44",
          "inset-y-0",
          "top-10"
        );
      } else {
        myDivRef.current.classList.remove(
          "fixed",
          "left-44",
          "inset-y-0",
          "top-10"
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // get comments

  const [comments, setComments] = useState([]);

  async function getComments(hotel) {
    const { data: commentData, error } = await supabase
      .from("comments")
      .select()
      .eq("hotelId", hotel.id);
    if (error) throw error;
    setComments(commentData);
  }
  // getting reservtion info

  const [entering, setEntering] = useState(null);
  const [exiting, setExiting] = useState(null);

  useEffect(() => {
    dispatch(
      reservationActions.setEnterting(dayjs(entering).format("YYYY/MM/DD"))
    );
    dispatch(
      reservationActions.setExiting(dayjs(exiting).format("YYYY/MM/DD"))
    );
  }, [entering, exiting]);

  const dispatch = useDispatch();
  let city = useSelector((state) => state.reserve.city);
  let passenger = useSelector((state) => state.reserve.passenger);
  let enterDate = useSelector((state) => state.reserve.enterDate);
  let exitDate = useSelector((state) => state.reserve.exitDate);
  let hotelInfo = useSelector((state) => state.reserve.hotelInfo);

  return (
    <>
      <Head>
        <title>
          {hotel.city} | {hotel.title} | {t("boutak")}
        </title>
        <meta name="description" content={t("description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-full">
        <Navbar />
        <div className="flex w-full lg:py-20  lg:px-44 h-full bg-gray-100">
          <div className="flex flex-col p-5 w-full h-full  ">
            <div
              className={`${
                alignLeft === true
                  ? "flex justify-end lg:items-center items-end  text-gray-700 w-full lg:h-10 h-24"
                  : "flex justify-start lg:items-center items-end  text-gray-700 w-full lg:h-10 h-24"
              }`}
            >
              <Link href={"/hotelList/hotelDetail/" + hotel.id}>
                <p>
                  {t("singleHotel")} {hotel.title}
                </p>
              </Link>
              <IconChevronLeft />
              <p>
                {t("hotels")} {city}
              </p>
              <IconChevronLeft />
              <Link href="/">
                <p>{t("hotelsOf")}</p>
              </Link>
            </div>
            {loading ? (
              <div className="h-full my-8 w-full flex items-center justify-center space-x-5">
                <Skeleton height={400} width={"100%"} />{" "}
                <Skeleton height={400} width={"100%"} />{" "}
                <Skeleton height={400} width={"100%"} />{" "}
                <Skeleton height={400} width={"100%"} />{" "}
                <Skeleton height={400} width={"100%"} />
              </div>
            ) : (
              <div className="flex bg-mainBlue my-4 items-center justify-between space-x-6 h-rem22 w-full     ">
                <div className="h-96 w-1/2 grid  justify-items-center grid-rows-2 gap-2    grid-cols-2  cursor-pointer  rounded-md">
                  {displayImages.map((image) => {
                    return (
                      <Image
                        key={image}
                        width={300}
                        height={400}
                        alt=""
                        className=" w-full h-full object-contain"
                        src={image}
                      />
                    );
                  })}
                  {displayImages.map((image) => {
                    return (
                      <Image
                        key={image}
                        width={300}
                        height={300}
                        alt=""
                        className=" w-full h-full object-contain"
                        src={image}
                      />
                    );
                  })}
                </div>
                <div className="flex cursor-pointer h-96 justify-center items-center   w-1/2   rounded-md">
                  <Image
                    width={500}
                    height={200}
                    alt=""
                    className=" h-96 w-full  object-contain rounded-md"
                    src={singleImage}
                  />
                </div>
              </div>
            )}
            <div
              className={`${
                alignLeft === true
                  ? "w-full flex  h-full   justify-start"
                  : "w-full flex  h-full   justify-end"
              }`}
            >
              <ImagesModal />
            </div>
            <div className="flex w-full justify-end h-25 lg:h-20  ">
              <div
                className={`${
                  alignLeft === true
                    ? "flex w-full justify-center items-end flex-col"
                    : "flex w-full justify-center items-start flex-col"
                }`}
              >
                <h1 className="text-xl  border-b-4   border-mainBlue pb-2  px-2  rounded-md my-5">
                  {t("singleHotel")} {hotel.title}
                </h1>
                <div className="flex border border-gray-300 bg-white my-3 lg:my-0 p-3 rounded-md space-x-8 justify-center items-center">
                  <div className="flex">
                    <p>اول بند ، روبه روی خیابان گلشهر</p>
                  </div>
                  <div className="flex justify-center items-center space-x-2">
                    <p className="text-sm">{t("star")}</p>
                    <p className="text-sm">{hotel.stars}</p>
                    <IconStar />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex   items-end lg:items-start lg:flex-row flex-col justify-center ">
              <div className="lg:flex  hidden items-start h-screen   w-72 pt-8 ">
                <div
                  ref={myDivRef}
                  className=" flex   p-4 bg-white   flex-col items-center w-72  h-96 mt-10 ml-2 rounded-md border "
                >
                  <DatePicker
                    locale="fa"
                    onChange={setEntering}
                    defaultValue={enterDate}
                    inputFormat="MM/DD/YYYY"
                    dropdownPosition="bottom-start"
                    className={`${
                      alignLeft === true
                        ? "text-3xl text-center flex flex-col items-end"
                        : "text-3xl text-center flex flex-col items-start"
                    }`}
                    placeholder={t("inDate")}
                    label={t("inDate")}
                    withAsterisk
                    variant="default"
                    radius="md"
                    size="md"
                  />
                  <DatePicker
                    locale="fa"
                    onChange={setExiting}
                    defaultValue={exitDate}
                    inputFormat="MM/DD/YYYY"
                    dropdownPosition="bottom-start"
                    className={`${
                      alignLeft === true
                        ? "text-3xl text-center flex flex-col items-end"
                        : "text-3xl text-center flex flex-col items-start"
                    }`}
                    placeholder={t("inDate")}
                    label={t("inDate")}
                    withAsterisk
                    variant="default"
                    radius="md"
                    size="md"
                  />
                  <Popover width={300} position="bottom" withArrow shadow="md">
                    <Popover.Target>
                      <TextInput
                        value={passenger}
                        defaultValue={passenger}
                        className={`${
                          alignLeft === true
                            ? "text-3xl text-center flex flex-col items-end"
                            : "text-3xl text-center flex flex-col items-start"
                        }`}
                        label={t("passenger")}
                        placeholder={t("passenger")}
                        variant="default"
                        radius="md"
                        size="md"
                        withAsterisk
                      />
                    </Popover.Target>
                    <Popover.Dropdown>
                      <div className="w-full h-auto space-y-10 justify-center  flex flex-col items-center">
                        <div className="w-full flex flex-row-reverse justify-between items-center h-full ">
                          <h1 className="text-xs">{t("adult")}</h1>
                          <div className="flex text-blue-800  items-center justify-center space-x-5">
                            <PlusCircle
                              onClick={() => {
                                dispatch(
                                  reservationActions.increasePassenger()
                                );
                              }}
                              size={27}
                              weight="fill"
                            />
                            <h1 className="text-xs font-bold">{passenger}</h1>
                            <MinusCircle
                              onClick={() => {
                                dispatch(
                                  reservationActions.decreamentPassenger()
                                );
                              }}
                              size={27}
                              weight="fill"
                            />
                          </div>
                        </div>
                        <div className="w-full  flex flex-row-reverse justify-between items-center h-full ">
                          <h1 className="text-xs"> {t("kid")} </h1>
                          <div className="flex text-blue-800 items-center justify-center space-x-5">
                            <PlusCircle size={27} weight="fill" />
                            <h1 className="text-xs ">1</h1>
                            <MinusCircle size={27} weight="fill" />
                          </div>
                        </div>
                      </div>
                    </Popover.Dropdown>
                  </Popover>
                  <div className="flex">
                    <Link href="/checkout">
                      <button
                        onClick={() => {
                          dispatch(reservationActions.setHotelInfo(hotel));
                          dispatch(reservationActions.setEnterting(entering));
                          dispatch(reservationActions.setExiting(exiting));
                        }}
                        className="py-3  hover:text-white bg-mainPurple border-mainBlue border-r-8   ease-in duration-300 hover:bg-mainBlue transition rounded-lg  text-white my-5 px-12   "
                      >
                        <p>{t("searchRoom")}</p>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="lg:hidden w-full items-center justify-end flex  ">
                <ReserveInfoModal />
              </div>
              <div className="flex flex-col w-full lg:w-4/5 mt-8  lg:pl-7">
                <div
                  className={`${
                    alignLeft === true
                      ? "flex items-center py-4 space-x-1  w-full justify-end"
                      : "flex items-center     py-4 space-x-1 w-full justify-start"
                  }`}
                >
                  <h2
                    className={`${
                      alignLeft === true
                        ? "text-right w-56  text-xl  border-b-4   border-mainBlue pb-2  px-2  rounded-md"
                        : "text-left w-40  text-xl  border-b-4   border-mainBlue pb-2  px-2  rounded-md"
                    }`}
                  >
                    {t("hotelFacilities")}
                  </h2>
                </div>
                <div className="rounded-lg border text-sm  border-gray-300 bg-white grid grid-cols-2 grid-rows-2 lg:grid-cols-3 lg:grid-rows-3 lg:p-5 divdie-x divide-black  ">
                  {hotel.features.map((feature, i) => {
                    console.log(feature);
                    return (
                      <div
                        key={i}
                        className="flex px-3  justify-between items-center"
                      >
                        <h2>
                          <IconWashMachine size={25} />
                        </h2>
                        <h2 className="text-gray-900">{feature}</h2>
                      </div>
                    );
                  })}
                </div>
                <FeaturesModal />
                <div
                  className={`${
                    alignLeft === true
                      ? "flex items-center py-4 space-x-1  w-full justify-end"
                      : "flex items-center     py-4 space-x-1 w-full justify-start"
                  }`}
                >
                  <h1
                    className={`${
                      alignLeft === true
                        ? "text-right w-56  text-xl  border-b-4   border-mainBlue pb-2  px-2  rounded-md"
                        : "text-left w-40  text-xl  border-b-4   border-mainBlue pb-2  px-2  rounded-md"
                    }`}
                  >
                    {t("hotelPlaces")}
                  </h1>
                </div>
                <div className="flex flex-col w-full justify-around  bg-white">
                  <div className="flex w-full justify-start items-start">
                    {/* <DynamicMap
                        secondLocation={hotel.secondLocation}
                        firstLocation={hotel.firstLocation}
                        lat={hotel.locationLat}
                        lng={hotel.locationLng}
                      /> */}
                  </div>
                </div>
                <div className="flex py-8 items-center space-y-6 w-full flex-col  justify-center">
                  <h1
                    className={`${
                      alignLeft === true
                        ? "text-right self-end w-56  text-xl  border-b-4   border-mainBlue pb-2  px-2  rounded-md"
                        : "text-left w-40 self-start  text-xl  border-b-4   border-mainBlue pb-2  px-2  rounded-md"
                    }`}
                  >
                    {t("rooms")}
                  </h1>
                  <div className="flex  justify-center w-full text-sm rounded-md">
                    <Tabs
                      className="w-full "
                      radius="xs"
                      variant="pills"
                      color="yellow"
                      defaultValue="first"
                    >
                      <Tabs.List grow position="center">
                        <Tabs.Tab value="fourth">
                          <span className="text-sm">{t("fullMeal")}</span>
                        </Tabs.Tab>
                        <Tabs.Tab value="second">
                          <span className="text-sm">{t("breakfast")}</span>
                        </Tabs.Tab>
                        <Tabs.Tab value="third">
                          <span className="text-sm">{t("dinner")}</span>
                        </Tabs.Tab>
                        <Tabs.Tab value="first">
                          <span className="text-sm">{t("allMeals")}</span>
                        </Tabs.Tab>
                      </Tabs.List>
                      <Tabs.Panel className="w-full" value="first" pt="xs">
                        {hotel.rooms.map((room, i) => {
                          console.log(room);
                          return (
                            <RoomCard hotelDetail={hotel} key={i} room={room} />
                          );
                        })}
                      </Tabs.Panel>

                      <Tabs.Panel className="w-full" value="second" pt="xs">
                        {hotel.rooms.map((room, i) => {
                          console.log(room.meal);
                          if (room.meal === "صبحانه") {
                            return (
                              <RoomCard
                                hotelDetail={hotel}
                                key={i}
                                room={room}
                              />
                            );
                          }
                        })}
                      </Tabs.Panel>
                      <Tabs.Panel className="w-full" value="fourth" pt="xs">
                        {hotel.rooms.map((room, i) => {
                          console.log(room.meal);
                          if (room.meal === "کامل") {
                            return (
                              <RoomCard
                                hotelDetail={hotel}
                                key={i}
                                room={room}
                              />
                            );
                          }
                        })}
                      </Tabs.Panel>

                      <Tabs.Panel value="third" pt="xs">
                        {hotel.rooms.map((room, i) => {
                          console.log(room);
                          if (room.meal === "شام") {
                            return (
                              <RoomCard
                                hotelDetail={hotel}
                                key={i}
                                room={room}
                              />
                            );
                          }
                        })}
                      </Tabs.Panel>
                    </Tabs>
                  </div>

                  <div className="flex justify-around">
                    <button className="px-14 rounded-md transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-base font-mainFont">
                      {t("showMore")}
                    </button>
                  </div>
                </div>
                <div
                  className={`${
                    alignLeft === true
                      ? "flex items-center py-4 space-x-1  w-full justify-end"
                      : "flex items-center     py-4 space-x-1 w-full justify-start"
                  }`}
                >
                  <h1
                    className={`${
                      alignLeft === true
                        ? "text-right self-end w-56  text-xl  border-b-4   border-mainBlue pb-2  px-2  rounded-md"
                        : "text-left w-40 self-start  text-xl  border-b-4   border-mainBlue pb-2  px-2  rounded-md"
                    }`}
                  >
                    {t("hotelRules")}
                  </h1>
                </div>
                <div
                  className={`${
                    alignLeft === true
                      ? "flex divide-x divide-gray-300 p-5 border border-gray-300 rounded-md bg-white text-sm"
                      : "flex flex-row-reverse   divide-gray-300 p-5 border border-gray-300 rounded-md bg-white text-sm"
                  }`}
                >
                  <div className="flex justify-end text-right px-4 w-full h-full">
                    <ul>
                      <li>هزینه های جانبی</li>
                      <li>هزینه اقامت کودک زیر دوسال رایگان می‌باشد</li>
                      <li>
                        هزینه اقامت کودک دو تا شش سال طبق قوانین هتل در خود هتل
                        مبلغ پرداخت می‌گردد
                      </li>
                      <li>
                        هزینه اقامت کودک بالای شش سال یک نفر کامل محاسبه می‌گردد
                      </li>
                    </ul>
                  </div>
                  <div className="flex w-1/3 justify-center items-center flex-col">
                    <div className="flex flex-col justify-center items-center">
                      <p>{t("exitTime")}</p>
                      <p>14:00</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <p>{t("enterTime")}</p>
                      <p>14:00</p>
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    alignLeft === true
                      ? "flex items-center py-4 space-x-1  w-full justify-end"
                      : "flex items-center     py-4 space-x-1 w-full justify-start"
                  }`}
                >
                  <h1
                    className={`${
                      alignLeft === true
                        ? "text-right self-end w-56  text-xl  border-b-4   border-mainBlue pb-2  px-2  rounded-md"
                        : "text-left w-40 self-start  text-xl  border-b-4   border-mainBlue pb-2  px-2  rounded-md"
                    }`}
                  >
                    {t("aboutHotel")}
                  </h1>
                </div>
                <div
                  className={`${
                    alignLeft === true
                      ? "flex text-right p-5 border border-gray-300 rounded-md bg-white text-sm"
                      : "flex text-left p-5 border border-gray-300 rounded-md bg-white text-sm"
                  }`}
                >
                  <p>
                    گزینه‌ای بسیار مطلوب برای کسانی است که هم هتلی مجلل و شیک
                    می‌خواهند و هم دلشان می‌خواهد به مرکز شهر، شرکت‌های خصوصی و
                    دولتی و مکان‌هایی از این دست نزدیک باشند. البته موقعیت مکانی
                    یکی از امتیازات این هتل است؛ اتاق‌ها و سوئیت‌هایی راحت و
                    مجهز، رستورانی شیک و مدرن، کافی‌شاپ آرام و مرتب و امکانات
                    رفاهی متناسب، از دیگر مزیت‌های این هتل 4 ستاره به شمار
                    می‌آیند
                  </p>
                </div>
                <div
                  className={`${
                    alignLeft === true
                      ? "flex items-center py-4 space-x-1  w-full justify-end"
                      : "flex items-center     py-4 space-x-1 w-full justify-start"
                  }`}
                >
                  <h1 className="  text-gray-700 text-xl">{t("comments")} </h1>
                </div>
                {comments.map((comment, i) => {
                  return <Comments key={i} comment={comment} />;
                })}
                <Reply hotel={hotel} />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
