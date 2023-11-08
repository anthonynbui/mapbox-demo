import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./Map.css"

const icon = L.icon({
  iconUrl: "./placeholder.png",
  iconSize: [38, 38],
});

const API_key = "S2q5Akjkr8FytsnRi3Wf";
const position = [51.505, -0.09];

function ResetCenterView(props) {
  const { selectPosition } = props;
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition?.lat, selectPosition?.lon),
        map.getZoom(),
        {
          animate: true,
        }
      );
    }
  }, [selectPosition]);

  return null;
}

function Map({selectPosition}) {
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];

  return (
    <MapContainer
      center={position}
      zoom={8}
      className="map-container"
    >
      <TileLayer
        url={`https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${API_key}`}
      />
      {selectPosition && (
        <Marker position={locationSelection} icon={icon}>
          <Popup>
            Latitude: {selectPosition?.lat} Longitude: {selectPosition?.lon}
          </Popup>
        </Marker>
      )}
      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
}

export default Map;
