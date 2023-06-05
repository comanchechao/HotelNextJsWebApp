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
    if (enterDate !== "" && exitDate !== "") {
      console.log("lunched");
      if (dayjs(exitDate) > dayjs(enterDate)) {
        setInputError(false);
      } else if (dayjs(exitDate) < dayjs(enterDate)) {
        setInputError(true);
      }
    }
  }, [enterDate, exitDate]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-end justify-center">
        {inputError ? (
          <h2 className="text-red-500">تاریخ را چک کنید</h2>
        ) : (
          <h2 style={{ color: inputError ? " red" : "none" }}>{t("inDate")}</h2>
        )}

        <div className="lg:hidden flex flex-col space-y-4">
          <DatePicker
            onChange={(e) => {
              if (dayjs(e.value) > dayjs().toDate()) {
                console.log("error ");
                setInputError(false);
              } else if (dayjs(e.value) < dayjs().toDate()) {
                setInputError(true);
              }
              dispatch(reservationActions.setEnterting(e.value.toISOString()));
              console.log(e.value);
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
                  : "تاریخ ورود",
            }}
            className="text-center"
            inputClass="w-60  text-red font-mainFont text-center h-10 my-0 bg-white border border-gray-300 rounded-lg justify-center items-center"
            weekends={[6]}
            style={{
              color: inputError ? "2px solid red" : "none",
              zIndex: 999999999,
            }}
            accentColor="#6374ae"
          />
          <DatePicker
            onChange={(e) => {
              if (dayjs(e.value) > dayjs().toDate()) {
                console.log("error ");
                setInputError(false);
              } else if (dayjs(e.value) < dayjs().toDate()) {
                setInputError(true);
              }
              dispatch(reservationActions.setExiting(e.value.toISOString()));
              console.log(e.value);
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
                  : "تاریخ خروج",
            }}
            className="text-center"
            inputClass="w-60  text-red font-mainFont text-center h-10 my-0 bg-white border border-gray-300 rounded-lg justify-center items-center"
            weekends={[6]}
            style={{
              color: inputError ? "2px solid red" : "none",
              zIndex: 999999999,
            }}
            accentColor="#6374ae"
          />
        </div>
        {/* display this one only mobile  ======= from here ========= */}

        {/* =================  untill here ================ */}

        {/* display this on desktop  =============== from here ============== */}

        <div className="hidden lg:flex">
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
            className="text-center "
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

        {/* untill ===== here ================= */}
      </div>
    </Suspense>
  );
}
