import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const Button = ({onPress, children}) => {
  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
      <Text style={styles.textStyle}> {children} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    // flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'red',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginHorizontal: 5,
    marginTop: 30,
  },
  textStyle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    padding: 10,
  },
});

export {Button};
