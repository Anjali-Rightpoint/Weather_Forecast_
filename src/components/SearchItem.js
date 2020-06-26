import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const SearchItem = ({children}) => {
  return <Text style={styles.textStyle}> {children} </Text>;
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    padding: 20,
    height: 60,
  },
});

export default SearchItem;
