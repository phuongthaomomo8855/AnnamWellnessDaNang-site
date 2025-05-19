import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as LucideIcons from "lucide-react";

import { wellnessOffersData } from "@/data/wellnessData";
import ServiceBookingModal from "@/components/services/ServiceBookingModal"; 
import WellnessSectionHeader from "@/components/wellness/WellnessSectionHeader";
import WellnessTabButton from "@/components/wellness/WellnessTabButton";
import WellnessServiceCard from "@/components/wellness/WellnessServiceCard";

import { signatureTreatments } from "@/data/wellness/signatureTreatments";
import { wellnessWorkshops } from "@/data/wellness/wellnessWorkshops";
import { packageOffers } from "@/data/wellness/packageOffers";

const { Spa, Brain, Package, Info } = LucideIcons;


const WellnessServiceDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("spa");
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const [initialGuestDetailsForModal, setInitialGuestDetailsForModal] = useState(null);
  const navigate = useNavigate();

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (location.state?.serviceToBook) {
      setSelectedService(location.state.serviceToBook);
      setInitialGuestDetailsForModal(location.state.guestDetails || null);
      setIsModalOpen(true);
       const correspondingTab = tabs.find(tab => tab.data.some(service => service.id === location.state.serviceToBook.id));
      if (correspondingTab) {
        setActiveTab(correspondingTab.id);
      }
    }
  }, [location.state]);


  const tabs = [
    { id: "spa", label: "Spa & Holistic", icon: Spa, data: signatureTreatments },
    { id: "workshops", label: "Signature Workshops", icon: Brain, data: wellnessWorkshops },
    { id: "packages", label: "Wellness Packages", icon: Package, data: packageOffers },
  ];

  const currentData = tabs.find(tab => tab.id === activeTab)?.data || [];

  const handleSelectService = (service) => {
    setSelectedService(service);
    setInitialGuestDetailsForModal(null); 
    setIsModalOpen(true);
  };
  
  const handleModalOpenChange = (openState) => {
    setIsModalOpen(openState);
    if (!openState) {
        setSelectedService(null);
        setInitialGuestDetailsForModal(null);
        if (location.state?.serviceToBook) {
            const newLocationState = { ...location.state };
            delete newLocationState.serviceToBook;
            delete newLocationState.guestDetails;
            navigate(location.pathname, { state: newLocationState, replace: true });
        }
    }
  };

  const handleBookingSuccess = (bookedData) => {
    // Modal handles its own success message and navigation to confirmation.
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900/90 via-stone-800/90 to-brown-900/90 text-white selection:bg-amber-500 selection:text-black">
      <div className="container-custom py-12 md:py-16">
        <WellnessSectionHeader title={wellnessOffersData.mainHeading} description={wellnessOffersData.mainDescription} />
        
        <div className="sticky top-[60px] md:top-[72px] z-30 mb-8 md:mb-12 bg-black/30 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden">
          <div ref={scrollContainerRef} className="flex justify-center items-center p-1.5 sm:p-2 space-x-1 sm:space-x-2 overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <WellnessTabButton
                key={tab.id}
                label={tab.label}
                icon={tab.icon}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                layoutId="wellnessTabIndicator"
              />
            ))}
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {currentData.map((item) => (
              <WellnessServiceCard key={item.id || item.title} item={item} onSelectService={handleSelectService} />
            ))}
            {currentData.length === 0 && (
              <div className="md:col-span-2 lg:col-span-3 text-center py-12 text-gray-400">
                <Info className="w-12 h-12 mx-auto mb-4" />
                <p className="text-xl">No services found in this category.</p>
                <p>Please explore our other wellness offerings.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <ServiceBookingModal 
        open={isModalOpen} 
        onOpenChange={handleModalOpenChange}
        service={selectedService}
        onBookingSubmitSuccess={handleBookingSuccess}
        initialGuestDetails={initialGuestDetailsForModal}
        serviceCategory="Wellness Services" 
      />
    </div>
  );
};

export default WellnessServiceDetailsPage;