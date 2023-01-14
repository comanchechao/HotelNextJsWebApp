import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-screen h-rem26 bg-white drop-shadow-lg px-44 flex items-center">
      <div className="w-1/2 h-3/5 bg-red-400"></div>
      <div className="w-1/2 h-3/5      flex items-start py-6 justify-around">
        <div className="flex items-end flex-col space-y-1">
          <h3 className="font-bold">هتل</h3>
          <Link href="/">درباره ما</Link> <Link href="/">تماس با ما</Link>
          <Link href="/">چرا هتل</Link>
        </div>
        <div className="flex  items-end flex-col space-y-1">
          <h3 className="font-bold">تماس با مشتریان</h3>
          <Link href="/">مرکز پشتیبانی آنلاین</Link>
          <Link href="/">راهنمای خرید</Link>
          <Link href="/">راهنمای استرداد</Link>
          <Link href="/">قوانین و مقررات</Link>
          <Link href="/">پرسش و پاسخ</Link>
        </div>
        <div className="flex items-end flex-col space-y-1">
          <h3 className="font-bold">اطلاعات تکمیلی</h3>
          <Link href="/">باشگاه همسفران</Link>
          <Link href="/">فروش سازمانی</Link>
          <Link href="/">همکاری با آزانس ها</Link>
          <Link href="/">فرصت های شغلی</Link>
        </div>
      </div>
    </div>
  );
}
