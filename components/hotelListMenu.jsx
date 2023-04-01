import { Accordion } from "@mantine/core";
import { Switch } from "@mantine/core";
import { MagnifyingGlass } from "phosphor-react";
import { Checkbox } from "@mantine/core";
import { RangeSlider } from "@mantine/core";
import { filterActions } from "../store/filterActivation";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { reservationActions } from "../store/reservation";
export default function HotelListMenu({
  features,
  residenceTypes,
  cities,
  countries,
}) {
  let stars = useSelector((state) => state.filter.stars);
  const [min, setMin] = useState();
  const [max, setMax] = useState();

  useEffect(() => {
    dispatch(filterActions.setMinPrice(min));
  }, [min]);

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
  let filterFeatures = useSelector((state) => state.filter.features);
  let filterResidenceTypes = useSelector((state) => state.filter.residenceType);
  let filterCities = useSelector((state) => state.reserve.city);
  let filterCountries = useSelector((state) => state.filter.country);

  const { t, i18n } = useTranslation("common");
  const lng = i18n.language;

  useEffect(() => {
    changeAlignment();
  }, []);

  const [alignLeft, setAlignLeft] = useState(false);
  async function changeAlignment() {
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
  const dispatch = useDispatch();
  return (
    <div
      style={{ lineHeight: "1.7 !important" }}
      className="flex flex-col items-center space-y-4 bg-white p-4 drop-shadow-xl rounded-md z-30"
    >
      {" "}
      <Accordion
        className="w-full  "
        variant="separated"
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
              {t("country")}
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
                ? countries.map((country, i) => {
                    return (
                      <Checkbox
                        onClick={() => {
                          dispatch(filterActions.setCountry(country.title));
                        }}
                        checked={filterCountries.includes(country.title)}
                        key={i}
                        labelPosition="left"
                        color="yellow"
                        radius="xl"
                        value="react"
                        label={country.title}
                      />
                    );
                  })
                : countries.map((country, i) => {
                    return (
                      <Checkbox
                        onClick={() => {
                          dispatch(filterActions.setCountry(country.title));
                        }}
                        checked={filterCountries.includes(country.title)}
                        key={i}
                        labelPosition="left"
                        color="yellow"
                        radius="xl"
                        value="react"
                        label={country.trTitle}
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
                        onClick={() => {
                          dispatch(reservationActions.setCity(city.name));
                        }}
                        checked={filterCities.includes(city.name)}
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
                        onClick={() => {
                          dispatch(reservationActions.setCity(city.trTitle));
                        }}
                        checked={filterCities.includes(city.trTitle)}
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
        className="w-full  h-full"
        variant="separated"
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
        variant="separated"
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
                onChange={setMin}
                onChangeEnd={setMin}
                radius="xl"
                max={500000000}
                min={0}
                size="sm"
                marks={[
                  { value: 5, label: "5" },
                  { value: 500000000, label: "500000000" },
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
                        onClick={() => {
                          dispatch(filterActions.setFeatures(feature.title));
                        }}
                        checked={filterFeatures.includes(feature.title)}
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
                        onClick={() => {
                          dispatch(filterActions.setFeatures(feature.title));
                        }}
                        checked={filterFeatures.includes(feature.title)}
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
                            filterActions.setResidenceType(residenceType.title)
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
                        onClick={() => {
                          dispatch(
                            filterActions.setResidenceType(residenceType.title)
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
                        label={residenceType.trTitle}
                      />
                    );
                  })}
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
