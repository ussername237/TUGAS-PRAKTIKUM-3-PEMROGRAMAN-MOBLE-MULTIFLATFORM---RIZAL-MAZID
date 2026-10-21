import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';

export default function DiaryCard({
  title,
  date,
  preview,
  moodUri,
  moodImage,
  variant = 'list',
  liked = false,
  onPress,
  onToggleLike,
}) {
  const imageSource = moodUri || moodImage;

  return (
    <View
      style={[
        styles.card,
        variant === 'grid' && styles.gridCard,
      ]}
    >
      <Pressable
        onPress={onPress}
        style={styles.mainContent}
      >
        {imageSource ? (
          <Image
            source={
              typeof imageSource === 'string'
                ? { uri: imageSource }
                : imageSource
            }
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>📔</Text>
          </View>
        )}

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>

          <Text style={styles.date}>
            {date}
          </Text>

          <Text style={styles.preview} numberOfLines={3}>
            {preview}
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={onToggleLike}
        style={styles.likeButton}
        accessibilityRole="button"
        accessibilityLabel={
          liked ? 'Batalkan suka' : 'Sukai catatan'
        }
      >
        <Text style={styles.like}>
          {liked ? '❤️' : '🤍'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    gap: 12,
  },

  gridCard: {
    alignItems: 'flex-start',
  },

  mainContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },

  imagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholderText: {
    fontSize: 24,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  date: {
    fontSize: 12,
    color: '#6B7280',
    marginVertical: 4,
  },

  preview: {
    fontSize: 13,
    color: '#4B5563',
  },

  likeButton: {
    padding: 5,
    minWidth: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  like: {
    fontSize: 22,
  },
});