import { Modal, useMantineTheme } from "@mantine/core";
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import LoginModal from "./loginModal";
import { X } from "phosphor-react";
import { supabase } from "../lib/supabaseClient";
import { reservationActions } from "../store/reservation";
import { useDispatch } from "react-redux";
import Link from "next/link";

export default function LoginCheckModal({ room, hotelDetail }) {
  const [opened, setOpened] = useState(false);
  const [userSigned, setUserSigned] = useState(false);
  async function checkUser() {
    const { data: user, error } = await supabase.auth.getSession();

    if (user.session) {
      setUserSigned(true);
    } else {
      setUserSigned(false);

      console.log("User not found");
    }
  }
  const { t, i18n } = useTranslation("common");
  const theme = useMantineTheme();
  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        withCloseButton={false}
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
        <X
          onClick={() => {
            checkUser();
            setOpened(false);
          }}
          className="cursor-pointer transition ease-in duration-200    hover:bg-mainPurple hover:text-mainBlue m-5  rounded-md text-mainPurple"
          size={32}
          weight="bold"
        />{" "}
        <div className="h-36 flex p-4 items-center justify-center space-y-8 flex-col">
          <h2 className="text-xl font-bold text-center"> {t("needToSign")}</h2>
          <LoginModal />
        </div>
      </Modal>
      {userSigned ? (
        <Link href="/checkout">
          <button
            onClick={() => {
              dispatch(reservationActions.setRoom(room));
              dispatch(reservationActions.setHotelInfo(hotelDetail));
            }}
            className="py-1  hover:text-mainPurple bg-mainPurple border-mainBlue border-r-8   ease-in duration-300 hover:bg-mainBlue transition rounded-lg  text-white my-5 px-6   "
          >
            <p>{t("roomReserve")}</p>
          </button>
        </Link>
      ) : (
        <button
          onClick={() => {
            setOpened(true);
          }}
          className="py-1    bg-white border-mainBlue border-r-8   ease-in duration-300 hover:bg-mainBlue transition rounded-lg  text-mainPurple my-5 px-6   "
        >
          <p>{t("roomReserve")}</p>
        </button>
      )}
    </>
  );
}
