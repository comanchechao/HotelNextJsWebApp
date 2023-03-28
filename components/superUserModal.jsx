import { useState, useEffect } from "react";

import { Modal, Button, Group, Accordion } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { useMediaQuery } from "@mantine/hooks";

import Image from "next/image";
import Link from "next/link";
export default function SuperUserModal() {
  const [alignLeft, setAlignLeft] = useState(false);

  const isMobile = useMediaQuery("(max-width: 50em)");

  const [opened, setOpened] = useState(false);
  const { t, i18n } = useTranslation("");
  const lng = i18n.language;

  async function changeAlignment() {
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
  useEffect(() => {
    changeAlignment();
  }, []);
  return (
    <>
      <Modal
        fullScreen={isMobile}
        centered
        size="650px"
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        exitTransitionDuration={600}
        opened={opened}
        onClose={() => setOpened(false)}
        className="text-right w-full flex justify-end"
      ></Modal>

      <Group position="center">
        <button
          onClick={() => {
            setOpened(true);
          }}
          className="py-1 font-mainFont  hover:text-white bg-mainPurple border-mainBlue border-r-8   ease-in duration-300 hover:bg-mainBlue transition rounded-lg  text-white  px-8   "
        >
          <p>{t("details")}</p>
        </button>
      </Group>
    </>
  );
}
