import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker, DraggableMarker, render, Popup } from "react-leaflet";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const center = [35.7, 51.4167];
const locations = [
  { name: "یک", lat: 37.7, lng: 51.41 },
  { name: "بعدی", lat: 35.7, lng: 51.4167 },
  { name: "بشیسب", lat: 32.7, lng: 51.419 },
  { name: "بی", lat: 33.7, lng: 51.435 },
];
const zoom = 8;

function DisplayPosition({ map }) {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(() => map.getCenter());

  const onClick = useCallback(() => {
    map.setView(center, zoom);
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
        {position.lng.toFixed(4)} <button className="bg-Sky-500 flex text-center font-bold text-gray-50 p-3 shadow-2xl rounded-lg" onClick={onClick}>reset</button>
      </div>
      <div className="flex flex-col border items-end rounded-lg border-gray-200 divide-y divide-gray-200 w-full h-full">
        {locations.map((location, i) => {
          return (
            <div
              key={i}
              onMouseOver={() => {
                toLocation(location);
              }}
              className="flex flex-col justify-around items-around space-y-2 p-5 w-10/12"
            >
              <h1 className="text-lg self-end">{location.name}</h1>
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
          );
        })}
      </div>
    </div>
  );
}

export default function ExternalStateExample(position) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    console.log(position);
  });

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
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location) => {
          return <Marker position={[location.lat, location.lng]} />;
        })}
      </MapContainer>
    ),
    []
  );

  return (
    <div className="flex w-full">
      {displayMap}
      {map ? <DisplayPosition map={map} /> : null}
    </div>
  );
}
