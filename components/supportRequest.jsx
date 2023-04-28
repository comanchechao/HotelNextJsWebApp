import TicketModal from "./ticketModal";
import { useTranslation } from "next-i18next";

export default function SupportRequest() {
  const { t, i18n } = useTranslation("");

  return (
    <div className="w-full h-carousel flex items-center justify-center flex-col bg-white px-14 text-center">
      <h2 className="border-b-2 border-mainPurple pb-2 rounded-sm">
        {t("supporth2")}{" "}
      </h2>
      <p className="text-gray-500 my-6">{t("supportp")} </p>

      <TicketModal />
    </div>
  );
}
