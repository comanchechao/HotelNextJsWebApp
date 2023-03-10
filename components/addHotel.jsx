import { useEffect, useState } from "react";
import {
  Modal,
  Select,
  MultiSelect,
  Rating,
  Loader,
  Group,
  Tabs,
} from "@mantine/core";
import {
  IconUpload,
  IconPhoto,
  IconMessageCircle,
  IconCirclePlus,
  IconTrash,
  IconCircleMinus,
} from "@tabler/icons";
import dynamic from "next/dynamic.js";
import { supabase } from "../lib/supabaseClient";
import { useSelector, useDispatch } from "react-redux";
import { roomActions } from "../store/room";
import AddRoom from "./addRoom";
import { Suspense } from "react";
import { useTranslation } from "next-i18next";

import { X, Buildings } from "phosphor-react";
// const LocationsMap = dynamic(() => import("./map"), {
//   ssr: false,
//   Suspense: true,
// });
export default function AddHotel({ featuresData, cities, user }) {
  const { t, i18n } = useTranslation("common");
  const lng = i18n.language;
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState(3);
  const [title, setTitle] = useState("");
  const [firstImage, setFirstImage] = useState("");
  const [secondImage, setSecondImage] = useState("");
  const [thirdImage, setThirdImage] = useState("");
  const [fourthImage, setFourthImage] = useState("");
  const [fifthImage, setFifthImage] = useState("");
  const [features, setFeatures] = useState([]);
  const [avragePrice, setAvragePrice] = useState(0);
  const [location, setLocation] = useState({});
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [get, setGet] = useState(false);
  const [aboutHotel, setAboutHotel] = useState("");
  const [enteringHours, setEnteringHours] = useState(12);
  const [exitingHours, setExitingHours] = useState(14);
  const [alignLeft, setAlignLeft] = useState(false);

  let getlat = useSelector((state) => state.map.lat);
  let getLng = useSelector((state) => state.map.lng);
  let lat2 = useSelector((state) => state.map.lat2);
  let lng2 = useSelector((state) => state.map.lng2);
  let lat3 = useSelector((state) => state.map.lat3);
  let lng3 = useSelector((state) => state.map.lng3);
  async function changeAlignment() {
    console.log(lng);
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
  const [definedRoom, setDefinedRoom] = useState({
    title: "",
    price: null,
    meal: null,
    quantity: 1,
  });

  const [mapLat, setMapLat] = useState(null);
  const [mapLng, setMapLng] = useState(null);

  useEffect(() => {
    changeAlignment();
    cities.forEach((theCity) => {
      if (theCity.name === city) {
        setMapLat(theCity.lat);
        setMapLng(theCity.lng);
      }
    });
  }, [city]);

  const [meal, setMeal] = useState("");

  function handleNewRoom() {
    setRooms(
      rooms.concat({
        id: Math.random(3, 50),
        title: definedRoom.title,
        price: 655555,
        meal: meal,
        quantity: 1,
      })
    );
  }

  useEffect(() => {
    definedRoom.meal = meal;
  }, [definedRoom, meal]);

  const [cityNames, setCityNames] = useState([]);

  const [rooms, setRooms] = useState([]);
  const dispatch = useDispatch();

  const deleteById = (id) => {
    setRooms((oldValues) => {
      return oldValues.filter((room) => room.id !== id);
    });
  };

  function increaseQuantity(roomId) {
    setRooms((oldValues) => {
      return oldValues.map((item) => {
        if (item.id === roomId) {
          let newValue = item.quantity + 1;
          return { ...item, quantity: newValue };
        }
        return item;
      });
    });
  }

  function decreaseQuantity(roomId) {
    setRooms((oldValues) => {
      return oldValues.map((item) => {
        if (item.id === roomId) {
          let newValue = item.quantity - 1;
          return { ...item, quantity: newValue };
        }
        return item;
      });
    });
  }

  // handing submit event

  let marker2 = useSelector((state) => state.map.marker2);
  let marker3 = useSelector((state) => state.map.marker3);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // });

  async function handleSubmit() {
    const { data, error } = await supabase.from("Hotels").insert({
      title: title,
      owner: user.id,
      city: city,
      firstImage: firstImage,
      secondImage: secondImage,
      thirdImage: thirdImage,
      fourthImage: fourthImage,
      features: features,
      prices: avragePrice,
      stars: value,
      rooms: rooms,
      locationLat: getlat,
      locationLng: getLng,
      firstLocation: {
        name: marker2,
        lat: lat2,
        lng: lng2,
      },
      secondLocation: {
        name: marker3,
        lat: lat3,
        lng: lng3,
      },
    });
    if (error) throw error;
  }
  useEffect(() => {
    if (cities) {
      cities.forEach((city, i) => {
        if (cityNames.indexOf(city.name) === -1) {
          cityNames.push(city.name);
        }
      });
    }
  }, []);

  const [allFeatures, setAllFeatures] = useState([]);

  useEffect(() => {
    if (featuresData) {
      featuresData.forEach((feature, i) => {
        if (allFeatures.indexOf(feature.title) === -1) {
          allFeatures.push(feature.title);
        }
      });
    }
  }, []);

  // uploading images

  const [uploading, setUploading] = useState(false);

  const firstImageUpload = async (event) => {
    try {
      event.preventDefault();
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      setFirstImage(filePath);

      let { error: uploadError } = await supabase.storage
        .from("hotel-images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };
  const secondImageUpload = async (event) => {
    try {
      event.preventDefault();
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      setSecondImage(filePath);

      let { error: uploadError } = await supabase.storage
        .from("hotel-images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };
  const thirdImageUpload = async (event) => {
    try {
      event.preventDefault();
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      setThirdImage(filePath);

      let { error: uploadError } = await supabase.storage
        .from("hotel-images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };
  const fourthImageUpload = async (event) => {
    try {
      event.preventDefault();
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      setFourthImage(filePath);

      let { error: uploadError } = await supabase.storage
        .from("hotel-images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };
  return (
    <>
      <Modal
        padding={1}
        fullScreen
        withCloseButton={false}
        opened={opened}
        centered
      >
        <X
          onClick={() => setOpened(false)}
          className="cursor-pointer transition ease-in duration-200    hover:bg-mainPurple hover:text-mainBlue m-5  rounded-md text-mainPurple"
          size={32}
          weight="bold"
        />{" "}
        <div className="flex flex-col     w-full h-full px-6 lg:px-36">
          <div className="flex space-y-5 w-full h-full flex-col">
            <div className="   w-full text-center items-center flex justify-center">
              <h3 className="text-xl my-8 border-b-4   border-mainBlue pb-2  px-2  rounded-md ">
                {t("hotelPics")}
              </h3>
            </div>
            <div className="flex justify-around space-x-1 lg:space-x-4 lg:px-0 px-4 h-28 lg:h-rem22 ">
              <div className="h-full w-full flex items-center justify-center bg-gray-500 cursor-pointer transition ease-in duration-300 hover:bg-gray-700">
                <div className=" w-full h-full cursor-pointer p-4 bg-mainBlue hover:text-white  transition justify-center items-center flex ease-in duration-300 font-mainFont   text-center text-mainPurple hover:bg-mainPurple">
                  <label htmlFor="firstImage">
                    {uploading ? (
                      <Loader color="grape" />
                    ) : (
                      <IconUpload className="cursor-pointer" size={30} />
                    )}
                  </label>
                  <input
                    required
                    onChange={firstImageUpload}
                    type="file"
                    className="hidden"
                    id="firstImage"
                  />
                </div>
              </div>
              <div className="h-full w-full flex items-center justify-center bg-gray-500 cursor-pointer transition ease-in duration-300 hover:bg-gray-700">
                <div className=" w-full h-full cursor-pointer p-4 bg-mainBlue hover:text-white  transition justify-center items-center flex ease-in duration-300 font-mainFont   text-center text-mainPurple hover:bg-mainPurple">
                  <label htmlFor="fourthImage">
                    {uploading ? (
                      <Loader color="grape" />
                    ) : (
                      <IconUpload className="cursor-pointer" size={30} />
                    )}
                  </label>
                  <input
                    required
                    onChange={fourthImageUpload}
                    type="file"
                    className="hidden"
                    id="fourthImage"
                  />
                </div>
              </div>
              <div className="h-full w-full flex items-center justify-center bg-gray-500 cursor-pointer transition ease-in duration-300 hover:bg-gray-700">
                <div className=" w-full h-full cursor-pointer p-4 bg-mainBlue hover:text-white  transition justify-center items-center flex ease-in duration-300 font-mainFont   text-center text-mainPurple hover:bg-mainPurple">
                  <label htmlFor="fifthImage">
                    {uploading ? (
                      <Loader color="grape" />
                    ) : (
                      <IconUpload className="cursor-pointer" size={30} />
                    )}
                  </label>
                  <input
                    required
                    type="file"
                    className="hidden"
                    id="fifthImage"
                  />
                </div>
              </div>
              <div className="h-full w-full flex items-center justify-center bg-gray-500 cursor-pointer transition ease-in duration-300 hover:bg-gray-700">
                <div className=" w-full h-full cursor-pointer p-4 bg-mainBlue hover:text-white  transition justify-center items-center flex ease-in duration-300 font-mainFont   text-center text-mainPurple hover:bg-mainPurple">
                  <label htmlFor="thirdImage">
                    {uploading ? (
                      <Loader color="grape" />
                    ) : (
                      <IconUpload className="cursor-pointer" size={30} />
                    )}
                  </label>
                  <input
                    required
                    onChange={thirdImageUpload}
                    type="file"
                    className="hidden"
                    id="thirdImage"
                  />
                </div>
              </div>
              <div className="h-full w-full flex items-center justify-center bg-gray-500 cursor-pointer transition ease-in duration-300 hover:bg-gray-700">
                <div className=" w-full h-full cursor-pointer p-4 bg-mainBlue hover:text-white  transition justify-center items-center flex ease-in duration-300 font-mainFont   text-center text-mainPurple hover:bg-mainPurple">
                  <label htmlFor="secondImage">
                    {uploading ? (
                      <Loader color="grape" />
                    ) : (
                      <IconUpload className="cursor-pointer" size={30} />
                    )}
                  </label>
                  <input
                    required
                    onChange={secondImageUpload}
                    type="file"
                    className="hidden"
                    id="secondImage"
                  />
                </div>
              </div>
            </div>
            <div
              className={`${
                alignLeft === true
                  ? "flex    flex-col justify-center  space-x-2 text-right items-end w-full h-full"
                  : "flex    flex-col justify-center  space-x-2 text-left items-start w-full h-full"
              }`}
            >
              <h2 className="text-xl my-8 border-b-4   border-mainBlue pb-2  px-2  rounded-md">
                {t("hotelName")}
              </h2>
              <input
                required
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className=" py-2 text-right font-mainFont px-2 w-full bg-gray-200 rounded-md"
                type="text"
                name="title"
                placeholder={t("enterHotelName")}
              />
            </div>
            <div className="flex   w-full h-full text-right justify-center items-center">
              <div className="flex w-full justify-between flex-col items-center h-full">
                <h3
                  className={`${
                    alignLeft === true
                      ? "text-xl self-end my-8 border-b-4   border-mainBlue pb-2  px-2  rounded-md"
                      : "text-xl self-start my-8 border-b-4   border-mainBlue pb-2  px-2  rounded-md"
                  }`}
                >
                  {t("hotelStars")}
                </h3>
                <Rating value={value} onChange={setValue} size="xl" count={5} />
              </div>
            </div>
            <div
              className={`${
                alignLeft === true
                  ? "flex    flex-col justify-center  space-x-2 text-right items-end w-full h-full"
                  : "flex    flex-col justify-center  space-x-2 text-right items-start w-full h-full"
              }`}
            >
              <h3 className="text-xl my-8 border-b-4   border-mainBlue pb-2  px-2  rounded-md">
                {t("hotelAddress")}
              </h3>
              <input
                required
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                className=" py-2 text-right font-mainFont px-2 w-full bg-gray-200 rounded-md"
                type="text"
                name="title"
                placeholder={t("enterHotelAdd")}
              />
            </div>
            <div
              className={`${
                alignLeft === true
                  ? "flex flex-col w-full h-full text-right justify-center items-end"
                  : "flex flex-col w-full h-full text-right justify-center items-start"
              }`}
            >
              <h3 className="text-xl my-8 border-b-4   border-mainBlue pb-2  px-2  rounded-md">
                {t("hotelCity")}
              </h3>
              <Select
                transitionDuration={150}
                transition="pop-top-left"
                transitionTimingFunction="ease"
                variant="default"
                radius="md"
                placeholder={t("enterCity")}
                size="md"
                required
                value={city}
                onChange={setCity}
                searchable
                className="text-right  w-full"
                data={cityNames}
              />
            </div>
            {/* <div className="">
              <LocationsMap city={city} cityLatLng={[mapLat, mapLng]} />
            </div> */}
            <div
              className={`${
                alignLeft === true
                  ? "flex flex-col   w-full h-full text-right justify-between items-end"
                  : "flex flex-col   w-full h-full text-right justify-between items-start"
              }`}
            >
              <h3 className="text-xl my-8 border-b-4   border-mainBlue pb-2  px-2  rounded-md">
                {t("hotelFacilities")}
              </h3>
              <MultiSelect
                transitionDuration={150}
                transition="pop-top-left"
                transitionTimingFunction="ease"
                variant="default"
                placeholder={t("enterHotelFacil")}
                radius="md"
                size="md"
                value={features}
                onChange={setFeatures}
                data={allFeatures}
              />
            </div>
            <div
              className={`${
                alignLeft === true
                  ? "flex  flex-col justify-center space-x-2 text-right items-end w-full h-full"
                  : "flex  flex-col justify-center space-x-2 text-right items-start w-full h-full"
              }`}
            >
              <h3 className="text-xl my-8 border-b-4   border-mainBlue pb-2  px-2  rounded-md">
                {t("avrgNight")}
              </h3>
              <input
                required
                onChange={(e) => {
                  setAvragePrice(e.target.value);
                }}
                className="py-2 text-right font-mainFont px-2 w-full bg-gray-200 rounded-md"
                type="number"
                name="price"
                placeholder={t("enterPrice")}
              />
            </div>{" "}
            <div
              className={`${
                alignLeft === true
                  ? "flex  flex-col justify-center space-x-2 text-right items-end w-full h-full"
                  : "flex  flex-col justify-center space-x-2 text-right items-start w-full h-full"
              }`}
            >
              <h3 className="text-xl my-8 border-b-4   border-mainBlue pb-2  px-2  rounded-md">
                {t("hotelRules")}
              </h3>
              <textarea
                onChange={(e) => {
                  setAboutHotel(e.target.value);
                }}
                name="about hotel"
                className="py-2 text-right font-mainFont px-2 w-full bg-gray-200 rounded-md"
                id=""
                cols="10"
                rows="5"
              ></textarea>
            </div>
            <div className="flex w-full justify-around space-x-2 items-center  ">
              <div className="flex-col space-y-2 text-right flex">
                <label htmlFor="exiting hour">{t("exitTime")}</label>
                <input
                  onChange={(e) => {
                    setExitingHours(e.target.value);
                  }}
                  className="py-2 text-right font-mainFont px-2 w-20 rounded-md  bg-gray-200"
                  type="text"
                  name="exiting hour"
                />
              </div>
              <div className="flex-col space-y-2 text-right flex">
                <label htmlFor="entering hour">{t("enterTime")}</label>
                <input
                  onChange={(e) => {
                    setEnteringHours(e.target.value);
                  }}
                  className="py-2 text-right font-mainFont px-2 w-20 rounded-md   bg-gray-200"
                  type="text"
                  name="entering hour"
                />
              </div>
            </div>
            <div
              className={`${
                alignLeft === true
                  ? "flex  flex-col justify-center space-x-2 text-right items-end w-full h-full"
                  : "flex  flex-col justify-center space-x-2 text-right items-start w-full h-full"
              }`}
            >
              <h3 className="text-xl my-8 border-b-4   border-mainBlue pb-2  px-2  rounded-md">
                {t("aboutHotel")}
              </h3>
              <textarea
                onChange={(e) => {
                  setAboutHotel(e.target.value);
                }}
                name="about hotel"
                className="py-2 text-right font-mainFont px-2 w-full bg-gray-200 rounded-md"
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="flex p-5 w-full justify-center   items-center"></div>
            <div className="flex space-y-1 flex-col">
              {rooms.map((room, i) => {
                return (
                  <div key={i} className="py-2 flex border rounded-lg">
                    <div className="flex w-full">
                      <div className="flex items-center justify-around w-full">
                        <div className="flex text-darkPurple justify-center items-around h-full p-1 flex-col w-full">
                          <div className="flex justify-around text-darkPurple w-14 space-x-4   ">
                            <p>
                              <IconCirclePlus
                                onClick={() => {
                                  increaseQuantity(room.id);
                                }}
                              />
                            </p>
                            <p>{room.quantity}</p>
                            <p>
                              <IconCircleMinus
                                onClick={() => {
                                  decreaseQuantity(room.id);
                                }}
                              />
                            </p>
                          </div>
                          <div className="flex bg-red-500 rounded-md py-2 cursor-pointer transition ease-in duration-200 hover:bg-white hover:text-red-700 text-white justify-center items-center w-24">
                            <IconTrash
                              onClick={() => {
                                deleteById(room.id);
                              }}
                              size={25}
                            />
                          </div>
                        </div>
                        <div className="w-36 flex  justify-around">
                          <p>{t("currency")}</p>
                          <p className="text-lg">{room.price}</p>
                        </div>
                      </div>
                      <div className="flex self-end w-52 text-right px-2  flex-col">
                        <h1> {room.title}</h1>
                        <p> {room.meal}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex w-full ">
              <Tabs
                color="blue"
                variant="pills"
                className="w-full"
                defaultValue="gallery"
              >
                <Tabs.List grow position="center">
                  {/* <Tabs.Tab value="messages">???????? ?????? ??????</Tabs.Tab> */}
                  <Tabs.Tab position="center" value="gallery">
                    <p className="text-2xl">{t("newRoom")}</p>
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="gallery" pt="xs">
                  <div className="flex flex-col  w-full h-full">
                    <div className="flex space-y-2 w-full h-full flex-col">
                      <div
                        className={`${
                          alignLeft === true
                            ? "flex  flex-col justify-center space-x-2 text-right items-end w-full h-full"
                            : "flex  flex-col justify-center space-x-2 text-right items-start w-full h-full"
                        }`}
                      >
                        <h3 className="text-xl my-8 border-b-4   border-mainBlue pb-2  px-2  rounded-md">
                          {t("roomName")}
                        </h3>
                        <input
                          onChange={(e) => {
                            setDefinedRoom((oldValues) => {
                              let newObject = oldValues;
                              oldValues.title = e.target.value;
                              return newObject;
                            });
                          }}
                          className="py-2 text-right font-mainFont px-2 w-full bg-gray-200 rounded-md"
                          type="text"
                          name="title"
                          placeholder={t("enterRoomName")}
                        />
                      </div>
                      <div
                        className={`${
                          alignLeft === true
                            ? "flex  flex-col justify-center space-x-2 text-right items-end w-full h-full"
                            : "flex  flex-col justify-center space-x-2 text-right items-start w-full h-full"
                        }`}
                      >
                        <h3 className="text-xl my-8 border-b-4   border-mainBlue pb-2  px-2  rounded-md">
                          {t("roomMeal")}
                        </h3>
                        <Select
                          transitionDuration={150}
                          transition="pop-top-left"
                          transitionTimingFunction="ease"
                          variant="default"
                          radius="md"
                          size="md"
                          searchable
                          value={meal}
                          className="text-right flex items-center justify-end w-full"
                          onChange={setMeal}
                          data={[
                            { value: "????????????", label: "????????????" },
                            { value: "???????????? ?? ????????", label: "???????????? ?? ????????" },
                            {
                              value: "???????? ???????? ??????????",
                              label: "???????? ???????? ??????????",
                            },
                            { value: "??????", label: "??????" },
                          ]}
                        />
                      </div>
                      <div
                        className={`${
                          alignLeft === true
                            ? "flex  flex-col justify-center space-x-2 text-right items-end w-full h-full"
                            : "flex  flex-col justify-center space-x-2 text-right items-start w-full h-full"
                        }`}
                      >
                        <h3 className="text-xl my-8 border-b-4   border-mainBlue pb-2  px-2  rounded-md">
                          {t("avrgNight")}
                        </h3>
                        <input
                          className="py-2 text-right font-mainFont px-2 w-full bg-gray-200 rounded-md"
                          type="number"
                          name="price"
                          placeholder={t("avrgNight")}
                        />
                      </div>
                      <div
                        className={`${
                          alignLeft === true
                            ? "flex  flex-col justify-center space-x-2 text-right items-end w-full h-full"
                            : "flex  flex-col justify-center space-x-2 text-right items-start w-full h-full"
                        }`}
                      >
                        <h3 className="text-xl my-8 border-b-4   border-mainBlue pb-2  px-2  rounded-md">
                          {t("roomCapacity")}
                        </h3>
                        <Select
                          transitionDuration={150}
                          transition="pop-top-left"
                          transitionTimingFunction="ease"
                          variant="default"
                          radius="md"
                          size="md"
                          searchable
                          className="text-right w-full"
                          data={[
                            { value: "1", label: "1" },
                            { value: "2", label: "2" },
                            { value: "3", label: "3" },
                            { value: "4", label: "4" },
                          ]}
                        />
                      </div>
                      <div className="flex items-end justify-center w-full">
                        <button
                          onClick={() => {
                            handleNewRoom();
                          }}
                          className="w-52 py-3 border-r-8   border-mainBlue my-4 bg-mainPurple transition ease-in duration-300 font-mainFont rounded-md text-white hover:bg-mainBlue"
                        >
                          {t("confirmRoom")}{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </Tabs.Panel>

                {/* <Tabs.Panel value="messages" pt="xs">
                  <div className="flex flex-col w-full h-full">
                    <div className="flex bg-white justify-around divide-y my-1 divide-gray-300 rounded-md flex-col w-full h-44 border">
                      <div className="flex w-full justify-between">
                        <div className="flex h-full items-center justify-center px-4">
                          <button
                            onClick={() => {
                              if (rooms.some((room) => room.id === 2)) {
                                console.log("can't do ");
                              } else {
                                setRooms(
                                  rooms.concat({
                                    id: 2,
                                    title: "???????? ????????",
                                    price: 655555,
                                    meal: "????????",
                                    quantity: 1,
                                  })
                                );
                              }
                            }}
                            className="px-10 h-10 border-r-8 border-mainBlue my-4 bg-mainPurple transition ease-in duration-300 font-mainFont rounded-md text-white hover:bg-mainBlue"
                          >
                            ????????????
                          </button>
                        </div>
                        <div className="flex flex-col py-4 px-5 justify-center items-center ">
                          <h1 className="text-2xl border-b-2 p-3 border-mainPurple rounded-md">
                            ?????? ????????
                          </h1>
                          <h2 className="my-3">????????</h2>
                        </div>
                      </div>
                      <div className="flex items-center h-full w-full px-5 justify-between">
                        <div className="flex space-x-1 p-2 justify-center items-center">
                          <h2>????????</h2>
                          <h2 className="  text-xl text-mainPurple">65555</h2>
                        </div>
                        <h1 className="text-sm">???????? ???????? ????????</h1>
                      </div>
                    </div>
                    <div className="flex bg-white justify-around divide-y my-1 divide-gray-300 rounded-md flex-col w-full h-44 border">
                      <div className="flex w-full justify-between">
                        <div className="flex h-full items-center justify-center px-4">
                          <button
                            onClick={(room) => {
                              if (rooms.some((room) => room.id === 1)) {
                                console.log("can't do ");
                              } else {
                                setRooms(
                                  rooms.concat({
                                    id: 1,
                                    title: "???????? ????????",
                                    price: 655555,
                                    meal: "????????",
                                    quantity: 1,
                                  })
                                );
                              }
                            }}
                            className="px-10 h-10 border-r-8 border-mainBlue my-4 bg-mainPurple transition ease-in duration-300 font-mainFont rounded-md text-white hover:bg-mainBlue"
                          >
                            ????????????
                          </button>
                        </div>
                        <div className="flex flex-col py-4 px-5 justify-center items-center ">
                          <h1 className="text-2xl border-b-2 p-3 border-mainPurple rounded-md">
                            ???????? ????????
                          </h1>
                          <h2 className="my-3">???????? ????????</h2>
                        </div>
                      </div>
                      <div className="flex items-center h-full w-full px-5 justify-between">
                        <div className="flex space-x-1 p-2 justify-center items-center">
                          <h2>????????</h2>
                          <h2 className="  text-xl text-mainPurple">65555</h2>
                        </div>
                        <h1 className="text-sm">???????? ???????? ????????</h1>
                      </div>
                    </div>
                  </div>
                </Tabs.Panel> */}
              </Tabs>
            </div>
            <div className="flex">
              <button
                onClick={() => {
                  handleSubmit();
                }}
                className={`${
                  alignLeft === true
                    ? "w-52 py-3 border-r-8 border-mainBlue my-4 bg-mainPurple transition ease-in duration-300 font-mainFont rounded-md text-white hover:bg-mainBlue"
                    : "w-52 py-3 border-r-8 border-mainBlue my-4 bg-mainPurple transition ease-in duration-300 font-mainFont rounded-md text-white hover:bg-mainBlue self-start"
                }`}
              >
                {t("confirmHotel")}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Group position="center">
        <button
          onClick={() => {
            setOpened(true);
          }}
          className="w-52 py-2 flex justify-center items-center border-2 text-lg text-white border-r-8 border-mainBlue bg-mainPurple   transition ease-in duration-300 font-mainFont rounded-md   hover:bg-mainBlue"
        >
          {t("newHotel")}
          <Buildings className="ml-2" size={32} weight="light" />
        </button>
      </Group>
    </>
  );
}
