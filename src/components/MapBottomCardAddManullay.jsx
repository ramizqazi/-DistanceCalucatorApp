/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = Yup.object().shape({
  latitude1: Yup.number()
    .required('Please fill in Latitude 1')
    .typeError('Latitude 1 must be a number'),
  longitude1: Yup.number()
    .required('Please fill in Longitude 1')
    .typeError('Longitude 1 must be a number'),
  latitude2: Yup.number()
    .required('Please fill in Latitude 2')
    .typeError('Latitude 2 must be a number'),
  longitude2: Yup.number()
    .required('Please fill in Longitude 2')
    .typeError('Longitude 2 must be a number'),
});

const MapBottomCardAddManullay = ({ setMarker1, setMarker2, jumpTo }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    setMarker1({ latitude: data.latitude1, longitude: data.longitude1 });
    setMarker2({ latitude: data.latitude2, longitude: data.longitude2 });
    jumpTo('results');
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, rowGap: 20 }}>
        <View style={styles.inputContainer}>
          <View style={{ flex: 1 }}>
            {/* Location 1 Inputs */}
            <Controller
              name="latitude1"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.latitude1 && styles.errorInput]}
                  placeholder="Latitude 1"
                  onBlur={onBlur}
                  placeholderTextColor="#ccc"
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.latitude1 && <Text style={styles.errorText}>{errors.latitude1.message}</Text>}
          </View>
          <View style={{ flex: 1 }}>
            <Controller
              name="longitude1"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.longitude1 && styles.errorInput]}
                  placeholder="Longitude 1"
                  onBlur={onBlur}
                  placeholderTextColor="#ccc"
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.longitude1 && <Text style={styles.errorText}>{errors.longitude1.message}</Text>}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={{ flex: 1 }}>
            {/* Location 2 Inputs */}
            <Controller
              name="latitude2"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.latitude2 && styles.errorInput]}
                  placeholder="Latitude 2"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholderTextColor="#ccc"
                  value={value}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.latitude2 && <Text style={styles.errorText}>{errors.latitude2.message}</Text>}
          </View>
          <View style={{ flex: 1 }}>
            <Controller
              name="longitude2"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.longitude2 && styles.errorInput]}
                  placeholder="Longitude 2"
                  onBlur={onBlur}
                  placeholderTextColor="#ccc"
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.longitude2 && <Text style={styles.errorText}>{errors.longitude2.message}</Text>}
          </View>
        </View>
      </View>
      {/* Calculate Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    padding: 20,
    backgroundColor: 'white',
  },
  inputContainer: {
    columnGap: 10,
    flexDirection: 'row',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 5,
    fontSize: 16,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },
});

export default MapBottomCardAddManullay;
