import {
  IconBarbell,
  IconCoffee,
  IconChefHat,
  IconHotelService,
  IconBath,
  IconWifi,
  IconEraser,
  IconWashMachine,
} from "@tabler/icons";
import { Modal, Group } from "@mantine/core";
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";

export default function FeaturesModal() {
  const { t, i18n } = useTranslation();
  const lng = i18n.language;
  useEffect(() => {
    changeAlignment();
  }, [lng]);

  const [alignLeft, setAlignLeft] = useState(false);
  async function changeAlignment() {
    console.log(lng);
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
  const [opened, setOpened] = useState(false);
  return (
    <div className="w-full h-full">
      <Modal opened={opened} centered onClose={() => setOpened(false)}>
        <div className=" bg-gray-100 flex flex-col  divdie-x divide-black  ">
          <div className="flex justify-center items-center w-full text-right h-14">
            <h1 className="text-lg   py-2">امکانات هتل</h1>
          </div>
          <div className="flex px-3 justify-between items-center">
            <h2 className="flex flex-row">
              <IconBarbell size={32} />
            </h2>
            <h2>سالن بدنسازی</h2>
          </div>
          <div className="flex px-3 justify-between items-center">
            <h2 className="flex flex-row">
              <IconCoffee size={32} />
            </h2>
            <h2>کافی شاپ</h2>
          </div>
          <div className="flex px-3 justify-between items-center">
            <h2 className="flex flex-row">
              <IconChefHat size={32} />
            </h2>
            <h2>رستوران</h2>
          </div>
          <div className="flex px-3 justify-between items-center">
            <h2 className="flex flex-row">
              <IconHotelService size={32} />
            </h2>
            <h2>سرویس روزانه</h2>
          </div>
          <div className="flex px-3 justify-between items-center">
            <h2 className="flex flex-row">
              <IconBath size={32} />
            </h2>
            <h2>حمام</h2>
          </div>
          <div className="flex px-3 justify-between items-center">
            <h2 className="flex flex-row">
              <IconWifi size={32} />
            </h2>
            <h2>خدمات اینترنت</h2>
          </div>
          <div className="flex px-3 justify-between items-center">
            <h2 className="flex flex-row">
              <IconWashMachine size={32} />
            </h2>
            <h2>خشکشویی</h2>
          </div>
        </div>
      </Modal>
      <Group position="start" className="flex justify-center items-center w-24">
        <h1
          onClick={() => {
            setOpened(true);
          }}
          className="  text-mainPurple my-4  text-sm cursor-pointer hover:text-blue-800"
        >
          {t("seeAll")}
        </h1>
      </Group>
    </div>
  );
}
