import { Redirect, Tabs } from 'expo-router';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';

import Colors from '@/constants/Colors';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { useAuthRedirect } from '@/hooks/useSignedInRedirect';

export default function UserTabLayout() {
  //  Return to Login Page if user is not authenticated
  const { isAuthenticated } = useAuthRedirect();

  if (!isAuthenticated) return <Redirect href={'/(auth)/Login'} />;

  // Return Tab Layout
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        tabBarStyle: {
          height: 65,
          width: '100%',
          paddingHorizontal: 20,
          marginHorizontal: 'auto',
          backgroundColor: Colors.white,

          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            },
            android: {
              elevation: 5,
            },
          }),
        },
        tabBarLabelStyle: {
          fontSize: 9,
          fontFamily: 'PoppinsRegular',
          marginBottom: 12,
          marginTop: -8,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="home" size={!focused ? size : 30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Discover"
        options={{
          title: 'Discover',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome
              name="search-plus"
              size={!focused ? size : 30}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Jobs"
        options={{
          title: 'Jobs',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Entypo
              name="briefcase"
              size={!focused ? size : 30}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Messages"
        options={{
          title: 'Messages',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="chatbubble"
              size={!focused ? size : 30}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="UserProfile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="person" size={!focused ? size : 30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
