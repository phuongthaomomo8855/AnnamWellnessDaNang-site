import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bath as Spa, Leaf, Wind, Droplets, Sun, ArrowRight, HeartHandshake, Brain, Zap } from 'lucide-react';
import ServiceBookingModal from "@/components/services/ServiceBookingModal";
import { wellnessOffersData as wellnessData } from "@/data/wellnessData"; 

const WellnessServices = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookService = (service) => {
    setSelectedService({
      id: service.id, 
      title: service.title,
      name: service.title, 
      price: service.price || "Contact for pricing"
    });
    setIsBookingModalOpen(true);
  };
  
  const handleModalOpenChange = (openState) => {
    setIsBookingModalOpen(openState);
    if (!openState) {
      setSelectedService(null);
    }
  };

  const handleBookingSuccess = (bookingData) => {
    // Logic after successful booking, e.g., show confirmation, redirect, etc.
    // This is handled by the modal itself now.
  };

  const fadeInProps = (delay = 0, y = 20) => ({
    initial: { opacity: 0, y: y },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: "easeOut", delay },
    viewport: { once: true, amount: 0.2 }
  });

  const wellnessCategories = [
    {
      icon: Spa,
      title: "Signature Spa Treatments",
      description: "Indulge in our exclusive therapies designed to rejuvenate your body and soothe your soul, using natural Vietnamese ingredients.",
      link: "/wellness-details",
      linkText: "Explore Treatments",
      image: "https://i.postimg.cc/W4kS0GkC/A-nh-ma-n-hi-nh-2025-05-16-lu-c-11-19-1.webp"
    },
    {
      icon: Leaf,
      title: "Holistic Wellness Programs",
      description: "Embark on a transformative journey with our comprehensive programs that integrate mind, body, and spirit for lasting wellbeing.",
      link: "/wellness-offers",
      linkText: "Discover Programs",
      image: "https://i.postimg.cc/J0N9wPSx/A-nh-ma-n-hi-nh-2025-05-16-lu-c-11-19-2.webp"
    },
    {
      icon: Wind,
      title: "Mindfulness & Meditation",
      description: "Find inner peace and clarity through guided meditation, yoga sessions, and mindful movement practices in serene settings.",
      link: "/wellness-details#mindfulness",
      linkText: "Cultivate Peace",
      image: "https://i.postimg.cc/W4kS0GkC/A-nh-ma-n-hi-nh-2025-05-16-lu-c-11-19-1.webp"
    }
  ];

  return (
    <>
      <section id="wellness-services" className="section-padding bg-gradient-to-br from-background to-background-alt">
        <div className="container-custom">
          <motion.div {...fadeInProps(0)} className="text-center mb-16 md:mb-20">
            <Droplets className="w-12 h-12 text-primary mx-auto mb-4 opacity-80" />
            <h2 className="text-secondary-dark mb-4">Discover Annam Wellness Sanctuary</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Immerse yourself in a world of tranquility and rejuvenation. Our sanctuary offers a diverse range of services, from traditional Vietnamese therapies to modern wellness innovations, all designed to restore your natural balance.
            </p>
            <div className="decorative-line mt-8"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {wellnessCategories.map((category, index) => (
              <motion.div
                key={index}
                {...fadeInProps(0.1 + index * 0.1)}
                className="bg-card rounded-xl shadow-xl overflow-hidden flex flex-col group border border-border/30 hover:shadow-2xl transition-all duration-300 hover-lift"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"></div>
                  <div className="absolute top-4 left-4 bg-primary/80 text-primary-foreground p-3 rounded-full shadow-md">
                    <category.icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-heading-foreground group-hover:text-primary transition-colors mb-3">{category.title}</h3>
                  <p className="text-paragraph-foreground text-sm mb-5 flex-grow">{category.description}</p>
                  <Button asChild variant="outline" className="mt-auto w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Link to={category.link}>
                      {category.linkText} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            {...fadeInProps(0.4)}
            className="mt-16 md:mt-20 text-center"
          >
            <Button asChild size="lg" className="bg-gradient-button text-white button-glow-effect px-8 py-3 text-base">
              <Link to="/cultural-experiences">
                Discover More Annam Local Features Services <Zap className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div {...fadeInProps(0)} className="text-center mb-16 md:mb-20">
            <Sun className="w-12 h-12 text-primary mx-auto mb-4 opacity-80" />
            <h2 className="text-secondary-dark mb-4">Featured Wellness Experiences</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore some of our most sought-after experiences, meticulously crafted for your ultimate relaxation and revitalization.
            </p>
            <div className="decorative-line mt-8"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wellnessData && wellnessData.signatureTreatments && wellnessData.signatureTreatments.slice(0, 3).map((treatment, index) => (
              <motion.div
                key={treatment.id}
                {...fadeInProps(0.1 + index * 0.1)}
                className="bg-card rounded-xl shadow-lg overflow-hidden flex flex-col group border border-border/30 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={treatment.image || "https://i.postimg.cc/W4kS0GkC/A-nh-ma-n-hi-nh-2025-05-16-lu-c-11-19-1.webp"}
                    alt={treatment.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                   <div className="absolute bottom-4 left-4">
                     <h4 className="text-white text-lg font-semibold text-shadow-soft">{treatment.title}</h4>
                     <p className="text-sm text-gray-200 text-shadow-soft">{treatment.duration} | {treatment.price}</p>
                   </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <p className="text-paragraph-foreground text-sm mb-4 flex-grow line-clamp-3">{treatment.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <Link to={`/wellness-details#${treatment.id}`} className="text-sm text-primary hover:underline font-medium">
                      View Details <ArrowRight className="inline-block ml-1 h-4 w-4" />
                    </Link>
                    <Button size="sm" variant="secondary" onClick={() => handleBookService(treatment)}>
                      Book Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <ServiceBookingModal
        open={isBookingModalOpen}
        onOpenChange={handleModalOpenChange}
        service={selectedService}
        onBookingSubmitSuccess={handleBookingSuccess}
        serviceCategory="Wellness Service"
      />
    </>
  );
};

export default WellnessServices;