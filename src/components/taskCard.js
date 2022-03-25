import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import dayjs from 'dayjs';
import {useUpdateTask} from '../utils'

const windowWidth = Dimensions.get('window').width;

const TaskCard = ({taskData}) => {
  const {name, score, id, lastUpdated} = taskData;
  const {mutate} = useUpdateTask();

  // score / since
  const taskDuration = dayjs().diff(lastUpdated, 'day') + 1;
  const taskScore = lastUpdated ? (score / taskDuration).toFixed(2) : '-.--';
  const updatedToday = lastUpdated && dayjs().diff(lastUpdated, 'day') === 0 ? true : false;

  const updateScore = () => {
    if (updatedToday) {
      return;
    }
    mutate(id);
  };

  return (
    <View style={Style.card}>
      <View style={Style.cardInfo}>
        <Text style={Style.textTask}>{name}</Text>
        <View style={Style.cardInfoInner}>
          <Text style={Style.textKobe}>{taskScore}</Text>
          <Entypo name="star" color="#FFA828" size={36} />
        </View>
      </View>
      <TouchableOpacity
        onPress={updateScore}
        // eslint-disable-next-line react-native/no-inline-styles
        style={[Style.touch, updatedToday && {backgroundColor: 'lightgrey'}]}>
        <Feather
          name="check"
          size={24}
          color={updatedToday ? '#909090' : '#43AE47'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TaskCard;

const Style = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginTop: 16,
    height: 100,
    width: windowWidth - 64,
    marginLeft: 32,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#eceefd',
  },
  cardInfo: {
    // borderWidth: 2,
  },
  cardInfoInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTask: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#11008F',
  },
  textKobe: {
    fontSize: 32,
    fontWeight: '600',
    marginRight: 12,
    color: '#0A014D',
  },
  touchContainer: {
    flexDirection: 'row',
  },
  touch: {
    height: 50,
    width: 50,
    backgroundColor: '#A6DEB9B0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
  },
});
