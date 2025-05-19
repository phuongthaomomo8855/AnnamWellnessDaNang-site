import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Send, Loader2, ShoppingCart } from 'lucide-react';

import BookingProgressTracker from '@/components/booking/BookingProgressTracker';
import BookingSummaryCard from '@/components/booking/BookingSummaryCard';
import BookingFormRenderer from '@/components/booking/formSteps/BookingFormRenderer';
import BookingErrorCard from '@/components/booking/BookingErrorCard';
import BookingCartSheet from '@/components/booking/BookingCartSheet';

import { getRoomBySlug } from '@/data/roomDetailsStaticData';
import { calculateTotalPrice, validateBookingStep } from '@/lib/bookingUtils';

const steps = [
  { id: 'details', name: 'Booking Details', form: 'Step1BookingDetailsForm' },
  { id: 'guestInfo', name: 'Guest Information', form: 'Step2GuestInfoForm' },
  { id: 'payment', name: 'Payment & Requests', form: 'Step3PaymentRequestsForm' },
];

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    selectedRoomSlug: '',
    checkInDate: null,
    checkOutDate: null,
    numAdults: 1,
    numChildren: 0,
    numRooms: 1,
    guestFirstName: '',
    guestLastName: '',
    guestEmail: '',
    guestPhone: '',
    guestCountry: '',
    guestAddress: '',
    guestCity: '',
    guestZipCode: '',
    specialRequests: '',
    paymentMethod: '',
    paymentTiming: 'pay_at_hotel',
    totalPrice: 0,
    agreeToTerms: false,
  });

  const [roomsData, setRoomsData] = useState([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoadingRooms(true);
      try {
        const { data: fetchedRooms, error: roomsError } = await supabase
          .from('rooms')
          .select('id, name, slug, price_per_night, capacity, images');
        if (roomsError) throw roomsError;
        
        const enrichedRooms = fetchedRooms.map(room => {
          const staticDetails = getRoomBySlug(room.slug);
          let price = room.price_per_night;
          if (staticDetails?.displayPriceVND) {
            price = parseFloat(staticDetails.displayPriceVND.replace(/[^0-9.-]+/g,""));
          } else if (staticDetails?.basePrice) {
            price = staticDetails.basePrice * 24000; // Assuming USD to VND
          }

          return { 
            ...room, 
            capacityDetails: staticDetails?.capacity || `${room.capacity} Adults`,
            maxGuests: parseInt(String(room.capacity || staticDetails?.capacity || '1').match(/\d+/)?.[0] || '1', 10),
            price_per_night: price,
            images: staticDetails?.images || room.images || [],
          };
        });
        setRoomsData(enrichedRooms);

        if (location.state?.roomSlug) {
          setBookingData(prev => ({ ...prev, selectedRoomSlug: location.state.roomSlug }));
        } else if (enrichedRooms.length > 0 && !bookingData.selectedRoomSlug) {
          setBookingData(prev => ({ ...prev, selectedRoomSlug: enrichedRooms[0].slug }));
        }
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError("Failed to load room information. Please try again later.");
        toast({ variant: "destructive", title: "Error", description: "Could not load room data." });
      } finally {
        setIsLoadingRooms(false);
      }
    };
    fetchRooms();
  }, [location.state, toast, bookingData.selectedRoomSlug]);

  const selectedRoomDetails = useMemo(() => {
    if (!bookingData.selectedRoomSlug || roomsData.length === 0) {
        // Attempt to get from static data if Supabase data is not ready or slug not found
        const staticRoom = getRoomBySlug(bookingData.selectedRoomSlug);
        if (staticRoom) {
            let price = 0;
            if (staticRoom.displayPriceVND) {
                price = parseFloat(staticRoom.displayPriceVND.replace(/[^0-9.-]+/g,""));
            } else if (staticRoom.basePrice) {
                price = staticRoom.basePrice * 24000; // Assuming USD to VND
            }
            return {
                ...staticRoom,
                price_per_night: price,
                capacityDetails: staticRoom.capacity,
                maxGuests: parseInt(String(staticRoom.capacity).match(/\d+/)?.[0] || '1', 10),
            };
        }
        return null;
    }
    const room = roomsData.find(r => r.slug === bookingData.selectedRoomSlug);
    if (!room) {
        const staticRoom = getRoomBySlug(bookingData.selectedRoomSlug);
         if (staticRoom) {
            let price = 0;
            if (staticRoom.displayPriceVND) {
                price = parseFloat(staticRoom.displayPriceVND.replace(/[^0-9.-]+/g,""));
            } else if (staticRoom.basePrice) {
                price = staticRoom.basePrice * 24000; // Assuming USD to VND
            }
            return {
                ...staticRoom,
                price_per_night: price,
                capacityDetails: staticRoom.capacity,
                maxGuests: parseInt(String(staticRoom.capacity).match(/\d+/)?.[0] || '1', 10),
            };
        }
        return null;
    }
    return room;
  }, [bookingData.selectedRoomSlug, roomsData]);

  const updateBookingData = useCallback((field, value) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  }, []);

  useEffect(() => {
    if (selectedRoomDetails && bookingData.checkInDate && bookingData.checkOutDate) {
      const price = calculateTotalPrice(
        bookingData.checkInDate,
        bookingData.checkOutDate,
        selectedRoomDetails.price_per_night,
        bookingData.numRooms
      );
      updateBookingData('totalPrice', price);
    } else {
      updateBookingData('totalPrice', 0);
    }
  }, [
    bookingData.checkInDate,
    bookingData.checkOutDate,
    bookingData.numRooms,
    selectedRoomDetails,
    updateBookingData,
  ]);


  const handleNextStep = () => {
    const { isValid, message } = validateBookingStep(currentStep, bookingData, selectedRoomDetails);
    if (!isValid) {
      toast({ variant: "destructive", title: "Validation Error", description: message });
      return;
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmitBooking = async () => {
    const { isValid, message } = validateBookingStep(currentStep, bookingData, selectedRoomDetails, true);
     if (!isValid) {
      toast({ variant: "destructive", title: "Validation Error", description: message });
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const dbRoom = roomsData.find(r => r.slug === bookingData.selectedRoomSlug);
      const bookingPayload = {
        room_id: dbRoom?.id, 
        check_in_date: bookingData.checkInDate?.toISOString().split('T')[0],
        check_out_date: bookingData.checkOutDate?.toISOString().split('T')[0],
        num_adults: parseInt(bookingData.numAdults, 10),
        num_children: parseInt(bookingData.numChildren, 10) || 0,
        num_rooms: parseInt(bookingData.numRooms, 10),
        total_price: bookingData.totalPrice,
        guest_first_name: bookingData.guestFirstName,
        guest_last_name: bookingData.guestLastName,
        guest_email: bookingData.guestEmail,
        guest_phone: bookingData.guestPhone,
        guest_country: bookingData.guestCountry,
        guest_address: bookingData.guestAddress,
        guest_city: bookingData.guestCity,
        guest_zip_code: bookingData.guestZipCode,
        special_requests: bookingData.specialRequests,
        payment_method: bookingData.paymentMethod,
        payment_status: (bookingData.paymentMethod === 'bank_transfer' || bookingData.paymentTiming === 'pay_online') ? 'pending' : 'paid_at_hotel',
        booking_status: 'confirmed', 
      };
      
      const { data: insertedBooking, error: insertError } = await supabase
        .from('bookings')
        .insert([bookingPayload])
        .select()
        .single();

      if (insertError) throw insertError;

      toast({ title: "Booking Successful!", description: "Your reservation has been confirmed." });
      navigate('/booking/confirmation', { 
        state: { 
          bookingDetails: { ...insertedBooking, ...bookingData, room_name: selectedRoomDetails?.name }, 
          roomDetails: selectedRoomDetails 
        } 
      });

    } catch (err) {
      console.error("Error submitting booking:", err);
      setError(`Failed to submit booking: ${err.message}. Please try again or contact support.`);
      toast({ variant: "destructive", title: "Booking Failed", description: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingRooms && !error && roomsData.length === 0) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error && roomsData.length === 0 && !location.state?.roomSlug) { // Only show full page error if no specific room pre-selected
    return (
      <div className="container-custom py-12 md:py-20">
        <BookingErrorCard title="Error Loading Booking Page" message={error} />
      </div>
    );
  }
  
  const currentFormName = steps[currentStep].form;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-stone-50 to-secondary/10 selection:bg-primary selection:text-primary-foreground">
      <div className="container-custom py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-center mb-2 text-primary-dark tracking-tight">
            Secure Your Stay at Annam Wellness
          </h1>
          <p className="text-center text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto">
            Complete the steps below to finalize your booking. We're excited to welcome you!
          </p>
        </motion.div>

        <BookingProgressTracker currentStep={currentStep + 1} />


        <div className="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="lg:col-span-2 bg-card p-6 sm:p-8 rounded-xl shadow-xl border border-border/20"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFormName}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-6 text-foreground">
                  {steps[currentStep].name}
                </h2>
                <BookingFormRenderer
                  stepName={currentFormName}
                  data={bookingData}
                  setData={updateBookingData}
                  roomsData={roomsData}
                />
              </motion.div>
            </AnimatePresence>

            {currentStep === steps.length - 1 && (
              <div className="mt-6 p-4 border border-primary/30 rounded-md bg-primary/5">
                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    id="agreeToTerms"
                    checked={bookingData.agreeToTerms}
                    onChange={(e) => updateBookingData('agreeToTerms', e.target.checked)}
                    className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm text-foreground/80">
                    I have read and agree to the Annam Wellness Đà Nẵng <a href="/hotel-policies#terms-conditions" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Terms and Conditions</a> and <a href="/hotel-policies#privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Privacy Policy</a>.
                  </Label>
                </div>
              </div>
            )}

            {error && currentStep === steps.length -1 && (
              <p className="mt-4 text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</p>
            )}

            <div className="mt-8 flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                disabled={currentStep === 0 || isSubmitting}
                className="border-primary text-primary hover:bg-primary/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Previous
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button onClick={handleNextStep} disabled={isSubmitting} className="bg-gradient-button text-white button-glow-effect">
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmitBooking} 
                  disabled={isSubmitting || !bookingData.agreeToTerms}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white button-glow-effect px-8"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Complete Payment
                </Button>
              )}
            </div>
          </motion.div>

          <div className="lg:col-span-1 sticky top-24">
             <BookingSummaryCard
              bookingData={bookingData}
              roomDetails={selectedRoomDetails}
              isLoading={isLoadingRooms && !selectedRoomDetails}
            />
             <Button 
              variant="outline" 
              className="w-full mt-4 lg:hidden border-primary text-primary hover:bg-primary/10"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-4 h-4 mr-2" /> View Summary
            </Button>
          </div>
        </div>
      </div>
      <BookingCartSheet 
        isOpen={isCartOpen} 
        onOpenChange={setIsCartOpen}
        bookingData={bookingData}
        roomDetails={selectedRoomDetails}
        isLoading={isLoadingRooms && !selectedRoomDetails}
      />
    </div>
  );
};

export default BookingPage;