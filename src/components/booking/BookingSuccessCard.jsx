import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { CheckCircle, Home, CalendarDays, Users, BedDouble, Hash, Mail, Phone, Gift, Clock } from "lucide-react";

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

const BookingSuccessCard = ({ bookingData }) => {
  const {
    guest_first_name = "Valued Guest",
    guest_last_name = "",
    guest_email = "N/A",
    guest_phone,
    room_name = "Selected Room",
    check_in_date,
    check_out_date,
    nights = 0,
    num_adults = 1,
    num_children = 0,
    num_rooms = 1,
    total_price = 0,
    special_requests,
    id: bookingId,
  } = bookingData || {};

  const displayBookingId = bookingId ? (typeof bookingId === 'string' ? bookingId.substring(0, 8).toUpperCase() : String(bookingId).substring(0, 8).toUpperCase()) : "N/A";

  if (!bookingData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p>Error: Booking data is not available.</p>
        <Link to="/booking">
          <Button>Try Booking Again</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4 md:p-8 section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-2xl glass-card-professional overflow-hidden">
          <CardHeader className="bg-gradient-to-br from-primary to-secondary p-8 text-center">
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 150 }}>
              <CheckCircle className="w-20 h-20 text-primary-foreground mx-auto mb-4" />
            </motion.div>
            <CardTitle className="text-3xl md:text-4xl font-serif text-primary-foreground">
              Room Booking Confirmed!
            </CardTitle>
            <CardDescription className="text-primary-foreground/90 text-md md:text-lg mt-1">
              Thank you, {guest_first_name}! Your wellness retreat at Annam Wellness Da Nang is booked.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-6">
            <p className="text-center text-muted-foreground text-sm">
              A confirmation email with your booking details has been sent to <strong className="text-heading-foreground">{guest_email}</strong>.
              Please check your inbox (and spam folder, just in case).
            </p>

            <div className="border-t border-b border-border/70 py-6 space-y-4">
              <h4 className="text-xl font-semibold text-secondary-dark text-center mb-3">Your Booking Summary</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div className="flex items-start"><Hash className="w-4 h-4 mr-2.5 mt-0.5 text-primary flex-shrink-0" /><div><span className="font-medium text-muted-foreground">Booking ID:</span> {displayBookingId}</div></div>
                <div className="flex items-start"><BedDouble className="w-4 h-4 mr-2.5 mt-0.5 text-primary flex-shrink-0" /><div><span className="font-medium text-muted-foreground">Room:</span> {room_name || "N/A"}</div></div>
                <div className="flex items-start"><CalendarDays className="w-4 h-4 mr-2.5 mt-0.5 text-primary flex-shrink-0" /><div><span className="font-medium text-muted-foreground">Check-in:</span> {formatDate(check_in_date)}</div></div>
                <div className="flex items-start"><CalendarDays className="w-4 h-4 mr-2.5 mt-0.5 text-primary flex-shrink-0" /><div><span className="font-medium text-muted-foreground">Check-out:</span> {formatDate(check_out_date)}</div></div>
                <div className="flex items-start"><Clock className="w-4 h-4 mr-2.5 mt-0.5 text-primary flex-shrink-0" /><div><span className="font-medium text-muted-foreground">Duration:</span> {nights || 0} night{nights !== 1 ? 's' : ''}</div></div>
                <div className="flex items-start"><Users className="w-4 h-4 mr-2.5 mt-0.5 text-primary flex-shrink-0" /><div><span className="font-medium text-muted-foreground">Guests:</span> {num_adults} Adult{num_adults !== 1 ? 's' : ''}{num_children > 0 ? `, ${num_children} Child${num_children !== 1 ? 'ren' : ''}` : ""}</div></div>
                <div className="flex items-start"><BedDouble className="w-4 h-4 mr-2.5 mt-0.5 text-primary flex-shrink-0" /><div><span className="font-medium text-muted-foreground">Rooms:</span> {num_rooms}</div></div>
                <div className="flex items-start"><Mail className="w-4 h-4 mr-2.5 mt-0.5 text-primary flex-shrink-0" /><div><span className="font-medium text-muted-foreground">Email:</span> {guest_email}</div></div>
                {guest_phone && (<div className="flex items-start"><Phone className="w-4 h-4 mr-2.5 mt-0.5 text-primary flex-shrink-0" /><div><span className="font-medium text-muted-foreground">Phone:</span> {guest_phone}</div></div>)}
                {special_requests && (<div className="flex items-start sm:col-span-2"><Gift className="w-4 h-4 mr-2.5 mt-0.5 text-primary flex-shrink-0" /><div><span className="font-medium text-muted-foreground">Special Requests:</span> {special_requests}</div></div>)}
              </div>
              <div className="text-right text-xl font-bold text-primary pt-3 border-t border-border/50 mt-4">
                Total: {(total_price || 0).toLocaleString('vi-VN')} VND
              </div>
            </div>
            <p className="text-center text-muted-foreground text-sm">
              We are excited to welcome you, {guest_first_name} {guest_last_name}. If you have any questions or need to make changes to your booking, please don't hesitate to contact us.
            </p>
          </CardContent>
          <CardFooter className="p-6 md:p-8 bg-muted/30 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link to="/"><Button className="w-full sm:w-auto bg-gradient-button text-white shadow-md button-glow-effect"><Home className="w-4 h-4 mr-2" /> Back to Homepage</Button></Link>
            <Link to="/wellness-details"><Button variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10">Explore Wellness Offers</Button></Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default BookingSuccessCard;