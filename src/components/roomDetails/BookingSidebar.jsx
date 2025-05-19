import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, Users, DollarSign, BedDouble, Minus, Plus, Info, MapPin } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

const BookingSidebar = ({ room }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [numRooms, setNumRooms] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [numberOfNights, setNumberOfNights] = useState(0);

  const roomCapacity = useMemo(() => {
    if (room?.capacity && typeof room.capacity === 'string') {
      const parts = room.capacity.split(',');
      const adultsMatch = parts[0]?.match(/(\d+)\s*Adults?/i);
      let adults = adultsMatch ? parseInt(adultsMatch[1], 10) : 1;
      
      const childrenMatch = parts.find(p => p.toLowerCase().includes('child'))?.match(/(\d+)\s*Child(?:ren)?/i);
      let children = childrenMatch ? parseInt(childrenMatch[1], 10) : 0;
      
      let total = adults + children;

      const orPatternMatch = room.capacity.match(/or\s*(\d+)\s*Adults?,\s*(\d+)\s*Child(?:ren)?/i);
      if (orPatternMatch) {
          const altAdults = parseInt(orPatternMatch[1], 10);
          const altChildren = parseInt(orPatternMatch[2], 10);
          total = Math.max(total, altAdults + altChildren);
          if (total === altAdults + altChildren) {
            adults = altAdults;
            children = altChildren;
          }
      }
      
      if (room?.slug === 'deluxe-room') {
        return { adults: 2, children: 2, total: 4 }; // Max 4 guests for Deluxe Room (e.g., 2 adults, 2 children or 3 adults, 1 child etc.)
      }

      return { adults, children, total };
    }
    return { adults: 1, children: 0, total: 1 }; // Default if no capacity string
  }, [room?.capacity, room?.slug]);

  const pricePerNight = useMemo(() => {
    if(room?.price_per_night) return parseFloat(room.price_per_night);
    if(room?.displayPriceVND) return parseFloat(String(room.displayPriceVND).replace(/[^0-9.-]+/g,""));
    if(room?.basePrice) return parseFloat(room.basePrice) * 24000; // Assuming basePrice is USD
    return 0;
  }, [room?.price_per_night, room?.displayPriceVND, room?.basePrice]);


  useEffect(() => {
    if (checkInDate && checkOutDate && pricePerNight) {
      const nights = Math.max(0, Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)));
      setNumberOfNights(nights);
      const calculatedPrice = nights * pricePerNight * numRooms;
      setTotalPrice(calculatedPrice);
    } else {
      setNumberOfNights(0);
      setTotalPrice(0);
    }
  }, [checkInDate, checkOutDate, numRooms, pricePerNight]);

  const handleGuestChange = (type, operation) => {
    let currentAdults = numAdults;
    let currentChildren = numChildren;
    const maxGuestsPerRoom = roomCapacity.total;
    const totalGuestsInRoom = currentAdults + currentChildren;

    if (operation === 'increment') {
      if (type === 'numAdults') {
        if (room?.slug === 'deluxe-room') {
          if (totalGuestsInRoom < maxGuestsPerRoom) {
            currentAdults = Math.min(maxGuestsPerRoom, currentAdults + 1);
          } else {
             toast({ title: "Capacity Reached", description: `Deluxe Room allows a maximum of ${maxGuestsPerRoom} guests.`, variant: "warning", duration: 4000 });
          }
        } else { // For other rooms (no specific limit from user, so allow up to a reasonable number like 10)
          currentAdults = Math.min(10, currentAdults + 1);
        }
      } else if (type === 'numChildren') {
         if (room?.slug === 'deluxe-room') {
          if (totalGuestsInRoom < maxGuestsPerRoom) {
            currentChildren = Math.min(maxGuestsPerRoom - currentAdults, currentChildren + 1);
          } else {
             toast({ title: "Capacity Reached", description: `Deluxe Room allows a maximum of ${maxGuestsPerRoom} guests.`, variant: "warning", duration: 4000 });
          }
        } else { // For other rooms
          currentChildren = Math.min(10 - currentAdults, currentChildren + 1); // Keep total reasonable
        }
      }
    } else if (operation === 'decrement') {
      if (type === 'numAdults') {
        currentAdults = Math.max(1, currentAdults - 1);
      } else if (type === 'numChildren') {
        currentChildren = Math.max(0, currentChildren - 1);
      }
    }
    
    setNumAdults(currentAdults);
    setNumChildren(currentChildren);
  };
  
  const handleRoomChange = (value) => {
    const newNumRooms = value.includes('+') ? 5 : parseInt(value, 10);
    setNumRooms(newNumRooms);
    
    // For Deluxe room, if number of rooms changes, adjust guests if they exceed total capacity for new room count
    if (room?.slug === 'deluxe-room') {
        const maxTotalGuestsForNewRooms = roomCapacity.total * newNumRooms;
        if ((numAdults + numChildren) > maxTotalGuestsForNewRooms) {
            // Prioritize adults, then fill children up to the limit
            let newAdults = Math.min(numAdults, roomCapacity.adults * newNumRooms); // Max adults per room * numRooms
            if (newAdults > maxTotalGuestsForNewRooms) newAdults = maxTotalGuestsForNewRooms;

            let remainingCapacityForChildren = maxTotalGuestsForNewRooms - newAdults;
            let newChildren = Math.min(numChildren, remainingCapacityForChildren);
            
            setNumAdults(Math.max(1, newAdults)); // Ensure at least 1 adult if possible
            setNumChildren(Math.max(0, newChildren));
        }
    } else { // For other rooms, maintain previous logic or apply a general one
        const generalMaxGuestsPerRoom = 10; // A general high limit for non-deluxe rooms
        const maxTotalGuestsForNewRooms = generalMaxGuestsPerRoom * newNumRooms;
         if ((numAdults + numChildren) > maxTotalGuestsForNewRooms) {
            let newAdults = Math.min(numAdults, generalMaxGuestsPerRoom * newNumRooms);
            let remainingCapacityForChildren = maxTotalGuestsForNewRooms - newAdults;
            let newChildren = Math.min(numChildren, remainingCapacityForChildren);
            setNumAdults(newAdults);
            setNumChildren(Math.max(0,newChildren));
        }
    }
  };


  const handleReserve = () => {
    if (!checkInDate || !checkOutDate) {
      toast({ title: "Missing Dates", description: "Please select check-in and check-out dates.", variant: "destructive" });
      return;
    }
    if (new Date(checkOutDate) <= new Date(checkInDate)) {
       toast({ title: "Invalid Dates", description: "Check-out date must be after check-in date.", variant: "destructive" });
      return;
    }
    if (room?.slug === 'deluxe-room' && (numAdults + numChildren) > roomCapacity.total * numRooms) {
        toast({ title: "Capacity Exceeded", description: `Deluxe Room allows a maximum of ${roomCapacity.total} guests per room. You have selected ${numRooms} room(s).`, variant: "destructive" });
        return;
    }

    navigate('/booking', { 
      state: { 
        roomSlug: room.slug, 
        checkInDate: checkInDate.toISOString(), 
        checkOutDate: checkOutDate.toISOString(), 
        numAdults, 
        numChildren,
        numRooms 
      } 
    });
  };

  if (!room) return null;

  const roomCountOptions = Array.from({ length: 5 }, (_, i) => (i + 1).toString());
  if (!roomCountOptions.includes('5+')) roomCountOptions.push(`5+`);


  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card p-6 sm:p-8 rounded-xl shadow-xl border border-border/50"
    >
      <h3 className="text-xl md:text-2xl font-semibold text-primary-dark mb-1 flex items-center">
        <DollarSign className="w-6 h-6 mr-2 text-primary opacity-80" />
        Reserve Your Stay
      </h3>
      <div className="mb-5 md:mb-6">
        <span className="text-lg md:text-xl font-bold text-primary-dark">{Number(pricePerNight || 0).toLocaleString('vi-VN')} VND</span>
        <span className="text-xs text-muted-foreground ml-1">/ night (incl. tax & fees)</span>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="check-in-sidebar" className="text-xs font-medium text-muted-foreground flex items-center mb-1">
              <CalendarDays className="w-3.5 h-3.5 mr-1.5 text-primary/70" />Check-in
            </Label>
            <DatePicker 
                selected={checkInDate} 
                onSelect={setCheckInDate} 
                className="w-full" 
                buttonClassName="text-sm py-2"
                placeholderText="Select arrival"
                fromDate={new Date()}
            />
          </div>
          <div>
            <Label htmlFor="check-out-sidebar" className="text-xs font-medium text-muted-foreground flex items-center mb-1">
              <CalendarDays className="w-3.5 h-3.5 mr-1.5 text-primary/70" />Check-out
            </Label>
            <DatePicker 
                selected={checkOutDate} 
                onSelect={setCheckOutDate} 
                className="w-full" 
                buttonClassName="text-sm py-2"
                placeholderText="Select departure"
                fromDate={checkInDate ? new Date(new Date(checkInDate).setDate(checkInDate.getDate() + 1)) : new Date()}
            />
          </div>
        </div>

        <div>
            <Label htmlFor="num-rooms-sidebar" className="text-xs font-medium text-muted-foreground flex items-center mb-1">
                <BedDouble className="w-3.5 h-3.5 mr-1.5 text-primary/70" />Rooms
            </Label>
             <Select value={String(numRooms > 4 ? '5+' : numRooms)} onValueChange={handleRoomChange}>
                <SelectTrigger id="num-rooms-sidebar" className="w-full text-sm py-2">
                    <SelectValue placeholder="Number of Rooms" />
                </SelectTrigger>
                <SelectContent>
                    {roomCountOptions.map(opt => <SelectItem key={`sidebar-rooms-${opt}`} value={opt}>{opt}{opt.includes('+') ? '' : ' Room(s)'}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>

        <div>
            <Label className="text-xs font-medium text-muted-foreground flex items-center mb-1">
                <Users className="w-3.5 h-3.5 mr-1.5 text-primary/70" />Guests
            </Label>
             <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal text-sm py-2">
                        {numAdults} Adult{numAdults !== 1 ? 's' : ''}
                        {numChildren > 0 && `, ${numChildren} Child${numChildren !== 1 ? 'ren' : ''}`}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-0" align="start">
                    <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="adults-sidebar-popover" className="text-sm">Adults</Label>
                            <div className="flex items-center space-x-1.5">
                            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleGuestChange('numAdults', 'decrement')}><Minus className="h-3.5 w-3.5" /></Button>
                            <Input type="number" id="adults-sidebar-popover" value={numAdults} readOnly className="w-10 h-7 text-center px-1 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleGuestChange('numAdults', 'increment')}><Plus className="h-3.5 w-3.5" /></Button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="children-sidebar-popover" className="text-sm">Children <span className="text-xs text-muted-foreground">(0-12)</span></Label>
                             <div className="flex items-center space-x-1.5">
                            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleGuestChange('numChildren', 'decrement')}><Minus className="h-3.5 w-3.5" /></Button>
                            <Input type="number" id="children-sidebar-popover" value={numChildren} readOnly className="w-10 h-7 text-center px-1 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleGuestChange('numChildren', 'increment')}><Plus className="h-3.5 w-3.5" /></Button>
                            </div>
                        </div>
                        {room?.slug === 'deluxe-room' && (
                         <p className="text-xs text-muted-foreground flex items-start pt-1">
                            <Info className="w-3 h-3 mr-1.5 mt-0.5 flex-shrink-0" />
                            Deluxe Room capacity: Max {roomCapacity.total} guests (e.g., {roomCapacity.adults} adults, {roomCapacity.children} children).
                        </p>
                        )}
                         {room?.slug !== 'deluxe-room' && (
                         <p className="text-xs text-muted-foreground flex items-start pt-1">
                            <Info className="w-3 h-3 mr-1.5 mt-0.5 flex-shrink-0" />
                            Room capacity: {roomCapacity.adults} adults, {roomCapacity.children} children. Max {roomCapacity.total} guests per room.
                        </p>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </div>

        {numberOfNights > 0 && (
          <div className="pt-2 text-center border-t border-dashed border-border/50">
            <p className="text-lg font-semibold text-primary-dark">
              Total: {Number(totalPrice).toLocaleString('vi-VN')} VND
            </p>
            <p className="text-xs text-muted-foreground">
              For {numberOfNights} night{numberOfNights !== 1 ? 's' : ''} and {numRooms} room{numRooms !==1 ? 's' : ''}.
            </p>
          </div>
        )}

        <Button 
          onClick={handleReserve} 
          className="w-full bg-gradient-button text-white button-glow-effect py-3 text-base mt-2"
          disabled={!checkInDate || !checkOutDate || numberOfNights <= 0}
        >
          Book This Room
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-3">
          <MapPin className="w-3 h-3 inline-block mr-1 mb-0.5 text-primary/70" /> 5 Vo Nguyen Giap, Da Nang. Questions? Call <a href="tel:02998877123" className="text-primary hover:underline">0299 8877 123</a>.
        </p>
      </div>
    </motion.div>
  );
};

export default BookingSidebar;