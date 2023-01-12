import { Accordion } from "@mantine/core";
import { Switch } from "@mantine/core";
import { MagnifyingGlass } from "phosphor-react";
export default function HotelListMenu() {
  return (
    <div className="flex flex-col items-center space-y-3">
      <div class="pt-2 relative text-black ">
        <input
          className="border-2 placeholder-gray-400 text-right transition ease-in duration-300 text-darkPurple w-textArea hover:bg-white   bg-gray-100 font-mainFont h-10 px-5 pr-4 md:pr-16 rounded-full text-sm focus:outline-none"
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
            <span className=" text-gray-900 flex justify-end text-sm text-right">
              ستاره هتل
            </span>
          </Accordion.Control>
          <Accordion.Panel>
            <div className="  text-gray-500 flex items-center text-xl flex-col justify-center space-y-2">
              <Switch label="کمتر از سه ستاره" color="violet" />
              <Switch label="چهار ستاره" color="violet" />
              <Switch label="پنج ستاره" color="violet" />
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
