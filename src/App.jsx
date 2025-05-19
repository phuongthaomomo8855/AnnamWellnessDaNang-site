import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import RoomsPage from "@/pages/RoomsPage"; 
import RoomDetailsPage from "@/pages/RoomDetailsPage";
import BookingPage from "@/pages/BookingPage";
import BookingConfirmationPage from "@/pages/BookingConfirmationPage";
import WellnessOffersPage from "@/pages/WellnessOffersPage";
import WellnessServiceDetailsPage from "@/pages/WellnessServiceDetailsPage";
import ExtraServicesPage from "@/pages/ExtraServicesPage";
import CulturalExperiencesPage from "@/pages/CulturalExperiencesPage";
import LegalPage from "@/pages/LegalPage";
import HotelPoliciesPage from "@/pages/HotelPoliciesPage";
import AmenitiesPage from "@/pages/AmenitiesPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import MembershipPage from "@/pages/MembershipPage";
import LoyaltyPage from "@/pages/LoyaltyPage";
import FaqPage from "@/pages/FaqPage";
import MomentsPage from "@/pages/MomentsPage"; 
import RejuvenatePage from "@/pages/RejuvenatePage";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";


const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // Navbar height
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        
        setTimeout(() => { 
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }, 100); // Delay to ensure page layout is stable
      }
    }
  }, [pathname, hash]);

  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
     <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/rooms/:roomId" element={<RoomDetailsPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking/confirmation" element={<BookingConfirmationPage />} />
        <Route path="/wellness-offers" element={<WellnessOffersPage />} />
        <Route path="/wellness-details" element={<WellnessServiceDetailsPage />} /> 
        <Route path="/extra-services" element={<ExtraServicesPage />} />
        <Route path="/cultural-experiences" element={<CulturalExperiencesPage />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/hotel-policies" element={<HotelPoliciesPage />} />
        <Route path="/amenities" element={<AmenitiesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/loyalty" element={<LoyaltyPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/moments" element={<MomentsPage />} />
        
        <Route path="/wellness" element={<WellnessOffersPage />} /> 
        <Route path="/about" element={<Home />} /> 
        <Route path="/rejuvenate-your-body-mind-soul" element={<RejuvenatePage />} />


        <Route path="/offers" element={<Home />} /> 
        <Route path="/terms" element={<LegalPage />} /> 
        <Route path="/privacy" element={<LegalPage />} /> 
        <Route path="/cookies" element={<LegalPage />} />
        <Route path="/wellness-menu" element={<WellnessServiceDetailsPage />} />
        <Route path="/cultural-journey" element={<CulturalExperiencesPage />} />
        
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

const SimulatedChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Xin chào! Chào mừng bạn đến với Annam Wellness Da Nang." },
    { id: 2, sender: "bot", text: "Tôi có thể giúp gì cho bạn hôm nay? Bạn có thể hỏi về đặt phòng, dịch vụ spa, hoặc các trải nghiệm văn hóa." },
    { id: 3, sender: "bot", text: "(Lưu ý: Tôi là một chatbot mô phỏng. Để được hỗ trợ chi tiết, vui lòng liên hệ trực tiếp.)" }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    const newUserMessage = { id: Date.now(), sender: "user", text: inputValue };
    const botReply = { id: Date.now() + 1, sender: "bot", text: "Cảm ơn câu hỏi của bạn! Hiện tại, tôi chưa thể xử lý yêu cầu này. Vui lòng liên hệ bộ phận hỗ trợ để được giúp đỡ chi tiết hơn." };
    setMessages(prev => [...prev, newUserMessage, botReply]);
    setInputValue("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 bg-primary hover:bg-primary-dark text-primary-foreground p-3.5 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 z-50"
        aria-label="Open Chatbot"
      >
        <MessageSquare size={22} />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] p-0 flex flex-col h-[70vh] max-h-[500px]">
          <DialogHeader className="p-4 border-b">
            <DialogTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-primary" /> Annam Wellness Assistant
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="flex-grow p-4 space-y-3">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] p-2.5 rounded-lg text-sm
                    ${msg.sender === "user" 
                      ? "bg-primary text-primary-foreground rounded-br-none" 
                      : "bg-muted text-foreground rounded-bl-none"
                    }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </ScrollArea>
          
          <DialogFooter className="p-3 border-t">
            <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
              <Input 
                type="text" 
                placeholder="Nhập tin nhắn..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" variant="default">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};


const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="flex-grow pt-[60px] md:pt-[72px]"> 
          <AnimatedRoutes />
        </div>
        <Footer />
        <Toaster />
        <SimulatedChatbot />
      </div>
    </Router>
  );
};

export default App;