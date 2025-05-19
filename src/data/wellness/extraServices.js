import { Utensils, Car, Sparkles, ShoppingBag, Sun, Camera, BedDouble, Clock } from 'lucide-react'; 

export const extraServicesPageData = {
  title: "Exclusive Extra Services",
  description: "Enhance your stay with our curated selection of extra services, designed to provide convenience, delight, and unforgettable experiences. From bespoke dining to personalized excursions, let us take care of every detail.",
  heroSliderImages: [
    "https://i.postimg.cc/0y22m26k/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_21.13.07.png",
    "https://i.postimg.cc/fbhY017M/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_11.23.13.png",
    "https://i.postimg.cc/mZ7wBJnN/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_03.39.25.png",
    "https://i.postimg.cc/sxP9mGW0/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_03.43.38.png",
    "https://i.postimg.cc/7hWpncyL/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_02.19.21.png",
    "https://i.postimg.cc/TYGcwQM8/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_03.48.49.png",
    "https://i.postimg.cc/YqFm9qJv/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_10.32.33.png",
    "https://i.postimg.cc/hGhsnjFf/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_03.06.27.png"
  ],
  heroImageFallback: "https://i.postimg.cc/jSx0kLzD/A-nh-ma-n-hi-nh-2025-05-16-lu-c-11-08-26.png",
  services: [
    {
      id: "private-in-room-dining",
      title: "Private In-Room Dining",
      description: "Enjoy an exquisite dining experience in the comfort and privacy of your room or suite. Our chefs will prepare a personalized menu tailored to your preferences, served by a dedicated butler.",
      image: "https://i.postimg.cc/SNFCQ1qq/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-16_lu%CC%81c_22.17.53.png",
      icon: Utensils,
      price: "From 2,500,000 VND",
      duration: "1.5 – 2 hours",
      category: "Dining",
      details: [
        "Personalized menu consultation with our chef.",
        "Dedicated butler service.",
        "Choice of romantic setup or family-style dining.",
        "Premium wine pairing options available.",
        "Duration: 1.5 – 2 hours."
      ],
      tags: ["Luxury", "Romantic", "Exclusive Dining", "In-Room"]
    },
    {
      id: "airport-shuttle",
      title: "Airport Shuttle Service",
      description: "Annam Wellness Da Nang offers convenient pick-up/drop-off services from Da Nang International Airport (approx. 6.2 km). All vehicles are premium class with A/C, bottled water, and professional drivers.",
      image: "https://i.postimg.cc/jSBxHmjk/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-16_lu%CC%81c_21.57.12.png",
      icon: Car,
      price: "Contact us for more details", 
      category: "Transportation",
      details: [
        "Premium class vehicles with A/C.",
        "Complimentary bottled water.",
        "Professional and courteous drivers.",
        "Meet & greet service available upon request."
      ],
      vehicleOptions: [
        {
          name: "Lexus LS 500",
          seats: "4 seats",
          price: "1,399,000 VND",
          image: "https://i.postimg.cc/25kt6pgB/ls_500.jpg"
        },
        {
          name: "Lexus LX 570",
          seats: "7 seats",
          price: "1,599,000 VND",
          image: "https://i.postimg.cc/rpfPRnLZ/lx-570.jpg"
        },
        {
          name: "Ford Transit",
          seats: "16 seats",
          price: "1,899,000 VND",
          image: "https://i.postimg.cc/TwHJfBXG/ford-transit-240708-09.jpg"
        }
      ],
      tags: ["Comfort", "Convenience", "VIP Transfer", "Airport"]
    },
    {
      id: "celebration-romance-package",
      title: "Celebration & Romance Package",
      description: "Make your special occasion unforgettable. This package includes romantic room decoration, a bottle of sparkling wine, a custom cake, and a late check-out.",
      image: "https://i.postimg.cc/R08RZB9G/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_03.35.15.png",
      icon: Sparkles,
      price: "From 3,500,000 VND",
      duration: "2 – 3 hours",
      category: "Celebration",
      details: [
        "Elegant room setup with flowers and candles.",
        "Chilled bottle of premium sparkling wine.",
        "Personalized celebration cake (choice of flavors).",
        "Guaranteed late check-out until 2 PM.",
        "Duration of experience enhancement: 2 – 3 hours (flexible based on your preferences)."
      ],
      tags: ["Romantic Getaway", "Anniversary", "Birthday", "Special Occasion"]
    },
    {
      id: "room-suite-decoration",
      title: "Room Suite Decoration",
      description: "Surprise your loved one or enhance your stay with beautifully themed room or suite decorations. Perfect for birthdays, anniversaries, or just a special touch.",
      image: "https://i.postimg.cc/mZ7wBJnN/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_03.39.25.png",
      icon: BedDouble,
      price: "Contact us for more details",
      category: "Celebration",
      details: [
        "Choice of themes: Romantic, Birthday, Welcome, etc.",
        "Includes balloons, floral arrangements, and other decorative elements.",
        "Customizable to your preferences.",
        "Setup prior to your arrival or during your stay."
      ],
      tags: ["Decoration", "Surprise", "Romantic", "Celebration"]
    },
    {
      id: "personal-shopper-artisan-souvenirs",
      title: "Personal Shopper & Artisan Souvenirs",
      description: "Discover local crafts and unique souvenirs with the help of a personal shopper. We can also arrange for custom-made items from local artisans.",
      image: "https://i.postimg.cc/YSX1hxxR/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_00.42.31.png",
      icon: ShoppingBag,
      price: "From 2,200,000 VND",
      duration: "Half day (3–4h)",
      category: "Shopping & Leisure",
      details: [
        "Consultation to understand your preferences.",
        "Guided shopping tour to local markets and boutiques.",
        "Access to exclusive artisan workshops.",
        "Shipping assistance for your purchases.",
        "Duration: Half day (approximately 3–4 hours)."
      ],
      tags: ["Local Crafts", "Souvenirs", "Personalized Shopping", "Culture"]
    },
    {
      id: "private-sunrise-yoga-meditation",
      title: "Private Sunrise Yoga & Meditation",
      description: "Start your day with a revitalizing private yoga and meditation session overlooking the ocean or amidst our serene gardens. Tailored to your level and focus.",
      image: "https://i.postimg.cc/4nRhX8Cd/bampp-YNq-B421-W2ou8-E27-E.webp",
      icon: Sun,
      price: "From 1,200,000 VND",
      duration: "1 – 1.5 hours",
      category: "Wellness",
      details: [
          "Led by experienced yoga & meditation instructor.",
          "Choice of beach, garden, or private villa location.",
          "All equipment provided (mats, props).",
          "Focus on Hatha, Vinyasa, or mindful meditation.",
          "Duration: 1 – 1.5 hours."
      ],
      tags: ["Mindfulness", "Fitness", "Relaxation", "Private Session", "Sunrise"]
    },
    {
      id: "guided-nature-photography-tour",
      title: "Guided Nature & Photography Tour",
      description: "Explore Da Nang's stunning natural landscapes with a professional guide and photographer. Capture breathtaking shots of Marble Mountains, Son Tra Peninsula, or hidden waterfalls.",
      image: "https://i.postimg.cc/jdfMyfWK/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_11.00.18.png",
      icon: Camera, 
      price: "From 1,500,000 VND",
      duration: "Half day (2.5–4h)",
      category: "Excursion",
      details: [
          "Professional photographer guide.",
          "Choice of iconic Da Nang locations.",
          "Tips and techniques for landscape photography.",
          "Private transportation included.",
          "Duration: Half day (approximately 2.5–4 hours)."
      ],
      tags: ["Nature", "Photography", "Adventure", "Guided Tour", "Scenery"]
    }
  ],
  bookingPrompt: {
    title: "Interested in an Extra Touch?",
    description: "Our concierge team is delighted to assist you in arranging any of these exclusive services or tailoring a unique experience just for you.",
    buttonText: "Contact Concierge",
    contactLink: "/#contact"
  }
};