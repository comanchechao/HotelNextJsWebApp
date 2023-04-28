import { useEffect, useState } from "react";
import {
  Modal,
  TextInput,
  useMantineTheme,
  NativeSelect,
  Notification,
  Loader,
} from "@mantine/core";
import { SignIn, CaretDown, User, SignOut } from "phosphor-react";
import { supabase } from "../lib/supabaseClient";
import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import ForgotPasswordModal from "./forgotPasswordModal";
import { userActions } from "../store/user/user";
import Link from "next/link";
export default function LoginModal() {
  const data = [
    { value: "+98", label: "🇮🇷 +98" },
    { value: "+90", label: "🇹🇷 +90" },
  ];
  const theme = useMantineTheme();
  const { t, i18n } = useTranslation("common");

  const lng = i18n.language;

  const [alignLeft, setAlignLeft] = useState(false);
  async function changeState() {
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
  const [opened, setOpened] = useState(false);
  const [change, setChange] = useState(false);
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogged, SetisLogged] = useState("");

  // GET USER
  useEffect(() => {
    changeState();
    getSetUser();
  }, []);
  async function getSetUser() {
    const { data: user, error } = await supabase.auth.getSession();

    if (error) throw error;

    if (user.session) {
      SetisLogged(true);
      const { data: userRole, error6 } = await supabase
        .from("profiles")
        .select()
        .eq("id", user.session.user.id);

      if (userRole.length) {
        if (userRole[0].role === "admin") {
          dispatch(userActions.isManagerFunction(true));
        } else if (userRole[0].role === "colleage") {
          dispatch(userActions.isManagerFunction(true));
        }
      } else {
      }
    }
  }
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || event === "USER_DELETED") {
        // delete cookies on sign out
        const expires = new Date(0).toUTCString();
        document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure httpOnly; `;
        document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure httpOnly; `;
      } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        const maxAge = 3600;
        document.cookie = `my-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure httpOnly;`;
        document.cookie = `my-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure; httpOnly;`;
      }
    });
  }, []);
  const dispatch = useDispatch();

  // SIGN UP
  const handleSignUp = async (e) => {
    e.preventDefault();

    setLoading(true);
    const { user, error } = await supabase.auth.signUp({
      email: emailSignUp,
      password: passwordSignUp,
      options: {
        data: {
          email: emailSignUp,
        },
      },
    });
    if (!error) {
      setLoading(false);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);

        setOpened(false);
      }, 2000);
    } else {
      throw error;
    }
    if (user) {
      createProfile(user);
    }
  };

  async function createProfile(user) {
    const { data, error } = await supabase.from("profiles").insert({
      id: user.id,
      email: user.email,
    });
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        const newPassword = prompt(
          "What would you like your new password to be?"
        );
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (data) alert("Password updated successfully!");
        if (error) alert("There was an error updating your password.");
      }
    });
  }, []);

  // LOGIN
  const handleLogin = async (e, req, res) => {
    e.preventDefault();

    setLoading(true);
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    else {
      if (user.session) {
        SetisLogged(true);
        const { data: userRole, error6 } = await supabase
          .from("profiles")
          .select()
          .eq("id", user.session.user.id);
        if (userRole[0].role === "admin") {
          dispatch(userActions.isManagerFunction(true));
        } else if (userRole[0].role === "colleage") {
          dispatch(userActions.isManagerFunction(true));
        }
      }
      setLoading(false);
      SetisLogged(true);
      // getSetUser();
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
        setOpened(false);
      }, 1000);
    }
  };
  // SignOut
  const handleSignOut = async (e) => {
    try {
      let { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };
  const select = (
    <NativeSelect
      data={data}
      styles={{
        wrapper: {
          height: "100%",
          width: "100%",

          fontFamily: "Roboto",
          fontWeight: 500,
        },
        input: {
          height: "100%",

          fontFamily: "Roboto",
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
        exitTransitionDuration={600}
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
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div>
                      {alert ? (
                        <Notification
                          transition="fade"
                          transitionDuration={600}
                          transitionTimingFunction="ease"
                          color="blue"
                          withCloseButton
                          variant="outline"
                        >
                          <h2 className="text-xl text-center">
                            {t("emailConfirm")}
                          </h2>
                        </Notification>
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <h2 className="text-3xl  "> {t("signUp")} </h2>
                      <h4>{t("enterSignUp")}</h4>
                    </div>
                    <TextInput
                      className="text-2xl   text-right flex flex-col items-end "
                      type="email"
                      placeholder={t("email")}
                      label={t("email")}
                      size="md"
                      withAsterisk
                      value={emailSignUp}
                      onChange={(e) => setEmailSignUp(e.target.value)}
                    />
                    <TextInput
                      className="text-2xl   text-right flex flex-col items-end "
                      type="password"
                      placeholder={t("password")}
                      label={t("password")}
                      size="md"
                      withAsterisk
                      value={passwordSignUp}
                      onChange={(e) => setPasswordSignUp(e.target.value)}
                    />
                    <button
                      onClick={(e) => {
                        handleSignUp(e);
                      }}
                      className="w-full rounded-md transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-xl font-mainFont"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center ">
                          <Loader color="yellow" />
                        </div>
                      ) : (
                        <h3>{t("confirm")}</h3>
                      )}
                    </button>
                    <button
                      onClick={() => setRegister(false)}
                      className="w-full rounded-md transition ease-in duration-300  hover:border-mainPurple border-r-8 border-mainBlue py-2 bg-transparent text-gray-500 hover:text-gray-900 text-md font-mainFont"
                    >
                      {t("logInEmail")}
                    </button>
                    <button
                      onClick={() => setChange(false)}
                      className="w-full rounded-md transition text-gray-500 hover:text-gray-900 ease-in duration-300  hover:border-mainPurple border border-dashed border-mainBlue py-2 bg-transparent   text-md font-mainFont"
                    >
                      {t("logInPhone")}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-5">
                    <div>
                      {alert ? (
                        <Notification
                          transition="fade"
                          transitionDuration={600}
                          transitionTimingFunction="ease"
                          color="green"
                          withCloseButton
                          variant="outline"
                        >
                          <h2 className="text-2xl text-center">
                            {t("loginSuccess")}
                          </h2>
                        </Notification>
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <h2 className="text-3xl  "> {t("log")}</h2>
                      <h4> {t("enterEmail")}</h4>
                    </div>
                    <form onSubmit={handleLogin}>
                      <TextInput
                        className={`${
                          alignLeft === true
                            ? "text-2xl   text-right flex flex-col items-end"
                            : "text-2xl   text-right flex flex-col items-start"
                        }`}
                        type="email"
                        placeholder={t("email")}
                        label={t("email")}
                        size="md"
                        withAsterisk
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <TextInput
                        className={`${
                          alignLeft === true
                            ? "text-2xl   text-right flex flex-col items-end"
                            : "text-2xl   text-right flex flex-col items-start"
                        }`}
                        type="password"
                        placeholder={t("password")}
                        label={t("password")}
                        size="md"
                        withAsterisk
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      {loading ? (
                        <div className="flex items-center justify-center my-4">
                          <Loader color="yellow" />
                        </div>
                      ) : (
                        <button className="w-full rounded-md mt-4 transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-xl font-mainFont">
                          {t("confirm")}
                        </button>
                      )}
                    </form>

                    <div className="flex items-center h-9 justify-between space-x-3 w-full">
                      <button
                        onClick={() => setRegister(true)}
                        className="w-full h-full rounded-md transition text-gray-500 hover:text-gray-900 ease-in duration-300  hover:border-mainPurple border-r-8 border-mainBlue py-2 bg-transparent   text-md font-mainFont"
                      >
                        <p className=" w-36 mx-2"> {t("signUpEmail")}</p>
                      </button>
                      <ForgotPasswordModal />
                    </div>
                    <button
                      onClick={() => setChange(false)}
                      className="w-full rounded-md transition text-gray-500 hover:text-gray-900 ease-in duration-300  hover:border-mainPurple border border-dashed border-mainBlue py-2 bg-transparent   text-md font-mainFont"
                    >
                      {t("logInPhone")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className=" h-rem26 text-center flex flex-col items-center justify-center space-y-5">
              <div className="flex flex-col items-center justify-center space-y-3">
                <h2 className="text-3xl  "> {t("logIn")} </h2>
                <h4>{t("enterPhone")}</h4>
              </div>
              <TextInput
                className={`${
                  alignLeft === true
                    ? "text-2xl mx-6 text-right flex flex-col items-end"
                    : "text-2xl mx-6 text-left flex flex-col items-start"
                }`}
                type="number"
                label={t("phone")}
                rightSection={select}
                rightSectionWidth={85}
                size="lg"
                withAsterisk
              />
              <button className="w-full rounded-md transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-xl font-mainFont">
                {t("signUp")}
              </button>
              <button
                onClick={() => setChange(true) & setRegister(false)}
                className="w-full rounded-md transition text-gray-500 hover:text-gray-900 ease-in duration-300  hover:border-mainPurple border border-dashed border-mainBlue py-2 bg-transparent   text-md font-mainFont"
              >
                {t("logInEmail")}
              </button>
            </div>
          )}
        </div>
      </Modal>
      <div>
        {isLogged ? (
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn font-normal text-sm  bg-transparent rounded-sm px-1 m-1 border-none  text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
            >
              <CaretDown className="mx-2" size={20} weight="bold" />
              <User size={30} />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu  w-52  text-right bg-white rounded-sm  "
            >
              <li className="text-gray-900 ">
                <Link
                  href="/userProfile"
                  className={`${
                    alignLeft === true
                      ? "w-full font-bold text-center text-sm flex items-center justify-end"
                      : "w-full font-bold text-center text-sm flex flex-row-reverse items-center justify-end"
                  }`}
                >
                  {t("accountInfo")}

                  <User size={20} />
                </Link>
              </li>
              <li className="text-gray-900">
                <button
                  onClick={handleSignOut}
                  className={`${
                    alignLeft === true
                      ? "w-full font-mainFont text-center text-sm flex items-center justify-end"
                      : "w-full font-mainFont text-center text-sm flex flex-row-reverse items-center justify-end"
                  }`}
                >
                  {t("logOut")}
                  <SignOut size={20} />
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <button
            className="border-r-8 border-transparent hover:border-r-mainBlue   flex   p-2  items-center cursor-pointer text-darkPurple transition ease-in hover:bg-mainPurple hover:text-white duration-200"
            onClick={() => setOpened(true)}
          >
            <SignIn className="mx-2" size={30} weight="light" />
            <h4 className="hidden lg:flex"> {t("logIn")}</h4>
          </button>
        )}
      </div>
    </div>
  );
}
