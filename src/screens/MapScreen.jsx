import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Feather from 'react-native-vector-icons/Feather';

import MapBottomCard from '../components/MapBottomCard';

const MapScreen = ({ navigation, route }) => {
  const [marker1, setMarker1] = useState(null);
  const [marker2, setMarker2] = useState(null);
  const [mapType, setMapType] = useState(route.params?.mapType || 'standard'); // Sync mapType
  const [selectedMarker, setSelectedMarker] = useState(1);
  const initialRegion = {
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 30,
    longitudeDelta: 30,
  };

  useEffect(() => {
    if (route.params?.mapType) {
      setMapType(route.params.mapType);
    }
  }, [route.params]);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    if (selectedMarker === 1) {
      setMarker1({ latitude, longitude });
      setSelectedMarker(2);
    } else {
      setMarker2({ latitude, longitude });
      setSelectedMarker(1);
    }
  };

  const resetMarkers = useCallback(() => {
    setMarker1(null);
    setMarker2(null);
    setSelectedMarker(1);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate('Settings', { mapType })}>
        <Feather name="settings" color="#888" size={22} />
      </TouchableOpacity>
      <MapView
        provider={PROVIDER_GOOGLE}
        mapType={mapType}
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

      <MapBottomCard
        selectedMarker={selectedMarker}
        marker1={marker1}
        marker2={marker2}
        setMarker1={setMarker1}
        setMarker2={setMarker2}
        onResetMarkers={resetMarkers}
      />
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
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: -30,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
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
  settingsIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    zIndex: 10,
    elevation: 10,
  },
  settingsText: {
    fontSize: 24,
    color: '#333',
  },
});

export default MapScreen;
