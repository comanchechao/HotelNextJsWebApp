import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import contactUsBg from "../../assets/images/contactUsBg.webp";
import { supabase } from "../../lib/supabaseClient";

import { useState, useEffect } from "react";

import { Phone, MapPin, Envelope, Signpost } from "phosphor-react";
export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  useEffect(() => {
    getWebsiteInfo();
  });

  async function getWebsiteInfo() {
    setLoading(true);
    const { data } = await supabase.from("websiteInfo").select();
    data.map((object) => {
      setEmail(object.email);
      setAddress(object.address);
      setPhoneNumber(object.phoneNumber);
      setPostalCode(object.postalCode);
    });
    setLoading(false);
  }
  return (
    <div className="h-full w-screen bg-gray-200">
      <Navbar />
      <div className="w-full h-auto  ">
        <div className="w-screen h-96 ">
          <Image
            className=" h-rem26 w-full object-cover"
            src={contactUsBg}
            alt="Main Background"
          />
        </div>
        <div className="w-full mb-16 h-auto flex-col  flex items-center  justify-start pt-16 space-y-7 lg:px-44">
          <h1 className="text-gray-900 lg:px-0  text-4xl pb-4 border-b-8 rounded-lg border-mainPurple">
            راه های تماس با بوتک
          </h1>
          <h5 className="text-xl text-center">
            در صورت نیاز به راهنمایی و یا پشتیبانی، از طریق راه های زیر میتوانید
            با بوتک ارتباط برقرار کنید
          </h5>
          <div className="w-full justify-around h-rem34 lg:h-auto lg:p-4 text-center lg:space-y-0 space-y-7 lg:divide-x-2 bg-white lg:flex-row flex-col-reverse flex items-center">
            <div className="w-1/2 h-44   flex flex-col items-center justify-center lg:justify-around">
              <div className="flex flex-col items-center space-y-2">
                <h4 className="text-xl flex items-center">
                  آدرس دفتر پشتیبانی
                  <MapPin
                    className="mx-2"
                    size={24}
                    color="#3c15d5"
                    weight="fill"
                  />
                </h4>
                <h3 className="text-lg">{address}</h3>
              </div>
              <div className="flex flex-col items-center space-y-2 mt-3">
                <h4 className="text-xl flex items-center">
                  کد پستی
                  <Signpost
                    className="mx-2"
                    size={24}
                    color="#3c15d5"
                    weight="fill"
                  />
                </h4>
                <h3 className="text-lg">{postalCode}</h3>
              </div>
            </div>
            <div className="w-1/2 h-44   flex flex-col items-center justify-around">
              <div className="flex flex-col items-center space-y-2">
                <h4 className="text-xl flex items-center">
                  تلفن پشتیبانی
                  <Phone
                    className="mx-2"
                    size={24}
                    color="#3c15d5"
                    weight="fill"
                  />
                </h4>
                <h3 className="text-lg">{phoneNumber}</h3>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <h4 className="text-xl flex items-center">
                  ایمیل
                  <Envelope
                    className="mx-2"
                    size={24}
                    color="#3c15d5"
                    weight="fill"
                  />
                </h4>
                <h3 className="text-lg">{email}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
