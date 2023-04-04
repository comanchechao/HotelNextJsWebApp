import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, DraggableMarker, render, Popup } from "react-leaflet";

export default function DisplayCities({ LatLng, cities }) {
  const center = {
    lat: 35.7,
    lng: 51.4167,
  };

  return (
    <MapContainer
      id="map"
      className="w-full h-full"
      center={center}
      zoom={4}
      style={{ width: "600px", height: "1000px" }}
      scrollWheelZoom={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {LatLng ? (
        <Marker position={{ lat: LatLng[0], lng: LatLng[1] }}></Marker>
      ) : null}
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
