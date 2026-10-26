import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACE, TYPO } from '../styles/tokens';

export default function AboutRoute() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title} accessibilityRole="header">
          Tentang Diary App
        </Text>
        <Text style={styles.body}>
          Diary App membantu mencatat cerita dan pengalaman harian, mencari
          catatan, serta menyimpan catatan favorit.
        </Text>
        <Text style={styles.sectionTitle}>Navigasi</Text>
        <Text style={styles.body}>
          Home, Tambah, Favorit, dan Pengaturan tersedia melalui tab bawah.
          Setiap catatan memiliki halaman detail dengan rute dinamis dan tombol
          kembali ke Home.
        </Text>
        <Text style={styles.body}>
          Catatan dan status suka dibagikan antarhalaman menggunakan Context.
          Data saat ini disimpan sementara selama aplikasi berjalan.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  content: {
    padding: SPACE.l,
    gap: SPACE.m,
  },
  title: {
    color: COLORS.text,
    fontSize: TYPO.h1,
    fontWeight: '700',
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: TYPO.h2,
    fontWeight: '700',
    marginTop: SPACE.s,
  },
  body: {
    color: COLORS.text,
    fontSize: TYPO.body,
    lineHeight: 24,
  },
});
