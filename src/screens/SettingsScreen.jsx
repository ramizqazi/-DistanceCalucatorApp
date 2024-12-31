import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, StatusBar } from 'react-native';

const SettingsScreen = ({ route, navigation }) => {
  const { mapType } = route.params;
  const [localMapType, setLocalMapType] = useState(mapType);

  const handleSaveSettings = () => {
    navigation.navigate('Map', { mapType: localMapType });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
      <View>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>Map Type:</Text>
          <Picker
            selectedValue={localMapType}
            onValueChange={(value) => setLocalMapType(value)}
            style={styles.picker}
          >
            <Picker.Item label="Standard" value="standard" />
            <Picker.Item label="Satellite" value="satellite" />
            <Picker.Item label="Terrain" value="terrain" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveSettings}
      >
        <Text style={styles.saveButtonText}>Save & Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  optionLabel: {
    fontSize: 18,
    color: '#555',
    flex: 1,
  },
  picker: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#000',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SettingsScreen;
