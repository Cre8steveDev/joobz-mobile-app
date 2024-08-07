type TAppState = {
  preferredTheme: 'light' | 'dark';
  showNotifications: boolean;
};

type TAuthState = {
  user: null | LoggedInUser | LoggedInFreelancer;
  auth: { token: string; tokenExpiry: number } | null;
  firstTimer: boolean;
};

type RegisterData = {
  fullName: string;
  displayName: string;
  email: string;
  password: string;
  phoneNumber: string;
  category?: string;
  state: string;
  country: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type LoggedInUser = {
  _id: string;
  fullName: string;
  profilePicture: string;
  wallet: string;
  emailVerified: boolean;
  ROLE: string;
  location: {
    country: string;
    state: string;
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
};

export type LoggedInFreelancer = {
  _id: string;
  fullName: string;
  displayName: string;
  profilePicture: string;
  wallet: string;
  emailVerified: boolean;
  ROLE: string;
  location: {
    country: string;
    state: string;
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
};

export type FullUser = {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  profilePicture: string;
  dateJoined: Date;
  lastLogin: Date;
  isActive: boolean;
  location: {
    country: string;
    state: string;
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  languages: string[];
  companyName?: string;
  industry: string;
  bio: string;
  socialMedia: {
    linkedin: string;
    behance: string;
    twitter: string;
    github: string;
    website: string;
  };
  paymentMethods: { type: string; details: any };
  jobsPosted: any[];
  wallet: ObjectId;
  reviews: any[];
  averageRating: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type FullFreelancer = {
  _id: string;
  fullName: string;
  displayName: string;
  email: string;
  password: string;
  phoneNumber: string;
  profilePicture: string;
  dateJoined: Date;
  lastLogin: Date;
  isActive: boolean;
  location: {
    country: string;
    state: string;
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  languages: string[];
  skills: string[];
  hourlyRate: number;
  availability: string;
  bio: string;
  title: string;
  education: [
    {
      institution: string;
      degree: string;
      fieldOfStudy: string;
      from: Date;
      to: Date;
    }
  ];
  experience: [
    {
      title: string;
      company: string;
      from: Date;
      to: Date;
      description: string;
    }
  ];

  portfolio: [
    {
      title: string;
      description: string;
      link: string;
      images: string[];
    }
  ];
  certifications: [
    {
      name: string;
      issuer: string;
      dateObtained: Date;
      link: Date;
    }
  ];
  socialMedia: {
    linkedin: string;
    behance: string;
    twitter: string;
    github: string;
    website: string;
  };
  paymentInfo: {
    payPalEmail: string;
    bankInfo: { accountNumber: number; bankName: string };
  };
  jobsCompleted: any[];
  currentJobs: any[];
  wallet: ObjectId;
  reviews: any[];
  averageRating: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';

declare module '**/*.png';
declare module '**/*.jpg';
declare module '**/*.jpeg';
declare module '**/*.gif';

type ProfessionalCardType = {
  index: number;
  profilePicture: string;
  userId: string;
  _id?: string;
  fullName: string;
  category: string;
  averageRating: number;
  location: { state: string; country: string };
  router: ExpoRouter.Router;
};
