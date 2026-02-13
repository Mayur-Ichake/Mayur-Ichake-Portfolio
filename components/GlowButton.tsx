import React, { useRef } from 'react';
import { Text, StyleSheet, Animated, Pressable, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';

interface GlowButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  style?: ViewStyle;
  icon?: React.ReactNode;
}

export default function GlowButton({ title, onPress, variant = 'primary', style, icon }: GlowButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 0.4,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const getColors = (): [string, string] => {
    switch (variant) {
      case 'primary':
        return [theme.colors.cyan, theme.colors.blue];
      case 'secondary':
        return [theme.colors.purple, theme.colors.pink];
      case 'outline':
        return ['transparent', 'transparent'];
      default:
        return [theme.colors.cyan, theme.colors.blue];
    }
  };

  const getShadowColor = () => {
    switch (variant) {
      case 'primary':
        return theme.colors.cyan;
      case 'secondary':
        return theme.colors.purple;
      case 'outline':
        return theme.colors.cyan;
      default:
        return theme.colors.cyan;
    }
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
      <Animated.View
        style={[
          styles.button,
          variant === 'outline' && styles.outlineButton,
          style,
          {
            transform: [{ scale: scaleAnim }],
            shadowColor: getShadowColor(),
            shadowOpacity: glowAnim as unknown as number,
          },
        ]}
      >
        <LinearGradient
          colors={getColors()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
        {icon}
        <Text style={[styles.text, variant === 'outline' && styles.outlineText]}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 15,
    elevation: 8,
    gap: 8,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: theme.colors.cyan,
    backgroundColor: 'transparent',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: '600' as const,
    letterSpacing: 0.5,
  },
  outlineText: {
    color: theme.colors.cyan,
  },
});
