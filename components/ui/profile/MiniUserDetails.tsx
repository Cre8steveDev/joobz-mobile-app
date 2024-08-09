import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FullUser } from '@/types/global';
import Colors from '@/constants/Colors';
import PrettyDates from '@/lib/prettyDate';

const MiniUserDetails = ({ fullUser }: { fullUser: FullUser }) => {
  const balance = fullUser.wallet.current_balance;
  const reviews = fullUser?.reviews.length || 0;
  const phone = fullUser.phoneNumber;
  const jobsPosted = fullUser?.jobsPosted.length || 0;
  const rating = fullUser.averageRating;
  const languages = fullUser.languages.join(', ');
  const website = fullUser.socialMedia?.website || '';
  const twitter = fullUser.socialMedia?.twitter || '';
  const company = fullUser.companyName || '';
  const industry = fullUser.industry || '';
  const isActive = fullUser.isActive;

  //   Return JSX
  return (
    <View style={styles.container}>
      {/* Email Address */}
      <LabelAndValue label="Email:" value={fullUser.email} />
      <LabelAndValue label="Phone:" value={phone} />
      <LabelAndValue
        label="Company:"
        value={company.length > 0 ? company : 'Not stated'}
      />
      <LabelAndValue
        label="Industry:"
        value={industry.length > 0 ? industry : 'Not stated'}
      />
      <LabelAndValue label="Account Type:" value={'User'} />

      <LabelAndValue
        label="Website:"
        value={website.length > 0 ? website : 'Not stated'}
      />

      <LabelAndValue
        label="Twitter:"
        value={twitter.length > 0 ? twitter : 'Not stated'}
      />

      <LabelAndValue
        label="Current Balance:"
        value={`${balance === 0 ? 'Empty' : `N${balance}`}`}
      />
      <LabelAndValue
        label="Jobs Posted:"
        value={jobsPosted === 0 ? 'None Yet' : jobsPosted}
      />
      <LabelAndValue
        label="Your Reviews:"
        value={reviews === 0 ? 'None Yet' : reviews}
      />

      <LabelAndValue
        label="Your Rating:"
        value={rating === 0 ? 'None Yet' : rating}
      />

      <LabelAndValue
        label="Languages:"
        value={`${fullUser.languages.length === 0 ? 'None Listed' : languages}`}
      />

      <LabelAndValue
        label="Date Joined:"
        value={PrettyDates(fullUser.dateJoined)}
      />

      {/* Status: Active or Inactive */}
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Account Status:</Text>
        <Text style={isActive ? styles.active : styles.inactive}>
          {isActive ? 'Active' : ' Not Active'}
        </Text>
      </View>
    </View>
  );
};

export default MiniUserDetails;

// Label and value
const LabelAndValue = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 10,
    paddingLeft: 15,
    borderRadius: 10,
    marginHorizontal: 'auto',
    backgroundColor: Colors.white,
    marginVertical: 20,
    gap: 10,
  },

  detailContainer: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },

  detailLabel: {
    width: '35%',
    fontSize: 16,
  },

  detailValue: {
    fontSize: 16,
    color: Colors.gray,
  },

  active: {
    fontSize: 13,
    color: 'white',
    backgroundColor: Colors.primary,
    paddingHorizontal: 7,
    paddingVertical: 1,
    borderRadius: 6,
  },

  inactive: {
    fontSize: 13,
    color: 'white',
    backgroundColor: Colors.gray,
    paddingHorizontal: 7,
    paddingVertical: 1,
    borderRadius: 6,
  },
});
