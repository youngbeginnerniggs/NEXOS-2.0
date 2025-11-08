import React from 'react';
import { UserProfile } from '../types';
import { CrownIcon } from './icons/CrownIcon';

interface LeaderboardProps {
    users: UserProfile[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
    return (
        <div className="space-y-4">
            {users.map((user, index) => (
                <div key={user.uid} className="flex items-center gap-4 bg-background p-3 rounded-lg">
                    <span className="font-bold text-lg text-text-secondary w-6 text-center">{index + 1}</span>
                    <img src={user.avatarUrl} alt={user.displayName} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-grow">
                        <p className="font-bold text-text flex items-center">
                            {user.displayName}
                            {index === 0 && <CrownIcon className="w-5 h-5 ml-1 text-yellow-400" />}
                        </p>
                        <p className="text-sm text-primary font-semibold">{user.ivs} IVS</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Leaderboard;