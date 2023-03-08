import {
  Modal,
  useMantineTheme,
  Switch,
  RangeSlider,
  Checkbox,
} from "@mantine/core";
import { useState } from "react";
import { Accordion } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "../store/filterActivation";
export default function HotelListModal({ features }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  let stars = useSelector((state) => state.filter.stars);

  const dispatch = useDispatch();
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
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        exitTransitionDuration={600}
        opened={opened}
        size="md"
        onClose={() => setOpened(false)}
      >
        <Accordion
          className="w-full  "
          variant="filled"
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
                <Switch
                  checked={stars === 3}
                  onClick={() => {
                    dispatch(filterActions.setStars(3));
                  }}
                  label="کمتر از سه ستاره"
                  color="yellow"
                />
                <Switch
                  checked={stars === 4}
                  onClick={() => {
                    dispatch(filterActions.setStars(4));
                  }}
                  label="چهار ستاره"
                  color="yellow"
                />
                <Switch
                  checked={stars === 5}
                  onClick={() => {
                    dispatch(filterActions.setStars(5));
                  }}
                  label="پنج ستاره"
                  color="yellow"
                />
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
        <Accordion
          className="w-full  "
          variant="filled"
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
          variant="filled"
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
                {features.map((feature, i) => {
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
                })}
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
        <Accordion
          className="w-full  "
          variant="filled"
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
        <button
          onClick={() => setOpened(false)}
          className="py-1 px-8 mt-6 border-2 font-mainFont border-r-8 border-mainBlue rounded-md bg-white transition ease-in duration-300 text-gray-700 text-lg"
        >
          تایید
        </button>
      </Modal>
      <button
        onClick={() => setOpened(true)}
        className="py-1 px-8 mt-6 font-mainFont border-r-8 border-mainBlue rounded-md bg-white transition ease-in duration-300 text-gray-700 text-lg"
      >
        فیلترها
      </button>
    </div>
  );
}
