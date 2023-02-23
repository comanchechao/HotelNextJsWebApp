import hotelOne from "../../../assets/images/hotelone.jpg";
import hotelTwo from "../../../assets/images/hoteltwo.jpg";
import hotelThree from "../../../assets/images/hotelthree.jpg";
import hotelFour from "../../../assets/images/hotelfour.jpg";
import Image from "next/image";
import Navbar from "../../../components/Navbar";
import RoomModal from "../../../components/roomModal";
import AddRoom from "../addRoom";
import Footer from "../../../components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import {
  IconStar,
  IconBarbell,
  IconCoffee,
  IconChefHat,
  IconHotelService,
  IconDoor,
  IconDoorOff,
  IconBath,
  IconWifi,
  IconWashMachine,
  IconEdit,
  IconCheck,
  IconX,
  IconEraser,
} from "@tabler/icons";
import { Tabs, Modal, Select } from "@mantine/core";

import {
  EditablePreview,
  IconButton,
  Input,
  useEditableControls,
  ButtonGroup,
  Editable,
  Flex,
  EditableInput,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

export const getStaticPaths = async () => {
  const { data, error } = await supabase.from("Hotels").select();
  if (error) throw error;

  const paths = data.map((hotel) => {
    return {
      params: { id: hotel.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const { data, error } = await supabase.from("Hotels").select().eq("id", id);
  if (error) throw error;

  return {
    props: { hotel: data[0] },
  };
};

export default function HotelDetail({ hotel }) {
  const DynamicMap = dynamic(
    () => import("../../../components/mapWithLocation"),
    {
      ssr: false,
    }
  );

  const store = useSelector((state) => state.main.title);

  useEffect(() => {
    console.log(store);
  });
  const [opened, setOpened] = useState(false);
  let images = [hotelOne, hotelTwo, hotelThree, hotelFour];

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();
    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<IconCheck />} {...getSubmitButtonProps()} />
        <IconButton icon={<IconX />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<IconEdit />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  let rooms = [
    {
      title: "دو تخته برای یک نفر",
      meal: "صبحانه",
      max: "1",
      price: 400000,
    },
    {
      title: "دو تخته برای دو نفر",
      meal: "صبحانه",
      max: "1",
      price: 400000,
    },
    {
      title: "یک تخته برای یک نفر",
      meal: "شام",
      max: "1",
      price: 35500000,
    },
    {
      title: "دو تخته برای یک نفر",
      meal: "صبحانه",
      max: "3",
      price: 5500000,
    },
    {
      title: "دو تخته برای یک نفر",
      meal: "بدون وعده غذایی",
      max: "1",
      price: 4233000,
    },
  ];
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="flex pt-10 flex-col w-full px-20 bg-gray-200">
        <div className="flex w-full overflow-x-scroll">
          {images.map((image, i) => {
            return <Image key={i} alt="" className="h-96 w-96" src={image} />;
          })}
        </div>
        <div className="p-5 mt-8 mb-10 bg-white   flex flex-col ">
          <div className="flex   text-4xl items-center space-x-1 w-full justify-end">
            <Editable
              textAlign="center"
              defaultValue={hotel.title}
              fontSize="4xl"
              isPreviewFocusable={false}
            >
              <EditablePreview />
              {/* Here is the custom input */}
              <Input as={EditableInput} />
              <EditableControls />
            </Editable>
          </div>
          <div className="flex space-x-1 justify-end w-full">
            <h2>ستاره</h2>
            <h2>{hotel.stars}</h2>
            <h2>
              <IconStar />
            </h2>
          </div>
        </div>
        <div className="mt-5  bg-white   flex flex-col w-full">
          <div className="flex p-5 items-center space-x-1 w-full justify-end">
            <h1 className=" text-gray-800 text-3xl">اتاق ها</h1>
          </div>
          <div className="flex text-mainPurple  justify-center w-full text-lg">
            <Tabs color="yellow" variant="pills" defaultValue="first">
              <Tabs.List grow position="center">
                <Tabs.Tab value="second">
                  <span className="text-lg">صبحانه</span>
                </Tabs.Tab>
                <Tabs.Tab value="third">
                  <span className="text-lg">بدون وعده غذایی</span>
                </Tabs.Tab>
                <Tabs.Tab value="first">
                  <span className="text-lg">همه موارد</span>
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </div>
        </div>
        <div className="p-4 bg-gray-200 flex space-y-3 flex-col lg:px-20 w-full">
          {hotel.rooms.map((room, i) => {
            return (
              <div
                key={i}
                className="flex bg-white justify-around divide-y my-5 divide-gray-300 rounded-md flex-col w-full h-64"
              >
                <div className="flex flex-col py-4 px-5 justify-center items-end ">
                  <h1 className="text-2xl border-b-2 p-3 border-mainPurple rounded-md">
                    {room.title}
                  </h1>
                  <h2 className="my-3">{room.meal}</h2>
                </div>
                <div className="flex items-center h-full w-full px-5 justify-between">
                  <div className="flex space-x-1 p-2 justify-center items-center">
                    <h2>ریال</h2>
                    <h2 className="  text-3xl text-mainPurple">{room.price}</h2>
                  </div>
                  <h1 className="text-lg">قیمت برای هرشب</h1>
                </div>
                <div className="flex justify-center items-center h-full">
                  <RoomModal Room={room} />
                </div>
              </div>
            );
          })}
          <div className="flex justify-around">
            <button className="w-48 py-4 my-6 bg-mainPurple border-r-8 border-mainBlue transition ease-in duration-300 font-mainFont rounded-md  text-white hover:bg-mainBlue">
              بیشتر نشونم بده
            </button>
            <AddRoom />
          </div>
        </div>
        <div className="flex p-5 items-center bg-white space-x-1 w-full justify-between">
          <h1
            onClick={() => setOpened(true)}
            className="  text-mainPurple text-sm cursor-pointer hover:text-blue-800"
          >
            مشاهده همه
          </h1>
          <h1 className="  text-gray-700 text-2xl">امکانات و ویژگی ها</h1>
        </div>
        <div className="flex w-full bg-gray-200 px-4 lg:px-20 flex-col">
          <div className="rounded-md bg-white grid grid-cols-2 grid-rows-2 lg:grid-cols-3 lg:grid-rows-3 lg:p-5 divdie-x divide-black  m-4 ">
            <div className="flex px-3 justify-between items-center">
              <h2>
                <IconBarbell size={32} />
              </h2>
              <h2>سالن بدنسازی</h2>
            </div>
            <div className="flex px-3 justify-between items-center">
              <h2>
                <IconCoffee size={32} />
              </h2>
              <h2>کافی شاپ</h2>
            </div>
            <div className="flex px-3 justify-between items-center">
              <h2>
                <IconChefHat size={32} />
              </h2>
              <h2>رستوران</h2>
            </div>
            <div className="flex px-3 justify-between items-center">
              <h2>
                <IconHotelService size={32} />
              </h2>
              <h2>سرویس روزانه</h2>
            </div>
            <div className="flex px-3 justify-between items-center">
              <h2>
                <IconBath size={32} />
              </h2>
              <h2>حمام</h2>
            </div>
            <div className="flex px-3 justify-between items-center">
              <h2>
                <IconWifi size={32} />
              </h2>
              <h2>خدمات اینترنت</h2>
            </div>
            <div className="flex px-3 justify-between items-center">
              <h2>
                <IconWashMachine size={32} />
              </h2>
              <h2>خشکشویی</h2>
            </div>
          </div>

          {/* this is the modal for hotel feature */}
          <Modal opened={opened} onClose={() => setOpened(false)}>
            <div className=" bg-gray-100 flex flex-col  divdie-x divide-black  ">
              <div className="flex justify-center items-center w-full text-right h-14">
                <h1 className="text-lg   py-2">امکانات هتل</h1>
              </div>
              <div className="flex px-3 justify-between items-center">
                <h2 className="flex flex-row">
                  <IconEraser
                    className="text-red-500 hover:text-red-700"
                    size={32}
                  />

                  <IconBarbell size={32} />
                </h2>
                <h2>سالن بدنسازی</h2>
              </div>
              <div className="flex px-3 justify-between items-center">
                <h2 className="flex flex-row">
                  <IconEraser
                    className="text-red-500 hover:text-red-700"
                    size={32}
                  />

                  <IconCoffee size={32} />
                </h2>
                <h2>کافی شاپ</h2>
              </div>
              <div className="flex px-3 justify-between items-center">
                <h2 className="flex flex-row">
                  <IconEraser
                    className="text-red-500 hover:text-red-700"
                    size={32}
                  />

                  <IconChefHat size={32} />
                </h2>
                <h2>رستوران</h2>
              </div>
              <div className="flex px-3 justify-between items-center">
                <h2 className="flex flex-row">
                  <IconEraser
                    className="text-red-500 hover:text-red-700"
                    size={32}
                  />

                  <IconHotelService size={32} />
                </h2>
                <h2>سرویس روزانه</h2>
              </div>
              <div className="flex px-3 justify-between items-center">
                <h2 className="flex flex-row">
                  <IconEraser
                    className="text-red-500 hover:text-red-700"
                    size={32}
                  />

                  <IconBath size={32} />
                </h2>
                <h2>حمام</h2>
              </div>
              <div className="flex px-3 justify-between items-center">
                <h2 className="flex flex-row">
                  <IconEraser
                    className="text-red-500 hover:text-red-700"
                    size={32}
                  />

                  <IconWifi size={32} />
                </h2>
                <h2>خدمات اینترنت</h2>
              </div>
              <div className="flex px-3 justify-between items-center">
                <h2 className="flex flex-row">
                  <IconEraser
                    className="text-red-500 hover:text-red-700"
                    size={32}
                  />

                  <IconWashMachine size={32} />
                </h2>
                <h2>خشکشویی</h2>
              </div>
              <div className="flex h-full flex-row-reverse w-full text-right justify-center flex-col">
                <Select
                  searchable
                  clearable
                  className="w-full text-right"
                  label="امکانات جدید"
                  data={[
                    { value: "باشگاه", label: "باشگاه" },
                    { value: "استخر", label: "استخر" },
                    { value: "بار", label: "بار" },
                    { value: "کافی شاپ", label: "کافی شاپ" },
                  ]}
                />
                <div className="flex w-full h-full">
                  <button className="text-center flex justify-center items-center w-full h-full py-2 bg-darkPurple transition ease-in duration-300 font-mainFont  text-white hover:bg-mainBlue">
                    اضافه کردن
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
        <div className="flex p-5 items-center space-x-1 w-full bg-white justify-between">
          <h1 className="  text-mainPurple text-sm cursor-pointer hover:text-blue-800">
            تغییر موقعیت
          </h1>
          <h1 className="   text-gray-700 text-2xl">مکان و موقیت </h1>
        </div>
        <div className="flex bg-gray-200 items-center   justify-center p-5">
          <div className="flex  items-center   justify-center">
            <DynamicMap
              secondLocation={hotel.secondLocation}
              firstLocation={hotel.firstLocation}
              lat={hotel.locationLat}
              lng={hotel.locationLng}
            />
          </div>
        </div>
        <div className="flex h-full p-5 items-center space-x-1 w-full justify-end bg-white">
          <h1 className="  text-gray-700 text-2xl">قوانین و مقررات </h1>
        </div>
        <div className="flex py-5  bg-gray-200  justify-center w-full">
          <div className="flex rounded-md   flex-col w-full bg-gray-50">
            <div className="flex p-2 justify-end  h-18 w-full">
              <div className="p-5  flex justify-end w-full lg:w-1/2">
                <div className="flex text-xl   items-end justify-center w-32  flex-col">
                  <div className="flex items-center justify-center">
                    <IconDoor size={25} />
                    <p className="text-md  ">ساعت ورود</p>
                  </div>
                  <Editable
                    textAlign="center"
                    defaultValue="12:00"
                    fontSize="4xl"
                    isPreviewFocusable={false}
                  >
                    <EditablePreview />
                    {/* Here is the custom input */}
                    <Input as={EditableInput} />
                    <EditableControls />
                  </Editable>
                </div>
                <div className="flex items-end text-xl justify-center w-52    flex-col">
                  <div className="flex items-center justify-center">
                    <IconDoorOff size={25} />
                    <p className="text-md  ">ساعت خروج</p>
                  </div>
                  <Editable
                    textAlign="center"
                    defaultValue="14:00"
                    fontSize="4xl"
                    isPreviewFocusable={false}
                  >
                    <EditablePreview />
                    {/* Here is the custom input */}
                    <Input as={EditableInput} />
                    <EditableControls />
                  </Editable>
                </div>
              </div>
            </div>
            <div className="p-5 flex w-full flex-col">
              <div className="flex  w-full justify-end items-center">
                <h1 className="text-lg text-black  ">نکات ضروری</h1>
              </div>
              <div className="flex text-right flex-col">
                <Editable
                  textAlign="end"
                  defaultValue=" *طبق اعلام هتل اقامت های اکونومی و اقامت های ساعتی خدمات
                  صبحانه و همچنین امکان کنسلی ندارد*طبق اعلام هتل خدمات خانه
                  داری در اقامت اکونومی به صورت محدود ارائه می گردد* نرخ میهمان
                  غیر ایرانی در این هتل متفاوت می باشد. لطفا قبل از رزرو استعلام
                  بفرمایید و در صورت عدم پرداخت به سامانه علی بابا، باید مابه
                  .تفاوت در هتل پرداخت گردد"
                  fontSize="4xl"
                  isPreviewFocusable={false}
                >
                  <EditablePreview />
                  {/* Here is the custom input */}
                  <Input as={EditableInput} />
                  <EditableControls />
                </Editable>
                <h1 className="text-lg text-black  ">هزینه های جانبی</h1>

                <Editable
                  textAlign="end"
                  defaultValue=" *طبق اعلام هتل اقامت های اکونومی و اقامت های ساعتی خدمات
                  صبحانه و همچنین امکان کنسلی ندارد*طبق اعلام هتل خدمات خانه
                  داری در اقامت اکونومی به صورت محدود ارائه می گردد* نرخ میهمان
                  غیر ایرانی در این هتل متفاوت می باشد. لطفا قبل از رزرو استعلام
                  بفرمایید و در صورت عدم پرداخت به سامانه علی بابا، باید مابه
                  .تفاوت در هتل پرداخت گردد"
                  fontSize="4xl"
                  isPreviewFocusable={false}
                >
                  <EditablePreview />
                  {/* Here is the custom input */}
                  <Input as={EditableInput} />
                  <EditableControls />
                </Editable>
              </div>
            </div>
          </div>
        </div>
        <div className="flex p-5 bg-white items-center space-x-1 w-full justify-end">
          <h1 className="  text-gray-700 text-2xl">درباره هتل </h1>
        </div>
        <div className="flex py-5  bg-gray-200  justify-center w-full">
          <div className="flex rounded-md   flex-col w-full bg-gray-50">
            <div className="p-5 flex w-full flex-col">
              <div className="flex  w-full justify-end items-center">
                <h1 className="text-lg text-black  ">هتل</h1>
              </div>
              <div className="flex text-right flex-col">
                <Editable
                  textAlign="end"
                  defaultValue=" *طبق اعلام هتل اقامت های اکونومی و اقامت های ساعتی خدمات
                  صبحانه و همچنین امکان کنسلی ندارد*طبق اعلام هتل خدمات خانه
                  داری در اقامت اکونومی به صورت محدود ارائه می گردد* نرخ میهمان
                  غیر ایرانی در این هتل متفاوت می باشد. لطفا قبل از رزرو استعلام
                  بفرمایید و در صورت عدم پرداخت به سامانه علی بابا، باید مابه
                  .تفاوت در هتل پرداخت گردد"
                  fontSize="4xl"
                  isPreviewFocusable={false}
                >
                  <EditablePreview />
                  {/* Here is the custom input */}
                  <Input as={EditableInput} />
                  <EditableControls />
                </Editable>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
