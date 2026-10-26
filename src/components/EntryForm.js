import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export default function EntryForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(getToday);
  const [preview, setPreview] = useState('');

  const canSubmit =
    title.trim().length > 0 &&
    date.trim().length > 0 &&
    preview.trim().length > 0;

  const submit = () => {
    if (!canSubmit) {
      Alert.alert(
        'Data belum lengkap',
        'Judul, tanggal, dan isi catatan harus diisi.'
      );
      return;
    }

    if (typeof onSubmit !== 'function') {
      Alert.alert(
        'Terjadi kesalahan',
        'Fungsi penyimpanan catatan belum terhubung.'
      );
      return;
    }

    const newEntry = {
      title: title.trim(),
      date: date.trim(),
      preview: preview.trim(),
      body: preview.trim(),
      moodUri: 'https://picsum.photos/seed/default/200',
      heroUri: 'https://picsum.photos/seed/defaulthero/800/450',
    };

    onSubmit(newEntry);

    setTitle('');
    setDate(getToday());
    setPreview('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Tambah Diary Baru
      </Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Judul diary"
        style={styles.input}
        accessibilityLabel="Judul diary"
      />

      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        style={styles.input}
        accessibilityLabel="Tanggal diary"
      />

      <TextInput
        value={preview}
        onChangeText={setPreview}
        placeholder="Ceritakan kegiatanmu..."
        style={[styles.input, styles.multiline]}
        multiline
        textAlignVertical="top"
        accessibilityLabel="Isi catatan diary"
      />

      <Pressable
        onPress={submit}
        disabled={!canSubmit}
        style={[
          styles.button,
          !canSubmit && styles.disabledButton,
        ]}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>
          Simpan Diary
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    gap: 10,
  },

  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1F2937',
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: '#1F2937',
  },

  multiline: {
    minHeight: 80,
  },

  button: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  disabledButton: {
    opacity: 0.5,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});