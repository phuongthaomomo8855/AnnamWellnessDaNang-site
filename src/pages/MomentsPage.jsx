import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { momentsPageData } from '@/data/momentsPageData';
import MomentsHeader from '@/components/moments/MomentsHeader';
import MomentsFilterControls from '@/components/moments/MomentsFilterControls';
import MomentsGrid from '@/components/moments/MomentsGrid';
import NoMomentsFound from '@/components/moments/NoMomentsFound';
import MomentsLightbox from '@/components/moments/MomentsLightbox';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.7,
};

const MomentsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [lightboxImage, setLightboxImage] = useState(null);

  const categories = useMemo(() => ["All", ...new Set(momentsPageData.moments.map(moment => moment.category))], []);

  const filteredMoments = useMemo(() => {
    return momentsPageData.moments
      .filter(moment => {
        const categoryMatch = selectedCategory === "All" || moment.category === selectedCategory;
        const searchTermMatch = moment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                moment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                moment.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        return categoryMatch && searchTermMatch;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [selectedCategory, searchTerm]);

  const openLightbox = (imageSrc) => {
    setLightboxImage(imageSrc);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSearchTerm("");
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
      className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background"
    >
      <MomentsHeader heroData={momentsPageData.hero} />

      <section className="py-12 md:py-16">
        <div className="container-custom mx-auto">
          <MomentsFilterControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />

          {filteredMoments.length > 0 ? (
            <MomentsGrid moments={filteredMoments} onMomentClick={openLightbox} />
          ) : (
            <NoMomentsFound onClearFilters={handleClearFilters} />
          )}
        </div>
      </section>

      <MomentsLightbox imageUrl={lightboxImage} onClose={closeLightbox} cta={momentsPageData.cta} />
    </motion.div>
  );
};

export default MomentsPage;