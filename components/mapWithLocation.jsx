import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker, DraggableMarker, render, Popup } from "react-leaflet";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

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

  useEffect(() => {
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

  return (
    <div className="flex flex-col items-end w-96 ">
      <div className="flex flex-row-reverse items-center justify-around w-full">
        latitude: {position.lat.toFixed(4)}, longitude:{" "}
        {position.lng.toFixed(4)}{" "}
        <button
          className="text-white bg-mainPurple font-mainFont rounded-md text-lg cursor-pointer border-r-8 border-mainBlue  text-center flex items-center justify-center px-3 py-2 hover:bg-mainBlue duration-300 ease-in transition"
          onClick={onClick}
        >
          به هتل
        </button>
      </div>
      <div className="flex flex-col border items-end rounded-lg border-gray-200 divide-y divide-gray-200 w-full h-full">
        {firstLocation ? (
          <div
            onMouseOver={() => {
              toLocation({
                lat: JSON.stringify(firstLocation.lat),
                lng: JSON.stringify(firstLocation.lng),
              });
            }}
            className="flex flex-col justify-around items-around space-y-2 p-5 w-10/12"
          >
            <h1 className="text-lg self-end">
              {JSON.stringify(firstLocation.name)}
            </h1>
            <div className="flex w-full">
              <div className="flex w-full">
                <p>23213</p>
                <p>متر</p>
              </div>
              <div className="flex justify-end w-full">
                <div className="flex">
                  <p>4 دقیقه</p>
                </div>
                <div className="flex">
                  <p>4</p>
                  <p>دقیقه</p>
                </div>
              </div>
            </div>
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
            className="flex flex-col justify-around items-around space-y-2 p-5 w-10/12"
          >
            <h1 className="text-lg self-end">
              {JSON.stringify(secondLocation.name)}
            </h1>
            <div className="flex w-full">
              <div className="flex w-full">
                <p>23213</p>
                <p>متر</p>
              </div>
              <div className="flex justify-end w-full">
                <div className="flex">
                  <p>4 دقیقه</p>
                </div>
                <div className="flex">
                  <p>4</p>
                  <p>دقیقه</p>
                </div>
              </div>
            </div>
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
        style={{ width: "600px", height: "500px" }}
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
        {firstLocation ? (
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
        {secondLocation ? (
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
    <div className="flex w-full">
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
