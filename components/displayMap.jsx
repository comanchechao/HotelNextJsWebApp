import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker, DraggableMarker, render, Popup } from "react-leaflet";
import { useState, useRef, useMemo, useCallback } from "react";
import IRCities from "../assets/cities/ir.json";

export default function MapWithNoSSR() {
  const center = {
    lat: 35.7,
    lng: 51.4167,
  };

  return (
    <MapContainer
      id="map"
      className="w-96 h-96"
      center={center}
      zoom={8}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {IRCities.map((city, i) => {
        return (
          <Marker key={i} position={[city.lat, city.lng]}>
            <Popup>{city.city}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
