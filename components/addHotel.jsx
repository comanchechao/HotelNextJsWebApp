import { useEffect, useState } from "react";
import {
  Modal,
  Select,
  MultiSelect,
  Rating,
  Loader,
  Group,
  Tabs,
  Notification,
} from "@mantine/core";
import {
  IconUpload,
  IconCirclePlus,
  IconTrash,
  IconCircleMinus,
} from "@tabler/icons";
import dynamic from "next/dynamic.js";
import { supabase } from "../lib/supabaseClient";
import { useSelector, useDispatch } from "react-redux";
import Compressor from "compressorjs";
import { useTranslation } from "next-i18next";
import { X, Buildings } from "phosphor-react";
// const LocationsMap = dynamic(() => import("./map"), {
//   ssr: false,
// });
export default function AddHotel({
  featuresData,
  cities,
  user,
  residenceTypes,
  countries,
}) {
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
  const [avragePriceRial, setAvragePriceRial] = useState(0);
  const [avragePriceL, setAvragePriceL] = useState(0);

  const [location, setLocation] = useState({});
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [residenceType, setResidenceType] = useState("");

  const [get, setGet] = useState(false);
  const [aboutHotel, setAboutHotel] = useState("");
  const [enteringHours, setEnteringHours] = useState(12);
  const [exitingHours, setExitingHours] = useState(14);
  const [alignLeft, setAlignLeft] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [hotelRules, setHotelRules] = useState("");

  let getlat = useSelector((state) => state.map.lat);
  let getLng = useSelector((state) => state.map.lng);
  let lat2 = useSelector((state) => state.map.lat2);
  let lng2 = useSelector((state) => state.map.lng2);
  let lat3 = useSelector((state) => state.map.lat3);
  let lng3 = useSelector((state) => state.map.lng3);
  const [cityNames, setCityNames] = useState([]);
  const [residenceTypesName, setResidenceTypesName] = useState([]);
  const [countryNames, setCountryNames] = useState([]);

  async function changeAlignment() {
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }

  const [definedRoom, setDefinedRoom] = useState({
    title: "",
    price: null,
    meal: null,
    copacity: 1,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  const [meal, setMeal] = useState("");

  function handleNewRoom() {
    setRooms(
      rooms.concat({
        id: Math.random(3, 50),
        title: definedRoom.title,
        price: definedRoom.price,
        meal: meal,
        copacity: 1,
        quantity: 1,
        startOfAvalibity: null,
        endOfAvalibility: null,
      })
    );
    var container = document.getElementById("RoomDiv");
    var inputs = container.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
    setDefinedRoom((oldValues) => {
      let newObject = oldValues;
      oldValues.title = "";
      oldValues.price = 0;
      oldValues.copacity = 1;
      oldValues.quantity = 1;
      return newObject;
    });
  }

  useEffect(() => {
    definedRoom.meal = meal;
  }, [definedRoom, meal]);

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
      prices: avragePriceRial,
      pricesL: avragePriceL,
      country: country,
      stars: value,
      rooms: rooms,
      residenceType: residenceType,
      hotelAbout: aboutHotel,
      locationLat: getlat,
      locationLng: getLng,
      address: address,
      enterTime: enteringHours,
      exitTime: exitingHours,
      hotelRules: hotelRules,
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
    setAlert2(true);
    setTimeout(() => {
      setAlert2(false);
    }, 2000);
    if (error) throw error;
  }

  useEffect(() => {
    console.log(lat2);
  });

  async function ResidenceTypesTranslate() {
    if (residenceTypes) {
      if (lng === "fa") {
        residenceTypesName.splice(0, residenceTypesName.length);

        await residenceTypes.forEach((residenceType, i) => {
          if (residenceTypesName.indexOf(residenceType.title) === -1) {
            if (residenceType.title) {
              residenceTypesName.push(residenceType.title);
            }
          }
        });
      } else {
        residenceTypesName.splice(0, residenceTypesName.length);
        await residenceTypes.forEach((residenceType, i) => {
          if (residenceTypesName.indexOf(residenceType.trTitle) === -1) {
            if (residenceType.trTitle) {
              residenceTypesName.push(residenceType.trTitle);
            }
          }
        });
      }
    }
  }
  async function CityTranslate() {
    if (cities) {
      if (lng === "fa") {
        cityNames.splice(0, cityNames.length);

        await cities.forEach((city, i) => {
          if (cityNames.indexOf(city.name) === -1) {
            if (city.name) {
              cityNames.push(city.name);
            }
          }
        });
      } else {
        cityNames.splice(0, cityNames.length);
        await cities.forEach((city, i) => {
          if (cityNames.indexOf(city.trTitle) === -1) {
            if (city.trTitle) {
              cityNames.push(city.trTitle);
            }
          }
        });
      }
    }
  }
  async function CountryTranslate() {
    if (countries) {
      if (lng === "fa") {
        countryNames.splice(0, countryNames.length);

        await countries.forEach((country, i) => {
          if (countryNames.indexOf(country.title) === -1) {
            if (country.title) {
              countryNames.push(country.title);
            }
          }
        });
      } else {
        countryNames.splice(0, countryNames.length);
        await countries.forEach((country, i) => {
          if (countryNames.indexOf(country.trTitle) === -1) {
            if (country.trTitle) {
              countryNames.push(country.trTitle);
            }
          }
        });
      }
    }
  }
  useEffect(() => {
    CityTranslate();
    ResidenceTypesTranslate();
    CountryTranslate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // if (cities) {
    //   cities.forEach((city, i) => {
    //     if (cityNames.indexOf(city.title) === -1) {
    //       if(city.title){
    //         cityNames.push(city.title);
    //       }
    //     }
    //   });

    //   console.log(cityNames);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // uploading images

  const [uploading, setUploading] = useState(false);

  async function compressFile(file) {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.5,
        success(result) {
          resolve(result);
        },
        error(err) {
          reject(err);
        },
      });
    });
  }
  const firstImageUpload = async (event) => {
    try {
      event.preventDefault();
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }
      const file = event.target.files[0];
      const compressedFile = await compressFile(file);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      setFirstImage(filePath);

      let { error: uploadError } = await supabase.storage
        .from("hotel-images")
        .upload(filePath, compressedFile, {
          contentType: "image/png",
          contentType: "image/webp",
          contentType: "image/jpeg",
        });

      if (uploadError) {
        throw uploadError;
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setUploading(false);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
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
      const compressedFile = await compressFile(file);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      setSecondImage(filePath);

      let { error: uploadError } = await supabase.storage
        .from("hotel-images")
        .upload(filePath, compressedFile, {
          contentType: "image/png",
          contentType: "image/webp",
          contentType: "image/jpeg",
        });

      if (uploadError) {
        throw uploadError;
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setUploading(false);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
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
      const compressedFile = await compressFile(file);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      setThirdImage(filePath);

      let { error: uploadError } = await supabase.storage
        .from("hotel-images")
        .upload(filePath, compressedFile, {
          contentType: "image/png",
          contentType: "image/webp",
          contentType: "image/jpeg",
        });

      if (uploadError) {
        throw uploadError;
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setUploading(false);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
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
      const compressedFile = await compressFile(file);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      setFourthImage(filePath);

      let { error: uploadError } = await supabase.storage
        .from("hotel-images")
        .upload(filePath, compressedFile, {
          contentType: "image/png",
          contentType: "image/webp",
          contentType: "image/jpeg",
        });

      if (uploadError) {
        throw uploadError;
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setUploading(false);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
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
                {t("hotelPics")}
              </h3>
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
                <h1 className="text-2xl text-center">{t("uploadSuccess")}</h1>
              </Notification>
            ) : (
              <div></div>
            )}
            <div className="flex justify-around space-x-1 lg:space-x-4 lg:px-0 px-4 h-28 lg:h-rem22 ">
              <div className="h-full w-full flex items-center justify-center flex-col space-y-2   cursor-pointer transition ease-in duration-300  ">
                <h2 className="text-xl font-bold">(4)</h2>
                <div className=" w-full h-full cursor-pointer p-4 bg-mainBlue hover:text-white  transition justify-center items-center flex ease-in duration-300 font-mainFont   text-center text-mainPurple hover:bg-mainPurple">
                  <label htmlFor="fourthImage">
                    {uploading ? (
                      <Loader color="dark" />
                    ) : (
                      <IconUpload className="cursor-pointer" size={30} />
                    )}
                  </label>
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

              <div className="h-full w-full flex items-center justify-center flex-col space-y-2   cursor-pointer transition ease-in duration-300  ">
                <h2 className="text-xl font-bold">(3)</h2>
                <div className=" w-full h-full cursor-pointer p-4 bg-mainBlue hover:text-white  transition justify-center items-center flex ease-in duration-300 font-mainFont   text-center text-mainPurple hover:bg-mainPurple">
                  <label htmlFor="thirdImage">
                    {uploading ? (
                      <Loader color="dark" />
                    ) : (
                      <IconUpload className="cursor-pointer" size={30} />
                    )}
                  </label>
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
              <div className="h-full w-full flex items-center justify-center flex-col space-y-2   cursor-pointer transition ease-in duration-300  ">
                {" "}
                <h2 className="text-xl font-bold">(2)</h2>
                <div className=" w-full h-full cursor-pointer p-4 bg-mainBlue hover:text-white  transition justify-center items-center flex ease-in duration-300 font-mainFont   text-center text-mainPurple hover:bg-mainPurple">
                  <label htmlFor="secondImage">
                    {uploading ? (
                      <Loader color="dark" />
                    ) : (
                      <IconUpload className="cursor-pointer" size={30} />
                    )}
                  </label>
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
              <div className="h-full w-full flex items-center justify-center space-y-2   cursor-pointer transition ease-in duration-300 flex-col  ">
                <h2 className="text-xl font-bold">(1)</h2>
                <div className=" w-full h-full cursor-pointer p-4 bg-mainBlue hover:text-white  transition justify-center items-center flex ease-in duration-300 font-mainFont   text-center text-mainPurple hover:bg-mainPurple">
                  <label htmlFor="firstImage">
                    {uploading ? (
                      <Loader color="dark" />
                    ) : (
                      <IconUpload className="cursor-pointer" size={30} />
                    )}
                  </label>
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
              <h1
                className={`${
                  alignLeft === true
                    ? "text-lg text-right"
                    : "text-lg text-left"
                }`}
              >
                {t("imageReq")}
              </h1>
            </Notification>
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
                maxlength="150"
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
                maxlength="150"
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
            <div
              className={`${
                alignLeft === true
                  ? "flex flex-col w-full h-full text-right justify-center items-end"
                  : "flex flex-col w-full h-full text-right justify-center items-start"
              }`}
            >
              <h3 className="text-xl my-8 border-b-4   border-mainBlue pb-2  px-2  rounded-md">
                {t("country")}
              </h3>
              <Select
                transitionDuration={150}
                transition="pop-top-left"
                transitionTimingFunction="ease"
                variant="default"
                radius="md"
                placeholder={t("enterCountry")}
                size="md"
                required
                value={country}
                onChange={setCountry}
                searchable
                className="text-right  w-full"
                data={countryNames}
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
                {t("residenceTypes")}
              </h3>
              <Select
                transitionDuration={150}
                transition="pop-top-left"
                transitionTimingFunction="ease"
                variant="default"
                radius="md"
                placeholder={t("enterResidenceType")}
                size="md"
                required
                searchable
                value={residenceType}
                onChange={setResidenceType}
                className="text-right"
                data={residenceTypesName}
              />
            </div>
            {/* <div className="flex w-full justify-center items-center">
              <LocationsMap
                className="z-10"
                city={city}
                cityLatLng={[mapLat, mapLng]}
              />
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
                  setAvragePriceRial(e.target.value);
                }}
                className="py-2 text-right font-mainFont px-2 w-full bg-gray-200 rounded-md"
                type="number"
                name="price"
                placeholder={t("enterRial")}
              />{" "}
              <input
                required
                onChange={(e) => {
                  setAvragePriceL(e.target.value);
                }}
                className="py-2 my-3 text-right font-mainFont px-2 w-full bg-gray-200 rounded-md"
                type="number"
                name="price"
                placeholder={t("enterLir")}
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
                  setHotelRules(e.target.value);
                }}
                name="about hotel"
                className="py-2 text-right font-mainFont px-2 w-full bg-gray-200 rounded-md"
                id=""
                cols="10"
                rows="5"
                maxlength="500"
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
                  type="time"
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
                maxlength="3000"
              ></textarea>
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
                    <p className="text-2xl">{t("newRoom")}</p>
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="gallery" pt="xs">
                  <div className="flex flex-col  w-full h-full">
                    <div
                      id="RoomDiv"
                      className="flex space-y-2 w-full h-full flex-col"
                    >
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
                          clearable
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
                          {t("avrgNight")}
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
                          {t("roomCapacity")}
                        </h3>
                        <Select
                          searchable
                          clearable
                          onChange={(e) => {
                            setDefinedRoom((oldValues) => {
                              let newObject = oldValues;
                              oldValues.copacity = e;
                              return newObject;
                            });
                          }}
                          transitionDuration={150}
                          transition="pop-top-left"
                          transitionTimingFunction="ease"
                          variant="default"
                          radius="md"
                          size="md"
                          className="text-right w-full"
                          data={[
                            { value: "1", label: "1" },
                            { value: "2", label: "2" },
                            { value: "3", label: "3" },
                            { value: "4", label: "4" },
                          ]}
                        />
                        {rooms.map((room, i) => {
                          return (
                            <div
                              key={i}
                              className="w-full h-32 bg-white rounded-md px-4  border-2 my-6 flex items-center justify-center"
                            >
                              <div className="flex   w-3/4 flex-col  items-start space-y-3 justify-center ">
                                <div className="  flex  justify-center items-center space-x-2">
                                  <p className="text-xs">{t("currency")}</p>
                                  <p className="text-lg font-bold">
                                    {room.price}
                                  </p>
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
                                    <p className="font-bold text-base">
                                      {room.quantity}
                                    </p>
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
                                <h1 className="text-2xl font-bold">
                                  {" "}
                                  {room.title}
                                </h1>
                                <p className="text-xs"> {room.meal}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex items-end justify-center w-full">
                        <button
                          onClick={() => {
                            if (definedRoom.title !== "") {
                              handleNewRoom();
                            }
                          }}
                          className="w-52 hover:text-mainPurple py-3 border-r-8   border-mainBlue my-4 bg-mainPurple transition ease-in duration-300 font-mainFont rounded-md text-white hover:bg-mainBlue"
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
            {alert2 ? (
              <Notification
                transition="fade"
                transitionDuration={600}
                transitionTimingFunction="ease"
                color="green"
                withCloseButton
                variant="outline"
              >
                <h1 className="text-2xl text-center">{t("addHotelSuccess")}</h1>
              </Notification>
            ) : (
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
                  {t("confirmHotel")}
                </button>
              </div>
            )}
          </div>
        </div>
      </Modal>

      <Group position="center">
        <button
          onClick={() => {
            setOpened(true);
          }}
          className="w-52 py-2 flex justify-center items-center border-2 text-lg text-white border-r-8 border-mainBlue bg-mainPurple   transition ease-in duration-300 font-mainFont rounded-md hover:text-mainPurple  hover:bg-mainBlue"
        >
          {t("newHotel")}
          <Buildings className="ml-2" size={32} weight="light" />
        </button>
      </Group>
    </>
  );
}
