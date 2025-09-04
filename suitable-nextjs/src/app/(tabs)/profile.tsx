import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { CustomAlert } from '@/components/ui/CustomAlert';
import { useResponsive } from '@/hooks/useResponsive';

export default function ProfileScreen() {
  const { user, signOut, isLoading } = useAuth();
  const colorScheme = useColorScheme();
  const { fontSize, padding, margin, borderRadius, buttonSize } = useResponsive();
  const insets = useSafeAreaInsets();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ title: '', message: '', buttons: [] as any[] });

  const handleSignOut = () => {
    setAlertConfig({
      title: 'Sign Out',
      message: 'Are you sure you want to sign out?',
      buttons: [
        { text: 'Cancel', style: 'cancel', onPress: () => setAlertVisible(false) },
        { text: 'Sign Out', style: 'destructive', onPress: () => { setAlertVisible(false); signOut(); } },
      ]
    });
    setAlertVisible(true);
  };

  return (
    <>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView 
        style={[styles.container, { paddingTop: insets.top }]}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        <View style={[styles.content, { paddingHorizontal: padding.md }]}>
          <View style={[styles.header, { marginBottom: margin.xl }]}>
            <View style={[styles.avatar, { 
              backgroundColor: Colors[colorScheme ?? 'light'].tint,
              width: 80,
              height: 80,
              borderRadius: 40,
              marginBottom: margin.md,
            }]}>
              <Text style={[styles.avatarText, { fontSize: fontSize.xxxl }]}>
                {user?.user_metadata?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </Text>
            </View>
            <Text style={[styles.name, { 
              color: Colors[colorScheme ?? 'light'].text,
              fontSize: fontSize.xxl,
              marginBottom: margin.xs,
            }]}>
              {user?.user_metadata?.name || 'User'}
            </Text>
            <Text style={[styles.email, { 
              color: Colors[colorScheme ?? 'light'].tabIconDefault,
              fontSize: fontSize.md,
            }]}>
              {user?.email}
            </Text>
          </View>

        <View style={[styles.section, { marginBottom: margin.xl }]}>
          <Text style={[styles.sectionTitle, { 
            color: Colors[colorScheme ?? 'light'].text,
            fontSize: fontSize.lg,
            marginBottom: margin.md,
          }]}>
            Account Settings
          </Text>
          
          <TouchableOpacity
            style={[
              styles.menuItem,
              { 
                backgroundColor: Colors[colorScheme ?? 'light'].background,
                padding: padding.md,
                borderRadius: borderRadius.md,
                marginBottom: margin.sm,
              },
            ]}
            onPress={() => {
              setAlertConfig({
                title: 'Coming Soon',
                message: 'Edit profile functionality will be added soon!',
                buttons: [{ text: 'OK', onPress: () => setAlertVisible(false) }]
              });
              setAlertVisible(true);
            }}
          >
            <IconSymbol
              size={24}
              name="person.fill"
              color={Colors[colorScheme ?? 'light'].tint}
            />
            <Text style={[styles.menuText, { 
              color: Colors[colorScheme ?? 'light'].text,
              fontSize: fontSize.md,
              marginLeft: margin.sm,
            }]}>
              Edit Profile
            </Text>
            <IconSymbol
              size={16}
              name="chevron.right"
              color={Colors[colorScheme ?? 'light'].tabIconDefault}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.menuItem,
              { 
                backgroundColor: Colors[colorScheme ?? 'light'].background,
                padding: padding.md,
                borderRadius: borderRadius.md,
                marginBottom: margin.sm,
              },
            ]}
            onPress={() => {
              setAlertConfig({
                title: 'Coming Soon',
                message: 'Change password functionality will be added soon!',
                buttons: [{ text: 'OK', onPress: () => setAlertVisible(false) }]
              });
              setAlertVisible(true);
            }}
          >
            <IconSymbol
              size={24}
              name="lock.fill"
              color={Colors[colorScheme ?? 'light'].tint}
            />
            <Text style={[styles.menuText, { 
              color: Colors[colorScheme ?? 'light'].text,
              fontSize: fontSize.md,
              marginLeft: margin.sm,
            }]}>
              Change Password
            </Text>
            <IconSymbol
              size={16}
              name="chevron.right"
              color={Colors[colorScheme ?? 'light'].tabIconDefault}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { marginBottom: margin.xl }]}>
          <Text style={[styles.sectionTitle, { 
            color: Colors[colorScheme ?? 'light'].text,
            fontSize: fontSize.lg,
            marginBottom: margin.md,
          }]}>
            Support
          </Text>
          
          <TouchableOpacity
            style={[
              styles.menuItem,
              { 
                backgroundColor: Colors[colorScheme ?? 'light'].background,
                padding: padding.md,
                borderRadius: borderRadius.md,
                marginBottom: margin.sm,
              },
            ]}
            onPress={() => {
              setAlertConfig({
                title: 'Coming Soon',
                message: 'Help and support functionality will be added soon!',
                buttons: [{ text: 'OK', onPress: () => setAlertVisible(false) }]
              });
              setAlertVisible(true);
            }}
          >
            <IconSymbol
              size={24}
              name="questionmark.circle.fill"
              color={Colors[colorScheme ?? 'light'].tint}
            />
            <Text style={[styles.menuText, { 
              color: Colors[colorScheme ?? 'light'].text,
              fontSize: fontSize.md,
              marginLeft: margin.sm,
            }]}>
              Help & Support
            </Text>
            <IconSymbol
              size={16}
              name="chevron.right"
              color={Colors[colorScheme ?? 'light'].tabIconDefault}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.signOutButton, { 
            backgroundColor: '#ff4444',
            padding: padding.md,
            borderRadius: borderRadius.md,
            marginTop: margin.lg,
            height: buttonSize.md.height,
          }]}
          onPress={handleSignOut}
          disabled={isLoading}
        >
          <IconSymbol size={24} name="rectangle.portrait.and.arrow.right" color="white" />
          <Text style={[styles.signOutText, { 
            fontSize: fontSize.md,
            marginLeft: margin.sm,
          }]}>
            {isLoading ? 'Signing Out...' : 'Sign Out'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    
    <CustomAlert
      visible={alertVisible}
      title={alertConfig.title}
      message={alertConfig.message}
      buttons={alertConfig.buttons}
      onDismiss={() => setAlertVisible(false)}
    />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
  },
  header: {
    alignItems: 'center',
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontWeight: 'bold',
    color: 'white',
  },
  name: {
    fontWeight: 'bold',
  },
  email: {
  },
  section: {
  },
  sectionTitle: {
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutText: {
    color: 'white',
    fontWeight: '600',
  },
}); 