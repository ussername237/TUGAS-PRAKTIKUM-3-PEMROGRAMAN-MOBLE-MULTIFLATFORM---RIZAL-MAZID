import React, { useMemo, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import DiaryCard from '../components/DiaryCard';
import SearchBar from '../components/SearchBar';
import { useEntries } from '../context/EntriesContext';
import {
  COLORS,
  SPACE,
  TYPO,
  BREAKPOINTS,
} from '../styles/tokens';

export default function DiaryListScreen({ favoritesOnly = false }) {
  const { width } = useWindowDimensions();
  const twoCols = width >= BREAKPOINTS.tablet;
  const router = useRouter();
  const { entries, likedIds, toggleLike } = useEntries();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    const source = favoritesOnly
      ? entries.filter((item) => likedIds.has(item.id))
      : entries;

    if (!keyword) {
      return source;
    }

    return source.filter((item) =>
      `${item.title} ${item.date} ${item.preview} ${item.body}`
        .toLowerCase()
        .includes(keyword)
    );
  }, [entries, favoritesOnly, likedIds, query]);

  const renderItem = ({ item }) => (
    <View style={[styles.itemWrap, twoCols && styles.itemWrap2]}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        moodUri={item.moodUri}
        variant={twoCols ? 'grid' : 'list'}
        liked={likedIds.has(item.id)}
        onPress={() =>
          router.push({
            pathname: '/detail/[id]',
            params: { id: item.id },
          })
        }
        onToggleLike={() => toggleLike(item.id)}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text
        style={styles.header}
        accessibilityRole="header"
      >
        {favoritesOnly ? 'Catatan Favorit' : 'Buku Harian'}
      </Text>

      <Text style={styles.subtitle}>
        {favoritesOnly
          ? 'Kumpulan catatan yang kamu sukai.'
          : 'Catat cerita dan pengalaman harianmu.'}
      </Text>

      <SearchBar
        value={query}
        onChange={setQuery}
      />

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
            {favoritesOnly && likedIds.size === 0
              ? 'Belum ada catatan favorit. Sukai catatan dari Home atau Detail.'
              : 'Catatan tidak ditemukan.'}
          </Text>
        }
      />
    </SafeAreaView>
  );
}

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

  listContent: {
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.s,
    paddingBottom: SPACE.l,
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