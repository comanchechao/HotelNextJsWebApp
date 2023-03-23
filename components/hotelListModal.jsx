import {
  Modal,
  useMantineTheme,
  Switch,
  RangeSlider,
  Checkbox,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { Accordion } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "../store/filterActivation";
import { useTranslation } from "next-i18next";
import { useMediaQuery } from "@mantine/hooks";
import { reservationActions } from "../store/reservation";

export default function HotelListModal({ features, residenceTypes, cities }) {
  let filterFeatures = useSelector((state) => state.filter.features);
  let filterCities = useSelector((state) => state.reserve.city);
  let filterResidenceTypes = useSelector(
    (state) => state.filter.residenceTypes
  );
  let stars = useSelector((state) => state.filter.stars);
  const [checked, setChecked] = useState(true);
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const isMobile = useMediaQuery("(max-width: 50em)");
  const { t, i18n } = useTranslation("common");
  const lng = i18n.language;
  const [tempCity, setTempCity] = useState(false);

  async function submitFilters() {
    dispatch(reservationActions.setCity(tempCity));
    setOpened(false);
  }

  useEffect(() => {
    console.log(tempCity);
    changeAlignment();
  }, [tempCity]);
  const [alignLeft, setAlignLeft] = useState(false);
  async function changeAlignment() {
    console.log(lng);
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
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
        fullScreen={isMobile}
        opened={opened}
        size="md"
        onClose={() => setOpened(false)}
      >
        <div className="h-full w-full bg-mainWhite p-2">
          <Accordion
            className="w-full  "
            variant=" "
            chevronPosition="left"
            defaultValue="customization"
          >
            <Accordion.Item value="customization">
              <Accordion.Control>
                <span
                  className={`${
                    alignLeft === true
                      ? "text-gray-900 flex justify-end text-md text-right"
                      : "text-gray-900 flex flex-row-reverse justify-end text-md text-right"
                  }`}
                >
                  {t("city")}
                </span>
              </Accordion.Control>
              <Accordion.Panel>
                <div
                  className={`${
                    alignLeft === true
                      ? "flex text-right   items-end text-xl flex-col justify-center space-y-2"
                      : "flex text-left   items-start text-xl flex-col justify-center space-y-2"
                  }`}
                >
                  {alignLeft
                    ? cities.map((city, i) => {
                        return (
                          <Checkbox
                            onChange={() => {
                              setTempCity(city.name);
                            }}
                            key={i}
                            labelPosition="left"
                            color="yellow"
                            radius="xl"
                            value="react"
                            label={city.name}
                          />
                        );
                      })
                    : cities.map((city, i) => {
                        return (
                          <Checkbox
                            onChange={() => {
                              setTempCity(city.trTitle);
                            }}
                            key={i}
                            labelPosition="left"
                            color="yellow"
                            radius="xl"
                            value="react"
                            label={city.trTitle}
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
                <span
                  className={`${
                    alignLeft === true
                      ? "text-gray-900 flex justify-end text-md text-right"
                      : "text-gray-900 flex flex-row-reverse justify-end text-md text-right"
                  }`}
                >
                  {t("hotelStars")}
                </span>
              </Accordion.Control>
              <Accordion.Panel>
                <div
                  className={`${
                    alignLeft === true
                      ? "flex text-right   items-end text-xl flex-col justify-center space-y-2"
                      : "flex text-left   items-start text-xl flex-col justify-center space-y-2"
                  }`}
                >
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
            variant="filled"
            chevronPosition="left"
            defaultValue="customization"
          >
            <Accordion.Item value="customization">
              <Accordion.Control>
                <span
                  className={`${
                    alignLeft === true
                      ? "text-gray-900 flex justify-end text-md text-right"
                      : "text-gray-900 flex flex-row-reverse justify-end text-md text-right"
                  }`}
                >
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
            variant="filled"
            chevronPosition="left"
            defaultValue="customization"
          >
            <Accordion.Item value="customization">
              <Accordion.Control>
                <span
                  className={`${
                    alignLeft === true
                      ? "text-gray-900 flex justify-end text-md text-right"
                      : "text-gray-900 flex flex-row-reverse justify-end text-md text-right"
                  }`}
                >
                  {t("hotelFacilities")}
                </span>
              </Accordion.Control>
              <Accordion.Panel>
                <div
                  className={`${
                    alignLeft === true
                      ? "flex text-right   items-end text-xl flex-col justify-center space-y-2"
                      : "flex text-left   items-start text-xl flex-col justify-center space-y-2"
                  }`}
                >
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
                            onClick={() => {
                              dispatch(
                                filterActions.setFeatures(feature.title)
                              );
                            }}
                            checked={filterFeatures.includes(feature.title)}
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
            variant="filled"
            chevronPosition="left"
            defaultValue="customization"
          >
            <Accordion.Item value="customization">
              <Accordion.Control>
                <span
                  className={`${
                    alignLeft === true
                      ? "text-gray-900 flex justify-end text-md text-right"
                      : "text-gray-900 flex flex-row-reverse justify-end text-md text-right"
                  }`}
                >
                  {t("residenceTypes")}
                </span>
              </Accordion.Control>
              <Accordion.Panel>
                <div
                  className={`${
                    alignLeft === true
                      ? "flex text-right   items-end text-xl flex-col justify-center space-y-2"
                      : "flex text-left   items-start text-xl flex-col justify-center space-y-2"
                  }`}
                >
                  {alignLeft
                    ? residenceTypes.map((residenceType, i) => {
                        return (
                          <Checkbox
                            onClick={() => {
                              dispatch(
                                filterActions.setResidenceTypes(
                                  residenceType.title
                                )
                              );
                            }}
                            checked={filterResidenceTypes.includes(
                              residenceType.title
                            )}
                            key={i}
                            labelPosition="left"
                            color="yellow"
                            radius="xl"
                            value="react"
                            label={residenceType.title}
                          />
                        );
                      })
                    : residenceTypes.map((residenceType, i) => {
                        return (
                          <Checkbox
                            key={i}
                            labelPosition="left"
                            color="yellow"
                            radius="xl"
                            value="react"
                            label={residenceType.trTitle}
                          />
                        );
                      })}
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
          <button
            onClick={() => submitFilters()}
            className="py-1 px-8 mt-6 border-2 lg:self-start font-mainFont border-r-8 border-mainBlue rounded-md bg-white transition ease-in duration-300 text-gray-700 text-lg"
          >
            {t("confirmFilters")}
          </button>
        </div>
      </Modal>
      <button
        onClick={() => setOpened(true)}
        className="py-1 px-8 mt-6 font-mainFont border border-r-8 border-mainBlue rounded-md bg-white transition ease-in duration-300 text-gray-700 text-lg"
      >
        {t("filters")}
      </button>
    </div>
  );
}
