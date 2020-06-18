import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Card = props => {
  return <View style={styles.containerStyle}>{props.children}</View>;
};

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ddd',
    shadowColor: '#000',
    backgroundColor: '#87cefa',
    height: 200,
    width: 150,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginHorizontal: 5,
    marginTop: 10,
    elevation: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
});

export {Card};
