import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useThemeContext } from '../theme/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NoteDetailScreen({ route, navigation }) {
  const { theme } = useThemeContext();
  const { note } = route.params;
  const [title, setTitle] = useState(note?.title || '');
  const [text, setText] = useState(note?.text || '');

  const saveChanges = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      let notes = storedNotes ? JSON.parse(storedNotes) : [];
      notes = notes.map((n) =>
        n.id === note.id ? { ...n, title, text, imageUri: note.imageUri } : n
      );
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
      navigation.goBack();
    } catch (e) {
      console.log('Błąd przy zapisie zmian', e);
    }
  };

  const removeNote = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      let notes = storedNotes ? JSON.parse(storedNotes) : [];
      notes = notes.filter((n) => n.id !== note.id);
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
      navigation.goBack();
    } catch (e) {
      console.log('Błąd przy usuwaniu notatki', e);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {note?.imageUri && (
        <Image source={{ uri: note.imageUri }} style={styles.image} />
      )}

      <TextInput
        style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        placeholderTextColor={theme.colors.medium}
      />
      <TextInput
        style={[styles.input, styles.textArea, { borderColor: theme.colors.border, color: theme.colors.text }]}
        value={text}
        onChangeText={setText}
        placeholder="Something..."
        placeholderTextColor={theme.colors.medium}
        multiline
      />

      <Button title="Save" color={theme.colors.primary} onPress={saveChanges} />
      <View style={{ marginTop:10 }}>
        <Button title="Delete" color={theme.colors.accent} onPress={removeNote} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  input: { borderWidth:1, padding:10, marginBottom:15, borderRadius:5 },
  textArea: { height:120, textAlignVertical:'top' },
  image: { width:'100%', height:250, marginBottom:15, borderRadius:8 },
});
