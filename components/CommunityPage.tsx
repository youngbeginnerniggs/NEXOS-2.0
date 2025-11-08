import React, { useState, useEffect } from 'react';
import { Page, Post, UserProfile } from '../types';
import PostCard from './PostCard';
import Leaderboard from './Leaderboard';
import { db } from '../firebase/config';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { getTopUsersByIvs } from '../firebase/users';

interface CommunityPageProps {
  onNavigate: (page: Page) => void;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [topUsers, setTopUsers] = useState<UserProfile[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchTopUsers = async () => {
        setLoadingUsers(true);
        const users = await getTopUsersByIvs(5);
        setTopUsers(users);
        setLoadingUsers(false);
    };

    fetchTopUsers();
  }, []);

  useEffect(() => {
    setLoadingPosts(true);
    const postsCollectionRef = collection(db, "posts");
    const q = query(postsCollectionRef, orderBy("timestamp", "desc"), limit(10));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData: Post[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        postsData.push({
          ...data,
          id: doc.id,
          timestamp: data.timestamp?.toMillis() || Date.now(),
        } as Post);
      });
      setPosts(postsData);
      setLoadingPosts(false);
    }, (error) => {
        console.error("Error fetching recent posts:", error);
        setLoadingPosts(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-text font-heading">Community Hub</h1>
          <p className="mt-2 text-xl text-text-secondary max-w-3xl mx-auto">
            See the latest ideas, track the leaderboard, and jump into a specialized hub to collaborate.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Feed */}
            <div className="lg:col-span-2">
                 <h2 className="text-2xl font-bold mb-4 text-text font-heading">Recent Activity</h2>
                 {loadingPosts ? (
                    <p className="text-text-secondary">Loading feed...</p>
                 ) : (
                    <div className="space-y-6">
                        {posts.length > 0 ? (
                            posts.map(post => <PostCard key={post.id} post={post} onNavigate={onNavigate} />)
                        ) : (
                            <p className="text-text-secondary text-center py-8">No activity yet. Be the first to post in a hub!</p>
                        )}
                    </div>
                 )}
            </div>
            {/* Sidebar */}
            <div className="lg:col-span-1">
                <div className="bg-surface rounded-lg shadow-md p-6 sticky top-24">
                    <h2 className="text-2xl font-bold text-text font-heading mb-4">Leaderboard</h2>
                    {loadingUsers ? (
                         <p className="text-text-secondary">Loading leaders...</p>
                    ) : (
                        <Leaderboard users={topUsers} />
                    )}
                    <button 
                        onClick={() => onNavigate('hub')}
                        className="mt-6 w-full bg-primary text-background font-bold py-3 px-4 rounded-lg hover:opacity-80 transition duration-300 font-heading"
                    >
                        Explore All Hubs
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;