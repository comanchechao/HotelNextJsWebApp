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
import Image from "next/image";
const LocationsMap = dynamic(() => import("./map"), {
  ssr: false,
});
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
  const [enteringHours, setEnteringHours] = useState(null);
  const [exitingHours, setExitingHours] = useState(null);
  const [alignLeft, setAlignLeft] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alert2, setAlert2] = useState(false);

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

  // previewing the images

  const [firstImagePreview, setFirstImagePreview] = useState();
  const [secondImagePreview, setSecondImagePreview] = useState();
  const [thirdImagePreview, setThirdImagePreview] = useState();
  const [fourthImagePreview, setFourthImagePreview] = useState();
  // getting hotel images

  const [firstInitialImage, setFirstInitialImage] = useState(null);
  const [secondInitialImage, setSecondInitialImage] = useState(null);
  const [thridInitialImage, setThirdInitialImage] = useState(null);
  const [fourthInitialImage, setFourthInitialImage] = useState(null);

  const downloadFirstImage = async () => {
    const { data, error } = await supabase.storage
      .from("/public/hotel-images")
      .download(hotel.firstImage);

    if (error) {
      throw error;
    }
    const url = URL.createObjectURL(data);
    setFirstInitialImage(url);
  };
  const downloadSecondImage = async () => {
    if (hotel.secondImage) {
      const { data, error } = await supabase.storage
        .from("/public/hotel-images")
        .download(hotel.secondImage);

      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setSecondInitialImage(url);
    }
  };
  const downloadThirdImage = async () => {
    if (hotel.thirdImage) {
      const { data, error } = await supabase.storage
        .from("/public/hotel-images")
        .download(hotel.thirdImage);

      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setThirdInitialImage(url);
    }
  };
  const downloadFourthImage = async () => {
    if (hotel.fourthImage) {
      const { data, error } = await supabase.storage
        .from("/public/hotel-images")
        .download(hotel.fourthImage);

      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setFourthInitialImage(url);
    }
  };

  useEffect(() => {
    downloadFirstImage();
    downloadSecondImage();
    downloadThirdImage();
    downloadFourthImage();
  }, []);

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

  useEffect(() => {
    if (hotel.rooms) {
      setRooms(hotel.rooms);
    }
  }, []);

  const [meal, setMeal] = useState("");

  function handleNewRoom() {
    setRooms(
      rooms.concat({
        id: Math.random(3, 50),
        title: definedRoom.title,
        price: definedRoom.price,
        meal: meal,
        quantity: 1,
        copacity: 1,
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
    if (rooms !== hotel.rooms) updates.rooms = rooms;
    if (address) updates.address = address;
    if (enteringHours) updates.enterTime = enteringHours;
    if (exitingHours) updates.exitTime = exitingHours;
    if (firstImage) updates.firstImage = firstImage;
    if (secondImage) updates.secondImage = secondImage;
    if (thirdImage) updates.thirdImage = thirdImage;
    if (fourthImage) updates.fourthImage = fourthImage;
    if (features.length) updates.features = features;
    if (avragePriceL) updates.pricesL = avragePriceL;
    if (avragePriceRial) updates.prices = avragePriceRial;
    if (aboutHotel) updates.hotelAbout = aboutHotel;
    if (hotelRules) updates.hotelRules = hotelRules;
    if (getlat) updates.locationLat = getlat;
    if (getLng) updates.locationLng = getLng;
    const { error } = await supabase
      .from("hotels")
      .update(updates)
      .in("id", [identifier]);
    console.log(identifier);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
    if (error) throw error;
    console.log("fired");
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
      setFirstImagePreview(file);
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
      setAlert2(true);
      setTimeout(() => {
        setAlert2(false);
      }, 2000);
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
      setSecondImagePreview(file);
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
      setAlert2(true);
      setTimeout(() => {
        setAlert2(false);
      }, 2000);
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
      setThirdImagePreview(file);
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
      setAlert2(true);
      setTimeout(() => {
        setAlert2(false);
      }, 2000);
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
      setFourthImagePreview(file);
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
      setAlert2(true);
      setTimeout(() => {
        setAlert2(false);
      }, 2000);
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
            {alert2 ? (
              <Notification
                transition="fade"
                transitionDuration={600}
                transitionTimingFunction="ease"
                color="green"
                withCloseButton
                variant="outline"
              >
                <h2 className="text-2xl text-center">{t("uploadSuccess")}</h2>
              </Notification>
            ) : (
              <div></div>
            )}
            <div className="flex flex-col md:flex-row lg:flex-row justify-around space-x-1 lg:space-x-4 lg:px-0 px-4 h-28 sm:h-full xs:h-full lg:h-rem22 ">
              <div className="h-full w-full flex items-center justify-center flex-col space-y-2   cursor-pointer transition ease-in duration-300  ">
                {" "}
                <h2 className="text-xl font-bold">(4)</h2>
                <label htmlFor="fourthImage">
                  {uploading ? (
                    <Loader color="dark" />
                  ) : (
                    <IconUpload className="cursor-pointer" size={30} />
                  )}
                </label>
                <div className=" w-full h-full cursor-pointer p-4 bg-mainBlue hover:text-white  transition justify-center items-center flex ease-in duration-300 font-mainFont   text-center text-mainPurple hover:bg-mainPurple">
                  <div className=" flex-col w-full h-full cursor-pointer p-4 bg-mainBlue hover:text-white  transition justify-center items-center flex ease-in duration-300 font-mainFont   text-center text-mainPurple hover:bg-mainPurple">
                    {fourthImagePreview ? (
                      <Image
                        width={500}
                        height={500}
                        src={URL.createObjectURL(fourthImagePreview)}
                        alt=""
                      />
                    ) : !fourthImagePreview && fourthInitialImage ? (
                      <Image
                        width={500}
                        height={500}
                        src={fourthInitialImage}
                        alt=""
                      />
                    ) : null}

                    <input
                      required
                      accept="image/webp,image/jpeg,image/png"
                      onChange={fourthImageUpload}
                      type="file"
                      className="hidden"
                      id="fourthImage"
                    />
                  </div>
                </div>
              </div>

              <div className="h-full w-full flex items-center justify-center flex-col space-y-2   cursor-pointer transition ease-in duration-300  ">
                {" "}
                <h2 className="text-xl font-bold">(3)</h2>
                <label htmlFor="thirdImage">
                  {uploading ? (
                    <Loader color="dark" />
                  ) : (
                    <IconUpload className="cursor-pointer" size={30} />
                  )}
                </label>
                <div className=" w-full h-full cursor-pointer p-4 bg-mainBlue hover:text-white  transition justify-center items-center flex ease-in duration-300 font-mainFont   text-center text-mainPurple hover:bg-mainPurple">
                  <div className=" flex-col w-full h-full cursor-pointer p-4 bg-mainBlue hover:text-white  transition justify-center items-center flex ease-in duration-300 font-mainFont   text-center text-mainPurple hover:bg-mainPurple">
                    {thirdImagePreview ? (
                      <Image
                        width={500}
                        height={500}
                        src={URL.createObjectURL(thirdImagePreview)}
                        alt=""
                      />
                    ) : !thirdImagePreview && thridInitialImage ? (
                      <Image
                        width={500}
                        height={500}
                        src={thridInitialImage}
                        alt=""
                      />
                    ) : null}

                    <input
                      required
                      accept="image/webp,image/jpeg,image/png"
                      onChange={thirdImageUpload}
                      type="file"
                      className="hidden"
                      id="thirdImage"
                    />
                  </div>
                </div>
              </div>
              <div className="h-full w-full flex items-center justify-center flex-col space-y-2   cursor-pointer transition ease-in duration-300  ">
                {" "}
                <h2 className="text-xl font-bold">(2)</h2>
                <label htmlFor="secondImage">
                  {uploading ? (
                    <Loader color="dark" />
                  ) : (
                    <IconUpload className="cursor-pointer" size={30} />
                  )}
                </label>
                <div className=" w-full h-full cursor-pointer p-4 bg-mainBlue hover:text-white  transition justify-center items-center flex ease-in duration-300 font-mainFont   text-center text-mainPurple hover:bg-mainPurple">
                  <div className=" flex-col w-full h-full cursor-pointer p-4 bg-mainBlue hover:text-white  transition justify-center items-center flex ease-in duration-300 font-mainFont   text-center text-mainPurple hover:bg-mainPurple">
                    {secondImagePreview ? (
                      <Image
                        width={500}
                        height={500}
                        src={URL.createObjectURL(secondImagePreview)}
                        alt=""
                      />
                    ) : !secondImagePreview && secondInitialImage ? (
                      <Image
                        width={500}
                        height={500}
                        src={secondInitialImage}
                        alt=""
                      />
                    ) : null}

                    <input
                      required
                      accept="image/webp,image/jpeg,image/png"
                      onChange={secondImageUpload}
                      type="file"
                      className="hidden"
                      id="secondImage"
                    />
                  </div>
                </div>
              </div>
              <div className="h-full flex-col w-full flex items-center justify-center space-y-2   cursor-pointer transition ease-in duration-300 flex-col  ">
                <h2 className="text-xl font-bold">(1)</h2>
                <label htmlFor="firstImage">
                  {uploading ? (
                    <Loader color="dark" />
                  ) : (
                    <IconUpload className="cursor-pointer" size={30} />
                  )}
                </label>
                <div className=" flex-col w-full h-full cursor-pointer p-4 bg-mainBlue hover:text-white  transition justify-center items-center flex ease-in duration-300 font-mainFont   text-center text-mainPurple hover:bg-mainPurple">
                  {firstImagePreview ? (
                    <Image
                      width={500}
                      height={500}
                      src={URL.createObjectURL(firstImagePreview)}
                      alt=""
                    />
                  ) : !firstImagePreview && firstInitialImage ? (
                    <Image
                      width={500}
                      height={500}
                      src={firstInitialImage}
                      alt=""
                    />
                  ) : null}

                  <input
                    required
                    accept="image/webp,image/jpeg,image/png"
                    onChange={firstImageUpload}
                    type="file"
                    className="hidden"
                    id="firstImage"
                  />
                </div>
              </div>
            </div>
            <Notification
              transition="fade"
              transitionDuration={600}
              transitionTimingFunction="ease"
              color="green"
              withCloseButton
              variant="outline"
            >
              <h2
                className={`${
                  alignLeft === true
                    ? "text-lg text-right"
                    : "text-lg text-left"
                }`}
              >
                {t("imageReq")}
              </h2>
            </Notification>
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
            <div className="">
              <LocationsMap city={city} cityLatLng={[mapLat, mapLng]} />
            </div>
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
              {features.length < 0
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
                  <div
                    key={i}
                    className="w-full my-3 h-32 bg-white rounded-md px-4  border-2  cursor-pointer hover:border-4 hover:border-mainBlue transition-all border-double  duration-200 flex items-center justify-center"
                  >
                    <div className="flex   w-3/4 flex-col  items-start space-y-3 justify-center ">
                      <div className="  flex  justify-center items-center space-x-2">
                        <p className="text-xs">تومان</p>
                        <p className="text-lg font-bold">{room.price}</p>
                        <p className="text-xs">TL</p>

                        <p className="text-lg font-bold">{room.priceL}</p>
                      </div>
                      <div className="flex   text-darkPurple justify-center items-center h-full space-x-3 ">
                        <div className="flex justify-center items-center text-darkPurple space-x-5   ">
                          <p>
                            <IconCirclePlus
                              className="cursor-pointer"
                              onClick={() => {
                                increaseQuantity(room.id);
                              }}
                            />
                          </p>
                          <p className="font-bold text-base">{room.quantity}</p>
                          <p>
                            <IconCircleMinus
                              className="cursor-pointer"
                              onClick={() => {
                                decreaseQuantity(room.id);
                              }}
                            />
                          </p>
                        </div>
                        <div className="flex bg-white rounded-md px-2 py-2 cursor-pointer transition ease-in duration-200 hover:bg-red-700 hover:text-white text-red-700 justify-center items-center ">
                          <IconTrash
                            onClick={() => {
                              deleteById(room.id);
                            }}
                            size={25}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex  w-1/4 text-right px-2  flex-col">
                      <h2 className="text-2xl font-bold"> {room.title}</h2>
                      <p className="text-xs"> {room.meal}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex w-full flex-col ">
              <Tabs
                color="blue"
                variant="pills"
                className="w-full"
                defaultValue="gallery"
              >
                <Tabs.List grow position="center">
                  {/* <Tabs.Tab value="messages">اتاق پیش فرض</Tabs.Tab> */}
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
                          onChange={(e) => {
                            setDefinedRoom((oldValues) => {
                              let newObject = oldValues;
                              oldValues.copacity = e;
                              return newObject;
                            });
                          }}
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
                          className="w-52 py-3 border-r-8   border-mainBlue my-4 bg-mainPurple transition ease-in duration-300 font-mainFont rounded-md text-white hover:text-mainPurple hover:bg-mainBlue"
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
                          <h2 className="text-2xl border-b-2 p-3 border-mainPurple rounded-md">
                            سام اتاق
                          </h2>
                          <h2 className="my-3">وعده</h2>
                        </div>
                      </div>
                      <div className="flex items-center h-full w-full px-5 justify-between">
                        <div className="flex space-x-1 p-2 justify-center items-center">
                          <h2>ریال</h2>
                          <h2 className="  text-xl text-mainPurple">65555</h2>
                        </div>
                        <h2 className="text-sm">قیمت برای هرشب</h2>
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
                          <h2 className="text-2xl border-b-2 p-3 border-mainPurple rounded-md">
                            اتاق ملکه
                          </h2>
                          <h2 className="my-3">وعده کامل</h2>
                        </div>
                      </div>
                      <div className="flex items-center h-full w-full px-5 justify-between">
                        <div className="flex space-x-1 p-2 justify-center items-center">
                          <h2>ریال</h2>
                          <h2 className="  text-xl text-mainPurple">65555</h2>
                        </div>
                        <h2 className="text-sm">قیمت برای هرشب</h2>
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
                <h2 className="text-2xl text-center">
                  {t("editHotelSuccess")}
                </h2>
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
                    ? "w-52 hover:text-mainPurple py-3 border-r-8 border-mainBlue my-4 bg-mainPurple transition ease-in duration-300 font-mainFont rounded-md text-white hover:bg-mainBlue"
                    : "w-52 hover:text-mainPurple py-3 border-r-8 border-mainBlue my-4 bg-mainPurple transition ease-in duration-300 font-mainFont rounded-md text-white hover:bg-mainBlue self-start"
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
