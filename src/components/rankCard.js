import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {gradeUser} from '../utils';

const windowWidth = Dimensions.get('window').width;

const RankCard = ({user, isColored}) => {
  const cardIsColored = isColored ? {backgroundColor: '#2600ff'} : {};
  const textIsColored = isColored ? {color: '#ffffff'} : {color: '#565555'};
  return (
    <View style={[Style.card, cardIsColored]}>
      <View style={Style.innerGroup}>
        <Text style={[Style.text1, textIsColored]}>
          {gradeUser(user?.position)}
        </Text>
        <FontAwesome
          name="user-circle"
          color={isColored ? '#ffffff' : '#565555'}
          size={40}
        />
        <Text style={[Style.text2, textIsColored]}>{user?.name}</Text>
      </View>
      <View style={Style.innerGroup}>
        <Text style={[Style.text3, textIsColored]}>{user?.kobeScore}</Text>
        <Entypo name="star" color="#FFA828" size={20} />
      </View>
    </View>
  );
};

export default RankCard;

const Style = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginTop: 16,
    height: 80,
    width: windowWidth - 20,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
  },
  innerGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text1: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 30,
  },
  text2: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 16,
  },
  text3: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 5,
  },
});
