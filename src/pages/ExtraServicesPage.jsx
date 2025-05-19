import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { extraServicesPageData } from '@/data/wellness/extraServices';
import ServiceBookingModal from '@/components/services/ServiceBookingModal';
import AirportShuttleOptionsModal from '@/components/services/AirportShuttleOptionsModal';
import ServiceCard from '@/components/extraServices/ServiceCard';
import HeroImageSlider from '@/components/shared/HeroImageSlider';

const ExtraServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isShuttleOptionsModalOpen, setIsShuttleOptionsModalOpen] = useState(false);

  const handleSelectService = (service) => {
    setSelectedService(service);
    if (service.id === 'airport-shuttle') {
      setIsShuttleOptionsModalOpen(true);
    } else {
      setSelectedVehicle(null); 
      setIsBookingModalOpen(true);
    }
  };
  
  const handleModalOpenChange = (openState) => {
    setIsBookingModalOpen(openState);
    if (!openState) {
      setSelectedService(null);
      setSelectedVehicle(null);
    }
  };
  
  const handleShuttleModalOpenChange = (openState) => {
    setIsShuttleOptionsModalOpen(openState);
    if (!openState && !isBookingModalOpen) { 
      setSelectedService(null);
    }
  };

  const handleVehicleSelection = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsShuttleOptionsModalOpen(false);
    setIsBookingModalOpen(true); 
  };

  const handleBookingSuccess = (bookingData) => {
    // Modal handles navigation to confirmation page
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const transition = { duration: 0.5, ease: "easeInOut" };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={transition}
      className="bg-background"
    >
      <HeroImageSlider
        images={extraServicesPageData.heroSliderImages}
        fallbackImage={extraServicesPageData.heroImageFallback}
        interval={2000}
        sectionHeight="h-[60vh] md:h-[75vh]"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4 text-white text-shadow-strong"
        >
          {extraServicesPageData.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-gray-200 text-shadow-soft"
        >
          {extraServicesPageData.description}
        </motion.p>
      </HeroImageSlider>

      <section className="py-16 md:py-24 bg-background-alt">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {extraServicesPageData.services.map((service, index) => (
              <ServiceCard key={service.id} offer={service} onSelectService={handleSelectService} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section 
        className="py-16 md:py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/5"
      >
        <div className="container-custom text-center">
          <motion.h2 
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-serif text-primary-dark mb-6"
          >
            {extraServicesPageData.bookingPrompt.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto mb-8"
          >
            {extraServicesPageData.bookingPrompt.description}
          </motion.p>
          <motion.div
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Button asChild size="lg" className="bg-gradient-button text-white button-glow-effect px-8 py-3 text-base">
              <Link to={extraServicesPageData.bookingPrompt.contactLink}>
                {extraServicesPageData.bookingPrompt.buttonText}
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
      
      <ServiceBookingModal
        open={isBookingModalOpen}
        onOpenChange={handleModalOpenChange}
        service={selectedService}
        selectedVehicle={selectedVehicle}
        onBookingSubmitSuccess={handleBookingSuccess}
        serviceCategory="Extra Services"
      />
       <AirportShuttleOptionsModal
        isOpen={isShuttleOptionsModalOpen}
        onClose={() => handleShuttleModalOpenChange(false)}
        service={selectedService}
        onSelectVehicle={handleVehicleSelection}
      />
    </motion.div>
  );
};

export default ExtraServicesPage;