import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker, DraggableMarker, render, Popup } from "react-leaflet";
import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import IRCities from "../assets/cities/ir";
import { IconBrandCitymapper } from "@tabler/icons";
import L from "leaflet";
import cityIcon from "../assets/cities/icon/city.png";

export default function DisplayCities({ LatLng, cities }) {
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

  useEffect(() => {
    console.log(cities);
  });

  return (
    <MapContainer
      id="map"
      className="w-96 h-96"
      center={center}
      zoom={5}
      scrollWheelZoom={false}
    >
      {/* {LatLng ? (
        <Marker position={{ lat: LatLng[0], lng: LatLng[1] }}></Marker>
      ) : null} */}
      {cities.map((city, i) => {
        return (
          <Marker key={i} position={[city.lat, city.lng]}>
            <Popup>{city.city}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
