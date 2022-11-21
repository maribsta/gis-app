import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as turf from "@turf/turf";
import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFyaWJzdGEiLCJhIjoiY2xhanE5OTJqMDA3NDNzdDR4MXZ6emRiZiJ9.CLZ-Sy7bRF8hHrgaqdimBw";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(10.39235);
  const [lat, setLat] = useState(63.430187);
  const [zoom, setZoom] = useState(12.5);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();

    map.on("style.load", () => {
      map.setFog({}); // Set the default atmosphere style
      map.addSource("location", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/maribsta/gis-app/main/sample.geojson",
      });
      map.addLayer({
        id: "location",
        type: "fill",
        source: "location",
        layout: {},
        paint: {
          "fill-color": "#175cff",
          "fill-opacity": 0.5,
        },
      });
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.on("sourcedata", function (e) {
      if (e.sourceId !== "location" || !e.isSourceLoaded) return;
      var f = map.querySourceFeatures("location");
      if (f.length === 0) return;
      var bbox = turf.bbox({
        type: "FeatureCollection",
        features: f,
      });
      map.fitBounds(bbox, { padding: 100 });
    });
  }, []);

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
