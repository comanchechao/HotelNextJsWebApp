import { Drawer, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import {
  List,
  House,
  IdentificationCard,
  Scroll,
  Question,
  User,
} from "phosphor-react";
import Link from "next/link";
export default function NavDrawer() {
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
        <div className="w-full h-rem22 flex flex-col items-center justify-center space-y-4">
          <Link
            href="/"
            className=" flex border-2 border-dashed border-mainPurple  rounded-sm  items-center cursor-pointer w-44 text-center justify-center py-2 text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
          >
            <House className="mx-1" size={30} weight="fill" />
            <h4 className=" ">خونه</h4>
          </Link>
          <Link
            href="/admin"
            className=" flex border-2 border-dashed border-mainPurple  rounded-sm  items-center cursor-pointer w-44 text-center justify-center py-2 text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
          >
            <IdentificationCard className="mx-1" size={30} />
            <h4 className=" ">ادمین</h4>
          </Link>
          <Link
            href="/aboutUs"
            className=" flex border-2 border-dashed border-mainPurple  rounded-sm  items-center cursor-pointer w-44 text-center justify-center py-2 text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
          >
            <Scroll className="mx-1" size={30} weight="fill" />
            <h4 className=" ">درباره ما</h4>
          </Link>
          <Link
            href="/contactUs"
            className=" flex border-2 border-dashed border-mainPurple  rounded-sm  items-center cursor-pointer w-44 text-center justify-center py-2 text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
          >
            <Question className="mx-1" size={30} weight="fill" />
            <h4 className=" ">تماس با ما</h4>
          </Link>
          <Link
            href="/userProfile"
            className=" flex border-2 border-dashed border-mainPurple  rounded-sm  items-center cursor-pointer w-44 text-center justify-center py-2 text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
          >
            <User className="mx-1" size={30} weight="fill" />
            <h4 className=" ">حساب کاربری</h4>
          </Link>
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
