import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, Send } from "lucide-react";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      setTimeout(() => {
        setIsSubmitted(true);
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for your message. We will get back to you shortly.",
          variant: "default", 
        });
        
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
        
        setIsSubmitting(false);
      }, 1500);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-primary/10 via-secondary/5 to-green-50/30 p-8 rounded-lg shadow-lg text-center flex flex-col items-center justify-center h-full"
      >
        <CheckCircle className="w-16 h-16 text-green-600 mb-5" />
        <h3 className="text-2xl font-serif text-heading-foreground mb-3">Thank You!</h3>
        <p className="text-muted-foreground mb-6 max-w-sm">
          Your message has been sent successfully. We appreciate you contacting us and will be in touch soon.
        </p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline" className="bg-white hover:bg-gray-50">
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-border/50 h-full flex flex-col"
    >
      <h3 className="text-2xl md:text-3xl font-serif text-heading-foreground mb-6">Get in Touch</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4 flex-grow flex flex-col">
        <FormItem>
          <FormLabel htmlFor="name">Full Name</FormLabel>
          <FormControl>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className={`${errors.name ? "border-destructive" : ""} bg-slate-50/70`}
            />
          </FormControl>
          {errors.name && <FormMessage>{errors.name}</FormMessage>}
        </FormItem>
        
        <FormItem>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormControl>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email address"
              className={`${errors.email ? "border-destructive" : ""} bg-slate-50/70`}
            />
          </FormControl>
          {errors.email && <FormMessage>{errors.email}</FormMessage>}
        </FormItem>
        
        <FormItem>
          <FormLabel htmlFor="phone">Phone (Optional)</FormLabel>
          <FormControl>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              className="bg-slate-50/70"
            />
          </FormControl>
        </FormItem>
        
        <FormItem className="flex-grow flex flex-col">
          <FormLabel htmlFor="message">Message</FormLabel>
          <FormControl className="flex-grow">
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              rows={4}
              className={`${errors.message ? "border-destructive" : ""} bg-slate-50/70 flex-grow`}
            />
          </FormControl>
          {errors.message && <FormMessage>{errors.message}</FormMessage>}
        </FormItem>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-button text-white shadow-md hover:shadow-lg mt-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : <>Send Message <Send className="w-4 h-4 ml-2" /></> }
        </Button>
      </form>
    </motion.div>
  );
};

export default ContactForm;