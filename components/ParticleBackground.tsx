import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { theme } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

interface Particle {
  id: number;
  x: Animated.Value;
  y: Animated.Value;
  opacity: Animated.Value;
  size: number;
  color: string;
}

export default function ParticleBackground() {
  const particles = useRef<Particle[]>([]);
  
  useEffect(() => {
    const colors = [theme.colors.cyan, theme.colors.purple, theme.colors.blue];
    
    particles.current = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(Math.random() * height),
      opacity: new Animated.Value(Math.random() * 0.5 + 0.1),
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    particles.current.forEach((particle) => {
      const animateParticle = () => {
        const duration = 8000 + Math.random() * 4000;
        
        Animated.parallel([
          Animated.sequence([
            Animated.timing(particle.y, {
              toValue: Math.random() * height,
              duration,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(particle.x, {
              toValue: Math.random() * width,
              duration,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(particle.opacity, {
              toValue: Math.random() * 0.4 + 0.1,
              duration: duration / 2,
              useNativeDriver: true,
            }),
            Animated.timing(particle.opacity, {
              toValue: Math.random() * 0.3 + 0.05,
              duration: duration / 2,
              useNativeDriver: true,
            }),
          ]),
        ]).start(() => animateParticle());
      };
      
      animateParticle();
    });
  }, []);

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.current.map((particle) => (
        <Animated.View
          key={particle.id}
          style={[
            styles.particle,
            {
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              borderRadius: particle.size / 2,
              opacity: particle.opacity,
              transform: [
                { translateX: particle.x },
                { translateY: particle.y },
              ],
              shadowColor: particle.color,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.8,
              shadowRadius: particle.size * 2,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
  },
});
