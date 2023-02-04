import { Modal, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ForgotPasswordModal() {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const [recoveryEmail, setRecoveryEmail] = useState("");
  // password recovery

  const passwordRecovery = async () => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        recoveryEmail
      );
      if (error) throw error;
      alert("ایمیل خود را چک کنید.");
    } catch (error) {}
  };

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
        <h1 className="text-2xl my-6 text-center  ">
          {" "}
          ایمیل خودتون رو وارد کنید تا لینک بازیابی رمز عبور رو براتون ارسال
          کنیم{" "}
        </h1>

        <form className="flex flex-col mt-2">
          <input
            id="email"
            className=" bg-white border-2 border-mainPurple text-white my-2 text-right p-2 rounded-md"
            type="email"
            placeholder="آدرس ایمیل"
            value={recoveryEmail}
            onChange={(e) => setRecoveryEmail(e.target.value)}
          />
          <button
            onClick={passwordRecovery}
            className="px-28 rounded-md transition ease-in duration-300  hover:border-mainPurple border-r-8 border-mainBlue py-4 hover:bg-mainBlue bg-mainPurple text-white text-md font-mainFont"
            aria-live="polite"
          >
            <span>بازیابی رمز عبور</span>
          </button>
        </form>
      </Modal>
      <button
        onClick={() => setOpened(true)}
        className="px-28 rounded-md transition ease-in duration-300  hover:border-mainPurple border-r-8 border-mainBlue py-2 bg-transparent text-gray-500 hover:text-gray-900 text-md font-mainFont"
      >
        بازیابی رمز عبور
      </button>
    </div>
  );
}
