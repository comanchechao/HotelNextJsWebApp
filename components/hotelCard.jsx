import { Carousel } from "@mantine/carousel";
import Link from "next/link";
export default function HotelCard() {
  return (
    <div className=" w-carousel h-48 bg-white drop-shadow-lg rounded-sm flex justify-between items-center ">
      <div className="w-56 h-full flex flex-col p-4 items-center justify-center space-y-2">
        <h2 className="text-mainPurple text-lg">11,016,000</h2>
        <button className="px-6 w-full rounded-full transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-sm font-mainFont">
          مشاهده ی اتاق ها و رزرو
        </button>
        <p className="text-gray-500 text-xs">قیمت برای 1 شب</p>
      </div>
      <div className=" w-96 h-full flex flex-col items-center justify-between p-3 border-x border-dashed border-mainPurple">
        <h1 className="text-center text-lg">Hotel Sinem Hotel Istanbul</h1>
        <Link
          href="/"
          className="text-blue-500 flex items-center transition ease-in duration-100 hover:text-mainBlue"
        >
          مشاهده روی نقشه
        </Link>
      </div>
      <div className=" w-56 h-full">
        <Carousel
          className="flex items-center justify-center"
          sx={{ maxWidth: 320 }}
          mx="auto"
          withIndicators
          height={200}
        >
          <Carousel.Slide>1</Carousel.Slide>
          <Carousel.Slide>2</Carousel.Slide>
          <Carousel.Slide>3</Carousel.Slide>
          {/* ...other slides */}
        </Carousel>
      </div>
      {/* <div className="h-full w-full bg-green-500"></div> */}
    </div>
  );
}
