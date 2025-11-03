import React, { useState, useEffect, useContext } from 'react';
import { Post, Reply } from '../types';
import { UsersIcon } from './icons/UsersIcon';
import { PencilIcon } from './icons/PencilIcon';
import ReplyCard from './Reply';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [newReply, setNewReply] = useState('');
  const { user, userProfile } = useContext(AuthContext);

  useEffect(() => {
    if (!showReplies) return;

    const repliesCollectionRef = collection(db, "posts", post.id, "replies");
    const q = query(repliesCollectionRef, orderBy("timestamp", "asc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const repliesData: Reply[] = [];
      querySnapshot.forEach((doc) => {
        repliesData.push({ id: doc.id, ...doc.data() } as Reply);
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
    setNewReply('');
  };

  const postTimestamp = post.timestamp?.toDate().toLocaleDateString() || '...';

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
          <button onClick={() => setShowReplies(!showReplies)} className="flex items-center text-sm font-semibold text-primary hover:opacity-80 transition">
            <PencilIcon className="w-4 h-4 mr-1" />
            {showReplies ? 'Hide Replies' : 'Collaborate'}
          </button>
        </div>
      </div>
      {showReplies && (
        <div className="bg-background p-4 md:p-6 border-t border-secondary">
          <h4 className="text-lg font-bold text-text mb-4 font-heading">Collaboration Thread</h4>
          <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
            {replies.length > 0 ? replies.map(reply => <ReplyCard key={reply.id} reply={reply} />) : <p className="text-text-secondary text-sm">No replies yet. Be the first to collaborate!</p>}
          </div>
          {user && (
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
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;