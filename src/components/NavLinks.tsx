
import React from 'react';
import { NavLink } from 'react-router-dom';
import { navLinks } from '@/lib/navLinks';

const NavLinks = () => {
  return (
    <div className="hidden md:flex items-center space-x-6">
      {navLinks.map((link) => (
        <NavLink
          key={link.href}
          to={link.href}
          className={({ isActive }) =>
            isActive
              ? "py-2 px-3 font-medium bg-primary/10 text-primary rounded-lg"
              : "py-2 px-3 font-medium hover:bg-secondary/80 rounded-lg transition-colors"
          }
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
