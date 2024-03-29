import { Drawer, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";
import {
  List,
  House,
  IdentificationCard,
  Scroll,
  Question,
  User,
  Bed,
  Buildings,
} from "phosphor-react";
import Link from "next/link";
export default function NavDrawer() {
  const { t } = useTranslation("common");
  let isManager = useSelector((state) => state.user.isManager);
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  return (
    <div>
      <Drawer
        onClose={() => setOpened(false)}
        opened={opened}
        size="md"
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <div className="w-full h-full flex  flex-col items-center justify-center pt-16 space-y-4">
          <Link
            href="/"
            className=" flex border-2 border-dashed border-mainPurple  rounded-md  items-center cursor-pointer w-44 text-center justify-center py-2 text-darkPurple transition ease-in active:bg-mainPurple active:text-white hover:bg-mainPurple hover:text-white duration-200"
          >
            <a passHref className=" ">
              {t("home")}
            </a>
            <House className="mx-2" size={28} weight="light" />
          </Link>{" "}
          <Link
            href="/hotelList"
            className=" flex border-2 border-dashed border-mainPurple  rounded-md  items-center cursor-pointer w-44 text-center justify-center py-2 text-darkPurple transition ease-in active:bg-mainPurple active:text-white hover:bg-mainPurple hover:text-white duration-200"
          >
            <a passHref className=" ">
              {t("hotel")}
            </a>

            <Buildings className="mx-2" size={30} />
          </Link>
          <Link
            href="/aboutUs"
            className=" flex border-2 border-dashed border-mainPurple  rounded-md  items-center cursor-pointer w-44 text-center justify-center py-2 text-darkPurple transition ease-in active:bg-mainPurple active:text-white hover:bg-mainPurple hover:text-white duration-200"
          >
            <a passHref className=" ">
              {t("aboutUs")}
            </a>
            <Scroll className="mx-2" size={24} weight="light" />
          </Link>
          <Link
            href="/contactUs"
            className=" flex border-2 border-dashed border-mainPurple  rounded-md  items-center cursor-pointer w-44 text-center justify-center py-2 text-darkPurple transition ease-in active:bg-mainPurple active:text-white hover:bg-mainPurple hover:text-white duration-200"
          >
            <a passHref className=" ">
              {t("contactUs")}
            </a>
            <Question className="mx-2" size={24} weight="light" />
          </Link>
          <Link
            href="/rules"
            className=" flex border-2 border-dashed border-mainPurple  rounded-md  items-center cursor-pointer w-44 text-center justify-center py-2 text-darkPurple transition ease-in active:bg-mainPurple active:text-white hover:bg-mainPurple hover:text-white duration-200"
          >
            <a passHref className=" ">
              {t("rules")}
            </a>
            <Scroll className="mx-2" size={24} weight="light" />
          </Link>
          {isManager ? (
            <Link
              href="/admin"
              className=" flex border-2 border-dashed bg-mainBlue border-yellow-600  rounded-md  items-center cursor-pointer w-44 text-center justify-center py-2 text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
            >
              <a passHref className=" ">
                {t("admin")}
              </a>
              <IdentificationCard className="mx-1" weight="light" size={30} />
            </Link>
          ) : null}
        </div>
      </Drawer>
      <button
        onClick={() => setOpened(true)}
        className="text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200 flex items-center"
      >
        <List size={35} />
      </button>
    </div>
  );
}
