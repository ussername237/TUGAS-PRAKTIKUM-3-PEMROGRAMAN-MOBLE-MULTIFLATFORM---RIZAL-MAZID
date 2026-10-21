import React, { useState } from 'react';

import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

import { COLORS, SPACE, RADIUS, MIN_TOUCH } from '../styles/tokens';

export default function SearchBar({
  placeholder = 'Cari entri diary...',
  onChange,
}) {
  const [queryText, setQueryText] = useState('');

  const handleChange = (text) => {
    setQueryText(text);

    if (typeof onChange === 'function') {
      onChange(text);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={queryText}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor={COLORS.muted}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityLabel="Cari catatan diary"
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACE.l,
    paddingVertical: SPACE.s,
  },

  input: {
    minHeight: MIN_TOUCH,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.m,
    paddingHorizontal: SPACE.m,
    fontSize: 16,
    color: COLORS.text,
  },
});