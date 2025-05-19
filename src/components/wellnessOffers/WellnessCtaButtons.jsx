import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Sparkles, CalendarPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WellnessCtaButtons = ({ delay = 0.3 }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y:20 }}
      animate={{ opacity: 1, y:0 }}
      transition={{ delay: delay, duration: 0.6}}
      className="mt-12 md:mt-16 text-center space-y-4"
    >
        <p className="text-muted-foreground">
            Ready to plan your complete wellness escape? Explore our detailed service menu.
        </p>
        <Button 
          onClick={() => navigate("/wellness-menu")} 
          size="lg" 
          className="bg-gradient-button text-white button-glow-effect text-base px-8 py-3"
        >
          <Sparkles className="w-5 h-5 mr-2" /> View Full Wellness Menu
        </Button>
          <p className="text-muted-foreground">
            Or, secure your stay and add services later.
        </p>
        <Button 
          onClick={() => navigate("/booking")} 
          size="lg" 
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10 text-base px-8 py-3"
        >
          <CalendarPlus className="w-5 h-5 mr-2" /> Book Your Stay
        </Button>
    </motion.div>
  );
};

export default WellnessCtaButtons;