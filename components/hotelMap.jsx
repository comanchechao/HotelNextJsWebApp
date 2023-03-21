import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, DraggableMarker, render, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { Group, Modal } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { useMediaQuery } from "@mantine/hooks";

export default function HotelMaps({ lat, lng }) {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 50em)");

  const center = {
    lat: 35.7,
    lng: 51.4167,
  };

  // useEffect(() => {
  //   console.log(lat, lng);
  // }, []);
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        size="500px"
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        fullScreen={isMobile}
      >
        {" "}
        <MapContainer
          id="map"
          className="w-96 h-96"
          center={{ lat: lat, lng: lng }}
          zoom={15}
          scrollWheelZoom={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[lat, lng]} />
          {lat === 0 ? (
            <Marker position={[lat, lng]} />
          ) : (
            <Marker position={[lat, lng]} />
          )}
        </MapContainer>
      </Modal>

      <Group>
        <div
          onClick={() => {
            setOpened(true);
          }}
          className="flex text-blue-500 transition hover:text-blue-600 cursor-pointer justify-center items-center"
        >
          <h2>{t("seeMap")}</h2>
        </div>
      </Group>
    </>
  );
}
