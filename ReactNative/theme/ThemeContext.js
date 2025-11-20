import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LightTheme, DarkTheme } from './Themes';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState('light');

  const themes = {
    light: LightTheme,
    dark: DarkTheme,
  };

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('themeName');
        if (savedTheme) {
          setThemeName(savedTheme);
        }
      } catch (e) {
        console.log('Błąd przy ładowaniu motywu', e);
      }
    };
    loadTheme();
  }, []);

  const changeTheme = async (name) => {
    setThemeName(name);
    try {
      await AsyncStorage.setItem('themeName', name);
    } catch (e) {
      console.log('Błąd przy zapisie motywu', e);
    }
  };

  const theme = themes[themeName];

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName: changeTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
