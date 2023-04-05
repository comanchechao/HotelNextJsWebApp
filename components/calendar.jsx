import { DatePicker } from "zaman";
import { Suspense } from "react";
import dayjs from "dayjs";

export default function Calendar() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DatePicker
        onChange={(e) => {}}
        round="x2"
        className="text-center"
        inputClass="w-72 font-mainFont text-left h-10 my-0 bg-white border rounded-lg justify-center items-center"
        from={dayjs()}
        direction="ltr"
        range
      />
    </Suspense>
  );
}
