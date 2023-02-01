import { useState } from "react";
import { Modal, TextInput, useMantineTheme, NativeSelect } from "@mantine/core";
import { SignIn } from "phosphor-react";
export default function LoginModal() {
  const data = [
    { value: "+98", label: "🇮🇷 +98" },
    { value: "+90", label: "🇹🇷 +90" },
  ];
  const [change, setChange] = useState(false);

  const select = (
    <NativeSelect
      data={data}
      styles={{
        input: {
          fontFamily: "IranSans",
          fontWeight: 500,
        },
      }}
    />
  );
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <div>
      <Modal
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[7]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <div className=" flex flex-col items-center px-5">
          {change ? (
            <div className=" w-full h-rem28 flex flex-col items-center justify-around space-y-5">
              <div className="flex flex-col items-center justify-center space-y-3">
                <h1 className="text-3xl  "> ورود یا ثبت‌نام </h1>
                <h4>ایمیل و رمز عبور خود را برای ورود یا ثبت‌نام وارد کنید</h4>
              </div>
              <TextInput
                className="text-2xl   text-right flex flex-col items-end "
                type="number"
                placeholder="ایمیل"
                label="ایمیل"
                size="md"
                variant="filled"
                withAsterisk
              />
              <TextInput
                className="text-2xl   text-right flex flex-col items-end "
                type="number"
                placeholder="رمز عبور"
                label="رمز عبور"
                size="md"
                variant="filled"
                withAsterisk
              />
              <button className="w-full rounded-md transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-xl font-mainFont">
                تایید
              </button>
              <button
                onClick={() => setChange(false)}
                className="w-full rounded-md transition ease-in duration-300  hover:border-mainPurple border-r-8 border-mainBlue py-2 bg-transparent text-darkPurple text-lg font-mainFont"
              >
                ورود با رمز یکبار مصرف
              </button>
            </div>
          ) : (
            <div className=" h-rem26 flex flex-col items-center justify-around">
              <div className="flex flex-col items-center justify-center space-y-3">
                <h1 className="text-3xl  "> ورود یا ثبت‌نام </h1>
                <h4>شماره تلفن خود را برای ورود یا ثبت‌نام وارد کنید</h4>
              </div>
              <TextInput
                className="text-2xl mx-6 text-right flex flex-col items-end "
                type="number"
                placeholder="شماره تلفن"
                label="شماره تلفن"
                rightSection={select}
                rightSectionWidth={85}
                size="lg"
                withAsterisk
              />
              <button className="w-full rounded-md transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-xl font-mainFont">
                تایید و دریافت کد
              </button>
              <button
                onClick={() => setChange(true)}
                className="w-full rounded-md transition ease-in duration-300  hover:border-mainPurple border-r-8 border-mainBlue py-2 bg-transparent text-darkPurple text-lg font-mainFont"
              >
                ورود با ایمیل و کلمه ی عبور
              </button>
            </div>
          )}
        </div>
      </Modal>
      <button
        className=" flex rounded-sm  items-center justify-center cursor-pointer p-2 text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
        onClick={() => setOpened(true)}
      >
        <SignIn className="mx-2" size={30} weight="light" />
        <h4> ورود یا ثبت‌نام </h4>
      </button>
    </div>
  );
}
