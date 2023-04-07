import { Tabs } from "@mantine/core";
import { MagnifyingGlass, Users } from "phosphor-react";
import { IconUser, IconUserExclamation, IconUserCheck } from "@tabler/icons";
import SuperUser from "./superUserModal";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import SuperUserValidation from "./superUserValidation";
import { supabase } from "../lib/supabaseClient";

export default function UserManagement({ users }) {
  const [profiles, setProfiles] = useState();
  async function getProfiles() {
    const { data: profiles, error } = await supabase.from("profiles").select();
    if (error) throw error;
    setProfiles(profiles);
  }
  const { t, i18n } = useTranslation("common");
  const lng = i18n.language;
  const [alignLeft, setAlignLeft] = useState(false);
  async function changeState() {
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
  useEffect(() => {
    changeState();
    getProfiles();
  }, []);
  return (
    <div className="flex w-full h-full lg:h-carousel ">
      <div className="flex w-full space-y-4 flex-col">
        <div class="pt-4 px-2 flex w-full justify-center items-center relative text-black ">
          <div className="flex flex-reverse w-full items-center space-x-2 justify-center"></div>
        </div>
        <Tabs color="yellow" variant="pills" defaultValue="gallery">
          <Tabs.List className="px-2" position="center" grow>
            <Tabs.Tab
              color="pink"
              value="settings"
              icon={<IconUserExclamation size={16} />}
            >
              {t("waiting")}
            </Tabs.Tab>
            <Tabs.Tab
              color="violet"
              value="messages"
              icon={<IconUserCheck size={16} />}
            >
              {t("confirmed")}
            </Tabs.Tab>
            <Tabs.Tab
              color="indigo"
              value="gallery"
              icon={<IconUser size={16} />}
            >
              {t("allUsers")}
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="gallery" pt="xs">
            <div className="flex space-y-2 h-rem30 overflow-y-scroll px-4 w-full h-full flex-col">
              {users.map((user, i) => {
                return (
                  <div
                    key={i}
                    className={`${
                      alignLeft === true
                        ? "flex py-4 lg:py-1 flex-col lg:flex-row-reverse   w-full h-auto lg:space-y-0 space-y-4 lg:h-24 bg-white justify-between px-2 lg:px-10 rounded items-center"
                        : "flex py-4 lg:py-1 flex-col lg:flex-row   w-full h-auto lg:space-y-0 space-y-4 lg:h-24 bg-white justify-between px-2 lg:px-10 rounded items-center"
                    }`}
                  >
                    <div className="lg:w-20 w-10 flex justify-center items-center lg:h-20 h-10 rounded-full ">
                      <Users weight="fill" size={40} />
                    </div>
                    <h1 className=" text-sm lg:text-lg">
                      <strong>{user.email}</strong> : {t("email")}
                    </h1>
                    <p className="hidden lg:block">{user.name}</p>

                    <SuperUser />
                  </div>
                );
              })}
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="messages" pt="xs">
            <div className="flex space-y-2 h-rem30 overflow-y-scroll px-4 w-full h-full flex-col">
              {profiles
                ? profiles.map((user, i) => {
                    if (user.role !== "customer") {
                      return (
                        <div
                          key={i}
                          className={`${
                            alignLeft === true
                              ? "flex py-4 lg:py-1 flex-col lg:flex-row-reverse   w-full h-auto lg:space-y-0 space-y-4 lg:h-24 bg-white justify-between px-2 lg:px-10 rounded items-center"
                              : "flex py-4 lg:py-1 flex-col lg:flex-row   w-full h-auto lg:space-y-0 space-y-4 lg:h-24 bg-white justify-between px-2 lg:px-10 rounded items-center"
                          }`}
                        >
                          <div className="lg:w-20 w-10 flex justify-center items-center lg:h-20 h-10 rounded-full ">
                            <Users weight="fill" size={40} />
                          </div>
                          <h1 className=" text-sm lg:text-xl">{user.email}</h1>
                          <p className="hidden lg:block">{user.name}</p>
                          <SuperUserValidation user={user} />
                          <SuperUser user={user} />
                        </div>
                      );
                    }
                  })
                : null}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="settings" pt="xs">
            <div className="flex space-y-2 h-rem30 overflow-y-scroll px-4 w-full h-full flex-col">
              {profiles
                ? profiles.map((user, i) => {
                    if (user.role === "customer") {
                      return (
                        <div
                          key={i}
                          className={`${
                            alignLeft === true
                              ? "flex py-4 lg:py-1 flex-col lg:flex-row-reverse   w-full h-auto lg:space-y-0 space-y-4 lg:h-24 bg-white justify-between px-2 lg:px-10 rounded items-center"
                              : "flex py-4 lg:py-1 flex-col lg:flex-row   w-full h-auto lg:space-y-0 space-y-4 lg:h-24 bg-white justify-between px-2 lg:px-10 rounded items-center"
                          }`}
                        >
                          <div className="lg:w-20 w-10 flex justify-center items-center lg:h-20 h-10 rounded-full ">
                            <Users weight="fill" size={40} />
                          </div>
                          <h1 className=" text-sm lg:text-xl">{user.email}</h1>
                          <p className="hidden lg:block">{user.name}</p>
                          <SuperUserValidation user={user} />
                          <SuperUser user={user} />
                        </div>
                      );
                    }
                  })
                : null}
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}
