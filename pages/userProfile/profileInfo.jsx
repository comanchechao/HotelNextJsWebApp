import { TextInput } from "@mantine/core";
import { Money, User } from "phosphor-react";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ProfileInfo() {
  const [edit, setEdit] = useState(false);

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [idCard, setIdCard] = useState("");

  const [phone, setPhone] = useState("");
  const [shaba, setShaba] = useState("");
  const [card, setCard] = useState("");

  useEffect(() => {
    getSetUser();
  });
  async function getSetUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      let userData = await supabase.from("profiles").select().eq("id", user.id);
      setEmail(userData.data[0].email);
      setFullName(userData.data[0].fullName);
      setPhone(userData.data[0].phone);
      setCard(userData.data[0].card);
      setIdCard(userData.data[0].idCard);
      setShaba(userData.data[0].shaba);

      console.log(userData);
    } else {
      console.log("Logged out");
    }
  }

  async function editUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const updates = {
        id: user.id,
        email: user.email,
      };
      await supabase.from("profiles").upsert(updates);
      console.log(email);
      getSetUser();
    } else {
    }
  }
  return (
    <div className="w-full h-full p-3 flex space-y-8 flex-col">
      <div className="w-full h-auto flex-col flex items-end justify-end bg-white drop-shadow-md rounded-lg">
        <h2 className="flex items-center text-xl m-3 ">
          اطلاعات حساب کاربری
          <User className="mx-2 text-mainPurple" size={25} />
        </h2>
        <div className="w-full h-auto lg:h-36 border-t border-darkPurple border-dashed p-6 justify-center flex items-center">
          {edit ? (
            <div className="flex bg-goldie flex-col justify-center items-center lg:items-end lg:justify-end space-y-7 my-3 text-right">
              <div className="flex  lg:flex-row flex-col items-center space-y-4 lg:space-y-0 lg:items-end justify-center lg:justify-end lg:space-x-4">
                <h2 className="text-lg text-gray-800 border-b-2 border-mainPurple pb-1">
                  {phone}
                </h2>
                <h2 className="text-lg text-gray-500">شماره تلفن</h2>
                <TextInput
                  className="text-2xl   text-right flex flex-col items-end "
                  type="email"
                  placeholder="ایمیل"
                  label="ایمیل"
                  size="md"
                  withAsterisk
                  onChange={(e) => setEmail(e.target.value)}
                />
                <h2 className="text-lg text-gray-500">ایمیل</h2>
              </div>
              <div className="flex lg:flex-row flex-col items-center space-y-4 lg:space-y-0 lg:items-end justify-center lg:justify-end lg:space-x-4">
                <h2 className="text-lg text-gray-800 border-b-2 border-mainPurple pb-1">
                  {idCard}
                </h2>
                <h2 className="text-lg text-gray-500">کد ملی</h2>
                <h2 className="text-lg text-gray-800 border-b-2 border-mainPurple pb-1">
                  {fullName}{" "}
                </h2>
                <h2 className="text-lg text-gray-500">نام و نام خانوادگی</h2>
              </div>
              <button
                onClick={editUser}
                className="px-10 rounded-md transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-sm m-3 self-start font-mainFont"
              >
                تایید
              </button>
            </div>
          ) : (
            <div className="flex bg-goldie flex-col justify-center items-center lg:items-end lg:justify-end space-y-7 my-3 text-right">
              <div className="flex  lg:flex-row flex-col items-center space-y-4 lg:space-y-0 lg:items-end justify-center lg:justify-end lg:space-x-4">
                <h2 className="text-lg text-gray-800 border-b-2 border-mainPurple pb-1">
                  {phone}
                </h2>
                <h2 className="text-lg text-gray-500">شماره تلفن</h2>
                <h2 className="text-lg text-gray-800 border-b-2 border-mainPurple pb-1">
                  {email}
                </h2>
                <h2 className="text-lg text-gray-500">ایمیل</h2>
              </div>
              <div className="flex lg:flex-row flex-col items-center space-y-4 lg:space-y-0 lg:items-end justify-center lg:justify-end lg:space-x-4">
                <h2 className="text-lg text-gray-800 border-b-2 border-mainPurple pb-1">
                  {idCard}
                </h2>
                <h2 className="text-lg text-gray-500">کد ملی</h2>
                <h2 className="text-lg text-gray-800 border-b-2 border-mainPurple pb-1">
                  {fullName}{" "}
                </h2>
                <h2 className="text-lg text-gray-500">نام و نام خانوادگی</h2>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => setEdit(!edit)}
          className="px-10 rounded-md transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-sm m-3 self-start font-mainFont"
        >
          ویرایش اطلاعات
        </button>
      </div>
      <div className="w-full h-auto flex-col flex items-end justify-end bg-white drop-shadow-md rounded-lg">
        <h2 className="flex items-center text-xl m-3 ">
          اطلاعات حساب بانکی
          <Money className="mx-2 text-mainPurple" size={25} />
        </h2>
        <div className="w-full h-36 border-t border-darkPurple border-dashed p-6 justify-center flex items-center">
          <div className="flex flex-col justify-center items-center lg:items-end lg:justify-end space-y-7 my-3 text-right">
            <div className="flex lg:flex-row flex-col items-center justify-center lg:items-end lg:justify-end space-x-4">
              <h2 className="text-lg text-gray-800 border-b-2 border-mainPurple pb-1">
                {shaba}
              </h2>
              <h2 className="text-lg text-gray-500">شماره شبا</h2>
              <h2 className="text-lg text-gray-800 border-b-2 border-mainPurple pb-1">
                {card}
              </h2>
              <h2 className="text-lg text-gray-500">شماره حساب</h2>
            </div>
          </div>
        </div>
        <button className="px-10 rounded-md transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-sm m-3 self-start font-mainFont">
          ویرایش اطلاعات
        </button>
      </div>
    </div>
  );
}
