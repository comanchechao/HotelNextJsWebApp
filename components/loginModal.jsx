import { useState } from "react";
import { Modal, TextInput, useMantineTheme, NativeSelect } from "@mantine/core";
import { SignIn } from "phosphor-react";
export default function LoginModal() {
  const data = [
    { value: "+98", label: "🇮🇷 +98" },
    { value: "+90", label: "🇹🇷 +90" },
  ];

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
        <div className=" h-rem26 flex flex-col items-center justify-start  p-2 space-y-3">
          <h1 className="text-2xl  "> ورود یا ثبت‌نام </h1>
          <h4>شماره تلفن خود را برای ورود یا ثبت‌نام وارد کنید</h4>
          <TextInput
            className="text-2xl mx-6 text-right flex flex-col items-end"
            type="number"
            placeholder="شماره تلفن"
            label="شماره تلفن"
            rightSection={select}
            rightSectionWidth={85}
          />
        </div>
      </Modal>
      <button
        className="flex rounded-sm  items-center justify-center cursor-pointer p-2 text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
        onClick={() => setOpened(true)}
      >
        <SignIn className="mx-2" size={30} weight="light" />
        <h4> ورود یا ثبت‌نام </h4>
      </button>
    </div>
  );
}
