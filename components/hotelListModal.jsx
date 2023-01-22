import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
export default function HotelListModal() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <div>
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        centered
        opened={opened}
        onClose={() => setOpened(false)}
      >
        {/* Modal content */}
      </Modal>
      <button
        onClick={() => setOpened(true)}
        className="py-2 px-7 font-mainFont bg-white transition ease-in duration-300 text-gray-700 text-lg"
      >
        فیلترها
      </button>
    </div>
  );
}
