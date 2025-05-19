import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import TestimonialSlider from "./testimonials/TestimonialSlider";
import GallerySection from "./testimonials/GallerySection";

const testimonialsData = [
  {
    name: "Akira Tanaka",
    location: "Guest from Japan",
    avatar: "https://i.postimg.cc/RFgbL2Bn/premium-photo-1682095379852-8ce2bc3c1c59-fm-jpg-q-60-w-3000-ixlib-rb-4-1.jpg",
    rating: 5,
    title: "An Oasis of Serenity and Culture!",
    comment:
      "Annam Wellness was an absolute dream. The blend of luxurious comfort with deep cultural experiences was unique. The staff were incredibly attentive, and the spa treatments were world-class. I left feeling completely rejuvenated. The attention to detail in the traditional Vietnamese architecture and decor is stunning. I particularly enjoyed the morning meditation sessions by the beach – so peaceful.",
  },
  {
    name: "Sarah Chen",
    location: "Guest from New York, USA",
    avatar: "https://i.postimg.cc/3wnZspbs/new-york-city-winter-jpg-optimal.jpg",
    rating: 5,
    title: "Exceptional Service and Authentic Experiences",
    comment:
      "From the moment I arrived, I was treated like royalty. The wellness programs are thoughtfully designed, and the cultural evenings were a highlight. A truly authentic Vietnamese experience with a touch of luxury. The food was exquisite, with fresh, local ingredients. I highly recommend the cooking class!",
  },
  {
    name: "James Smith",
    location: "Guest from Sydney, Australia",
    avatar: "https://i.postimg.cc/43TMfzPn/female_executive_hotel_guest_walking_through_lobby_wheeling_suitcase.jpg",
    rating: 4,
    title: "Beautiful Resort, Relaxing Atmosphere",
    comment:
      "A beautiful resort with stunning views and a very relaxing atmosphere. The spa facilities are top-notch. While most things were perfect, the Wi-Fi in my room was a bit inconsistent at times. However, the staff were quick to address any concerns. The gardens are meticulously maintained and provide a wonderful sense of tranquility.",
  },
  {
    name: "Fatima Al Maktoum",
    location: "Guest from Dubai, UAE",
    avatar: "https://i.postimg.cc/ZRjKFYnF/One-person-LLC-Dubai-featured-image.png", 
    rating: 5,
    title: "Luxury and Tradition in Perfect Harmony",
    comment:
      "Annam Wellness exceeded all my expectations. The fusion of luxury with Vietnamese tradition is seamless. The private pool villa was incredible, and the wellness consultation helped me tailor a perfect retreat. A truly memorable stay, I can't wait to return. The staff's hospitality was warm and genuine, making me feel right at home.",
  },
  {
    name: "Linh Nguyen",
    location: "Guest From Vietnam",
    avatar: "https://i.postimg.cc/vmLKcc2h/49.jpg",
    rating: 5,
    title: "Chốn Bình Yên Giữa Lòng Đà Nẵng",
    comment:
      "Thật sự là một trải nghiệm tuyệt vời tại Annam Wellness. Không gian yên tĩnh, kiến trúc đậm chất Việt Nam và dịch vụ thì không chê vào đâu được. Các liệu trình spa rất chuyên nghiệp, giúp mình thư giãn hoàn toàn. Mình chắc chắn sẽ quay lại và giới thiệu cho bạn bè. Nhân viên rất thân thiện và am hiểu văn hóa địa phương.",
  },
  {
    name: "Kim Min-jun",
    location: "Guest from Korea",
    avatar: "https://i.postimg.cc/zBzcW89r/Screenshot-2024-02-08-at-14.40.09.jpg",
    rating: 5,
    title: "완벽한 휴식과 문화 체험의 조화",
    comment:
      "안남 웰니스는 정말 꿈같은 곳이었어요. 고급스러운 편안함과 깊이 있는 문화 체험이 어우러져 독특한 경험을 선사했습니다. 직원들은 매우 세심했고 스파 트리트먼트는 세계적인 수준이었습니다. 완전히 재충전된 기분으로 떠났습니다. 특히 해변에서의 아침 명상 세션이 인상적이었어요.",
  },
];

const galleryImagesData = [
  { src: "https://i.postimg.cc/T1DD8z4F/A-NH-NE-N-2.webp", alt: "Expansive swimming pool at Annam Wellness resort" },
  { src: "https://i.postimg.cc/nzF737w5/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_11.23.38.png", alt: "Lush tropical gardens surrounding the resort" },
  { src: "https://i.postimg.cc/fbhY017M/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_11.23.13.png", alt: "Serene pathway through Annam Wellness gardens" },
  { src: "https://i.postimg.cc/PqJ0CtZ8/A-nh-ma-n-hi-nh-2025-05-17-lu-c-13-13-43.png", alt: "Aerial view of Annam Wellness resort and coastline" },
  { src: "https://i.postimg.cc/C5T2rk2j/A-nh-ma-n-hi-nh-2025-05-17_lu-c-13-44-30.png", alt: "Relaxing poolside cabanas with ocean views" },
  { src: "https://i.postimg.cc/fycrGk41/A-nh-ma-n-hi-nh-2025-05-17_lu-c-13-43-57.png", alt: "Beautifully landscaped resort grounds at Annam Wellness" },
  { src: "https://i.postimg.cc/rpSpT1zC/natural1-A3q8-LDMva8-J9w-Zkm.jpg", alt: "Tranquil water feature in the resort gardens" },
  { src: "https://i.postimg.cc/HnqbVYMT/ainh-main-hiinh-2025-05-16-luic-11-1.webp", alt: "Evening ambiance by the resort pool" },
  { src: "https://i.postimg.cc/cH18Nb8h/A-nh-ma-n-hi-nh-2025-05-17-lu-c-16-38-33.png", alt: "Detailed view of resort architecture" },
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-secondary/5 via-background to-secondary/5">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <Star className="w-12 h-12 text-accent mx-auto mb-4" />
          <h2 className="text-accent mb-4">Voices of Our Valued Guests</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear what our guests have to say about their transformative experiences at Annam Wellness Da Nang.
          </p>
          <div className="decorative-line-accent mt-8"></div>
        </motion.div>

        <TestimonialSlider testimonials={testimonialsData} />
        
        <GallerySection 
          images={galleryImagesData}
          title="Natural scenery, relaxing atmosphere around Annam Wellness"
          description="Immerse yourself in the tranquil beauty that defines Annam Wellness."
        />
      </div>
    </section>
  );
};

export default Testimonials;