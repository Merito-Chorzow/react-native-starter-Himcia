import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeContext } from '../theme/ThemeContext';

export default function SettingsScreen() {
  const { themeName, setThemeName, theme } = useThemeContext();

  const themes = [
    { key: 'light', label: 'Jasny', icon: 'sunny', color: theme.colors.primary },
    { key: 'dark', label: 'Ciemny', icon: 'moon', color: theme.colors.accent },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.sectionTitle, { color: theme.colors.medium }]}>
        Wybierz motyw
      </Text>

      {themes.map((t) => (
        <TouchableOpacity
          key={t.key}
          style={[
            styles.item,
            { borderBottomColor: theme.colors.border },
            themeName === t.key && { backgroundColor: theme.colors.card },
          ]}
          onPress={() => setThemeName(t.key)}
        >
          <Ionicons name={t.icon} size={24} color={t.color} style={styles.icon} />
          <Text style={[styles.label, { color: theme.colors.text, fontFamily: theme.fonts.regular }]}>
            {t.label}
          </Text>
          {themeName === t.key && (
            <Ionicons name="checkmark" size={20} color={theme.colors.primary} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  header: { fontSize:24, fontWeight:'bold', marginBottom:20 },
  sectionTitle: { fontSize:18, fontWeight:'600', marginBottom:10 },
  item: {
    flexDirection:'row',
    alignItems:'center',
    paddingVertical:12,
    borderBottomWidth:1,
    borderRadius:8,
  },
  icon: { marginRight:12 },
  label: { flex:1, fontSize:16 },
});
