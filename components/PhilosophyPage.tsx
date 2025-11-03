import React from 'react';

const PhilosophyPage: React.FC = () => {
  return (
    <div className="py-16 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-text sm:text-4xl font-heading">
            Our Mandate: Fostering a Pipeline of Action-Oriented Youth
          </h2>
          <p className="mt-4 text-xl text-text-secondary max-w-4xl mx-auto">
            To design an organization and a platform that forces and rewards the smallest act of initiative, creating a pipeline of young leaders who can translate potential into applied action in the modern, digital economy.
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {/* Core Philosophy */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img src="https://picsum.photos/600/400?random=3" alt="Student writing" className="rounded-lg shadow-xl"/>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-primary font-heading">The Full Story: The Power of the Signature</h3>
              <p className="mt-4 text-lg text-text-secondary">
                When I was in high school, the flyer for the International Maths Olympiad seemed impossible. The names on the sign-up sheet were legends. Standing in front of that sheet, I felt the familiar weight of doubt. But then I had a moment of clarity. The one thing standing between me and the attempt wasn't a complex math problem or a lack of genius. It was just a pen and a blank line.
              </p>
               <p className="mt-2 text-text-secondary">
                That signature was the only thing I truly controlled. And that one small act of initiative changed everything. Signing up led to the first round of competition. The experience put me on the radar for the Pan-African Maths Olympiad and a spot at a summer camp in China. China led to connections with students and experts globally. None of those global opportunities would have materialized if I hadn't taken the most basic, lowest-effort step: claiming my spot.
              </p>
            </div>
          </div>
          
           {/* Target Impact */}
           <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="md:w-1/2">
              <img src="https://picsum.photos/600/400?random=4" alt="Collaboration" className="rounded-lg shadow-xl"/>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-primary font-heading">Our Target Impact</h3>
              <p className="mt-4 text-lg text-text-secondary">
                Our goal is to create action-oriented African youth who shift their mindset, gain agency, and translate talk into tangible projects that lead to real-world income and career paths. We measure success not by the number of sign-ups, but by the number of projects launched, collaborations formed, and opportunities seized.
              </p>
            </div>
          </div>

          {/* Transparency Section */}
          <div className="bg-surface rounded-lg p-8">
            <h3 className="text-2xl font-bold text-primary text-center font-heading mb-8">Our Journey & What's Next for PMA</h3>
            <div className="grid md:grid-cols-2 gap-10">
                <div>
                    <h4 className="font-bold text-text text-lg">Accomplishments We're Proud Of</h4>
                    <p className="text-text-secondary mt-2">Securing initial partnerships to provide real-world opportunities for our most active Hub members.</p>
                </div>
                 <div>
                    <h4 className="font-bold text-text text-lg">Challenges We've Run Into</h4>
                    <p className="text-text-secondary mt-2">Overcoming the initial inertia and convincing youth that this platform is a safe, non-judgmental space for raw ideas.</p>
                </div>
                 <div>
                    <h4 className="font-bold text-text text-lg">What We've Learned</h4>
                    <p className="text-text-secondary mt-2">The power of peer-to-peer encouragement is immense. The AI mentor is a great tool, but real collaboration is the magic ingredient.</p>
                </div>
                 <div>
                    <h4 className="font-bold text-text text-lg">What's Next for PMA</h4>
                    <p className="text-text-secondary mt-2">Launching the mobile app, securing our first Dedicated Opportunity Stream with the Government of Botswana, and expanding Activation Talks to 3 new countries.</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PhilosophyPage;
