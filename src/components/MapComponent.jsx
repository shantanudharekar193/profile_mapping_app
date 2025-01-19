import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Icon, Style } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import './MapComponent.css';

const MapComponent = ({ location }) => {
  const mapRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      // Create the map instance
      const map = new Map({
        target: mapRef.current,
        layers: [
          // Base map layer (OpenStreetMap)
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([location.lng, location.lat]),
          zoom: 10,
        }),
      });

      // Create a marker feature
      const markerFeature = new Feature({
        geometry: new Point(fromLonLat([location.lng, location.lat])),
      });

      // Style the marker as a red icon
      markerFeature.setStyle(
        new Style({
          image: new Icon({
            src: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Red marker icon URL
            scale: 0.07, // Adjust size as needed
          }),
        })
      );

      // Create a vector layer for the marker
      const markerLayer = new VectorLayer({
        source: new VectorSource({
          features: [markerFeature],
        }),
      });

      // Add the marker layer to the map
      map.addLayer(markerLayer);

      // Cleanup on unmount
      return () => map.setTarget(null);
    } catch (err) {
      console.error("Map error:", err);
      setError("Failed to load the map. Please try again.");
    }
  }, [location]);

  if (error) return <p>{error}</p>;

  return <div ref={mapRef} className="map-container" />;
};

export default MapComponent;
