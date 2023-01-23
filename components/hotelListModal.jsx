import {
  Modal,
  useMantineTheme,
  Switch,
  RangeSlider,
  Checkbox,
} from "@mantine/core";
import { useState } from "react";
import { Tabs } from "@mantine/core";
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
        size="md"
        onClose={() => setOpened(false)}
      >
        <Tabs
          color="violet"
          variant="pills"
          radius="xs"
          orientation="horizontal"
          defaultValue="gallery"
          placement="right"
        >
          <Tabs.List>
            <Tabs.Tab value="gallery">ستاره ی هتل</Tabs.Tab>
            <Tabs.Tab value="messages">رنج قیمتی</Tabs.Tab>
            <Tabs.Tab value="settings">امکانات هتل</Tabs.Tab>
            <Tabs.Tab value="place">نوع اقامتگاه</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="gallery" pl="xs">
            <div className="  text-gray-500 flex items-end text-xl flex-col p-6 justify-center space-y-2">
              <Switch label="کمتر از سه ستاره" color="violet" />
              <Switch label="چهار ستاره" color="violet" />
              <Switch label="پنج ستاره" color="violet" />
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="messages" pl="xs">
            <div className=" h-full text-xs text-gray-800 px-5 py-10">
              <RangeSlider
                color="violet"
                radius="xl"
                size="sm"
                marks={[
                  { value: 5, label: "5,000,000" },
                  { value: 100, label: "100,000,000" },
                ]}
              />
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="settings" pl="xs">
            <div className=" flex text-right   items-end text-xl flex-col justify-center space-y-2">
              <Checkbox
                labelPosition="left"
                color="violet"
                radius="xl"
                value="react"
                label="امکانات برگزاری جلسات و ضیافت"
              />
              <Checkbox
                labelPosition="left"
                color="violet"
                radius="xl"
                value="svelte"
                label="زمین تنیس"
              />
              <Checkbox
                labelPosition="left"
                color="violet"
                radius="xl"
                value="ng"
                label="زمین گلف"
              />
              <Checkbox
                labelPosition="left"
                color="violet"
                radius="xl"
                value="vue"
                label="خدمات نگهداری نوزاد و کودک"
              />
              <Checkbox
                labelPosition="left"
                color="violet"
                radius="xl"
                value="vue2"
                label="امکانات ویژه برای معلولان"
              />
              <Checkbox
                labelPosition="left"
                color="violet"
                radius="xl"
                value="vue3"
                label="مرکز اسپا و ماساژ"
              />
              <Checkbox
                labelPosition="left"
                color="violet"
                radius="xl"
                value="vue4"
                label="فروشگاه و خرید"
              />
              <Checkbox
                labelPosition="left"
                color="violet"
                radius="xl"
                value="vue5"
                label="سالن بولینگ"
              />
              <Checkbox
                labelPosition="left"
                color="violet"
                radius="xl"
                value="vue6"
                label="حمام ترکی"
              />
              <Checkbox
                labelPosition="left"
                color="violet"
                radius="xl"
                value="vue7"
                label="امکانات غواصی"
              />
              <Checkbox
                labelPosition="left"
                color="violet"
                radius="xl"
                value="vue8"
                label="استخر سرپوشیده"
              />
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="place" pl="xs">
            <div className=" w-flex text-right   items-end text-xl flex-col justify-center space-y-2">
              <Checkbox
                labelPosition="left"
                color="violet"
                radius="xl"
                value="react1"
                label="متفرقه"
              />
              <Checkbox
                labelPosition="left"
                color="violet"
                radius="xl"
                value="svelte2"
                label="آپارتمان"
              />
              <Checkbox
                labelPosition="left"
                color="violet"
                radius="xl"
                value="ng3"
                label="خوابگاه"
              />
              <Checkbox
                labelPosition="left"
                color="violet"
                radius="xl"
                value="vue11"
                label="هتل"
              />
              <Checkbox
                labelPosition="left"
                color="violet"
                radius="xl"
                value="vue12"
                label="تخت و صبحانه"
              />
              <Checkbox
                labelPosition="left"
                color="violet"
                radius="xl"
                value="vue13"
                label="خانه مهمان پذیر"
              />
              <Checkbox
                labelPosition="left"
                color="violet"
                radius="xl"
                value="vue14"
                label="هتل آپارتمان"
              />
            </div>
          </Tabs.Panel>
        </Tabs>
      </Modal>
      <button
        onClick={() => setOpened(true)}
        className="py-1 px-8 mt-6 font-mainFont border-r-8 border-mainBlue rounded-full bg-white transition ease-in duration-300 text-gray-700 text-lg"
      >
        فیلترها
      </button>
    </div>
  );
}
