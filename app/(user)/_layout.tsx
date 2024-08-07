import { Redirect, Tabs, usePathname } from 'expo-router';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';

import Colors from '@/constants/Colors';
import { Platform, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { useAuthRedirect } from '@/hooks/useSignedInRedirect';
import { useEffect } from 'react';

export default function UserTabLayout() {
  const pathname = usePathname();
  const isOffTab =
    pathname === '/ServiceCategoryDetail' ||
    pathname === '/ServiceProviderDetails';

  //  Return to Login Page if user is not authenticated
  const { isAuthenticated } = useAuthRedirect();

  if (!isAuthenticated) return <Redirect href={'/(auth)/Login'} />;

  // Setup Status Bar color change

  // useEffect(() => {
  //   const updateStatusBar = () => {
  //     if (pathname === '/ServiceCategoryDetail') {
  //       StatusBar.setBarStyle('dark-content');
  //       StatusBar.setBackgroundColor(Colors.white);
  //     } else if (pathname.startsWith('/ServiceProviderDetails')) {
  //       StatusBar.setBarStyle('dark-content');
  //       StatusBar.setBackgroundColor(Colors.white);
  //     } else if (pathname === '/Home') {
  //       StatusBar.setBarStyle('light-content');
  //       StatusBar.setBackgroundColor(Colors.primary);
  //     }
  //   };

  //   updateStatusBar();
  // }, [pathname]);

  // Return Tab Layout
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: isOffTab ? Colors.neutral : Colors.gray,
        tabBarStyle: {
          height: 65,
          width: '100%',
          paddingHorizontal: 20,
          marginHorizontal: 'auto',
          backgroundColor: isOffTab ? Colors.primary : Colors.white,

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

      <Tabs.Screen
        name="ServiceProviderDetails"
        options={{
          headerShown: false,
          tabBarButton: () => null,
          tabBarIconStyle: { display: 'none' },
          tabBarLabelStyle: { display: 'none' },
        }}
      />

      <Tabs.Screen
        name="ServiceCategoryDetail"
        options={{
          headerShown: false,
          tabBarButton: () => null,
          tabBarIconStyle: { display: 'none' },
          tabBarLabelStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}

// ServiceProviderDetails
// ServiceCategoryDetail
