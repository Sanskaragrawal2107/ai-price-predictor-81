
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ease-in-out",
        scrolled 
          ? "glass border-b border-gray-100" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-medium">AP</span>
          </div>
          <h1 className="text-lg font-medium">
            AI Price <span className="font-light">Predictor</span>
          </h1>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <a href="#predictions" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
            Predictions
          </a>
          <a href="#verification" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
            Verification
          </a>
          <a href="#about" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
            About
          </a>
        </nav>
        
        <button className="text-sm font-medium bg-primary/10 text-primary px-4 py-2 rounded-full hover:bg-primary/20 transition-colors">
          Connect Wallet
        </button>
      </div>
    </header>
  );
};

export default Header;
