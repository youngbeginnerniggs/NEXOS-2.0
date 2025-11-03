import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface text-text">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-text-secondary">
          <p className="font-heading">&copy; {new Date().getFullYear()} Project Momentum Africa. All rights reserved.</p>
          <p className="mt-2 text-sm">Empowering the next generation of African leaders and innovators.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
