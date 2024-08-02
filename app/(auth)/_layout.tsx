import { Redirect, Stack, Tabs } from 'expo-router';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';

import Colors from '@/constants/Colors';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';

export default function TabLayout() {
  //  Return to Login Page if user is not authenticated
  //@ts-ignore
  const auth = useSelector((state) => state.auth);

  //   if (!auth.user) {
  //     return <Redirect href="/(auth)/Signin" />;
  //   }

  // Return Tab Layout
  return (
    <Stack>
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      <Stack.Screen name="UserRegister" options={{ headerShown: false }} />
      <Stack.Screen name="FreelanceRegister" options={{ headerShown: false }} />
    </Stack>
  );
}
