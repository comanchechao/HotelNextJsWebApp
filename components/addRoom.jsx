import { useState } from "react";
import { Modal, Select, Group } from "@mantine/core";

export default function addRoom() {
  const [opened, setOpened] = useState(true);

  return (
    <>
      <Modal
        size="400px"
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        title="Add new room"
      >
        <div className="flex flex-col  w-full h-full">
          <div className="flex space-y-2 w-full h-full flex-col">
            <div className="flex  flex-col justify-center space-x-2 text-right items-end w-full h-full">
              <label className="w-24" htmlFor="title">
                :عنوان اتاق
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
                label=":وعده غذایی اتاق"
                data={[
                  { value: "صبحانه", label: "صبحانه" },
                  { value: "صبحانه و نهار", label: "صبحانه و نهار" },
                  { value: "بدون وعده غذایی", label: "بدون وعده غذایی" },
                  { value: "شام", label: "شام" },
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
            <div className="flex">
              {" "}
              <button
                onClick={() => {
                  setOpened(false);
                }}
                className="w-52 py-4 bg-mainPurple transition ease-in duration-300 font-mainFont rounded-full text-white hover:bg-Sky-500"
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
          className="w-52 py-4 bg-Amber-600 transition ease-in duration-300 font-mainFont rounded-full text-white hover:bg-Sky-500"
        >
          اتاق جدید
        </button>
      </Group>
    </>
  );
}