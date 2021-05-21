import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

const FarmsMap = () => {
  const [viewport, setViewport] = useState({
    latitude: 52.06633748961447,
    longitude: 5.271130529104891,
    zoom: 7,
  });

  const data = [
    { id: 1, lat: 52.00889302297123, long: 4.897595375672715 },
    { id: 1, lat: 52.00889302297123, long: 4.897595375672715 },
  ];

  return (
    <>
      <h1>Our providers of Fresh Products!</h1>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        width="100%"
        height="200px"
        mapStyle="mapbox://styles/farmy/ckovlez1a01um17r5rmq19gkr"
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        {data.map((field) => (
          <Marker key={field.id} latitude={field.lat} longitude={field.lon}>
            <button>
              <img
                src="pk.eyJ1IjoiZmFybXkiLCJhIjoiY2tveGQ1OGs4MGV4bzJucGRoZ2VlNDVqbSJ9.Jv0nA83huBK0OEc6cmZaTg"
                alt="pinpoint"
                width="100"
                height="100"
              />
            </button>
          </Marker>
        ))}
      </ReactMapGL>
    </>
  );
};

export default FarmsMap;
