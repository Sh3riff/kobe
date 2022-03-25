import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Alert,
  Image,
} from 'react-native';
import Auth from 'react-native-firebaseui-auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Button from '../components/button';
import {useAppContext} from '../../App';
import {useGetUser, useGetKobe, gradeUser} from '../utils';

const Profile = () => {
  const {logout} = useAppContext();
  const {isLoading, error, data: userData} = useGetUser();
  const {isLoading: L1, error: E1, data: kobeData} = useGetKobe();

  if (isLoading || L1 || error || E1 || !userData || !kobeData) {
    return null;
  }

  const displayName = userData?.displayName;
  const email = userData?.email;
  const photoURL = userData?.photoURL;

  // find Kobe from kobeData List
  const userKobeData = kobeData.find(kobe => kobe.email === email);
  const userKobe = userKobeData.kobeScore;
  const userPositon = gradeUser(userKobeData?.position);
  const logoutAlert = () =>
    Alert.alert('Logout', 'You are about to logout', [
      {text: 'Cancel', onPress: () => {}, style: 'cancel'},
      {
        text: 'Logout',
        onPress: () => {
          Auth.signOut().then(res => {});
          logout();
        },
      },
    ]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={Style.screenView}>
        <View style={Style.imageContainer}>
          {photoURL ? (
            <Image style={Style.picture} source={{uri: photoURL}} />
          ) : (
            <FontAwesome name="user-circle" color="#2600FF" size={125} />
          )}
        </View>
        <Text style={Style.textName}>{displayName}</Text>
        <Text style={Style.textEmail}>({email})</Text>
        <View style={Style.scoreContainer}>
          <View style={Style.scoreCard}>
            <Text style={Style.textScore}>{userKobe}</Text>
            <View style={Style.scoreCardMore}>
              <Entypo name="star" color="#FFA828" size={20} />
              <Text style={Style.textScoreName}>Kobe</Text>
            </View>
          </View>
          <View style={Style.scoreCard}>
            <Text style={Style.textScore}>{userPositon}</Text>
            <View style={Style.scoreCardMore}>
              <Entypo name="trophy" color="#FFA828" size={16} />
              <Text style={Style.textScoreName}>Rank</Text>
            </View>
          </View>
        </View>
        <Button text="Logout" handler={logoutAlert} moreStyles={Style.logout} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const Style = StyleSheet.create({
  screenView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    height: 140,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 140,
    marginTop: 60,
  },
  picture: {
    height: 125,
    width: 125,
    borderRadius: 125,
  },
  textName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000049',
    marginTop: 20,
  },
  textEmail: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  scoreContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 24,
  },
  scoreCard: {
    height: 100,
    backgroundColor: '#2600FF',
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textScore: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
  },
  scoreCardMore: {
    flexDirection: 'row',
    marginTop: 6,
  },
  textScoreName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    marginLeft: 6,
  },
  logout: {
    position: 'absolute',
    bottom: 30,
  },
});
