import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from '@/data/faqData';
import { HelpCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const FaqPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredFaqs = faqData.filter(faqItem => 
    faqItem.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faqItem.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };
  
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      variants={pageVariants} 
      initial="initial" 
      animate="animate" 
      className="min-h-screen bg-gradient-to-b from-background via-slate-50 to-primary/5 py-12 md:py-20"
    >
      <motion.header 
        variants={headerVariants}
        className="text-center mb-10 md:mb-16 container-custom"
      >
        <HelpCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-serif text-heading-foreground mb-3">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Find answers to common questions about Annam Wellness Da Nang, our services, and policies.
        </p>
        <div className="decorative-line mt-6"></div>
      </motion.header>

      <div className="container-custom max-w-3xl mx-auto">
        <div className="relative mb-8">
          <Input 
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 bg-card border-border/70 focus:border-primary shadow-sm"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        </div>

        {filteredFaqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full space-y-3">
            {filteredFaqs.map((faqItem, index) => (
              <motion.div key={index} variants={itemVariants} initial="hidden" animate="visible" custom={index}>
                <AccordionItem value={`item-${index}`} className="bg-card border border-border/60 rounded-lg shadow-md overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 text-left hover:bg-accent/50 transition-colors text-base font-medium text-heading-foreground">
                    {faqItem.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 pt-1 text-muted-foreground leading-relaxed text-sm">
                    <div dangerouslySetInnerHTML={{ __html: faqItem.answer }} />
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-12 bg-card rounded-lg shadow-md border border-border/60">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-heading-foreground">No FAQs Found</h3>
            <p className="text-muted-foreground mt-2">
              Your search for "{searchTerm}" did not match any FAQs. Please try a different term or contact us for assistance.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FaqPage;