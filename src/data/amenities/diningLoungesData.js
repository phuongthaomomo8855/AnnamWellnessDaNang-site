import { Utensils, Wine, Coffee, Tv } from 'lucide-react';

export const diningLoungesData = {
  id: "dining",
  name: "Wellness Dining & Lounge",
  icon: Utensils,
  description: "Savor exquisite flavors crafted with fresh, local ingredients, designed to nourish your body and delight your senses. Our culinary experiences are an integral part of your wellness journey.",
  amenities: [
    {
      id: "saveurs-du-annam",
      name: "Saveurs Du Annam",
      icon: Utensils,
      description: "Saveurs du Annam - meaning the flavors and culinary quintessence of Annam, elegantly recreated and a space filled with natural light. The restaurant serves breakfast with a rich menu of traditional Vietnamese dishes. Light pouring through large windows, creating an early morning culinary experience that is both relaxing and rich in Identity.",
      image: "https://i.postimg.cc/sxYp8Bxb/thien-3-AVL7ra8Wa5HJ3yaQ.jpg",
      operatingHours: "6:00 am - 10:00 am",
      details: [
        "Cuisine: Vietnamese, Fusion",
        "Dress Code: Smart Casual",
        "Capacity: 80 guests"
      ],
    },
    {
      id: "annam-lounge-imperial",
      name: "Annam Lounge (Le Festin Impérial - Royal Banquet)",
      icon: Utensils,
      description: "Le Festin Impérial - Royal Banquet, with its solemn and luxurious culinary space and architecture inspired by the splendid banquets in the ancient royal palace. Crystal Chandeliers to classical art statues. The ideal destination for organizing high-class parties, dinners, galas or royal weddings. Serves Vietnamese and modern European dishes prepared by the restaurants chefs.",
      image: "https://i.postimg.cc/wTz5Nkbz/thien-2-A1aP25xozQFKNn6A.jpg",
      operatingHours: "9:00 am - 00:00 am",
      details: [
        "Cuisine: Royal Vietnamese Set Menus, Modern European",
        "Dress Code: Formal / Traditional Ao Dai Recommended",
        "Capacity: 40 guests (Reservations highly recommended)"
      ],
    },
    {
      id: "annam-lounge-evening",
      name: "Annam Lounge (Evening) - L'Essence Lounge & Bar",
      icon: Coffee,
      description: "L'Essence Lounge & Bar where liquid gastronomy meets the beauty of royal heritage. The bar space is designed with charming dark brown tones, meticulously carved wooden furniture. Not only serving famous wines and cocktails but also special cocktails with Southern herbal scents. An ideal destination to relax in the afternoon or enjoy an inspiring luxurious night.",
      image: "https://i.postimg.cc/9FBdYqv7/thien-5-Yan1kJxRyptJz0rj.jpg",
      operatingHours: "18:00 pm - 00:00 am",
      details: [
        "Offerings: Cocktails, Fine Wines, Herbal Infused Drinks, Healthy Bites",
        "Dress Code: Smart Casual",
        "Live Music: Fri & Sat evenings"
      ],
    },
    {
      id: "in-room-dining",
      name: "In-Room Dining",
      icon: Tv,
      description: "Enjoy nutritious and delicious meals in the comfort and privacy of your room or suite. Our in-room dining menu features a wide selection of wellness-focused dishes, available 24/7.",
      image: "https://i.postimg.cc/NFRbnP3D/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_02.57.16.png",
      operatingHours: "Available 24/7",
      details: [
        "Menu: Wellness Cuisine, International Favorites, Children's Menu",
        "Service: Prompt and discreet"
      ],
    },
  ],
};