import { DatePicker } from "zaman";
import { Suspense } from "react";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";

export default function Calendar() {
  const { t } = useTranslation();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-end justify-center">
        <h2>{t("inDate")}</h2>
        <DatePicker
          onChange={(e) => {}}
          round="x2"
          className="text-center"
          inputClass="w-60   font-mainFont text-center h-10 my-0 bg-white border border-gray-300 rounded-lg justify-center items-center"
          from={dayjs()}
          direction="ltr"
          range
        />
      </div>
    </Suspense>
  );
}
