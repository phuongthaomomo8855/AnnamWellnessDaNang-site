import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Leaf, HeartHandshake, Brain, Users, Award, Smile, Zap, Sun, Landmark } from "lucide-react";

const AboutSection = () => {
  const fadeInProps = (delay = 0, y = 20) => ({
    initial: { opacity: 0, y: y },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: "easeOut", delay },
    viewport: { once: true, amount: 0.15 }
  });

  return (
    <section id="about-section" className="section-padding">
      <div className="container-custom">
        <motion.div {...fadeInProps(0)} className="text-center mb-16 md:mb-20">
          <Sun className="w-12 h-12 text-primary mx-auto mb-4 opacity-80" />
          <h2 className="text-secondary-dark mb-4">A Sanctuary for Holistic Wellbeing</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            At Annam Wellness Da Nang, we believe true wellbeing arises from a harmonious balance of mind, body, and spirit. Our sanctuary is dedicated to guiding you on a transformative journey towards profound rejuvenation and inner peace, deeply rooted in Vietnamese traditions and enhanced by contemporary wellness wisdom.
          </p>
          <div className="decorative-line mt-8"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-20 md:mb-28">
          <motion.div {...fadeInProps(0.1)} className="relative aspect-[4/3.5] rounded-2xl overflow-hidden shadow-2xl group">
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ease-in-out"
              alt="Serene spa treatment room at Annam Wellness Da Nang with natural light and tranquil ambiance"
              src="https://i.postimg.cc/907xfFMB/generated-m6-LZev9-DOZU17r-Xj.webp"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/5"></div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness:100 }}
              viewport={{ once: true }}
              className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-32 h-32 md:w-40 md:h-40 p-1.5 bg-card/80 backdrop-blur-sm rounded-lg shadow-xl border border-border/50"
            >
              <img
                className="w-full h-full object-cover rounded-md"
                alt="Close-up of natural herbal ingredients used in spa treatments"
                src="https://i.postimg.cc/T3qn3X3X/ainh-main-hiinh-2025-05-16-luic-11.webp"
              />
            </motion.div>
          </motion.div>
          
          <motion.div {...fadeInProps(0.2)} className="space-y-6">
            <h3 className="text-3xl font-serif text-primary-dark">Our Philosophy: The Art of Living Well</h3>
            <p className="text-muted-foreground text-md leading-relaxed">
              Inspired by the ancient Annamite wisdom that views health as a holistic tapestry, we weave together time-honored Vietnamese healing practices with innovative wellness approaches. Our goal is not merely to pamper, but to empower you with tools and experiences that foster lasting vitality and serenity long after you depart.
            </p>
            <ul className="space-y-3.5 text-muted-foreground">
              {[
                { icon: Leaf, title: "Nature's Embrace", text: "Sourcing local, organic ingredients and harnessing the healing power of our pristine natural surroundings." },
                { icon: HeartHandshake, title: "Personalized Journeys", text: "Crafting bespoke wellness programs tailored to your unique needs, aspirations, and health goals." },
                { icon: Brain, title: "Mindful Living", text: "Cultivating presence and peace through guided meditation, yoga, and mindful movement practices." },
                { icon: Zap, title: "Innovative Therapies", text: "Integrating modern science with ancient wisdom for effective and transformative results." }
              ].map((item, idx) => (
                <motion.li key={idx} {...fadeInProps(0.25 + idx * 0.05, 10)} className="flex items-start">
                  <item.icon className="w-5 h-5 mr-3 mt-1 text-primary flex-shrink-0" />
                  <span><strong className="text-heading-foreground">{item.title}:</strong> {item.text}</span>
                </motion.li>
              ))}
            </ul>
            
          </motion.div>
        </div>

        <motion.div {...fadeInProps(0.3)} className="text-center mb-16 md:mb-20">
          <h3 className="text-3xl font-serif text-primary-dark mb-4">Why Choose Annam Wellness?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer more than just a luxurious stay; we provide a pathway to profound transformation, where every detail is curated for your ultimate wellbeing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {[
            { icon: Users, title: "Expert Practitioners", description: "Our team of therapists, wellness experts, and hospitality professionals are highly skilled and deeply compassionate, dedicated to your care." },
            { icon: Award, title: "Authentic Experiences", description: "Immerse yourself in genuine Vietnamese culture, traditional healing arts, and locally inspired wellness journeys." },
            { icon: Smile, title: "Lasting Results", description: "Gain insights, tools, and practices to integrate wellbeing into your daily life, fostering vitality long after your stay." }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              {...fadeInProps(0.4 + index * 0.1)}
              className="p-6 md:p-8 bg-card/90 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-border/50 flex flex-col items-center text-center hover-lift"
            >
              <div className="p-4 bg-primary/10 rounded-full mb-5 inline-block ring-2 ring-primary/20">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-secondary-dark mb-2.5">{item.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;