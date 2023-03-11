import { useEffect, useState } from "react";
import ReservedRoomCard from "./reservedRoomCard";
import { supabase } from "../lib/supabaseClient";

export default function ReservationList({ user }) {
  const [reservations, setReservations] = useState([]);
  async function getReservatoins() {
    const { data, error } = await supabase
      .from("reservations")
      .select()
      .eq("user_id", user.user.id);
    setReservations(data);
  }
  useEffect(() => {
    getReservatoins();
  }, []);
  return (
    <div className="w-full   h-carousel flex items-center justify-center flex-col space-y-6 bg-white px-14 py-10 text-center">
      <h1 className="border-b-2 border-mainPurple pb-2 rounded-sm">
        اتاق های رزرو شده{" "}
      </h1>
      <div className="w-full overflow-y-scroll px-4 flex items-center justify-start flex-col space-y-6 ">
        {reservations === [] ? (
          <div>no reservation</div>
        ) : reservations !== [] ? (
          reservations.map((reserveData, i) => {
            return <ReservedRoomCard key={i} reserve={reserveData} />;
          })
        ) : null}
      </div>
    </div>
  );
}
