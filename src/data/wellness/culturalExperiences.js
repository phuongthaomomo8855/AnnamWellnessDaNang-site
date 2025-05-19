import { MapPin, Users, Palette, Utensils, Music, CalendarDays, Clock } from 'lucide-react';

export const culturalPageData = {
  pageTitle: "Authentic Cultural Immersion",
  pageDescription: "Dive deep into the heart of Vietnamese culture with our curated experiences. Connect with local traditions, artistry, and the vibrant spirit of Da Nang and its surroundings.",
  heroImages: [
    "https://i.postimg.cc/QdrKWZ30/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_10.45.41.png",
    "https://i.postimg.cc/DwqsCyg9/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_10.07.40.png",
    "https://i.postimg.cc/ydgLmNnw/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_02.40.17.png"
  ],
  pageHeaderImage: "https://i.postimg.cc/L6WXY0T2/thien-an-Thuyen-Buom-TA-1.jpg", // Fallback if heroImages is not used or empty
  experiences: [
    {
      id: "cultural_evening",
      title: "Đêm An Nam - Cultural Evening",
      description: "Experience an enchanting evening filled with traditional Vietnamese music, captivating dance performances, and a showcase of local customs. A true taste of Annam's rich heritage.",
      image: "https://i.postimg.cc/TPj9j89R/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-16_lu%CC%81c_21.51.51.png",
      icon: Music,
      duration: "Approx. 3 hours",
      frequency: {
        weekly: "Every Friday & Saturday evening",
        festival: "Special performances during festival seasons"
      },
      targetAudience: "All guests, families, culture enthusiasts",
      details: [
        "Live traditional music (Đàn Tranh, Sáo Trúc)",
        "Ao Dai fashion show",
        "Folk dance performances",
        "Vietnamese calligraphy demonstration",
        "Welcome drink and local snacks included"
      ],
      bookingLink: "/booking?service=cultural_evening",
      tags: ["Evening Show", "Music & Dance", "Heritage"]
    },
    {
      id: "da_nang_heritage_tour",
      title: "Da Nang Nature & Cultural Heritage Tours",
      description: "Explore the breathtaking natural beauty and rich historical sites of Da Nang. Visit the Marble Mountains, Linh Ung Pagoda, and discover hidden cultural gems with our expert guides.",
      image: "https://i.postimg.cc/KYn2nYwR/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-16_lu%CC%81c_22.04.19.png",
      icon: MapPin,
      duration: "Half-day or Full-day options",
      frequency: "Daily, pre-booking required",
      targetAudience: "Adventure seekers, history buffs, nature lovers",
      details: [
        "Guided tour of Marble Mountains (Ngu Hanh Son)",
        "Visit to Linh Ung Pagoda with the Lady Buddha statue",
        "Exploration of local fishing villages or historical sites",
        "Comfortable transportation included",
        "Option for a local Vietnamese lunch"
      ],
      bookingLink: "/booking?service=heritage_tour",
      tags: ["Day Tour", "Nature", "History"]
    },
    {
      id: "artisan_workshops",
      title: "Local Artisan Workshops",
      description: "Engage in hands-on workshops led by local artisans. Learn the art of lantern making, traditional pottery, or Vietnamese conical hat (Nón Lá) painting.",
      image: "https://i.postimg.cc/9M4bxFGj/naiiu-ain-ain-AMq1y-DV56ys6-GWk-W.webp",
      icon: Palette,
      duration: "2-3 hours per workshop",
      frequency: "Scheduled weekly, check calendar for details",
      targetAudience: "Creative individuals, families, those seeking authentic experiences",
      details: [
        "Choice of Lantern Making, Pottery, or Nón Lá Painting",
        "All materials provided",
        "Guidance from skilled local artisans",
        "Take home your handmade creation as a souvenir",
        "Suitable for all skill levels"
      ],
      bookingLink: "/booking?service=artisan_workshop",
      tags: ["Handicraft", "Workshop", "Art"]
    },
    {
      id: "vietnamese_cooking_class",
      title: "Vietnamese Culinary Masterclass",
      description: "Discover the secrets of authentic Vietnamese cuisine. Join our chefs for a market tour followed by a hands-on cooking class where you'll prepare and savor traditional dishes.",
      image: "https://i.postimg.cc/fTjBjpjT/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_03.04.18.png",
      icon: Utensils,
      duration: "Approx. 4 hours",
      frequency: "3 times a week (Mon, Wed, Fri mornings)",
      targetAudience: "Food lovers, aspiring chefs, cultural explorers",
      details: [
        "Guided local market tour",
        "Learn to prepare 3-4 signature Vietnamese dishes",
        "Hands-on cooking experience with expert chefs",
        "Enjoy the meal you've prepared",
        "Recipe booklet to take home"
      ],
      bookingLink: "/booking?service=cooking_class",
      tags: ["Cooking Class", "Cuisine", "Local Food"]
    },
  ],
  cta: {
    backgroundImage: "https://i.postimg.cc/HsJGkpQ8/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_02.27.57.png",
    title: "Embark on Your Cultural Journey",
    description: "Deepen your connection with Vietnam's vibrant culture. Book your preferred experiences now and create lasting memories.",
    buttonText: "Inquire About Experiences",
    buttonLink: "/booking"
  }
};