
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const HomeButton = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center gap-2 py-2 px-4 text-sm bg-secondary/50 hover:bg-secondary rounded-lg transition-colors"
    >
      <Home size={16} />
      <span>Back to Home</span>
    </Link>
  );
};

export default HomeButton;
