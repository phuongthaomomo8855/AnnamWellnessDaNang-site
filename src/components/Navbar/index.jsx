
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, UserCircle, Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingCartSheet from "@/components/booking/BookingCartSheet";
import { navConfig as importedNavConfig } from "./navConfig"; 
import NavLinkItem from "./NavLinkItem";
import LanguageSelector from "./LanguageSelector";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookingCartOpen, setIsBookingCartOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    closeMobileMenu(); 
  }, [location]);

  const navVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50, damping: 15 } },
    scrolled: { backgroundColor: "hsla(var(--background) / 0.85)", backdropFilter: "blur(12px)", boxShadow: "0 2px 10px rgba(0,0,0,0.07)" }
  };
  
  const logoTextClass = "font-bold text-lg tracking-tight";
  
  const navContainerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled || isMobileMenuOpen ? "shadow-lg bg-background/80 backdrop-blur-md" : "bg-transparent"
  } border-b border-border/30`;

  const headerTextColor = "text-primary-dark";
  const topHeaderTextColor = "text-white";
  const alwaysWhiteTextOnHeader = !isScrolled && (location.pathname === '/' || location.pathname.startsWith('/rooms/'));

  return (
    <>
      <motion.header
        variants={navVariants}
        initial="initial"
        animate={isScrolled ? ["animate", "scrolled"] : "animate"}
        className={navContainerClasses}
      >
        <div className="container-custom mx-auto flex items-center justify-between h-[60px] md:h-[72px] px-4">
          <Link to="/" className={`flex items-center space-x-2 ${alwaysWhiteTextOnHeader && !isScrolled ? topHeaderTextColor : headerTextColor} hover:opacity-80 transition-opacity`}>
            <img src="/favicon.svg" alt="Annam Wellness Logo" className="h-8 w-8 md:h-9 md:w-9" />
            <div>
              <span className={`${logoTextClass} block leading-tight`}>Annam Wellness</span>
              <span className={`${logoTextClass} block leading-tight`}>Da Nang</span>
            </div>
          </Link>

          <DesktopNav 
            navConfig={importedNavConfig.mainNav}
            scrolled={isScrolled}
            alwaysWhiteTextOnHeader={alwaysWhiteTextOnHeader}
            topHeaderTextColor={topHeaderTextColor}
            headerTextColor={headerTextColor}
            closeMenu={closeMobileMenu}
            setIsCartOpen={setIsBookingCartOpen}
          />

          <div className="flex items-center space-x-2 md:hidden">
             <button 
                onClick={() => setIsBookingCartOpen(true)} 
                className={`relative p-2 rounded-md transition-colors duration-200 ${alwaysWhiteTextOnHeader && !isScrolled ? topHeaderTextColor : headerTextColor} hover:bg-primary/5`}
                aria-label="Open Booking Cart"
              >
                <ShoppingBag className="w-5 h-5" />
              </button>
              <LanguageSelector 
                 scrolled={isScrolled} 
                 alwaysWhiteText={alwaysWhiteTextOnHeader} 
                 topTextColor={alwaysWhiteTextOnHeader && !isScrolled ? topHeaderTextColor : headerTextColor}
              />
            <button
              onClick={toggleMobileMenu}
              className={`${alwaysWhiteTextOnHeader && !isScrolled ? topHeaderTextColor : headerTextColor} hover:bg-primary/10 p-2 rounded-md focus:outline-none`}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          navConfig={importedNavConfig.mainNav}
          scrolled={isScrolled}
          closeMenu={closeMobileMenu}
          alwaysWhiteTextOnHeader={alwaysWhiteTextOnHeader}
          topHeaderTextColor={topHeaderTextColor}
        />
      </motion.header>
      <BookingCartSheet isOpen={isBookingCartOpen} onOpenChange={setIsBookingCartOpen} />
    </>
  );
};

export default Navbar;
