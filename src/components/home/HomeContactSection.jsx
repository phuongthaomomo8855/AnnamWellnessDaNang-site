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
          className="h-[400px] md:h-full w-full rounded-lg overflow-hidden shadow-xl border border-border/30"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.001520897026!2d108.24152707490153!3d16.06511483960631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142177a74ae9ac5%3A0xfa149f45959a6993!2zNSBWw7UgTmd1ecOqbiBHaS preschoolersAywgQuG6r2MgUGjDuiBN4bu5LCBOZ8WpIEjDoG5oIFPGoW4sIMSQw6AgTuG6tW5nLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1715930096977!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border:0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Annam Wellness Da Nang Location - 5 Vo Nguyen Giap"
          ></iframe>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

export default HomeContactSection;