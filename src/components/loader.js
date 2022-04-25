import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const Loader = () => {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator color="#2600FF" size="large" />
    </View>
  );
};

export default Loader;
