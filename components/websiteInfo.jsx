import { Textarea, Tabs, Loader, NumberInput } from "@mantine/core";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
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
  async function changeWebsiteInfo() {
    setLoading(true);
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
    } else {
      console.log(error);
    }
    setLoading(false);
  }
  return (
    <div className="flex flex-col items-center justify-start pt-5 w-full h-auto  ">
      <div className="   w-full h-full  py-20 lg:px-14 bg-white flex flex-col items-center justify-start">
        <h1 className="border-b-4 pb-4 border-mainBlue my-3">
          تغییر اطلاعات وبسایت
        </h1>
        <Tabs
          className="mt-5 w-full"
          color="yellow"
          variant="pills"
          defaultValue="gallery"
        >
          <Tabs.List grow position="center">
            <Tabs.Tab color="pink" value="settings">
              فوتر
            </Tabs.Tab>
            <Tabs.Tab color="violet" value="messages">
              تماس با ما
            </Tabs.Tab>
            <Tabs.Tab color="indigo" value="gallery">
              درباره ما
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="gallery">
            <div className="w-full overflow-y-scroll   flex flex-col items-center p-10 h-full space-y-3">
              <div className="flex w-full items-start justify-end">
                <h3 className="text-3xl">درباره ما</h3>
              </div>
              <p className="text-lg self-end">درباره بوتک</p>
              <Textarea
                className="text-2xl  text-right w-full"
                placeholder="درباره بوتک"
                radius="xs"
                autosize
                minRows={7}
                withAsterisk
                onChange={(e) => setAboutUs(e.target.value)}
              />
              <p className="text-lg self-end">تاریخچه و پیشینه</p>
              <Textarea
                className="text-2xl  text-right w-full"
                placeholder="تاریخچه و پیشینه"
                radius="xs"
                autosize
                minRows={8}
                withAsterisk
                onChange={(e) => setAboutUsMore(e.target.value)}
              />
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="messages" pt="xs">
            {" "}
            <div className="w-full   flex flex-col items-center p-10 h-full space-y-9">
              <div className="flex w-full items-start justify-end">
                <h3 className="text-3xl">تماس با ما</h3>
              </div>
              <p className="text-lg self-end">آدرس</p>
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
              />
              <div className="flex items-center flex-col-reverse lg:flex-row lg:space-y-0 space-y-2 justify-center lg:space-x-9">
                <Textarea
                  className="text-2xl  text-right w-full"
                  placeholder="ایمیل"
                  radius="xs"
                  autosize
                  minRows={1}
                  withAsterisk
                  onChange={(e) => setEmail(e.target.value)}
                />{" "}
                <p className="text-lg text-center w-full">ایمیل</p>
                <NumberInput
                  className="text-2xl  text-right w-full"
                  placeholder="کد پستی"
                  radius="xs"
                  autosize
                  minRows={1}
                  withAsterisk
                  onChange={(e) => setPostalCode(e.target.value)}
                />
                <p className="text-lg text-center w-full">کد پستی</p>
              </div>{" "}
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="settings" pt="xs">
            <div className="w-full   flex flex-col items-center p-10 h-full space-y-9">
              <div className="flex w-full items-start justify-end">
                <h3 className="text-3xl">فوتر</h3>
              </div>
              <p className="text-lg self-end">آدرس</p>
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
              />
              <div className="flex items-center justify-center space-x-9">
                <Textarea
                  className="text-2xl  text-right w-full"
                  placeholder="لینک تلگرام"
                  radius="xs"
                  autosize
                  minRows={1}
                  withAsterisk
                  onChange={(e) => setTelegram(e.target.value)}
                />{" "}
                <p className="text-lg text-center w-full">لینک تلگرام</p>
                <Textarea
                  className="text-2xl  text-right w-full"
                  placeholder="لینک اینستاگرام"
                  radius="xs"
                  autosize
                  minRows={1}
                  withAsterisk
                  onChange={(e) => setInstagram(e.target.value)}
                />
                <p className="text-lg text-center w-full">لینک اینستاگرام</p>
              </div>{" "}
              <div className="flex items-center justify-center space-x-9">
                <Textarea
                  className="text-2xl  text-right w-full"
                  placeholder="لینک فیسبوک"
                  radius="xs"
                  autosize
                  minRows={1}
                  withAsterisk
                  onChange={(e) => setFacebook(e.target.value)}
                />{" "}
                <p className="text-lg text-center w-full">لینک فیسبوک</p>
                <Textarea
                  className="text-2xl  text-right w-full"
                  placeholder="لینک واتسپ"
                  radius="xs"
                  autosize
                  minRows={1}
                  withAsterisk
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
                <p className="text-lg text-center w-full">لینک واتسپ</p>
              </div>
            </div>{" "}
          </Tabs.Panel>
          <div className="absolute right-8 bottom-3">
            <button
              onClick={changeWebsiteInfo}
              className="px-14 mb-10 rounded-lg self-start transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-xl font-mainFont"
            >
              {loading ? (
                <Loader color="yellow" />
              ) : (
                <span> تایید تغییرات</span>
              )}
            </button>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
