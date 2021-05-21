import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Loader from './Loader';
import Message from './Message';
import { listFarms } from '../actions/farmActions';
import 'mapbox-gl/dist/mapbox-gl.css';

const FarmsMap = () => {
  const [viewport, setViewport] = React.useState({
    longitude: -122.45,
    latitude: 37.78,
    zoom: 14,
  });

  const dispatch = useDispatch();

  const farmsData = useSelector((state) => state.farmList);

  const { loading, error, farm } = farmsData;
  console.log(farm);

  useEffect(() => {
    dispatch(listFarms());
  }, [dispatch]);

  const [farmInfo, setFarmInfo] = useState('');

  const coordinates = [
    {
      longitude: -122.45,
      latitude: 37.78,
      name: 'Farm1',
      description: 'We are farm1',
    },
    {
      longitude: -8.7942,
      latitude: -16.31928,
      name: 'Farm2',
      description: 'We are farm2',
    },
    {
      longitude: -148.83206,
      latitude: 11.95208,
      name: 'Farm3',
      description: 'We are farm3',
    },
  ];

  const redMarker = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="red"
      className="bi bi-geo-alt-fill"
      viewBox="0 0 16 16"
    >
      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    </svg>
  );

  return (
    <>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <ReactMapGL
        {...viewport}
        width="50vw"
        height="50vh"
        onViewportChange={setViewport}
        mapboxApiAccessToken="pk.eyJ1IjoiZmFybXkiLCJhIjoiY2tveGQ1OGs4MGV4bzJucGRoZ2VlNDVqbSJ9.Jv0nA83huBK0OEc6cmZaTg"
      >
        {farm.map(({ coordinates, description, name }) => (
          <Marker
            latitude={coordinates.lat}
            longitude={coordinates.lon}
            offsetLeft={-20}
            offsetTop={-10}
            key={name}
          >
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => setFarmInfo({ name, description, coordinates })}
            >
              {redMarker}
            </div>
          </Marker>
        ))}
        {farmInfo && (
          <Popup
            tipSize={5}
            anchor="top"
            longitude={farmInfo.coordinates.lon}
            latitude={farmInfo.coordinates.lat}
            closeOnClick={false}
            onClose={() => setFarmInfo('')}
          >
            <div>
              <h3>{farmInfo.name}</h3>
              <p>{farmInfo.description}</p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </>
  );
};

export default FarmsMap;
