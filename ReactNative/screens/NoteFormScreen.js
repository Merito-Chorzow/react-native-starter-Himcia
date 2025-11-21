import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useThemeContext } from '../theme/ThemeContext';

export default function NoteFormScreen({ navigation, route }) {
  const { theme } = useThemeContext();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const saveNote = () => {
    if (title.trim() || text.trim() || imageUri) {
      const newNote = { id: Date.now().toString(), title, text, imageUri };
      route.params?.addNote(newNote); // przekazanie do NotesScreen
      navigation.goBack();
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
        placeholder="Write something..."
        placeholderTextColor={theme.colors.medium}
        value={text}
        onChangeText={setText}
        multiline
      />

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={pickImage}>
          <Button title="From Gallery" color={theme.colors.primary} onPress={pickImage} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.secondary }]} onPress={takePhoto}>
          <Button title="Camera" color={theme.colors.primary} onPress={takePhoto} />
        </TouchableOpacity>
      </View>

      <Button title="Save" color={theme.colors.primary} onPress={saveNote} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  input: { borderWidth:1, padding:10, marginBottom:15, borderRadius:5 },
  textArea: { height:120, textAlignVertical:'top' },
  imagePreview: { width:'100%', height:200, marginBottom:15, borderRadius:8 },
  buttonsRow: { flexDirection:'row', justifyContent:'space-between', marginBottom:15 },
  button: { flex:1, marginHorizontal:5, borderRadius:8 },
});
