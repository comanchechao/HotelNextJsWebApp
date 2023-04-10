import { DatePicker } from "zaman";
import { Suspense, useEffect } from "react";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { roomActions } from "../store/room";

dayjs.extend(jalaliday);
dayjs.calendar("jalali");
export default function Calendar() {
  let checkoutDate = useSelector((state) => state.room.enterDate);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    console.log(checkoutDate);
  }, [checkoutDate]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex z-40 flex-col items-end justify-center">
        <h2>{t("inDate")}</h2>
        <DatePicker
          id="datePicker"
          onChange={(e) => {
            dispatch(roomActions.setCheckout(dayjs(e.value)));
            console.log(e.value);
          }}
          round="x2"
          className="z-50 text-center"
          inputClass="w-60   font-mainFont text-center h-10 my-0 bg-white border border-gray-300 rounded-lg justify-center items-center"
          range
        />
      </div>
    </Suspense>
  );
}
