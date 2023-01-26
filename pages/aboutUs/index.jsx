import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import aboutUsBg from "../../assets/images/aboutUsBg.webp";
export default function AboutUs() {
  return (
    <div className="h-full w-screen">
      <Navbar />
      <div className="w-screen h-screen pt-10 flex   items-center justify-end ">
        <div className="w-full h-full flex-col    flex items-center pt-44 justify-center space-y-7">
          <h1 className="text-gray-900  text-7xl pb-4 border-b-8 rounded-lg border-mainPurple">
            درباره ی بوتک
          </h1>
          <div className="w-full h-96  ">
            <h4 className="text-center text-lg px-8">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
              نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
              کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
              جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان
              فارسی ایجاد کرد
            </h4>
          </div>
        </div>
        <Image
          className="  object-contain   h-full  w-auto"
          src={aboutUsBg}
          alt="Main Background"
        />
      </div>
      <div className="h-screen w-screen bg-gray-200 flex items-end pt-16 flex-col justify-end px-24">
        <div className="w-full h-full my-16 flex flex-col px-16 items-center justify-center space-y-6 bg-white">
          <h2 className="text-gray-900  text-4xl pb-4 border-b-8 rounded-lg border-mainPurple">
            تاریخچه و پیشینه
          </h2>
          <h4 className="text-center text-lg bg-gray-200 p-9 rounded-md ">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی
            در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را
            می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
            الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد
          </h4>{" "}
          <h4 className="text-center text-lg bg-gray-200 p-9 rounded-md ">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی
            در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را
            می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
            الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد
          </h4>{" "}
          <h4 className="text-center text-lg bg-gray-200 p-9 rounded-md ">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی
            در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را
            می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
            الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد
          </h4>{" "}
        </div>
      </div>
      <Footer />
    </div>
  );
}