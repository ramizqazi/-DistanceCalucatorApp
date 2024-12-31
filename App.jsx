import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { getPreciseDistance } from 'geolib';

const App = () => {
  const [marker1, setMarker1] = useState(null);
  const [marker2, setMarker2] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(1);
  const [distance, setDistance] = useState(0);
  const initialRegion = {
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 30,
    longitudeDelta: 30,
  };

  const handleMapPress = useCallback((event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    if (selectedMarker === 1) {
      setMarker1({ latitude, longitude });
      setSelectedMarker(2);
    } else {
      setMarker2({ latitude, longitude });
      setSelectedMarker(1);
    }
  }, [selectedMarker]);

  const calculateDistance = useCallback(() => {
    if (marker1 && marker2) {
      const dist = getPreciseDistance(
        { latitude: marker1.latitude, longitude: marker1.longitude },
        { latitude: marker2.latitude, longitude: marker2.longitude },
        0.01
      );
      setDistance(dist / 1000);
    }
  }, [marker1, marker2]);

  // Run when user selected both locatoin
  useEffect(() => {
    if (marker1 && marker2) {
      calculateDistance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marker1, marker2]);

  const resetMarkers = useCallback(() => {
    setMarker1(null);
    setMarker2(null);
    setDistance(0);
    setSelectedMarker(1);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={initialRegion}
        onPress={handleMapPress}
        moveOnMarkerPress={false}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        showsUserLocation={true}
      >
        {marker1 && (
          <Marker
            coordinate={marker1}
            pinColor="red"
            title="Marker 1"
          />
        )}
        {marker2 && (
          <Marker
            coordinate={marker2}
            pinColor="blue"
            title="Marker 2"
          />
        )}
      </MapView>

      <View style={styles.info}>
        <Text style={styles.distanceText}>
          Distance: {distance.toFixed(2)} km
        </Text>
        <Button
          title="Reset Markers"
          onPress={resetMarkers}
          disabled={!marker1 && !marker2}
        />
        <Text style={styles.instructionText}>
          Tap on the map to set {selectedMarker === 1 ? 'Marker 1 (Red)' : 'Marker 2 (Blue)'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 3,
  },
  info: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  distanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructionText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#666',
  },
  userMarkerContainer: {
    alignItems: 'center',
  },
  userAvatarContainer: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userMarkerPointer: {
    width: 12,
    height: 12,
    backgroundColor: 'white',
    transform: [{ rotate: '45deg' }],
    marginTop: -6,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default App;
