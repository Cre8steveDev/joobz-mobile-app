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
  wallet: { _id: string; current_balance: number; transaction_history: any[] };
  reviews: any[];
  averageRating: number;
  invitations: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type FullFreelancer = {
  _id: string;
  fullName: string;
  displayName: string;
  email: string;
  category: string;
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
  invitations: any[];
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

export type FreelanceMarkerData = {
  longitude: number;
  latitude: number;
  _id: string;
  fullName: string;
  category: string;
};

export type UserJob = {
  title: string;
  description: string;
  client: string;
  category: string;
  budget: { type: 'fixed' | 'hourly'; amount: number };
  skills: string[];
  datePosted: Date;
  deadline: Date;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled ';
  proposals: any[];
  hiredFreelancer: string;
  completionDate: Date;
};

export type Messages = {
  userId: string;
  freelancerId: string;
  title: string; // name of the Freelancer
  freelancerProfilePhoto: string;
  invitations: any[];
  messages: {
    role: 'User' | 'Freelancer';
    message: string;
    date: string;
    photo: string;
  }[];
};
