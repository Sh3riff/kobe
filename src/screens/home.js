import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import TaskCard from '../components/taskCard';
import AddTask from '../components/addTask';
import {useGetUser, useGetKobe} from '../utils';

const ud = {
  __v: 0,
  _id: '623d6cbdf6d118bb53c0d03e',
  dateCreated: '2022-03-25T07:18:21.519Z',
  displayName: 'Sheriff Olowolagba',
  email: 'sh3riff101@gmail.com',
  photoURL: '',
  tasks: [
    {
      dateCreated: 1648194150604,
      id: 'd07b7f57-5e3d-4145-ac6c-5fd70b32be43',
      lastUpdated: 1648200577482,
      name: 'taskOne',
      score: 5,
    },
    {
      dateCreated: 1648194169381,
      id: 'a9469e59-f7df-4887-bd51-ab960fd6bd6b',
      lastUpdated: 1648200618238,
      name: 'taskTwo',
      score: 5,
    },
  ],
};
const kb = {
  email: 'sh3riff101@gmail.com',
  id: '623d6cbdf6d118bb53c0d03e',
  kobeScore: '5.00',
  name: 'Sheriff',
  photoURL: '',
  position: 1,
};

const Rank = () => {
  const {isLoading, error, data: userData} = useGetUser();
  const {isLoading: L1, error: E1, data: kobeData} = useGetKobe();

  if (isLoading || L1 || error || E1 || !userData || !kobeData) {
    return null;
  }

  const email = userData?.email;

  const {kobeScore, name} = kobeData.find(kobe => kobe.email === email);

  const consistency =
    kobeScore >= 4.5
      ? 'super consistent'
      : kobeScore >= 4.0
      ? 'consistent'
      : 'inconsistent';

  // console.log(userKobeData)

  // console.log(userData);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={Style.screenView}>
        <View style={Style.infoView}>
          <Text style={Style.textName}>Hello {name},</Text>
          <Text style={Style.textKobe}>
            You have been {consistency} and your kobe is {kobeScore}
          </Text>
        </View>
        <View style={Style.listView}>
          <AddTask />
          {userData.tasks.length === 0 ? (
            <View style={Style.noTaskView}>
              <Text style={Style.noTaskText}>
                You do not have a task, Create one
              </Text>
            </View>
          ) : (
            <ScrollView style={Style.scroll}>
              {userData.tasks.map(task => (
                <TaskCard key={task.id} taskData={task} />
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Rank;

const Style = StyleSheet.create({
  screenView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  infoView: {
    padding: 24,
  },
  textName: {
    fontSize: 14,
    color: '#909090',
    marginBottom: 16,
  },
  textKobe: {
    fontSize: 18,
    fontWeight: '600',
    color: '#454545',
    width: 200,
  },
  listView: {
    flex: 1,
    paddingBottom: 32,
    // borderWidth: 2,
  },
  noTaskView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3E6FF',
    marginHorizontal: 32,
  },
  noTaskText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11008F',
  },
  scroll: {
    paddingBottom: 16,
  },
});
