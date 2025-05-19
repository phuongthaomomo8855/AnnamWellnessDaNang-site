import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarCheck, Phone, HelpCircle, Sun } from "lucide-react";

const BookingCta = () => {
  const scrollToFooter = () => {
    const footerElement = document.querySelector("footer");
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/90 via-primary to-secondary/90 text-primary-foreground">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto"
        >
          <Sun className="w-12 h-12 mx-auto mb-5 text-amber-300 opacity-90" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 text-shadow-md">
            Ready to Experience Annam Wellness?
          </h2>
          <p className="text-lg md:text-xl mb-10 leading-relaxed text-primary-foreground/90">
            Your journey to rejuvenation and cultural discovery awaits. Secure your preferred dates and experiences at Annam Wellness Da Nang today. Our team is ready to assist you in crafting the perfect escape.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6">
            <Link to="/rooms">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100 shadow-lg transition-all duration-300 transform hover:scale-105 px-8 py-3.5 text-base font-semibold"
              >
                <CalendarCheck className="w-5 h-5 mr-2.5" /> Check Room Availability
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={scrollToFooter}
              className="w-full sm:w-auto border-white/80 text-white hover:bg-white/10 hover:text-white shadow-lg transition-all duration-300 transform hover:scale-105 px-8 py-3.5 text-base font-semibold"
            >
              <Phone className="w-5 h-5 mr-2.5" /> Contact Concierge
            </Button>
          </div>
           <Link to="/faq" className="mt-8 inline-block text-sm text-primary-foreground/80 hover:text-white transition-colors">
            <HelpCircle className="inline w-4 h-4 mr-1.5" />
            Have questions? Visit our FAQ page
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingCta;