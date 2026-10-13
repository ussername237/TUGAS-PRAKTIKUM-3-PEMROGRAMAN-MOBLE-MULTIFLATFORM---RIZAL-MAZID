import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import { COLORS, SPACE, TYPO, BREAKPOINTS } from '../styles/tokens';

// ===== DATA (di luar komponen) =====
const DATA = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    preview: 'Bangun lebih awal, menikmati kopi hangat sambil membaca beberapa halaman buku favorit.',
    body:
      'Hari ini dimulai dengan tenang. Saya bangun pukul 05.30, membuka jendela, dan menikmati udara pagi. ' +
      'Secangkir kopi hangat menemani saya membaca beberapa halaman buku favorit. Perasaan saya jauh lebih ' +
      'siap menghadapi kuliah karena pagi tidak lagi terburu-buru.',
    moodUri: 'https://picsum.photos/seed/happy/200',
    heroUri: 'https://picsum.photos/seed/happyhero/800/450',
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2025-10-05',
    preview: 'Menyelesaikan tugas praktikum lebih cepat karena membagi pekerjaan menjadi beberapa target kecil.',
    body:
      'Tugas praktikum hari ini ternyata bisa selesai lebih cepat. Saya membagi pekerjaan menjadi beberapa ' +
      'target kecil, lalu menyelesaikannya satu per satu tanpa menunda. Teknik ini terasa jauh lebih ringan ' +
      'dibanding mengerjakan semuanya sekaligus di menit terakhir.',
    moodUri: 'https://picsum.photos/seed/focus/200',
    heroUri: 'https://picsum.photos/seed/focushero/800/450',
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2025-10-04',
    preview: 'Berjalan santai di taman kampus sambil mengamati warna langit yang berubah menjelang malam.',
    body:
      'Sore ini saya menyempatkan berjalan santai di taman kampus. Langit berubah warna dari biru menjadi ' +
      'jingga, lalu perlahan gelap. Saya duduk sebentar di bangku taman dan mengamati orang-orang yang ' +
      'berlalu lalang. Momen sederhana seperti ini membuat pikiran kembali segar.',
    moodUri: 'https://picsum.photos/seed/calm/200',
    heroUri: 'https://picsum.photos/seed/calmhero/800/450',
  },
  {
    id: 4,
    title: 'Belajar Flexbox',
    date: '2025-10-03',
    preview: 'Memahami flexDirection, gap, dan flex: 1 untuk membuat layout kartu di React Native.',
    body:
      'Malam ini saya belajar Flexbox lebih serius. Saya mencoba flexDirection: "row" untuk menaruh gambar ' +
      'di kiri dan teks di kanan, lalu memberi flex: 1 pada area teks agar mengambil sisa ruang. Ternyata ' +
      'sebagian besar masalah layout bisa diselesaikan dengan tiga properti saja: arah, jarak, dan bagian ' +
      'yang boleh melebar.',
    moodUri: 'https://picsum.photos/seed/study/200',
    heroUri: 'https://picsum.photos/seed/studyhero/800/450',
  },
  {
    id: 5,
    title: 'Evaluasi Mingguan',
    date: '2025-10-02',
    preview: 'Mengevaluasi target minggu ini: apa yang selesai, apa yang tertunda, dan apa langkah berikutnya.',
    body:
      'Saya menutup minggu ini dengan evaluasi singkat. Tiga target selesai tepat waktu, satu target ' +
      'tertunda karena estimasi waktu yang terlalu optimistis. Pelajaran utamanya: pecah target besar ' +
      'menjadi langkah kecil dan sisakan waktu cadangan untuk hal yang tidak terduga.',
    moodUri: 'https://picsum.photos/seed/reflect/200',
    heroUri: 'https://picsum.photos/seed/reflecthero/800/450',
  },
];

// ===== KOMPONEN =====
export default function DiaryListScreen() {
  // Hooks HARUS di dalam fungsi komponen
  const { width } = useWindowDimensions();
  const twoCols = width >= BREAKPOINTS.tablet;
  const [selected, setSelected] = useState(null);

  const keyForCols = useMemo(() => (twoCols ? 'grid2' : 'list1'), [twoCols]);

  const renderItem = ({ item }) => (
    <View style={[styles.itemWrap, twoCols && styles.itemWrap2]}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        moodUri={item.moodUri}
        variant={twoCols ? 'grid' : 'list'}
        onPress={() => setSelected(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header} accessibilityRole="header">Buku Harian</Text>

      <FlatList
        key={keyForCols}
        data={DATA}
        numColumns={twoCols ? 2 : 1}
        keyExtractor={(it) => String(it.id)}
        renderItem={renderItem}
        columnWrapperStyle={twoCols ? { gap: SPACE.m } : undefined}
        contentContainerStyle={{
          padding: SPACE.l,
          gap: SPACE.m,
          paddingTop: SPACE.m,
        }}
        ListEmptyComponent={<Text style={styles.empty}>Belum ada entri.</Text>}
      />

      <DiaryDetailModal
        visible={!!selected}
        entry={selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

// ===== STYLES (di luar komponen) =====
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  header: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    color: COLORS.text,
  },
  itemWrap: { flex: 1 },
  itemWrap2: { flex: 1 / 2 },
  empty: { textAlign: 'center', color: COLORS.muted, marginTop: 40 },
});