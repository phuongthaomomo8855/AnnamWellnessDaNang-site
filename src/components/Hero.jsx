import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, CalendarDays, BedDouble, Search, Sparkles, ChevronDown } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

const isValidImageUrl = (url) => {
  return url && typeof url === 'string' && (
    url.startsWith('https://i.postimg.cc') || 
    url.startsWith('http://') || 
    url.startsWith('https://') 
  );
};
const placeholderImage = "https://i.postimg.cc/Fs7Gf0b2/placeholder-room.webp";


const heroImages = [
  "https://i.postimg.cc/zfSKwppK/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_11.08.07.png",
  "https://i.postimg.cc/TwPDYj6x/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_10.16.17.png",
  "https://i.postimg.cc/8cgBSz4g/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_01.04.09.png"
].map(url => isValidImageUrl(url) ? url : placeholderImage);


const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numAdults, setNumAdults] = useState("1");
  const [numChildren, setNumChildren] = useState("0");
  const [numRooms, setNumRooms] = useState("1");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (heroImages.length > 1) {
      const timer = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
      }, 3000); 
      return () => clearInterval(timer);
    }
  }, []);

  const handleAvailabilitySearch = (e) => {
    e.preventDefault();
    if (!checkInDate || !checkOutDate) {
      toast({
        title: "Missing Dates",
        description: "Please select both check-in and check-out dates.",
        variant: "destructive",
      });
      return;
    }
    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      toast({
        title: "Invalid Dates",
        description: "Check-out date must be after check-in date.",
        variant: "destructive",
      });
      return;
    }
    
    navigate("/rooms", { 
      state: { 
        checkInDate: checkInDate.toISOString(), 
        checkOutDate: checkOutDate.toISOString(), 
        numAdults: parseInt(numAdults), 
        numChildren: parseInt(numChildren),
        numRooms: parseInt(numRooms)
      } 
    });
  };
  
  const titleTextClass = "text-5xl md:text-6xl lg:text-7xl font-bold text-white";
  const datePickerBaseClasses = "bg-stone-700 text-white placeholder-gray-300 border-stone-500 focus:ring-amber-500 focus:border-amber-500 w-full";
  const datePickerButtonBaseClasses = "hover:bg-black hover:text-white transition-colors duration-200";


  return (
    <section className="relative h-[calc(100vh-72px)] min-h-[700px] md:min-h-[750px] text-white overflow-hidden">
      {heroImages.map((src, index) => (
        <motion.div
          key={src || `hero-img-${index}`}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ 
            opacity: index === currentImageIndex ? 1 : 0,
            scale: index === currentImageIndex ? 1 : 1.05,
          }}
          transition={{ duration: 1.5, ease: [0.42, 0, 0.58, 1] }}
        >
          <img 
            src={isValidImageUrl(src) ? src : placeholderImage}
            alt={`Annam Wellness Da Nang Hero Image ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-12 pb-20 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-8 md:mb-10"
        >
          <h1 className="font-serif mb-4 text-shadow-strong">
            <span className={`${titleTextClass} block leading-tight`}>Annam Wellness</span>
            <span className={`${titleTextClass} block leading-tight`}>Da Nang</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto text-gray-200 text-shadow-soft">
            Discover serenity and rejuvenation at your exclusive sanctuary in the heart of Vietnam.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleAvailabilitySearch}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="w-full max-w-4xl p-4 md:p-6 bg-black/20 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-white flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-amber-300" />
              Plan Your Serene Escape
            </h2>
            <Link to="/rooms" className="text-xs text-amber-300 hover:text-amber-200 transition-colors hidden md:block">
              View All Rooms <ChevronDown className="inline w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 items-end">
            <div className="lg:col-span-1">
              <Label htmlFor="hero-checkin" className="text-xs font-medium text-gray-200 mb-1 block text-left">Check-in Date</Label>
              <DatePicker 
                id="hero-checkin"
                selected={checkInDate} 
                onSelect={setCheckInDate}
                placeholderText="Arrival Date"
                icon={<CalendarDays className="w-4 h-4 text-gray-300" />}
                className={datePickerBaseClasses}
                buttonClassName={datePickerButtonBaseClasses}
              />
            </div>
            <div className="lg:col-span-1">
              <Label htmlFor="hero-checkout" className="text-xs font-medium text-gray-200 mb-1 block text-left">Check-out Date</Label>
              <DatePicker 
                id="hero-checkout"
                selected={checkOutDate} 
                onSelect={setCheckOutDate}
                placeholderText="Departure Date"
                icon={<CalendarDays className="w-4 h-4 text-gray-300" />}
                className={datePickerBaseClasses}
                buttonClassName={datePickerButtonBaseClasses}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-2 md:gap-3 lg:col-span-1">
              <div>
                <Label htmlFor="hero-adults" className="text-xs font-medium text-gray-200 mb-1 block text-left">Adults</Label>
                <Select value={numAdults} onValueChange={setNumAdults}>
                  <SelectTrigger id="hero-adults" className={`w-full text-xs py-2 h-auto ${datePickerBaseClasses} ${datePickerButtonBaseClasses}`}>
                    <Users className="w-3 h-3 mr-1 text-gray-300 group-hover:text-white" />
                    <SelectValue placeholder="Adults" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(8)].map((_, i) => (
                      <SelectItem key={i + 1} value={String(i + 1)} className="text-xs">{i + 1}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="hero-children" className="text-xs font-medium text-gray-200 mb-1 block text-left">Children</Label>
                <Select value={numChildren} onValueChange={setNumChildren}>
                  <SelectTrigger id="hero-children" className={`w-full text-xs py-2 h-auto ${datePickerBaseClasses} ${datePickerButtonBaseClasses}`}>
                    <Users className="w-3 h-3 mr-1 text-gray-300 group-hover:text-white" />
                    <SelectValue placeholder="Children" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(5)].map((_, i) => (
                      <SelectItem key={i} value={String(i)} className="text-xs">{i}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                 <Label htmlFor="hero-rooms" className="text-xs font-medium text-gray-200 mb-1 block text-left">Rooms</Label>
                <Select value={numRooms} onValueChange={setNumRooms}>
                  <SelectTrigger id="hero-rooms" className={`w-full text-xs py-2 h-auto ${datePickerBaseClasses} ${datePickerButtonBaseClasses}`}>
                    <BedDouble className="w-3 h-3 mr-1 text-gray-300 group-hover:text-white" />
                    <SelectValue placeholder="Rooms" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(4)].map((_, i) => (
                      <SelectItem key={i + 1} value={String(i + 1)} className="text-xs">{i + 1}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full mt-4 md:mt-5 bg-gradient-button text-white button-glow-effect text-base py-3">
            <Search className="w-5 h-5 mr-2" /> Check Availability
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default Hero;