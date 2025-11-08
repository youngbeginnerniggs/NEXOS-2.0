import { db } from './config';
import { doc, updateDoc, increment } from 'firebase/firestore';

export const IVS_POINTS = {
    CREATE_POST: 10,
    ADD_REPLY: 5,
    REFINE_IDEA: 20,
    SIGNUP_BONUS: 2,
    ACTIVATION_CODE_BONUS: 50,
    JOIN_COLLABORATION: 3,
};

export const updateUserIvs = async (userId: string, points: number) => {
    if (!userId || points === 0) return;
    try {
        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, {
            ivs: increment(points)
        });
    } catch (error) {
        console.error("Error updating IVS:", error);
    }
};