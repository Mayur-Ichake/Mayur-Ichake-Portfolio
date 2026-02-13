import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.line} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.line} />
      </View>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 32,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  line: {
    width: 40,
    height: 1,
    backgroundColor: theme.colors.cyan,
    opacity: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: theme.colors.text,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});
