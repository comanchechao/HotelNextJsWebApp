import { Drawer, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { List } from "phosphor-react";
export default function NavDrawer() {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  return (
    <div>
      <Drawer
        onClose={() => setOpened(false)}
        opened={opened}
        size="md"
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        {/* Drawer content */}
      </Drawer>
      <button
        onClick={() => setOpened(true)}
        className="text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200 flex items-center"
      >
        <List size={35} />
      </button>
    </div>
  );
}
