import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as RouterLink, NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const NavLinkItem = ({ link, scrolled, closeMenu, isMobile, alwaysWhiteText, topTextColor }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const handleMouseEnter = () => {
    if (!isMobile) setIsDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    if (!isMobile) setIsDropdownOpen(false);
  };
  
  const toggleDropdown = (e) => {
    if (isMobile && link.type === "dropdown") {
      e.preventDefault(); 
      setIsDropdownOpen(!isDropdownOpen);
    } else if (isMobile && closeMenu) {
        closeMenu();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const baseLinkClasses = `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out`;
  
  const getTextStateClasses = (isMobileLink) => {
    if (alwaysWhiteText) {
      return `${topTextColor} hover:text-primary hover:bg-primary/5`;
    }
    if (scrolled) {
      return 'text-heading-foreground hover:text-primary hover:bg-primary/5';
    }
    return isMobileLink ? 'text-white/90 hover:text-white hover:bg-white/10' : `${topTextColor} hover:text-primary hover:bg-primary/5 text-shadow-on-dark-bg`;
  };

  const getActiveClasses = (isMobileLink, isActive) => {
    if (!isActive) return '';
    if (alwaysWhiteText) {
      return `text-primary bg-primary/10 font-semibold`;
    }
    if (scrolled) {
      return 'text-primary bg-primary/10 font-semibold';
    }
    return isMobileLink ? 'text-white bg-white/15 font-semibold' : `text-primary bg-primary/10 font-semibold`;
  };

  const linkClasses = cn(baseLinkClasses, getTextStateClasses(isMobile));
  
  const getDropdownBgColor = () => {
    if (isMobile) {
      return alwaysWhiteText ? 'bg-transparent' : (scrolled ? 'bg-background/95' : 'bg-black/80 backdrop-blur-xl');
    }
    return alwaysWhiteText ? (topTextColor.includes('white') ? 'bg-black/50 backdrop-blur-md' : 'bg-card/95 backdrop-blur-md') : (scrolled ? 'bg-card/95 backdrop-blur-md' : 'bg-black/50 backdrop-blur-md');
  };
  
  const getDropdownItemTextColor = () => {
    if (isMobile) {
        return alwaysWhiteText ? (topTextColor.includes('white') ? 'text-white/80 hover:text-white hover:bg-white/5' : `${topTextColor} hover:text-primary hover:bg-primary/5` ) : (scrolled ? 'text-heading-foreground hover:text-primary hover:bg-muted' : 'text-white/80 hover:text-white hover:bg-white/5');
    }
    return alwaysWhiteText ? (topTextColor.includes('white') ? 'text-white/80 hover:text-white hover:bg-white/5' : 'text-muted-foreground hover:text-primary hover:bg-muted') : (scrolled ? 'text-muted-foreground hover:text-primary hover:bg-muted' : 'text-white/80 hover:text-white hover:bg-white/5');
  };

  const getActiveDropdownItemTextColor = () => {
     if (isMobile) {
        return alwaysWhiteText ? (topTextColor.includes('white') ? 'text-white bg-white/10 font-medium' : 'text-primary bg-primary/10 font-medium') : (scrolled ? 'text-primary bg-primary/10 font-medium' : 'text-white bg-white/10 font-medium');
    }
    return alwaysWhiteText ? (topTextColor.includes('white') ? 'text-white bg-white/10 font-medium' : 'text-primary bg-primary/10 font-medium') : (scrolled ? 'text-primary bg-primary/10 font-medium' : 'text-white bg-white/10 font-medium');
  };


  if (link.type === "dropdown") {
    const isParentActive = link.subLinks.some(subLink => location.pathname + location.hash === subLink.path || location.pathname === subLink.path);
    return (
      <div 
        className={`relative ${isMobile ? 'w-full' : ''}`} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        ref={dropdownRef}
      >
        <button
          onClick={toggleDropdown}
          className={cn(
            linkClasses, 
            isParentActive && getActiveClasses(isMobile, true),
            `flex items-center ${isMobile ? 'w-full justify-between' : ''}`
          )}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
        >
          {link.icon && !isMobile && React.cloneElement(link.icon, { className: cn(link.icon.props.className, 'mr-1.5 h-4 w-4')})}
          {link.name}
          <ChevronDown
            className={`ml-1 h-4 w-4 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={isMobile ? { opacity: 0, height: 0 } : { opacity: 0, y: 5 }}
              animate={isMobile ? { opacity: 1, height: 'auto' } : { opacity: 1, y: 0 }}
              exit={isMobile ? { opacity: 0, height: 0 } : { opacity: 0, y: 5 }}
              transition={{ duration: 0.2, ease: "circOut" }}
              className={cn(
                isMobile ? 'pl-4 mt-1 space-y-0.5' : `absolute left-0 mt-1 w-60 rounded-md shadow-2xl py-1.5 z-20 border border-border/30`,
                getDropdownBgColor()
              )}
            >
              {link.subLinks.map((subLink) => (
                <RouterNavLink
                  key={subLink.name}
                  to={subLink.path}
                  onClick={(e) => {
                    if (subLink.path.includes("#")) {
                      const [path, hash] = subLink.path.split("#");
                      if (location.pathname === path) {
                        e.preventDefault();
                        const element = document.getElementById(hash);
                        if (element) {
                          const offset = 80; 
                          const bodyRect = document.body.getBoundingClientRect().top;
                          const elementRect = element.getBoundingClientRect().top;
                          const elementPosition = elementRect - bodyRect;
                          const offsetPosition = elementPosition - offset;
                          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                        }
                      }
                    }
                    setIsDropdownOpen(false);
                    if (closeMenu) closeMenu();
                  }}
                  className={({ isActive }) => cn(
                    `block px-3 py-2 text-sm rounded-md transition-colors duration-150 ${isMobile ? 'w-full' : ''}`,
                    getDropdownItemTextColor(),
                    isActive && getActiveDropdownItemTextColor()
                  )}
                >
                  {subLink.name}
                   {subLink.description && !isMobile && <span className="block text-xs opacity-70 mt-0.5">{subLink.description}</span>}
                </RouterNavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <RouterNavLink
      to={link.path}
      onClick={(e) => {
        if (link.path.includes("#")) {
            const [path, hash] = link.path.split("#");
            if (location.pathname === path || (path === "/" && location.pathname === "/")) { // Check if on same page or home page for #contact
              e.preventDefault();
              const element = document.getElementById(hash);
              if (element) {
                const offset = 80; 
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }
        }
        if (isMobile && closeMenu) closeMenu();
      }}
      className={({ isActive }) => cn(linkClasses, getActiveClasses(isMobile, isActive), isMobile ? 'block w-full' : 'flex items-center')}
    >
      {link.icon && !isMobile && React.cloneElement(link.icon, { className: cn(link.icon.props.className, 'mr-1.5 h-4 w-4')})}
      {link.name}
    </RouterNavLink>
  );
};

export default NavLinkItem;