import { Timestamp } from 'firebase/firestore';

export type Page = 'home' | 'philosophy' | 'how-it-works' | 'partners' | 'community' | 'hub' | 'signup' | 'profile' | 'edit-profile' | 'opportunities';

export type UserRole = 'student' | 'tutor' | 'admin';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string;
  role: UserRole;
  avatarUrl: string;
  ivs: number; // Initiative Vetting Score
  socials?: {
    discord?: string;
    twitter?: string;
    linkedin?: string;
  };
  resumeUrl?: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  leaderName: string;
  aiSystemInstruction: string;
  icon?: string; 
}

export interface Post {
  id: string;
  communityId: string;
  communityName?: string; // Optional: for display on main feed
  authorId: string;
  authorName: string;
  authorAvatar: string;
  title: string;
  idea: string;
  timestamp: number;
  collaborators: number;
  collaboratorIds: string[];
  likes: number;
  imageUrl?: string;
}

export interface Reply {
    id: string;
    authorId: string;
    authorName: string;
    authorAvatar: string;
    text: string;
    timestamp: number;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  company: string;
  requiredIvs: number;
  url: string;
  category: string;
}