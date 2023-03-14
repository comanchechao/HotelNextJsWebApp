import { Table } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
export default function PaymentHistory() {
  const { t, i18n } = useTranslation("");

  const lng = i18n.language;

  const [alignLeft, setAlignLeft] = useState(false);
  async function changeAlignment() {
    console.log(lng);
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
  useEffect(() => {
    changeAlignment();
  }, []);
  const elements = [
    {
      explanation: "lorem ipsum jeaad",
      price: "22,550,000",
      cardNum: "6315224588554488",
      date: "2023/05/01",
    },
    {
      explanation: "lorem ipsum jeaad",
      price: "22,550,000",
      cardNum: "6315224588554488",
      date: "2023/05/01",
    },
    {
      explanation: "lorem ipsum jeaad",
      price: "22,550,000",
      cardNum: "6315224588554488",
      date: "2023/05/01",
    },
    {
      explanation: "lorem ipsum jeaad",
      price: "22,550,000",
      cardNum: "6315224588554488",
      date: "2023/05/01",
    },
    {
      explanation: "lorem ipsum jeaad",
      price: "22,550,000",
      cardNum: "6315224588554488",
      date: "2023/05/01",
    },
  ];
  const rows = elements.map((element) => (
    <tr key={element.date}>
      <td>{element.explanation}</td>
      <td>{element.cardNum}</td>
      <td>{element.price}</td>
      <td>{element.date}</td>
    </tr>
  ));
  return (
    <div className="w-full   h-carousel flex items-center justify-center flex-col space-y-6 bg-white px-14 py-10 text-center">
      <h1> {t("finances")} </h1>
      <div className="h-full overflow-y-scroll w-full border border-mainPurple rounded-md flex items-start p-10 justify-center space-x-16">
        <Table striped horizontalSpacing="xl" verticalSpacing="md">
          <thead>
            <tr>
              <th>توضیحات</th>
              <th>شماره کارت بانکی</th>
              <th>مبلغ(ریال)</th>
              <th>تاریخ و ساعت</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>{" "}
        </Table>
      </div>
    </div>
  );
}
