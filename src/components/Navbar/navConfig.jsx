import { Home, BedDouble, Sparkles, MapPin, Users, Info, Phone, Image, FileText, Shield, Gift, HelpCircle, Award, CalendarDays, Leaf, Brain, Building, Briefcase, BookOpen, Coffee as CoffeeIcon, HeartHandshake } from 'lucide-react';

export const navConfig = {
  mainNav: [
    { name: "Home", path: "/", icon: Home, type: "route" },
    { name: "Rooms", path: "/rooms", icon: BedDouble, type: "route" },
    { 
      name: "Wellness", 
      icon: Sparkles, 
      type: "dropdown",
      subLinks: [
        { name: "Our Philosophy", path: "/#about-section", description: "Guiding principles for your well-being" },
        { name: "Retreat Offers", path: "/wellness-menu", description: "Explore spa treatments & packages" },
        { name: "Insight Blog", path: "/blog", description: "Wellness tips and stories" },
      ]
    },
    { name: "Cultural Journeys", path: "/#home-explore-section", icon: Users, type: "anchor" }, // Updated path to be an anchor link
    { name: "Amenities", path: "/amenities", icon: Building, type: "route" },
    { name: "Extra Services", path: "/extra-services", icon: Gift, type: "route" },
    { name: "Loyalty Program", path: "/loyalty", icon: HeartHandshake, type: "route" }
  ],
  secondaryNav: [ 
    { name: "Our Story", path: "/#about-section", icon: Info, type: "anchor" },
    { name: "Contact", path: "/#contact-section", icon: Phone, type: "anchor" },
    { name: "Moments", path: "/moments", icon: Image, type: "route" },
  ],
  footerNav: {
    discover: [
      { name: "Accommodations", path: "/rooms" },
      { name: "Wellness Sanctuary", path: "/wellness-menu" },
      { name: "Extra Services", path: "/extra-services" },
      { name: "Amenities", path: "/amenities" },
      { name: "Our Blog", path: "/blog" },
    ],
    about: [
      { name: "Our Story", path: "/#about-section" },
      { name: "Meet The Team", path: "/#home-team-section" },
      { name: "Careers", path: "/careers" }, 
      { name: "Loyalty Program", path: "/loyalty" },
    ],
    support: [
      { name: "Contact Us", path: "/#contact-section" },
      { name: "FAQs", path: "/faq" },
      { name: "Hotel Policies", path: "/hotel-policies" },
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
    ],
    actions: [
      { name: "Book Your Stay", path: "/booking", icon: CalendarDays },
      { name: "View Special Offers", path: "/wellness-offers", icon: Award },
      { name: "Join Membership", path: "/membership", icon: Shield },
    ]
  },
};