import React from 'react';
import { User, Mail, Phone, Globe, Home, Building, Hash } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countryList } from '@/lib/countryList';

const Step2GuestInfoForm = ({ data, setData }) => {
  const handleInputChange = (field, value) => {
    setData(field, value); 
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="first-name" className="text-sm font-medium text-foreground/80 flex items-center mb-1.5">
            <User className="w-4 h-4 mr-2 text-primary/70" /> First Name <span className="text-destructive ml-1">*</span>
          </Label>
          <Input
            id="first-name"
            type="text"
            placeholder="e.g., John"
            value={data.guestFirstName || ''}
            onChange={(e) => handleInputChange('guestFirstName', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="last-name" className="text-sm font-medium text-foreground/80 flex items-center mb-1.5">
            <User className="w-4 h-4 mr-2 text-primary/70" /> Last Name <span className="text-destructive ml-1">*</span>
          </Label>
          <Input
            id="last-name"
            type="text"
            placeholder="e.g., Doe"
            value={data.guestLastName || ''}
            onChange={(e) => handleInputChange('guestLastName', e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="text-sm font-medium text-foreground/80 flex items-center mb-1.5">
          <Mail className="w-4 h-4 mr-2 text-primary/70" /> Email Address <span className="text-destructive ml-1">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="e.g., john.doe@example.com"
          value={data.guestEmail || ''}
          onChange={(e) => handleInputChange('guestEmail', e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="phone" className="text-sm font-medium text-foreground/80 flex items-center mb-1.5">
          <Phone className="w-4 h-4 mr-2 text-primary/70" /> Phone Number
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="e.g., +1 234 567 8900"
          value={data.guestPhone || ''}
          onChange={(e) => handleInputChange('guestPhone', e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="country" className="text-sm font-medium text-foreground/80 flex items-center mb-1.5">
          <Globe className="w-4 h-4 mr-2 text-primary/70" /> Country/Region
        </Label>
        <Select value={data.guestCountry || ''} onValueChange={(value) => handleInputChange('guestCountry', value)}>
          <SelectTrigger id="country" className="w-full">
            <SelectValue placeholder="Select your country/region" />
          </SelectTrigger>
          <SelectContent>
            {countryList.map((country) => (
              <SelectItem key={country.code} value={country.name}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="address" className="text-sm font-medium text-foreground/80 flex items-center mb-1.5">
          <Home className="w-4 h-4 mr-2 text-primary/70" /> Street Address
        </Label>
        <Input
          id="address"
          type="text"
          placeholder="e.g., 123 Wellness Lane"
          value={data.guestAddress || ''}
          onChange={(e) => handleInputChange('guestAddress', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="city" className="text-sm font-medium text-foreground/80 flex items-center mb-1.5">
            <Building className="w-4 h-4 mr-2 text-primary/70" /> City
          </Label>
          <Input
            id="city"
            type="text"
            placeholder="e.g., Serenity Springs"
            value={data.guestCity || ''}
            onChange={(e) => handleInputChange('guestCity', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="zip-code" className="text-sm font-medium text-foreground/80 flex items-center mb-1.5">
            <Hash className="w-4 h-4 mr-2 text-primary/70" /> ZIP/Postal Code
          </Label>
          <Input
            id="zip-code"
            type="text"
            placeholder="e.g., 90210"
            value={data.guestZipCode || ''}
            onChange={(e) => handleInputChange('guestZipCode', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Step2GuestInfoForm;