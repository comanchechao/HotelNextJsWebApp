import Head from "next/head";
import { Inter } from "@next/font/google";
import Navbar from "../components/Navbar";
// const inter = Inter({ subsets: ["latin"] });
import { Select, Menu, Text, useMantineTheme, Button } from "@mantine/core";
import { MapPin } from "phosphor-react";
import Image from "next/image";
import mainBg from "../assets/images/mainBg.webp";
import { DatePicker } from "@mantine/dates";
import "dayjs/locale/fa";
export default function Home() {
  const theme = useMantineTheme();
  return (
    <>
      <div className="h-screen w-screen flex-col items-center bg-gray-200 flex">
        {/* <Navbar /> */}
        <div className="w-screen h-96 ">
          <Image
            className=" h-rem26 w-full object-cover"
            src={mainBg}
            alt="Main Background"
          />
        </div>
        <div className="w-full  h-72 px-56">
          <div className="w-full h-full flex flex-row-reverse items-center justify-center space-x-6 bg-white rounded-lg p-14  ">
            <div className="flex bg-mainPurple w-full h-full items-center flex-row-reverse justify-center space-x-5">
              <Select
                className="text-2xl mx-6 text-right flex flex-col items-end   shadow-md "
                data={["تهران", "تبریز", "ارومیه", "مشهد"]}
                placeholder="مقصد یا هتل ( داخلی و خارجی )"
                label="مقصد یا هتل ( داخلی و خارجی )"
                variant="default"
                radius="xl"
                withAsterisk
                clearable
                searchable
                size="md"
                icon={<MapPin size={20} weight="fill" />}
              />
              <DatePicker
                locale="fa"
                className="text-4xl text-right flex flex-col items-end   shadow-md"
                placeholder="تاریخ ورود"
                label="تاریخ ورود"
                withAsterisk
                variant="default"
                radius="xl"
                size="md"
              />
              <DatePicker
                locale="fa"
                className="text-4xl text-right flex flex-col items-end   shadow-md"
                placeholder="تاریخ خروج"
                label="تاریخ خروج"
                withAsterisk
                variant="default"
                radius="xl"
                size="md"
              />
            </div>
            <div className=" flex items-center flex-col  justify-center h-full bg-red-600">
              <Menu
                variant="default"
                radius="xl"
                size="md"
                transition="pop-top-right"
                position="top-end"
                width={220}
                withinPortal
                placeholder="تاریخ ورود"
                label="تاریخ ورود"
                className="text-xl text-right flex flex-col items-end justify-end shadow-md"
              >
                <Menu.Target>
                  <Select
                    variant="default"
                    radius="xl"
                    size="md"
                    placeholder="تاریخ ورود"
                    label="تاریخ ورود"
                    className="px-14 text-gray-500 bg-gray-200 rounded-full shadow-md"
                    // rightIcon={ }
                  ></Select>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    // icon={
                    //   <IconPackage
                    //     size={16}
                    //     color={theme.colors.blue[6]}
                    //     stroke={1.5}
                    //   />
                    // }
                    rightSection={
                      <Text
                        size="xs"
                        transform="uppercase"
                        weight={700}
                        color="dimmed"
                      >
                        Ctrl + P
                      </Text>
                    }
                  >
                    Project
                  </Menu.Item>
                  <Menu.Item
                    // icon={
                    //   <IconSquareCheck
                    //     size={16}
                    //     color={theme.colors.pink[6]}
                    //     stroke={1.5}
                    //   />
                    // }
                    rightSection={
                      <Text
                        size="xs"
                        transform="uppercase"
                        weight={700}
                        color="dimmed"
                      >
                        Ctrl + T
                      </Text>
                    }
                  >
                    Task
                  </Menu.Item>
                  <Menu.Item
                    // icon={
                    //   <IconUsers
                    //     size={16}
                    //     color={theme.colors.cyan[6]}
                    //     stroke={1.5}
                    //   />
                    // }
                    rightSection={
                      <Text
                        size="xs"
                        transform="uppercase"
                        weight={700}
                        color="dimmed"
                      >
                        Ctrl + U
                      </Text>
                    }
                  >
                    Team
                  </Menu.Item>
                  <Menu.Item
                    // icon={
                    //   <IconCalendar
                    //     size={16}
                    //     color={theme.colors.violet[6]}
                    //     stroke={1.5}
                    //   />
                    // }
                    rightSection={
                      <Text
                        size="xs"
                        transform="uppercase"
                        weight={700}
                        color="dimmed"
                      >
                        Ctrl + E
                      </Text>
                    }
                  >
                    Event
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
