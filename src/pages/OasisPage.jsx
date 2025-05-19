import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sun, Wind, Waves } from "lucide-react";

const OasisPage = () => {
  const fadeIn = (delay = 0, duration = 0.5) => ({
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration, ease: "easeOut" },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col"
    >
      <div className="relative flex-grow flex items-center justify-center text-center text-white p-6">
        <img
          src="https://i.postimg.cc/HnqbVYMT/ainh-main-hiinh-2025-05-16-luic-11-1.webp"
          alt="Serene oasis with lush greenery and tranquil waters under a soft light"
          className="absolute inset-0 w-full h-full object-cover -z-10 opacity-70"
        />
        <div className="absolute inset-0 bg-black/50 -z-10"></div>

        <motion.div 
          className="relative z-10 max-w-3xl mx-auto bg-black/30 backdrop-blur-md p-6 md:p-10 rounded-lg shadow-xl border border-white/10"
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: { transition: { staggerChildren: 0.15 } }
          }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-serif mb-6 text-white"
            variants={fadeIn()}
          >
            Your Oasis of Tranquility Awaits
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl mb-8 leading-relaxed text-gray-200"
            variants={fadeIn(0.15)}
          >
            Step into a realm where time slows, and serenity embraces your soul. At Annam Wellness, every detail is crafted to guide you towards inner peace and profound rejuvenation.
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10"
            variants={fadeIn(0.3)}
          >
            {[
              { icon: <Sun className="w-8 h-8 text-yellow-300" />, title: "Sun-Kissed Serenity", desc: "Bask in the gentle warmth and find your light." },
              { icon: <Wind className="w-8 h-8 text-sky-300" />, title: "Whispers of the Breeze", desc: "Let the calming winds carry your worries away." },
              { icon: <Waves className="w-8 h-8 text-teal-300" />, title: "Rhythm of the Tides", desc: "Connect with the soothing pulse of nature." },
            ].map((item, idx) => (
              <motion.div 
                key={item.title} 
                className="flex flex-col items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm shadow-md"
                variants={fadeIn(0.4 + idx * 0.1)}
              >
                {item.icon}
                <h3 className="text-md font-semibold mt-2 mb-1 text-white">{item.title}</h3>
                <p className="text-xs text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeIn(0.7)}>
            <Link to="/rooms">
              <Button size="lg" className="bg-gradient-button text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-103 px-8 py-3 text-base">
                Discover Our Rooms
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OasisPage;