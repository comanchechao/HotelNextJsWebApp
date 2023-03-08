import { TextInput, Loader } from "@mantine/core";
import { Money, User } from "phosphor-react";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ProfileInfo({ user }) {
  const [edit, setEdit] = useState(false);

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [idCard, setIdCard] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [shaba, setShaba] = useState("");
  const [card, setCard] = useState("");

  useEffect(() => {
    getSetUser();
  }, []);
  async function getSetUser() {
    setLoading(true);

    if (user) {
      let userData = await supabase
        .from("profiles")
        .select()
        .eq("id", user.user.id);

      console.log(userData);
      if (!userData) {
        setEmail(userData.data[0].email);
        setFullName(userData.data[0].fullName);
        setPhone(userData.data[0].phone);
        setCard(userData.data[0].card);
        setIdCard(userData.data[0].idCard);
        setShaba(userData.data[0].shaba);
      }
    } else {
      console.log("Logged out");
    }
    setLoading(false);
  }

  async function editUser() {
    setLoading(true);

    if (user) {
      const updates = {
        id: user.user.id,
        email: email,
      };
      await supabase.from("profiles").update(updates);
      setLoading(false);
      setEdit(false);
    } else {
      console.log("User not found");
    }
  }
  return (
    <div className="w-full h-full lg:h-carousel p-3 flex space-y-8 flex-col">
      <div className="w-full h-auto flex-col flex items-end justify-end bg-white drop-shadow-md rounded-lg">
        <h2 className="flex items-center text-xl m-3 ">
          اطلاعات حساب کاربری
          <User className="mx-2 text-mainPurple" size={25} />
        </h2>
        <div className="w-full h-auto lg:h-36 border-t border-darkPurple border-dashed p-6 justify-center flex items-center">
          {edit ? (
            <div className="flex   flex-col justify-center items-center lg:items-end lg:justify-end space-y-7 my-3 text-right">
              <form
                className="flex h-full lg:flex-row flex-col items-center lg:space-y-0 space-y-4  lg:items-center justify-center lg:justify-between   lg:space-x-4"
                onSubmit={editUser}
              >
                {" "}
                <div className="flex flex-col items-center justify-around space-y-2">
                  <h2 className="text-sm text-gray-500">شماره تلفن</h2>
                  <TextInput
                    className="text-2xl   text-right flex flex-col items-end "
                    type="number"
                    placeholder="شماره تلفن"
                    size="xs"
                    withAsterisk
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <h2 className="text-sm text-gray-500">کد ملی</h2>
                  <TextInput
                    className="text-2xl   text-right flex flex-col items-end "
                    type="text"
                    placeholder="کد ملی"
                    size="xs"
                    withAsterisk
                    onChange={(e) => setIdCard(e.target.value)}
                  />
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <h2 className="text-sm text-gray-500">ایمیل</h2>
                  <TextInput
                    className="text-2xl   text-right flex flex-col items-end "
                    type="email"
                    placeholder="ایمیل"
                    size="xs"
                    withAsterisk
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <h2 className="text-sm text-gray-500">نام و نام خانوادگی</h2>
                  <TextInput
                    className="text-2xl   text-right flex flex-col items-end "
                    type="text"
                    placeholder="نام و نام خانوادگی"
                    size="xs"
                    withAsterisk
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </form>
            </div>
          ) : (
            <div className="flex   flex-col justify-center items-center lg:items-end lg:justify-end space-y-7 my-3 text-right">
              <div className="flex  lg:flex-row flex-col items-center space-y-4 lg:space-y-0 lg:items-end justify-center lg:justify-end lg:space-x-4">
                <h2 className="text-md text-gray-800 border-b-2 border-mainPurple pb-1">
                  {phone}
                </h2>
                <h2 className="text-md text-gray-500">شماره تلفن</h2>
                <h2 className="text-md text-gray-800 border-b-2 border-mainPurple pb-1">
                  {email}
                </h2>
                <h2 className="text-md text-gray-500">ایمیل</h2>
              </div>
              <div className="flex lg:flex-row flex-col items-center space-y-4 lg:space-y-0 lg:items-end justify-center lg:justify-end lg:space-x-4">
                <h2 className="text-md text-gray-800 border-b-2 border-mainPurple pb-1">
                  {idCard}
                </h2>
                <h2 className="text-md text-gray-500">کد ملی</h2>
                <h2 className="text-md text-gray-800 border-b-2 border-mainPurple pb-1">
                  {fullName}{" "}
                </h2>
                <h2 className="text-md text-gray-500">نام و نام خانوادگی</h2>
              </div>
            </div>
          )}
        </div>

        {/* <button
          onClick={() => setEdit(true)}
          className="px-10 rounded-md transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-sm m-3 self-start font-mainFont"
        >
          {loading ? (
            <Loader size="sm" color="yellow" variant="bars" />
          ) : (
            <div>
              {edit ? <p onClick={editUser}>تایید</p> : <p>ویرایش اطلاعات</p>}
            </div>
          )}
        </button> */}
      </div>
      <div className="w-full h-auto flex-col flex items-end justify-end bg-white drop-shadow-md rounded-lg">
        <h2 className="flex items-center text-xl m-3 ">
          اطلاعات حساب بانکی
          <Money className="mx-2 text-mainPurple" size={25} />
        </h2>
        {edit ? (
          <div className="w-full h-36 border-t border-darkPurple border-dashed p-6 justify-center flex items-center">
            <div className="flex   flex-col justify-center items-center lg:items-end lg:justify-end space-y-7 my-3 text-right">
              <form
                onSubmit={editUser}
                className="flex lg:flex-row flex-col items-center justify-center lg:items-end lg:justify-end space-x-4"
              >
                <TextInput
                  className="text-2xl   text-right flex flex-col items-end "
                  type="text"
                  placeholder="شماره شبا"
                  size="xs"
                  withAsterisk
                  onChange={(e) => setShaba(e.target.value)}
                />
                <h2 className="text-md text-gray-500">شماره شبا</h2>
                <TextInput
                  className="text-2xl   text-right flex flex-col items-end "
                  type="text"
                  placeholder="شماره حساب"
                  size="xs"
                  withAsterisk
                  onChange={(e) => setCard(e.target.value)}
                />
                <h2 className="text-md text-gray-500">شماره حساب</h2>
              </form>
            </div>
          </div>
        ) : (
          <div className="w-full h-36 border-t border-darkPurple border-dashed p-6 justify-center flex items-center">
            <div className="flex flex-col justify-center items-center lg:items-end lg:justify-end space-y-7 my-3 text-right">
              <div className="flex lg:flex-row flex-col items-center justify-center lg:items-end lg:justify-end space-x-4">
                <h2 className="text-md text-gray-800 border-b-2 border-mainPurple pb-1">
                  {shaba}
                </h2>
                <h2 className="text-md text-gray-500">شماره شبا</h2>
                <h2 className="text-md text-gray-800 border-b-2 border-mainPurple pb-1">
                  {card}
                </h2>
                <h2 className="text-md text-gray-500">شماره حساب</h2>
              </div>
            </div>
          </div>
        )}
      </div>
      {loading ? (
        <button className="px-10 rounded-md transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-sm m-3 self-start font-mainFont">
          <Loader size="sm" color="yellow" variant="bars" />
        </button>
      ) : edit ? (
        <button
          onClick={editUser}
          className="px-10 rounded-md transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-sm m-3 self-start font-mainFont"
        >
          تایید
        </button>
      ) : (
        <button
          onClick={() => setEdit(true)}
          className="px-10 rounded-md transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-sm m-3 self-start font-mainFont"
        >
          ویرایش اطلاعات
        </button>
      )}
    </div>
  );
}
