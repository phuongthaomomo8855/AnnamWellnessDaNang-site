export const contactSectionData = {
  title: "Need More Information?",
  description: "Our dedicated team is always ready to assist you with any inquiries about our amenities or to help you plan your perfect wellness retreat at Annam Wellness Da Nang.",
  address: "5 Vo Nguyen Giap, Bac Phu My, Ngu Hanh Son, Da Nang, VietNam",
  phone: "0299 8877 123",
  email: "reservations@annamwellness.com",
  operatingHours: "All day",
  mapLink: "https://www.google.com/maps/search/?api=1&query=5+Vo+Nguyen+Giap,+Bac+Phu+My,+Ngu+Hanh+Son,+Da+Nang,+VietNam", 
  image: "https://i.postimg.cc/fbhY017M/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_11.23.13.png", // Updated image as per previous requests if this is the correct one for this section.
  contactPoints: [ // Using contactPoints structure from main amenitiesData.js for consistency
    {
      id: "cp1",
      iconName: "Phone", // Will be mapped to Lucide icon component
      label: "Call Us",
      value: "0299 8877 123",
      href: "tel:02998877123"
    },
    {
      id: "cp2",
      iconName: "Mail",
      label: "Email Us",
      value: "reservations@annamwellness.com",
      href: "mailto:reservations@annamwellness.com"
    },
    {
      id: "cp3",
      iconName: "MapPin",
      label: "Visit Us",
      value: "5 Vo Nguyen Giap, Bac Phu My, Ngu Hanh Son, Da Nang, VietNam",
      href: "https://www.google.com/maps/search/?api=1&query=5+Vo+Nguyen+Giap,+Bac+Phu+My,+Ngu+Hanh+Son,+Da+Nang,+VietNam"
    },
    {
      id: "cp4",
      iconName: "Clock",
      label: "Operating Hours",
      value: "All day",
      href: "#" // No specific link for operating hours
    }
  ]
};