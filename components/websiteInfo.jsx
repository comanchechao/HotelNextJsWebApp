import {
  Textarea,
  Tabs,
  Notification,
  Loader,
  NumberInput,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useTranslation } from "next-i18next";

export default function WebsiteInfo() {
  const [loading, setLoading] = useState(false);
  const [aboutUs, setAboutUs] = useState("");
  const [aboutUsMore, setAboutUsMore] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [telegram, setTelegram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const { t, i18n } = useTranslation("");
  const lng = i18n.language;
  const [alignLeft, setAlignLeft] = useState(false);

  async function changeAlignment() {
    console.log(lng);
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    changeAlignment();
  }, []);
  async function changeWebsiteInfo() {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase.from("websiteInfo").upsert([
          {
            aboutUs: aboutUs,
            aboutUsMore: aboutUsMore,
            address: address,
            phoneNumber: phoneNumber,
            postalCode: postalCode,
            email: email,
            instagram: instagram,
            telegram: telegram,
            facebook: facebook,
            whatsapp: whatsapp,
          },
        ]);
      } // add this closing curly brace
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  }
  return (
    <div className="flex flex-col items-center justify-start pt-5 w-full h-full lg:h-carousel  ">
      <div className="   w-full lg:py-20 h-carousel lg:px-14 bg-white flex flex-col items-center lg:justify-center">
        <h1 className="border-b-4   border-mainBlue pb-2  px-2  rounded-md text-xl   my-3">
          {t("websiteInfo")}
        </h1>
        <Tabs
          className="mt-5 w-full"
          color="yellow"
          variant="pills"
          defaultValue="gallery"
        >
          <Tabs.List grow position="center">
            <Tabs.Tab color="pink" value="settings">
              {t("footer")}
            </Tabs.Tab>
            <Tabs.Tab color="violet" value="messages">
              {t("contactUs")}
            </Tabs.Tab>
            <Tabs.Tab color="indigo" value="gallery">
              {t("aboutUs")}
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="gallery">
            <div className="w-full overflow-y-scroll   flex flex-col items-center p-10 h-full space-y-3">
              <div
                className={`${
                  alignLeft === true
                    ? "flex w-full items-start justify-end"
                    : "flex w-full items-start justify-start"
                }`}
              >
                <h3 className="text-3xl"> {t("aboutUs")}</h3>
              </div>
              <p
                className={`${
                  alignLeft === true ? "text-lg self-end" : "text-lg self-start"
                }`}
              >
                {" "}
                {t("aboutBoutak")}
              </p>
              <Textarea
                className="text-2xl  text-right w-full"
                placeholder={t("aboutBoutak")}
                radius="xs"
                autosize
                minRows={5}
                withAsterisk
                onChange={(e) => setAboutUs(e.target.value)}
              />
              <p
                className={`${
                  alignLeft === true ? "text-lg self-end" : "text-lg self-start"
                }`}
              >
                {t("knowUsMore")}
              </p>
              <Textarea
                className="text-2xl  text-right w-full"
                placeholder={t("knowUsMore")}
                radius="xs"
                autosize
                minRows={5}
                withAsterisk
                onChange={(e) => setAboutUsMore(e.target.value)}
              />
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="messages" pt="xs">
            {" "}
            <div className="w-full   flex flex-col items-center p-10 h-full space-y-9">
              <div
                className={`${
                  alignLeft === true
                    ? "flex w-full items-start justify-end"
                    : "flex w-full items-start justify-start"
                }`}
              >
                <h3 className="text-3xl"> {t("contactUs")}</h3>
              </div>
              <p
                className={`${
                  alignLeft === true ? "text-lg self-end" : "text-lg self-start"
                }`}
              >
                {t("address")}
              </p>
              <Textarea
                className="text-2xl  text-right w-full"
                placeholder={t("address")}
                radius="xs"
                autosize
                minRows={2}
                withAsterisk
                onChange={(e) => setAddress(e.target.value)}
              />
              <p
                className={`${
                  alignLeft === true ? "text-lg self-end" : "text-lg self-start"
                }`}
              >
                {t("phone")}
              </p>
              <NumberInput
                className="text-2xl  text-right w-full"
                placeholder={t("phone")}
                radius="xs"
                autosize
                minRows={1}
                withAsterisk
                onChange={(e) => setPhoneNumber(e)}
              />
              <div
                className={`${
                  alignLeft === true
                    ? "flex items-center flex-col-reverse lg:flex-row lg:space-y-0 space-y-2 justify-center lg:space-x-9"
                    : "flex items-center flex-col-reverse lg:flex-row-reverse lg:space-y-0 space-y-2 justify-center lg:space-x-9"
                }`}
              >
                <Textarea
                  className="text-2xl  text-right w-full"
                  placeholder={t("email")}
                  radius="xs"
                  autosize
                  minRows={1}
                  withAsterisk
                  onChange={(e) => setEmail(e.target.value)}
                />{" "}
                <p className="text-lg text-center w-full">{t("email")}</p>
                <NumberInput
                  className="text-2xl  text-right w-full"
                  placeholder={t("postalCode")}
                  radius="xs"
                  autosize
                  minRows={1}
                  withAsterisk
                  onChange={(e) => setPostalCode(e)}
                />
                <p className="text-lg text-center w-full">{t("postalCode")}</p>
              </div>{" "}
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="settings" pt="xs">
            <div className="w-full   flex flex-col items-center p-10 h-full space-y-9">
              <div
                className={`${
                  alignLeft === true
                    ? "flex w-full items-start justify-end"
                    : "flex w-full items-start justify-start"
                }`}
              >
                <h3 className="text-3xl">{t("footer")}</h3>
              </div>
              {/* <p className="text-lg self-end">آدرس</p>
              <Textarea
                className="text-2xl  text-right w-full"
                placeholder="آدرس"
                radius="xs"
                autosize
                minRows={2}
                withAsterisk
                onChange={(e) => setAddress(e.target.value)}
              />
              <p className="text-lg self-end">شماره تلفن</p>
              <NumberInput
                className="text-2xl  text-right w-full"
                placeholder="شماره تلفن"
                radius="xs"
                autosize
                minRows={1}
                withAsterisk
                onChange={(e) => setPhoneNumber(e.target.value)}
              /> */}
              <div
                className={`${
                  alignLeft === true
                    ? "flex items-center justify-center space-x-9"
                    : "flex items-center flex-row-reverse justify-center space-x-9"
                }`}
              >
                <Textarea
                  className="text-2xl  text-right w-full"
                  placeholder={t("telegramLink")}
                  radius="xs"
                  autosize
                  minRows={1}
                  withAsterisk
                  onChange={(e) => setTelegram(e.target.value)}
                />{" "}
                <p className="text-lg text-center w-full">
                  {t("telegramLink")}
                </p>
                <Textarea
                  className="text-2xl  text-right w-full"
                  placeholder={t("instagramLink")}
                  radius="xs"
                  autosize
                  minRows={1}
                  withAsterisk
                  onChange={(e) => setInstagram(e.target.value)}
                />
                <p className="text-lg text-center w-full">
                  {t("instagramLink")}
                </p>
              </div>{" "}
              <div
                className={`${
                  alignLeft === true
                    ? "flex items-center justify-center space-x-9"
                    : "flex items-center flex-row-reverse justify-center space-x-9"
                }`}
              >
                <Textarea
                  className="text-2xl  text-right w-full"
                  placeholder={t("facebookLink")}
                  radius="xs"
                  autosize
                  minRows={1}
                  withAsterisk
                  onChange={(e) => setFacebook(e.target.value)}
                />{" "}
                <p className="text-lg text-center w-full">
                  {t("facebookLink")}
                </p>
                <Textarea
                  className="text-2xl  text-right w-full"
                  placeholder={t("whatsappLink")}
                  radius="xs"
                  autosize
                  minRows={1}
                  withAsterisk
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
                <p className="text-lg text-center w-full">
                  {t("whatsappLink")}
                </p>
              </div>
            </div>{" "}
          </Tabs.Panel>
        </Tabs>
        <div className="lg:absolute right-8 bottom-0   fixed">
          {alert ? (
            <Notification
              transition="fade"
              transitionDuration={600}
              transitionTimingFunction="ease"
              color="green"
              withCloseButton
              variant="outline"
            >
              <h1 className="text-2xl text-center">
                {t("infoConfirmSuccess")}
              </h1>
            </Notification>
          ) : (
            <button
              onClick={() => {
                changeWebsiteInfo();
              }}
              className="px-14 mb-10 rounded-lg self-start transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-xl font-mainFont"
            >
              {loading ? (
                <Loader variant="bars" color="yellow" />
              ) : (
                <span> {t("confirmChanges")}</span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
