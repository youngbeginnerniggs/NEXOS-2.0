import React from 'react';
import { Reply } from '../types';

interface ReplyCardProps {
    reply: Reply;
}

const ReplyCard: React.FC<ReplyCardProps> = ({ reply }) => {

    const timestampDate = reply.timestamp ? new Date(reply.timestamp) : null;
    const replyTimestamp = timestampDate ? `${timestampDate.toLocaleTimeString()} on ${timestampDate.toLocaleDateString()}` : '...';

    return (
        <div className="flex items-start space-x-3">
            <img className="h-8 w-8 rounded-full object-cover" src={reply.authorAvatar} alt={`${reply.authorName}'s avatar`} />
            <div className="flex-1 bg-background p-3 rounded-lg">
                <div className="flex items-baseline gap-2">
                    <p className="text-sm font-bold text-text">{reply.authorName}</p>
                    <p className="text-xs text-text-secondary">{replyTimestamp}</p>
                </div>
                <p className="text-sm text-text-secondary mt-1">{reply.text}</p>
            </div>
        </div>
    );
};

export default ReplyCard;