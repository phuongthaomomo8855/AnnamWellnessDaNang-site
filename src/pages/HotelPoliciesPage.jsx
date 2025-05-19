import React from "react";
import { motion } from "framer-motion";
import { Clock, Ban, BedDouble, Coins, Smartphone, FileText, ShieldCheck } from "lucide-react";

const HotelPoliciesPage = () => {
  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut", delay },
  });

  const generalPolicies = [
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Check-in & Check-out",
      points: [
        "Check-in from 14:00 PM.",
        "Check-out by 12:00 PM.",
        "Early check-in or late check-out may be available upon request, subject to availability and potential fees. Please contact us in advance for arrangements."
      ],
    },
    {
      icon: <Ban className="w-6 h-6 text-primary" />,
      title: "No Smoking & Pet Policy",
      points: [
        "Annam Wellness is a smoke-free property. Smoking is not permitted in rooms or any indoor public areas.",
        "Designated smoking areas are available outdoors. Please ask our staff for directions.",
        "Pets are not allowed, with the exception of certified service animals. Please notify us in advance if you will be accompanied by a service animal."
      ],
    },
    {
      icon: <BedDouble className="w-6 h-6 text-primary" />,
      title: "Extra Bed & Connecting Rooms",
      points: [
        "Rollaway beds or baby cots can be provided upon request for an additional fee, subject to availability.",
        "Connecting rooms are available for families or groups. Please request at the time of booking to ensure availability.",
        "Contact our reservations team for specific room configurations or family needs."
      ],
    },
    {
      icon: <Coins className="w-6 h-6 text-primary" />,
      title: "Compensation for Damages",
      points: [
        "Guests are responsible for any damage or loss caused to hotel property, whether by intentional act, negligence, or accident.",
        "Charges for damages will be assessed based on the cost of repair or replacement, according to hotel management's evaluation."
      ],
    },
  ];

  const mobileIntegrationPolicy = {
    title: "Mobile App & Online Services",
    description: "Enhance your stay with the Annam Wellness mobile app. Access resort information, book spa treatments, order in-room dining, and connect with our concierge services seamlessly from your device. Our app is designed to provide convenience and personalized experiences throughout your wellness journey.",
    image: "https://i.postimg.cc/tTYFPVSj/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_00.41.52.png"
  };

  const cancellationPolicy = {
    title: "Room Cancellation Policy",
    description: "We offer free cancellation for bookings made up to 72 hours (3 days) prior to your scheduled arrival date. For cancellations made within 72 hours of arrival, or in the event of a no-show, a charge equivalent to the first night's stay will apply. Please note that specific promotional rates, packages, or peak season bookings may have different cancellation policies; always refer to the terms stated on your booking confirmation."
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gradient-to-b from-background via-slate-50 to-secondary/5 min-h-screen section-padding"
    >
      <div className="container-custom">
        <motion.h1 
          className="text-4xl md:text-5xl font-serif text-heading-foreground text-center mb-12"
          variants={fadeIn()}
        >
          Hotel Policies
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {generalPolicies.map((policy, index) => (
            <motion.div 
              key={policy.title}
              className="glass-card-professional p-6 rounded-lg shadow-lg border border-border/30 bg-card"
              variants={fadeIn(0.2 + index * 0.1)}
            >
              <div className="flex items-center mb-4">
                {policy.icon}
                <h2 className="text-xl font-serif text-secondary-dark ml-3">{policy.title}</h2>
              </div>
              <ul className="space-y-2 text-sm text-paragraph-foreground list-disc list-inside pl-2">
                {policy.points.map((point, pIndex) => (
                  <li key={pIndex}>{point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mobileIntegrationPolicy && (
            <motion.div 
              className="glass-card-professional p-6 rounded-lg shadow-lg border border-border/30 bg-card"
              variants={fadeIn(0.6)}
            >
              <div className="flex items-center mb-4">
                <Smartphone className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-serif text-secondary-dark ml-3">{mobileIntegrationPolicy.title}</h2>
              </div>
              <p className="text-sm text-paragraph-foreground mb-4">
                {mobileIntegrationPolicy.description}
              </p>
              {mobileIntegrationPolicy.image && (
                <img  
                  className="w-full max-w-xs mx-auto rounded-lg shadow-md object-contain mt-4"
                  alt="Annam Wellness mobile app interface"
                 src={mobileIntegrationPolicy.image} />
              )}
            </motion.div>
          )}

          {cancellationPolicy && (
            <motion.div 
              className="glass-card-professional p-6 rounded-lg shadow-lg border border-border/30 bg-card"
              variants={fadeIn(0.7)}
            >
              <div className="flex items-center mb-4">
               <ShieldCheck className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-serif text-secondary-dark ml-3">{cancellationPolicy.title}</h2>
              </div>
              <p className="text-sm text-paragraph-foreground mb-4">
               {cancellationPolicy.description}
              </p>
            </motion.div>
          )}
        </div>

      </div>
    </motion.div>
  );
};

export default HotelPoliciesPage;