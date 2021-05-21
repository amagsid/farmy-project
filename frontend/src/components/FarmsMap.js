import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import '../index.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const FarmsMap = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(-87.65);
  const [lat, setLat] = useState(41.84);
  const [zoom, setZoom] = useState(10);

  const data = [
    {
      coords: ['-87.637596', '41.940403'],
    },
    {
      coords: ['-87.637596', '41.940403'],
    },
  ];
  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    // Create default markers
    data.map((feature) => new mapboxgl.Marker().setLngLat(feature.coords).addTo(map));

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div ref={mapContainerRef} />
    </div>
  );
};

export default FarmsMap;
