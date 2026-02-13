import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  Pressable, 
  Animated,
  Linking,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  Linkedin, 
  Instagram, 
  Trophy,
  CheckCircle
} from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { profileData, socialLinks } from '@/mocks/portfolioData';
import ParticleBackground from '@/components/ParticleBackground';
import SectionTitle from '@/components/SectionTitle';
import GlowCard from '@/components/GlowCard';

interface FuturisticInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  keyboardType?: 'default' | 'email-address';
}

function FuturisticInput({ placeholder, value, onChangeText, multiline, keyboardType }: FuturisticInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const borderAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(borderAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(borderAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0.1)', theme.colors.cyan],
  });

  return (
    <Animated.View style={[styles.inputContainer, { borderColor }]}>
      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        keyboardType={keyboardType}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
      {isFocused && (
        <View style={styles.inputGlow}>
          <LinearGradient
            colors={[theme.colors.cyan + '20', 'transparent']}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      )}
    </Animated.View>
  );
}

const socialIcons: Record<string, React.ComponentType<{ size: number; color: string }>> = {
  Github,
  Linkedin,
  Instagram,
  Trophy,
};

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const buttonScale = useRef(new Animated.Value(1)).current;

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert('Missing Fields', 'Please fill in all fields before submitting.');
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <ParticleBackground />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <SectionTitle 
            title="Contact" 
            subtitle="Let's connect and create something amazing"
          />
        </View>

        <View style={styles.content}>
          <GlowCard glowColor={theme.colors.cyan}>
            <Text style={styles.formTitle}>Send a Message</Text>
            <Text style={styles.formSubtitle}>I would love to hear from you!</Text>

            <View style={styles.form}>
              <FuturisticInput
                placeholder="Your Name"
                value={name}
                onChangeText={setName}
              />
              <FuturisticInput
                placeholder="Your Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <FuturisticInput
                placeholder="Your Message"
                value={message}
                onChangeText={setMessage}
                multiline
              />

              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                <Animated.View style={[styles.submitButton, { transform: [{ scale: buttonScale }] }]}>
                  <LinearGradient
                    colors={[theme.colors.cyan, theme.colors.blue]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFillObject}
                  />
                  {isSubmitted ? (
                    <>
                      <CheckCircle size={20} color="#fff" />
                      <Text style={styles.submitText}>Message Sent!</Text>
                    </>
                  ) : (
                    <>
                      <Send size={20} color="#fff" />
                      <Text style={styles.submitText}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Text>
                    </>
                  )}
                </Animated.View>
              </Pressable>
            </View>
          </GlowCard>

          <GlowCard glowColor={theme.colors.purple} style={styles.contactInfoCard}>
            <Text style={styles.contactInfoTitle}>Get In Touch</Text>
            
            <Pressable 
              style={styles.contactItem}
              onPress={() => Linking.openURL(`mailto:${profileData.email}`)}
            >
              <View style={[styles.contactIcon, { backgroundColor: theme.colors.cyan + '20' }]}>
                <Mail size={20} color={theme.colors.cyan} />
              </View>
              <View style={styles.contactDetails}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>{profileData.email}</Text>
              </View>
            </Pressable>

            <Pressable 
              style={styles.contactItem}
              onPress={() => Linking.openURL(`tel:${profileData.phone}`)}
            >
              <View style={[styles.contactIcon, { backgroundColor: theme.colors.purple + '20' }]}>
                <Phone size={20} color={theme.colors.purple} />
              </View>
              <View style={styles.contactDetails}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>{profileData.phone}</Text>
              </View>
            </Pressable>

            <View style={styles.contactItem}>
              <View style={[styles.contactIcon, { backgroundColor: theme.colors.blue + '20' }]}>
                <MapPin size={20} color={theme.colors.blue} />
              </View>
              <View style={styles.contactDetails}>
                <Text style={styles.contactLabel}>Location</Text>
                <Text style={styles.contactValue}>{profileData.location}</Text>
              </View>
            </View>
          </GlowCard>

          <View style={styles.socialSection}>
            <Text style={styles.socialTitle}>Connect on Social</Text>
            <View style={styles.socialGrid}>
              {socialLinks.map((social) => {
                const IconComponent = socialIcons[social.icon];
                return (
                  <Pressable
                    key={social.name}
                    style={styles.socialButton}
                    onPress={() => Linking.openURL(social.url)}
                  >
                    <LinearGradient
                      colors={[theme.colors.surface, theme.colors.backgroundTertiary]}
                      style={StyleSheet.absoluteFillObject}
                    />
                    {IconComponent && <IconComponent size={24} color={theme.colors.cyan} />}
                    <Text style={styles.socialName}>{social.name}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.mapPlaceholder}>
            <LinearGradient
              colors={[theme.colors.surface, theme.colors.backgroundTertiary]}
              style={StyleSheet.absoluteFillObject}
            />
            <MapPin size={32} color={theme.colors.cyan} />
            <Text style={styles.mapText}>San Francisco, CA</Text>
            <Text style={styles.mapSubtext}>Available for remote work worldwide</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 Alex Morgan. Built with passion and ☕</Text>
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
  },
  content: {
    paddingHorizontal: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: theme.colors.text,
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.backgroundTertiary,
    overflow: 'hidden',
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: theme.colors.text,
  },
  multilineInput: {
    minHeight: 120,
    paddingTop: 14,
  },
  inputGlow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    shadowColor: theme.colors.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: theme.colors.text,
  },
  contactInfoCard: {
    marginTop: 20,
  },
  contactInfoTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: theme.colors.text,
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactDetails: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 15,
    color: theme.colors.text,
  },
  socialSection: {
    marginTop: 24,
  },
  socialTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: theme.colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  socialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  socialButton: {
    width: '47%',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.surfaceBorder,
    overflow: 'hidden',
  },
  socialName: {
    marginTop: 8,
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  mapPlaceholder: {
    marginTop: 24,
    alignItems: 'center',
    paddingVertical: 40,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surfaceBorder,
    overflow: 'hidden',
  },
  mapText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600' as const,
    color: theme.colors.text,
  },
  mapSubtext: {
    marginTop: 4,
    fontSize: 13,
    color: theme.colors.textSecondary,
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
