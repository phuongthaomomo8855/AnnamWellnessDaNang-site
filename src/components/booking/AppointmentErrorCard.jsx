import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const AppointmentErrorCard = ({ errorDetails, originalBookingAttempt }) => {
  const retryLink = originalBookingAttempt?.service?.category === "Extra Services" ? "/extra-services" : "/wellness-details";
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-destructive/10 via-background to-destructive/5 p-6 text-center section-padding">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        <Card className="shadow-2xl glass-card-professional border-destructive/50">
          <CardHeader className="items-center bg-destructive/10 p-8">
            <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
            <CardTitle className="text-3xl font-serif text-destructive">Service Request Failed</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-muted-foreground mb-6">
              We encountered an error while processing your service request. Please try again.
            </p>
            <p className="text-xs text-destructive/80 bg-destructive/5 p-3 rounded-md mb-6">
              Error details: {typeof errorDetails === 'string' ? errorDetails : JSON.stringify(errorDetails)}
            </p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center p-6 bg-muted/30">
            <Link to={retryLink} state={originalBookingAttempt ? { serviceToBook: originalBookingAttempt.service, guestDetails: originalBookingAttempt.guestDetails } : {}}>
              <Button className="w-full sm:w-auto bg-gradient-button text-white">Try Requesting Again</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="w-full">Contact Support</Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AppointmentErrorCard;