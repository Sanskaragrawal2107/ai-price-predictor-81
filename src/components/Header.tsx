
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import NavLinks from '@/components/NavLinks';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">AI<span className="text-primary">Chain</span></span>
        </Link>
        
        {/* Desktop Navigation */}
        <NavLinks />
        
        {/* Mobile Menu Button */}
        {isMobile && (
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg hover:bg-secondary/70 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>
      
      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            <Link 
              to="/" 
              className="py-2 px-3 font-medium hover:bg-secondary/80 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/nft-predictions" 
              className="py-2 px-3 font-medium hover:bg-secondary/80 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              NFT Predictions
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
