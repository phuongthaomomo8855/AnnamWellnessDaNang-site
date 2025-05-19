import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TestimonialCard from "./TestimonialCard";

const TestimonialSlider = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsRef = useRef(null);

  if (!testimonials || testimonials.length === 0) {
    return <p className="text-center text-muted-foreground">No testimonials available at the moment.</p>;
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative" ref={testimonialsRef}>
      <AnimatePresence mode="wait">
        <TestimonialCard testimonial={testimonials[currentIndex]} />
      </AnimatePresence>

      {testimonials.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 rounded-full shadow-md bg-background/80 hover:bg-background z-10"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 rounded-full shadow-md bg-background/80 hover:bg-background z-10"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}
    </div>
  );
};

export default TestimonialSlider;