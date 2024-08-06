import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthRedirect } from '@/hooks/useSignedInRedirect';
import Colors from '@/constants/Colors';
import UserDetails from '@/components/ui/home/UserDetails';
import { Redirect } from 'expo-router';
import SearchBar from '@/components/ui/forms/SearchComponent';
import useToast from '@/components/Toast';
import SponsoredAds from '@/components/ui/home/SponsoredAds';
import ServiceCategoryGrid from '@/components/ui/home/ServiceCategoryGrid';
import TopRatedProfessionals from '@/components/ui/home/TopRatedProfessionals';

const Home = () => {
  // Set up local states for the component
  const [searchText, setSearchText] = useState('');

  // handle Trigger search
  const handleSearch = () => {
    if (searchText.length <= 3) {
      useToast('Please use a word greater than 3 characters.', 'gray', 'white');
    }
    useToast(`Search triggered: ${searchText}`);
  };

  const { isAuthenticated, user, redirect } = useAuthRedirect();

  if (!user || !isAuthenticated) {
    return <Redirect href={'/(auth)/Login'} />;
  }

  // Return the JSX
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={Colors.primary} />

      <ScrollView>
        <View style={styles.miniDashboard}>
          {/* Top Dashboard component  */}
          <UserDetails
            profilePicture={user?.profilePicture}
            fullName={user?.fullName}
            state={user?.location.state}
            country={user?.location.country}
          />

          {/* Search Bar component  */}
          <SearchBar
            value={searchText}
            setValue={(text: string) => setSearchText(text)}
            keyBoardType="default"
            returnType="done"
            triggerSearch={handleSearch}
            placeholder="Search for Professionals..."
          />
        </View>

        {/* Service Category  */}
        <View>
          <ServiceCategoryGrid />
        </View>

        {/* Sponsored Ads */}
        <SponsoredAds />

        {/* Top Rated Professionals  */}
        <TopRatedProfessionals />

        <Text>Home: The User's Home and Layout</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  miniDashboard: {
    height: 160,
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingTop: 20,

    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,

    marginBottom: 10,
  },
});
