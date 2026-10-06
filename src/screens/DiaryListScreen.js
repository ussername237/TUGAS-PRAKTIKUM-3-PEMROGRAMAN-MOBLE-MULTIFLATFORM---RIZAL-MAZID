import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import DiaryCard from '../components/DiaryCard';

const diaryEntries = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    preview: 'Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit. Udara terasa sejuk...',
    moodUri: 'https://picsum.photos/seed/happy/80',
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2025-10-05',
    preview: 'Menyelesaikan modul praktikum dan berdiskusi dengan tim. Banyak insight baru...',
    moodUri: 'https://picsum.photos/seed/focus/80',
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2025-10-04',
    preview: 'Menikmati senja sambil membaca buku favorit. Warna langit sangat indah...',
    moodUri: 'https://picsum.photos/seed/calm/80',
  },
  {
    id: 4,
    title: 'Olahraga Pagi',
    date: '2025-10-03',
    preview: 'Berlari keliling komplek. Keringat bercucuran tapi badan jadi segar...',
    moodUri: 'https://picsum.photos/seed/sport/80',
  },
  {
    id: 5,
    title: 'Makan Malam Bersama',
    date: '2025-10-02',
    preview: 'Makan malam bersama keluarga di restoran favorit. Suasana hangat...',
    moodUri: 'https://picsum.photos/seed/food/80',
  },
];

export default function DiaryListScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Buku Harian</Text>
        <Image
          source={{ uri: 'https://picsum.photos/seed/avatar/100' }}
          style={styles.avatar}
        />
      </View>
      {diaryEntries.map((entry) => (
        <DiaryCard
          key={entry.id}
          title={entry.title}
          date={entry.date}
          preview={entry.preview}
          moodUri={entry.moodUri}
          borderColor={
            entry.id === 1 ? '#3b82f6' : entry.id === 2 ? '#10b981' : '#e5e7eb'
          }
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  content: { padding: 16 },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  header: { fontSize: 24, fontWeight: '700' },
  avatar: { width: 40, height: 40, borderRadius: 20 },
});