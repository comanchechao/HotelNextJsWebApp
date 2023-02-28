import TicketModal from "./ticketModal";

export default function SupportRequest() {
  return (
    <div className="w-full h-carousel flex items-center justify-center flex-col bg-white px-14 text-center">
      <h1 className="border-b-2 border-mainPurple pb-2 rounded-sm">
        هنوز درخواست پشتیبانی آنلاین توسط شما ثبت نشده است
      </h1>
      <p className="text-gray-500 my-6">
        اگر سوال یا مشکلی دارید می توانید با ایجاد درخواست پشتیبانی در سریعترین
        زمان ممکن آن را پیگیری کنید
      </p>

      <TicketModal />
    </div>
  );
}
