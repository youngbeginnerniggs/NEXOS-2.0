import React from 'react';
import { Opportunity, UserRole } from '../types';
import { LockClosedIcon } from './icons/LockClosedIcon';

interface OpportunityCardProps {
    opportunity: Opportunity;
    userIvs: number;
    userRole: UserRole;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, userIvs, userRole }) => {
    const isAdmin = userRole === 'admin';
    const isLocked = !isAdmin && userIvs < opportunity.requiredIvs;
    const progressPercentage = opportunity.requiredIvs > 0 ? Math.min((userIvs / opportunity.requiredIvs) * 100, 100) : 0;

    return (
        <div className={`bg-surface rounded-lg shadow-lg p-6 border-l-4 ${isLocked ? 'border-secondary' : 'border-primary'} transition-all duration-300 ${isLocked ? 'opacity-70' : ''}`}>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-text font-heading">{opportunity.title}</h3>
                    <p className="text-sm font-semibold text-primary">{opportunity.company}</p>
                </div>
                {isLocked && <LockClosedIcon className="w-6 h-6 text-text-secondary" />}
            </div>
            <p className="mt-2 text-text-secondary">{opportunity.description}</p>
            
            {!isAdmin && (
                <div className="mt-4">
                    <div className="flex justify-between items-baseline mb-1">
                        <span className="text-sm font-medium text-text">Your Progress</span>
                        <span className="text-xs font-medium text-text-secondary">{userIvs} / {opportunity.requiredIvs} IVS</span>
                    </div>
                    {/* Enhanced Progress Bar */}
                    <div className="w-full bg-secondary rounded-full h-4 relative">
                        <div 
                            className={`h-4 rounded-full flex items-center justify-center text-xs font-bold text-background transition-all duration-500 ease-in-out ${isLocked ? 'bg-text-secondary' : 'bg-primary'}`} 
                            style={{ width: `${progressPercentage}%` }}
                        >
                            {progressPercentage > 15 && `${progressPercentage.toFixed(0)}%`}
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-4 pt-4 border-t border-secondary flex justify-between items-center">
                <span className="font-bold text-text-secondary">Requires: <span className={isLocked ? "text-text-secondary" : "text-primary"}>{opportunity.requiredIvs} IVS</span></span>
                {isAdmin ? (
                     <a href={opportunity.url} target="_blank" rel="noopener noreferrer" className="bg-secondary text-primary font-bold py-2 px-4 rounded-full hover:opacity-80 transition text-sm">
                        Admin Access
                    </a>
                ) : isLocked ? (
                    <span className="bg-secondary text-text-secondary font-bold py-2 px-4 rounded-full text-sm">Locked</span>
                ) : (
                    <a href={opportunity.url} target="_blank" rel="noopener noreferrer" className="bg-primary text-background font-bold py-2 px-4 rounded-full hover:opacity-80 transition text-sm">
                        Apply Now
                    </a>
                )}
            </div>
        </div>
    );
};

export default OpportunityCard;