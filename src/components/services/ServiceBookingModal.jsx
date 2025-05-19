import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/lib/supabaseClient';
import { CheckCircle, AlertCircle, Calendar as CalendarIcon, Clock, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addDays } from 'date-fns';

const parsePrice = (priceString) => {
  if (typeof priceString === 'number') return priceString;
  if (typeof priceString !== 'string') return null;
  
  const cleanedString = priceString.replace(/[^0-9.]/g, '');
  const number = parseFloat(cleanedString);
  
  if (isNaN(number)) return null;
  return number;
};

const ServiceBookingModal = ({ service, open, onOpenChange, roomId = null, initialGuestDetails, onBookingSubmitSuccess, serviceCategory, selectedVehicle }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null); 
  const { toast } = useToast();
  const navigate = useNavigate();

  const resetFormAndStatus = (useInitialDetails = true) => {
    setName(useInitialDetails && initialGuestDetails?.name ? initialGuestDetails.name : '');
    setEmail(useInitialDetails && initialGuestDetails?.email ? initialGuestDetails.email : '');
    setPhone(useInitialDetails && initialGuestDetails?.phone ? initialGuestDetails.phone : '');
    setSelectedDate(null);
    setSelectedTime('');
    setNotes('');
    setBookingStatus(null); 
    setIsLoading(false);
  };
  
  useEffect(() => {
    if (open) {
      // Only reset if not already showing success/error to allow user to see the message
      if (bookingStatus !== 'error' && bookingStatus !== 'success') {
        resetFormAndStatus(true); 
      }
    } else {
      // When dialog is explicitly closed (open becomes false), fully reset.
      resetFormAndStatus(false);
    }
  }, [open, initialGuestDetails]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setBookingStatus(null); // Reset status before new submission

    if (!service || (!service.id && !service.title && !service.name)) {
        toast({ title: "Error", description: "Invalid service information.", variant: "destructive" });
        setIsLoading(false);
        return;
    }
    if (!selectedDate || !selectedTime) {
        toast({ title: "Missing Information", description: "Please select a date and time.", variant: "destructive" });
        setIsLoading(false);
        return;
    }

    const appointmentDateTime = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(':');
    appointmentDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

    let serviceName = service.title || service.name;
    if (service.id === 'airport-shuttle' && selectedVehicle) {
      serviceName = `${serviceName} - ${selectedVehicle.name}`;
    }
    
    let rawPrice = service.price;
    if (service.id === 'airport-shuttle' && selectedVehicle) {
        rawPrice = selectedVehicle.price;
    }
    const numericPrice = parsePrice(rawPrice);

    const bookingData = {
      service_id: service.id && typeof service.id === 'string' && service.id.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/) ? service.id : null,
      service_name: serviceName,
      service_price: numericPrice !== null ? String(numericPrice) : (rawPrice || "Not specified"), 
      guest_name: name,
      guest_email: email,
      guest_phone: phone || null,
      appointment_datetime: appointmentDateTime.toISOString(),
      notes: `${notes}${roomId ? ` (For room: ${roomId})` : ''}${serviceCategory ? ` (Category: ${serviceCategory})` : ''}`,
      status: 'pending_confirmation',
    };
    
    try {
      const { data, error } = await supabase.from('appointments').insert([bookingData]).select().single();

      if (error) {
        console.error("Supabase error details:", error);
        throw error;
      }
      
      setBookingStatus('success');
      if (onBookingSubmitSuccess) {
        onBookingSubmitSuccess(data); // Callback for parent component if needed
      }
      
    } catch (error) {
      console.error("Error submitting booking:", error);
      setBookingStatus('error');
      toast({
        title: "Service Booking Error",
        description: error.message || "An error occurred. Please try again. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDialogExplicitClose = () => {
    onOpenChange(false); 
    // The useEffect listening to `open` will handle the full reset.
  };

  const handleTryAgain = () => {
    setBookingStatus(null); 
    // Form fields remain for quick retry
  };

  // This function is now only for closing the modal after success/error message.
  const handleCloseMessageAndModal = () => {
    onOpenChange(false); // This will trigger the useEffect to reset everything
  };


  if (!service && !open) return null; 
  if (!service && open) { 
      return (
        <Dialog open={open} onOpenChange={handleDialogExplicitClose}>
            <DialogContent>
                <DialogHeader><DialogTitle>Error</DialogTitle></DialogHeader>
                <DialogDescription>Service information is missing. Please close and try again.</DialogDescription>
                <DialogFooter><Button onClick={handleDialogExplicitClose}>Close</Button></DialogFooter>
            </DialogContent>
        </Dialog>
      );
  }
  
  const availableTimes = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

  let displayPrice = service?.price;
  if (service?.id === 'airport-shuttle' && selectedVehicle) {
    displayPrice = selectedVehicle.price;
  }
  const numericDisplayPrice = parsePrice(displayPrice);


  return (
    <Dialog open={open} onOpenChange={(isOpenDialog) => {
      if (!isOpenDialog) {
        onOpenChange(false); // Let useEffect handle reset
      } else {
        onOpenChange(true); 
      }
    }}>
      <DialogContent className="sm:max-w-[525px] p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">Service Request: {service?.title || service?.name}{selectedVehicle ? ` - ${selectedVehicle.name}` : ''}</DialogTitle>
          <DialogDescription>
            Please fill in the information below. We will contact you to confirm.
            {numericDisplayPrice !== null 
              ? <span className="block mt-1 text-sm font-medium text-primary">Price: {numericDisplayPrice.toLocaleString('vi-VN')} VND</span>
              : displayPrice && <span className="block mt-1 text-sm font-medium text-primary">Price: {displayPrice}</span>
            }
          </DialogDescription>
        </DialogHeader>
        
        {bookingStatus === 'success' ? (
          <div className="p-6 flex flex-col items-center text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Request Sent!</h3>
            <p className="text-muted-foreground mb-4">Thank you for requesting the service: {service?.title || service?.name}{selectedVehicle ? ` - ${selectedVehicle.name}` : ''}. We will contact you for confirmation shortly.</p>
            <Button onClick={handleCloseMessageAndModal}>Close</Button>
          </div>
        ) : bookingStatus === 'error' ? (
            <div className="p-6 flex flex-col items-center text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Request Failed</h3>
                <p className="text-muted-foreground mb-4">An error occurred while sending your request. Please try again or contact us directly.</p>
                <Button onClick={handleTryAgain} variant="outline" className="mr-2">Try Again</Button>
                <Button onClick={handleCloseMessageAndModal}>Close</Button>
            </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <Label htmlFor="sbm-name" className="text-sm">Full Name <span className="text-destructive">*</span></Label>
                <Input id="sbm-name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter your full name"/>
              </div>
              <div>
                <Label htmlFor="sbm-email" className="text-sm">Email <span className="text-destructive">*</span></Label>
                <Input id="sbm-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email address"/>
              </div>
              <div>
                <Label htmlFor="sbm-phone" className="text-sm">Phone Number</Label>
                <Input id="sbm-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number (optional)"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sbm-date" className="text-sm">Date <span className="text-destructive">*</span></Label>
                  <DatePicker 
                    id="sbm-date"
                    selected={selectedDate} 
                    onSelect={setSelectedDate} 
                    buttonClassName="w-full" 
                    icon={<CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />}
                    placeholderText="Select date"
                    modal={true}
                    fromDate={addDays(new Date(), 1)} 
                  />
                </div>
                <div>
                  <Label htmlFor="sbm-time" className="text-sm">Time <span className="text-destructive">*</span></Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime} >
                    <SelectTrigger id="sbm-time" className="w-full">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimes.map(time => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="sbm-notes" className="text-sm">Notes (optional)</Label>
                <Textarea id="sbm-notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Your special requests, e.g., allergies, preferences..." />
              </div>
            </div>
            <DialogFooter className="p-6 pt-4 border-t">
              <Button type="button" variant="outline" onClick={handleDialogExplicitClose} disabled={isLoading}>Cancel</Button>
              <Button type="submit" disabled={isLoading || !name || !email || !selectedDate || !selectedTime}>
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : 'Submit Request'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ServiceBookingModal;