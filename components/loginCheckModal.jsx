import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import LoginModal from "./loginModal";
export default function LoginCheckModal() {
  const [opened, setOpened] = useState(false);
  const { t, i18n } = useTranslation("common");
  const theme = useMantineTheme();

  return (
    <>
      <Modal
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        exitTransitionDuration={600}
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
        <div className="h-36 flex p-4 items-center justify-center space-y-8 flex-col">
          <h2 className="text-xl font-bold text-center"> {t("needToSign")}</h2>
          <LoginModal />
        </div>
      </Modal>
      <button
        onClick={() => {
          setOpened(true);
        }}
        className="py-3    bg-white border-mainBlue border-r-8   ease-in duration-300 hover:bg-mainBlue transition rounded-lg  text-mainPurple my-5 px-12   "
      >
        <p>{t("roomReserve")}</p>
      </button>
    </>
  );
}