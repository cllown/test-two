import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import PointLayer from './PointLayer';
import HomeBaseLayer from './HomeBaseLayer';
import regions from '../data/regions';
import homeIcon from '../icons/home.webp'

const GlobalMap: React.FC = () => {
  const position: [number, number] = [0, 0];
  const homeBasePosition: [number, number] = [0, 0];
  const [currentZoom, setCurrentZoom] = useState(4);
  const [isCenteredOnBase, setIsCenteredOnBase] = useState(false);

  const navigate = useNavigate();

  const userPoints = useMemo(() => generatePlayerPoints(10000), []);

  const GridUpdater = () => {
    const map = useMap();

    React.useEffect(() => {
      const updateZoom = () => {
        const zoom = map.getZoom();
        const center = map.getCenter();
        setCurrentZoom(zoom);

        const isCentered =
          zoom === 6 &&
          Math.abs(center.lat - homeBasePosition[0]) < 0.01 &&
          Math.abs(center.lng - homeBasePosition[1]) < 0.01;

        setIsCenteredOnBase(isCentered);
      };

      map.on('zoomend', updateZoom);
      map.on('moveend', updateZoom);
      updateZoom();

      return () => {
        map.off('zoomend', updateZoom);
        map.off('moveend', updateZoom);
      };
    }, [map]);

    return null;
  };

  const CenterButton = () => {
    const map = useMap();

    const handleCenter = () => {
      if (isCenteredOnBase) {
        navigate('/base'); 
      } else {
        map.setView(homeBasePosition, 6); 
      }
    };

    return (
      <button
      onClick={handleCenter}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#FFD700',
        border: 'none',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        }}
      >
      <img
        src={homeIcon}
        alt="Go to Home Base"
        style={{ width: '32px', height: '32px' }}
      />
      </button>
    );
  };

  return (
    <MapContainer
      zoomControl={false}
      center={position}
      zoom={1}
      minZoom={1}
      maxZoom={6}
      scrollWheelZoom={true}
      style={{ height: '100vh', width: '100vw' }}
    >
      <CenterButton />
      <TileLayer url="/Mapnik/{z}/{x}/{y}.jpg" />

      {regions.map((region, index) => (
        <React.Fragment key={index}>
          <Polygon
            positions={region.boundaries}
            pathOptions={{
              color: region.color,
              weight: 2,
            }}
          />
          {currentZoom >= 1 &&
            currentZoom <= 5 &&
            region.boundaries.map((line, i) => (
              <Polyline
                key={i}
                positions={[line]}
                pathOptions={{
                  color: region.color,
                  weight: 1,
                  opacity: 0.2,
                }}
              />
            ))}
        </React.Fragment>
      ))}

      {currentZoom <= 2 ? (
        <HomeBaseLayer />
      ) : (
        <>
          <HomeBaseLayer />
          <PointLayer userPoints={userPoints} currentZoom={currentZoom} />
        </>
      )}

      <GridUpdater />
    </MapContainer>
  );
};

const generatePlayerPoints = (count: number): { id: number; position: [number, number] }[] => {
  const points = [];
  const latMin = -85;
  const latMax = 85;
  const lngMin = -180;
  const lngMax = 180;

  for (let i = 0; i < count; i++) {
    const lat = Math.random() * (latMax - latMin) + latMin;
    const lng = Math.random() * (lngMax - lngMin) + lngMin;
    points.push({ id: i, position: [lat, lng] as [number, number] });
  }

  return points;
};

export default GlobalMap;
