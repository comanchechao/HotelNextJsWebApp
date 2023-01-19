import { useState } from "react";
import { Modal, Select, Group } from "@mantine/core";
import { IconUpload } from "@tabler/icons";

export default function addRoom() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        size="400px"
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        title="Add new Hotel"
      >
        <div className="flex flex-col  w-full h-full">
          <div className="flex space-y-2 w-full h-full flex-col">
            <div className="flex justify-around flex-wrap">
              <div className="flex p-2 w-full text-right justify-end">
                :تصاویر هتل
              </div>
              <button className="w-14 py-4 bg-darkPurple transition justify-center items-center flex ease-in duration-300 font-mainFont rounded-full text-center text-white hover:bg-mainBlue">
                <IconUpload size={30} />
              </button>
              <button className="w-14 py-4 bg-darkPurple transition justify-center items-center flex ease-in duration-300 font-mainFont rounded-full text-center text-white hover:bg-mainBlue">
                <IconUpload size={30} />
              </button>
              <button className="w-14 py-4 bg-darkPurple transition justify-center items-center flex ease-in duration-300 font-mainFont rounded-full text-center text-white hover:bg-mainBlue">
                <IconUpload size={30} />
              </button>
              <button className="w-14 py-4 bg-darkPurple transition justify-center items-center flex ease-in duration-300 font-mainFont rounded-full text-center text-white hover:bg-mainBlue">
                <IconUpload size={30} />
              </button>
              <button className="w-14 py-4 bg-darkPurple transition justify-center items-center flex ease-in duration-300 font-mainFont rounded-full text-center text-white hover:bg-mainBlue">
                <IconUpload size={30} />
              </button>
            </div>
            <div className="flex  flex-col justify-center space-x-2 text-right items-end w-full h-full">
              <label className="w-24" htmlFor="title">
                :عنوان هتل
              </label>
              <input
                className="py-2 text-right px-2 w-full bg-gray-200"
                type="text"
                name="title"
                placeholder="..."
              />
            </div>
            <div className="flex w-full h-full text-right justify-center items-center">
              <Select
                searchable
                className="text-right w-full"
                label=":امکانات هتل"
                data={[
                  { value: "صبحانه", label: "استخر" },
                  { value: "صبحانه و نهار", label: "خشکشویی" },
                  { value: "بدون وعده غذایی", label: "اینترنت بی سیم" },
                  { value: "شام", label: "وعده های غذایی" },
                ]}
              />
            </div>
            <div className="flex w-full h-full text-right justify-center items-center">
              <Select
                searchable
                className="text-right w-full"
                label=":ستاره های هتل"
                data={[
                  { value: "5", label: "5" },
                  { value: "4", label: "4" },
                  { value: "3", label: "3" },
                  { value: "2", label: "2" },
                  { value: "1", label: "1" },
                ]}
              />
            </div>
            <div className="flex  flex-col justify-center space-x-2 text-right items-end w-full h-full">
              <label className="w-24" htmlFor="price">
                :قیمت هرشب
              </label>
              <input
                className="py-2 text-right px-2 w-full bg-gray-200"
                type="number"
                name="price"
                placeholder="..."
              />
            </div>
            <div className="flex w-full h-full text-right justify-center items-center">
              <Select
                searchable
                className="text-right w-full"
                label=":ظرفیت اتاق"
                data={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "4", label: "4" },
                ]}
              />
            </div>
            <div className="flex p-5 w-full justify-center items-center">
              <button className="font-bold p-3 transition text-mainPurple hover:bg-darkPurple hover:text-gray-100 rounded-sm">
                <p>انتخاب محل در نقشه</p>
              </button>
            </div>
            <div className="flex">
              <button
                onClick={() => {
                  setOpened(false);
                }}
                className="w-52 py-3 border-r-8 border-mainBlue my-4 bg-mainPurple transition ease-in duration-300 font-mainFont rounded-full text-white hover:bg-mainBlue"
              >
                افزودن
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
          className="w-52 py-3 border-2 text-lg border-darkPurple border-dashed bg-transparent transition ease-in duration-300 font-mainFont rounded-full text-darkPurple hover:bg-mainBlue"
        >
          هتل جدید
        </button>
      </Group>
    </>
  );
}
