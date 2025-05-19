import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const isValidImageUrl = (url) => {
  return url && typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'));
};
const placeholderAvatar = "https://i.postimg.cc/ChCqG0hC/placeholder-avatar.png";

const cardVariants = {
  initial: { opacity: 0, x: 50, scale: 0.9 },
  animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: -50, scale: 0.9, transition: { duration: 0.3, ease: "easeIn" } }
};

const TestimonialCard = ({ testimonial }) => {
  if (!testimonial) return null;

  return (
    <motion.div
      key={testimonial.name + testimonial.location}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      <Card className="bg-card/70 backdrop-blur-md shadow-xl overflow-hidden border border-border/30 h-full">
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 h-full">
          <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-primary/30 shadow-lg flex-shrink-0">
            <AvatarImage 
              src={isValidImageUrl(testimonial.avatar) ? testimonial.avatar : placeholderAvatar} 
              alt={testimonial.name} 
            />
            <AvatarFallback className="text-2xl bg-primary/20 text-primary">
              {testimonial.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left flex-1">
            <h3 className="text-xl font-semibold text-heading-foreground mb-1">{testimonial.title}</h3>
            <div className="flex items-center justify-center md:justify-start text-yellow-500 mb-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              {[...Array(5 - testimonial.rating)].map((_, i) => (
                <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
              ))}
            </div>
            <p className="text-paragraph-foreground italic leading-relaxed mb-3 text-sm md:text-base">
              "{testimonial.comment}"
            </p>
            <p className="text-sm font-medium text-primary">
              {testimonial.name} - <span className="text-muted-foreground font-normal">{testimonial.location}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;