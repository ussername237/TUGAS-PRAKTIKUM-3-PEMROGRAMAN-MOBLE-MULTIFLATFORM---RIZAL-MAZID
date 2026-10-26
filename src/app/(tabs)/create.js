import React from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import EntryForm from '../../components/EntryForm';
import { useEntries } from '../../context/EntriesContext';
import { COLORS, SPACE, TYPO } from '../../styles/tokens';

export default function CreateRoute() {
  const { addEntry } = useEntries();

  const saveEntry = (entry) => {
    addEntry(entry);
    router.replace('/');
    Alert.alert('Berhasil', 'Catatan berhasil ditambahkan.');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title} accessibilityRole="header">
            Tambah Entri
          </Text>
          <Text style={styles.subtitle}>
            Simpan cerita dan pengalaman harianmu.
          </Text>
          <EntryForm onSubmit={saveEntry} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: SPACE.l,
    gap: SPACE.s,
  },
  title: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: TYPO.body,
    color: COLORS.muted,
  },
});
