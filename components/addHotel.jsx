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
  IconCirclePlus,
  IconTrash,
  IconCircleMinus,
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
import cities from "../assets/cities/ir.json";

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

  let getlat = useSelector((state) => state.map.lat);
  let getLng = useSelector((state) => state.map.lng);
  let lat2 = useSelector((state) => state.map.lat2);
  let lng2 = useSelector((state) => state.map.lng2);
  let lat3 = useSelector((state) => state.map.lat3);
  let lng3 = useSelector((state) => state.map.lng3);

  const [definedRoom, setDefinedRoom] = useState({
    title: "",
    price: null,
    meal: null,
    quantity: 1,
  });

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
    console.log(rooms);
  });

  useEffect(() => {
    definedRoom.meal = meal;
  }, [meal]);
  const DynamicMap = dynamic(() => import("./map"), {
    ssr: false,
  });

  const [cityNames, setCityNames] = useState([]);

  const [rooms, setRooms] = useState([]);
  const dispatch = useDispatch();

  function filterRoom(roomId) {
    console.log(rooms);
  }
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
            <div className="flex space-y-1 flex-col">
              {rooms.map((room, i) => {
                return (
                  <div key={i} className="py-2 flex border rounded-lg">
                    <div className="flex w-full">
                      <div className="flex flex-col w-full">
                        <div className="flex text-darkPurple justify-center items-around h-full p-1 flex-col w-full">
                          <div className="flex justify-around text-darkPurple w-14  flex">
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
                          <div className="flex bg-red-500 rounded-full text-white justify-center items-center w-24">
                            <IconTrash
                              onClick={() => {
                                deleteById(room.id);
                              }}
                              size={25}
                            />
                          </div>
                        </div>
                        <div className="w-36 flex  justify-around">
                          <p>تومان</p>
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
                          onChange={(e) => {
                            setDefinedRoom((oldValues) => {
                              let newObject = oldValues;
                              oldValues.title = e.target.value;
                              return newObject;
                            });
                          }}
                          className="py-2 text-right px-2 w-full bg-gray-200"
                          type="text"
                          name="title"
                          placeholder="..."
                        />
                      </div>
                      <div className="flex w-full h-full text-right justify-center items-center">
                        <Select
                          searchable
                          value={meal}
                          className="text-right w-full"
                          onChange={setMeal}
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
                            handleNewRoom();
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
