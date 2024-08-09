import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { FullUser } from '@/types/global';
import CustomTextInput from '../forms/CustomTextInput';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { API } from '@/constants/BaseUrl';
import useToast from '@/components/Toast';
import LoadingScreen from '../LoadingScreen';

/**
 * Update Social Media Sub Component
 * @param
 * @returns
 */
const UpdateSocialMedia = ({
  user,
  setFullUser,
}: {
  user: FullUser;
  setFullUser: React.Dispatch<React.SetStateAction<FullUser | null>>;
}) => {
  //   Create Initial Data
  const initialData = {
    website: user.socialMedia?.website || '',
    twitter: user.socialMedia?.twitter || '',
  };

  //   Define Social media form state
  const [socials, setSocials] = useState(initialData);
  const [changed, setChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  //   Handle Update Profile Update
  const handleUpdate = async () => {
    setLoading(true);
    setSuccess(false);
    setError(false);

    // Compute the data to send
    const data = {
      website: socials.website.trim(),
      twitter: socials.twitter.trim(),
    };

    try {
      const res = await API.post('/api/auth/update-user-profile', {
        type: 'Socials',
        data,
        userId: user._id,
      });

      //   Set user profile with updated User
      setFullUser(res.data.user);
      setLoading(false);
      setSuccess(true);

      //   Error Handling
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      setError(true);
    }
  };

  //   Return JSX
  return (
    <View style={styles.container}>
      {!loading && (
        <>
          <Text style={styles.inputLabel}>Social Links</Text>
          {/* Website Field */}
          <View style={styles.inputBound}>
            <CustomTextInput
              value={socials.website}
              setValue={(text: string) => {
                if (!changed) setChanged(true);
                setSocials((prev) => ({ ...prev, website: text }));
              }}
              keyBoardType="web-search"
              placeholder="Enter Website Address"
              returnType="done"
              children={<Ionicons name="globe" size={18} color={Colors.gray} />}
            />
          </View>

          {/* Twitter Value Field */}
          <View style={styles.inputBound}>
            <CustomTextInput
              value={socials.twitter}
              setValue={(text: string) => {
                if (!changed) setChanged(true);
                setSocials((prev) => ({ ...prev, twitter: text }));
              }}
              keyBoardType="web-search"
              placeholder="Twitter Username: e.g @Cre8steveDev"
              returnType="done"
              children={
                <Ionicons name="logo-twitter" size={18} color={Colors.gray} />
              }
            />
          </View>

          {/* Update Button */}
          {changed && (
            <TouchableOpacity
              style={styles.updateBtn}
              disabled={loading}
              onPress={handleUpdate}
            >
              <Text style={styles.updateText}>
                {loading
                  ? 'Loading...'
                  : success
                  ? 'Update Success ✅'
                  : 'Update Social Links'}
              </Text>
            </TouchableOpacity>
          )}

          {error && (
            <Text style={{ color: 'red' }}>Error. Unable to update.</Text>
          )}
        </>
      )}

      {loading && (
        <Image
          source={require('@/assets/images/loading-image.gif')}
          style={{ width: '100%', resizeMode: 'contain', height: 150 }}
        />
      )}
    </View>
  );
};

export default UpdateSocialMedia;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 40,
    width: '100%',
    objectFit: 'cover',
  },
  inputBound: {
    marginTop: 10,
  },
  inputLabel: {
    fontFamily: 'PoppinsSemiBold',
    color: Colors.gray,
    marginBottom: -10,
  },

  updateBtn: {
    width: 150,
    backgroundColor: Colors.secondaryHighlight,
    marginTop: 10,
    borderRadius: 7,
    paddingVertical: 6,
  },

  updateText: {
    color: 'white',
    textAlign: 'center',
  },
});
