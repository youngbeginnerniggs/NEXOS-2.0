import { collection, getDocs, doc, writeBatch } from 'firebase/firestore';
import { db } from './config';
import { Community, Opportunity } from '../types';

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

const initialOpportunities: Omit<Opportunity, 'id'>[] = [
    {
        title: "Internship at Gov't of Botswana",
        description: "A 3-month internship with the Ministry of Innovation, working on digital transformation projects.",
        company: "Government of Botswana",
        requiredIvs: 500,
        url: "#",
        category: "Internship"
    },
    {
        title: "Seed Funding Pitch Session",
        description: "An exclusive opportunity to pitch your tech startup idea to a panel of venture capitalists.",
        company: "Africa Ventures Inc.",
        requiredIvs: 1000,
        url: "#",
        category: "Funding"
    },
    {
        title: "Mentorship with Kenna Adebayo",
        description: "A one-on-one mentorship program for aspiring social entrepreneurs. Limited to 5 participants.",
        company: "Social Impact & NGOs Community",
        requiredIvs: 250,
        url: "#",
        category: "Mentorship"
    },
    {
        title: "PMA Contributor Badge",
        description: "Get recognized as a key contributor in the PMA community, with special access to beta features.",
        company: "Project Momentum Africa",
        requiredIvs: 100,
        url: "#",
        category: "Community"
    },
    {
        title: "Content Creator Grant",
        description: "Receive a small grant and production support to create a short documentary about your community project.",
        company: "Creative & Media Hub",
        requiredIvs: 750,
        url: "#",
        category: "Funding"
    },
    {
        title: "Junior Developer Apprenticeship",
        description: "A paid 6-month apprenticeship with a leading SaaS company in Nairobi. For high-potential coders.",
        company: "SaaS Solutions Ltd.",
        requiredIvs: 1200,
        url: "#",
        category: "Internship"
    },
    {
        title: "Community Moderator Role",
        description: "Become a leader in the PMA Hub. Help guide conversations and welcome new members.",
        company: "Project Momentum Africa",
        requiredIvs: 150,
        url: "#",
        category: "Community"
    }
];


export const seedCommunities = async () => {
    const communitiesCollectionRef = collection(db, 'communities');
    try {
        const querySnapshot = await getDocs(communitiesCollectionRef);
        if (querySnapshot.empty) {
            console.log("No communities found. Seeding initial data...");
            const batch = writeBatch(db);
            initialCommunities.forEach((communityData) => {
                const docRef = doc(communitiesCollectionRef);
                batch.set(docRef, communityData);
            });
            await batch.commit();
            console.log("Initial communities seeded successfully.");
        }
    } catch (error) {
        console.error("Error seeding communities: ", error);
    }
};

export const seedOpportunities = async () => {
    const opportunitiesCollectionRef = collection(db, 'opportunities');
    try {
        const querySnapshot = await getDocs(opportunitiesCollectionRef);
        if (querySnapshot.empty) {
            console.log("No opportunities found. Seeding initial data...");
            const batch = writeBatch(db);
            initialOpportunities.forEach((oppData) => {
                const docRef = doc(opportunitiesCollectionRef);
                batch.set(docRef, oppData);
            });
            await batch.commit();
            console.log("Initial opportunities seeded successfully.");
        }
    } catch (error) {
        console.error("Error seeding opportunities: ", error);
    }
};