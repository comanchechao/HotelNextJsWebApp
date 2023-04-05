import { useEffect, useState } from "react";
import {
  Modal,
  Select,
  MultiSelect,
  Rating,
  Loader,
  Tabs,
  Notification,
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
// });
export default function EditHotel({ identifier, featuresData, cities, hotel }) {
  const { t, i18n } = useTranslation("common");
  const lng = i18n.language;
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState(3);
  const [title, setTitle] = useState("");
  const [firstImage, setFirstImage] = useState("");
  const [secondImage, setSecondImage] = useState("");
  const [thirdImage, setThirdImage] = useState("");
  const [fourthImage, setFourthImage] = useState("");
  const [features, setFeatures] = useState([]);
  const [avragePriceRial, setAvragePriceRial] = useState(0);
  const [hotelRules, setHotelRules] = useState("");

  const [avragePriceL, setAvragePriceL] = useState(0);
  const [location, setLocation] = useState({});
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [get, setGet] = useState(false);
  const [aboutHotel, setAboutHotel] = useState("");
  const [enteringHours, setEnteringHours] = useState(12);
  const [exitingHours, setExitingHours] = useState(14);
  const [alignLeft, setAlignLeft] = useState(false);
  const [alert, setAlert] = useState(false);

  let getlat = useSelector((state) => state.map.lat);
  let getLng = useSelector((state) => state.map.lng);
  let lat2 = useSelector((state) => state.map.lat2);
  let lng2 = useSelector((state) => state.map.lng2);
  let lat3 = useSelector((state) => state.map.lat3);
  let lng3 = useSelector((state) => state.map.lng3);
  async function changeAlignment() {
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
        price: definedRoom.price,
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

  // function something() {
  //   let updates = {};
  //   if (title) updates.title = title;
  //   if (city) updates.city = city;
  //   if (firstImage) updates.firstImage = firstImage;
  //   if (secondImage) updates.secondImage = secondImage;
  //   if (thirdImage) updates.thirdImage = thirdImage;
  //   if (fourthImage) updates.fourthImage = fourthImage;
  //   if (features) updates.features = features;
  //   if (avragePrice) updates.prices = avragePrice;
  //   if (rooms) updates.rooms = rooms;
  //   if (getlat) updates.locationLat = getlat;
  //   if (getLng) updates.locationLng = getLng;
  // }

  async function handleSubmit() {
    let updates = {};
    if (title) updates.title = title;
    if (city) updates.city = city;
    if (address) updates.address = address;
    if (enteringHours) updates.enterTime = enteringHours;
    if (exitingHours) updates.exitTime = exitingHours;
    if (firstImage) updates.firstImage = firstImage;
    if (secondImage) updates.secondImage = secondImage;
    if (thirdImage) updates.thirdImage = thirdImage;
    if (fourthImage) updates.fourthImage = fourthImage;
    if (features !== []) updates.features = features;
    if (avragePriceL) updates.pricesL = avragePriceL;
    if (avragePriceRial) updates.prices = avragePriceRial;
    if (aboutHotel) updates.hotelAbout = aboutHotel;
    if (hotelRules) updates.hotelRules = hotelRules;

    if (rooms) updates.rooms = rooms;
    if (getlat) updates.locationLat = getlat;
    if (getLng) updates.locationLng = getLng;

    const { data, error } = await supabase
      .from("Hotels")
      .update(updates)
      .eq("id", identifier);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
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
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        exitTransitionDuration={600}
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
                {t("editHotelPictures")}
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
                {t("editHotelName")}
              </h2>
              <input
                required
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className=" py-2 text-right font-mainFont px-2 w-full bg-gray-200 rounded-md"
                type="text"
                name="title"
                placeholder={hotel.title}
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
                  {t("editHotelStars")}
                </h3>
                <Rating
                  defaultValue={hotel.stars}
                  onChange={setValue}
                  size="xl"
                  count={5}
                />
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
                {t("editHotelAddress")}
              </h3>
              <input
                required
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                className=" py-2 text-right font-mainFont px-2 w-full bg-gray-200 rounded-md"
                type="text"
                name="title"
                placeholder={hotel.address}
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
                {t("editHotelCity")}
              </h3>
              <Select
                transitionDuration={150}
                transition="pop-top-left"
                transitionTimingFunction="ease"
                variant="default"
                radius="md"
                placeholder={hotel.city}
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
                {t("editHotelFacilities")}
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
            <div className="flex space-x-4 w-full justify-end">
              {!features.length
                ? hotel.features.map((feature, i) => {
                    return (
                      <button
                        key={i}
                        className="shadow-2xl py-3 px-6 bg-gray-200  rounded"
                      >
                        {feature}
                      </button>
                    );
                  })
                : null}
            </div>
            <div
              className={`${
                alignLeft === true
                  ? "flex  flex-col justify-center space-x-2 text-right items-end w-full h-full"
                  : "flex  flex-col justify-center space-x-2 text-right items-start w-full h-full"
              }`}
            >
              <h3 className="text-xl my-8 border-b-4   border-mainBlue pb-2  px-2  rounded-md">
                {t("editAvrgPrice")}
              </h3>
              <input
                required
                onChange={(e) => {
                  setAvragePriceRial(e.target.value);
                }}
                className="py-2 text-right font-mainFont px-2 w-full bg-gray-200 rounded-md"
                type="number"
                name="price"
                placeholder={hotel.prices}
              />{" "}
              <input
                required
                onChange={(e) => {
                  setAvragePriceL(e.target.value);
                }}
                className="py-2 my-3 text-right font-mainFont px-2 w-full bg-gray-200 rounded-md"
                type="number"
                name="price"
                placeholder={hotel.pricesL}
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
                {t("editHotelRules")}
              </h3>
              <textarea
                onChange={(e) => {
                  setHotelRules(e.target.value);
                }}
                name="about hotel"
                className="py-2 text-right font-mainFont px-2 w-full bg-gray-200 rounded-md"
                id=""
                cols="10"
                placeholder={hotel.hotelRules}
                rows="5"
              ></textarea>
            </div>
            <div className="flex w-full justify-around space-x-2 items-center  ">
              <div className="flex-col space-y-2 text-right flex">
                <label htmlFor="exiting hour">{t("editExitTime")}</label>
                <input
                  onChange={(e) => {
                    setExitingHours(e.target.value);
                  }}
                  className="py-2 text-right font-mainFont px-2 w-20 rounded-md  bg-gray-200"
                  type="time"
                  name="exiting hour"
                  defaultValue={hotel.exitTime}
                />
              </div>
              <div className="flex-col space-y-2 text-right flex">
                <label htmlFor="entering hour">{t("editEnterTime")}</label>
                <input
                  defaultValue={hotel.enterTime}
                  onChange={(e) => {
                    setEnteringHours(e.target.value);
                  }}
                  className="py-2 text-right font-mainFont px-2 w-20 rounded-md   bg-gray-200"
                  type="time"
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
                {t("editHotelAbout")}
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
                placeholder={hotel.hotelAbout}
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
                  {/* <Tabs.Tab value="messages">اتاق پیش فرض</Tabs.Tab> */}
                  <Tabs.Tab position="center" value="gallery">
                    <p className="text-2xl">{t("editRoom")}</p>
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
                          {t("editRoomName")}
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
                          {t("editRoomMeal")}
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
                            { value: "صبحانه", label: "صبحانه" },
                            { value: "صبحانه و نهار", label: "صبحانه و نهار" },
                            {
                              value: "بدون وعده غذایی",
                              label: "بدون وعده غذایی",
                            },
                            { value: "شام", label: "شام" },
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
                          {t("editRoomAvrgPrice")}
                        </h3>
                        <input
                          onChange={(e) => {
                            setDefinedRoom((oldValues) => {
                              let newObject = oldValues;
                              oldValues.price = e.target.value;
                              return newObject;
                            });
                          }}
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
                          {t("editRoomCapacity")}
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
                          {t("confirmEditRoom")}{" "}
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
                                    title: "اتاق کینگ",
                                    price: 655555,
                                    meal: "کامل",
                                    quantity: 1,
                                  })
                                );
                              }
                            }}
                            className="px-10 h-10 border-r-8 border-mainBlue my-4 bg-mainPurple transition ease-in duration-300 font-mainFont rounded-md text-white hover:bg-mainBlue"
                          >
                            افزودن
                          </button>
                        </div>
                        <div className="flex flex-col py-4 px-5 justify-center items-center ">
                          <h1 className="text-2xl border-b-2 p-3 border-mainPurple rounded-md">
                            سام اتاق
                          </h1>
                          <h2 className="my-3">وعده</h2>
                        </div>
                      </div>
                      <div className="flex items-center h-full w-full px-5 justify-between">
                        <div className="flex space-x-1 p-2 justify-center items-center">
                          <h2>ریال</h2>
                          <h2 className="  text-xl text-mainPurple">65555</h2>
                        </div>
                        <h1 className="text-sm">قیمت برای هرشب</h1>
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
                                    title: "اتاق ملکه",
                                    price: 655555,
                                    meal: "کامل",
                                    quantity: 1,
                                  })
                                );
                              }
                            }}
                            className="px-10 h-10 border-r-8 border-mainBlue my-4 bg-mainPurple transition ease-in duration-300 font-mainFont rounded-md text-white hover:bg-mainBlue"
                          >
                            افزودن
                          </button>
                        </div>
                        <div className="flex flex-col py-4 px-5 justify-center items-center ">
                          <h1 className="text-2xl border-b-2 p-3 border-mainPurple rounded-md">
                            اتاق ملکه
                          </h1>
                          <h2 className="my-3">وعده کامل</h2>
                        </div>
                      </div>
                      <div className="flex items-center h-full w-full px-5 justify-between">
                        <div className="flex space-x-1 p-2 justify-center items-center">
                          <h2>ریال</h2>
                          <h2 className="  text-xl text-mainPurple">65555</h2>
                        </div>
                        <h1 className="text-sm">قیمت برای هرشب</h1>
                      </div>
                    </div>
                  </div>
                </Tabs.Panel> */}
              </Tabs>
            </div>
            {alert ? (
              <Notification
                transition="fade"
                transitionDuration={600}
                transitionTimingFunction="ease"
                color="green"
                withCloseButton
                variant="outline"
              >
                <h1 className="text-2xl text-center">
                  {t("editHotelSuccess")}
                </h1>
              </Notification>
            ) : (
              <div></div>
            )}
            <div className="flex items-center space-x-4">
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
                {t("confirmEditHotel")}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <button
        onClick={() => {
          setOpened(true);
        }}
        className="w-full py-2 bg-mainPurple border-r-8 border-2 hover:text-mainPurple border-mainBlue transition ease-in duration-150 font-mainFont rounded-md text-white hover:bg-mainBlue"
      >
        {t("editHotel")}
      </button>
    </>
  );
}
