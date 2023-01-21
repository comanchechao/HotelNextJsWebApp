import { useState } from "react";
import { Modal, Button, Group, Select } from "@mantine/core";
import {
  EditablePreview,
  IconButton,
  Input,
  useEditableControls,
  ButtonGroup,
  Editable,
  Flex,
  EditableInput,
} from "@chakra-ui/react";
import { IconEdit, IconCheck, IconX } from "@tabler/icons";
export default function RoomModal(props) {
  let room = props.Room;
  const [opened, setOpened] = useState(false);

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();
    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<IconCheck />} {...getSubmitButtonProps()} />
        <IconButton icon={<IconX />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<IconEdit />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  return (
    <div>
      <Modal
        className=""
        size="lg"
        color="gray"
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <div className="flex w-full flex-col">
          <div className="flex items-center border-b border-gray-800  w-full justify-end text-right font-bold text-md lg:text-lg h-14">
            <h1 className="">ویرایش اتاق</h1>
          </div>
          <div className="flex w-full p-5  justify-center items-center space-y-4 flex-col">
            <div className="flex">
              <Editable
                textAlign="center"
                defaultValue={room.title}
                fontSize="2xl"
                isPreviewFocusable={false}
              >
                <EditablePreview />
                {/* Here is the custom input */}
                <Input as={EditableInput} />
                <EditableControls />
              </Editable>
            </div>
            <div className="flex justify-center w-full">
              <Select
                searchable
                className="text-right"
                label="وعده غذایی اتاق"
                placeholder="انتخاب وعده"
                data={[
                  { value: "صبحانه", label: "صبحانه" },
                  { value: "صبحانه و نهار", label: "صبحانه و نهار" },
                  { value: "بدون وعده غذایی", label: "بدون وعده غذایی" },
                  { value: "شام", label: "شام" },
                ]}
              />
            </div>
            <Editable
              textAlign="center"
              defaultValue={room.price}
              fontSize="2xl"
              isPreviewFocusable={false}
            >
              <EditablePreview />
              {/* Here is the custom input */}
              <Input as={EditableInput} />
              <EditableControls />
            </Editable>
          </div>
          <div className="flex h-10">
            <button
              onClick={() => {
                setOpened(false);
              }}
              className="text-center flex justify-center items-center w-52 py-4 bg-darkPurple transition ease-in duration-300 font-mainFont rounded-full text-white hover:bg-mainBlue"
            >
              تایید
            </button>
          </div>
        </div>
      </Modal>

      <button
        onClick={() => {
          setOpened(true);
        }}
        className="py-3  hover:text-white border-mainPurple border-2 border-dashed ease-in duration-300 hover:bg-darkPurple transition rounded-full  text-mainPurple my-5 px-12 bg-transparent  shadow-2xl"
      >
        <p>ویرایش</p>
      </button>
    </div>
  );
}
