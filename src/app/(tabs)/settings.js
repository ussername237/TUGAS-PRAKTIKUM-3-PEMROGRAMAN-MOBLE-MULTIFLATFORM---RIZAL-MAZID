import React from 'react';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADIUS, SPACE, TYPO, MIN_TOUCH } from '../../styles/tokens';

export default function SettingsRoute() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.title} accessibilityRole="header">
        Pengaturan
      </Text>
      <Text style={styles.description}>
        Kelola informasi aplikasi Diary App.
      </Text>

      <Link href="/about" asChild>
        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.link,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.linkCopy}>
            <Text style={styles.linkTitle}>Tentang Aplikasi</Text>
            <Text style={styles.linkDescription}>
              Informasi fitur dan navigasi Diary App
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    backgroundColor: COLORS.surface,
  },
  title: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    color: COLORS.text,
  },
  description: {
    color: COLORS.muted,
    fontSize: TYPO.body,
    marginTop: SPACE.xs,
    marginBottom: SPACE.l,
  },
  link: {
    minHeight: MIN_TOUCH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.m,
    padding: SPACE.m,
  },
  linkCopy: {
    flex: 1,
    gap: SPACE.xs,
  },
  linkTitle: {
    fontSize: TYPO.body,
    fontWeight: '700',
    color: COLORS.text,
  },
  linkDescription: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
  },
  arrow: {
    color: COLORS.primary,
    fontSize: 28,
    marginLeft: SPACE.m,
  },
  pressed: {
    opacity: 0.75,
  },
});
