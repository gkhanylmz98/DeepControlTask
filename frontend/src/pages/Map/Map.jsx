import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import styles from "./Map.module.scss"
import coordinates from 'constants/coordinates';
import markerIcons from 'constants/markerIcons';
import { useState } from 'react';
import { useAuthContext } from 'context/authContext';

const Map = () => {
  const { logout } = useAuthContext();
  const [isVisibleLine, setIsVisibleLine] = useState(true);
  const [isVisibleLastLocation, setIsVisibleLastLocation] = useState(false);

  return (
    <div className={styles.map}>

      <button
        onClick={() => setIsVisibleLine(!isVisibleLine)}
        className={styles.line}
      >
        Line {isVisibleLine ? 'Hide' : 'Show'}
      </button>
      <button
        onClick={() => setIsVisibleLastLocation(!isVisibleLastLocation)}
        className={styles.location}
      >
        Only Show Last Location
      </button>
      <button
        onClick={() => logout()}
        className={styles.logout}
      >
        Logout
      </button>
     
      <MapContainer
        center={coordinates.CANKAYA_BELEDIYE}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: '100vw', height: '100vh', zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {isVisibleLastLocation ? (
          <Marker
            icon={markerIcons.LAST_ICON}
            key={'LAST_ICON'}
            position={
              coordinates[
                Object.keys(coordinates)[Object.keys(coordinates).length - 1]
              ]
            }
          ></Marker>
        ) : (
          Object.keys(coordinates).map((item, index) => {
            if (index === 0) {
              return (
                <Marker
                  icon={markerIcons.FIRST_ICON}
                  key={item}
                  position={coordinates[item]}
                ></Marker>
              );
            }

            if (index === Object.keys(coordinates).length - 1) {
              return (
                <Marker
                  icon={markerIcons.LAST_ICON}
                  key={item}
                  position={coordinates[item]}
                ></Marker>
              );
            }

            return (
              <Marker
                icon={markerIcons.DEFAULT_ICON}
                key={item}
                position={coordinates[item]}
              ></Marker>
            );
          })
        )}

        {isVisibleLine && !isVisibleLastLocation && (
          <Polyline
            pathOptions={{ color: 'red', weight: 5 }}
            positions={Object.values(coordinates)}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
