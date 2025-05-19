import React from "react";

export const navLinks = [
  { name: "Home", path: "/", type: "route" },
  { name: "Our Rooms", path: "/rooms", type: "route" },
  { 
    name: "Wellness", 
    type: "dropdown",
    subLinks: [
      { name: "Our Philosophy", path: "/about#about-section", type: "route-hash" },
      { name: "Wellness Offers", path: "/wellness-offers", type: "route" },
      { name: "Signature Treatments", path: "/wellness-offers#signature-treatments", type: "route-hash" }, 
      { name: "Holistic Programs", path: "/wellness-offers#holistic-programs", type: "route-hash"},
      { name: "Wellness Workshops", path: "/wellness-offers#wellness-workshops", type: "route-hash"},
      { name: "Package Offers", path: "/wellness-offers#package-offers", type: "route-hash"},
      { name: "Wellness Retreats", path: "/retreats", type: "route"}, 
      { name: "Your Oasis", path: "/oasis-of-tranquility", type: "route"},
    ]
  },
  { name: "Our Amenities", path: "/amenities", type: "route" },
  { name: "Cultural Journey", path: "/cultural-experiences", type: "route" },
  { name: "Extra Services", path: "/extra-services", type: "route" },
  { name: "Contact", path: "/#contact", type: "route-hash" },
];