import React, { useMemo, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Alert,
  Pressable,
} from 'react-native';

import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import SearchBar from '../components/SearchBar';
import EntryForm from '../components/EntryForm';

import {
  COLORS,
  SPACE,
  TYPO,
  BREAKPOINTS,
} from '../styles/tokens';

// ===============================
// DATA AWAL
// ===============================

const DATA = [
  {
    id: '1',
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    preview:
      'Bangun lebih awal, menikmati kopi hangat sambil membaca buku favorit.',
    body:
      'Hari ini dimulai dengan tenang. Saya bangun pukul 05.30 dan menikmati udara pagi. Secangkir kopi hangat menemani saya membaca beberapa halaman buku favorit.',
    moodUri: 'https://picsum.photos/seed/happy/200',
    heroUri: 'https://picsum.photos/seed/happyhero/800/450',
  },
  {
    id: '2',
    title: 'Produktif di Kampus',
    date: '2025-10-05',
    preview:
      'Menyelesaikan tugas praktikum dengan membagi pekerjaan menjadi target kecil.',
    body:
      'Tugas praktikum hari ini selesai lebih cepat. Saya membagi pekerjaan menjadi beberapa target kecil dan menyelesaikannya satu per satu tanpa menunda.',
    moodUri: 'https://picsum.photos/seed/focus/200',
    heroUri: 'https://picsum.photos/seed/focushero/800/450',
  },
  {
    id: '3',
    title: 'Senja di Taman',
    date: '2025-10-04',
    preview:
      'Berjalan santai di taman kampus sambil menikmati suasana senja.',
    body:
      'Sore ini saya berjalan santai di taman kampus. Langit berubah menjadi jingga. Momen sederhana seperti ini membuat pikiran kembali segar.',
    moodUri: 'https://picsum.photos/seed/calm/200',
    heroUri: 'https://picsum.photos/seed/calmhero/800/450',
  },
  {
    id: '4',
    title: 'Belajar Flexbox',
    date: '2025-10-03',
    preview:
      'Memahami flexDirection, gap, dan flex untuk membuat layout React Native.',
    body:
      'Malam ini saya belajar Flexbox. Saya mencoba flexDirection untuk mengatur posisi komponen dan flex untuk mengatur ruang yang tersedia.',
    moodUri: 'https://picsum.photos/seed/study/200',
    heroUri: 'https://picsum.photos/seed/studyhero/800/450',
  },
  {
    id: '5',
    title: 'Evaluasi Mingguan',
    date: '2025-10-02',
    preview:
      'Mengevaluasi target mingguan dan merencanakan langkah berikutnya.',
    body:
      'Saya mengevaluasi target mingguan dan mempelajari pentingnya membagi target besar menjadi langkah kecil.',
    moodUri: 'https://picsum.photos/seed/reflect/200',
    heroUri: 'https://picsum.photos/seed/reflecthero/800/450',
  },
];

// ===============================
// KOMPONEN UTAMA
// ===============================

export default function DiaryListScreen() {
  const { width } = useWindowDimensions();
  const twoCols = width >= BREAKPOINTS.tablet;

  const [entries, setEntries] = useState(DATA);
  const [query, setQuery] = useState('');
  const [likedIds, setLikedIds] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Pencarian catatan
  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
      return entries;
    }

    return entries.filter((item) =>
      `${item.title} ${item.date} ${item.preview}`
        .toLowerCase()
        .includes(keyword)
    );
  }, [entries, query]);

  // Menyukai atau membatalkan suka
  const toggleLike = (id) => {
    setLikedIds((previous) =>
      previous.includes(id)
        ? previous.filter((itemId) => itemId !== id)
        : [...previous, id]
    );
  };

  // Menambahkan catatan
  const addEntry = (formData) => {
    if (!formData) {
      return;
    }

    const title = String(formData.title || '').trim();
    const date = String(formData.date || '').trim();
    const preview = String(formData.preview || '').trim();

    if (!title || !date || !preview) {
      Alert.alert(
        'Data belum lengkap',
        'Isi judul, tanggal, dan isi catatan terlebih dahulu.'
      );
      return;
    }

    const newEntry = {
      id: String(Date.now()),
      title,
      date,
      preview,
      body: preview,
      moodUri: 'https://picsum.photos/seed/default/200',
      heroUri: 'https://picsum.photos/seed/defaulthero/800/450',
    };

    setEntries((previous) => [newEntry, ...previous]);
    setQuery('');
    setShowForm(false);

    Alert.alert('Berhasil', 'Catatan berhasil ditambahkan.');
  };

  // Menampilkan kartu
  const renderItem = ({ item }) => (
    <View style={[styles.itemWrap, twoCols && styles.itemWrap2]}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        moodUri={item.moodUri}
        variant={twoCols ? 'grid' : 'list'}
        liked={likedIds.includes(item.id)}
        onPress={() => setSelected(item)}
        onToggleLike={() => toggleLike(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text
        style={styles.header}
        accessibilityRole="header"
      >
        Buku Harian
      </Text>

      <Text style={styles.subtitle}>
        Catat cerita dan pengalaman harianmu.
      </Text>

      {/* Pencarian */}
      <SearchBar
        value={query}
        onChange={setQuery}
      />

      {/* Tombol form */}
      <View style={styles.formContainer}>
        <Pressable
          onPress={() => setShowForm((previous) => !previous)}
          style={styles.formToggle}
        >
          <Text style={styles.formToggleText}>
            {showForm ? '− Tutup Form' : '+ Tambah Catatan'}
          </Text>
        </Pressable>

        {showForm && (
          <EntryForm onSubmit={addEntry} />
        )}
      </View>

      {/* Daftar catatan */}
      <FlatList
        key={twoCols ? 'grid2' : 'list1'}
        data={filtered}
        numColumns={twoCols ? 2 : 1}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        columnWrapperStyle={
          twoCols ? styles.columnWrapper : undefined
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Catatan tidak ditemukan.
          </Text>
        }
      />

      {/* Detail catatan */}
      <DiaryDetailModal
        visible={!!selected}
        entry={selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

// ===============================
// STYLE
// ===============================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },

  header: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    color: COLORS.text,
  },

  subtitle: {
    fontSize: TYPO.body,
    color: COLORS.muted,
    paddingHorizontal: SPACE.l,
    marginTop: SPACE.xs,
    marginBottom: SPACE.s,
  },

  formContainer: {
    paddingHorizontal: SPACE.l,
    marginBottom: SPACE.s,
  },

  formToggle: {
    paddingVertical: SPACE.s,
  },

  formToggleText: {
    color: COLORS.primary,
    fontSize: TYPO.body,
    fontWeight: '700',
  },

  listContent: {
    padding: SPACE.l,
    paddingTop: SPACE.s,
    gap: SPACE.m,
    flexGrow: 1,
  },

  columnWrapper: {
    gap: SPACE.m,
  },

  itemWrap: {
    flex: 1,
  },

  itemWrap2: {
    flex: 1,
  },

  empty: {
    textAlign: 'center',
    color: COLORS.muted,
    marginTop: 40,
    fontSize: TYPO.body,
  },
});