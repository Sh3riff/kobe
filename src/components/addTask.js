import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useCreateTask} from '../utils';

const AddTask = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskName, setTaskName] = useState('');

  const {mutate} = useCreateTask();

  const createTaskHandler = () => {
    if (!taskName) {
      return;
    }
    mutate(taskName);
    setShowTaskForm(false)
  };

  return (
    <View style={Style.main}>
      <View style={Style.control}>
        <Text style={Style.textControl}>Your Tasks</Text>
        <TouchableOpacity
          style={Style.controlTouch}
          //   onPress={() => setShowTaskForm(!showTaskForm)}>
          //   onPress={() => updateTask('3dlJvjEu4ecqcIF9FRoC', 10)}>
          onPress={() => setShowTaskForm(!showTaskForm)}>
          <Feather
            name={showTaskForm ? 'x' : 'plus'}
            color="#ffffff"
            size={24}
          />
        </TouchableOpacity>
      </View>
      {showTaskForm && (
        <View style={Style.formView}>
          <Text style={Style.textControl}>Task Name</Text>
          <TextInput
            style={Style.inputStyle}
            placeholder="Task Name"
            onChangeText={setTaskName}
            value={taskName}
          />
          <TouchableOpacity onPress={createTaskHandler} style={Style.addButton}>
            <Text style={Style.addText}>Create Task</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AddTask;

const Style = StyleSheet.create({
  main: {
    marginHorizontal: 32,
    paddingVertical: 4,
  },
  control: {
    // borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  textControl: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3F464A',
  },
  controlTouch: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: '#2600FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formView: {
    backgroundColor: '#F1F1F1',
    padding: 12,
    borderRadius: 8,
  },
  inputStyle: {
    height: 46,
    width: '100%',
    backgroundColor: '#ffffff',
    marginTop: 8,
    paddingHorizontal: 8,
  },
  addButton: {
    backgroundColor: '#2600FF',
    marginTop: 16,
    height: 46,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  addText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});
