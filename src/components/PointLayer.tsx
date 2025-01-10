import React from 'react';
import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.markercluster';
import defaultIconImage from '../icons/point.webp';

interface UserPoint {
  id: number;
  position: [number, number];
}

interface PointLayerProps {
  userPoints: UserPoint[];
  currentZoom: number;
}

const PointLayer: React.FC<PointLayerProps> = ({ userPoints, currentZoom }) => {
  const map = useMap();

  const [visiblePoints, setVisiblePoints] = React.useState<UserPoint[]>([]);

  React.useEffect(() => {
    const updateVisiblePoints = () => {
      const bounds = map.getBounds();
      const filteredPoints = userPoints.filter((user) =>
        bounds.contains(L.latLng(user.position))
      );
      setVisiblePoints(filteredPoints);
    };

    updateVisiblePoints();
    map.on('moveend', updateVisiblePoints);

    return () => {
      map.off('moveend', updateVisiblePoints);
    };
  }, [map, userPoints]);

  React.useEffect(() => {
    if (currentZoom < 6) {
      const markers = L.markerClusterGroup({
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        spiderfyOnMaxZoom: true,
        chunkedLoading: true,
      });

      visiblePoints.forEach((user) => {
        const marker = L.marker(user.position, {
          icon: L.icon({
            iconUrl: defaultIconImage,
            iconSize: [10, 10],
            iconAnchor: [5, 5],
          }),
        });
        markers.addLayer(marker);
      });

      map.addLayer(markers);

      return () => {
        map.removeLayer(markers);
      };
    }
  }, [visiblePoints, map, currentZoom]);

  return (
    <>
      {currentZoom === 6 &&
        visiblePoints.map((user) => (
          <Marker
            key={user.id}
            position={user.position}
            icon={L.icon({
              iconUrl: `https://robohash.org/${user.id}`,
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            })}
          />
        ))}
    </>
  );
};

export default PointLayer;
