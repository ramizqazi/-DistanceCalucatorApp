import React, { useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';

import MapBottomCardResults from './MapBottomCardResults';
import MapBottomCardAddManullay from './MapBottomCardAddManullay';

const routes = [
  { key: 'results', title: 'Results' },
  { key: 'addLatLong', title: 'Add lat/long Manually' },
];

const MapBottomCard = ({ selectedMarker, marker1, marker2, onResetMarkers, setMarker1, setMarker2 }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'results':
        return <MapBottomCardResults jumpTo={jumpTo} marker1={marker1} marker2={marker2} onResetMarkers={onResetMarkers} selectedMarker={selectedMarker} />;
      case 'addLatLong':
        return <MapBottomCardAddManullay jumpTo={jumpTo} setMarker1={setMarker1} setMarker2={setMarker2} />;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      style={styles.container}
      // set width of tabview to full screen
      initialLayout={{ width: layout.width }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginTop: -40,
    backgroundColor: 'white',
  },
});


export default MapBottomCard;
