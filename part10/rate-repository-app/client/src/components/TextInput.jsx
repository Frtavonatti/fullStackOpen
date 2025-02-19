import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  onSuccess: {
    borderColor: '#1e90ff',
  },
  onError: {
    borderColor: '#d73a4a'
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    styles.input,
    error ? styles.onError : styles.onSuccess,
    style
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;