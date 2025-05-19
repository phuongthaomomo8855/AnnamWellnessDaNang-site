import React from "react";
import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

const SectionWrapper = ({ children, className = "", id }) => (
  <section id={id} className={`py-12 md:py-20 ${className}`}>
    <div className="container-custom">{children}</div>
  </section>
);

const HomeContactSection = () => {
  return (
    <SectionWrapper id="contact" className="bg-gradient-to-b from-primary/5 via-transparent to-primary/5">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        <ContactForm />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="h-[400px] md:h-full w-full rounded-lg overflow-hidden shadow-xl border border-border/30 flex flex-col items-center justify-center bg-white"
        >
          <img
            src="https://i.postimg.cc/MK1P2Tg6/mapmap-m6-LZeb-QRMVf40-Bo1.webp"
            alt="Annam Map"
            className="object-cover w-full h-full"
          />
          <a
            href="https://maps.google.com/?q=5+Vo+Nguyen+Giap,+Ngu+Hanh+Son,+Da+Nang"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-primary text-sm hover:underline"
          >
            📍 Getting Directions with Google Maps
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default HomeContactSection;
