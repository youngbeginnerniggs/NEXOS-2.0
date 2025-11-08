import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from './config';
import { UserProfile } from '../types';

export const getTopUsersByIvs = async (userLimit: number): Promise<UserProfile[]> => {
    try {
        const usersCollectionRef = collection(db, 'users');
        const q = query(usersCollectionRef, orderBy('ivs', 'desc'), limit(userLimit));
        const querySnapshot = await getDocs(q);
        
        const users: UserProfile[] = [];
        querySnapshot.forEach((doc) => {
            users.push(doc.data() as UserProfile);
        });

        return users;

    } catch (error) {
        console.error("Error fetching top users by IVS:", error);
        return [];
    }
};