import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotesScreen from '../screens/NotesScreen';
import NoteFormScreen from '../screens/NoteFormScreen';
import NoteDetailScreen from '../screens/NoteDetailScreen';

const Stack = createNativeStackNavigator();

export default function NotesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NotesList" component={NotesScreen} options={{ title: 'Notes' }} />
      <Stack.Screen name="NoteForm" component={NoteFormScreen} options={{ title: 'New note' }} />
      <Stack.Screen name="NoteDetail" component={NoteDetailScreen} options={{ title: 'Edit note' }} />
    </Stack.Navigator>
  );
}
