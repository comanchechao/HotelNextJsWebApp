import { useState } from "react";
import { Modal, Textarea } from "@mantine/core";
import { Plus } from "phosphor-react";
export default function TicketModal() {
  const [opened, setOpened] = useState(false);
  return (
    <div>
      <Modal
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        opened={opened}
        onClose={() => setOpened(false)}
        centered
      >
        <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
          <h1>درخواست تیکت جدید</h1>
          <Textarea
            className="text-2xl  text-right flex flex-col items-end"
            placeholder="عنوان درخواست"
            label="عنوان درخواست"
            radius="xs"
            autosize
            withAsterisk
          />
          <Textarea
            className="text-2xl  text-right flex flex-col items-end"
            placeholder="شرح درخواست"
            label="شرح درخواست"
            radius="xs"
            autosize
            minRows={7}
            withAsterisk
          />
          <button className="px-14 rounded-md flex items-center transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-xl font-mainFont">
            <h4>درخواست تیکت</h4>
            <Plus className="mx-2" size={28} weight="fill" />
          </button>
        </div>
      </Modal>
      <button
        className="px-14 rounded-full flex items-center transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-xl font-mainFont"
        onClick={() => setOpened(true)}
      >
        <h4>ایجاد تیکت جدید</h4>
        <Plus className="mx-2" size={28} weight="fill" />
      </button>
    </div>
  );
}
