import { DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import jalaliday from "jalaliday";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { roomActions } from "../store/room";
import { useEffect, useState } from "react";
export default function Calendar() {
  const faLocale = {
    name: "fa",
    weekdays: [
      "چهارشنبه",
      "پنج‌شنبه",
      "جمعه",
      "شنبه",
      "یک‌شنبه",
      "دوشنبه",
      "سه‌شنبه",
    ],
    weekStart: 1,
    months: [
      "دی",
      "بهمن",
      "اسفند",
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
    ],
    relativeTime: {
      future: "%s بعد",
      past: "%s قبل",
      s: "چند ثانیه",
      m: "1 دقیقه",
      mm: "%d دقیقه",
      h: "1 ساعت",
      hh: "%d ساعت",
      d: "1 روز",
      dd: "%d روز",
      M: "1 ماه",
      MM: "%d ماه",
      y: "1 سال",
      yy: "%d سال",
    },
    formats: {
      L: "DD/MM/YYYY",
      LTS: "HH:mm:ss",
      LLLL: "dddd, D MMMM YYYY HH:mm",
      LLL: "D MMMM YYYY HH:mm",
    },
  };

  const [dates, setDates] = useState(null);
  // You need to extend the custom locale and localeData
  dayjs.extend(jalaliday);
  dayjs.extend(customParseFormat);
  dayjs.extend(localeData);
  dayjs.localeData("fa", faLocale);
  let checkoutDate = useSelector((state) => state.room.roomCheckout);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    console.log(checkoutDate);
  }, [checkoutDate]);

  return (
    <div>
      <DatePickerInput
        locale={faLocale}
        numberOfColumns={2}
        dropdownType="modal"
        value={dates}
        placeholder="تاریخ خروج"
        label={t("inDate")}
        minDate={dayjs().add(11, "day").toDate()}
        withAsterisk
        defaultValue={dayjs().add(11, "day").toDate()}
        onChange={(e) => {
          if (e) {
            setDates(e);
          }
          if (e[1]) {
            dispatch(roomActions.setCheckout(e[1].toISOString()));
          }
        }}
        radius="md"
        size="md"
      />
    </div>
  );
}
