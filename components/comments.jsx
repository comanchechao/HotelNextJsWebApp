import { StarHalf, ThumbsUp, ThumbsDown } from "phosphor-react";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import Reply from "./reply";
export default function Comments(props) {
  let hotel = props.Hotel;

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getComments();
  }, []);
  async function getComments() {
    setLoading(true);
    // const hotels = await supabase.from("Hotels").select().eq("id", hotel.id);
    const { data: commentData } = await supabase
      .from("comments")
      .select()
      .eq("hotelId", hotel.id);
    commentData.map((object) => {
      setComment(object.comment);
    });
    setLoading(false);
    console.log(comment);
  }
  return (
    <div className="flex space-y-2 flex-col  text-right  rounded-md bg-green-400">
      <div className="flex border border-gray-300 p-4 rounded-lg text-gray-600 bg-white space-y-2 w-full h-full flex-col">
        <div className="flex space-x-2 text-sm justify-end items-center">
          <div className="flex">دی ماه 10</div>
          <div className="flex">
            <p>امتیاز</p>
            <p>5/10</p>
          </div>
          <div className="flex justify-center items-center">
            <StarHalf className="text-mainBlue" size={25} />
          </div>
        </div>
        <div className="flex justify-end items-end">
          <h1 className="text-2xl text-gray-900">هتل راحت</h1>
        </div>
        <div className="flex">
          <p className="text-sm">{comment}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>مهسا لاجویی</p>
          <div className="flex space-x-2">
            <ThumbsUp
              className="text-mainBlue  hover:scale-125 cursor-pointer hover:text-mainPurple transition"
              size={32}
            />
            <ThumbsDown
              className="text-mainBlue  hover:scale-125 cursor-pointer hover:text-mainPurple transition"
              size={32}
            />
          </div>
        </div>
      </div>
      <div className="flex border border-gray-300 p-4 rounded-lg text-gray-600 bg-white space-y-2 w-full h-full flex-col">
        <div className="flex space-x-2 text-sm justify-end items-center">
          <div className="flex">دی ماه 10</div>
          <div className="flex">
            <p>امتیاز</p>
            <p>5/10</p>
          </div>
          <div className="flex justify-center items-center">
            <StarHalf className="text-mainBlue" size={25} />
          </div>
        </div>
        <div className="flex justify-end items-end">
          <h1 className="text-2xl text-gray-900">هتل راحت</h1>
        </div>
        <div className="flex">
          <p className="text-sm">
            می‌خواهند و هم دلشان می‌خواهد به مرکز شهر، شرکت‌های خصوصی و دولتی و
            مکان‌هایی از این دست نزدیک باشند. البته موقعیت مکانی یکی از امتیازات
            این هتل است؛{" "}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p>مهسا لاجویی</p>
          <div className="flex space-x-2">
            <ThumbsUp
              className="text-mainBlue  hover:scale-125 cursor-pointer hover:text-mainPurple transition"
              size={32}
            />
            <ThumbsDown
              className="text-mainBlue  hover:scale-125 cursor-pointer hover:text-mainPurple transition"
              size={32}
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <Reply />
      </div>
    </div>
  );
}
