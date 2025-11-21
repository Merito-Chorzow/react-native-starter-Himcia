import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeContext } from '../theme/ThemeContext';
import { useFocusEffect } from '@react-navigation/native';

export default function NotesScreen({ navigation }) {
  const { theme } = useThemeContext();
  const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) setNotes(JSON.parse(storedNotes));
      else setNotes([]);
    } catch (e) {
      console.log('Błąd przy ładowaniu notatek', e);
    }
  };

  const saveNotes = async (notesToSave) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(notesToSave));
    } catch (e) {
      console.log('Błąd przy zapisie notatek', e);
    }
  };

  const addNote = (newNote) => {
    const updated = [...notes, newNote];
    setNotes(updated);
    saveNotes(updated);
  };

  const updateNote = (updatedNote) => {
    const updated = notes.map((n) => (n.id === updatedNote.id ? updatedNote : n));
    setNotes(updated);
    saveNotes(updated);
  };

  const deleteNote = (id) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    saveNotes(updated);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadNotes();
    }, [])
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ color: theme.colors.medium, textAlign: 'center', marginTop: 20 }}>
            Write your first note!
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.noteItem, { borderBottomColor: theme.colors.border }]}
            onPress={() => navigation.navigate('NoteDetail', { note: item })}
          >
            <View style={styles.noteRow}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.noteTitle, { color: theme.colors.primary }]}>{item.title}</Text>
                <Text style={{ color: theme.colors.medium }} numberOfLines={1}>{item.text}</Text>
              </View>
              {item.imageUri && (
                <Image source={{ uri: item.imageUri }} style={styles.thumbnail} />
              )}
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('NoteForm', { addNote })}
      >
        <Ionicons name="add" size={32} color={theme.colors.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  noteItem: { paddingVertical:10, borderBottomWidth:1 },
  noteRow: { flexDirection:'row', alignItems:'center' },
  noteTitle: { fontWeight:'bold' },
  thumbnail: { width:60, height:60, marginLeft:10, borderRadius:6 },
  fab: {
    position:'absolute', right:20, bottom:20,
    width:60, height:60, borderRadius:30,
    justifyContent:'center', alignItems:'center',
  },
});
