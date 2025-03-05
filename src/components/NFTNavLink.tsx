
import React from 'react';
import { NavLink } from 'react-router-dom';

const NFTNavLink = () => {
  return (
    <NavLink 
      to="/nft-predictions" 
      className={({ isActive }) => 
        isActive 
          ? "py-2 px-3 font-medium bg-primary/10 text-primary rounded-lg" 
          : "py-2 px-3 font-medium hover:bg-secondary/80 rounded-lg transition-colors"
      }
    >
      NFT Predictions
    </NavLink>
  );
};

export default NFTNavLink;
