import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/ui/use-toast";
import ServiceBookingModal from "@/components/services/ServiceBookingModal"; 

import WellnessPageHeader from "@/components/wellnessOffers/WellnessPageHeader";
import WellnessFilterControls from "@/components/wellnessOffers/WellnessFilterControls";
import WellnessServiceGrid from "@/components/wellnessOffers/WellnessServiceGrid";
import WellnessCtaButtons from "@/components/wellnessOffers/WellnessCtaButtons";

import { holisticPrograms } from "@/data/wellness/holisticPrograms"; 
import { signatureTreatments } from "@/data/wellness/signatureTreatments";
import { wellnessWorkshops } from "@/data/wellness/wellnessWorkshops";
import { packageOffers } from "@/data/wellness/packageOffers";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.6,
};

const WellnessOffersPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const { toast } = useToast();
  
  const categories = ["All", "Signature Treatments", "Holistic Program", "Wellness Workshop", "Wellness Packages"];

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const { data: dbServices, error: dbError } = await supabase
          .from("services")
          .select("*")
          .order("price", { ascending: true });

        if (dbError) throw dbError;
        
        const allLocalServices = [
          ...signatureTreatments.map(s => ({...s, type: 'spa', category: s.category || 'Signature Treatments'})),
          ...holisticPrograms.map(p => ({...p, type: 'holistic', category: p.category || 'Holistic Program'})),
          ...wellnessWorkshops.map(w => ({...w, type: 'workshop', category: w.category || 'Wellness Workshop'})),
          ...packageOffers.map(pkg => ({...pkg, type: 'package', category: pkg.category || 'Wellness Packages'}))
        ];
        
        const combinedServices = [...(dbServices || []), ...allLocalServices];
        
        const uniqueServices = Array.from(new Map(combinedServices.map(service => [service.id || service.title, service])).values());

        setServices(uniqueServices);

      } catch (err) {
        setError(err.message);
        toast({
          title: "Error Fetching Services",
          description: "Could not load wellness offers. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [toast]);

  const handleSelectServiceForModal = (service) => {
    setSelectedServiceModal(service);
    setIsBookingModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsBookingModalOpen(false);
    setSelectedServiceModal(null);
  };

  const filteredServices = activeCategory === "All" 
    ? services 
    : services.filter(service => service.category === activeCategory);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen section-padding">
        <p className="text-destructive text-xl">Error loading wellness offers: {error}</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
      className="bg-gradient-to-br from-background via-primary/10 to-background min-h-screen section-padding"
    >
      <div className="container-custom">
        <WellnessPageHeader 
          title="Discover Annam Wellness Sanctuary"
          description="Embark on a journey of rejuvenation with our exclusive spa treatments, holistic programs, and enriching workshops, all meticulously designed for your ultimate relaxation and renewal."
        />

        <WellnessFilterControls 
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        <WellnessServiceGrid 
          services={filteredServices}
          viewMode={viewMode}
          onSelectService={handleSelectServiceForModal}
          loading={loading}
        />
        
        <WellnessCtaButtons delay={(filteredServices.length || 0) * 0.05 + 0.3} />
      </div>

      <ServiceBookingModal
        open={isBookingModalOpen}
        onOpenChange={setIsBookingModalOpen}
        service={selectedServiceModal}
        onBookingSubmitSuccess={handleCloseModal}
        serviceCategory={selectedServiceModal?.category || "Wellness Services"}
      />
    </motion.div>
  );
};

export default WellnessOffersPage;