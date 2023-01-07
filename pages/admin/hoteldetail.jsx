import hotelOne from "../../assets/images/hotelone.jpg";
import hotelTwo from "../../assets/images/hoteltwo.jpg";
import hotelThree from "../../assets/images/hotelthree.jpg";
import hotelFour from "../../assets/images/hotelfour.jpg";
import Image from "next/image";
import Navbar from "../../components/Navbar";

export default function hotelDetail() {
  let images = [hotelOne, hotelTwo, hotelThree, hotelFour];
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="flex w-10/12 overflow-x-scroll">
          {images.map((image, i) => {
            return <Image className="h-96 w-96" src={image} />;
          })}
        </div>
      </div>
    </div>
  );
}
