import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker, DraggableMarker, render, Popup } from "react-leaflet";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mapActions } from "../store/map";
import { IconTrash } from "@tabler/icons";

const center = [35.7, 51.4167];
const center2 = [35.8, 51.4167];
const center3 = [35.9, 51.4167];

const locations = [
  { name: "دریا", lat: 37.7, lng: 51.41 },
  { name: "مرکز تهران", lat: 35.7, lng: 51.4167 },
  { name: "نجف آباد", lat: 32.7, lng: 51.419 },
  { name: "کاشان", lat: 33.7, lng: 51.435 },
];
const zoom = 8;

function DisplayPosition({ map }) {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(() => map.getCenter());

  useEffect(() => {
    if ((Lat > 0) & (Lng > 0)) {
      map.setView({ lat: Lat, lng: Lng }, 8);
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

export default function ExternalStateExample({ city }) {
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
    useEffect(() => {
      console.log(city);
    });
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
            {draggable ? "مارکر اول" : "برای حرکت کلیک کنید"}
          </span>
        </Popup>
      </Marker>
    );
  }

  function DraggableMarker2() {
    let lat2 = useSelector((state) => state.map.lat2);
    let lng2 = useSelector((state) => state.map.lng2);

    const dispatch = useDispatch();
    const [draggable, setDraggable] = useState(false);

    useEffect(() => {
      if ((lat2 > 0) & (lng2 > 0)) {
        setPosition({ lat: lat2, lng: lng2 });
      }
    }, []);

    useEffect(() => {
      console.log("lat2", lat2, "lng2", lng2);
    });
    const [position, setPosition] = useState(center2);
    const markerRef2 = useRef(null);

    const setLocations = function () {
      const marker = markerRef2.current;
      let lat2 = marker.getLatLng().lat;
      let lng2 = marker.getLatLng().lng;
      dispatch(mapActions.setLat2(lat2));
      dispatch(mapActions.setLng2(lng2));
    };
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef2.current;
          if (marker != null) {
            setLocations();
          }
        },
      }),
      []
    );
    const toggleDraggable = useCallback(() => {
      const marker = markerRef2.current;
      setDraggable((d) => !d);
    }, []);

    useEffect(() => {
      console.log(lat2, lng2);
    }, [draggable]);

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef2}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable ? "مارکر دوم" : "برای حرکت کلیک کنید"}
          </span>
        </Popup>
      </Marker>
    );
  }

  function DraggableMarker3() {
    let lat3 = useSelector((state) => state.map.lat3);
    let lng3 = useSelector((state) => state.map.lng3);

    const dispatch = useDispatch();
    const [draggable, setDraggable] = useState(false);

    useEffect(() => {
      if ((lat3 > 0) & (lng3 > 0)) {
        setPosition({ lat: lat3, lng: lng3 });
      }
    }, []);

    useEffect(() => {
      console.log("lat3", lat3, "lng3", lng3);
    });
    const [position, setPosition] = useState(center3);
    const markerRef3 = useRef(null);

    const setLocations = function () {
      const marker = markerRef3.current;
      let lat3 = marker.getLatLng().lat;
      let lng3 = marker.getLatLng().lng;
      dispatch(mapActions.setLat3(lat3));
      dispatch(mapActions.setLng3(lng3));
    };
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef3.current;
          if (marker != null) {
            setLocations();
          }
        },
      }),
      []
    );
    const toggleDraggable = useCallback(() => {
      const marker = markerRef3.current;
      setDraggable((d) => !d);
    }, []);

    useEffect(() => {
      console.log(lat3, lng3);
    }, [draggable]);

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef3}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable ? "مارکر سوم" : "برای حرکت کلیک کنید"}
          </span>
        </Popup>
      </Marker>
    );
  }

  function MainMarker() {
    let lat = useSelector((state) => state.map.lat);
    let lng = useSelector((state) => state.map.lng);

    const dispatch = useDispatch();
    const [draggable, setDraggable] = useState(false);

    useEffect(() => {
      if ((lat > 0) & (lng > 0)) {
        setPosition({ lat: lat, lng: lng });
      }
    }, []);

    useEffect(() => {
      console.log("lat", lat, "lng", lng);
    });
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
            {draggable ? "هتل مارکر" : "برای حرکت کلیک کنید"}
          </span>
        </Popup>
      </Marker>
    );
  }
  const [showMarker2, setShowMarker2] = useState(false);
  const [showMarker3, setShowMarker3] = useState(false);

  return (
    <div className="flex flex-col items-center  w-full">
      <MapContainer
        id="map"
        style={{ width: "600px", height: "500px" }}
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        ref={setMap}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MainMarker />
        {showMarker2 ? <DraggableMarker2 /> : null}
        {showMarker3 ? <DraggableMarker3 /> : null}
      </MapContainer>

      <div className="flex flex-col space-y-3 items-center  justify-center w-full">
        <div className="flex justify-center items-center w-full p-4">
          {showMarker2 ? (
            <div className="flex justify-around  w-full h-full">
              <div
                onClick={() => {
                  setShowMarker2(false);
                  console.log(showMarker2);
                }}
                className="flex justify-center items-center text-red-500"
              >
                <IconTrash />
              </div>
              <div className="flex">
                <input
                  className="py-2 px-8 rounded-lg bg-gray-200"
                  type="text"
                  placeholder="نام مکان"
                />
              </div>
            </div>
          ) : (
            <button
              className="bg-mainPurple hover:bg-darkPurple text-white transition px-8 py-3 rounded-lg shadow-2xl"
              onClick={() => {
                setShowMarker2(true);
                console.log(showMarker2);
              }}
            >
              افزودن مارکر
            </button>
          )}
        </div>
        <div className="flex justify-center items-center w-full p-4">
          {" "}
          {showMarker3 ? (
            <div className="flex justify-around  w-full h-full">
              <div className="flex justify-center items-center text-red-500">
                <IconTrash
                  onClick={() => {
                    setShowMarker3(false);
                    console.log(showMarker2);
                  }}
                />
              </div>
              <div className="flex">
                <input
                  className="py-2 px-8 rounded-lg bg-gray-200"
                  type="text"
                  placeholder="نام مکان"
                />
              </div>
            </div>
          ) : (
            <button
              className="bg-mainPurple hover:bg-darkPurple text-white transition px-8 py-3 rounded-lg shadow-2xl"
              onClick={() => {
                setShowMarker3(true);
                console.log(showMarker3);
              }}
            >
              افزودن مارکر
            </button>
          )}
        </div>
      </div>

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
