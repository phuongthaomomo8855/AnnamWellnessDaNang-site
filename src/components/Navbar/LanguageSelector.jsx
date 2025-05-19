import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
];

const LanguageSelector = ({ scrolled, alwaysWhiteText, topTextColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectLanguage = (lang) => {
    setSelectedLanguage(lang);
    setIsOpen(false);
    console.log("Language selected:", lang.code);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const textColorClass = alwaysWhiteText ? topTextColor : (scrolled ? 'text-heading-foreground' : topTextColor);
  const hoverTextColorClass = alwaysWhiteText ? (topTextColor.includes('white') ? 'hover:text-white/70' : 'hover:text-primary') : (scrolled ? 'hover:text-primary' : (topTextColor.includes('white') ? 'hover:text-white/70' : 'hover:text-primary'));
  
  const dropdownBgClass = scrolled || !alwaysWhiteText 
    ? 'bg-card/95 backdrop-blur-md' 
    : (topTextColor.includes('white') ? 'bg-black/50 backdrop-blur-md' : 'bg-card/95 backdrop-blur-md');


  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out rounded-md ${textColorClass} ${hoverTextColorClass}`}
      >
        <Globe className="w-4 h-4 mr-1.5" />
        {selectedLanguage.flag}
        <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2, ease: "circOut" }}
            className={`absolute right-0 mt-1.5 w-40 rounded-md shadow-2xl ${dropdownBgClass} py-1.5 z-30 border border-border/60`}
          >
            {languages.map((lang) => {
              const isSelected = selectedLanguage.code === lang.code;
              let itemTextColor = scrolled || !alwaysWhiteText ? 'text-heading-foreground hover:bg-muted' : 'text-white/90 hover:bg-white/5';
              if (topTextColor && !topTextColor.includes('white') && !scrolled && alwaysWhiteText) {
                 itemTextColor = 'text-heading-foreground hover:bg-muted';
              }

              let selectedItemClasses = scrolled || !alwaysWhiteText ? 'text-primary font-semibold bg-primary/10' : 'text-white font-semibold bg-white/10';
              if (topTextColor && !topTextColor.includes('white') && !scrolled && alwaysWhiteText) {
                selectedItemClasses = 'text-primary font-semibold bg-primary/10';
              }


              return (
                <button
                  key={lang.code}
                  onClick={() => selectLanguage(lang)}
                  className={`flex items-center w-full px-3 py-2 text-sm text-left transition-colors duration-150 
                    ${isSelected ? selectedItemClasses : itemTextColor}`}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;