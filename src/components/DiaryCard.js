import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { COLORS, SPACE, TYPO, RADIUS, MIN_TOUCH } from '../styles/tokens';

export default function DiaryCard({ title, date, preview, moodUri, variant = 'list', onPress }) {
  const isGrid = variant === 'grid';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}, tanggal ${date}. Ketuk untuk membuka detail.`}
      style={({ pressed }) => [
        styles.card,
        isGrid ? styles.cardGrid : styles.cardList,
        pressed && styles.pressed,
      ]}
    >
      <Image
        source={{ uri: moodUri }}
        style={isGrid ? styles.moodGrid : styles.moodList}
        accessibilityLabel={`Ilustrasi suasana untuk ${title}`}
      />
      <View style={styles.textWrap}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.preview} numberOfLines={3}>{preview}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.l,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACE.m,
    minHeight: MIN_TOUCH,
    gap: SPACE.m,
  },
  cardList: { flexDirection: 'row', alignItems: 'center' },
  cardGrid: { flexDirection: 'column' },
  pressed: { opacity: 0.7 },
  moodList: { width: 72, height: 72, borderRadius: RADIUS.m },
  moodGrid: { width: '100%', height: 120, borderRadius: RADIUS.m },
  textWrap: { flex: 1, gap: SPACE.xs },
  title: { fontSize: TYPO.h2, fontWeight: '700', color: COLORS.text },
  date: { fontSize: TYPO.caption, color: COLORS.muted },
  preview: { fontSize: TYPO.body, color: COLORS.text },
});