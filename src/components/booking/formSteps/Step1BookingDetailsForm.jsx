import React from 'react';
import { CalendarDays, Users, Hash, BedDouble } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const Step1BookingDetailsForm = ({ data, setData, roomsData }) => {
  const handleRoomChange = (slug) => {
    setData('selectedRoomSlug', slug);
  };

  const handleDateChange = (field, date) => {
    setData(field, date);
  };

  const handleInputChange = (field, value) => {
    const parsedValue = parseInt(value, 10);
    if (field === 'numChildren' && (isNaN(parsedValue) || parsedValue < 0)) {
      setData(field, 0);
    } else if ((field === 'numAdults' || field === 'numRooms') && (isNaN(parsedValue) || parsedValue < 1)) {
      setData(field, 1);
    } else {
      setData(field, parsedValue);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="room-select" className="text-sm font-medium text-foreground/80 flex items-center mb-1.5">
          <BedDouble className="w-4 h-4 mr-2 text-primary/70" /> Select Accommodation
        </Label>
        <Select
          value={data.selectedRoomSlug || ''}
          onValueChange={handleRoomChange}
        >
          <SelectTrigger id="room-select" className="w-full">
            <SelectValue placeholder="Choose your sanctuary..." />
          </SelectTrigger>
          <SelectContent>
            {roomsData && roomsData.length > 0 ? (
              roomsData.map((room) => (
                <SelectItem key={room.slug} value={room.slug}>
                  {room.name} - {room.price_per_night ? room.price_per_night.toLocaleString('vi-VN') : 'N/A'} VND/night
                </SelectItem>
              ))
            ) : (
              <SelectItem value="loading" disabled>Loading rooms...</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="check-in-date" className="text-sm font-medium text-foreground/80 flex items-center mb-1.5">
            <CalendarDays className="w-4 h-4 mr-2 text-primary/70" /> Check-in Date
          </Label>
          <DatePicker
            id="check-in-date"
            selected={data.checkInDate}
            onSelect={(date) => handleDateChange('checkInDate', date)}
            className="w-full"
            fromDate={new Date()}
          />
        </div>
        <div>
          <Label htmlFor="check-out-date" className="text-sm font-medium text-foreground/80 flex items-center mb-1.5">
            <CalendarDays className="w-4 h-4 mr-2 text-primary/70" /> Check-out Date
          </Label>
          <DatePicker
            id="check-out-date"
            selected={data.checkOutDate}
            onSelect={(date) => handleDateChange('checkOutDate', date)}
            className="w-full"
            fromDate={data.checkInDate ? new Date(new Date(data.checkInDate).setDate(data.checkInDate.getDate() + 1)) : new Date()}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="num-adults" className="text-sm font-medium text-foreground/80 flex items-center mb-1.5">
            <Users className="w-4 h-4 mr-2 text-primary/70" /> Adults
          </Label>
          <Input
            id="num-adults"
            type="number"
            min="1"
            value={data.numAdults || '1'}
            onChange={(e) => handleInputChange('numAdults', e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="num-children" className="text-sm font-medium text-foreground/80 flex items-center mb-1.5">
            <Users className="w-4 h-4 mr-2 text-primary/70" /> Children
          </Label>
          <Input
            id="num-children"
            type="number"
            min="0"
            value={data.numChildren || '0'}
            onChange={(e) => handleInputChange('numChildren', e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="num-rooms" className="text-sm font-medium text-foreground/80 flex items-center mb-1.5">
            <Hash className="w-4 h-4 mr-2 text-primary/70" /> Number of Rooms
          </Label>
          <Input
            id="num-rooms"
            type="number"
            min="1"
            value={data.numRooms || '1'}
            onChange={(e) => handleInputChange('numRooms', e.target.value)}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Step1BookingDetailsForm;