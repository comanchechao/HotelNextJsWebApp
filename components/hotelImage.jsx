import Image from "next/image";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";
import { Loader } from "@mantine/core";
export default function HotelImage({ image }) {
  const [displayImage, setDisplayImage] = useState("");
  const [loading, setLoading] = useState(false);
  const downloadImage = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.storage
        .from("/public/hotel-images")
        .download(image);

      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setDisplayImage(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    downloadImage();
  }, []);
  return (
    <div>
      {loading ? (
        <Loader color="grape" />
      ) : (
        <Image
          alt=""
          width={376}
          height={376}
          className="w-52 lg:h-52 object-contain"
          src={displayImage}
        />
      )}
    </div>
  );
}
