import React, { useState, useEffect, useContext } from 'react';
import { Post, Community, Page } from '../types';
import AIMentor from './AIMentor';
import PostCard from './PostCard';
import CommunityCard from './CommunityCard';
import { AuthContext } from '../context/AuthContext';
import { db, storage } from '../firebase/config';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { seedCommunities, seedOpportunities } from '../firebase/seed';
import { updateUserIvs, IVS_POINTS } from '../firebase/ivs';
import { PhotoIcon } from './icons/PhotoIcon';

interface InitiativeHubProps {
  onNavigate: (page: Page) => void;
}

const InitiativeHub: React.FC<InitiativeHubProps> = ({ onNavigate }) => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newIdea, setNewIdea] = useState('');
  const [loading, setLoading] = useState(true);
  const { user, userProfile, refreshUserProfile } = useContext(AuthContext);

  // States for image upload
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    // Seed initial data if they don't exist
    seedCommunities();
    seedOpportunities();

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
        const data = doc.data();
        postsData.push({
            ...data,
            id: doc.id,
            timestamp: data.timestamp?.toMillis() || Date.now(),
            collaboratorIds: data.collaboratorIds || [],
        } as Post);
      });
      setPosts(postsData);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [selectedCommunity]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newIdea.trim() === '' || !user || !userProfile || !selectedCommunity) return;

    setIsSubmitting(true);
    let imageUrl = '';

    try {
      if (imageFile) {
        const storageRef = ref(storage, `posts/${Date.now()}_${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => {
              console.error("Upload failed:", error);
              reject(error);
            },
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      await addDoc(collection(db, "posts"), {
        communityId: selectedCommunity.id,
        authorId: user.uid,
        authorName: userProfile.displayName,
        authorAvatar: userProfile.avatarUrl,
        title: newIdea.substring(0, 40) + (newIdea.length > 40 ? '...' : ''),
        idea: newIdea,
        timestamp: serverTimestamp(),
        collaborators: 0,
        collaboratorIds: [],
        likes: 0,
        ...(imageUrl && { imageUrl }),
      });

      await updateUserIvs(user.uid, IVS_POINTS.CREATE_POST);
      await refreshUserProfile();
      
      // Reset form
      setNewIdea('');
      setImageFile(null);
      setImagePreview(null);

    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(null);
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
            <div className="bg-surface rounded-lg shadow-md p-6 relative">
              <h2 className="text-2xl font-bold mb-4 text-text font-heading">Post a New Idea</h2>
              <form onSubmit={handlePostSubmit}>
                <textarea
                  className="w-full p-3 bg-background text-text border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  rows={4}
                  placeholder="Share your raw idea with the community..."
                  value={newIdea}
                  onChange={(e) => setNewIdea(e.target.value)}
                  disabled={!user || isSubmitting}
                />
                 {/* Image Upload Section */}
                <div className="mt-4">
                    <label htmlFor="idea-image-upload" className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-secondary text-text-secondary rounded-lg hover:bg-secondary hover:text-text transition">
                        <PhotoIcon className="w-5 h-5" />
                        <span>{imageFile ? "Change Image" : "Add Image"}</span>
                    </label>
                    <input id="idea-image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} disabled={isSubmitting} />
                </div>

                {imagePreview && (
                    <div className="mt-4 relative">
                        <img src={imagePreview} alt="Selected preview" className="w-full max-h-60 object-cover rounded-lg" />
                        <button
                            type="button"
                            onClick={() => { if(!isSubmitting) { setImageFile(null); setImagePreview(null); }}}
                            className="absolute top-2 right-2 bg-background/70 text-text rounded-full p-1 hover:bg-background disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}

                {isSubmitting && uploadProgress !== null && (
                    <div className="mt-4">
                        <div className="w-full bg-secondary rounded-full h-2.5">
                            <div className="bg-primary h-2.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                        <p className="text-sm text-center text-text-secondary mt-1">Uploading... {uploadProgress.toFixed(0)}%</p>
                    </div>
                )}

                <button
                  type="submit"
                  disabled={!user || isSubmitting || newIdea.trim() === ''}
                  className="mt-4 w-full bg-primary text-background font-bold py-3 px-4 rounded-lg hover:opacity-80 transition duration-300 font-heading disabled:bg-secondary disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Posting...' : `Post to ${selectedCommunity.name}`}
                </button>
              </form>
              {!user && (
                <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg">
                    <p className="text-text font-bold text-lg">Want to post your idea?</p>
                    <button 
                        onClick={() => onNavigate('signup')}
                        className="mt-4 bg-primary text-background font-bold py-2 px-6 rounded-full hover:opacity-80 transition duration-300"
                    >
                        Sign Up to Participate
                    </button>
                </div>
              )}
            </div>
            
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-text font-heading">Community Feed</h2>
              {loading ? <p className="text-text-secondary">Loading posts...</p> : (
                <div className="space-y-6">
                  {posts.length > 0 ? (
                     posts.map(post => <PostCard key={post.id} post={post} onNavigate={onNavigate} />)
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
                onNavigate={onNavigate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitiativeHub;