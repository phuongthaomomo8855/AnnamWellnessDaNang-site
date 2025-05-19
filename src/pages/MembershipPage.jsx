import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { BadgeCheck, Crown, Star, Award, Gem, Sparkles } from 'lucide-react';
import { Link } from "react-router-dom";

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
};

const slideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
});

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 50 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const membershipTiers = [
  {
    icon: <Star className="w-10 h-10 text-yellow-500" />,
    name: "Silver Serenity",
    price: "1,500,000 VND/year",
    description: "Begin your journey to tranquility with essential wellness benefits and exclusive access.",
    features: [
      "10% off all spa treatments",
      "Priority booking for yoga classes",
      "Access to members-only lounge",
      "Monthly wellness newsletter",
      "Welcome wellness gift basket"
    ],
    cta: "Join Silver Serenity",
    color: "bg-gradient-to-br from-slate-400 to-slate-600",
    textColor: "text-slate-800",
    badgeColor: "bg-slate-500 text-white",
  },
  {
    icon: <Gem className="w-10 h-10 text-sky-500" />,
    name: "Golden Harmony",
    price: "4,000,000 VND/year",
    description: "Elevate your wellbeing with enhanced privileges and deeper restorative experiences.",
    features: [
      "15% off all spa treatments & retail products",
      "Complimentary monthly 60-min massage",
      "Unlimited access to all group wellness classes",
      "Access to private meditation garden",
      "Personalized wellness consultation (quarterly)",
      "Guest pass for a friend (2 per year)"
    ],
    cta: "Upgrade to Golden Harmony",
    color: "bg-gradient-to-br from-yellow-400 to-amber-600",
    textColor: "text-amber-800",
    badgeColor: "bg-amber-500 text-white",
    highlight: true,
  },
  {
    icon: <Crown className="w-10 h-10 text-purple-500" />,
    name: "Diamond Bliss",
    price: "10,000,000 VND/year",
    description: "The ultimate wellness immersion, offering unparalleled luxury and personalized care.",
    features: [
      "25% off all spa treatments & retail products",
      "Two complimentary 90-min signature treatments per month",
      "Unlimited access to all facilities including private pool",
      "Dedicated wellness concierge",
      "Invitations to exclusive member events & retreats",
      "Complimentary healthy snacks & drinks in lounge",
      "Partner benefits at select local businesses"
    ],
    cta: "Embrace Diamond Bliss",
    color: "bg-gradient-to-br from-purple-400 to-indigo-600",
    textColor: "text-indigo-800",
    badgeColor: "bg-indigo-500 text-white",
  },
];


const MembershipPage = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
      className="bg-gradient-to-b from-background via-amber-50 to-rose-50 min-h-screen"
    >
      <header className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            className="w-full h-full object-cover opacity-20"
            alt="Abstract serene background with subtle wellness motifs"
           src="https://images.unsplash.com/photo-1653604021351-a6a89b9c44b9" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        <div className="container-custom relative text-center">
          <motion.div {...slideUp()}>
            <BadgeCheck className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-serif text-heading-foreground mb-4">
              Annam Wellness Membership
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Unlock a world of exclusive benefits, personalized wellness journeys, and deeper connections with our community.
            </p>
          </motion.div>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div {...slideUp(0.2)} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-primary-dark mb-3">Choose Your Path to Wellbeing</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We offer a range of membership tiers designed to fit your lifestyle and wellness aspirations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {membershipTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 50, scale:0.95 }}
                whileInView={{ opacity: 1, y: 0, scale:1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                className={`flex flex-col rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${tier.highlight ? 'border-4 border-primary ring-4 ring-primary/30' : 'border border-border/30'}`}
              >
                <CardHeader className={`p-6 text-center ${tier.color}`}>
                  <div className="mb-3 mx-auto w-fit p-3 bg-white/20 rounded-full shadow-md">
                    {React.cloneElement(tier.icon, { className: `w-10 h-10 text-white` })}
                  </div>
                  <CardTitle className={`text-2xl font-serif ${tier.textColor.replace('text-', 'text-white')}`}>{tier.name}</CardTitle>
                  <CardDescription className={`text-sm ${tier.textColor.replace('text-', 'text-white/80')}`}>{tier.price}</CardDescription>
                </CardHeader>
                <CardContent className="p-6 flex-grow bg-card">
                  <p className="text-muted-foreground mb-4 text-sm">{tier.description}</p>
                  <ul className="space-y-2 text-sm">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Sparkles className="w-4 h-4 mr-2 mt-0.5 text-secondary flex-shrink-0" />
                        <span className="text-paragraph-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-6 bg-card border-t border-border/30">
                  <Button size="lg" className={`w-full ${tier.badgeColor} hover:opacity-90 text-white transition-opacity`}>
                    {tier.cta}
                  </Button>
                </CardFooter>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-custom text-center">
          <motion.div {...fadeIn}>
            <Award className="w-16 h-16 text-secondary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-serif text-heading-foreground mb-4">Ready to Elevate Your Wellbeing?</h2>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-8">
              Join the Annam Wellness family today and embark on a transformative journey.
            </p>
            <Link to="/#contact">
                <Button size="lg" className="bg-gradient-button text-white text-lg px-8 py-3">
                Contact Us For Membership
                </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default MembershipPage;