import React from 'react';

const BlogPage: React.FC = () => {
  return (
    <div className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-text sm:text-4xl font-heading">
            Stories from the Hub
          </h2>
          <p className="mt-4 text-xl text-text-secondary">
            Success stories, founder's notes, and news from Project Momentum Africa.
          </p>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-primary font-heading">Coming Soon!</h3>
          <p className="mt-4 text-lg text-text-secondary">
            We are currently gathering the inspiring stories of initiative from our community. Check back soon to read about the projects, collaborations, and opportunities being created by the youth in our Hub.
          </p>
        </div>

        {/* Example Post Layout */}
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {/* Placeholder 1 */}
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-surface/50 opacity-50">
            <div className="flex-shrink-0">
              <img className="h-48 w-full object-cover" src="https://picsum.photos/500/300?random=8" alt="" />
            </div>
            <div className="flex-1 bg-surface p-6 flex flex-col justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-primary">
                  Success Story
                </p>
                <a href="#" className="block mt-2">
                  <p className="text-xl font-semibold text-text">From Hub Idea to Community Impact</p>
                  <p className="mt-3 text-base text-text-secondary">How a simple idea posted in the Initiative Hub grew into a funded community project.</p>
                </a>
              </div>
            </div>
          </div>
          {/* Placeholder 2 */}
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-surface/50 opacity-50">
            <div className="flex-shrink-0">
              <img className="h-48 w-full object-cover" src="https://picsum.photos/500/300?random=9" alt="" />
            </div>
            <div className="flex-1 bg-surface p-6 flex flex-col justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-primary">
                  Founder's Note
                </p>
                <a href="#" className="block mt-2">
                  <p className="text-xl font-semibold text-text">The Fear of the Blank Page</p>
                  <p className="mt-3 text-base text-text-secondary">Overcoming the first and most difficult hurdle in any creative or entrepreneurial journey.</p>
                </a>
              </div>
            </div>
          </div>
          {/* Placeholder 3 */}
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-surface/50 opacity-50">
            <div className="flex-shrink-0">
              <img className="h-48 w-full object-cover" src="https://picsum.photos/500/300?random=10" alt="" />
            </div>
            <div className="flex-1 bg-surface p-6 flex flex-col justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-primary">
                  PMA News
                </p>
                <a href="#" className="block mt-2">
                  <p className="text-xl font-semibold text-text">New Partnership Announcement</p>
                  <p className="mt-3 text-base text-text-secondary">Welcoming our newest Opportunity Partner to create a Dedicated Opportunity Stream for tech internships.</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
