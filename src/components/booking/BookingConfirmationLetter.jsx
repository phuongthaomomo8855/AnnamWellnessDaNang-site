import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Mail, Phone, CalendarDays, Users, BedDouble, Hash, Home, Gift, Clock, MapPin, Sun, Moon, Sparkles, CheckCircle, CreditCard } from 'lucide-react';

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

const BookingConfirmationLetter = ({ bookingDetails, roomDetails }) => {
  const {
    guest_first_name = "Valued Guest",
    guest_last_name = "",
    guest_email = "N/A",
    guest_phone,
    check_in_date,
    check_out_date,
    num_adults = 1,
    num_children = 0,
    num_rooms = 1,
    total_price = 0,
    special_requests,
    id: bookingId,
    payment_method,
    payment_timing,
    guest_address,
    guest_city,
    guest_country,
    guest_zip_code,
  } = bookingDetails || {};

  const { name: room_name = "Your Selected Room", images } = roomDetails || {};
  const roomImage = images && images.length > 0 ? images[0] : "https://i.postimg.cc/Fs7Gf0b2/placeholder-room.webp";

  const displayBookingId = bookingId ? (typeof bookingId === 'string' ? bookingId.substring(0, 8).toUpperCase() : String(bookingId).substring(0, 8).toUpperCase()) : "N/A";
  
  const nights = check_in_date && check_out_date ? Math.ceil((new Date(check_out_date) - new Date(check_in_date)) / (1000 * 60 * 60 * 24)) : 0;

  if (!bookingDetails || !roomDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-100 to-stone-200">
        <Card className="w-full max-w-md p-8 text-center shadow-lg">
          <h2 className="text-2xl font-semibold text-destructive mb-4">Booking Confirmation Error</h2>
          <p className="text-muted-foreground mb-6">We're sorry, but there was an issue retrieving your booking details. Please contact us for assistance.</p>
          <Link to="/"><Button>Return to Homepage</Button></Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-rose-50 to-teal-50 p-4 md:p-8 selection:bg-primary selection:text-primary-foreground">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
        className="w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden relative print-styles"
        style={{ fontFamily: "'Garamond', 'Times New Roman', serif" }}
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent"></div>
        <img 
          alt="Annam Wellness Resort decorative letterhead element"
          className="absolute top-6 right-6 w-20 h-20 opacity-30 print-hide"
         src="https://images.unsplash.com/photo-1685970521831-cab2ec541bdf" />
        
        <CardHeader className="p-8 md:p-12 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-dark tracking-tight">
                Annam Wellness <span className="font-light">Đà Nẵng</span>
              </h1>
              <p className="text-sm text-gray-500">Your Sanctuary of Serenity</p>
            </div>
            <div className="text-xs text-gray-500 mt-4 sm:mt-0 sm:text-right">
              <p>Booking ID: <span className="font-semibold text-gray-700">{displayBookingId}</span></p>
              <p>Date: {formatDate(new Date().toISOString())}</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Your Reservation is Confirmed!
            </h2>
          </div>
        </CardHeader>

        <CardContent className="p-8 md:p-12 text-gray-700 leading-relaxed text-sm">
          <p className="mb-6 text-base">
            Dear <span className="font-semibold text-primary-dark">{guest_first_name} {guest_last_name}</span>,
          </p>
          <p className="mb-4">
            A heartfelt thank you for choosing Annam Wellness Đà Nẵng for your upcoming escape! We are absolutely delighted to confirm your reservation and eagerly await the opportunity to welcome you to our haven of tranquility and rejuvenation.
          </p>
          <p className="mb-6">
            Your journey towards holistic wellbeing is about to begin. Below are the details of your confirmed booking:
          </p>

          <div className="my-8 p-6 bg-primary/5 border border-primary/20 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-primary-dark mb-4 text-center">Booking Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              <div className="flex items-start"><BedDouble className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" /><div><strong className="text-gray-600">Accommodation:</strong> {room_name}</div></div>
              <div className="flex items-start"><Users className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" /><div><strong className="text-gray-600">Guests:</strong> {num_adults} Adult{num_adults !== 1 ? 's' : ''}{num_children > 0 ? `, ${num_children} Child${num_children !== 1 ? 'ren' : ''}` : ""}</div></div>
              <div className="flex items-start"><Sun className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" /><div><strong className="text-gray-600">Check-in:</strong> {formatDate(check_in_date)} (from 3:00 PM)</div></div>
              <div className="flex items-start"><Moon className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" /><div><strong className="text-gray-600">Check-out:</strong> {formatDate(check_out_date)} (by 12:00 PM)</div></div>
              <div className="flex items-start"><Clock className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" /><div><strong className="text-gray-600">Duration:</strong> {nights} night{nights !== 1 ? 's' : ''}</div></div>
              <div className="flex items-start"><Hash className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" /><div><strong className="text-gray-600">Number of Rooms:</strong> {num_rooms}</div></div>
            </div>
            {special_requests && (
              <div className="mt-4 pt-3 border-t border-primary/10 flex items-start">
                <Gift className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                <div><strong className="text-gray-600">Special Requests:</strong> {special_requests}</div>
              </div>
            )}
          </div>
          
          <div className="my-8 p-6 bg-secondary/5 border border-secondary/20 rounded-lg shadow-sm">
             <h3 className="text-xl font-semibold text-secondary-dark mb-4 text-center">Contact & Payment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex items-start"><Mail className="w-5 h-5 mr-3 mt-0.5 text-secondary flex-shrink-0" /><div><strong className="text-gray-600">Email:</strong> {guest_email}</div></div>
                {guest_phone && (<div className="flex items-start"><Phone className="w-5 h-5 mr-3 mt-0.5 text-secondary flex-shrink-0" /><div><strong className="text-gray-600">Phone:</strong> {guest_phone}</div></div>)}
                {guest_address && guest_city && guest_country && (
                    <div className="md:col-span-2 flex items-start"><MapPin className="w-5 h-5 mr-3 mt-0.5 text-secondary flex-shrink-0" /><div><strong className="text-gray-600">Address:</strong> {`${guest_address}, ${guest_city}, ${guest_zip_code ? guest_zip_code + ', ' : ''}${guest_country}`}</div></div>
                )}
                 <div className="md:col-span-2 flex items-start"><CreditCard className="w-5 h-5 mr-3 mt-0.5 text-secondary flex-shrink-0" />
                    <div>
                        <strong className="text-gray-600">Payment Method:</strong> {payment_method || "Not Specified"}
                        {payment_timing && (payment_method !== "bank_transfer" && payment_method !== "cash_at_hotel") && 
                            <span className="text-xs text-gray-500"> ({payment_timing === "pay_online" ? "Online (Coming Soon)" : "At Hotel"})</span>
                        }
                    </div>
                </div>
            </div>
             <div className="text-right text-2xl font-bold text-gray-800 pt-4 border-t border-secondary/10 mt-6">
                Total Amount: {(total_price || 0).toLocaleString('vi-VN')} VND
              </div>
          </div>


          <p className="mb-4">
            A confirmation email has also been sent to <strong className="text-primary-dark">{guest_email}</strong>. Please keep it for your records. Should you have any questions or require any assistance prior to your arrival, do not hesitate to contact us.
          </p>
          <p className="mb-6">
            We are preparing to offer you an unforgettable experience filled with peace, rejuvenation, and authentic Vietnamese hospitality.
          </p>
          <p className="font-semibold text-gray-800">Warmest regards,</p>
          <p className="text-primary-dark text-lg mt-1">The Annam Wellness Đà Nẵng Team</p>
        </CardContent>

        <CardFooter className="p-8 md:p-12 bg-gray-50 border-t border-gray-200 print-hide">
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full">
            <Link to="/"><Button className="w-full sm:w-auto bg-gradient-button text-white shadow-md button-glow-effect"><Home className="w-4 h-4 mr-2" /> Back to Homepage</Button></Link>
            <Link to="/wellness-details"><Button variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10">Explore More Wellness</Button></Link>
            <Button variant="outline" onClick={() => window.print()} className="w-full sm:w-auto">Print Confirmation</Button>
          </div>
        </CardFooter>
        <style jsx global>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-styles, .print-styles * {
              visibility: visible;
            }
            .print-styles {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              margin: 0;
              padding: 0;
              box-shadow: none !important;
              border: none !important;
            }
            .print-hide {
              display: none !important;
            }
          }
        `}</style>
      </motion.div>
    </div>
  );
};

export default BookingConfirmationLetter;