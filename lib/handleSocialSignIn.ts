import { Alert } from 'react-native';

// Coming Soon
const comingSoon = () => {
  Alert.alert(
    'Feature coming soon. 😊',
    "I'm yet to implement the social signin for the app. But these will follow after the core features have been implemented."
  );
};

// Define Function to handle Logins
const handleGoogleLogin = () => {
  comingSoon();
};

const handleFacebookLogin = () => {
  comingSoon();
};

const handleTwitterLogin = () => {
  comingSoon();
};

export { handleFacebookLogin, handleGoogleLogin, handleTwitterLogin };
