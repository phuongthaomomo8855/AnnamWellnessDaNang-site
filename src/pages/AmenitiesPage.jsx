import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { amenitiesPageData } from '@/data/amenities/index.js';
import { ArrowRight, Phone, Mail, MapPin, Clock, Utensils, Bath as SpaIcon, Users, Wind, Coffee, Dumbbell, Waves, Leaf, Accessibility, Baby, ToyBrick, Car, Tv, Bath, ConciergeBell, ShoppingBag, Shirt, Sun, Moon, Star, Wifi, ParkingCircle, PersonStanding } from 'lucide-react';


const iconComponents = {
  Utensils, SpaIcon, Users, Wind, Coffee, Dumbbell, Waves, Leaf, Accessibility, Baby, ToyBrick, Car, Tv, Bath, ConciergeBell, ShoppingBag, Shirt, Sun, Moon, Star, Wifi, ParkingCircle, PersonStanding,
  Phone, Mail, MapPin, Clock, ArrowRight
};

const AmenityCard = ({ item, index }) => {
  const IconComponent = iconComponents[item.icon?.displayName] || item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-xl shadow-lg overflow-hidden flex flex-col h-full border border-border/30 hover:shadow-xl transition-shadow duration-300 group"
    >
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <img 
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center mb-3">
          {IconComponent && <IconComponent className="w-6 h-6 text-primary mr-3 flex-shrink-0" />}
          <h3 className="text-xl font-semibold text-heading-foreground group-hover:text-primary transition-colors">{item.name}</h3>
        </div>
        <p className="text-paragraph-foreground text-sm mb-3 flex-grow">{item.description}</p>
        {item.operatingHours && (
          <p className="text-xs text-muted-foreground mb-1"><span className="font-medium text-foreground">Hours:</span> {item.operatingHours}</p>
        )}
        {Array.isArray(item.details) && item.details.length > 0 && (
           <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1 mt-2">
            {item.details.map((detail, i) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>
        )}
        {typeof item.details === 'string' && (
           <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Details:</span> {item.details}</p>
        )}
      </div>
    </motion.div>
  );
};

const AmenitiesSection = ({ sectionData }) => {
  const SectionIcon = iconComponents[sectionData.icon?.displayName] || sectionData.icon;
  return (
    <section id={sectionData.id} className="py-12 md:py-20 bg-background-alt">
      <div className="container-custom">
        <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
          {SectionIcon && <SectionIcon className="w-12 h-12 text-primary mx-auto mb-4" />}
          <h2 className="text-3xl md:text-4xl font-serif text-gradient-gold-teal mb-4">{sectionData.name}</h2>
          <p className="text-base md:text-lg text-paragraph-foreground leading-relaxed">{sectionData.description}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sectionData.amenities.map((item, index) => (
            <AmenityCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const AmenitiesPage = () => {
  const { hero, categories, contactSection } = amenitiesPageData;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background"
    >
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src={hero.image}
          alt={hero.alt || "Luxurious resort amenities background"}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 p-4 container-custom">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4 text-shadow-strong text-white"
          >
            {hero.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-shadow-soft text-white"
          >
            {hero.subtitle}
          </motion.p>
        </div>
      </section>

      {categories.map(section => (
        <AmenitiesSection key={section.id} sectionData={section} />
      ))}

      <section className="relative py-20 md:py-32 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${contactSection.image})` }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary-dark/80 to-black/80"></div>
        <div className="container-custom relative z-10 text-center text-white">
          <motion.h2 
            initial={{ opacity: 0, y:20 }}
            whileInView={{ opacity: 1, y:0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-serif mb-6 text-shadow-strong"
          >
            {contactSection.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y:20 }}
            whileInView={{ opacity: 1, y:0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay:0.2 }}
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-shadow-soft"
          >
            {contactSection.description}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y:20 }}
            whileInView={{ opacity: 1, y:0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay:0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12"
          >
            {contactSection.contactPoints.map(point => {
              const Icon = iconComponents[point.iconName];
              return (
                <a 
                  key={point.id} 
                  href={point.href} 
                  target={point.href === "#" || point.href.startsWith("tel:") || point.href.startsWith("mailto:") ? "_self" : "_blank"}
                  rel={point.href === "#" || point.href.startsWith("tel:") || point.href.startsWith("mailto:") ? "" : "noopener noreferrer"}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition-colors duration-300 group"
                >
                  {Icon && <Icon className="w-8 h-8 text-secondary mb-3 mx-auto group-hover:scale-110 transition-transform" />}
                  <h4 className="text-lg font-semibold mb-1">{point.label}</h4>
                  <p className="text-sm text-gray-200 group-hover:text-white transition-colors">{point.value}</p>
                </a>
              );
            })}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y:20 }}
            whileInView={{ opacity: 1, y:0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay:0.6 }}
          >
             <RouterLink to="/#contact-section-home" className="inline-block">
                {/* ScrollLink is not strictly needed here if App.jsx handles hash scrolling */}
                {/* However, keeping it for potential specific page logic if needed in future */}
                <Button asChild={false} size="lg" className="bg-gradient-button text-white button-glow-effect px-8 py-3 text-base cursor-pointer">
                  <span className="flex items-center">
                      Send Us a Message <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Button>
              </RouterLink>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AmenitiesPage;