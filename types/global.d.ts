type TAppState = {
  preferredTheme: 'light' | 'dark';
  showNotifications: boolean;
};

type TAuthState = {
  user: null | any;
  firstTimer: boolean;
};

type RegisterData = {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  category?: string;
  stateOfResidence: string;
};

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
