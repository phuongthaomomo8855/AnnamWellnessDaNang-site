const roomDetailsStaticData = {
  "deluxe-room": {
    id: "deluxe-room-static",
    name: "Deluxe Room",
    slug: "deluxe-room",
    subtitle: "Elegance and Comfort Combined",
    basePrice: 210, 
    displayPriceVND: "5,000,000 VND",
    sqm: "55sqm",
    view: "Garden/Ocean View",
    capacity: "2 Adults, 1 Child",
    description: "Awaken with Nature, Heal in Every Moment\n\nStep into your own private sanctuary where tranquility meets comfort. Our Deluxe Room offers a serene garden or ocean view, inviting nature’s calmness right into your space. Thoughtfully curated for your well-being, each room features premium spa-standard bedding, aromatherapy essentials, detox herbal teas, and a personal in-room yoga set—everything you need to unwind and restore.\n\nLet the sound of waves, the scent of fresh greenery, and the warm sunlight guide you back to balance.\n\nIdeal for solo retreats or peaceful escapes for two – this is where body, mind, and soul find their harmony.",
    shortDescription: "Experience comfort and elegance in our Deluxe Rooms, offering serene views and modern amenities for a restful stay. Perfect for solo travelers or couples seeking a peaceful retreat.",
    amenities: [
      { id: "ac", label: "Air-Conditioner", icon: "AirVent" },
      { id: "wifi", label: "Free Wifi", icon: "Wifi" },
      { id: "minibar", label: "Refrigerator & Minibar", icon: "Refrigerator" },
      { id: "safe", label: "In-room Safety", icon: "ShieldCheck" },
      { id: "desk", label: "Work-desk", icon: "PenSquare" },
      { id: "kettle", label: "Kettle", icon: "Coffee" }, 
      { id: "iron", label: "Ironing Facilities", icon: "Shirt" }, 
      { id: "telephone", label: "Telephone", icon: "Phone" },
      { id: "tv", label: "Smart TV", icon: "Tv" },
      { id: "shower_bathtub", label: "Rain shower / Bathtub", icon: "ShowerHead" }, 
      { id: "slippers", label: "Slipper", icon: "Footprints" },
      { id: "robe", label: "Dressing Gown", icon: "PersonStanding" }, 
      { id: "tea_coffee", label: "Tea & Coffee", icon: "CupSoda" },
      { id: "hair_dryer", label: "Hair Dryer", icon: "Wind" }, 
      { id: "water_bottles", label: "2 Glass Water Bottles", icon: "GlassWater" },
      { id: "organic_amenities", label: "Organic Bathroom Amenities", icon: "Sparkles" },
      { id: "aroma_diffuser", label: "Aroma Diffuser", icon: "SprayCan" },
      { id: "yoga_mat", label: "Yoga mat", icon: "RectangleHorizontal" } 
    ],
    keyFeatures: [
      "Spacious private balcony with seating",
      "Luxurious king-size bed or twin beds with premium spa-standard bedding",
      "Modern bathroom with organic toiletries and rain shower/bathtub",
      "Aromatherapy essentials and detox herbal teas provided",
      "Personal in-room yoga set for mindfulness practices"
    ],
    images: [
      "https://i.postimg.cc/Jhx3PCfQ/ainh-main-hiinh-2025-05-14-luic-06.webp",
      "https://i.postimg.cc/FRpbvGLN/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_10.55.09.png",
      "https://i.postimg.cc/PxTb00NS/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_10.53.50.png",
      "https://i.postimg.cc/XYVX8kP0/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_20.10.41.png",
      "https://i.postimg.cc/MpdHrjkf/A-nh-ma-n-hi-nh-2025-05-17-lu-c-20-23-03.png"
    ],
    galleryImages: [
      "https://i.postimg.cc/Jhx3PCfQ/ainh-main-hiinh-2025-05-14-luic-06.webp",
      "https://i.postimg.cc/FRpbvGLN/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_10.55.09.png",
      "https://i.postimg.cc/PxTb00NS/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_10.53.50.png",
      "https://i.postimg.cc/XYVX8kP0/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_20.10.41.png",
      "https://i.postimg.cc/MpdHrjkf/A-nh-ma-n-hi-nh-2025-05-17-lu-c-20-23-03.png"
    ],
    promotionalOffer: {
      title: "Balance Break",
      description: "15% off for 2-night weekend stays (Friday–Sunday)",
      linkText: "Read more about deluxe packages",
      link: "/wellness-details#wellness-packages"
    },
    extraServices: [
      { id: "airport_shuttle", name: "Airport Shuttle Service", price: 25, description: "Comfortable and convenient shuttle to/from Da Nang International Airport." },
      { id: "in_room_dining", name: "In-Room Dining (24/7)", price: null, description: "Enjoy delicious meals from our extensive menu in the comfort of your room." }
    ]
  },
  "suite-room": {
    id: "suite-room-static",
    name: "Annam Harmony Suite",
    slug: "suite-room",
    subtitle: "Expansive Luxury with Living Space",
    basePrice: 500, 
    displayPriceVND: "12,000,000 VND",
    sqm: "75sqm",
    view: "Garden/Panoramic Ocean View",
    capacity: "3 Adults or 2 Adults, 2 Children",
    description: "Elevate your stay in our Grand Suite — a spacious haven designed for mindful rest and intentional living. With a separate living area featuring a cozy sofa, this suite allows you to unwind, host quiet moments, or simply enjoy more space to breathe.\n\nPerfect for meditation, journaling, or sipping detox tea as daylight filters in, the Grand Suite comes fully equipped with our signature wellness amenities: aromatherapy kit, herbal sleep aids, yoga mat, and calming herbal infusions.\n\nAn ideal retreat to slow down, reconnect, and restore your inner peace.",
    amenities: [
      { id: "ac", label: "Air-Conditioner", icon: "AirVent" },
      { id: "wifi", label: "Free Wifi", icon: "Wifi" },
      { id: "minibar", label: "Refrigerator & Minibar", icon: "Refrigerator" },
      { id: "safe", label: "In-room Safety", icon: "ShieldCheck" },
      { id: "desk", label: "Work-desk", icon: "PenSquare" },
      { id: "kettle", label: "Kettle", icon: "Coffee" },
      { id: "iron", label: "Ironing Facilities", icon: "Shirt" },
      { id: "telephone", label: "Telephone", icon: "Phone" },
      { id: "tv", label: "Smart TV", icon: "Tv" },
      { id: "shower_bathtub", label: "Rain shower / Bathtub", icon: "ShowerHead" },
      { id: "slippers", label: "Slipper", icon: "Footprints" },
      { id: "robe", label: "Dressing Gown", icon: "PersonStanding" },
      { id: "tea_coffee", label: "Tea & Coffee", icon: "CupSoda" },
      { id: "hair_dryer", label: "Hair Dryer", icon: "Wind" },
      { id: "water_bottles", label: "2 Glass Water Bottles", icon: "GlassWater" },
      { id: "organic_amenities", label: "Organic Bathroom Amenities", icon: "Sparkles" },
      { id: "aroma_diffuser", label: "Aroma Diffuser", icon: "SprayCan" },
      { id: "yoga_mat", label: "Yoga mat", icon: "RectangleHorizontal" },
      { id: "sofa", label: "Sofa", icon: "Sofa" },
      { id: "balcony", label: "Balcony", icon: "GalleryVertical" }
    ],
    keyFeatures: [
      "Separate living room with comfortable sofa for enhanced relaxation",
      "Private balcony offering serene garden or panoramic ocean views",
      "Luxurious bathroom with premium organic amenities",
      "Dedicated wellness kit including aromatherapy, herbal aids, and yoga mat",
      "Spacious layout perfect for mindful practices and unwinding"
    ],
    images: [
      "https://i.postimg.cc/P5cX2Fd9/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_15.38.08.png",
      "https://i.postimg.cc/FFcJ9Zkj/A-nh-ma-n-hi-nh-2025-05-17-lu-c-22-11-33.png",
      "https://i.postimg.cc/1XzG36G6/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_10.55.28.png",
      "https://i.postimg.cc/jj1mNGQ3/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_13.15.36.png"
    ],
    galleryImages: [
      "https://i.postimg.cc/P5cX2Fd9/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_15.38.08.png",
      "https://i.postimg.cc/FFcJ9Zkj/A-nh-ma-n-hi-nh-2025-05-17-lu-c-22-11-33.png",
      "https://i.postimg.cc/1XzG36G6/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_10.55.28.png",
      "https://i.postimg.cc/jj1mNGQ3/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_13.15.36.png"
    ],
    promotionalOffer: {
      title: "Serenity Stay",
      description: "20% off for bookings of 3 nights or more",
      linkText: "Read more about Harmony Suite packages",
      link: "/wellness-details#wellness-packages"
    },
    extraServices: [
      { id: "private_butler", name: "Personal Butler Service", price: 100, description: "Dedicated butler to cater to your every need during your stay." },
      { id: "romantic_dinner_balcony", name: "Romantic Dinner on Balcony", price: 150, description: "A private, chef-prepared dinner served on your suite’s balcony." }
    ]
  },
  "president-suite": {
    id: "president-suite-static",
    name: "President Wellness Suite",
    slug: "president-suite",
    subtitle: "The Epitome of Luxury and Personalized Healing",
    basePrice: 1460, 
    displayPriceVND: "35,000,000 VND",
    sqm: "100sqm",
    view: "Beach View/ Private Pool",
    capacity: "3 Adults or 2 Adults, 2 Children",
    description: "Step into the pinnacle of peaceful luxury with our President Room – a private sanctuary where elevated design meets personalized healing.\n\nEnjoy the serenity of your own private pool, unwind in a tranquil in-room tea meditation space, and experience the care of a dedicated 24/7 butler service, available to curate every detail of your wellness journey — from setting up a morning meditation to drawing a herbal bath at night.\n\nComplete with a premium wellness amenity set, this space invites you to fully surrender, awaken your senses, and reconnect with your true self.\n\nThe President Room isn’t just a stay — it’s a transformative experience in mindful living.\nAn ideal retreat to slow down, reconnect, and restore your inner peace.",
    amenities: [
      { id: "ac", label: "Air-Conditioner", icon: "AirVent" },
      { id: "wifi", label: "Free Wifi", icon: "Wifi" },
      { id: "minibar", label: "Refrigerator & Minibar", icon: "Refrigerator" },
      { id: "safe", label: "In-room Safety", icon: "ShieldCheck" },
      { id: "desk", label: "Work-desk", icon: "PenSquare" },
      { id: "kettle", label: "Kettle", icon: "Coffee" },
      { id: "iron", label: "Ironing Facilities", icon: "Shirt" },
      { id: "telephone", label: "Telephone", icon: "Phone" },
      { id: "tv", label: "Smart TV", icon: "Tv" },
      { id: "shower_bathtub", label: "Rain shower / Bathtub", icon: "ShowerHead" },
      { id: "slippers", label: "Slipper", icon: "Footprints" },
      { id: "robe", label: "Dressing Gown", icon: "PersonStanding" },
      { id: "tea_coffee", label: "Tea & Coffee", icon: "CupSoda" },
      { id: "hair_dryer", label: "Hair Dryer", icon: "Wind" },
      { id: "water_bottles", label: "2 Glass Water Bottles", icon: "GlassWater" },
      { id: "organic_amenities", label: "Organic Bathroom Amenities", icon: "Sparkles" },
      { id: "aroma_diffuser", label: "Aroma Diffuser", icon: "SprayCan" },
      { id: "yoga_mat", label: "Yoga mat", icon: "RectangleHorizontal" },
      { id: "sofa", label: "Sofa", icon: "Sofa" },
      { id: "balcony", label: "Balcony", icon: "GalleryVertical" },
      { id: "tea_meditation_space", label: "Tea Meditation Space", icon: "Leaf" }, 
      { id: "butler_service", label: "24/7 Butler Service", icon: "ConciergeBell" },
      { id: "private_pool", label: "Private Pool", icon: "Droplets" },
      { id: "premium_wellness_set", label: "Premium Wellness Amenity Set", icon: "Gift" }
    ],
    keyFeatures: [
      "Expansive private terrace with infinity plunge pool and panoramic ocean views",
      "Dedicated in-suite tea meditation space for mindfulness",
      "Grand living and dining salon, perfect for entertaining or private meals",
      "Master bedroom suite with king bed, walk-in closet, and opulent en-suite bathroom with jacuzzi",
      "Secondary bedroom with en-suite bathroom",
      "Fully equipped kitchenette and private bar",
      "State-of-the-art home entertainment system",
      "Personalized 24/7 butler service and dedicated concierge",
      "Premium wellness amenity set for a complete restorative experience"
    ],
    images: [
      "https://i.postimg.cc/7Yd3q5fG/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_11.00.07.png",
      "https://i.postimg.cc/6pT6VNxC/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_15.37.49.png",
      "https://i.postimg.cc/wxW5bfzk/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_10.59.47.png",
      "https://i.postimg.cc/cH18Nb8h/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_16.38.33.png"
    ],
    galleryImages: [
      "https://i.postimg.cc/7Yd3q5fG/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_11.00.07.png",
      "https://i.postimg.cc/6pT6VNxC/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_15.37.49.png",
      "https://i.postimg.cc/wxW5bfzk/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_10.59.47.png",
      "https://i.postimg.cc/cH18Nb8h/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_16.38.33.png"
    ],
    promotionalOffer: {
      title: "Awakened Sanctuary",
      description: "20% off on minimum 3-night stay with full wellness itinerary",
      linkText: "Read more about president suite room packages",
      link: "/wellness-details#wellness-packages"
    },
    extraServices: [
      { id: "private_chef", name: "Private Chef for In-Suite Dining", price: 300, description: "A personal chef to prepare bespoke meals in your suite's kitchen." },
      { id: "helicopter_transfer", name: "Helicopter Transfer Service", price: 1500, description: "Exclusive helicopter transfers to/from the airport or nearby attractions." }
    ]
  },
};

export const getRoomBySlug = (slug) => {
  return roomDetailsStaticData[slug] || null;
};

export const getAllRoomsStaticData = () => {
  return Object.values(roomDetailsStaticData);
};

export default roomDetailsStaticData;