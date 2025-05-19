import React from "react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import FeaturedRooms from "@/components/FeaturedRooms";
// WellnessServices is for the /wellness-offers and /wellness-details pages.
// The home page uses specific sections like HomeExploreSection or AboutSection for similar content.
// import WellnessServices from "@/components/WellnessServices"; 
// import CulturalExperiencesHomeSection from "@/components/CulturalExperiences"; // Removed as per request
import Testimonials from "@/components/Testimonials";
// import BookingCta from "@/components/BookingCta"; // Likely replaced by HomeBookingCta
import AboutSection from "@/components/AboutSection";
import HomeAmenitiesSection from "@/components/home/HomeAmenitiesSection";
import HomeCommitmentSection from "@/components/home/HomeCommitmentSection";
import HomeExploreSection from "@/components/home/HomeExploreSection";
import HomeMomentsSection from "@/components/home/HomeMomentsSection";
import HomeTeamSection from "@/components/home/HomeTeamSection";
import HomeContactSection from "@/components/home/HomeContactSection";
import HomeOasisSection from "@/components/home/HomeOasisSection";
import HomeBookingCta from "@/components/home/HomeBookingCta";


const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.8,
};

const Home = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="bg-background text-foreground"
    >
      <Hero />
      <AboutSection /> 
      <HomeCommitmentSection />
      <FeaturedRooms />
      <HomeAmenitiesSection /> 
      <HomeExploreSection /> 
      <HomeOasisSection />
      {/* CulturalExperiencesHomeSection removed */}
      <Testimonials />
      <HomeMomentsSection />
      <div className="py-4 md:py-6">
        <HomeTeamSection />
      </div>
      <HomeContactSection />
      <HomeBookingCta />
    </motion.div>
  );
};

export default Home;