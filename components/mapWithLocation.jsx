import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker, DraggableMarker, render, Popup } from "react-leaflet";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const center = [51.505, -0.09];
const zoom = 13;

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

  return (
    <p>
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{" "}
      <button onClick={onClick}>reset</button>
    </p>
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
        className="w-10/12 h-96"
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    ),
    []
  );

  return (
    <div>
      {map ? <DisplayPosition map={map} /> : null}
      {displayMap}
    </div>
  );
}
