import { useEffect, useState } from "react";
import { Modal, Rating, Group, Loader } from "@mantine/core";
import { supabase } from "../lib/supabaseClient";

export default function Reply(props) {
  let hotel = props.hotel;

  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState(false);
  const [stars, setStars] = useState(0);
  const [title, setTitle] = useState("");
  const [fullName, setFullname] = useState("");

  async function addComment() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase.from("comments").insert([
        {
          hotelId: hotel.id,
          comment: comment,
          stars: stars,
          title: title,
          fullName: fullName,
        },
      ]);
      console.log(user.id);
      console.log(comment);
      console.log(stars);
      setLoading(false);
      setOpened(false);
    } else {
      console.log("User not found");
    }
  }
  return (
    <>
      <Modal
        size="600px"
        opened={opened}
        onClose={() => setOpened(false)}
        centered
      >
        <div className="w-full h-full">
          <div className=" py-5 flex flex-col w-full justify-center items-center">
            <div className="flex space-y-2 py-2 text-right flex-col w-full h-full p-4 bg-gray-100">
              <label htmlFor="reply">عنوان</label>
              <textarea
                className="bg-gray-100 border border-gray-400"
                name="reply"
                id=""
                cols="30"
                rows="1"
                onChange={(e) => setTitle(e.target.value)}
              ></textarea>
              <label htmlFor="reply">نظر خودتون رو راجب هتل بنویسید</label>
              <textarea
                className="bg-gray-100 border border-gray-400"
                name="reply"
                id=""
                cols="30"
                rows="10"
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>{" "}
            <div className="flex w-full justify-around items-center h-full p-4">
              <Rating
                value={stars}
                defaultValue={5}
                onChange={setStars}
                size="lg"
                count={5}
              />
              <p>:انتخاب کنید</p>
            </div>
            <div className="flex">
              <button
                onClick={addComment}
                className="text-white my-4 bg-mainPurple font-mainFont rounded-md text-lg cursor-pointer border-r-8 border-mainBlue  text-center flex items-center justify-center px-6 py-2 hover:bg-mainBlue duration-300 ease-in transition"
              >
                {loading ? (
                  <Loader size="sm" color="yellow" variant="bars" />
                ) : (
                  <p> ثبت نظر</p>
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Group position="center">
        <button
          onClick={() => {
            setOpened(true);
          }}
          className="text-white self-end my-4 bg-mainPurple font-mainFont rounded-md text-lg cursor-pointer border-r-8 border-mainBlue  text-center flex items-center justify-center px-6 py-2 hover:bg-mainBlue duration-300 ease-in transition"
        >
          نظر شما
        </button>
      </Group>
    </>
  );
}
