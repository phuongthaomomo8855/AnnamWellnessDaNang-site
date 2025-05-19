import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Linkedin, MapPin, Phone, Mail, Clock } from "lucide-react";
import { navConfig } from "@/components/Navbar/navConfig.jsx";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { footerNav } = navConfig; 

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "https://facebook.com", label: "Facebook" },
    { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com", label: "Instagram" },
    { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Youtube className="w-5 h-5" />, href: "https://youtube.com", label: "YouTube" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  const renderNavLinks = (title, links) => {
    if (!links || links.length === 0) return null;
    return (
      <div>
        <p className="font-semibold text-paragraph-foreground mb-3.5 tracking-wide">{title}</p>
        <ul className="space-y-2.5">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <footer className="bg-card border-t border-border/50 text-sm">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12 mb-10 md:mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-5">
              <img  
                src="https://i.postimg.cc/3Nxp41Y1/annam-logo-no-bg.png" 
                alt="Annam Wellness Da Nang Logo" 
                className="h-14" 
               />
            </Link>
            <p className="text-muted-foreground mb-3.5 leading-relaxed max-w-md">
              Annam Wellness Da Nang is a sanctuary for holistic wellbeing, blending ancient Vietnamese traditions with contemporary wellness wisdom.
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p className="flex items-start">
                <MapPin className="w-4 h-4 mr-2.5 mt-0.5 text-primary flex-shrink-0" />
                <span>5 Vo Nguyen Giap, Bac Phu My, Ngu Hanh Son, Da Nang, VietNam</span>
              </p>
              <p className="flex items-center">
                <Phone className="w-4 h-4 mr-2.5 text-primary" />
                <span>0299 8877 123</span>
              </p>
              <p className="flex items-center">
                <Mail className="w-4 h-4 mr-2.5 text-primary" />
                <span>reservations@annamwellness.com</span>
              </p>
               <p className="flex items-center">
                <Clock className="w-4 h-4 mr-2.5 text-primary" />
                <span>Check-in: 14:00 PM | Check-out: 12:00 PM</span>
              </p>
            </div>
          </div>
          {footerNav && renderNavLinks("Discover", footerNav.discover)}
          {footerNav && renderNavLinks("About", footerNav.about)}
          {footerNav && renderNavLinks("Support", footerNav.support)}
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-xs">
            &copy; {currentYear} Annam Wellness Da Nang. All rights reserved.
          </p>
          <div className="flex space-x-3 mt-4 md:mt-0">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 p-1.5 rounded-md hover:bg-primary/10"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;