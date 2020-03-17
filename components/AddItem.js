import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

const AddItem = ({ addItem }) => {
  const [text, setText] = useState('');

  const onChange = textValue => setText(textValue);

  const handleSubmit = () => {
    addItem(text);
  };
  return (
    <View>
      <TextInput
        placeholder='Add Item...'
        style={styles.input}
        onChangeText={onChange}
      />
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 18,
    fontSize: 16
  },
  btn: {
    backgroundColor: '#baeae1',
    padding: 9,
    margin: 5
  },
  btnText: {
    color: '#12836d',
    fontSize: 20,
    textAlign: 'center'
  }
});

export default AddItem;
