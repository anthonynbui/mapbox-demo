import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const ACCESS_TOKEN = 'pk.eyJ1IjoiYW50aG9ueW5idWk5OSIsImEiOiJjbG51cnUxdGYwZjQ5Mm1xaXI5NWpldDZqIn0.CjJYTJGsG_ixUzaGNuv8ug';

function SearchBox() {
  useEffect(() => {
    // Initialize Mapbox
    mapboxgl.accessToken = ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-73.99209, 40.68933],
      zoom: 8.8,
    });

    // Load Mapbox Search JS
    const script = document.createElement('script');
    script.src = 'https://api.mapbox.com/search-js/v1.0.0-beta.17/web.js';
    script.defer = true;

    script.onload = function () {
      const searchBox = new SearchBox();
      searchBox.accessToken = ACCESS_TOKEN;
      searchBox.options = {
        types: 'address,poi',
        proximity: [-73.99209, 40.68933],
      };
      searchBox.marker = true;
      searchBox.mapboxgl = mapboxgl;
      map.addControl(searchBox);
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup Mapbox instance
      map.remove();
    };
  }, []);

  return <div id="map" style={{ position: 'absolute', width: '100%', height: '100%' }}></div>;
};

export default SearchBox;