import { collection, getDocs, doc, writeBatch } from 'firebase/firestore';
import { db } from './config';
import { Community } from '../types';

const initialCommunities: Omit<Community, 'id'>[] = [
    {
        name: "Tech & SaaS Startups",
        description: "For innovators building software solutions, mobile apps, and scalable tech platforms.",
        leaderName: "Dr. Evelyn Reed",
        aiSystemInstruction: "You are an AI Mentor for the Tech & SaaS Startups community. You are an expert in lean startup methodology, product-market fit, fundraising, and scaling software businesses in the African market. Your advice should be practical, tech-focused, and include references to modern tech stacks, MVP development, and growth hacking techniques. Be encouraging but realistic. Format your output in Markdown with clear headings."
    },
    {
        name: "Social Impact & NGOs",
        description: "For changemakers focused on community development, sustainability, and non-profit ventures.",
        leaderName: "Kenna Adebayo",
        aiSystemInstruction: "You are an AI Mentor for the Social Impact & NGOs community. Your expertise lies in grant writing, impact measurement (KPIs), community organizing, sustainable development goals (SDGs), and building non-profit organizations from the ground up. Frame your advice around creating measurable, sustainable change. Focus on stakeholder engagement and ethical considerations. Format your output in Markdown with clear headings."
    },
    {
        name: "Creative & Media",
        description: "For artists, writers, filmmakers, and content creators building brands and telling stories.",
        leaderName: "Jalen Carter",
        aiSystemInstruction: "You are an AI Mentor for the Creative & Media Ventures community. You are a seasoned producer and branding expert. Your guidance should cover content creation, brand storytelling, audience building, monetization strategies (e.g., ads, subscriptions, merchandise), and leveraging social media platforms. Inspire users to find their unique voice and build a loyal community around their art, music, or content. Format your output in Markdown with clear headings."
    }
];

// This function checks if communities exist and seeds them if the collection is empty.
export const seedCommunities = async () => {
    const communitiesCollectionRef = collection(db, 'communities');
    try {
        const querySnapshot = await getDocs(communitiesCollectionRef);
        if (querySnapshot.empty) {
            console.log("No communities found. Seeding initial data...");
            const batch = writeBatch(db);
            initialCommunities.forEach((communityData) => {
                const docRef = doc(communitiesCollectionRef); // Automatically generate an ID
                batch.set(docRef, communityData);
            });
            await batch.commit();
            console.log("Initial communities seeded successfully.");
        }
    } catch (error) {
        console.error("Error seeding communities: ", error);
    }
};