import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { theme } from '@/constants/theme';

interface SkillBadgeProps {
  name: string;
  level: number;
  color: string;
  showProgress?: boolean;
  delay?: number;
}

export default function SkillBadge({ name, level, color, showProgress = false, delay = 0 }: SkillBadgeProps) {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(progressAnim, {
          toValue: level,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(glowAnim, {
              toValue: 0.6,
              duration: 2000,
              useNativeDriver: false,
            }),
            Animated.timing(glowAnim, {
              toValue: 0.3,
              duration: 2000,
              useNativeDriver: false,
            }),
          ])
        ),
      ]).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, level, progressAnim, glowAnim]);

  if (showProgress) {
    const progressWidth = progressAnim.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
    });

    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressName}>{name}</Text>
          <Animated.Text style={styles.progressPercent}>
            {progressAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            })}
          </Animated.Text>
        </View>
        <View style={styles.progressTrack}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progressWidth,
                backgroundColor: color,
                shadowColor: color,
              },
            ]}
          />
        </View>
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.badge,
        {
          borderColor: color,
          shadowColor: color,
          shadowOpacity: glowAnim as unknown as number,
        },
      ]}
    >
      <View style={[styles.badgeDot, { backgroundColor: color }]} />
      <Text style={styles.badgeText}>{name}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
    marginRight: 10,
    marginBottom: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 5,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  badgeText: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '500' as const,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressName: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '500' as const,
  },
  progressPercent: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  progressTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
});
