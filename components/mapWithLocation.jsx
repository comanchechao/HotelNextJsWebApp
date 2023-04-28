import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker, DraggableMarker, render, Popup } from "react-leaflet";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useTranslation } from "next-i18next";

const center = [35.7, 51.4167];
const locations = [
  { name: "دریا", lat: 37.7, lng: 51.41 },
  { name: "مرکز تهران", lat: 35.7, lng: 51.4167 },
  { name: "نجف آباد", lat: 32.7, lng: 51.419 },
  { name: "کاشان", lat: 33.7, lng: 51.435 },
];
const zoom = 15;

function DisplayPosition({ map, lng, lat, firstLocation, secondLocation }) {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(() => map.getCenter());
  const [alignLeft, setAlignLeft] = useState(false);
  async function changeAlignment() {
    if (lng === "tr") await setAlignLeft(false);
    else setAlignLeft(true);
  }
  useEffect(() => {
    changeAlignment();

    onClick();
  }, []);

  const onClick = useCallback(() => {
    map.setView({ lat: lat, lng: lng }, zoom);
  }, [map]);

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
  }, [map]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  function toLocation(location) {
    map.setView(location, zoom);
  }
  const { t } = useTranslation();

  return (
    <div className="flex  justify-around lg:flex-row flex-col  items-center w-auto lg:ml-9 lg:space-x-7  ">
      <div className="flex flex-row-reverse items-center justify-around w-full">
        {/* latitude: {position.lat.toFixed(4)}, longitude:{" "}
        {position.lng.toFixed(4)}{" "} */}
        <button
          className="py-1 px-8 mt-6 border-2 font-mainFont border-r-8 border-mainBlue rounded-md bg-white hover:bg-mainBlue   transition ease-in duration-300 text-gray-700 text-lg"
          onClick={onClick}
        >
          {t("hotelOnMap")}{" "}
        </button>
      </div>
      <div className="flex  border mt-6 space-x-4  items-center rounded-lg border-gray-200 divide-y divide-gray-200  ">
        {firstLocation ? (
          <div
            onMouseOver={() => {
              toLocation({
                lat: JSON.stringify(firstLocation.lat),
                lng: JSON.stringify(firstLocation.lng),
              });
            }}
            className="flex   justify-center items-center  h-11 rounded-lg w-40   bg-white cursor-pointer transition ease-in duration-200 hover:bg-mainBlue hover:text-mainPurple   p-2  "
          >
            <h2 className="text-sm  ">{JSON.stringify(firstLocation.name)}</h2>
          </div>
        ) : null}
        {secondLocation ? (
          <div
            onMouseOver={() => {
              toLocation({
                lat: JSON.stringify(secondLocation.lat),
                lng: JSON.stringify(secondLocation.lng),
              });
            }}
            className="flex   justify-center items-center  h-11 rounded-lg w-40  bg-white  cursor-pointer transition ease-in duration-200 hover:bg-mainBlue hover:text-mainPurple   p-2 "
          >
            <h2 className="text-sm">{JSON.stringify(secondLocation.name)}</h2>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function ExternalStateExample({
  lat,
  lng,
  firstLocation,
  secondLocation,
}) {
  const [map, setMap] = useState(null);

  const displayMap = useMemo(
    () => (
      <MapContainer
        id="map"
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        ref={setMap}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={{ lat: lat, lng: lng }}>
          {" "}
          <Popup>مکان هتل</Popup>
        </Marker>
        {firstLocation.lat !== "" ? (
          <Marker
            position={{
              lat: JSON.stringify(firstLocation.lat),
              lng: JSON.stringify(firstLocation.lng),
            }}
          >
            {" "}
            <Popup>firstLocation</Popup>
          </Marker>
        ) : null}
        {secondLocation.lat !== "" ? (
          <Marker
            position={{
              lat: JSON.stringify(secondLocation.lat),
              lng: JSON.stringify(secondLocation.lng),
            }}
          >
            {" "}
            <Popup>secondLOcatoin</Popup>
          </Marker>
        ) : null}
      </MapContainer>
    ),
    []
  );

  return (
    <div className="flex  flex-col w-full items-center justify-center  z-10 ">
      {displayMap}
      {map ? (
        <DisplayPosition
          map={map}
          firstLocation={firstLocation}
          secondLocation={secondLocation}
          lat={lat}
          lng={lng}
        />
      ) : null}
    </div>
  );
}
