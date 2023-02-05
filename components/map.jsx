import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker, DraggableMarker, render, Popup } from "react-leaflet";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mapActions } from "../store/map";

const center = [35.7, 51.4167];
const locations = [
  { name: "دریا", lat: 37.7, lng: 51.41 },
  { name: "مرکز تهران", lat: 35.7, lng: 51.4167 },
  { name: "نجف آباد", lat: 32.7, lng: 51.419 },
  { name: "کاشان", lat: 33.7, lng: 51.435 },
];
const zoom = 8;

function DisplayPosition({ map, markedHotel }) {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(() => map.getCenter());

  useEffect(() => {
    if ((Lat > 0) & (Lng > 0)) {
      map.setView({ lat: Lat, lng: Lng }, 10);
    }
  }, []);

  let Lat = useSelector((state) => state.map.lat);
  let Lng = useSelector((state) => state.map.lng);

  const onClick = useCallback(() => {
    map.setView({ lat: Lat, lng: Lng }, 16);
    console.log({ lat: Lat, lng: Lng });
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
          className="bg-Sky-500 flex text-center font-bold text-gray-50 p-3 shadow-2xl rounded-lg"
          onClick={onClick}
        >
          به هتل
        </button>
      </div>
    </div>
  );
}

export default function ExternalStateExample(position) {
  const [map, setMap] = useState(null);
  let lat = useSelector((state) => state.map.lat);
  let lng = useSelector((state) => state.map.lng);
  let markedHotel = { lat, lng };
  function DraggableMarker() {
    let lat = useSelector((state) => state.map.lat);
    let lng = useSelector((state) => state.map.lng);

    const dispatch = useDispatch();
    const [draggable, setDraggable] = useState(false);

    useEffect(() => {
      if ((lat > 0) & (lng > 0)) {
        setPosition(markedHotel);
      }
    }, []);
    const [position, setPosition] = useState(center);
    const markerRef = useRef(null);

    const setLocations = function () {
      const marker = markerRef.current;
      let lat = marker.getLatLng().lat;
      let lng = marker.getLatLng().lng;
      dispatch(mapActions.setLat(lat));
      dispatch(mapActions.setLng(lng));
    };
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setLocations();
          }
        },
      }),
      []
    );
    const toggleDraggable = useCallback(() => {
      const marker = markerRef.current;
      setDraggable((d) => !d);
    }, []);

    useEffect(() => {
      console.log(lat, lng);
    }, [draggable]);

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
        <DraggableMarker />
      </MapContainer>
    ),
    []
  );

  return (
    <div className="flex flex-col w-full">
      {displayMap}
      {map ? <DisplayPosition markedHotel={markedHotel} map={map} /> : null}
    </div>
  );
}

// import { MapContainer } from "react-leaflet/MapContainer";
// import { TileLayer } from "react-leaflet/TileLayer";
// import { useMap } from "react-leaflet/hooks";
// import { Marker, DraggableMarker, render, Popup } from "react-leaflet";
// import { useState, useRef, useMemo, useCallback, useEffect } from "react";
// import { Modal, Group } from "@mantine/core";
// import { useDispatch } from "react-redux";
// import { mapActions } from "../store/map";
// import { useSelector } from "react-redux";
// import L from "leaflet";

// export default function MapWithNoSSR() {
//   const [opened, setOpened] = useState(false);
//   const center = {
//     lat: 51.505,
//     lng: -0.09,
//   };

// function DraggableMarker() {
//   let hotelLat = useSelector((state) => state.map.lat);
//   let hotelLng = useSelector((state) => state.map.lng);
//   const dispatch = useDispatch();
//   const [draggable, setDraggable] = useState(false);
//   const [position, setPosition] = useState(center);
//   const markerRef = useRef(null);

//   const setLocations = function () {
//     const marker = markerRef.current;
//     let lat = marker.getLatLng().lat;
//     let lng = marker.getLatLng().lng;
//     dispatch(mapActions.setLat(lat));
//     dispatch(mapActions.setLng(lng));
//   };
//   const eventHandlers = useMemo(
//     () => ({
//       dragend() {
//         const marker = markerRef.current;
//         if (marker != null) {
//         }
//       },
//     }),
//     []
//   );
//   const toggleDraggable = useCallback(() => {
//     const marker = markerRef.current;
//     setDraggable((d) => !d);
//   }, []);

//   useEffect(() => {
//     setLocations();
//   }, [draggable]);

//   return (
//     <Marker
//       draggable={draggable}
//       eventHandlers={eventHandlers}
//       position={position}
//       ref={markerRef}
//     >
//       <Popup minWidth={90}>
//         <span onClick={toggleDraggable}>
//           {draggable ? "مکان هتل را مشخص کنید" : "برای حرکت کلیک کنید"}
//         </span>
//       </Popup>
//     </Marker>
//   );
// }

//   return (
//     <div>
//       <Modal
//         size="400px"
//         opened={opened}
//         onClose={() => setOpened(false)}
//         centered
//         title="Add new Hotel"
//       >
//         <MapContainer
//           id="map"
//           className="w-96 h-96"
//           center={center}
//           zoom={13}
//           scrollWheelZoom={false}
//         >
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           <DraggableMarker />
//         </MapContainer>
//       </Modal>

//       <Group position="center">
//         <button
//           onClick={() => {
//             setOpened(true);
//           }}
//           className="font-bold p-3 transition text-mainPurple hover:bg-darkPurple hover:text-gray-100 rounded-sm"
//         >
//           <p>انتخاب محل در نقشه</p>
//         </button>
//       </Group>
//     </div>
//   );
// }
