import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useThemeContext } from '../theme/ThemeContext';

export default function NoteFormScreen({ navigation }) {
  const { theme } = useThemeContext();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const saveNote = () => {
    if (title.trim() || text.trim()) {
      const newNote = { id: Date.now().toString(), title, text };
      navigation.navigate('NotesList', { newNote });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TextInput
        style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
        placeholder="Title"
        placeholderTextColor={theme.colors.medium}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea, { borderColor: theme.colors.border, color: theme.colors.text }]}
        placeholder="Write your note here..."
        placeholderTextColor={theme.colors.medium}
        value={text}
        onChangeText={setText}
        multiline
      />
      <Button title="Save" color={theme.colors.primary} onPress={saveNote} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  input: { borderWidth:1, padding:10, marginBottom:15, borderRadius:5 },
  textArea: { height:120, textAlignVertical:'top' },
});
