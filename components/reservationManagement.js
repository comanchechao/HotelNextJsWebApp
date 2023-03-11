import { Tabs } from "@mantine/core";
import { MagnifyingGlass } from "phosphor-react";
import {
  IconUser,
  IconUserExclamation,
  IconBuildingSkyscraper,
  IconUserCircle,
  IconUserCheck,
} from "@tabler/icons";
import ReservationInfo from "./reservationInfo";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ReservationManagement({ Hotels }) {
  const [reservations, setReservations] = useState(null);
  async function getReservations() {
    const { data: reservations, error4 } = await supabase
      .from("reservations")
      .select()
      .in("hotel_id", Hotels);
    console.log(reservations);
    setReservations(reservations);
  }

  useEffect(() => {
    getReservations();
    console.log(reservations, "reservatoins");
  }, [Hotels]);
  return (
    <div className="flex w-full h-auto   ">
      <div className="flex w-full space-y-4 flex-col">
        <div class="pt-4 px-2 flex w-full justify-center items-center relative text-black ">
          <div className="flex flex-reverse w-full items-center space-x-2 justify-center">
            <button
              type="submit"
              className="bg-gray-100 justify-center items-center border-2 h-10 px-3  flex"
            >
              <MagnifyingGlass size={20} weight="bold" />
            </button>
            <input
              className="border-2 placeholder-gray-400 text-right transition ease-in duration-300 text-darkPurple w-textArea hover:bg-white   bg-gray-100 font-mainFont h-10 px-5 pr-4 md:pr-16 rounded-sm  text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="جستجو همکار"
            />
          </div>
        </div>
        <Tabs color="yellow" variant="pills" defaultValue="gallery">
          <Tabs.List className="px-2" position="center" grow>
            <Tabs.Tab
              color="pink"
              value="messages"
              icon={<IconBuildingSkyscraper size={16} />}
            >
              هتل های من
            </Tabs.Tab>
            <Tabs.Tab
              color="indigo"
              value="gallery"
              icon={<IconUser size={16} />}
            >
              همه همکاران
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="gallery" pt="xs">
            <div className="flex space-y-2 h-rem30 overflow-y-scroll px-4 w-full h-full flex-col">
              {!reservations ? (
                <div> no item </div>
              ) : (
                reservations.map((user, i) => {
                  return (
                    <div
                      key={i}
                      className="flex py-1 flex-row-reverse w-full h-24 bg-white justify-between px-2 lg:px-10 rounded items-center"
                    >
                      <div className="lg:w-20 w-10 flex justify-center items-center lg:h-20 h-10 rounded-full ">
                        <IconUserCircle size={50} />
                      </div>
                      <h1 className=" text-sm lg:text-xl">{user.hotel_name}</h1>
                      <p className="hidden lg:block">{user.name}</p>
                      <ReservationInfo
                        passengerCount={user.passengerCount}
                        room={user.room}
                        hotel={user.hotel_name}
                        passengers={user.passengers}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="messages" pt="xs">
            {/* <div className="flex space-y-2 h-rem30 overflow-y-scroll px-4 w-full h-full flex-col">
              {reservations.passengers.map((user, i) => {
                return (
                  <div
                    key={i}
                    className="flex py-1 flex-row-reverse w-full h-24 bg-white justify-between px-2 lg:px-10 rounded items-center"
                  >
                    <div className="lg:w-20 w-10 flex justify-center items-center lg:h-20 h-10 rounded-full ">
                      <IconUserCircle size={50} />
                    </div>
                    <h1 className=" text-sm lg:text-xl">{user.name}</h1>
                    <p className="hidden lg:block">{user.gender}</p>
                    <ReservationInfo />
                  </div>
                );
              })}
            </div> */}
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}
