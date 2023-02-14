import { useState } from "react";
import { Modal, Rating, Group } from "@mantine/core";

export default function Reply() {
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState(0);

  return (
    <>
      <Modal
        size="600px"
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        title="نظر شما"
      >
        <div className="w-full h-full">
          <div className=" py-5 flex flex-col w-full justify-center items-center">
            <div className="flex w-full justify-around items-center h-full p-4">
              <Rating
                value={value}
                defaultValue={5}
                onChange={setValue}
                size="lg"
                count={10}
              />
              <p>:انتخاب کنید</p>
            </div>
            <div className="flex space-y-2 py-2 text-right flex-col w-full h-full p-4 bg-gray-100">
              <label htmlFor="reply">شروع به نوشتن کنید</label>
              <textarea
                className="bg-gray-100 border border-gray-400"
                name="reply"
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="flex">
              <button
                onClick={() => {
                  setOpened(false);
                }}
                className="w-52 py-3 border-2 text-lg border-darkPurple border-dashed bg-mainBlue transition ease-in duration-300 font-mainFont rounded-md text-gray-50 hover:text-darkPurple hover:bg-gray-50"
              >
                ثبت نظر
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
          className="text-white my-4 bg-mainPurple font-mainFont rounded-md text-lg cursor-pointer border-r-8 border-mainBlue  text-center flex items-center justify-center px-6 py-2 hover:bg-mainBlue duration-300 ease-in transition"
        >
          نظر شما
        </button>
      </Group>
    </>
  );
}
