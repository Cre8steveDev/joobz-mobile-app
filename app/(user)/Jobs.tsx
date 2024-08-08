import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

import { UserJob } from '@/types/global';
import { useAuthRedirect } from '@/hooks/useSignedInRedirect';
import { Redirect } from 'expo-router';
import EmptyResult from '@/components/ui/EmptyResult';
import Colors from '@/constants/Colors';
import Button from '@/components/ui/buttons/Button';
import { Ionicons } from '@expo/vector-icons';

/**
 * Jobs Component
 * @returns The Jobs Page of the user
 */
const Jobs = () => {
  // Define Component States
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<UserJob[]>([]);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showCreateJob, setShowCreateJob] = useState(false);

  // Retrieve the authenticated user from global state
  const { user } = useAuthRedirect();

  if (!user) {
    return <Redirect href={'/(auth)/Login'} />;
  }

  // Fetch all Jobs created by the user

  // Returning loading indicator
  if (loading) {
    return <LoadingScreen text="Loading..." />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Your Jobs</Text>
        <Text style={styles.subtext}>
          You can find all your jobs listed in this section. Tap to view more
          details and update as necessary.
        </Text>
        <Button
          text="CREATE A JOB"
          textColor={Colors.primary}
          bgColor="white"
          onPress={() => setShowCreateJob(true)}
          children={<Ionicons name="add" size={24} color={Colors.primary} />}
          extraStyles={{
            padding: 5,
            marginTop: 10,
            width: '100%',
            borderRadius: 6,
            marginHorizontal: 'auto',
          }}
        />
      </View>

      {/* Show List of all jobs created by the user.  */}
      <FlatList
        data={jobs}
        initialNumToRender={10}
        contentContainerStyle={{ gap: 13 }}
        ListEmptyComponent={
          <EmptyResult
            heading="Oops...You have not created any Jobs yet."
            subtext="Click the Button above to post a job to the community. Thank you!"
          />
        }
        renderItem={({ item, index }) => <Text key={index}>{item.title}</Text>}
      />

      {/* Use Modal to Create a Job for the User */}

      {/* Use Modal to display details about a job. */}
    </SafeAreaView>
  );
};

export default Jobs;

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
    color: Colors.white,
    textAlign: 'center',
    fontSize: 36,
    marginBottom: -10,
  },

  subtext: {
    paddingRight: 15,
    textAlign: 'center',
  },
});
