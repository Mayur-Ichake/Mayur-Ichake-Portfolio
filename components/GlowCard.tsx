import React, { useRef } from 'react';
import { View, StyleSheet, Animated, Pressable, ViewStyle } from 'react-native';
import { theme } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

interface GlowCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  glowColor?: string;
  onPress?: () => void;
}

export default function GlowCard({ children, style, glowColor = theme.colors.cyan, onPress }: GlowCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.98,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 0.6,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 0.3,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const content = (
    <Animated.View
      style={[
        styles.card,
        style,
        {
          transform: [{ scale: scaleAnim }],
          shadowColor: glowColor,
          shadowOpacity: glowAnim as unknown as number,
        },
      ]}
    >
      <LinearGradient
        colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      />
      <View style={styles.content}>{children}</View>
      <View style={[styles.glowBorder, { borderColor: glowColor }]} />
    </Animated.View>
  );

  if (onPress) {
    return (
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    elevation: 10,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    padding: theme.spacing.lg,
  },
  glowBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    opacity: 0.3,
  },
});
