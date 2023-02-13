import { useCallback, useEffect, useState } from "react";
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
  IconSettings,
} from "@tabler/icons";
import dynamic from "next/dynamic.js";
import { supabase } from "../lib/supabaseClient";
import { useSelector, useDispatch } from "react-redux";
import { roomActions } from "../store/room";
import AddRoom from "./addRoom";
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

export default function AddHotel({ lat, lng }) {
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

  useEffect(() => {});

  const DynamicMap = dynamic(() => import("./map"), {
    ssr: false,
  });

  const [cityNames, setCityNames] = useState([]);

  let room = useSelector((state) => state.room.room);
  let room2 = useSelector((state) => state.room.room2);
  let rooms = [room, room2];
  const dispatch = useDispatch();

  // handing submit event

  async function handleSubmit() {
    const { data, error } = await supabase
      .from("Hotels")
      .insert({
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
      })
      .select("id");
    console.log(
      "title:",
      title,
      "features",
      features,
      "stars",
      value,
      "hotel id",
      data
    );
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
              {rooms.map((room) => {
                return (
                  <div className="border">
                    {room.title} {room.price} {room.meal}
                  </div>
                );
              })}
            </div>
            <div className="flex w-full ">
              <Tabs className="w-full" variant="outline" defaultValue="gallery">
                <Tabs.List grow position="center">
                  <Tabs.Tab
                    position="center"
                    value="gallery"
                    icon={<IconPhoto size={14} />}
                  >
                    تعریف اتاق
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="messages"
                    icon={<IconMessageCircle size={14} />}
                  >
                    اتاق پیش فرض
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="gallery" pt="xs">
                  <div className="flex flex-col  w-full h-full">
                    <div className="flex space-y-2 w-full h-full flex-col">
                      <div className="flex  flex-col justify-center space-x-2 text-right items-end w-full h-full">
                        <label className="w-24" htmlFor="title">
                          :عنوان اتاق
                        </label>
                        <input
                          className="py-2 text-right px-2 w-full bg-gray-200"
                          type="text"
                          name="title"
                          placeholder="..."
                        />
                      </div>
                      <div className="flex w-full h-full text-right justify-center items-center">
                        <Select
                          searchable
                          className="text-right w-full"
                          label=":وعده غذایی اتاق"
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
                      <div className="flex  flex-col justify-center space-x-2 text-right items-end w-full h-full">
                        <label className="w-24" htmlFor="price">
                          :قیمت هرشب
                        </label>
                        <input
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
                          label=":ظرفیت اتاق"
                          data={[
                            { value: "1", label: "1" },
                            { value: "2", label: "2" },
                            { value: "3", label: "3" },
                            { value: "4", label: "4" },
                          ]}
                        />
                      </div>
                      <div className="flex">
                        <button
                          onClick={() => {
                            setOpened(false);
                          }}
                          className="w-52 py-3 border-r-8 border-mainBlue my-4 bg-mainPurple transition ease-in duration-300 font-mainFont rounded-md text-white hover:bg-mainBlue"
                        >
                          افزودن
                        </button>
                      </div>
                    </div>
                  </div>
                </Tabs.Panel>

                <Tabs.Panel value="messages" pt="xs">
                  <div className="flex flex-col w-full h-full">
                    <div className="flex bg-white justify-around divide-y my-1 divide-gray-300 rounded-md flex-col w-full h-44 border">
                      <div className="flex w-full justify-between">
                        <div className="flex h-full items-end justify-center px-4">
                          <button
                            onClick={() => {
                              dispatch(
                                roomActions.setRoom({
                                  title: "سام اتاق",
                                  price: 3000,
                                  meal: "صبحانه",
                                })
                              );
                            }}
                            className="w-24 h-14 border-r-8 border-mainBlue my-4 bg-mainPurple transition ease-in duration-300 font-mainFont rounded-md text-white hover:bg-mainBlue"
                          >
                            افزودن
                          </button>
                        </div>
                        <div className="flex flex-col py-4 px-5 justify-center items-end ">
                          <h1 className="text-2xl border-b-2 p-3 border-mainPurple rounded-md">
                            سام اتاق
                          </h1>
                          <h2 className="my-3">وعده</h2>
                        </div>
                      </div>
                      <div className="flex items-center h-full w-full px-5 justify-between">
                        <div className="flex space-x-1 p-2 justify-center items-center">
                          <h2>ریال</h2>
                          <h2 className="  text-3xl text-mainPurple">65555</h2>
                        </div>
                        <h1 className="text-lg">قیمت برای هرشب</h1>
                      </div>
                    </div>
                    <div className="flex bg-white justify-around divide-y my-1 divide-gray-300 rounded-md flex-col w-full h-44 border">
                      <div className="flex w-full justify-between">
                        <div className="flex h-full items-end justify-center px-4">
                          <button
                            onClick={() => {
                              dispatch(
                                roomActions.setRoom2({
                                  title: "اتاق ملکه",
                                  price: 655555,
                                  meal: "کامل",
                                })
                              );
                            }}
                            className="w-24 h-14 border-r-8 border-mainBlue my-4 bg-mainPurple transition ease-in duration-300 font-mainFont rounded-md text-white hover:bg-mainBlue"
                          >
                            افزودن
                          </button>
                        </div>
                        <div className="flex flex-col py-4 px-5 justify-center items-end ">
                          <h1 className="text-2xl border-b-2 p-3 border-mainPurple rounded-md">
                            اتاق ملکه
                          </h1>
                          <h2 className="my-3">وعده کامل</h2>
                        </div>
                      </div>
                      <div className="flex items-center h-full w-full px-5 justify-between">
                        <div className="flex space-x-1 p-2 justify-center items-center">
                          <h2>ریال</h2>
                          <h2 className="  text-3xl text-mainPurple">65555</h2>
                        </div>
                        <h1 className="text-lg">قیمت برای هرشب</h1>
                      </div>
                    </div>
                  </div>
                </Tabs.Panel>

                <Tabs.Panel value="settings" pt="xs">
                  Settings tab content
                </Tabs.Panel>
              </Tabs>
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
