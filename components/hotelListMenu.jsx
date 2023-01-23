import { Accordion } from "@mantine/core";
import { Switch } from "@mantine/core";
import { MagnifyingGlass } from "phosphor-react";
import { Checkbox } from "@mantine/core";
import { RangeSlider } from "@mantine/core";
export default function HotelListMenu() {
  return (
    <div className="flex flex-col items-center space-y-4 bg-white p-4 drop-shadow-lg">
      <div class="pt-2 relative text-black ">
        <input
          className="border-2 placeholder-gray-400 text-right transition ease-in duration-300 text-darkPurple w-52 hover:bg-white   bg-gray-100 font-mainFont h-10 px-5 pr-4 md:pr-16 rounded-full  text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="جستجو نام هتل"
        />
        <button
          type="submit"
          className="absolute flex items-center left-0 top-0 mt-5 ml-4"
        >
          <MagnifyingGlass size={20} weight="bold" />
        </button>
      </div>
      <Accordion
        className="w-full  "
        variant="separated"
        chevronPosition="left"
        defaultValue="customization"
      >
        <Accordion.Item value="customization">
          <Accordion.Control>
            <span className=" text-gray-900 flex justify-end text-md text-right">
              ستاره هتل
            </span>
          </Accordion.Control>
          <Accordion.Panel>
            <div className="  text-gray-500 flex items-end text-xl flex-col justify-center space-y-2">
              <Switch label="کمتر از سه ستاره" color="violet" />
              <Switch label="چهار ستاره" color="violet" />
              <Switch label="پنج ستاره" color="violet" />
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <Accordion
        className="w-full  "
        variant="separated"
        chevronPosition="left"
        defaultValue="customization"
      >
        <Accordion.Item value="customization">
          <Accordion.Control>
            <span className=" text-gray-900 flex justify-end  text-md text-right">
              رنج قیمتی
            </span>
          </Accordion.Control>
          <Accordion.Panel>
            <div className=" w-full h-full text-xs text-gray-800 px-5 py-10">
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
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <Accordion
        className="w-full  "
        variant="separated"
        chevronPosition="left"
        defaultValue="customization"
      >
        <Accordion.Item value="customization">
          <Accordion.Control>
            <span className=" text-gray-900 flex justify-end  text-md text-right">
              امکانات هتل
            </span>
          </Accordion.Control>
          <Accordion.Panel>
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
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <Accordion
        className="w-full  "
        variant="separated"
        chevronPosition="left"
        defaultValue="customization"
      >
        <Accordion.Item value="customization">
          <Accordion.Control>
            <span className=" text-gray-900 flex justify-end  text-md text-right">
              نوع اقامتگاه
            </span>
          </Accordion.Control>
          <Accordion.Panel>
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
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
