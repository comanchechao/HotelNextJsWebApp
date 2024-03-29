import { Accordion } from "@mantine/core";
import { Question } from "phosphor-react";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";

export default function Faq() {
  const { t, i18n } = useTranslation();
  const lng = i18n.language;
  useEffect(() => {
    changeAlignment();
  }, [lng]);

  const [alignLeft, setAlignLeft] = useState(false);
  async function changeAlignment() {
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
  return (
    <Accordion
      className="w-full  "
      variant="separated"
      chevronPosition="left"
      defaultValue="customization"
    >
      <Accordion.Item value="customization">
        <Accordion.Control
          icon={<Question size={40} color="#ffb31c" weight="bold" />}
        >
          <span
            className={`${
              alignLeft === true
                ? "text-gray-900 flex justify-end text-lg text-right"
                : "text-gray-900 flex justify-start text-lg text-left"
            }`}
          >
            {t("Q1")}
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span
            className={`${
              alignLeft === true
                ? "text-gray-500 flex items-end text-sm text-right px-12 leading-relaxed"
                : "text-gray-500 flex items-end text-sm text-left px-12 leading-relaxed"
            }`}
          >
            {t("A1")}
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization1">
        <Accordion.Control
          icon={<Question size={40} color="#ffb31c" weight="bold" />}
        >
          <span
            className={`${
              alignLeft === true
                ? "text-gray-900 flex justify-end text-lg text-right"
                : "text-gray-900 flex justify-start text-lg text-left"
            }`}
          >
            {t("Q2")}
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span
            className={`${
              alignLeft === true
                ? "text-gray-500 flex items-end text-sm text-right px-12 leading-relaxed"
                : "text-gray-500 flex items-end text-sm text-left px-12 leading-relaxed"
            }`}
          >
            {t("A2")}
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization2">
        <Accordion.Control
          icon={<Question size={40} color="#ffb31c" weight="bold" />}
        >
          <span
            className={`${
              alignLeft === true
                ? "text-gray-900 flex justify-end text-lg text-right"
                : "text-gray-900 flex justify-start text-lg text-left"
            }`}
          >
            {t("Q3")}
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span
            className={`${
              alignLeft === true
                ? "text-gray-500 flex items-end text-sm text-right px-12 leading-relaxed"
                : "text-gray-500 flex items-end text-sm text-left px-12 leading-relaxed"
            }`}
          >
            {t("A3")}
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization3">
        <Accordion.Control
          icon={<Question size={40} color="#ffb31c" weight="bold" />}
        >
          <span
            className={`${
              alignLeft === true
                ? "text-gray-900 flex justify-end text-lg text-right"
                : "text-gray-900 flex justify-start text-lg text-left"
            }`}
          >
            {t("Q4")}
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span
            className={`${
              alignLeft === true
                ? "text-gray-500 flex items-start text-sm text-right px-12 "
                : "text-gray-500 flex items-end text-sm text-left px-12 leading-relaxed"
            }`}
          >
            {t("A4")}
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization4">
        <Accordion.Control
          icon={<Question size={40} color="#ffb31c" weight="bold" />}
        >
          <span
            className={`${
              alignLeft === true
                ? "text-gray-900 flex justify-end text-lg text-right"
                : "text-gray-900 flex justify-start text-lg text-left"
            }`}
          >
            {t("Q5")}
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span
            className={`${
              alignLeft === true
                ? "text-gray-500 flex items-end text-sm text-right px-12 leading-relaxed"
                : "text-gray-500 flex items-end text-sm text-left px-12 leading-relaxed"
            }`}
          >
            {t("A5")}
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization5">
        <Accordion.Control
          icon={<Question size={40} color="#ffb31c" weight="bold" />}
        >
          <span
            className={`${
              alignLeft === true
                ? "text-gray-900 flex justify-end text-lg text-right"
                : "text-gray-900 flex justify-start text-lg text-left"
            }`}
          >
            {t("Q6")}
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span
            className={`${
              alignLeft === true
                ? "text-gray-500 flex items-end text-sm text-right px-12 leading-relaxed"
                : "text-gray-500 flex items-end text-sm text-left px-12 leading-relaxed"
            }`}
          >
            {t("A6")}
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization6">
        <Accordion.Control
          icon={<Question size={40} color="#ffb31c" weight="bold" />}
        >
          <span
            className={`${
              alignLeft === true
                ? "text-gray-900 flex justify-end text-lg text-right"
                : "text-gray-900 flex justify-start text-lg text-left"
            }`}
          >
            {t("Q7")}
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span
            className={`${
              alignLeft === true
                ? "text-gray-500 flex items-end text-sm text-right px-12 leading-relaxed"
                : "text-gray-500 flex items-end text-sm text-left px-12 leading-relaxed"
            }`}
          >
            {t("A7")}
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization7">
        <Accordion.Control
          icon={<Question size={40} color="#ffb31c" weight="bold" />}
        >
          <span
            className={`${
              alignLeft === true
                ? "text-gray-900 flex justify-end text-lg text-right"
                : "text-gray-900 flex justify-start text-lg text-left"
            }`}
          >
            {t("Q8")}
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span
            className={`${
              alignLeft === true
                ? "text-gray-500 flex items-end text-sm text-right px-12 leading-relaxed"
                : "text-gray-500 flex items-end text-sm text-left px-12 leading-relaxed"
            }`}
          >
            {t("A8")}
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization8">
        <Accordion.Control
          icon={<Question size={40} color="#ffb31c" weight="bold" />}
        >
          <span
            className={`${
              alignLeft === true
                ? "text-gray-900 flex justify-end text-lg text-right"
                : "text-gray-900 flex justify-start text-lg text-left"
            }`}
          >
            {t("Q9")}
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span
            className={`${
              alignLeft === true
                ? "text-gray-500 flex items-end text-sm text-right px-12 leading-relaxed"
                : "text-gray-500 flex items-end text-sm text-left px-12 leading-relaxed"
            }`}
          >
            {t("A9")}
          </span>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
