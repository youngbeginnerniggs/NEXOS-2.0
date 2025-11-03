import React, { useState, useEffect, useContext } from 'react';
import { Post, Community } from '../types';
import AIMentor from './AIMentor';
import PostCard from './PostCard';
import CommunityCard from './CommunityCard';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase/config';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { seedCommunities } from '../firebase/seed';

const InitiativeHub: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newIdea, setNewIdea] = useState('');
  const [loading, setLoading] = useState(true);
  const { user, userProfile } = useContext(AuthContext);

  useEffect(() => {
    // Seed initial communities if they don't exist
    seedCommunities();

    const communitiesCollectionRef = collection(db, "communities");
    const q = query(communitiesCollectionRef, orderBy("name"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const communitiesData: Community[] = [];
      querySnapshot.forEach((doc) => {
        communitiesData.push({ id: doc.id, ...doc.data() } as Community);
      });
      setCommunities(communitiesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!selectedCommunity) {
      setPosts([]);
      return;
    }

    setLoading(true);
    const postsCollectionRef = collection(db, "posts");
    const q = query(
      postsCollectionRef, 
      where("communityId", "==", selectedCommunity.id),
      orderBy("timestamp", "desc")
    );
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData: Post[] = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() } as Post);
      });
      setPosts(postsData);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [selectedCommunity]);

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newIdea.trim() === '' || !user || !userProfile || !selectedCommunity) return;

    try {
      await addDoc(collection(db, "posts"), {
        communityId: selectedCommunity.id,
        authorId: user.uid,
        authorName: userProfile.displayName,
        authorAvatar: userProfile.avatarUrl,
        title: newIdea.substring(0, 40) + (newIdea.length > 40 ? '...' : ''),
        idea: newIdea,
        timestamp: serverTimestamp(),
        collaborators: 0,
        likes: 0,
      });
      setNewIdea('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  if (loading && communities.length === 0) {
    return <div className="text-center py-20 text-text-secondary">Loading Hub...</div>;
  }

  // Community Selection View
  if (!selectedCommunity) {
    return (
      <div className="bg-background min-h-full py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-text font-heading">Welcome to the Initiative Hub</h1>
            <p className="mt-2 text-xl text-text-secondary max-w-3xl mx-auto">
              Choose a community to join the conversation, collaborate on ideas, and get specialized mentorship.
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communities.map(community => (
              <CommunityCard key={community.id} community={community} onSelect={() => setSelectedCommunity(community)} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Single Community View
  return (
    <div className="bg-background min-h-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
            onClick={() => setSelectedCommunity(null)} 
            className="mb-8 text-primary font-semibold hover:opacity-80 transition-opacity"
        >
            &larr; Back to All Communities
        </button>
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-text font-heading">{selectedCommunity.name}</h1>
          <p className="mt-2 text-xl text-text-secondary max-w-3xl mx-auto">
            {selectedCommunity.description}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-text font-heading">Post a New Idea</h2>
              <form onSubmit={handlePostSubmit}>
                <textarea
                  className="w-full p-3 bg-background text-text border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  rows={4}
                  placeholder="Share your raw idea with the community..."
                  value={newIdea}
                  onChange={(e) => setNewIdea(e.target.value)}
                />
                <button
                  type="submit"
                  className="mt-4 w-full bg-primary text-background font-bold py-3 px-4 rounded-lg hover:opacity-80 transition duration-300 font-heading"
                >
                  Post to {selectedCommunity.name}
                </button>
              </form>
            </div>
            
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-text font-heading">Community Feed</h2>
              {loading ? <p className="text-text-secondary">Loading posts...</p> : (
                <div className="space-y-6">
                  {posts.length > 0 ? (
                     posts.map(post => <PostCard key={post.id} post={post} />)
                  ) : (
                    <p className="text-text-secondary text-center py-8">No ideas posted here yet. Be the first to start a conversation!</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <AIMentor 
                communityName={selectedCommunity.name}
                aiSystemInstruction={selectedCommunity.aiSystemInstruction} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitiativeHub;