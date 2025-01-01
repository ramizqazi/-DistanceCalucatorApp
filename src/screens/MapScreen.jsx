import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Feather from 'react-native-vector-icons/Feather';

import MapBottomCard from '../components/MapBottomCard';

const MapScreen = ({ navigation, route }) => {
  const [marker1, setMarker1] = useState(null);
  const [marker2, setMarker2] = useState(null);
  const [mapType, setMapType] = useState(route.params?.mapType || 'standard'); // Default to 'standard'
  const [selectedMarker, setSelectedMarker] = useState(1);

  // added asia as initial region
  const initialRegion = {
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 30,
    longitudeDelta: 30,
  };

  useEffect(() => {
    if (route.params?.mapType) {
      setMapType(route.params.mapType); // Update mapType from route params
    }
  }, [route.params?.mapType]);

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

  const handleSettingsPress = () => {
    navigation.navigate('Settings', { mapType }); // Pass current mapType to Settings
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.settingsIcon} onPress={handleSettingsPress}>
        <Feather name="settings" color="#888" size={22} />
      </TouchableOpacity>
      <MapView
        provider={PROVIDER_GOOGLE}
        mapType={mapType}
        style={styles.map}
        region={initialRegion}
        onPress={handleMapPress}
        moveOnMarkerPress={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        showsUserLocation={true} // for mark user location on map if you allowed permission
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
});

export default MapScreen;
