import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import styles from './AddScreen.styles';
import Categories from '../components/Categories';
import DEFAULT_CATEGORIES from '../components/defaultCategories';
import theme from '../components/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

function formatDate(date) {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function AddScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params || {};

  // allow embedding: prefer prop `initialCategory` over route params
  const initialDate = params.date ? new Date(params.date) : new Date();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(formatDate(initialDate));
  const [category, setCategory] = useState(props.initialCategory || params.category || null);

  useEffect(() => {
    if (props.initialCategory) setCategory(props.initialCategory);
  }, [props.initialCategory]);

  async function save() {
    if (!title.trim()) {
      Alert.alert('Please enter a title');
      return;
    }

    const task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      date,
      category,
    };

    try {
      const raw = await AsyncStorage.getItem('tasks');
      const tasks = raw ? JSON.parse(raw) : [];
      tasks.push(task);
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      Alert.alert('Saved', 'Task saved successfully');
      if (props.onClose) props.onClose();
      else navigation.goBack();
    } catch (err) {
      console.error('Save error', err);
      Alert.alert('Error', 'Unable to save task');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Add Item</Text>

        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholderTextColor="rgba(0,0,0,0.3)"
        />

        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, { height: 100 }]}
          multiline
          placeholderTextColor="rgba(0,0,0,0.3)"
        />

        <TextInput
          placeholder="Date (YYYY-MM-DD)"
          value={date}
          onChangeText={setDate}
          style={styles.input}
        />

        <Text style={{ marginTop: 12, color: theme.lightText }}>Choose category</Text>
        <Categories selectedCategory={category} onSelectCategory={setCategory} categories={DEFAULT_CATEGORIES} />

        <View style={styles.actions}>
          <TouchableOpacity style={styles.button} onPress={() => (props.onClose ? props.onClose() : navigation.goBack())}>
            <Text style={{ color: theme.primary }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={save}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

