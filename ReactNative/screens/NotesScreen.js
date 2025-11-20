import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ← brakujący import
import { useThemeContext } from '../theme/ThemeContext';

export default function NotesScreen({ navigation, route }) {
  const { theme } = useThemeContext();
  const [notes, setNotes] = useState([]);

  // Ładowanie notatek z pamięci
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('notes');
        if (storedNotes) setNotes(JSON.parse(storedNotes));
      } catch (e) {
        console.log('Błąd przy ładowaniu notatek', e);
      }
    };
    loadNotes();
  }, []);

  // Dodawanie nowej notatki
  useEffect(() => {
    if (route.params?.newNote) {
      const updatedNotes = [...notes, route.params.newNote];
      setNotes(updatedNotes);
      AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      navigation.setParams({ newNote: null });
    }
  }, [route.params]);

  // Aktualizacja notatki
  const updateNote = (updatedNote) => {
    const updatedNotes = notes.map((n) =>
      n.id === updatedNote.id ? updatedNote : n
    );
    setNotes(updatedNotes);
    AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  // Usuwanie notatki
  const deleteNote = (id) => {
    const updatedNotes = notes.filter((n) => n.id !== id);
    setNotes(updatedNotes);
    AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.noteItem, { borderBottomColor: theme.colors.border }]}
            onPress={() =>
              navigation.navigate('NoteDetail', { note: item, updateNote, deleteNote })
            }
          >
            <Text style={[styles.noteTitle, { color: theme.colors.primary }]}>
              {item.title}
            </Text>
            <Text style={{ color: theme.colors.medium }} numberOfLines={1}>
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('NoteForm')}
      >
        <Ionicons name="add" size={32} color={theme.colors.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  noteItem: { padding:10, borderBottomWidth:1 },
  noteTitle: { fontWeight:'bold' },
  fab: {
    position:'absolute', right:20, bottom:20,
    width:60, height:60, borderRadius:30,
    justifyContent:'center', alignItems:'center',
  },
});
