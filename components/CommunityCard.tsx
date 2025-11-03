import React from 'react';
import { Community } from '../types';

interface CommunityCardProps {
  community: Community;
  onSelect: () => void;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ community, onSelect }) => {
  return (
    <div className="bg-surface rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-primary/20">
      <div className="p-6 flex-grow">
        <h3 className="text-2xl font-bold text-primary font-heading">{community.name}</h3>
        <p className="mt-2 text-text-secondary text-sm">{community.description}</p>
      </div>
      <div className="p-6 bg-surface border-t border-secondary flex flex-col justify-end">
        <p className="text-sm text-text-secondary mb-4">Community Lead: <span className="font-semibold text-text">{community.leaderName}</span></p>
        <button
          onClick={onSelect}
          className="w-full bg-secondary text-text font-bold py-2 px-4 rounded-lg hover:bg-primary hover:text-background transition duration-300"
        >
          Enter Hub
        </button>
      </div>
    </div>
  );
};

export default CommunityCard;