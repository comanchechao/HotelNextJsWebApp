import ReservedRoomCard from "./reservedRoomCard";

export default function ReservationList() {
  return (
    <div className="w-full   h-carousel flex items-center justify-center flex-col space-y-6 bg-white px-14 py-10 text-center">
      <h1 className="border-b-2 border-mainPurple pb-2 rounded-sm">
        اتاق های رزرو شده{" "}
      </h1>
      <div className="w-full overflow-y-scroll px-4 flex items-center justify-start flex-col space-y-6 ">
        <ReservedRoomCard /> <ReservedRoomCard /> <ReservedRoomCard />{" "}
        <ReservedRoomCard /> <ReservedRoomCard />
      </div>
    </div>
  );
}
