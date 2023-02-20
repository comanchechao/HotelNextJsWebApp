import { Accordion } from "@mantine/core";
import { Question } from "phosphor-react";
import { useTranslation } from "next-i18next";

export default function Faq() {
  const { t } = useTranslation("common");

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
          <span className=" text-gray-900 flex justify-end text-xl text-right">
            {t("Q1")}
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span className="  text-gray-500 flex items-end text-xl text-right px-12">
            {t("A1")}
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization1">
        <Accordion.Control
          icon={<Question size={40} color="#ffb31c" weight="bold" />}
        >
          <span className=" text-gray-900 flex justify-end text-xl text-right">
            {t("Q2")}
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span className="  text-gray-500 flex items-end text-xl text-right px-12">
            {t("A2")}
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization2">
        <Accordion.Control
          icon={<Question size={40} color="#ffb31c" weight="bold" />}
        >
          <span className=" text-gray-900 flex justify-end text-xl text-right">
            {t("Q3")}
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span className="  text-gray-500 flex items-end text-xl text-right px-12">
            {t("A3")}
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization3">
        <Accordion.Control
          icon={<Question size={40} color="#ffb31c" weight="bold" />}
        >
          <span className=" text-gray-900 flex justify-end text-xl text-right">
            {t("Q4")}
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span className="  text-gray-500 flex justify-end text-xl text-right px-12">
            {t("A4")}
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization4">
        <Accordion.Control
          icon={<Question size={40} color="#ffb31c" weight="bold" />}
        >
          <span className=" text-gray-900 flex justify-end text-xl text-right">
            {t("Q5")}
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span className="  text-gray-500 flex items-end text-xl text-right px-12">
            {t("A5")}
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization5">
        <Accordion.Control
          icon={<Question size={40} color="#ffb31c" weight="bold" />}
        >
          <span className=" text-gray-900 flex justify-end text-xl text-right">
            {t("Q6")}
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span className="  text-gray-500 flex justify-end text-xl text-right px-12">
            {t("A6")}
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization6">
        <Accordion.Control
          icon={<Question size={40} color="#ffb31c" weight="bold" />}
        >
          <span className=" text-gray-900 flex justify-end text-xl text-right">
            {t("Q7")}
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span className="  text-gray-500 flex items-end text-xl text-right px-12">
            {t("A7")}
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization7">
        <Accordion.Control
          icon={<Question size={40} color="#ffb31c" weight="bold" />}
        >
          <span className=" text-gray-900 flex justify-end text-xl text-right">
            {t("Q8")}
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span className="  text-gray-500 flex items-end text-xl text-right px-12">
            {t("A8")}
          </span>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="customization8">
        <Accordion.Control
          icon={<Question size={40} color="#ffb31c" weight="bold" />}
        >
          <span className=" text-gray-900 flex justify-end text-xl text-right">
            {t("Q9")}
          </span>
        </Accordion.Control>
        <Accordion.Panel>
          <span className="  text-gray-500 flex justify-end text-xl text-right px-12">
            {t("A9")}
          </span>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
