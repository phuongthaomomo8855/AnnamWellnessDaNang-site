import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavLinkItem from "@/components/Navbar/NavLinkItem";
import { Button } from "@/components/ui/button";
import { Link as RouterLink } from "react-router-dom";
import { Phone } from "lucide-react";

const MobileMenu = ({ isOpen, navConfig, scrolled, closeMenu, alwaysWhiteTextOnHeader, topHeaderTextColor }) => {
  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    open: { opacity: 1, height: "auto", transition: { duration: 0.35, ease: "easeInOut", staggerChildren: 0.05, delayChildren: 0.1 } }
  };

  const mobileLinkItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };
  
  const menuBgClass = scrolled 
    ? 'bg-background/95 backdrop-blur-lg' 
    : (alwaysWhiteTextOnHeader && topHeaderTextColor.includes('white') ? 'bg-black/80 backdrop-blur-xl' : 'bg-card/95 backdrop-blur-md');

  const linkTextColor = !scrolled && alwaysWhiteTextOnHeader && topHeaderTextColor.includes('white') 
    ? 'text-white/90' 
    : (scrolled ? 'text-heading-foreground' : topHeaderTextColor);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={mobileMenuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className={`md:hidden ${menuBgClass} border-t border-border/50 shadow-xl absolute w-full overflow-hidden left-0 top-full`}
        >
          <div className="container-custom py-3.5 flex flex-col">
            {navConfig.map((link) => ( 
               <motion.div variants={mobileLinkItemVariants} key={link.name + "-mobile"}>
                  <NavLinkItem 
                    link={link} 
                    scrolled={scrolled} 
                    closeMenu={closeMenu} 
                    isMobile={true} 
                    alwaysWhiteText={!scrolled && alwaysWhiteTextOnHeader} 
                    topTextColor={linkTextColor}
                  />
               </motion.div>
            ))}
            <motion.div variants={mobileLinkItemVariants} className="pt-3 border-t border-border/30 mt-3">
              <RouterLink to="/booking" className="w-full block">
                <Button className="w-full bg-gradient-button text-white shadow-md py-2.5 text-sm mb-2" onClick={closeMenu}>
                  Book Your Stay
                </Button>
              </RouterLink>
               <RouterLink to="/#contact-section" className="w-full block">
                <Button variant="outline" className="w-full text-primary-dark border-primary/50 hover:bg-primary/10 py-2.5 text-sm" onClick={closeMenu}>
                  <Phone className="h-4 w-4 mr-2"/> Contact Us
                </Button>
              </RouterLink>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;