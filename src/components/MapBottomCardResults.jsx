import { getPreciseDistance } from 'geolib';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const MapBottomCardResults = ({ onResetMarkers, selectedMarker, marker1, marker2 }) => {
  const [distance, setDistance] = useState(0);

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

  return (
    <View style={styles.info}>
      <Text style={styles.distanceText}>
        Distance: {distance.toFixed(2)} km
      </Text>
      <Button
        title="Reset Markers"
        onPress={() => {
          onResetMarkers();
          setDistance(0);
        }}
        disabled={!marker1 && !marker2}
      />
      <Text style={styles.instructionText}>
        Tap on the map to set {selectedMarker === 1 ? 'Marker 1 (Red)' : 'Marker 2 (Blue)'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    flex: 1.5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
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
});

export default MapBottomCardResults;
