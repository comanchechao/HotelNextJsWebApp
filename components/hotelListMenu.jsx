import { Accordion } from "@mantine/core";
import { Switch } from "@mantine/core";
import { MagnifyingGlass } from "phosphor-react";
import { Checkbox } from "@mantine/core";
import { RangeSlider } from "@mantine/core";
import { filterActions } from "../store/filterActivation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
export default function HotelListMenu({ features }) {
  let stars = useSelector((state) => state.filter.stars);
  // let minPrice = useSelector((state) => state.filter.minPrice);
  // let maxPrice = useSelector((state) => state.filter.maxPrice);
  // const [maxRange, setMaxRange] = useState(maxPrice);

  // const [minRange, setMinRange] = useState(maxPrice);
  // const MARKS = [
  //   { value: minPrice, label: "0" },
  //   { value: maxPrice, label: "1000000" },
  // ];
  // useEffect(() => {
  //   console.log(maxRange, minRange);
  // });
  const { t, i18n } = useTranslation("common");
  const lng = i18n.language;

  useEffect(() => {
    changeAlignment();
  }, []);

  const [alignLeft, setAlignLeft] = useState(false);
  async function changeAlignment() {
    console.log(lng);
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-center space-y-4 bg-white p-4 drop-shadow-xl rounded-md">
      <div class="pt-2 relative text-black ">
        <input
          className="border-2 placeholder-gray-400 text-right transition ease-in duration-300 text-darkPurple w-52 hover:bg-white   bg-gray-100 font-mainFont h-10 px-5 pr-4 md:pr-16 rounded-full  text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder={t("hotelNameSearch")}
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
              {t("hotelStars")}
            </span>
          </Accordion.Control>
          <Accordion.Panel>
            <div className="  text-gray-500 flex items-end text-xl flex-col justify-center space-y-2">
              <Switch
                checked={stars === 3}
                onClick={() => {
                  dispatch(filterActions.setStars(3));
                }}
                label={t("3Stars")}
                color="yellow"
              />
              <Switch
                checked={stars === 4}
                onClick={() => {
                  dispatch(filterActions.setStars(4));
                }}
                label={t("4Stars")}
                color="yellow"
              />
              <Switch
                checked={stars === 5}
                onClick={() => {
                  dispatch(filterActions.setStars(5));
                }}
                label={t("5Stars")}
                color="yellow"
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
              {t("priceRange")}{" "}
            </span>
          </Accordion.Control>
          <Accordion.Panel>
            <div className=" w-full h-full text-xs text-gray-800 px-5 py-10">
              <RangeSlider
                color="yellow"
                thumbSize={19}
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
              {t("hotelFacilities")}
            </span>
          </Accordion.Control>
          <Accordion.Panel>
            <div className=" flex text-right   items-end text-xl flex-col justify-center space-y-2">
              {alignLeft
                ? features.map((feature, i) => {
                    return (
                      <Checkbox
                        key={i}
                        labelPosition="left"
                        color="yellow"
                        radius="xl"
                        value="react"
                        label={feature.title}
                      />
                    );
                  })
                : features.map((feature, i) => {
                    return (
                      <Checkbox
                        key={i}
                        labelPosition="left"
                        color="yellow"
                        radius="xl"
                        value="react"
                        label={feature.trTitle}
                      />
                    );
                  })}
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
                color="yellow"
                radius="xl"
                value="react1"
                label="متفرقه"
              />
              <Checkbox
                labelPosition="left"
                color="yellow"
                radius="xl"
                value="svelte2"
                label="آپارتمان"
              />
              <Checkbox
                labelPosition="left"
                color="yellow"
                radius="xl"
                value="ng3"
                label="خوابگاه"
              />
              <Checkbox
                labelPosition="left"
                color="yellow"
                radius="xl"
                value="vue11"
                label="هتل"
              />
              <Checkbox
                labelPosition="left"
                color="yellow"
                radius="xl"
                value="vue12"
                label="تخت و صبحانه"
              />
              <Checkbox
                labelPosition="left"
                color="yellow"
                radius="xl"
                value="vue13"
                label="خانه مهمان پذیر"
              />
              <Checkbox
                labelPosition="left"
                color="yellow"
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
