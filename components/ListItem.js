import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ListItem = ({ item, deleteItem, toggleCompleted }) => {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => toggleCompleted(item.id)}
    >
      <View style={styles.listItemView} onPress={toggleCompleted}>
        <Text
          style={item.completed ? styles.listItemFalse : styles.listItemText}
        >
          {item.title}
        </Text>
        <Ionicons
          name='md-remove-circle'
          size={30}
          color='#ffb2b2'
          onPress={() => deleteItem(item.id)}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#f1faf9',
    borderBottomWidth: 1,
    borderColor: '#75d6c3'
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listItemText: {
    fontSize: 18
  },
  listItemFalse: {
    fontSize: 18,
    textDecorationLine: 'line-through'
  }
});

export default ListItem;
