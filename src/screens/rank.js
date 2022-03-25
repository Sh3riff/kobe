import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import dayjs from 'dayjs';
import Entypo from 'react-native-vector-icons/Entypo';
import {useGetKobe} from '../utils';
import RankCard from '../components/rankCard';
import RankDivider from '../components/rankDivider';

const Rank = () => {
  const {isLoading, error, data: kobeData} = useGetKobe();

  if (isLoading || error || !kobeData) {
    return null;
  }
  console.log(kobeData);
  const superConsistent = kobeData.filter(user => user.kobeScore >= 4.5);
  const consistent = kobeData.filter(
    user => user.kobeScore >= 4.0 && user.KobeScore < 4.5,
  );
  const inConsistent = kobeData.filter(user => user.kobeScore < 4.0);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={Style.screenView}>
        <View style={Style.scoreHeader}>
          <View style={Style.headerTextView}>
            <Text style={Style.text1}>Kobe Rank</Text>
            <Text style={Style.text2}>By {dayjs().format('MMMM D, YYYY')}</Text>
          </View>
          <Entypo name="trophy" color="#FFA828" size={40} />
        </View>
        <ScrollView>
          <RankDivider grade="best" />
          {superConsistent.length
            ? superConsistent.map(user => (
                <RankCard user={user} key={user.id} isColored />
              ))
            : null}
          <RankDivider grade="better" />
          {consistent.length
            ? consistent.map(user => <RankCard user={user} key={user.id} />)
            : null}
          <RankDivider grade="good" />
          {inConsistent.length
            ? inConsistent.map(user => <RankCard user={user} key={user.id} />)
            : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Rank;

const Style = StyleSheet.create({
  screenView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  scoreHeader: {
    height: 150,
    width: '100%',
    backgroundColor: '#E3E6FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  headerTextView: {
    marginRight: 12,
  },
  text1: {
    fontSize: 24,
    fontWeight: '600',
    color: '#11008f',
  },
  text2: {
    fontSize: 14,
    fontWeight: '400',
    color: '#11008f',
  },
});
