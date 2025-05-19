import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Zap, Smile, Sunrise, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

const RejuvenatePage = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.8,
  };

  const features = [
    {
      icon: <Leaf className="w-12 h-12 text-green-500" />,
      title: "Nature-Inspired Therapies",
      description: "Harness the healing power of nature with our organic treatments and therapies set amidst lush landscapes.",
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-500" />,
      title: "Energy Renewal Programs",
      description: "Recharge your vital energy through specialized yoga, meditation, and energy healing sessions.",
    },
    {
      icon: <Smile className="w-12 h-12 text-pink-500" />,
      title: "Emotional Balance Workshops",
      description: "Find inner peace and emotional clarity with guided workshops and mindfulness practices.",
    },
    {
      icon: <Sunrise className="w-12 h-12 text-orange-500" />,
      title: "Mindful Mornings",
      description: "Start your day with intention through sunrise yoga, guided meditations, and nourishing breakfasts.",
    },
    {
      icon: <Moon className="w-12 h-12 text-indigo-500" />,
      title: "Restorative Evenings",
      description: "Unwind with calming evening rituals, sound baths, and therapies designed for deep relaxation.",
    },
  ];

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gradient-to-br from-green-100 via-teal-50 to-emerald-100"
    >
      <header className="relative h-[60vh] min-h-[400px]">
        <img
          src="https://i.postimg.cc/NMLf0g7G/rejuvenate-hero.jpg"
          alt="Rejuvenate your body, mind & soul at Annam Wellness"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative container-custom mx-auto h-full flex flex-col justify-center items-center text-center text-white z-10">
          <motion.h1 
            className="text-5xl md:text-7xl font-serif mb-6 text-shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            Rejuvenate Your Body, Mind & Soul
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl text-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          >
            Embark on a transformative journey at Annam Wellness. Our retreats are meticulously crafted to restore balance, invigorate your senses, and nurture your inner peace.
          </motion.p>
        </div>
      </header>

      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif text-primary-dark mb-4">Discover Our Signature Retreats</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each retreat is a unique pathway to holistic wellbeing, guided by expert practitioners and inspired by ancient wisdom.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-green-200/50 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="mb-6 p-4 bg-green-100 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-primary-dark mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Link
              to="/wellness-menu"
              className="inline-block bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-lg transform hover:scale-105"
            >
              Explore Full Wellness Menu
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default RejuvenatePage;