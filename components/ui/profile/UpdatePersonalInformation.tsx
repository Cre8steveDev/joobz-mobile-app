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
const UpdatePersonalInformation = ({
  user,
  setFullUser,
}: {
  user: FullUser;
  setFullUser: React.Dispatch<React.SetStateAction<FullUser | null>>;
}) => {
  //   Create Initial Data
  const initialData = {
    bio: user.bio || '',
    companyName: user.companyName || '',
    industry: user.industry || '',
    email: user.email || '',
    phoneNumber: user.phoneNumber || '',
    languages: (user.languages && user.languages.join(', ')) || '',
  };

  //   Define Social media form state
  const [info, setInfo] = useState(initialData);
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
      bio: info.bio,
      companyName: info.companyName,
      industry: info.industry,
      email: info.email,
      phoneNumber: info.phoneNumber,
      languages: info.languages,
    };

    try {
      const res = await API.post('/api/auth/update-user-profile', {
        type: 'Personal-Data',
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
          <Text style={styles.inputLabel}>Personal Data:</Text>
          {/*Bio Field */}
          <View style={styles.inputBound}>
            <CustomTextInput
              value={info.bio}
              multiline={true}
              setValue={(text: string) => {
                if (!changed) setChanged(true);
                setInfo((prev) => ({ ...prev, bio: text }));
              }}
              keyBoardType="web-search"
              placeholder="Enter Personal Bio < 200 characters"
              returnType="done"
              bgColor={Colors.white}
              maxlength={200}
              children={<></>}
            />
          </View>
          {/* <Ionicons name="person" size={18} color={Colors.gray} /> */}

          {/* Company Name Field */}
          <View style={styles.inputBound}>
            <CustomTextInput
              value={info.companyName}
              setValue={(text: string) => {
                if (!changed) setChanged(true);
                setInfo((prev) => ({ ...prev, companyName: text }));
              }}
              keyBoardType="web-search"
              placeholder="Enter Company Name"
              returnType="done"
              bgColor={Colors.white}
              children={
                <Ionicons name="business" size={18} color={Colors.gray} />
              }
            />
          </View>

          {/* Industry Type Field */}
          <View style={styles.inputBound}>
            <CustomTextInput
              value={info.industry}
              setValue={(text: string) => {
                if (!changed) setChanged(true);
                setInfo((prev) => ({ ...prev, industry: text }));
              }}
              keyBoardType="web-search"
              placeholder="Industry / Sector"
              returnType="done"
              bgColor={Colors.white}
              children={
                <Ionicons name="business-sharp" size={18} color={Colors.gray} />
              }
            />
          </View>

          {/* Email Field */}
          <View style={styles.inputBound}>
            <CustomTextInput
              value={info.email}
              setValue={(text: string) => {
                if (!changed) setChanged(true);
                setInfo((prev) => ({ ...prev, email: text }));
              }}
              keyBoardType="email-address"
              placeholder="Email Address"
              returnType="done"
              bgColor={Colors.white}
              children={<Ionicons name="mail" size={18} color={Colors.gray} />}
            />
          </View>

          {/* Phone Number Field */}
          <View style={styles.inputBound}>
            <CustomTextInput
              value={info.phoneNumber}
              setValue={(text: string) => {
                if (!changed) setChanged(true);
                setInfo((prev) => ({ ...prev, phoneNumber: text }));
              }}
              keyBoardType="phone-pad"
              placeholder="e.g 08123456789 "
              returnType="done"
              bgColor={Colors.white}
              children={
                <Ionicons name="phone-portrait" size={18} color={Colors.gray} />
              }
            />
          </View>

          {/* Languages Field */}
          <View style={styles.inputBound}>
            <CustomTextInput
              value={info.languages}
              setValue={(text: string) => {
                if (!changed) setChanged(true);
                setInfo((prev) => ({ ...prev, languages: text }));
              }}
              keyBoardType="default"
              placeholder="e.g English, Pidgin"
              returnType="done"
              bgColor={Colors.white}
              children={
                <Ionicons name="language" size={18} color={Colors.gray} />
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
                  : 'Update Personal Data'}
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

export default UpdatePersonalInformation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
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
