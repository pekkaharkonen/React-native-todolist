import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  ToolbarAndroid
} from 'react-native';
import Header from './components/Header';
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAndSetTasksFromApi();
  }, []);

  const getAndSetTasksFromApi = async () => {
    let data = await fetch(
      'https://jsonplaceholder.typicode.com/todos?_limit=4',
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );
    let dataParsed = await data.json();
    setItems(dataParsed);
  };

  const deleteItem = async id => {
    //Removing from the list first for better responsiveness
    setItems(prevItems => {
      return prevItems.filter(item => item.id !== id);
    });
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE'
    });
  };

  const addItem = async title => {
    // let ids = items.map(item => item.id);
    // let idMax = Math.max(...ids);
    // setItems([{ id: idMax + 1, title }, ...items]);
    console.log(title);
    let response = await fetch(
      'https://jsonplaceholder.typicode.com/todos',

      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ title, completed: false })
      }
    );
    console.log(response);
    let parsed = await response.json();
    setItems([parsed, ...items]);
  };

  const toggleCompleted = async id => {
    let itemToBeChanged;
    //Changing UI first for responsiveness
    let newItems = items.map(item => {
      if (item.id === id) {
        item.completed = !item.completed;
        itemToBeChanged = item;
      }
      return item;
    });
    setItems(newItems);
    //PUT request after
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,

      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(itemToBeChanged)
      }
    );
    let parsed = await response.json();
    console.log(parsed);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <AddItem addItem={addItem} />
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            deleteItem={deleteItem}
            toggleCompleted={toggleCompleted}
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0
  }
});

export default App;
