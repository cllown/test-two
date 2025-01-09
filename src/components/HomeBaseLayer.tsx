import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import HomeBaseiconImage from '../icons/homepoint.webp'

const homeBaseIcon = L.icon({
  iconUrl: HomeBaseiconImage, 
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const HomeBaseLayer: React.FC = () => {
  return (
    <Marker 
      position={[0, 0]}
      icon={homeBaseIcon}
    />
  );
};

export default HomeBaseLayer;
