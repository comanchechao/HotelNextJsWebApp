import { StarHalf, ThumbsUp, ThumbsDown } from "phosphor-react";
import { useState } from "react";

export default function Comments({ comment, hotel }) {
  return (
    <div className="flex space-y-2 flex-col  text-right  rounded-md  ">
      <div className="flex border border-gray-300 p-4 rounded-lg text-gray-600 bg-white space-y-2 w-full h-full flex-col">
        <div className="flex space-x-2 text-sm justify-end items-center">
          <div className="flex">{comment.createdAt}</div>
          <div className="flex">
            <p>امتیاز</p>
            <p>{comment.stars}/10</p>
          </div>
          <div className="flex justify-center items-center">
            <StarHalf className="text-mainBlue" size={25} />
          </div>
        </div>
        <div className="flex justify-end items-end">
          <h1 className="text-2xl text-gray-900">{comment.title}</h1>
        </div>
        <div className="flex">
          <p className="text-sm">{comment.comment}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>{comment.fullName}</p>
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
    </div>
  );
}
