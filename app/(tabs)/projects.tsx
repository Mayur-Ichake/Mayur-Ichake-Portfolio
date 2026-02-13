import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Animated, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Github, ExternalLink, Code2 } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { projects } from '@/mocks/portfolioData';
import ParticleBackground from '@/components/ParticleBackground';
import SectionTitle from '@/components/SectionTitle';

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.2)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.97,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 0.5,
        duration: 150,
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
        toValue: 0.2,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const glowColors = [theme.colors.cyan, theme.colors.purple, theme.colors.blue, theme.colors.pink];
  const glowColor = glowColors[index % glowColors.length];

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={[
          styles.projectCard,
          {
            transform: [{ scale: scaleAnim }],
            shadowColor: glowColor,
            shadowOpacity: glowAnim as unknown as number,
          },
        ]}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: project.image }} style={styles.projectImage} />
          <LinearGradient
            colors={['transparent', 'rgba(10, 10, 15, 0.9)']}
            style={styles.imageOverlay}
          />
          <View style={styles.projectLinks}>
            <Pressable 
              style={styles.linkButton}
              onPress={() => Linking.openURL(project.githubUrl)}
            >
              <Github size={18} color={theme.colors.text} />
            </Pressable>
            <Pressable 
              style={styles.linkButton}
              onPress={() => Linking.openURL(project.liveUrl)}
            >
              <ExternalLink size={18} color={theme.colors.text} />
            </Pressable>
          </View>
        </View>

        <View style={styles.projectContent}>
          <Text style={styles.projectTitle}>{project.title}</Text>
          <Text style={styles.projectDescription}>{project.description}</Text>
          
          <View style={styles.techStack}>
            {project.techStack.map((tech) => (
              <View key={tech} style={[styles.techBadge, { borderColor: glowColor }]}>
                <Text style={[styles.techText, { color: glowColor }]}>{tech}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.cardGlow, { borderColor: glowColor }]} />
      </Animated.View>
    </Pressable>
  );
}

export default function ProjectsScreen() {
  return (
    <View style={styles.container}>
      <ParticleBackground />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <SectionTitle 
            title="Projects" 
            subtitle="A showcase of my work and innovations"
          />
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{projects.length}+</Text>
              <Text style={styles.statLabel}>Projects</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15+</Text>
              <Text style={styles.statLabel}>Technologies</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>100%</Text>
              <Text style={styles.statLabel}>Passion</Text>
            </View>
          </View>
        </View>

        <View style={styles.projectsGrid}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </View>

        <View style={styles.moreSection}>
          <View style={styles.moreCard}>
            <Code2 size={32} color={theme.colors.cyan} />
            <Text style={styles.moreTitle}>More on GitHub</Text>
            <Text style={styles.moreText}>
              Check out my GitHub profile for more projects, contributions, and open-source work.
            </Text>
            <Pressable 
              style={styles.githubButton}
              onPress={() => Linking.openURL('https://github.com')}
            >
              <Github size={18} color={theme.colors.text} />
              <Text style={styles.githubButtonText}>Visit GitHub</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 Alex Morgan. All rights reserved.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.surfaceBorder,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: theme.colors.cyan,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: theme.colors.surfaceBorder,
  },
  projectsGrid: {
    paddingHorizontal: 20,
    gap: 20,
  },
  projectCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    elevation: 10,
  },
  imageContainer: {
    position: 'relative',
    height: 180,
  },
  projectImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  projectLinks: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    gap: 8,
  },
  linkButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  projectContent: {
    padding: 20,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: theme.colors.text,
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  techStack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  techText: {
    fontSize: 11,
    fontWeight: '500' as const,
  },
  cardGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    opacity: 0.2,
    pointerEvents: 'none',
  },
  moreSection: {
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  moreCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.surfaceBorder,
  },
  moreTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: theme.colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  moreText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  githubButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.backgroundTertiary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.surfaceBorder,
  },
  githubButtonText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: theme.colors.text,
  },
  footer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: theme.colors.textMuted,
  },
});
