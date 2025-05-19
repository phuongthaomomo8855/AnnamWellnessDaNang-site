import React from 'react';
import { Utensils, Wine, Bath as Spa, Dumbbell, PersonStanding, ShoppingBag, Briefcase, Coffee, Tv, UserCircle as CircleUser, GlassWater as Swimmer, Cigarette, CloudSun, Leaf, Info, Sailboat, Car, Bike } from 'lucide-react';

export const amenitiesPageData = {
  hero: {
    title: "Elevate Your Stay with Our Amenities",
    subtitle: "Experience unparalleled comfort and convenience with Annam Wellness's diverse range of world-class amenities, designed to cater to your every need and enhance your journey of rejuvenation.",
    image: "https://i.postimg.cc/HkZpXyX8/z5476171381716-801a9dd9b8826291f0f186da5fe8704c.jpg",
  },
  categories: [
    {
      id: "dining",
      name: "Dining & Lounges",
      icon: Utensils,
      description: "Indulge in exquisite culinary experiences, from fine dining to casual lounges, offering diverse flavors to delight your palate.",
      amenities: [
        {
          id: "saveurs-du-annam",
          name: "Saveurs Du Annam",
          icon: Utensils,
          description: "Our main restaurant offering authentic Vietnamese cuisine and international buffet spreads in an elegant setting.",
          image: "https://i.postimg.cc/1zF0nQnG/A-nh-ma-n-hi-nh-2025-05-17-lu-c-16-44-20.png",
          details: [
            "Breakfast, Lunch, and Dinner served",
            "Focus on fresh, locally-sourced ingredients",
            "Vegetarian and special dietary options available",
            "Operation Hours: 06:00 - 10:00 (Breakfast), 11:30 - 14:00 (Lunch), 18:00 - 22:00 (Dinner)"
          ],
        },
        {
          id: "annam-lounge-evening",
          name: "Annam Lounge (Evening) - L'Essence Lounge & Bar",
          icon: Wine,
          description: "Unwind with handcrafted cocktails, premium spirits, and light snacks in a sophisticated ambiance, perfect for evening relaxation.",
          image: "https://i.postimg.cc/tCNt7T7s/A-nh-ma-n-hi-nh-2025-05-17-lu-c-16-44-43.png",
          details: [
            "Extensive wine and cocktail list",
            "Live music on select evenings",
            "Ideal for pre-dinner drinks or a nightcap",
            "Operation Hours: 18:00 - 00:00"
          ],
        },
        {
          id: "annam-lounge-imperial",
          name: "Annam Lounge (Le Festin Impérial - Royal Banquet)",
          icon: Coffee,
          description: "Experience a regal culinary journey with our Royal Banquet, offering traditional imperial Vietnamese dishes in an exclusive setting.",
          image: "https://i.postimg.cc/8z1t1N8K/A-nh-ma-n-hi-nh-2025-05-17-lu-c-16-45-00.png",
          details: [
            "Set menus featuring historical royal cuisine",
            "Private dining options available",
            "Perfect for special occasions and cultural immersion",
            "Operation Hours: 09:00 - 00:00 (Reservations highly recommended)"
          ],
        },
        {
          id: "in-room-dining",
          name: "In-Room Dining",
          icon: Utensils,
          description: "Enjoy a wide selection of dishes from our extensive menu in the comfort and privacy of your room or suite.",
          image: "https://i.postimg.cc/C5pM0W2P/A-nh-ma-n-hi-nh-2025-05-17-lu-c-16-45-24.png",
          details: [
            "Available 24/7",
            "Breakfast, lunch, dinner, and late-night snacks",
            "Wellness-focused options available",
            "Operation Hours: Available 24/7"
          ],
        },
      ],
    },
    {
      id: "wellness-recreation",
      name: "Wellness & Recreation",
      icon: Spa,
      description: "Rejuvenate your body and mind with our comprehensive wellness facilities and recreational activities designed for holistic wellbeing.",
      amenities: [
        {
          id: "annam-wellness-spa",
          name: "Annam Wellness Spa",
          icon: Spa,
          description: "A sanctuary of tranquility offering a wide range of traditional and contemporary spa treatments, massages, and therapies.",
          image: "https://i.postimg.cc/qRQrX3fH/A-nh-ma-n-hi-nh-2025-05-17-lu-c-16-46-03.png",
          details: [
            "Signature Annam treatments",
            "Private therapy rooms and couple suites",
            "Sauna, steam room, and Jacuzzi facilities",
            "Beauty salon services",
            "Operation Hours: 08:00 - 22:00"
          ],
        },
        {
          id: "lagoon-swimming-pool",
          name: "Lagoon Swimming Pool",
          icon: Swimmer,
          description: "Relax and unwind by our stunning lagoon-style swimming pool, surrounded by lush tropical gardens.",
          image: "https://i.postimg.cc/9Q10R6xS/A-nh-ma-n-hi-nh-2025-05-17-lu-c-16-46-29.png",
          details: [
            "Expansive free-form pool with dedicated kids' area",
            "Poolside bar and sun loungers",
            "Towel service provided",
            "Operation Hours: 06:00 - 22:00"
          ],
        },
        {
          id: "royal-fitness-center",
          name: "Royal Fitness Center",
          icon: Dumbbell,
          description: "Stay active with our state-of-the-art fitness center, equipped with the latest cardio and strength training machines.",
          image: "https://i.postimg.cc/YqQ0Gg4J/A-nh-ma-n-hi-nh-2025-05-17-lu-c-16-46-54.png",
          details: [
            "Technogym equipment",
            "Personal trainers available upon request",
            "Yoga and fitness classes scheduled daily",
            "Operation Hours: 06:00 - 22:00"
          ],
        },
        {
          id: "soaking-pool",
          name: "Soaking Pool",
          icon: Leaf,
          description: "A tranquil soaking pool designed for relaxation and contemplation, often infused with herbal remedies.",
          image: "https://i.postimg.cc/90kYj1Gz/A-nh-ma-n-hi-nh-2025-05-17-lu-c-16-47-13.png",
          details: [
            "Heated for comfort",
            "Quiet zone for adults",
            "Adjacent to spa facilities",
            "Operation Hours: 08:00 - 18:00"
          ],
        },
         {
          id: "beach-activities",
          name: "Beach Activities & Watersports",
          icon: Sailboat,
          description: "Enjoy the pristine beach with a variety of activities, from sunbathing to exciting watersports.",
          image: "https://i.postimg.cc/L6WXY0T2/thien-an-Thuyen-Buom-TA-1.jpg",
          details: [
            "Private beach access",
            "Kayaking, paddleboarding, and snorkeling (seasonal)",
            "Beach volleyball and other recreational games",
            "Sunrise yoga sessions on the beach",
            "Operation Hours: Watersports 09:00 - 17:00, Beach access unrestricted"
          ],
        },
      ],
    },
    {
      id: "guest-services",
      name: "Guest Services & Facilities",
      icon: PersonStanding,
      description: "Experience seamless service and convenience with a wide array of facilities designed to make your stay effortless and enjoyable.",
      amenities: [
        {
          id: "concierge-service",
          name: "Concierge Service",
          icon: CircleUser,
          description: "Our dedicated concierge team is available to assist with tour bookings, transportation, restaurant reservations, and any other requests.",
          image: "https://i.postimg.cc/XJzS7NdB/concierge.jpg",
          details: [
            "Available 24/7",
            "Local area information and recommendations",
            "Airline and travel assistance",
            "Operation Hours: Available 24/7"
          ],
        },
        {
          id: "business-center",
          name: "Business Center",
          icon: Briefcase,
          description: "Fully equipped business center with workstations, printing, scanning, and secretarial services to meet your professional needs.",
          image: "https://i.postimg.cc/t4qK7FSt/business-center.jpg",
          details: [
            "High-speed internet access",
            "Meeting rooms available for booking",
            "Audiovisual equipment rental",
            "Operation Hours: 08:00 - 20:00"
          ],
        },
        {
          id: "boutique-shop",
          name: "Boutique Shop",
          icon: ShoppingBag,
          description: "Discover a curated selection of local handicrafts, souvenirs, resort wear, and essential travel items at our boutique shop.",
          image: "https://i.postimg.cc/k5GjYh8C/boutique.jpg",
          details: [
            "Authentic Vietnamese crafts and art",
            "Designer resort wear and accessories",
            "Annam Wellness signature products",
            "Operation Hours: 10:00 - 19:00"
          ],
        },
        {
          id: "kids-club",
          name: "Annam Pearls Kids' Club",
          icon: Info,
          description: "A dedicated space for our younger guests, offering a range of fun and educational activities under professional supervision.",
          image: "https://i.postimg.cc/7ZpX1hF2/kids-club.jpg",
          details: [
            "Supervised activities for children aged 4-12",
            "Indoor and outdoor play areas",
            "Arts, crafts, and cultural games",
            "Babysitting services available upon request (charges apply)",
            "Operation Hours: 09:00 - 18:00"
          ],
        },
        {
          id: "smoking-lounge",
          name: "Designated Smoking Lounge",
          icon: Cigarette,
          description: "A comfortable and well-ventilated designated area for guests who wish to smoke.",
          image: "https://i.postimg.cc/mkNNDNfr/smoking-lounge.jpg",
          details: [
            "Comfortable seating",
            "Air purification system",
            "Located away from non-smoking areas",
            "Operation Hours: Available all day"
          ],
        },
        {
          id: "transport-services",
          name: "Transportation Services",
          icon: Car,
          description: "Effortless travel arrangements including airport transfers, private car services, and bicycle rentals.",
          image: "https://i.postimg.cc/0NcvfQhC/aii-aii-XEBUSTA-1.jpg",
          details: [
            "Luxury airport shuttle (pre-booking required)",
            "Private car hire with driver",
            "Complimentary bicycle usage for exploring the resort",
            "Taxi and ride-sharing assistance",
            "Operation Hours: Airport shuttle as per flight, Car service 24/7, Bicycle rental 07:00 - 19:00"
          ],
        },
      ],
    },
  ],
  contactSection: {
    title: "Need More Information?",
    description: "Our dedicated team is always ready to assist you with any inquiries about our amenities or to help you plan your perfect wellness retreat.",
    phone: "+84 236 3888 888",
    email: "concierge@annamwellness.com",
    mapLink: "https://maps.app.goo.gl/YOUR_MAP_LINK_HERE",
    image: "https://i.postimg.cc/7Yf2k1Lq/A-nh-ma-n-hi-nh-2025-05-17-lu-c-16-47-35.png",
  },
};

export const getAmenityById = (categoryId, amenityId) => {
  const category = amenitiesPageData.categories.find(cat => cat.id === categoryId);
  if (category) {
    return category.amenities.find(amenity => amenity.id === amenityId);
  }
  return null;
};