import { useState } from "react";
import { Modal, Button, Group } from "@mantine/core";
export default function roomModal() {
  const [opened, setOpened] = useState(false);
  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
        {/* Modal content */}
      </Modal>

      <button
        onClick={() => {
          setOpened(true);
        }}
        className="py-3 hover:text-white border-mainPurple border-2 border-dashed ease-in duration-300 hover:bg-darkPurple transition rounded-full  text-mainPurple my-5 px-12 bg-transparent  shadow-2xl"
      >
        <p>ویرایش</p>
      </button>
    </div>
  );
}
