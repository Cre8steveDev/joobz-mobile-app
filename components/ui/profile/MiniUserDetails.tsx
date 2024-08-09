import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FullUser } from '@/types/global';
import Colors from '@/constants/Colors';
import PrettyDates from '@/lib/prettyDate';

const MiniUserDetails = ({ fullUser }: { fullUser: FullUser }) => {
  const balance = fullUser.wallet.current_balance;
  const reviews = fullUser.reviews.length;
  const phone = fullUser.phoneNumber;
  const jobsPosted = fullUser.jobsPosted.length;
  const rating = fullUser.averageRating;
  const languages = fullUser.languages.join(' | ');

  //   Return JSX
  return (
    <View style={styles.container}>
      {/* Email Address */}
      <LabelAndValue label="Email:" value={fullUser.email} />
      <LabelAndValue label="Phone:" value={phone} />
      <LabelAndValue label="Account Type:" value={'User'} />

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
});
