import React from 'react';
import {StyleSheet, View} from 'react-native';

const HorizontalCard = props => {
  return <View style={styles.containerStyle}>{props.children}</View>;
};

const styles = StyleSheet.create({
  containerStyle: {
    width: '90%',
    height: 80,
    backgroundColor: '#87cefa',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});

export {HorizontalCard};
