import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
import contactUsBg from "../../assets/images/contactUsBg.webp";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { supabase } from "../../lib/supabaseClient";

import { useTranslation } from "next-i18next";
import Image from "next/image";
import { IconDotsCircleHorizontal } from "@tabler/icons";
export async function getServerSideProps({ locale }) {
  const { data: websiteInfo } = await supabase.from("websiteInfo").select();
  return {
    props: {
      websiteInfo: websiteInfo,

      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
export default function Rules({ websiteInfo }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const { t } = useTranslation("common");
  useEffect(() => {
    getWebsiteInfo();
  }, []);

  async function getWebsiteInfo() {
    setLoading(true);
    websiteInfo.map((object) => {
      setEmail(object.email);
      setAddress(object.address);
      setPhoneNumber(object.phoneNumber);
      setPostalCode(object.postalCode);
    });
    setLoading(false);
  }
  return (
    <div className="h-full w-screen">
      <Navbar />
      <div className="h-full flex-col flex items-center justify-start w-screen bg-mainWhite">
        <div className="w-screen h-auto  ">
          <Image
            className=" h-rem26 w-full object-cover"
            src={contactUsBg}
            alt="Main Background"
          />
        </div>

        <h1 className="text-3xl border-b-8 mt-9 pb-4 rounded-lg border-mainBlue">
          {t("hotelRules")}
        </h1>
        <div className="h-auto w-full px-3 lg:px-28 py-5   flex flex-col items-center space-y-7">
          <h2 className="text-xl self-end border-b-4 mt-5 pb-2 rounded-lg border-mainBlue">
            قوانین هتل های داخلی
          </h2>
          <div className="h-full w-full bg-white rounded-md p-9 flex flex-col space-y-5 items-end">
            <div className="flex text-sm  text-right items-center">
              <h2 className=" ">
                تغییر تاریخ رزرو مقدور نیست و در این خصوص می بایست رزرو جدید با
                شرایط و مبالغ جدید صورت گیرد
              </h2>
            </div>
            <div className="flex text-sm  text-right items-center">
              <h2 className=" ">
                طبق قوانین اکثر هتلها، افراد بالای 6 سال بزرگسال محسوب میگردند و
                شرایط رزرو برای بزرگسال نسبت به آنان جاری است. مسافر می بایست به
                هنگام خرید برای کودک بالای شش سال این مسئله را مد نظر قراردهد.
                در صورت عدم رعایت این موضوع ممکن است هتل از ورود تعداد افراد بیش
                از ظرفیت رزرو شده ممانعت بعمل آورد. بوتک هیچگونه مسئولیتی در این
                خصوص نخواهد داشت
              </h2>{" "}
            </div>
            <div className="flex text-sm  text-right items-center">
              <h2 className=" ">
                مسافر با انجام رزرو و تایید آن از سوی هتل، مقررات مربوط به هتل
                منتخب و همچنین قوانین مربوط به فسخ رزرو از سوی هتل را به صورت
                همزمان پذیرفته است. به عبارت دیگر مسافر با آگاهی و اطلاع کافی از
                مقررات بوتک و هتل، نسبت به رزرو اقدام نموده است. در قراردادهای
                آنلاین طبق قانون تجارت الکترونیک امضای مسافر به صورت الکترونیک
                انجام میشود
              </h2>{" "}
            </div>
            <div className="flex text-sm   text-right items-center">
              <h2 className=" ">
                امکان کنسلی و مقدار جریمه کنسلی در هر بسته خریداری شده متفاوت
                است و با توجه به شرایط هر بسته به هنگام خرید به اطلاع مسافر
                میرسد
              </h2>
            </div>
            <div className="flex text-sm   text-right items-center">
              <h2 className=" ">
                رزرو هتل فقط شامل رزرو اتاق به تعداد افراد و شبهای درخواست شده
                می باشد و دربرگیرنده مواردی همچون حمل و نقل فرودگاهی، حمل و نقل
                بین شهری، راهنما، تعیین طبقه، پارکینگ و یا اجاره ی خودرو و…
                نیست. همچنین مینی بار و صندوق امانات در اکثر هتل ها شامل هزینه
                اضافه بوده که به عهده مسافر است و درصورت ایجاد خسارت به هتل توسط
                مهمان، کلیه خسارت ها از مسافر دریافت خواهد شد
              </h2>
            </div>
          </div>

          <h2 className="text-xl self-end border-b-4  pb-2 rounded-lg border-mainBlue mt-16">
            قوانین هتل های خارجی
          </h2>
          <div className="h-full w-full bg-white rounded-md p-9 flex flex-col space-y-5 items-end">
            <div className="flex text-sm  text-right items-center">
              <h2 className=" ">
                پس از نهایی شدن رزرو هتل، امکان تغییر در رزرو و یا اصلاح مشخصات
                مسافر وجود ندارد{" "}
              </h2>
            </div>
            <div className="flex text-sm  text-right items-center">
              <h2 className=" ">
                اتاق رزرو شده توسط مسافر غیر قابل انتقال به غیر است. مبنای تحویل
                اتاق به مسافر، همان اطلاعاتی است که در وب‌سایت بوتک و هنگام رزرو
                آن اتاق ثبت شده است. در صورتی که اطلاعات مسافر با اطلاعات
                ثبت‌شده او یکسان نباشد، مسافر پذیرش نخواهد شد
              </h2>{" "}
            </div>
            <div className="flex text-sm  text-right items-center">
              <h2 className=" ">
                در صورتی که مسافر بدون اطلاع قبلی از انجام سفر خودداری کند،
                جریمه استرداد (کنسلی) مطابق قوانین ازپیش‌تعیین‌شده محاسبه می‌شود
              </h2>{" "}
            </div>
            <div className="flex text-sm   text-right items-center">
              <h2 className=" ">
                رعایت مقررات کشور مقصد و اخلاقیات در طول سفر از سوی مسافر
                نشان‌دهنده فرهنگ غنی ایرانی است. عواقب ارتکاب تخلف و تبعات
                به‌همراه داشتن اقلام غیرمجاز در کشور مقصد (دارو، خوراکی و...)
                به‌عهده مسافرخواهد بود
              </h2>
            </div>
            <div className="flex text-sm   text-right items-center">
              <h2 className=" ">
                حفظ اموال و مدارک شخصی در طول سفر و اقامت در هتل کشور مقصد
                به‌عهده مسافر بوده و در صورت مفقود‌شدن و یا صدمه‌دیدن اموال توسط
                مسافر، بوتک مسئولیتی نخواهد داشت
              </h2>
            </div>{" "}
            <div className="flex text-sm   text-right items-center">
              <h2 className=" ">پرداخت عوارض خروج از کشور به‌عهده مسافر است</h2>
            </div>
          </div>
        </div>
      </div>
      <Footer websiteInfo={websiteInfo} />
    </div>
  );
}
