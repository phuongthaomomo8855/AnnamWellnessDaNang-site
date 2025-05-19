import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link as RouterLink, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/", type: "route" },
  {
    name: "Rooms",
    type: "dropdown",
    subLinks: [
      { name: "Rooms", path: "/rooms", type: "route" },
      { name: "Hotel Policies", path: "/hotel-policies", type: "route" }
    ]
  },
  {
    name: "Wellness",
    type: "dropdown",
    subLinks: [
      { name: "Our Philosophy", path: "/#philosophy", type: "route-hash" },
      { name: "Retreat Offers", path: "/wellness-menu", type: "route" }
    ]
  },
  { name: "Cultural Journeys", path: "/cultural-experiences", type: "route" },
  {
    name: "More",
    type: "dropdown",
    subLinks: [
      { name: "Extra Services", path: "/extra-services", type: "route" },
      { name: "Amenities", path: "/amenities", type: "route" },
      { name: "Blog", path: "/blog", type: "route" },
      { name: "Loyalty Program", path: "/loyalty", type: "route", id: "open-popup" }
    ]
  }
];

const NavLinkItem = ({ link, scrolled, onClick, isMobile, closeMenu }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const commonClasses = `px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-300 ease-in-out relative group ${
    scrolled || isMobile ? 'text-foreground hover:text-primary-dark' : 'text-white/90 hover:text-white'
  }`;
  const activeClasses = scrolled || isMobile ? 'text-primary-dark font-bold' : 'text-white font-bold';

  const handleMouseEnter = () => {
    if (!isMobile && link.type === "dropdown") setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile && link.type === "dropdown") setIsDropdownOpen(false);
  };

  const toggleDropdown = (e) => {
    if (isMobile && link.type === "dropdown") {
      e.preventDefault();
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleSubLinkClick = () => {
    setIsDropdownOpen(false);
    closeMenu && closeMenu();
  };

  if (link.type === "dropdown") {
    return (
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative">
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
              initial={{ opacity: 0, y: isMobile ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: isMobile ? 0 : 10 }}
              transition={{ duration: 0.25 }}
              className={isMobile 
  ? `pl-4 flex flex-col space-y-1` 
  : `absolute left-0 mt-1 w-56 rounded-md shadow-xl bg-card/95 backdrop-blur-md py-2 z-20 border border-border/50 flex flex-col space-y-1`
}
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

  return (
    <RouterLink
      to={link.path}
      id={link.id || undefined}
      className={`${commonClasses} ${location.pathname === link.path ? activeClasses : ''} ${isMobile ? 'block w-full text-left py-2.5' : ''}`}
      onClick={onClick}
    >
      {link.name}
    </RouterLink>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const btn = document.querySelector('#open-popup');
    const popup = document.getElementById('loyalty-popup');
    if (btn && popup) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        popup.classList.remove('hidden');
      });
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
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
              className="h-10 md:h-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className={`text-xl md:text-2xl font-serif tracking-wider ${scrolled ? 'text-primary-dark' : 'text-white text-shadow-subtle'}`}
            >
              Annam Wellness
            </motion.span>
          </RouterLink>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLinkItem key={link.name} link={link} scrolled={scrolled} closeMenu={closeMenu} />
            ))}

            {/* Language Selector Dropdown */}
            <div className="relative group ml-4">
              <button className="flex items-center gap-1 px-2 py-1 text-sm font-medium hover:opacity-80">
                🇬🇧 <span className="hidden md:inline">EN</span> <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute hidden group-hover:block bg-white border rounded shadow-md mt-1 z-50 min-w-[120px] text-sm">
                <a href="/vi" className="block px-3 py-2 hover:bg-gray-100">🇻🇳 Vietnamese</a>
                <a href="/kr" className="block px-3 py-2 hover:bg-gray-100">🇰🇷 Korean</a>
              </div>
            </div>

            <RouterLink to="/booking" className="ml-3">
              <Button className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all">
                Book Retreat
              </Button>
            </RouterLink>
          </nav>

          <button
            onClick={toggleMenu}
            className={`md:hidden p-2 rounded-md ${scrolled ? 'text-primary-dark hover:bg-primary/10' : 'text-white hover:bg-white/10'}`}
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
              transition={{ duration: 0.35 }}
              className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 shadow-2xl absolute w-full"
            >
              <div className="container-custom py-5 flex flex-col space-y-1.5">
                {navLinks.map((link) => (
                  <NavLinkItem key={link.name} link={link} scrolled={true} onClick={closeMenu} isMobile={true} closeMenu={closeMenu} />
                ))}
                <RouterLink to="/booking" className="mt-3">
                  <Button className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-3 text-base">
                    Book Retreat
                  </Button>
                </RouterLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Loyalty Popup */}
      <div id="loyalty-popup" className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center hidden">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
          <button className="absolute top-2 right-2 text-xl" onClick={() => document.getElementById('loyalty-popup').classList.add('hidden')}>
            &times;
          </button>
          <h3 className="text-lg font-semibold mb-4">Member Access</h3>
          <div className="flex justify-center gap-4">
            <button onClick={() => alert('Sign in success (simulated)')} className="bg-primary text-white px-4 py-2 rounded">Sign In</button>
            <button onClick={() => alert('Account created (simulated)')} className="bg-secondary text-white px-4 py-2 rounded">Create Account</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
