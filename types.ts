import { Timestamp } from 'firebase/firestore';

export type Page = 'home' | 'philosophy' | 'how-it-works' | 'partners' | 'blog' | 'hub' | 'login' | 'signup' | 'profile' | 'edit-profile';

export type UserRole = 'student' | 'tutor' | 'admin';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string;
  role: UserRole;
  avatarUrl: string;
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
  icon?: string; // e.g., an emoji or an identifier for an icon component
}

export interface Post {
  id: string;
  communityId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  title: string;
  idea: string;
  timestamp: Timestamp;
  collaborators: number;
  likes: number;
}

export interface Reply {
    id: string;
    authorId: string;
    authorName: string;
    authorAvatar: string;
    text: string;
    timestamp: Timestamp;
}