import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { X } from 'lucide-react-native';
import { theme } from '@/constants/theme';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Modal</Text>
        <Pressable style={styles.closeButton} onPress={() => router.back()}>
          <X size={24} color={theme.colors.text} />
        </Pressable>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>This is a modal screen.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceBorder,
  },
  title: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: theme.colors.text,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
});
