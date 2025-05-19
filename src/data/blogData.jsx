import React from 'react';
import { Calendar, UserCircle, BookOpen } from 'lucide-react';

export const blogPosts = [
  {
    id: 1,
    slug: "12-benefits-of-yoga",
    title: "12 Benefits of Yoga That Are Supported by Science",
    authors: "Sarah Ezrin, Anisha Mansuri",
    date: "Sep 27, 2024",
    imageUrl: "https://i.postimg.cc/BvWPxNKx/yoga-ne.jpg",
    articleUrl: "https://www.healthline.com/nutrition/13-benefits-of-yoga#the-bottom-line",
    category: "Mind & Body",
    tags: ["Yoga", "Health", "Science", "Wellness"],
    excerpt: "Yoga offers physical and mental health benefits for people of all ages. And, if you’re going through an illness, recovering from surgery or living with a chronic condition, yoga can become an integral part of your treatment and potentially hasten healing.",
    featured: false,
    content: `
      <p>Yoga is an ancient practice that involves physical poses, concentration, and deep breathing. A regular yoga practice can promote endurance, strength, calmness, flexibility, and well-being.</p>
      <p>Yoga is now a popular form of exercise around the world. According to a 2017 national survey, one in seven adults in the United States practiced yoga in the past 12 months.</p>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">1. Yoga may decrease stress</h2>
      <p>Yoga is known for its ability to ease stress and promote relaxation. In fact, multiple studies have shown that it can decrease the secretion of cortisol, the primary stress hormone. For example, a 2023 study demonstrated the potent ability of yoga to reduce stress by looking at women who perceived themselves as emotionally distressed.</p>

      <h2 class="text-xl font-semibold mt-6 mb-3">2. May relieve anxiety</h2>
      <p>Many people begin practicing yoga as a way to cope with feelings of anxiety. Interestingly enough, there is a good amount of research that shows yoga can help reduce anxiety. In one 2021 study, 52 women with anxiety disorders participated in a 4-week yoga intervention. The results showed that yoga may be an effective complementary treatment for anxiety disorders.</p>
      
      <p class="mt-4">These are just a few examples. The benefits of yoga are extensive and well-documented.</p>
    `
  },
  {
    id: 2,
    slug: "bamboo-massage-benefits",
    title: "Bamboo Massage: Benefits and What to Expect During Your Session",
    authors: "RLAX.ME Team",
    date: "November 30, 2023",
    imageUrl: "https://i.postimg.cc/bw86zPjQ/MA-T-XA.jpg",
    articleUrl: "https://rlax.me/blog/massage-types/bamboo-massage/",
    category: "Therapies",
    tags: ["Massage", "Bamboo Therapy", "Relaxation"],
    excerpt: "Bamboo massage is a therapeutic massage that uses heated bamboo canes of varying lengths and diameters to provide a deep, soothing massage. It's known for its ability to relieve muscle tension and promote relaxation.",
    featured: false,
    content: `
      <p>Bamboo massage is a type of massage therapy that involves using bamboo stalks of various sizes to knead and roll out knots and relax tense muscles. The bamboo canes are usually heated to provide a deeper sense of relaxation and to warm the muscles, making them more pliable.</p>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">What are the benefits?</h2>
      <ul class="list-disc list-inside space-y-1 pl-2">
        <li>Reduces muscle tension and tightness</li>
        <li>Improves circulation and lymphatic drainage</li>
        <li>Promotes relaxation and reduces stress</li>
        <li>Can improve sleep quality</li>
        <li>May enhance mental clarity</li>
      </ul>

      <h2 class="text-xl font-semibold mt-6 mb-3">What to expect?</h2>
      <p>During a bamboo massage, the therapist will use the heated bamboo canes to apply pressure, using techniques similar to Swedish or deep tissue massage. The canes allow the therapist to apply deeper, more consistent pressure. The warmth of the bamboo also helps to relax the muscles more quickly.</p>
    `
  },
  {
    id: 3,
    slug: "discover-da-nang",
    title: "Discover Da Nang: Coastal Vietnam’s Nature and Culture Bliss",
    authors: "The Oxalis Experience",
    date: "October 15, 2023",
    imageUrl: "https://i.postimg.cc/q7JZGTbk/ĐÒ_ĂN_DA_NANG.jpg",
    articleUrl: "https://oxalisadventure.com/danang-vietnam/",
    category: "Travel & Culture",
    tags: ["Da Nang", "Vietnam", "Travel", "Culture", "Nature"],
    excerpt: "Da Nang, a coastal city in central Vietnam, is renowned for its sandy beaches, French colonial port, and as a gateway to the Marble Mountains. Explore its rich culture, stunning nature, and delicious cuisine.",
    featured: false,
    content: `
      <p>Da Nang is a rapidly growing city that balances modern development with its rich cultural heritage and stunning natural landscapes. From the iconic Dragon Bridge to the serene Marble Mountains, there's something for every traveler.</p>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">Key Attractions</h2>
      <ul class="list-disc list-inside space-y-1 pl-2">
        <li><strong>My Khe Beach:</strong> Famous for its soft sand and clear waters.</li>
        <li><strong>Marble Mountains:</strong> A cluster of five limestone and marble hills, home to caves, temples, and pagodas.</li>
        <li><strong>Son Tra Peninsula:</strong> A lush nature reserve with panoramic views and the Linh Ung Pagoda.</li>
        <li><strong>Dragon Bridge:</strong> An iconic bridge that breathes fire and water on weekend nights.</li>
      </ul>

      <p class="mt-4">Da Nang also serves as a perfect base for exploring nearby UNESCO World Heritage sites like Hoi An Ancient Town and My Son Sanctuary.</p>
    `
  },
  {
    id: 4,
    slug: "fate-comes-to-singing-bowl",
    title: "Fate comes to the Singing Bowl",
    authors: "Ms. Hiền Trần - Founder - Trị Liệu Chuông Xoay: OM Healing",
    date: "August 05, 2023",
    imageUrl: "https://i.postimg.cc/fRjrXLv2/BA-T-HA-T.jpg",
    articleUrl: "https://omhealing.com.vn/cau-chuyen-ve-om-healing/",
    category: "Mindfulness",
    tags: ["Singing Bowls", "Sound Healing", "Meditation", "Vietnamese Tradition"],
    excerpt: "Explore the profound healing journey with singing bowls, a practice deeply rooted in ancient traditions and brought to life by OM Healing. Discover how sound vibrations can lead to inner peace and balance.",
    featured: true,
    content: `
      <p>The journey of OM Healing began with a deep appreciation for the ancient art of sound therapy using singing bowls. Ms. Hiền Trần, the founder, shares her personal story of how fate led her to discover the transformative power of these sacred instruments.</p>
      
      <h2 class="text-xl font-semibold mt-6 mb-3">The OM Healing Philosophy</h2>
      <p>At OM Healing, the belief is that sound is a powerful medium for healing the mind, body, and spirit. Each singing bowl is carefully selected for its unique vibrational frequency, which resonates with different energy centers (chakras) in the body. The therapeutic sessions aim to:</p>
      <ul class="list-disc list-inside space-y-1 pl-2">
        <li>Reduce stress and anxiety</li>
        <li>Promote deep relaxation and mental clarity</li>
        <li>Balance energy and improve overall well-being</li>
        <li>Enhance meditation and mindfulness practices</li>
      </ul>
      <p class="mt-4">OM Healing offers a sanctuary where individuals can experience the profound effects of sound vibrations, fostering a deeper connection with themselves and the universe.</p>
    `
  },
  {
    id: 5,
    slug: "culinary-wellness-le-danh-tuyen",
    title: "Culinary Wellness with GS.TS Lê Danh Tuyên: Nourishing Mind & Body",
    authors: "GS.TS Lê Danh Tuyên",
    date: "May 05, 2022",
    imageUrl: "https://i.postimg.cc/bJdCKRfW/GS-TIEN.webp",
    articleUrl: "https://suckhoedoisong.vn/vien-truong-vien-dinh-duong-quoc-gia.html",
    category: "Nutrition",
    tags: ["Nutrition", "Healthy Eating", "Vietnamese Cuisine", "Wellness"],
    excerpt: "Professor Dr. Lê Danh Tuyên, a leading figure in Vietnamese nutrition, shares insights on how mindful eating and traditional Vietnamese ingredients can contribute to holistic wellness, nourishing both mind and body.",
    featured: true,
    content: `
      <p>Professor Dr. Lê Danh Tuyên, former Director of the National Institute of Nutrition in Vietnam, has dedicated his career to promoting healthy eating habits and understanding the profound connection between nutrition and overall well-being. His work emphasizes the importance of a balanced diet rich in local, seasonal ingredients.</p>

      <h2 class="text-xl font-semibold mt-6 mb-3">Key Principles of Culinary Wellness</h2>
      <p>According to GS.TS Lê Danh Tuyên, culinary wellness involves more than just what we eat; it's also about how we eat and our relationship with food. Some key principles include:</p>
      <ul class="list-disc list-inside space-y-1 pl-2">
        <li><strong>Mindful Eating:</strong> Paying full attention to the experience of eating and drinking, both inside and outside the body.</li>
        <li><strong>Utilizing Fresh, Local Ingredients:</strong> Vietnamese cuisine is rich in herbs, vegetables, and lean proteins, offering a naturally balanced and nutritious way of eating.</li>
        <li><strong>Understanding Nutritional Needs:</strong> Tailoring dietary choices to individual health requirements and life stages.</li>
        <li><strong>The Role of Traditional Foods:</strong> Many traditional Vietnamese dishes and ingredients possess significant health benefits.</li>
      </ul>
      <p class="mt-4">By embracing these principles, we can harness the power of food to not only nourish our bodies but also to enhance our mental clarity and emotional balance, leading to a state of holistic wellness.</p>
    `
  }
];

