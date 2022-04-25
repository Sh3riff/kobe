import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import Loader from '../components/loader';
import TaskCard from '../components/taskCard';
import AddTask from '../components/addTask';
import {useGetUser, useGetKobe} from '../utils';

const Rank = () => {
  const {isLoading, error, data: userData} = useGetUser();
  const {isLoading: L1, error: E1, data: kobeData} = useGetKobe();

  if (isLoading || L1 || error || E1 || !userData || !kobeData) {
    return <Loader />;
  }

  const email = userData?.email;

  const {kobeScore, name} = kobeData.find(kobe => kobe.email === email);

  const consistency =
    kobeScore >= 4.5
      ? 'super consistent'
      : kobeScore >= 4.0
      ? 'consistent'
      : 'inconsistent';

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
