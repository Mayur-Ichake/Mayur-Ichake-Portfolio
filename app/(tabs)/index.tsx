import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Animated, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Download, Briefcase, GraduationCap, Award, Star, ChevronRight } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { profileData, skills, education, certifications, experience, achievements } from '@/mocks/portfolioData';
import ParticleBackground from '@/components/ParticleBackground';
import GlowCard from '@/components/GlowCard';
import GlowButton from '@/components/GlowButton';
import SkillBadge from '@/components/SkillBadge';
import TypingText from '@/components/TypingText';
import SectionTitle from '@/components/SectionTitle';

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleDownloadResume = () => {
    Linking.openURL('https://example.com/resume.pdf');
  };



  return (
    <View style={styles.container}>
      <ParticleBackground />
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.heroSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.heroGlow} />
          <Text style={styles.greeting}>Hello, I am</Text>
          <Text style={styles.name}>{profileData.name}</Text>
          <TypingText 
            texts={['Data Analyst', 'Prompt Engineer', 'AI Enthusiast', 'ML Developer']}
            style={styles.typingText}
          />
          <Text style={styles.bio}>{profileData.bio}</Text>
          
          <View style={styles.ctaButtons}>
            <GlowButton 
              title="View Projects" 
              onPress={() => {}} 
              variant="primary"
              icon={<ChevronRight size={18} color="#fff" />}
            />
            <GlowButton 
              title="Download CV" 
              onPress={handleDownloadResume} 
              variant="outline"
              icon={<Download size={18} color={theme.colors.cyan} />}
            />
          </View>
        </Animated.View>

        <View style={styles.section}>
          <SectionTitle title="About Me" subtitle="Get to know me better" />
          
          <GlowCard glowColor={theme.colors.purple}>
            <View style={styles.aboutContent}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: profileData.avatar }} style={styles.avatar} />
                <LinearGradient
                  colors={[theme.colors.cyan, theme.colors.purple]}
                  style={styles.avatarBorder}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
              </View>
              <Text style={styles.aboutText}>
                I am a passionate data professional with expertise in transforming complex datasets into 
                meaningful insights. My journey spans from traditional analytics to cutting-edge AI 
                applications, specializing in prompt engineering and generative AI solutions.
              </Text>
              <Text style={styles.aboutText}>
                With a strong foundation in Python, SQL, and modern BI tools, I bridge the gap between 
                raw data and strategic business decisions.
              </Text>
            </View>
          </GlowCard>

          <View style={styles.skillsSection}>
            <Text style={styles.skillsTitle}>Technical Skills</Text>
            <View style={styles.skillBadges}>
              {skills.map((skill) => (
                <SkillBadge key={skill.name} name={skill.name} level={skill.level} color={skill.color} />
              ))}
            </View>
          </View>

          <View style={styles.skillsSection}>
            <Text style={styles.skillsTitle}>Skill Proficiency</Text>
            {skills.slice(0, 5).map((skill, index) => (
              <SkillBadge 
                key={skill.name} 
                name={skill.name} 
                level={skill.level} 
                color={skill.color}
                showProgress
                delay={index * 200}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <SectionTitle title="Resume" subtitle="My professional journey" />
          
          <GlowCard style={styles.resumeCard} glowColor={theme.colors.cyan}>
            <View style={styles.resumeHeader}>
              <GraduationCap size={24} color={theme.colors.cyan} />
              <Text style={styles.resumeSectionTitle}>Education</Text>
            </View>
            {education.map((edu, index) => (
              <View key={index} style={styles.resumeItem}>
                <View style={styles.timelineDot} />
                <View style={styles.resumeItemContent}>
                  <Text style={styles.resumeItemTitle}>{edu.degree}</Text>
                  <Text style={styles.resumeItemSubtitle}>{edu.institution}</Text>
                  <Text style={styles.resumeItemDate}>{edu.year}</Text>
                  <Text style={styles.resumeItemDesc}>{edu.description}</Text>
                </View>
              </View>
            ))}
          </GlowCard>

          <GlowCard style={styles.resumeCard} glowColor={theme.colors.purple}>
            <View style={styles.resumeHeader}>
              <Briefcase size={24} color={theme.colors.purple} />
              <Text style={styles.resumeSectionTitle}>Experience</Text>
            </View>
            {experience.map((exp, index) => (
              <View key={index} style={styles.resumeItem}>
                <View style={[styles.timelineDot, { backgroundColor: theme.colors.purple }]} />
                <View style={styles.resumeItemContent}>
                  <Text style={styles.resumeItemTitle}>{exp.role}</Text>
                  <Text style={styles.resumeItemSubtitle}>{exp.company}</Text>
                  <Text style={styles.resumeItemDate}>{exp.period}</Text>
                  <Text style={styles.resumeItemDesc}>{exp.description}</Text>
                </View>
              </View>
            ))}
          </GlowCard>

          <GlowCard style={styles.resumeCard} glowColor={theme.colors.blue}>
            <View style={styles.resumeHeader}>
              <Award size={24} color={theme.colors.blue} />
              <Text style={styles.resumeSectionTitle}>Certifications</Text>
            </View>
            {certifications.map((cert, index) => (
              <View key={index} style={styles.certItem}>
                <View style={styles.certBadge}>
                  <Star size={14} color={theme.colors.blue} />
                </View>
                <View style={styles.certContent}>
                  <Text style={styles.certName}>{cert.name}</Text>
                  <Text style={styles.certIssuer}>{cert.issuer} • {cert.year}</Text>
                </View>
              </View>
            ))}
          </GlowCard>

          <GlowCard style={styles.resumeCard} glowColor={theme.colors.pink}>
            <View style={styles.resumeHeader}>
              <Star size={24} color={theme.colors.pink} />
              <Text style={styles.resumeSectionTitle}>Achievements</Text>
            </View>
            {achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementItem}>
                <View style={[styles.achievementDot, { backgroundColor: theme.colors.pink }]} />
                <Text style={styles.achievementText}>{achievement}</Text>
              </View>
            ))}
          </GlowCard>

          <GlowButton 
            title="Download Full Resume" 
            onPress={handleDownloadResume}
            variant="secondary"
            icon={<Download size={18} color="#fff" />}
            style={styles.downloadButton}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 {profileData.name}. Built with passion.</Text>
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
  heroSection: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    position: 'relative',
  },
  heroGlow: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: theme.colors.cyan,
    opacity: 0.08,
  },
  greeting: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  name: {
    fontSize: 42,
    fontWeight: '800' as const,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -1,
  },
  typingText: {
    fontSize: 18,
    marginBottom: 24,
  },
  bio: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  aboutContent: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarBorder: {
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: 63,
    zIndex: -1,
    opacity: 0.8,
  },
  aboutText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 12,
  },
  skillsSection: {
    marginTop: 24,
  },
  skillsTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: theme.colors.text,
    marginBottom: 16,
  },
  skillBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resumeCard: {
    marginBottom: 16,
  },
  resumeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  resumeSectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: theme.colors.text,
  },
  resumeItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.cyan,
    marginTop: 6,
    marginRight: 16,
  },
  resumeItemContent: {
    flex: 1,
  },
  resumeItemTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: theme.colors.text,
    marginBottom: 4,
  },
  resumeItemSubtitle: {
    fontSize: 14,
    color: theme.colors.cyan,
    marginBottom: 4,
  },
  resumeItemDate: {
    fontSize: 12,
    color: theme.colors.textMuted,
    marginBottom: 8,
  },
  resumeItemDesc: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  certItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  certBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  certContent: {
    flex: 1,
  },
  certName: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: theme.colors.text,
    marginBottom: 2,
  },
  certIssuer: {
    fontSize: 12,
    color: theme.colors.textMuted,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  achievementDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    marginRight: 12,
  },
  achievementText: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  downloadButton: {
    marginTop: 8,
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
