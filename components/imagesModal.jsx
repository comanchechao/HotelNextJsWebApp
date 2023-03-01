import { useState } from "react";
import { Modal, Select, Group } from "@mantine/core";
import hotelone from "../assets/images/hotelone.webp";
import hotelthree from "../assets/images/hotelthree.webp";
import hotelfour from "../assets/images/hotelfour.webp";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
export default function ImagesModal() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Modal
        size="lg"
        opened={opened}
        onClose={() => setOpened(false)}
        centered
      >
        <Carousel
          mx="auto"
          slideSize="100%"
          width="80%"
          controlSize={25}
          loop
          withIndicators
        >
          <div className="flex w-full h-full items-center ">
            <Carousel.Slide>
              <div className="h-full w-full flex items-center">
                <Image
                  className=" w-full  lg:object-fit h-full lg:w-full"
                  alt="antalia"
                  src={hotelone}
                />
              </div>
            </Carousel.Slide>
            <Carousel.Slide>
              <div className="h-full w-full flex items-center">
                <Image
                  className=" w-full lg:object-fit h-full lg:w-full"
                  alt="antalia"
                  src={hotelfour}
                />
              </div>
            </Carousel.Slide>
            <Carousel.Slide>
              <div className="h-full w-full flex items-center">
                <Image
                  className="  w-full lg:object-fit h-full lg:w-full"
                  alt="antalia"
                  src={hotelthree}
                />
              </div>
            </Carousel.Slide>
          </div>
        </Carousel>
      </Modal>

      <Group position="center">
        <button
          onClick={() => {
            setOpened(true);
          }}
          className="text-white bg-mainPurple font-mainFont rounded-md text-lg cursor-pointer border-r-8 hover:text-darkPurple border-mainBlue  text-center flex items-center justify-center px-3 py-2 hover:bg-mainBlue duration-300 ease-in transition"
        >
          عکس های بیشتر
        </button>
      </Group>
    </>
  );
}
