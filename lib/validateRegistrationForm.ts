import useToast from '@/components/Toast';
import { RegisterData } from '@/types/global';

const validateRegistrationForm = (
  formData: RegisterData,
  type: 'user' | 'freelancer' = 'user'
): boolean => {
  // Full Name validation
  if (formData.fullName.trim().split(' ').length < 2) {
    useToast('Please provide a full name. First Name and Last name', 'red');
    return false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email.trim())) {
    useToast('Please provide a valid email address', 'red');
    return false;
  }

  // Password validation
  if (formData.password.length < 8) {
    useToast('Password must be at least 8 characters long', 'red');
    return false;
  }
  if (!/[A-Z]/.test(formData.password)) {
    useToast('Password must contain at least one uppercase letter', 'red');
    return false;
  }
  if (!/[a-z]/.test(formData.password)) {
    useToast('Password must contain at least one lowercase letter', 'red');
    return false;
  }
  if (!/[0-9]/.test(formData.password)) {
    useToast('Password must contain at least one number', 'red');
    return false;
  }
  if (!/[!@#$%^&*]/.test(formData.password)) {
    useToast(
      'Password must contain at least one special character (!@#$%^&*)',
      'red'
    );
    return false;
  }

  // State of residence validation
  const validStates = [
    'Abia',
    'Adamawa',
    'Akwa Ibom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'Cross River',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',
    'FCT Abuja',
    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Katsina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Lagos',
    'Nasarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Oyo',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara',
  ];
  if (!validStates.includes(formData.state)) {
    useToast('Please select a valid state of residence', 'red');
    return false;
  }

  if (type === 'freelancer' && formData.category) {
    if (formData.category === '') {
      useToast('Please pick a category of services', 'red');
      return false;
    }
  }

  // Phone number validation
  const phoneRegex = /^[0-9]{11}$/; // Assumes Nigerian phone numbers (11 digits)
  if (!phoneRegex.test(formData.phoneNumber.trim())) {
    useToast('Please provide a valid 11-digit phone number', 'red');
    return false;
  }

  // If all validations pass
  return true;
};

export default validateRegistrationForm;
