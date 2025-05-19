import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

const slideUp = (delay = 0, y = 20) => ({
  initial: { opacity: 0, y: y },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
  viewport: { once: true, amount: 0.15 }
});

const staffRoles = [
  {
    imageSrc: "https://i.postimg.cc/CK2HfT9r/name-ne-Aq2WrGkWOoCb2wXB.webp",
    name: "Nguyen Thuy Trang",
    role: "Head of Guest Experience",
    description: "Dedicated to crafting unique cultural and wellness journeys, Thuy Trang designs workshops, classes, and events that enrich your stay and connect you with local traditions.",
  },
  {
    imageSrc: "https://i.postimg.cc/8PdHXYrs/name-ne-2-Awv428G47WfqMg78.webp",
    name: "Chu Thanh Ha",
    role: "Executive Chef - Wellness Cuisine",
    description: "Focused on ensuring every guest enjoys nourishing and delicious cuisine, Thanh Ha curates menus that support holistic wellbeing, using fresh, locally-sourced ingredients.",
  },
  {
    imageSrc: "https://i.postimg.cc/t4XzKzhk/name-ne-3-mk3vr4EvajSKnJN3.webp",
    name: "Tan Trung Kien",
    role: "General Manager",
    description: "Your personal guide to Annam Wellness. Trung Kien oversees all operations, ensuring your experience is seamless, exceptional, and tailored to your needs.",
  },
  {
    imageSrc: "https://i.postimg.cc/XYQg4yLb/name-ne-4-YbNBr4xBB6iQOPZn.webp",
    name: "Pham Phuong Thao",
    role: "Director of Wellness & Spa",
    description: "Highly skilled and experienced, Phuong Thao leads our spa and wellness programs, ensuring deep relaxation and rejuvenation. She also mentors our therapy team.",
  }
];

const HomeTeamSection = () => {
  return (
    <section id="home-team-section" className="py-16 md:py-24 bg-gradient-to-b from-background via-secondary/5 to-background">
      <div className="container-custom">
        <motion.div {...slideUp(0)} className="text-center mb-12 md:mb-16">
          <Users className="w-12 h-12 text-primary mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-serif text-primary-dark mb-3">Meet Our Passionate & Professional Team</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Our dedicated professionals are the heart of Annam Wellness Da Nang, committed to providing you with exceptionally attentive, personalized care and an unforgettable wellness experience.
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto mt-3 italic">
            "We don't just offer services; we craft transformative journeys towards inner peace, holistic vitality, and profound rejuvenation. Your wellbeing is our utmost priority."
          </p>
           <div className="decorative-line mt-8"></div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {staffRoles.map((staff, index) => (
            <motion.div
              key={staff.name}
              {...slideUp(0.1 + index * 0.1)}
            >
              <Card className="h-full flex flex-col text-center shadow-xl hover-lift border border-border/40 hover:border-primary/50 transition-all overflow-hidden group bg-card/90 backdrop-blur-sm">
                <div className="w-36 h-36 md:w-44 md:h-44 mx-auto mt-6 mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={staff.imageSrc}
                    alt={`Portrait of ${staff.name}`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <CardHeader className="pt-0 pb-2">
                  <CardTitle className="text-xl font-serif text-heading-foreground group-hover:text-primary transition-colors">{staff.name}</CardTitle>
                  <CardDescription className="text-sm text-primary font-medium">{staff.role}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow px-5 pb-5 pt-0">
                  <p className="text-xs text-muted-foreground leading-relaxed">{staff.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTeamSection;