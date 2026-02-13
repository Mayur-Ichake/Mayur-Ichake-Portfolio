import React, { useEffect, useState, useRef } from 'react';
import { Text, StyleSheet, Animated, View } from 'react-native';
import { theme } from '@/constants/theme';

interface TypingTextProps {
  texts: string[];
  speed?: number;
  style?: object;
}

export default function TypingText({ texts, speed = 100, style }: TypingTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const cursorOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [cursorOpacity]);

  useEffect(() => {
    const currentText = texts[textIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, speed]);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, style]}>
        {displayText}
        <Animated.Text style={[styles.cursor, { opacity: cursorOpacity }]}>|</Animated.Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    color: theme.colors.cyan,
    fontSize: 16,
    fontWeight: '500' as const,
  },
  cursor: {
    color: theme.colors.cyan,
  },
});
