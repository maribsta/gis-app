import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as turf from "@turf/turf";
import "./Map.css";
import Tooltip from "../Tooltip";
import ReactDOM from "react-dom";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFyaWJzdGEiLCJhIjoiY2xhanE5OTJqMDA3NDNzdDR4MXZ6emRiZiJ9.CLZ-Sy7bRF8hHrgaqdimBw";

export default function Map() {
  const mapContainer = useRef(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));
  const map = useRef(null);
  const [lng, setLng] = useState(10.39235);
  const [lat, setLat] = useState(63.430187);
  const [zoom, setZoom] = useState(12);
  const bounds = [
    [10.144844, 63.360289], // Southwest coordinates
    [10.663948, 63.488388], // Northeast coordinates
  ];

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
      // minZoom: 11,
      maxBounds: bounds,
    });

    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();

    const sources = ["midtbyen", "rosenborg"];

    sources.map((s) => {
      map.on("style.load", () => {
        map.setFog({}); // Set the default atmosphere style
        map.addSource(s, {
          type: "geojson",
          data:
            "https://raw.githubusercontent.com/maribsta/gis-app/main/src/static/" +
            s +
            ".geojson",
        });
        map.addLayer({
          id: s,
          type: "fill",
          source: s,
          layout: {},
          paint: {
            "fill-color": "#175cff",
            "fill-opacity": 0.5,
          },
        });
        map.addLayer({
          id: "test",
          type: "fill",
          source: "mapbox-streets",
          layout: {},
          paint: {
            "fill-color": "#175cff",
            "fill-opacity": 0.5,
          },
        });
      });
    });

    // map.addLayer({
    //   id: "veg",
    //   type: "fill",
    //   source: ,
    //   layout: {},
    //   paint: {
    //     "fill-color": "#175cff",
    //     "fill-opacity": 0.5,
    //   },
    // });

    // map.on("mousemove", () => {
    //   const features = map.queryRenderedFeatures(map);
    //   const roads = features.filter((i) => (i.sourceLayer = "road"));

    //   console.log(
    //     roads.map((road) => {
    //       road.geometry;
    //     })
    //   );

    // // Create tooltip node
    // const tooltipNode = document.createElement("div");
    // ReactDOM.render(<Tooltip feature={feature} />, tooltipNode);

    // // Set tooltip on map
    // tooltipRef.current
    //   .setLngLat(e.lngLat)
    //   .setDOMContent(tooltipNode)
    //   .addTo(map);
    // });

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
