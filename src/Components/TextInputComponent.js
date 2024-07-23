import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const TextInputComponent = props => {
  return (
    <View>
      <TextInput
        {...props}
        style={[props.style, styles.input]}
        placeholderTextColor={props.placeholderTextColor || '#000'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 318,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: '#A9A9A9',
    borderRadius: 10,
  },
});
export default TextInputComponent;
