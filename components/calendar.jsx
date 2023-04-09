import { DatePicker } from "zaman";
import { Suspense, useEffect } from "react";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { reservationActions } from "../store/reservation";

dayjs.extend(jalaliday);
dayjs.calendar("jalali");
export default function Calendar() {
  let enterDate = useSelector((state) => state.reserve.enterDate);
  let exitDate = useSelector((state) => state.reserve.exitDate);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    console.log(enterDate);
    console.log(exitDate);
  }, [enterDate]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-end justify-center">
        <h2>{t("inDate")}</h2>
        <DatePicker
          onChange={(e) => {
            dispatch(
              reservationActions.setEnterting(
                dayjs(e.from).locale("fa").format("DD MMMM YYYY")
              )
            );
            dispatch(
              reservationActions.setExiting(
                dayjs(e.to).locale("fa").format("DD MMMM YYYY")
              )
            );
            console.log(e.from);
            console.log(e.to);
          }}
          round="x2"
          className="text-center"
          inputClass="w-60   font-mainFont text-center h-10 my-0 bg-white border border-gray-300 rounded-lg justify-center items-center"
          from={dayjs()}
          placeholder="fjasdklf"
          direction="ltr"
          range
        />
      </div>
    </Suspense>
  );
}
