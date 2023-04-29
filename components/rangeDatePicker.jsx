import { DatePickerInput } from "@mantine/dates";
import "dayjs/locale/tr";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { Group } from "@mantine/core";
export default function RangeDatePicker() {
  const { t, i18n } = useTranslation("");
  const turkishLocaleData = {
    name: "tr",
    weekdays: [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ],
    weekdaysShort: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
    weekdaysMin: ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"],
    months: [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ],
    monthsShort: [
      "Oca",
      "Şub",
      "Mar",
      "Nis",
      "May",
      "Haz",
      "Tem",
      "Ağu",
      "Eyl",
      "Eki",
      "Kas",
      "Ara",
    ],
  };
  const [dates, setDates] = useState([null, dayjs().toDate()]);
  return (
    <DatePickerInput
      dropdownPosition="top"
      placeholder={t("inDate")}
      label={t("inDate")}
      minDate={dayjs().toDate()}
      defaultValue={dayjs().toDate()}
      value={dates}
      onChange={setDates}
      type="range"
      mx="auto"
      maw={400}
      locale="tr"
    />
  );
}
