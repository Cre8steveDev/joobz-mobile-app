import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Messages, UserJob } from '@/types/global';
import { useAuthRedirect } from '@/hooks/useSignedInRedirect';
import { Redirect } from 'expo-router';
import EmptyResult from '@/components/ui/EmptyResult';
import Colors from '@/constants/Colors';
import Button from '@/components/ui/buttons/Button';
import { Ionicons } from '@expo/vector-icons';

/**
 * MessagesComponent Component
 * @returns The Jobs Page of the user
 */
const MessagesComponent = () => {
  // Define Component States
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [showMessageModal, setShowMessageModal] = useState(false);

  // Retrieve the authenticated user from global state
  const { user } = useAuthRedirect();

  if (!user) {
    return <Redirect href={'/(auth)/Login'} />;
  }

  // Fetch all Chats the User has Engaged In

  // Returning loading indicator
  if (loading) {
    return <LoadingScreen text="Loading..." />;
  }

  //  Return JSX Component
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Your Messages</Text>
        <Text style={styles.subtext}>
          Your conversations with professionals you have invited to Jobs are
          shown here. Enjoy quality service delivery.
        </Text>
      </View>

      {/* Show List of all jobs created by the user.  */}
      <FlatList
        data={messages}
        initialNumToRender={10}
        contentContainerStyle={{ gap: 13 }}
        ListEmptyComponent={
          <EmptyResult
            heading="Oops...You have not started any chats yet."
            subtext="Visit the Jobs Tab, create a job / or invite a Freelancer to the job to discuss the fine details of your project."
          />
        }
        renderItem={({ item, index }) => <Text key={index}>{item.title}</Text>}
      />

      {/* Use Modal to Create a Job for the User */}

      {/* Use Modal to display details about a job. */}
    </SafeAreaView>
  );
};

export default MessagesComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  headingContainer: {
    backgroundColor: Colors.primary,
    padding: 20,
  },

  heading: {
    fontFamily: 'PoppinsExtraBold',
    textAlign: 'center',
    color: Colors.white,
    fontSize: 36,
    marginBottom: -10,
  },

  subtext: {
    textAlign: 'center',
  },
});
