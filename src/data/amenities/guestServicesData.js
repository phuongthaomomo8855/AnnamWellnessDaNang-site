import { ConciergeBell, Car, ShoppingBag, Shirt, Baby, ToyBrick, Accessibility, Wind } from 'lucide-react'; // Added Wind as it was in the original main data for smoking lounge

export const guestServicesData = {
  id: "guest-services",
  name: "Guest Services & Conveniences",
  icon: ConciergeBell,
  description: "Experience seamless comfort with our comprehensive range of guest services, thoughtfully designed to cater to your every need during your wellness retreat.",
  amenities: [
    {
      id: "personalized-concierge",
      name: "Personalized Concierge",
      icon: ConciergeBell,
      description: "24/7 dedicated assistance, tour bookings. Our dedicated concierge team is available to assist with restaurant reservations, transportation, and any special requests to enhance your stay.",
      image: "https://i.postimg.cc/W3p8v1GK/aii-aii-d-Jo-ZXb-KG8-Ztb-Z1v-V-1.webp",
      operatingHours: "Available 24/7",
      details: [
        "Local Information & Recommendations",
        "Activity & Tour Planning",
        "Flight & Transportation Assistance",
        "Special Occasion Arrangements"
      ],
    },
    {
      id: "sustainable-valet-parking",
      name: "Sustainable Valet Parking",
      icon: Car,
      description: "Complimentary for guests, EV charging available. Enjoy convenient and secure valet parking services with a focus on sustainability.",
      image: "https://i.postimg.cc/brDQyDs6/ainh-main-hiinh-2025-05-16-luic-11-2.webp",
      operatingHours: "Available 24/7",
      details: [
        "Covered & Secure Parking",
        "EV Charging Stations available",
        "Complimentary for resident guests"
      ],
    },
    {
      id: "annam-boutique-shop",
      name: "Annam Boutique Shop",
      icon: ShoppingBag,
      description: "Discover a curated selection of local handicrafts, artisanal products, wellness items, and resort wear at our Annam Boutique Shop. Perfect for souvenirs or a special treat.",
      image: "https://i.postimg.cc/gjLq968D/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_00.48.29.png",
      operatingHours: "Daily: 9:00 AM - 8:00 PM",
      details: [
        "Local Art & Handicrafts",
        "Silk Scarves & Resort Apparel",
        "Organic Teas & Spa Products"
      ],
    },
    {
      id: "express-laundry",
      name: "Express Laundry & Dry Cleaning",
      icon: Shirt,
      description: "Keep your wardrobe fresh with our efficient express laundry and dry cleaning services. Same-day service available for your convenience.",
      image: "https://i.postimg.cc/nVYpfwV6/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_01.24.11.png",
      operatingHours: "Service available daily. Collection before 10:00 AM for same-day return.",
      details: [
        "Laundry, Dry Cleaning, Pressing services",
        "In-room laundry bags provided for convenience"
      ],
    },
    {
      id: "babysitting-services",
      name: "Babysitting Services",
      icon: Baby,
      description: "Enjoy peace of mind with our professional babysitting services, allowing you to fully immerse in your wellness activities or enjoy a quiet evening. Advance booking required.",
      image: "https://i.postimg.cc/fyKN7kgw/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_01.32.53.png",
      operatingHours: "Available on request (24-hour advance notice preferred)",
      details: [
        "Certified & Experienced Caregivers",
        "Suitable for children aged 6 months - 12 years",
        "Hourly rates apply, please inquire"
      ],
    },
    {
      id: "childrens-play-area",
      name: "Children's Play Area & Activities",
      icon: ToyBrick,
      description: "A dedicated and safe play area for our younger guests, offering engaging activities and toys under supervision. Let your children explore and have fun.",
      image: "https://i.postimg.cc/Nfdt59HD/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_01.51.20.png",
      operatingHours: "Daily: 9:00 AM - 6:00 PM (Supervised hours may vary)",
      details: [
        "Indoor & Outdoor Play Zones",
        "Age-Appropriate Toys & Games",
        "Creative Workshops (check schedule)"
      ],
    },
    {
      id: "disabled-facilities",
      name: "Disabled Facilities & Services",
      icon: Accessibility,
      description: "We are committed to providing a comfortable stay for all guests. Our resort offers accessible rooms, ramps, and dedicated services for guests with mobility challenges.",
      image: "https://i.postimg.cc/hvgn7Vsy/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_01.46.19.png",
      operatingHours: "Services available 24/7. Please inform us of your needs at booking.",
      details: [
        "Accessible Rooms with adapted features",
        "Wheelchair Ramps throughout the resort",
        "Grab Bars in designated restrooms",
        "Staff assistance available"
      ],
    },
    // Note: Designated Smoking Lounge was moved to wellnessRecreationData for better thematic grouping
    // If it needs to be here, it can be duplicated or linked. For now, assuming it's primarily a facility.
  ],
};