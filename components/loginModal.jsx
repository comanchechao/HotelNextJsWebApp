import { useState } from "react";
import {
  Modal,
  TextInput,
  useMantineTheme,
  NativeSelect,
  Alert,
  Loader,
} from "@mantine/core";
import { SignIn } from "phosphor-react";
import { supabase } from "../lib/supabaseClient";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user/user";
import ForgotPasswordModal from "./forgotPasswordModal";

export default function LoginModal() {
  const data = [
    { value: "+98", label: "🇮🇷 +98" },
    { value: "+90", label: "🇹🇷 +90" },
  ];
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [change, setChange] = useState(false);
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [loading, setLoading] = useState(false);

  // GET USER
  async function getSetUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      dispatch(userActions.setUser(user));
      console.log("logged");
    } else {
      console.log("Logged out");
    }
  }
  const dispatch = useDispatch();

  // SIGN UP
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: emailSignUp,
        password: passwordSignUp,
      });
      if (error) throw error;
    } catch (error) {
      // alert(error.error_description || error.message);
    } finally {
      setLoading(false);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);

        setOpened(false);
      }, 2000);
    }
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    else {
      console.log("user");
      setLoading(false);

      getSetUser();
      setTimeout(() => {
        setAlert(true);
      }, 2000);
      setTimeout(() => {
        setOpened(false);
      }, 5000);
    }
  };

  const select = (
    <NativeSelect
      data={data}
      styles={{
        input: {
          height: "1.2cm",
          fontFamily: "IranSans",
          fontWeight: 500,
        },
      }}
    />
  );
  return (
    <div>
      <Modal
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[7]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <div className=" flex flex-col items-center px-5">
          {change ? (
            <div className=" w-full h-rem33 flex flex-col items-center justify-around space-y-2">
              <div>
                {register ? (
                  <div className="flex flex-col items-center justify-center space-y-5">
                    <div>
                      {alert ? (
                        <Alert color="green" withCloseButton variant="outline">
                          <h1 className="text-2xl text-center">
                            ورود موفقیت آمیز بود
                          </h1>
                        </Alert>
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <h1 className="text-3xl  "> ورود </h1>
                      <h4>ایمیل و رمز عبور خود را برای ورود وارد کنید</h4>
                    </div>
                    <form onSubmit={handleLogin}>
                      <TextInput
                        className="text-2xl   text-right flex flex-col items-end "
                        type="email"
                        placeholder="ایمیل"
                        label="ایمیل"
                        size="md"
                        withAsterisk
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <TextInput
                        className="text-2xl   text-right flex flex-col items-end "
                        type="password"
                        placeholder="رمز عبور"
                        label="رمز عبور"
                        size="md"
                        withAsterisk
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      {loading ? (
                        <div className="flex items-center justify-center">
                          <Loader color="violet" />
                        </div>
                      ) : (
                        <button className="w-full rounded-md mt-4 transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-xl font-mainFont">
                          تایید
                        </button>
                      )}
                    </form>

                    <div className="flex items-center h-9 justify-between space-x-3 w-full">
                      <button
                        onClick={() => setRegister(false)}
                        className="w-full h-full rounded-md transition text-gray-500 hover:text-gray-900 ease-in duration-300  hover:border-mainPurple border-r-8 border-mainBlue py-2 bg-transparent   text-md font-mainFont"
                      >
                        <p className=" w-36 mx-2">ثبت‌نام حساب کاربری</p>
                      </button>
                      <ForgotPasswordModal />
                    </div>
                    <button
                      onClick={() => setChange(false)}
                      className="w-full rounded-md transition text-gray-500 hover:text-gray-900 ease-in duration-300  hover:border-mainPurple border border-dashed border-mainBlue py-2 bg-transparent   text-md font-mainFont"
                    >
                      ورود با رمز یکبار مصرف
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <h1 className="text-3xl  "> ثبت‌نام </h1>
                      <h4>ایمیل و رمز عبور خود را برای ثبت‌نام وارد کنید</h4>
                    </div>
                    <TextInput
                      className="text-2xl   text-right flex flex-col items-end "
                      type="email"
                      placeholder="ایمیل"
                      label="ایمیل"
                      size="md"
                      withAsterisk
                      value={emailSignUp}
                      onChange={(e) => setEmailSignUp(e.target.value)}
                    />
                    <TextInput
                      className="text-2xl   text-right flex flex-col items-end "
                      type="password"
                      placeholder="رمز عبور"
                      label="رمز عبور"
                      size="md"
                      withAsterisk
                      value={passwordSignUp}
                      onChange={(e) => setPasswordSignUp(e.target.value)}
                    />
                    <button
                      onClick={handleSignUp}
                      className="w-full rounded-md transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-xl font-mainFont"
                    >
                      تایید
                    </button>
                    <button
                      onClick={() => setRegister(true)}
                      className="w-full rounded-md transition ease-in duration-300  hover:border-mainPurple border-r-8 border-mainBlue py-2 bg-transparent text-gray-500 hover:text-gray-900 text-md font-mainFont"
                    >
                      ورود با ایمیل و پسوورد
                    </button>
                    <button
                      onClick={() => setChange(false)}
                      className="w-full rounded-md transition text-gray-500 hover:text-gray-900 ease-in duration-300  hover:border-mainPurple border border-dashed border-mainBlue py-2 bg-transparent   text-md font-mainFont"
                    >
                      ورود با رمز یکبار مصرف
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className=" h-rem26 flex flex-col items-center justify-center space-y-5">
              <div className="flex flex-col items-center justify-center space-y-3">
                <h1 className="text-3xl  "> ورود یا ثبت‌نام </h1>
                <h4>شماره تلفن خود را برای ورود یا ثبت‌نام وارد کنید</h4>
              </div>
              <TextInput
                className="text-2xl mx-6 text-right flex flex-col items-end "
                type="number"
                placeholder="شماره تلفن"
                label="شماره تلفن"
                rightSection={select}
                rightSectionWidth={85}
                size="lg"
                withAsterisk
              />
              <button className="w-full rounded-md transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-xl font-mainFont">
                تایید و دریافت کد
              </button>
              <button
                onClick={() => setChange(true)}
                className="w-full rounded-md transition text-gray-500 hover:text-gray-900 ease-in duration-300  hover:border-mainPurple border border-dashed border-mainBlue py-2 bg-transparent   text-md font-mainFont"
              >
                ورود با ایمیل و کلمه ی عبور
              </button>
            </div>
          )}
        </div>
      </Modal>
      <button
        className=" flex rounded-sm  items-center justify-center cursor-pointer p-2 text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
        onClick={() => setOpened(true)}
      >
        <SignIn className="mx-2" size={30} weight="light" />
        <h4 className="hidden lg:flex"> ورود یا ثبت‌نام </h4>
      </button>
    </div>
  );
}
