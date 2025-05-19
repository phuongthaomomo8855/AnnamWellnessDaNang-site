import { Bath as SpaIcon, Dumbbell, Leaf, Waves, Sun, Wind } from 'lucide-react'; // Removed Sailboat as it's not explicitly listed for Tranquil Private Beach now

export const wellnessRecreationData = {
  id: "wellness-recreation",
  name: "Wellness Sanctuaries & Facilities",
  icon: SpaIcon,
  description: "Rejuvenate your senses with our comprehensive wellness amenities and state-of-the-art facilities, designed for your utmost comfort and relaxation.",
  amenities: [
    {
      id: "annam-wellness-spa",
      name: "Annam Wellness Spa",
      icon: SpaIcon,
      description: "Using high-quality natural essential oils to diffuse, bringing a deep therapeutic experience, relaxation, and balance of mind. Our spa offers a serene escape with private treatment rooms, sauna, steam bath, and vitality pools, employing traditional Vietnamese therapies and modern wellness techniques.",
      image: "https://i.postimg.cc/3JkLNNsQ/aii-aii-5-AGB2-Jbe6-Zr-I8-Ql-VX.jpg",
      operatingHours: "8:00 am - 22:00 pm",
      details: [
        "Signature Annam treatments",
        "Private therapy rooms and couple suites",
        "Sauna, steam room, and vitality pools",
        "Beauty salon services"
      ],
    },
    {
      id: "lagoon-swimming-pool",
      name: "Lagoon Swimming Pool",
      icon: Waves,
      description: "Annam Wellness pools use salt water filtration to reduce chlorine irritation, in line with Korea’s focus on holistic health and skincare. The comfortable lounge area next to the pool and free towels are provided. Food is served right at the swimming pool to bring a complete and convenient resort experience.",
      image: "https://i.postimg.cc/T1DD8z4F/A-NH-NE-N-2.webp",
      operatingHours: "6:00 am - 22:00 pm",
      details: [
        "Salt Water Filtration System",
        "Expansive free-form pool with dedicated kids' area",
        "Poolside bar and sun loungers",
        "Towel service and poolside F&B"
      ],
    },
    {
      id: "royal-fitness-center",
      name: "Royal Fitness Center",
      icon: Dumbbell,
      description: "Gym area is designed in a royal style but still retains a modern look with an open space and full of natural light from large glass windows, a view of the green garden creating a comfortable and energetic feeling for each workout session. Fully equipped with high-end training equipment from cardio, functional training machines to free weights, the gym is suitable for all health training needs.",
      image: "https://i.postimg.cc/7Z7m1cPB/aii-aii-4-m6-LZeb-Wwn1-ILP803.jpg",
      operatingHours: "6:00 am - 22:00 pm",
      details: [
        "Technogym equipment: Cardio & Strength",
        "Free weights and functional training area",
        "Personal trainers available upon request",
        "Yoga and fitness classes scheduled daily"
      ],
    },
    {
      id: "soaking-pool",
      name: "Soaking Pool & Hydrotherapy",
      icon: Leaf, // Changed from Bath for consistency if Bath is SpaIcon
      description: "Immerse yourself in our state-of-the-art hydrotherapy circuit, with private pools, soaking water infused with Southern herbs, fresh flower petals, and the gentle scent of essential oils wafting through the air, creating a feeling of absolute relaxation.",
      image: "https://i.postimg.cc/pdWz91m5/airair3-A0xl8ja-QE3-C0-DLWA-1.jpg",
      operatingHours: "8:00 am - 18:00 pm",
      details: [
        "Herbal infused private soaking pools",
        "Hydrotherapy circuit",
        "Adjacent to spa facilities for integrated wellness"
      ],
    },
    {
      id: "sunrise-yoga-deck",
      name: "Sunrise Yoga Deck",
      icon: Sun,
      description: "Greet the day with mindful movement and breathtaking views on our dedicated yoga deck. Daily guided classes, meditation sessions.",
      image: "https://i.postimg.cc/4NfZfbmn/A-nh-ma-n-hi-nh-2025-05-18-lu-c-01-28-38.png",
      operatingHours: "Sunrise sessions (check schedule), Open for private practice all day",
      details: [
        "Complimentary for resort guests",
        "Mats and props provided",
        "Suitable for all levels (Hatha, Vinyasa, Meditation)"
      ],
    },
    {
      id: "tranquil-private-beach",
      name: "Tranquil Private Beach",
      icon: Waves,
      description: "Exclusive and serene, beach butler service. Unwind on our pristine private beach, a secluded haven of soft sands and gentle waves. Perfect for sunbathing, mindful walks, or simply enjoying the calming ocean breeze.",
      image: "https://i.postimg.cc/JnhvRLZT/aii-mp8-Wr-J2rkq-Tex3g5.png",
      operatingHours: "Accessible 24/7 (Lifeguard on duty: 8:00 - 18:00)",
      details: [
        "Private beach access with beach butler service",
        "Sun loungers, umbrellas, and towel service",
        "Beachfront refreshment service",
        "Beach Yoga & Volleyball (on request)"
      ]
    },
    { // Moved Designated Smoking Lounge here for better categorization
      id: "designated-smoking-lounge",
      name: "Designated Smoking Lounge",
      icon: Wind,
      description: "Designed a separate smoking area in an elegant royal style, with a roof and comfortable seats, arranged in an open outdoor location. This area equipped with a modern cigarette vending machine.",
      image: "https://i.postimg.cc/2jZThykQ/naim-7-d951a44awvUO796O.jpg",
      operatingHours: "All day",
      details: [
        "Discreetly located outdoor area",
        "Comfortable seating and ashtrays",
        "Cigarette vending machine available"
      ]
    },
  ],
};