import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Opportunity } from '../types';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import OpportunityCard from './OpportunityCard';

const CATEGORIES = ['All', 'Internship', 'Funding', 'Mentorship', 'Community'];

const OpportunitiesPage: React.FC = () => {
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [showLocked, setShowLocked] = useState(false); // Default to hiding locked opportunities

    const { userProfile } = useContext(AuthContext);

    useEffect(() => {
        const opportunitiesCollectionRef = collection(db, "opportunities");
        const q = query(opportunitiesCollectionRef, orderBy("requiredIvs", "asc"));
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const opportunitiesData: Opportunity[] = [];
            querySnapshot.forEach((doc) => {
                opportunitiesData.push({ id: doc.id, ...doc.data() } as Opportunity);
            });
            setOpportunities(opportunitiesData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const userIvs = userProfile?.ivs ?? 0;
    const userRole = userProfile?.role ?? 'student';

    const filteredAndSortedOpportunities = useMemo(() => {
        let result = [...opportunities];
        
        // Filtering by Category
        if (selectedCategory !== 'All') {
            result = result.filter(opp => opp.category === selectedCategory);
        }

        // Filtering by Locked Status
        if (!showLocked && userRole !== 'admin') {
            result = result.filter(opp => opp.requiredIvs <= userIvs);
        }
        
        // Sorting
        result.sort((a, b) => {
            if (sortBy === 'asc') {
                return a.requiredIvs - b.requiredIvs;
            } else {
                return b.requiredIvs - a.requiredIvs;
            }
        });
        
        return result;
    }, [opportunities, sortBy, selectedCategory, showLocked, userIvs, userRole]);


    if (loading) {
        return <div className="text-center py-20 text-text-secondary">Loading Opportunities...</div>;
    }

    return (
        <div className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-text sm:text-4xl font-heading">
                        Dedicated Opportunity Streams (DOS)
                    </h2>
                    <p className="mt-4 text-xl text-text-secondary max-w-4xl mx-auto">
                        Unlock real-world internships, funding, and mentorships by increasing your Initiative Vetting Score (IVS). Your actions in the Hub are the key.
                    </p>
                    <p className="mt-4 text-2xl font-bold">Your IVS: <span className="text-primary">{userIvs}</span></p>
                </div>

                {/* Filter and Sort Controls */}
                <div className="my-8 p-4 bg-surface rounded-lg shadow-md flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold mr-2">Filter by:</span>
                        {CATEGORIES.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${selectedCategory === category ? 'bg-primary text-background' : 'bg-secondary text-text hover:bg-primary/80'}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 flex-wrap justify-center">
                        {/* Toggle Switch */}
                        <div className="flex items-center gap-2">
                            <label htmlFor="show-locked-toggle" className="font-semibold text-sm cursor-pointer text-text-secondary">
                                Show Locked
                            </label>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    id="show-locked-toggle" 
                                    className="sr-only peer" 
                                    checked={showLocked}
                                    onChange={() => setShowLocked(!showLocked)}
                                    aria-checked={showLocked}
                                    role="switch"
                                />
                                <div className="w-11 h-6 bg-secondary rounded-full peer peer-focus:ring-2 peer-focus:ring-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                        {/* Sort Select */}
                        <div className="flex items-center gap-2">
                            <label htmlFor="sort-select" className="font-semibold text-sm">Sort by:</label>
                            <select 
                                id="sort-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'asc' | 'desc')}
                                className="bg-secondary text-text border-none rounded-md py-1 px-2 text-sm focus:ring-2 focus:ring-primary"
                            >
                                <option value="asc">IVS (Low to High)</option>
                                <option value="desc">IVS (High to Low)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mt-8 space-y-8">
                    {filteredAndSortedOpportunities.length > 0 ? (
                        filteredAndSortedOpportunities.map(opp => (
                            <OpportunityCard key={opp.id} opportunity={opp} userIvs={userIvs} userRole={userRole} />
                        ))
                    ) : (
                        <div className="text-center py-12 bg-surface rounded-lg">
                            <p className="text-text-secondary">No opportunities match the current filters.</p>
                            {!showLocked && <p className="text-sm text-text-secondary">Try enabling "Show Locked" to see what's next!</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OpportunitiesPage;