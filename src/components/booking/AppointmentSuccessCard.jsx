import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { CheckCircle, Home, CalendarDays, Clock, Mail, Phone, Gift, ShoppingCart, Hash } from "lucide-react";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch (e) {
    return "Invalid Date";
  }
};

const formatTime = (dateTimeString) => {
  if (!dateTimeString) return "N/A";
  try {
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) return "Invalid Time";
    return date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true });
  } catch (e) {
    return "Invalid Time";
  }
};

const AppointmentSuccessCard = ({ appointmentData }) => {
  const {
    guest_name = "Valued Guest",
    guest_email = "N/A",
    guest_phone,
    service_name = "Selected Service",
    appointment_datetime,
    notes,
    id: appointmentId,
  } = appointmentData;

  const displayAppointmentId = appointmentId ? (typeof appointmentId === 'string' ? appointmentId.substring(0, 8).toUpperCase() : String(appointmentId).substring(0, 8).toUpperCase()) : "N/A";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-secondary/10 via-background to-primary/10 p-4 md:p-8 section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-2xl glass-card-professional overflow-hidden">
          <CardHeader className="bg-gradient-to-br from-secondary to-primary p-8 text-center">
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 150 }}>
              <CheckCircle className="w-20 h-20 text-primary-foreground mx-auto mb-4" />
            </motion.div>
            <CardTitle className="text-3xl md:text-4xl font-serif text-primary-foreground">
              Service Request Received!
            </CardTitle>
            <CardDescription className="text-primary-foreground/90 text-md md:text-lg mt-1">
              Thank you, {guest_name}! We've received your request for {service_name}.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-6">
            <p className="text-center text-muted-foreground text-sm">
              We will contact you shortly via <strong className="text-heading-foreground">{guest_email}</strong> to confirm the details and availability.
            </p>

            <div className="border-t border-b border-border/70 py-6 space-y-4">
              <h4 className="text-xl font-semibold text-primary-dark text-center mb-3">Your Request Summary</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div className="flex items-start"><Hash className="w-4 h-4 mr-2.5 mt-0.5 text-secondary flex-shrink-0" /><div><span className="font-medium text-muted-foreground">Request ID:</span> {displayAppointmentId}</div></div>
                <div className="flex items-start"><ShoppingCart className="w-4 h-4 mr-2.5 mt-0.5 text-secondary flex-shrink-0" /><div><span className="font-medium text-muted-foreground">Service:</span> {service_name}</div></div>
                <div className="flex items-start"><CalendarDays className="w-4 h-4 mr-2.5 mt-0.5 text-secondary flex-shrink-0" /><div><span className="font-medium text-muted-foreground">Preferred Date:</span> {formatDate(appointment_datetime)}</div></div>
                <div className="flex items-start"><Clock className="w-4 h-4 mr-2.5 mt-0.5 text-secondary flex-shrink-0" /><div><span className="font-medium text-muted-foreground">Preferred Time:</span> {formatTime(appointment_datetime)}</div></div>
                <div className="flex items-start"><Mail className="w-4 h-4 mr-2.5 mt-0.5 text-secondary flex-shrink-0" /><div><span className="font-medium text-muted-foreground">Email:</span> {guest_email}</div></div>
                {guest_phone && (<div className="flex items-start"><Phone className="w-4 h-4 mr-2.5 mt-0.5 text-secondary flex-shrink-0" /><div><span className="font-medium text-muted-foreground">Phone:</span> {guest_phone}</div></div>)}
                {notes && (<div className="flex items-start sm:col-span-2"><Gift className="w-4 h-4 mr-2.5 mt-0.5 text-secondary flex-shrink-0" /><div><span className="font-medium text-muted-foreground">Notes:</span> {notes}</div></div>)}
              </div>
            </div>
            <p className="text-center text-muted-foreground text-sm">
              If you have any urgent questions, please feel free to contact us directly.
            </p>
          </CardContent>
          <CardFooter className="p-6 md:p-8 bg-muted/30 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link to="/"><Button className="w-full sm:w-auto bg-gradient-button text-white shadow-md button-glow-effect"><Home className="w-4 h-4 mr-2" /> Back to Homepage</Button></Link>
            <Link to="/wellness-details"><Button variant="outline" className="w-full sm:w-auto border-secondary text-secondary hover:bg-secondary/10">Explore More Services</Button></Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AppointmentSuccessCard;