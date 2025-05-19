import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const navLinks = [
  { name: "Home", path: "/", type: "route" },
  { name: "Rooms", path: "/rooms", type: "route" },
  { 
    name: "Wellness", 
    type: "dropdown",
    subLinks: [
      { name: "Our Philosophy", path: "/about", type: "route" }, // or scroll to about section on home
      { name: "Spa Treatments", path: "/wellness#spa", type: "route-hash" }, // Assuming /wellness has sections
      { name: "Yoga & Meditation", path: "/wellness#mind-body", type: "route-hash"},
      { name: "Retreats", path: "/retreats", type: "route"}, // New page
    ]
  },
  { name: "Cultural Journeys", path: "cultural-experiences", type: "scroll", page: "/" },
  { name: "Contact", path: "contact", type: "scroll", page: "/" },
];

const NavLinkItem = ({ link, scrolled, onClick, isMobile, closeMenu }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const commonClasses = `px-3 py-2 text-sm font-medium transition-colors duration-300 ease-in-out relative group ${
    scrolled || isMobile ? 'text-foreground hover:text-primary-dark' : 'text-white/90 hover:text-white'
  }`;
  const activeClasses = scrolled || isMobile ? 'text-primary-dark font-bold' : 'text-white font-bold';

  const handleMouseEnter = () => {
    if (!isMobile && link.type === "dropdown") {
      setIsDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && link.type === "dropdown") {
      setIsDropdownOpen(false);
    }
  };
  
  const toggleDropdown = (e) => {
    if (isMobile && link.type === "dropdown") {
      e.preventDefault(); // Prevent navigation for parent dropdown item on mobile
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleSubLinkClick = () => {
    setIsDropdownOpen(false);
    closeMenu && closeMenu();
  };


  if (link.type === "dropdown") {
    return (
      <div 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} 
        className="relative"
      >
        <button
          onClick={toggleDropdown}
          className={`${commonClasses} flex items-center`}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
        >
          {link.name}
          <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 0 : 10, height: isMobile ? 0 : 'auto' }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: isMobile ? 0 : 10, height: isMobile ? 0 : 'auto' }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className={isMobile ? `pl-4 overflow-hidden` : `absolute left-0 mt-1 w-56 rounded-md shadow-xl bg-card/95 backdrop-blur-md py-2 z-20 border border-border/50`}
            >
              {link.subLinks.map(subLink => (
                <NavLinkItem key={subLink.name} link={subLink} scrolled={true} onClick={handleSubLinkClick} isMobile={isMobile} closeMenu={closeMenu} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }


  if (link.type === "route") {
    return (
      <RouterLink
        to={link.path}
        className={`${commonClasses} ${location.pathname === link.path ? activeClasses : ''} ${isMobile ? 'block w-full text-left py-2.5' : ''}`}
        onClick={onClick}
      >
        {link.name}
      </RouterLink>
    );
  }
  if (link.type === "route-hash") {
     return (
      <RouterLink
        to={link.path}
        className={`${commonClasses} ${location.pathname + location.hash === link.path ? activeClasses : ''} ${isMobile ? 'block w-full text-left py-2.5' : ''}`}
        onClick={(e) => {
          if(location.pathname === link.path.split('#')[0]) { // if on the same page
             e.preventDefault();
             const element = document.getElementById(link.path.split('#')[1]);
             if (element) {
                 const offset = 70; // Navbar height
                 const bodyRect = document.body.getBoundingClientRect().top;
                 const elementRect = element.getBoundingClientRect().top;
                 const elementPosition = elementRect - bodyRect;
                 const offsetPosition = elementPosition - offset;
                 window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
             }
          }
          onClick && onClick();
        }}
      >
        {link.name}
      </RouterLink>
    );
  }
  if (link.type === "scroll" && location.pathname === link.page) {
    return (
      <ScrollLink
        to={link.path}
        smooth={true}
        duration={700}
        offset={-80} 
        className={`${commonClasses} cursor-pointer ${isMobile ? 'block w-full text-left py-2.5' : ''}`}
        onClick={onClick}
        activeClass={activeClasses}
        spy={true}
      >
        {link.name}
      </ScrollLink>
    );
  }
  // If scroll target is on a different page, navigate first, then scroll if App.jsx handles it.
  if (link.type === "scroll" && location.pathname !== link.page) {
    return (
      <RouterLink
        to={`${link.page}#${link.path}`}
        className={`${commonClasses} ${isMobile ? 'block w-full text-left py-2.5' : ''}`}
        onClick={onClick}
      >
        {link.name}
      </RouterLink>
    );
  }
  return null;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] }}
      className={`fixed w-full z-50 transition-all duration-350 ease-in-out ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg shadow-lg py-3.5 border-b border-border/30"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <RouterLink to="/" className="flex items-center space-x-3 group" onClick={closeMenu}>
          <motion.img
            src="https://i.postimg.cc/3Nxp41Y1/annam-logo-no-bg.png" 
            alt="Annam Wellness Logo" 
            className="h-10 md:h-12 transition-all duration-300 group-hover:opacity-80"
            initial={{ opacity:0, scale:0.8 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ delay:0.2, duration:0.5 }}
          />
          <motion.span 
            initial={{ opacity:0, x:-10 }}
            animate={{ opacity:1, x:0 }}
            transition={{ delay:0.3, duration:0.5 }}
            className={`text-xl md:text-2xl font-serif tracking-wider ${scrolled ? 'text-primary-dark' : 'text-white text-shadow-subtle'}`}>
            Annam Wellness
          </motion.span>
        </RouterLink>

        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <NavLinkItem key={link.name} link={link} scrolled={scrolled} closeMenu={closeMenu} />
          ))}
           <RouterLink to="/booking" className="ml-3">
            <Button 
              variant="default"
              size="default"
              className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 px-6 py-2.5 rounded-lg"
            >
              Book Retreat
            </Button>
          </RouterLink>
        </nav>

        <button
          onClick={toggleMenu}
          className={`md:hidden p-2 focus:outline-none rounded-md transition-colors ${scrolled ? 'text-primary-dark hover:bg-primary/10' : 'text-white hover:bg-white/10'}`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 shadow-2xl absolute w-full"
          >
            <div className="container-custom py-5 flex flex-col space-y-1.5">
              {navLinks.map((link) => (
                 <NavLinkItem key={link.name} link={link} scrolled={true} onClick={closeMenu} isMobile={true} closeMenu={closeMenu}/>
              ))}
              <RouterLink to="/booking" className="mt-3">
                <Button className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white shadow-md py-3 text-base" onClick={closeMenu}>
                  Book Retreat
                </Button>
              </RouterLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;