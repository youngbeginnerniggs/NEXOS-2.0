import React, { useState, useEffect, useContext } from 'react';
import { Post, Reply, Page } from '../types';
import { UsersIcon } from './icons/UsersIcon';
import { PencilIcon } from './icons/PencilIcon';
import ReplyCard from './Reply';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, updateDoc, increment, arrayUnion, arrayRemove } from 'firebase/firestore';
import { updateUserIvs, IVS_POINTS } from '../firebase/ivs';

interface PostCardProps {
  post: Post;
  onNavigate: (page: Page) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onNavigate }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [newReply, setNewReply] = useState('');
  const [isSubmittingAction, setIsSubmittingAction] = useState(false);
  const { user, userProfile, refreshUserProfile } = useContext(AuthContext);

  const [isJoined, setIsJoined] = useState(user ? post.collaboratorIds?.includes(user.uid) : false);

  useEffect(() => {
    setIsJoined(user ? post.collaboratorIds?.includes(user.uid) : false);
  }, [post.collaboratorIds, user]);


  useEffect(() => {
    if (!showReplies) return;

    const repliesCollectionRef = collection(db, "posts", post.id, "replies");
    const q = query(repliesCollectionRef, orderBy("timestamp", "asc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const repliesData: Reply[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        repliesData.push({
            ...data,
            id: doc.id,
            timestamp: data.timestamp?.toMillis() || Date.now(),
        } as Reply);
      });
      setReplies(repliesData);
    });

    return () => unsubscribe();
  }, [showReplies, post.id]);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newReply.trim() === '' || !user || !userProfile) return;

    const repliesCollectionRef = collection(db, "posts", post.id, "replies");
    await addDoc(repliesCollectionRef, {
      authorId: user.uid,
      authorName: userProfile.displayName,
      authorAvatar: userProfile.avatarUrl,
      text: newReply,
      timestamp: serverTimestamp(),
    });

    await updateUserIvs(user.uid, IVS_POINTS.ADD_REPLY);
    await refreshUserProfile();
    setNewReply('');
  };

  const handleToggleCollaboration = async () => {
    if (!user || !userProfile) return;
    setIsSubmittingAction(true);
    try {
        const postRef = doc(db, 'posts', post.id);
        if (isJoined) {
            // User is leaving
            await updateDoc(postRef, {
                collaborators: increment(-1),
                collaboratorIds: arrayRemove(user.uid)
            });
            await updateUserIvs(user.uid, -IVS_POINTS.JOIN_COLLABORATION);
        } else {
            // User is joining
            await updateDoc(postRef, {
                collaborators: increment(1),
                collaboratorIds: arrayUnion(user.uid)
            });
            await updateUserIvs(user.uid, IVS_POINTS.JOIN_COLLABORATION);
        }
        await refreshUserProfile();
    } catch (error) {
        console.error("Error toggling collaboration:", error);
    } finally {
        setIsSubmittingAction(false);
    }
  };

  const postTimestamp = post.timestamp ? new Date(post.timestamp).toLocaleDateString() : '...';

  return (
    <div className="bg-surface rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img className="h-12 w-12 rounded-full object-cover" src={post.authorAvatar} alt={`${post.authorName}'s avatar`} />
          <div className="ml-4">
            <p className="text-lg font-bold text-text font-heading">{post.authorName}</p>
            <p className="text-sm text-text-secondary">{postTimestamp}</p>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-primary mb-2 font-heading">{post.title}</h3>
        
        {post.imageUrl && (
            <div className="my-4">
                <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-96 object-cover rounded-lg shadow-md" />
            </div>
        )}

        <p className="text-text-secondary mb-4">{post.idea}</p>
        <div className="flex items-center justify-between text-text-secondary border-t border-secondary pt-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center text-sm">
              <UsersIcon className="w-5 h-5 mr-1" />
              {post.collaborators} collaborators
            </span>
             <span className="flex items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              {post.likes} likes
            </span>
          </div>
          <div className="flex items-center gap-4">
             <button
                onClick={handleToggleCollaboration}
                disabled={!user || isSubmittingAction}
                className={`font-semibold py-2 px-4 rounded-full transition duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                    isJoined 
                    ? 'bg-primary text-background' 
                    : 'bg-secondary text-text hover:bg-primary hover:text-background'
                }`}
            >
                {isJoined ? 'Leave' : 'Join'}
            </button>
            <button onClick={() => setShowReplies(!showReplies)} className="flex items-center text-sm font-semibold text-primary hover:opacity-80 transition">
              <PencilIcon className="w-4 h-4 mr-1" />
              {showReplies ? 'Hide Thread' : 'Discuss'}
            </button>
          </div>
        </div>
      </div>
      {showReplies && (
        <div className="bg-background p-4 md:p-6 border-t border-secondary">
          <h4 className="text-lg font-bold text-text mb-4 font-heading">Collaboration Thread</h4>
          <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
            {replies.length > 0 ? replies.map(reply => <ReplyCard key={reply.id} reply={reply} />) : <p className="text-text-secondary text-sm">No replies yet. Be the first to collaborate!</p>}
          </div>
          {user ? (
            <form onSubmit={handleReplySubmit} className="mt-4 flex gap-2">
              <input 
                type="text"
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Add your thoughts..."
                className="flex-grow p-2 bg-surface text-text border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition text-sm"
              />
              <button type="submit" className="bg-primary text-background font-bold py-2 px-4 rounded-lg hover:opacity-80 transition text-sm">Reply</button>
            </form>
          ) : (
            <div className="mt-4 text-center">
                <button 
                    onClick={() => onNavigate('signup')}
                    className="bg-secondary text-text font-bold py-2 px-6 rounded-full hover:bg-primary hover:text-background transition duration-300 text-sm"
                >
                    Sign Up to Collaborate
                </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;