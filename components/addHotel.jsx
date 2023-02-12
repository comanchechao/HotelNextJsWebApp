import { useMemo, useEffect, useState } from "react";
import {
  Modal,
  Select,
  MultiSelect,
  Rating,
  Loader,
  Group,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons";
import dynamic from "next/dynamic.js";
import { supabase } from "../lib/supabaseClient";
import { useSelector, createSelector } from "react-redux";
// let cities = [
//   { value: "1", label: "تهران" },
//   { value: "2", label: "شیراز" },
//   { value: "3", label: "رشت" },
//   { value: "4", label: "تنکابن" },
//   { value: "1", label: "بتریز" },
//   { value: "2", label: "شهسوار" },
//   { value: "3", label: "گنبد کاووس" },
//   { value: "4", label: "کاشان" },
//   { value: "1", label: "کرمان" },
//   { value: "2", label: "شیراز" },
//   { value: "3", label: "رشت" },
//   { value: "4", label: "تنکابن" },
//   { value: "1", label: "تهران" },
//   { value: "2", label: "شیراز" },
//   { value: "3", label: "رشت" },
//   { value: "4", label: "تنکابن" },
// ];

export default function AddHotel() {
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
  const [city, setCity] = useState("");
  const [get, setGet] = useState(false);

  const DynamicMap = dynamic(() => import("./map"), {
    ssr: false,
  });

  const [cityNames, setCityNames] = useState([]);

  // handing submit event
  let lat = useSelector((state) => state.map.lat);
  let lng = useSelector((state) => state.map.lng);

  let lat2 = useSelector((state) => state.map.lat);
  let lng2 = useSelector((state) => state.map.lng);

  async function handleSubmit() {
    const { error } = await supabase.from("Hotels").insert({
      title: title,
      firstImage: firstImage,
      secondImage: secondImage,
      thirdImage: thirdImage,
      fourthImage: fourthImage,
      features: features,
      prices: avragePrice,
      stars: value,
      locationLat: lat,
      locationLng: lng,
    });
    console.log(
      "title:",
      title,
      "features",
      features,
      "stars",
      value,

      "location ",
      { lat: lat, lng: lng }
    );

    if (error) throw error;
    alert("done");
  }
  // useEffect(() => {
  //   if (cities) {
  //     cities.forEach((city, i) => {
  //       if (cityNames.indexOf(city.name) === -1) {
  //         cityNames.push(city.name);
  //       }
  //     });
  //   }
  // }, []);

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
        size="800px"
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        title="Add new Hotel"
      >
        <div className="flex flex-col  w-full h-full">
          <div className="flex space-y-5 w-full h-full flex-col">
            <div className="flex p-5 w-full justify-center items-center">
              <DynamicMap city={city} />
            </div>
            <div className="flex justify-around flex-wrap">
              <div className="flex p-2 w-full text-right justify-end">
                :تصاویر هتل
              </div>
              <div className="w-14 py-4 bg-darkPurple transition justify-center items-center flex ease-in duration-300 font-mainFont rounded-full text-center text-white hover:bg-mainBlue">
                <label htmlFor="firstImage">
                  {uploading ? (
                    <Loader color="grape" />
                  ) : (
                    <IconUpload size={30} />
                  )}
                </label>
                <input
                  onChange={firstImageUpload}
                  type="file"
                  className="hidden"
                  id="firstImage"
                />
              </div>
              <div className="w-14 py-4 bg-darkPurple transition justify-center items-center flex ease-in duration-300 font-mainFont rounded-full text-center text-white hover:bg-mainBlue">
                <label htmlFor="secondImage">
                  {uploading ? (
                    <Loader color="grape" />
                  ) : (
                    <IconUpload size={30} />
                  )}
                </label>
                <input
                  onChange={secondImageUpload}
                  type="file"
                  className="hidden"
                  id="secondImage"
                />
              </div>
              <div className="w-14 py-4 bg-darkPurple transition justify-center items-center flex ease-in duration-300 font-mainFont rounded-full text-center text-white hover:bg-mainBlue">
                <label htmlFor="thirdImage">
                  {uploading ? (
                    <Loader color="grape" />
                  ) : (
                    <IconUpload size={30} />
                  )}
                </label>
                <input
                  onChange={thirdImageUpload}
                  type="file"
                  className="hidden"
                  id="thirdImage"
                />
              </div>
              <div className="w-14 py-4 bg-darkPurple transition justify-center items-center flex ease-in duration-300 font-mainFont rounded-full text-center text-white hover:bg-mainBlue">
                <label htmlFor="fourthImage">
                  {uploading ? (
                    <Loader color="grape" />
                  ) : (
                    <IconUpload size={30} />
                  )}
                </label>
                <input
                  onChange={fourthImageUpload}
                  type="file"
                  className="hidden"
                  id="fourthImage"
                />
              </div>
              <div className="w-14 py-4 bg-darkPurple transition justify-center items-center flex ease-in duration-300 font-mainFont rounded-full text-center text-white hover:bg-mainBlue">
                <label htmlFor="fifthImage">
                  {uploading ? (
                    <Loader color="grape" />
                  ) : (
                    <IconUpload size={30} />
                  )}
                </label>
                <input type="file" className="hidden" id="fifthImage" />
              </div>
            </div>
            <div className="flex  flex-col justify-center space-x-2 text-right items-end w-full h-full">
              <label className="w-24" htmlFor="title">
                :عنوان هتل
              </label>
              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="py-2 text-right px-2 w-full bg-gray-200"
                type="text"
                name="title"
                placeholder="..."
              />
            </div>
            <div className="flex w-full h-full text-right justify-between items-center">
              <MultiSelect
                value={features}
                onChange={setFeatures}
                data={[
                  { value: "صبحانه", label: "استخر" },
                  { value: "صبحانه و نهار", label: "خشکشویی" },
                  { value: "بدون وعده غذایی", label: "اینترنت بی سیم" },
                  { value: "شام", label: "سونا" },
                ]}
              />
              <p>:امکانات هتل را انتخاب کنید</p>
            </div>
            <div className="flex w-full h-full text-right justify-center items-center">
              <div className="flex w-full justify-between items-center h-full">
                <Rating value={value} onChange={setValue} size="lg" count={5} />
                <p>:ستاره های هتل</p>
              </div>
            </div>
            <div className="flex  flex-col justify-center space-x-2 text-right items-end w-full h-full">
              <label className="w-24" htmlFor="price">
                :قیمت هرشب
              </label>
              <input
                onChange={(e) => {
                  setAvragePrice(e.target.value);
                }}
                className="py-2 text-right px-2 w-full bg-gray-200"
                type="number"
                name="price"
                placeholder="..."
              />
            </div>
            <div className="flex w-full h-full text-right justify-center items-center">
              <Select
                searchable
                className="text-right w-full"
                label=":تعداد اتاق ها"
                data={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "4", label: "4" },
                ]}
              />
            </div>
            <div className="flex w-full h-full text-right justify-center items-center">
              <Select
                value={city}
                searchable
                className="text-right w-full"
                label=":شهر"
                data={cityNames}
              />
            </div>

            <div className="flex">
              <button
                onClick={() => {
                  handleSubmit();
                }}
                className="w-52 py-3 border-r-8 border-mainBlue my-4 bg-mainPurple transition ease-in duration-300 font-mainFont rounded-md text-white hover:bg-mainBlue"
              >
                افزودن
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
          className="w-52 py-3 border-2 text-lg text-darkPurple border-r-8 border-mainPurple bg-mainBlue transition ease-in duration-300 font-mainFont rounded-md hover:text-darkPurple hover:bg-gray-50"
        >
          هتل جدید
        </button>
      </Group>
    </>
  );
}
