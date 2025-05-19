import React from "react";
import { Menu, X } from "lucide-react";

const MobileNavToggle = ({ isOpen, toggleMenu, alwaysWhiteTextOnHeader, topHeaderTextColor, scrolled }) => {
  const iconColorClass = alwaysWhiteTextOnHeader ? topHeaderTextColor : (scrolled ? 'text-heading-foreground' : topHeaderTextColor);
  const hoverBgClass = alwaysWhiteTextOnHeader ? (topHeaderTextColor.includes('white') ? 'hover:bg-white/10' : 'hover:bg-primary/5') : (scrolled ? 'hover:bg-muted' : 'hover:bg-primary/5');

  return (
    <button
      onClick={toggleMenu}
      className={`ml-1.5 p-1.5 focus:outline-none rounded-md transition-colors ${iconColorClass} ${hoverBgClass}`}
      aria-label="Toggle menu"
    >
      {isOpen ? <X size={22} /> : <Menu size={22} />}
    </button>
  );
};

export default MobileNavToggle;