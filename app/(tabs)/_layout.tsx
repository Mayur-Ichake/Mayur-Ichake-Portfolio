import { Tabs } from 'expo-router';
import { Home, FolderKanban, Mail } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { View, StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: theme.colors.cyan,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <View style={color === theme.colors.cyan ? styles.activeIconContainer : undefined}>
              <Home size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: 'Projects',
          tabBarIcon: ({ color, size }) => (
            <View style={color === theme.colors.cyan ? styles.activeIconContainer : undefined}>
              <FolderKanban size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color, size }) => (
            <View style={color === theme.colors.cyan ? styles.activeIconContainer : undefined}>
              <Mail size={22} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(10, 10, 15, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 8,
    height: 85,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
  },
  tabItem: {
    paddingVertical: 4,
  },
  activeIconContainer: {
    shadowColor: theme.colors.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
  },
});
