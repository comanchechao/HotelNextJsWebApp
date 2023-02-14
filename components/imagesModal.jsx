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
    <div className="w-full h-full">
      <Modal
        size="800px"
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        title="گالری عکس "
      >
        <Carousel
          slideSize="70%"
          height={600}
          width="100%"
          align="start"
          slideGap="md"
          controlSize={34}
          loop
          withIndicators
        >
          <Carousel.Slide size="70%" gap="xl">
            <div className="h-full w-full flex items-center">
              <Image
                className="lg:w-full lg:h-full object-contain"
                alt="antalia"
                src={hotelone}
              />
            </div>
          </Carousel.Slide>
          <Carousel.Slide size="70%" gap="xl">
            <div className="h-full w-full flex items-center">
              <Image
                className="lg:w-full lg:h-full object-contain"
                alt="antalia"
                src={hotelfour}
              />
            </div>
          </Carousel.Slide>
          <Carousel.Slide size="70%" gap="xl">
            <div className="h-full w-full flex items-center">
              <Image
                className="lg:w-full lg:h-full object-contain"
                alt="antalia"
                src={hotelthree}
              />
            </div>
          </Carousel.Slide>
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
    </div>
  );
}
