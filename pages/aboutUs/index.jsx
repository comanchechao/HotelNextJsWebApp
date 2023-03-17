import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import aboutUsBg from "../../assets/images/aboutUsBg.webp";
import { supabase } from "../../lib/supabaseClient";
import { useState, useEffect } from "react";
export default function AboutUs() {
  const [loading, setLoading] = useState(false);
  const [aboutUs, setAboutUs] = useState("");
  const [aboutUsMore, setAboutUsMore] = useState("");
  useEffect(() => {
    getWebsiteInfo();
  }, []);

  async function getWebsiteInfo() {
    setLoading(true);
    const { data } = await supabase.from("websiteInfo").select();
    data.map((object) => {
      setAboutUs(object.aboutUs);
      setAboutUsMore(object.aboutUsMore);
    });
    setLoading(false);
  }
  return (
    <div className="h-full w-screen">
      <Navbar />
      <div className="w-screen h-screen pt-10 flex lg:flex-row flex-col-reverse items-center justify-end ">
        <div className="w-full h-full flex-col    flex items-center pt-9 lg:pt-44 justify-center space-y-7">
          <h1 className="text-gray-900 lg:px-0  text-7xl pb-4 border-b-8 rounded-lg border-mainPurple">
            درباره ی بوتک
          </h1>
          <div className="w-full h-96  ">
            <h4 className="text-center text-lg px-8">{aboutUs}</h4>
          </div>
        </div>
        <Image
          className=" h-96 object-contain   lg:h-full  lg:w-auto"
          src={aboutUsBg}
          alt="Main Background"
        />
      </div>
      <div className="h-auto w-screen bg-mainWhite my-9 flex items-end py-5 flex-col justify-end lg:px-24">
        <div className="w-full h-full py-10 my-16 flex flex-col px-16 items-center justify-center space-y-6 bg-white">
          <h2 className="text-gray-900  text-4xl pb-4 border-b-8 rounded-lg border-mainPurple">
            تاریخچه و پیشینه
          </h2>
          <h4 className="text-center text-lg   p-9 rounded-md ">
            {aboutUsMore}
          </h4>
          {/* <h4 className="text-center text-lg   p-9 rounded-md ">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی
            در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را
            می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
            الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد
          </h4>
          <h4 className="text-center text-lg   p-9 rounded-md ">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی
            در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را
            می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
            الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد
          </h4> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
