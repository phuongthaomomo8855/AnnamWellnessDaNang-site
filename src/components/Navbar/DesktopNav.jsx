
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import NavLinkItem from "@/components/Navbar/NavLinkItem";
import LanguageSelector from "@/components/Navbar/LanguageSelector";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DesktopNav = ({ navConfig, scrolled, alwaysWhiteTextOnHeader, topHeaderTextColor, headerTextColor, closeMenu, setIsCartOpen }) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  useEffect(() => {
    const latestBooking = localStorage.getItem("latestBooking");
    setCartItemCount(latestBooking ? 1 : 0);
    const handleStorageChange = () => {
      const booking = localStorage.getItem("latestBooking");
      setCartItemCount(booking ? 1 : 0);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const navTextColor = alwaysWhiteTextOnHeader 
    ? topHeaderTextColor 
    : (scrolled ? 'text-heading-foreground' : headerTextColor);
  
  const hoverBgClass = alwaysWhiteTextOnHeader 
    ? (topHeaderTextColor.includes('white') ? 'hover:bg-white/10' : 'hover:bg-primary/5') 
    : (scrolled ? 'hover:bg-muted' : 'hover:bg-primary/10');


  return (
    <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
      {navConfig.map((link) => (
        <NavLinkItem 
          key={link.name} 
          link={link} 
          scrolled={scrolled} 
          closeMenu={closeMenu} 
          alwaysWhiteText={alwaysWhiteTextOnHeader} 
          topTextColor={topHeaderTextColor}
          headerTextColor={headerTextColor}
          isDesktop={true}
        />
      ))}
      <Button variant="ghost" size="icon" className={`${navTextColor} ${hoverBgClass}`}>
        <Search className="h-5 w-5" />
      </Button>
      
      <button 
        onClick={() => setIsCartOpen(true)} 
        className={`relative p-2 rounded-md transition-colors duration-200 ${navTextColor} ${hoverBgClass}`}
        aria-label="Open Booking Cart"
      >
        <ShoppingCart className="w-5 h-5" />
        {cartItemCount > 0 && (
          <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs">
            {cartItemCount}
          </Badge>
        )}
      </button>
      <LanguageSelector 
        scrolled={scrolled} 
        alwaysWhiteText={alwaysWhiteTextOnHeader} 
        topTextColor={navTextColor}
      />
       <RouterLink to="/booking" className="ml-1 lg:ml-2">
        <Button 
          size="default"
          className="bg-gradient-button text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 px-3 lg:px-4 py-2 rounded-md font-medium text-xs lg:text-sm"
        >
          Book Your Stay
        </Button>
      </RouterLink>
    </nav>
  );
};

export default DesktopNav;
