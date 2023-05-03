import { DatePicker } from "zaman";
import { Suspense, useEffect } from "react";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { reservationActions } from "../store/reservation";
import { useState } from "react";
import jalaliday from "jalaliday";

export default function Calendar() {
  let enterDate = useSelector((state) => state.reserve.enterDate);
  let exitDate = useSelector((state) => state.reserve.exitDate);
  const [inputError, setInputError] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  dayjs.extend(jalaliday);
  useEffect(() => {
    console.log(enterDate);
    console.log(exitDate);
  }, [enterDate]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-end justify-center">
        {inputError ? (
          <h2 className="text-red-500">تاریخ را چک کنید</h2>
        ) : (
          <h2 style={{ color: inputError ? " red" : "none" }}>{t("inDate")}</h2>
        )}
        <DatePicker
          onChange={(e) => {
            if (
              dayjs(e.from) > dayjs().toDate() ||
              dayjs(e.to) > dayjs().toDate()
            ) {
              console.log("error ");
              setInputError(false);
            } else if (
              dayjs(e.from) < dayjs().toDate() ||
              dayjs(e.to) < dayjs().toDate()
            ) {
              setInputError(true);
            }
            dispatch(reservationActions.setEnterting(e.from.toISOString()));
            dispatch(reservationActions.setExiting(e.to.toISOString()));
            console.log(e);
          }}
          round="x2"
          inputAttributes={{
            placeholder:
              enterDate !== ""
                ? dayjs(enterDate)
                    .calendar("jalali")
                    .locale("en")
                    .format("YYYY/MM/DD") +
                  " --- " +
                  dayjs(exitDate)
                    .calendar("jalali")
                    .locale("en")
                    .format("YYYY/MM/DD")
                : "تاریخ ورود و خروج",
          }}
          className="text-center"
          inputClass="w-60  text-red font-mainFont text-center h-10 my-0 bg-white border border-gray-300 rounded-lg justify-center items-center"
          from={new Date()}
          weekends={[6]}
          style={{
            color: inputError ? "2px solid red" : "none",
            zIndex: 999999999,
          }}
          accentColor="#6374ae"
          direction="ltr"
          range
        />
      </div>
    </Suspense>
  );
}
