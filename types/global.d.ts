type TAppState = {
  preferredTheme: 'light' | 'dark';
  showNotifications: boolean;
};

type TAuthState = {
  user: null | any;
  firstTimer: boolean;
};

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