export const getPostBySlug = (slug) => blogPosts.find(post => post.slug === slug);

export const getRelatedPosts = (currentPostSlug, count = 2) => {
  const currentPost = getPostBySlug(currentPostSlug);
  if (!currentPost) return [];

  return blogPosts
    .filter(post => post.slug !== currentPostSlug && post.category === currentPost.category)
    .slice(0, count);
};

export const getFeaturedPosts = (count = 2) => {
  return blogPosts.filter(post => post.featured).slice(0, count);
};

export const categories = [...new Set(blogPosts.map(post => post.category))];

export const getCategoryColor = (category) => {
  switch (category) {
    case "Mind & Body": return "bg-sky-100 text-sky-700";
    case "Therapies": return "bg-teal-100 text-teal-700";
    case "Travel & Culture": return "bg-amber-100 text-amber-700";
    case "Mindfulness": return "bg-purple-100 text-purple-700";
    case "Nutrition": return "bg-green-100 text-green-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

export const blogPageIcons = {
  Calendar: <Calendar className="w-4 h-4 mr-1.5 text-muted-foreground" />,
  User: <UserCircle className="w-4 h-4 mr-1.5 text-muted-foreground" />,
  Category: <BookOpen className="w-4 h-4 mr-1.5 text-muted-foreground" />
};
