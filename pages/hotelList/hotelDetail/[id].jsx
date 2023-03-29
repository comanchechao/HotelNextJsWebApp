import Navbar from "../../../components/Navbar";
import Head from "next/head";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import { reservationActions } from "../../../store/reservation/index";
import {
  Tabs,
  Popover,
  TextInput,
  Skeleton,
  createStyles,
  Paper,
  Text,
  Title,
  Button,
  useMantineTheme,
} from "@mantine/core";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons";

import { DatePickerInput } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";

import { supabase } from "../../../lib/supabaseClient";
import { useTranslation } from "next-i18next";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import { IconChevronLeft } from "@tabler/icons";
import Link from "next/link";
import Image from "next/image";
import { PlusCircle, MinusCircle, Star, MapPin } from "phosphor-react";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState, useRef } from "react";
import RoomCard from "../../../components/roomCard";
import { useDispatch, useSelector } from "react-redux";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Comments from "../../../components/comments";
import Reply from "../../../components/reply";
import { Carousel } from "@mantine/carousel";
const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));
function Card({ image, title, category }) {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
    </Paper>
  );
}
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

const DynamicMap = dynamic(
  () => import("../../../components/mapWithLocation"),
  {
    ssr: false,
  }
);

export default function HotelDetailPage({ hotel }) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  const ReserveInfoModal = dynamic(
    () => import("../../../components/reserveInfoModal"),
    {
      suspense: true,
    }
  );
  const Footer = dynamic(() => import("../../../components/Footer"), {
    suspense: true,
  });

  const faLocale = {
    name: "fa",
    weekdays: [
      "یک‌شنبه",
      "دوشنبه",
      "سه‌شنبه",
      "چهارشنبه",
      "پنج‌شنبه",
      "جمعه",
      "شنبه",
    ],
    weekStart: 1,
    months: [
      "دی",
      "بهمن",
      "اسفند",
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
    ],
    relativeTime: {
      future: "%s بعد",
      past: "%s قبل",
      s: "چند ثانیه",
      m: "1 دقیقه",
      mm: "%d دقیقه",
      h: "1 ساعت",
      hh: "%d ساعت",
      d: "1 روز",
      dd: "%d روز",
      M: "1 ماه",
      MM: "%d ماه",
      y: "1 سال",
      yy: "%d سال",
    },
    formats: {
      L: "DD/MM/YYYY",
      LTS: "HH:mm:ss",
      LLLL: "dddd, D MMMM YYYY HH:mm",
      LLL: "D MMMM YYYY HH:mm",
    },
  };
  dayjs.extend(customParseFormat);
  dayjs.extend(localeData);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault("Asia/Tehran");
  // Set the locale to your custom locale
  dayjs.localeData("fa", faLocale);

  const [alignLeft, setAlignLeft] = useState(false);
  const { t, i18n } = useTranslation("");
  const [loading, setLoading] = useState(false);
  const [singleImage, setSingleImage] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  const [imageThree, setImageThree] = useState("");
  const [dates, setDates] = useState([Date | null, Date | null]);
  const lng = i18n.language;

  async function changeAlignment() {
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
    console.log(hotel.secondImage);
    if (hotel.secondImage) {
      downloadImage2();
    }
  };

  const downloadImage2 = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from("/public/hotel-images")
      .download(hotel.secondImage);

    if (error) {
      throw error;
    }
    const url = URL.createObjectURL(data);
    setImageTwo(url);

    setLoading(false);
    if (hotel.thirdImage) {
      downloadImage3();
    }
  };
  const downloadImage3 = async () => {
    if (hotel.thirdImage) {
      setLoading(true);
      const { data, error } = await supabase.storage
        .from("/public/hotel-images")
        .download(hotel.thirdImage);

      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setImageThree(url);

      setLoading(false);
    }
  };
  useEffect(() => {
    changeAlignment();

    if (hotel.firstImage) {
      downloadImage1();
    }
    getComments(hotel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const myDivRef = useRef(null);
  const myTopDiv = useRef(null);
  const myBottomDiv = useRef(null);
  useEffect(() => {
    const divTop = myTopDiv.current.offsetTop;
    const divBottom = myBottomDiv.current.offsetTop;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY >= divTop) {
        myDivRef.current.classList.add("fixed", "inset-y-0", "top-10");
      } else {
        myDivRef.current.classList.remove("fixed", "inset-y-0", "top-10");
      }
      if (scrollY >= divBottom) {
        myDivRef.current.classList.remove("fixed", "inset-y-0", "top-10");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // get comments
  const useStyles = createStyles((theme) => ({
    firstInRange: {
      color: `${theme.colors.blue[6]} !important`,
    },
  }));
  const { classes, cx } = useStyles();

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

  dayjs.extend(jalaliday);
  const [entering, setEntering] = useState(null);
  const [exiting, setExiting] = useState(null);

  const dispatch = useDispatch();
  let city = useSelector((state) => state.reserve.city);
  let passenger = useSelector((state) => state.reserve.passenger);
  let childPassenger = useSelector((state) => state.reserve.childPassenger);
  let enterDate = useSelector((state) => state.reserve.enterDate);
  let exitDate = useSelector((state) => state.reserve.exitDate);
  let hotelInfo = useSelector((state) => state.reserve.hotelInfo);

  useEffect(() => {
    console.log(dates);
  });

  return (
    <>
      <Head>
        <title>
          {city} , {hotel.title} , {t("boutak")} , {t("seo")}
        </title>
        <meta name="description" content={t("description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-full">
        <Navbar />
        <div className="flex w-full lg:py-20  lg:px-44 h-full bg-mainWhite capitalize">
          <div className="flex flex-col p-5 w-full h-full   space-y-11">
            <div
              className={`${
                alignLeft === true
                  ? "flex justify-end lg:items-center items-end text-sm  text-gray-700 w-full lg:h-10 h-24"
                  : "flex justify-start lg:items-center items-end  text-gray-700 w-full lg:h-10 h-24"
              }`}
            >
              <Link href={"/hotelList/hotelDetail/" + hotel.id}>
                <p>
                  {t("singleHotel")} {hotel.title}
                </p>
              </Link>
              <IconChevronLeft
                className={`${
                  alignLeft === true ? " " : " transform rotate-180"
                }`}
              />
              <p>
                {city} {t("hotels")}
              </p>
              <IconChevronLeft
                className={`${
                  alignLeft === true ? " " : " transform rotate-180"
                }`}
              />
              <Link href="/">
                <p>{t("hotelsOf")} </p>
              </Link>
            </div>
            {loading ? (
              <div className="h-full my-8 w-full flex items-center justify-center space-x-5">
                <Skeleton height={400} width={"100%"} />{" "}
              </div>
            ) : (
              <div className="flex   my-4 items-center justify-between space-x-6 h-rem22 w-full     ">
                <div className="h-rem22   w-full grid  justify-center items-center   cursor-pointer  rounded-md">
                  <Carousel
                    slideSize="100%"
                    breakpoints={[
                      { maxWidth: "sm", slideSize: "100%", slideGap: 2 },
                    ]}
                    slideGap="xl"
                    align="start"
                    slidesToScroll={mobile ? 1 : 2}
                    nextControlIcon={<IconArrowRight size={16} />}
                    previousControlIcon={<IconArrowLeft size={16} />}
                    loop
                  >
                    <Carousel.Slide>
                      {singleImage ? (
                        <Image
                          className=" w-full  lg:object-contain h-rem22 lg:w-full"
                          alt="antalia"
                          src={singleImage}
                          width={400}
                          height={200}
                        />
                      ) : null}
                    </Carousel.Slide>
                    <Carousel.Slide>
                      {imageTwo ? (
                        <Image
                          alt="antalia"
                          className=" w-full lg:object-contain h-rem22 lg:w-full"
                          src={imageTwo}
                          width={400}
                          height={200}
                        />
                      ) : null}
                    </Carousel.Slide>
                    <Carousel.Slide>
                      {imageThree ? (
                        <Image
                          alt="antalia"
                          className="  w-full lg:object-contain h-rem22 lg:w-full"
                          src={imageThree}
                          width={400}
                          height={200}
                        />
                      ) : null}
                    </Carousel.Slide>
                  </Carousel>
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
              {/* <ImagesModal /> */}
            </div>
            <div className="flex w-full justify-end h-auto      ">
              <div
                className={`${
                  alignLeft === true
                    ? "flex w-full justify-center items-end flex-col"
                    : "flex w-full justify-center items-start flex-col"
                }`}
              >
                <h1 className="text-2xl font-bold  border-b-4   border-mainBlue pb-2  px-2  rounded-md my-5">
                  {t("singleHotel")} {hotel.title}
                </h1>
                <div className="flex border border-gray-300 bg-white my-3 lg:my-0 p-2 rounded-md space-x-2 justify-center items-center">
                  <div className="flex">
                    <MapPin size={15} weight="fill" />
                    <p className="text-sm">{hotel.address}</p>
                  </div>
                  <div className="flex justify-center items-center space-x-1">
                    <p className="text-xs">{t("star")}</p>
                    <p className="text-xs">{hotel.stars}</p>
                    <Star size={15} weight="fill" />{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex     items-end lg:items-start lg:flex-row flex-col justify-center ">
              <div
                ref={myTopDiv}
                className="lg:flex   hidden items-start h-screen w-96 pt-8 "
              >
                <div
                  ref={myDivRef}
                  className=" flex   p-4 bg-white   flex-col items-center w-68  h-72 mt-10  rounded-md border "
                >
                  <DatePickerInput
                    locale={faLocale}
                    timeZone="iran/tehran"
                    numberOfColumns={1}
                    oriantation
                    type="range"
                    className={`${
                      alignLeft === true
                        ? "text-3xl text-right  flex flex-col  items-end"
                        : "text-3xl text-right  flex flex-col  items-start"
                    }`}
                    dropdownType="modal"
                    value={dates}
                    dropdownPosition="top-start"
                    placeholder={t("inDate")}
                    label={t("inDate")}
                    minDate={dayjs().add(11, "day").toDate()}
                    withAsterisk
                    defaultValue={dayjs().add(11, "day").toDate()}
                    onChange={(e) => {
                      setDates(e);
                      dispatch(
                        reservationActions.setEnterting(
                          dayjs(e[0]).locale("fa").format("dddd, D MMMM YYYY")
                        )
                      );
                      dispatch(
                        reservationActions.setExiting(
                          dayjs(e[1]).locale("fa").format("dddd, D MMMM YYYY")
                        )
                      );
                    }}
                    radius="md"
                    dayClassName={(date, modifiers) =>
                      cx({
                        [classes.firstInRange]: modifiers.outside,
                      })
                    }
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
                          <div className="flex text-blue-800  items-center justify-center space-x-5">
                            <PlusCircle
                              onClick={() => {
                                dispatch(
                                  reservationActions.incrementChildPassenger()
                                );
                              }}
                              size={27}
                              weight="fill"
                            />
                            <h1 className="text-xs font-bold">
                              {childPassenger}
                            </h1>
                            <MinusCircle
                              onClick={() => {
                                dispatch(
                                  reservationActions.decrementChildPassenger()
                                );
                              }}
                              size={27}
                              weight="fill"
                            />
                          </div>
                        </div>
                      </div>
                    </Popover.Dropdown>
                  </Popover>
                  <div className="flex">
                    <button
                      onClick={() => {
                        dispatch(reservationActions.setHotelInfo(hotel));
                        var element = document.getElementById("target");
                        element.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="py-1  hover:text-white bg-mainPurple border-mainBlue border-r-8   ease-in duration-300 hover:bg-mainBlue transition rounded-lg  text-white mt-5 px-10   "
                    >
                      <p>{t("searchRoom")}</p>
                    </button>
                  </div>
                </div>
              </div>

              <div
                className={`${
                  alignLeft === true
                    ? "lg:hidden w-full items-center justify-end flex"
                    : "lg:hidden w-full items-center justify-start flex"
                }`}
              >
                <ReserveInfoModal />
              </div>
              <div className="flex flex-col w-full lg:w-4/5 mt-8  lg:pl-7 ">
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
                        ? "text-right text-lg"
                        : "text-left  text-lg"
                    }`}
                  >
                    {t("hotelFacilities")}
                  </h2>
                </div>
                <div
                  className={`${
                    alignLeft === true
                      ? "rounded-lg border text-sm mb-7  border-gray-300 bg-white  flex items-center justify-end  lg:p-5 divdie-x divide-black  "
                      : "rounded-lg border text-sm mb-7  border-gray-300 bg-white  flex items-center justify-start  lg:p-5 divdie-x divide-black  "
                  }`}
                >
                  {hotel.features.map((feature, i) => {
                    return (
                      <div key={i} className="flex px-3  justify-end items-end">
                        {/* <h2>
                          <IconWashMachine size={25} />
                        </h2> */}
                        <h2 className="text-gray-900">{feature}</h2>
                      </div>
                    );
                  })}
                </div>
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
                        ? "text-right text-lg"
                        : "text-left  text-lg"
                    }`}
                  >
                    {t("hotelPlaces")}
                  </h2>
                </div>
                <div className="flex flex-col w-full my-4 justify-around  ">
                  <div className="flex w-full justify-center items-center">
                    <DynamicMap
                      secondLocation={hotel.secondLocation}
                      firstLocation={hotel.firstLocation}
                      lat={hotel.locationLat}
                      lng={hotel.locationLng}
                    />
                  </div>
                </div>
                <div className="flex py-8 items-center space-y-6 w-full flex-col  justify-center">
                  <h1
                    className={`${
                      alignLeft === true
                        ? "text-right text-2xl font-bold self-end"
                        : "text-left  text-2xl font-bold self-start"
                    }`}
                  >
                    {t("rooms")}
                  </h1>
                  <div
                    id="target"
                    className="flex  justify-center w-full text-sm rounded-md"
                  >
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
                          return (
                            <RoomCard hotelDetail={hotel} key={i} room={room} />
                          );
                        })}
                      </Tabs.Panel>

                      <Tabs.Panel className="w-full" value="second" pt="xs">
                        {hotel.rooms.map((room, i) => {
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
                </div>
                <div
                  ref={myBottomDiv}
                  className={`${
                    alignLeft === true
                      ? "flex items-center py-4 space-x-1  w-full justify-end "
                      : "flex items-center     py-4 space-x-1 w-full justify-start "
                  }`}
                >
                  <h1
                    className={`${
                      alignLeft === true
                        ? "text-right self-end w-44  text-lg  border-b-2   border-mainBlue pb-2  px-2  rounded-md"
                        : "text-left w-44 self-start  text-lg  border-b-2   border-mainBlue pb-2  px-2  rounded-md"
                    }`}
                  >
                    {t("hotelRules")}
                  </h1>
                </div>
                <div
                  className={`${
                    alignLeft === true
                      ? "flex divide-x lg:flex-row flex-col divide-gray-300 p-5 border border-gray-300 rounded-md bg-white text-sm mb-14"
                      : "flex flex-col lg:flex-row-reverse   divide-gray-300 p-5 border border-gray-300 rounded-md bg-white text-sm mb-14"
                  }`}
                >
                  <div
                    className={`${
                      alignLeft === true
                        ? "flex justify-end text-right px-4 w-full h-full"
                        : "flex justify-end text-left px-4 w-full h-full"
                    }`}
                  >
                    <p>{hotel.hotelRules}</p>
                  </div>
                  <div className="flex w-full  lg:w-1/3 justify-center items-center flex-row lg:space-x-0 space-x-4 my-3 lg:my-0 lg:flex-col">
                    <div className="flex flex-col justify-center items-center">
                      <p>{t("exitTime")}</p>
                      <p className="py-2 text-right font-mainFont px-2 w-20 rounded-md  bg-gray-200">
                        {hotel.exitTime}
                      </p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <p>{t("enterTime")}</p>
                      <p className="py-2 text-right font-mainFont px-2 w-20 rounded-md  bg-gray-200">
                        {hotel.enterTime}
                      </p>{" "}
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
                        ? "text-right self-end w-44  text-lg  border-b-2   border-mainBlue pb-2  px-2  rounded-md"
                        : "text-left w-44 self-start  text-lg  border-b-2   border-mainBlue pb-2  px-2  rounded-md"
                    }`}
                  >
                    {t("aboutHotel")}
                  </h1>
                </div>
                <div
                  className={`${
                    alignLeft === true
                      ? "flex text-right p-5 border border-gray-300 rounded-md bg-white text-sm mb-14 "
                      : "flex text-left p-5 border border-gray-300 rounded-md bg-white text-sm mb-14 "
                  }`}
                >
                  <p>{hotel.hotelAbout}</p>
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
