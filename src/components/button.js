import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const Button = ({text, handler, moreStyles}) => {
  const moreStyles_ = moreStyles || {};
  return (
    <TouchableOpacity onPress={handler} style={[Style.button, moreStyles_]}>
      <Text style={Style.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const Style = StyleSheet.create({
  button: {
    backgroundColor: '#2600FF',
    // marginHorizontal: 16,
    height: 60,
    width: windowWidth - 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});
