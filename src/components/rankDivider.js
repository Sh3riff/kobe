import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const RankDivider = ({grade}) => {
  const gradeHeader =
    grade === 'best'
      ? 'Super Consistent class'
      : grade === 'better'
      ? 'Consistent class'
      : 'Inconsistent class';
  const gradeScale =
    grade === 'best'
      ? '4.5 - 5.0'
      : grade === 'better'
      ? '4.0 - 4.49'
      : '3.99 - Below';
  return (
    <View style={Style.card}>
      <Text style={Style.text1}>{gradeHeader}</Text>
      <Text style={Style.text2}>{gradeScale}</Text>
    </View>
  );
};

export default RankDivider;

const Style = StyleSheet.create({
  card: {
    marginTop: 16,
    borderTopWidth: 0.5,
    borderColor: '#c8c9ce',
    paddingTop: 8,
  },
  text1: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 30,
    color: '#0B024E',
  },
  text2: {
    fontSize: 12,
    fontWeight: '400',
    color: '#565555',
  },
});
