import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useThemeContext } from '../theme/ThemeContext';

export default function NoteDetailScreen({ route, navigation }) {
  const { theme } = useThemeContext();
  const { note, updateNote, deleteNote } = route.params;
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);

  const saveChanges = () => {
    updateNote({ ...note, title, text });
    navigation.goBack();
  };

  const removeNote = () => {
    deleteNote(note.id);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
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
        placeholder="Write your note here..."
        placeholderTextColor={theme.colors.medium}
        multiline
      />
      <Button title="Save changes" color={theme.colors.primary} onPress={saveChanges} />
      <View style={{ marginTop:10 }}>
        <Button title="Delete Note" color={theme.colors.accent} onPress={removeNote} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  input: { borderWidth:1, padding:10, marginBottom:15, borderRadius:5 },
  textArea: { height:120, textAlignVertical:'top' },
});
