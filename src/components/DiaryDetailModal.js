import React from 'react';
import { Modal, View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import { COLORS, SPACE, TYPO, RADIUS, MIN_TOUCH } from '../styles/tokens';

export default function DiaryDetailModal({ visible, entry, onClose }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}   // tombol Back di Android
    >
      <View style={styles.overlay}>
        <View style={styles.sheet} accessibilityViewIsModal>
          {entry && (
            <ScrollView contentContainerStyle={styles.content}>
              <Image
                source={{ uri: entry.heroUri }}
                style={styles.hero}
                accessibilityLabel={`Gambar utama untuk ${entry.title}`}
              />
              <Text style={styles.title} accessibilityRole="header">{entry.title}</Text>
              <Text style={styles.date}>{entry.date}</Text>
              <Text style={styles.body}>{entry.body}</Text>
            </ScrollView>
          )}

          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Tutup detail catatan"
            style={({ pressed }) => [styles.closeBtn, pressed && styles.pressed]}
          >
            <Text style={styles.closeText}>Tutup</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: COLORS.overlay, justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: RADIUS.l,
    borderTopRightRadius: RADIUS.l,
    maxHeight: '90%',
    padding: SPACE.l,
    gap: SPACE.m,
  },
  content: { gap: SPACE.m },
  hero: { width: '100%', aspectRatio: 16 / 9, borderRadius: RADIUS.m },
  title: { fontSize: TYPO.h1, fontWeight: '700', color: COLORS.text },
  date: { fontSize: TYPO.caption, color: COLORS.muted },
  body: { fontSize: TYPO.body, color: COLORS.text, lineHeight: 24 },
  closeBtn: {
    minHeight: MIN_TOUCH,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.8 },
  closeText: { color: COLORS.onPrimary, fontSize: TYPO.body, fontWeight: '700' },
});