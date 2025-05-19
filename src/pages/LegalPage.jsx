import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, Cookie } from "lucide-react";
import { useLocation } from "react-router-dom";

const LegalPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const offset = 100; 
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  }, [location]);

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut", delay },
  });

  const legalSections = [
    {
      id: "terms",
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Terms & Conditions",
      content: [
        "Welcome to Annam Wellness Da Nang. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions.",
        "All content on this site, including text, graphics, logos, images, and software, is the property of Annam Wellness Da Nang or its content suppliers and protected by international copyright laws.",
        "Bookings are subject to availability and confirmation. Payment must be made in full at the time of booking or as specified. Cancellation policies apply and will be detailed during the booking process.",
        "We strive to provide accurate information, but we do not warrant that product descriptions or other content is error-free. We reserve the right to correct any errors and to change or update information at any time without prior notice.",
        "Annam Wellness Da Nang will not be liable for any damages of any kind arising from the use of this site or from any services provided, including, but not limited to direct, indirect, incidental, punitive, and consequential damages.",
        "These terms and conditions are governed by and construed in accordance with the laws of Vietnam. Any disputes will be subject to the exclusive jurisdiction of the courts of Da Nang, Vietnam."
      ],
    },
    {
      id: "privacy",
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Privacy Policy",
      content: [
        "Annam Wellness Da Nang is committed to protecting your privacy. This policy outlines how we collect, use, disclose, and safeguard your information when you visit our website or use our services.",
        "We may collect personal information such as your name, email address, phone number, payment information, and booking details when you make a reservation or interact with our site.",
        "Your information is used to process bookings, provide customer service, send promotional materials (if opted-in), improve our services, and comply with legal obligations.",
        "We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.",
        "We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information without your consent, except to trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.",
        "You have the right to access, correct, or delete your personal information. Please contact us to make such requests. We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page."
      ],
    },
    {
      id: "cookies",
      icon: <Cookie className="w-8 h-8 text-primary" />,
      title: "Cookie Policy",
      content: [
        "Our website uses cookies to enhance your browsing experience and to enable certain functionalities. A cookie is a small text file that a website saves on your computer or mobile device when you visit the site.",
        "We use cookies to understand and save your preferences for future visits, keep track of advertisements, and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.",
        "Types of cookies we use: Session cookies (temporary and deleted when you close your browser), Persistent cookies (remain on your device for a set period or until you delete them), First-party cookies (set by our website), Third-party cookies (set by external services like analytics or advertising partners).",
        "You can choose to disable cookies through your individual browser options. However, disabling cookies may affect the functionality of this and many other websites that you visit.",
        "By continuing to use our site, you consent to our use of cookies in accordance with this policy. We may update this Cookie Policy from time to time. Any changes will be posted on this page."
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gradient-to-b from-background via-slate-50 to-secondary/10 min-h-screen section-padding"
    >
      <div className="container-custom">
        <motion.h1 
          className="text-4xl md:text-5xl font-serif text-heading-foreground text-center mb-12"
          variants={fadeIn()}
        >
          Legal Information
        </motion.h1>

        <div className="space-y-16">
          {legalSections.map((section, index) => (
            <motion.section 
              key={section.id} 
              id={section.id} 
              className="glass-card-professional p-6 md:p-8"
              variants={fadeIn(0.2 + index * 0.1)}
            >
              <div className="flex items-center mb-6">
                {section.icon}
                <h2 className="text-2xl md:text-3xl font-serif text-secondary-dark ml-4">{section.title}</h2>
              </div>
              <div className="space-y-4 text-paragraph-foreground text-sm md:text-base leading-relaxed">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LegalPage;