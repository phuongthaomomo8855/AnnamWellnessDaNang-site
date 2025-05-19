import React from 'react';
import { Link } from 'react-router-dom';
import RoomSection from "@/components/roomDetails/RoomSection";
import { Button } from "@/components/ui/button";
import { ArrowRight as ArrowRightIcon } from 'lucide-react';

const RoomExtraServicesSection = ({ services }) => {
  if (!services || services.length === 0) return null;

  return (
    <RoomSection 
      title="Enhance Your Stay: Our Extra Services" 
      titleClassName="text-3xl font-serif text-primary-dark mb-4 text-center md:text-left"
    >
      <p className="text-paragraph-foreground mb-6 text-center md:text-left leading-relaxed">
        Elevate your experience with our curated selection of additional services. From bespoke room decorations for special occasions to convenient airport transfers and exquisite private dining, we are dedicated to making your stay truly unforgettable.
      </p>
      <div className="text-center md:text-left">
        <Link to="/extra-services">
          <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary-dark text-base px-6 py-3">
            Explore All Extra Services <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </RoomSection>
  );
};

export default RoomExtraServicesSection;