import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link, Stack } from 'expo-router';
import { theme } from '@/constants/theme';
import { Home, AlertCircle } from 'lucide-react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <AlertCircle size={64} color={theme.colors.cyan} />
        </View>
        <Text style={styles.title}>404</Text>
        <Text style={styles.subtitle}>Page Not Found</Text>
        <Text style={styles.description}>
          The page you are looking for does not exist or has been moved.
        </Text>
        <Link href="/" asChild>
          <Pressable style={styles.button}>
            <Home size={20} color={theme.colors.text} />
            <Text style={styles.buttonText}>Go Home</Text>
          </Pressable>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 24,
    shadowColor: theme.colors.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  title: {
    fontSize: 72,
    fontWeight: '800' as const,
    color: theme.colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600' as const,
    color: theme.colors.cyan,
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.surface,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.cyan,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: theme.colors.text,
  },
});
