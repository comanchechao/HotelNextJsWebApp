import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker, DraggableMarker, render, Popup } from "react-leaflet";
import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import IRCities from "../assets/cities/ir.json";
import { IconBrandCitymapper } from "@tabler/icons";
import L from "leaflet";
import cityIcon from "../assets/cities/icon/city.png";

export default function MapWithNoSSR() {
  const center = {
    lat: 35.7,
    lng: 51.4167,
  };
  var greenIcon = L.icon({
    iconUrl: cityIcon,

    iconSize: [38, 95], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  return (
    <MapContainer
      id="map"
      className="w-96 h-96"
      center={center}
      zoom={5}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {IRCities.map((city, i) => {
        if (city.population >= 201184) {
          return (
            <Marker key={i} position={[city.lat, city.lng]}>
              <Popup>{city.city}</Popup>
            </Marker>
          );
        }
      })}
    </MapContainer>
  );
}
