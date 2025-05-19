import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarCheck2, Users, Search, UserPlus } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const AvailabilityForm = ({ 
  checkInDate, setCheckInDate, 
  checkOutDate, setCheckOutDate, 
  numAdults, setNumAdults, 
  numChildren, setNumChildren, 
  onCheckAvailability, loading 
}) => {

  const handleGuestChange = (type, operation) => {
    if (type === 'numAdults') {
      setNumAdults(prev => operation === 'increment' ? Math.min(10, prev + 1) : Math.max(1, prev - 1));
    } else {
      setNumChildren(prev => operation === 'increment' ? Math.min(5, prev + 1) : Math.max(0, prev - 1));
    }
  };

  return (
    <Card className="mb-8 md:mb-12 p-4 md:p-6 shadow-lg bg-card/80 backdrop-blur-sm border-border/30">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div>
          <Label htmlFor="check-in-rooms" className="text-xs font-medium text-muted-foreground flex items-center"><CalendarCheck2 className="w-3.5 h-3.5 mr-1.5 text-primary/90" />Check-In</Label>
          <DatePicker selected={checkInDate} onSelect={setCheckInDate} placeholderText="Arrival Date" className="w-full mt-1" id="check-in-rooms" />
        </div>
        <div>
          <Label htmlFor="check-out-rooms" className="text-xs font-medium text-muted-foreground flex items-center"><CalendarCheck2 className="w-3.5 h-3.5 mr-1.5 text-primary/90" />Check-Out</Label>
          <DatePicker selected={checkOutDate} onSelect={setCheckOutDate} placeholderText="Departure Date" className="w-full mt-1" id="check-out-rooms" />
        </div>
        <div>
          <Label htmlFor="guests-rooms" className="text-xs font-medium text-muted-foreground flex items-center"><Users className="w-3.5 h-3.5 mr-1.5 text-primary/90" />Guests</Label>
           <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" id="guests-rooms" className="w-full justify-start text-left font-normal mt-1">
                {numAdults} Adult{numAdults > 1 ? 's' : ''}
                {numChildren > 0 && `, ${numChildren} Child${numChildren > 1 ? 'ren' : ''}`}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-0" align="start">
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="adults-popover-rooms" className="text-sm">Adults</Label>
                  <div className="flex items-center space-x-1.5">
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleGuestChange('numAdults', 'decrement')}><Users className="h-3.5 w-3.5" /></Button>
                    <Input type="number" id="adults-popover-rooms" value={numAdults} readOnly className="w-12 h-7 text-center px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleGuestChange('numAdults', 'increment')}><UserPlus className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
                 <div className="flex items-center justify-between">
                  <Label htmlFor="children-popover-rooms" className="text-sm">Children <span className="text-xs text-muted-foreground">(0-13)</span></Label>
                   <div className="flex items-center space-x-1.5">
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleGuestChange('numChildren', 'decrement')}><Users className="h-3.5 w-3.5" /></Button>
                    <Input type="number" id="children-popover-rooms" value={numChildren} readOnly className="w-12 h-7 text-center px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleGuestChange('numChildren', 'increment')}><UserPlus className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Button onClick={onCheckAvailability} disabled={loading} className="w-full bg-gradient-button text-white">
          <Search className="w-4 h-4 mr-2" /> {loading ? "Searching..." : "Search Rooms"}
        </Button>
      </div>
    </Card>
  );
};

export default AvailabilityForm;