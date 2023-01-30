import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker, DraggableMarker, render, Popup } from "react-leaflet";
import { useState, useRef, useMemo, useCallback } from "react";
import { Modal, Group } from "@mantine/core";

export default function MapWithNoSSR() {
  const [opened, setOpened] = useState(false);
  const center = {
    lat: 51.505,
    lng: -0.09,
  };

  function DraggableMarker() {
    const [draggable, setDraggable] = useState(false);
    const [position, setPosition] = useState(center);
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
          }
        },
      }),
      []
    );
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d);
      console.log(position, markerRef);
    }, []);

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable ? "مکان هتل را مشخص کنید" : "برای حرکت کلیک کنید"}
          </span>
        </Popup>
      </Marker>
    );
  }

  return (
    <div>
      <Modal
        size="400px"
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        title="Add new Hotel"
      >
        <MapContainer
          id="map"
          className="w-96 h-96"
          center={center}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DraggableMarker />
        </MapContainer>
      </Modal>

      <Group position="center">
        <button
          onClick={() => {
            setOpened(true);
          }}
          className="font-bold p-3 transition text-mainPurple hover:bg-darkPurple hover:text-gray-100 rounded-sm"
        >
          <p>انتخاب محل در نقشه</p>
        </button>
      </Group>
    </div>
  );
}
