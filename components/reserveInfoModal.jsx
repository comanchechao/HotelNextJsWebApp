import { Modal } from "@mantine/core";
import { useState } from "react";
import { Popover, TextInput } from "@mantine/core";
import { PlusCircle, MinusCircle } from "phosphor-react";
import { DatePicker } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "next-i18next";

export default function ReserveInfoModal() {
  const [opened, setOpened] = useState(false);
  const [entering, setEntering] = useState(null);
  const [exiting, setExiting] = useState(null);
  const { t } = useTranslation("");

  const dispatch = useDispatch();
  let city = useSelector((state) => state.reserve.city);
  let passenger = useSelector((state) => state.reserve.passenger);
  let enterDate = useSelector((state) => state.reserve.enterDate);
  let exitDate = useSelector((state) => state.reserve.exitDate);
  let hotelInfo = useSelector((state) => state.reserve.hotelInfo);
  return (
    <div>
      <Modal
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        opened={opened}
        onClose={() => setOpened(false)}
        centered
      >
        <div className="w-full h-full flex flex-col items-center justify-center">
          <DatePicker
            locale="fa"
            onChange={setEntering}
            defaultValue={enterDate}
            inputFormat="MM/DD/YYYY"
            dropdownPosition="bottom-start"
            className="text-4xl text-center flex flex-col items-end"
            placeholder={t("inDate")}
            label={t("inDate")}
            withAsterisk
            variant="default"
            radius="md"
            size="md"
          />
          <DatePicker
            locale="fa"
            onChange={setExiting}
            defaultValue={exitDate}
            inputFormat="MM/DD/YYYY"
            dropdownPosition="bottom-start"
            className="text-4xl text-center flex flex-col items-end"
            placeholder={t("inDate")}
            label={t("inDate")}
            withAsterisk
            variant="default"
            radius="md"
            size="md"
          />
          <Popover width={300} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <TextInput
                value={passenger}
                defaultValue={passenger}
                className="text-4xl text-right flex flex-col items-end"
                label={t("passenger")}
                placeholder={t("passenger")}
                variant="default"
                radius="md"
                size="md"
                withAsterisk
              />
            </Popover.Target>
            <Popover.Dropdown>
              <div className="w-full h-auto space-y-10 justify-center  flex flex-col items-center">
                <h1 className="text-sm ">{t("firstRoom")}</h1>
                <div className="w-full flex flex-row-reverse justify-between items-center h-full ">
                  <h1 className="text-sm">{t("adult")}</h1>
                  <div className="flex text-blue-800  items-center justify-center space-x-5">
                    <PlusCircle
                      onClick={() => {
                        dispatch(reservationActions.increasePassenger());
                      }}
                      size={27}
                      weight="fill"
                    />
                    <h1 className="text-sm font-bold">{passenger}</h1>
                    <MinusCircle
                      onClick={() => {
                        dispatch(reservationActions.decreamentPassenger());
                      }}
                      size={27}
                      weight="fill"
                    />
                  </div>
                </div>
                <div className="w-full  flex flex-row-reverse justify-between items-center h-full ">
                  <h1 className="text-sm">{t("kid")}</h1>
                  <div className="flex text-blue-800 items-center justify-center space-x-5">
                    <PlusCircle size={27} weight="fill" />
                    <h1 className="text-sm ">1</h1>
                    <MinusCircle size={27} weight="fill" />
                  </div>
                </div>
              </div>
            </Popover.Dropdown>
          </Popover>
          <button
            onClick={() => setOpened(false)}
            className="py-1 px-8 mt-6 border-2 font-mainFont border-r-8 border-mainBlue rounded-md bg-white transition ease-in duration-300 text-gray-700 text-lg"
          >
            تایید
          </button>
        </div>
      </Modal>
      <button
        className="px-10 rounded-md flex items-center transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-sm font-mainFont"
        onClick={() => setOpened(true)}
      >
        <h4>{t("searchRoom")}</h4>
      </button>
    </div>
  );
}
