import React from 'react';
import { MessageSquare, CreditCard } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Step3PaymentRequests = ({ data, setData }) => {
  const handleInputChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  return (
    <div className="space-y-8">
      <div>
        <Label htmlFor="special-requests" className="text-sm font-medium text-foreground/80 flex items-center mb-1.5">
          <MessageSquare className="w-4 h-4 mr-2 text-primary/70" /> Special Requests (Optional)
        </Label>
        <Textarea
          id="special-requests"
          placeholder="e.g., dietary restrictions, late check-in, feather-free room..."
          value={data.specialRequests}
          onChange={(e) => handleInputChange('specialRequests', e.target.value)}
          className="min-h-[100px]"
        />
        <p className="text-xs text-muted-foreground mt-1.5">
          We'll do our best to accommodate your requests, but they are not guaranteed.
        </p>
      </div>

      <div>
        <Label className="text-sm font-medium text-foreground/80 flex items-center mb-2.5">
          <CreditCard className="w-4 h-4 mr-2 text-primary/70" /> Payment Method
        </Label>
        <RadioGroup
          value={data.paymentMethod}
          onValueChange={(value) => handleInputChange('paymentMethod', value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2 p-3 border border-border/50 rounded-md hover:border-primary/70 transition-colors cursor-pointer has-[:checked]:bg-primary/5 has-[:checked]:border-primary">
            <RadioGroupItem value="Credit Card" id="payment-cc" />
            <Label htmlFor="payment-cc" className="font-normal cursor-pointer flex-grow">Credit Card (Pay at Hotel)</Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border border-border/50 rounded-md hover:border-primary/70 transition-colors cursor-pointer has-[:checked]:bg-primary/5 has-[:checked]:border-primary">
            <RadioGroupItem value="Bank Transfer" id="payment-bt" />
            <Label htmlFor="payment-bt" className="font-normal cursor-pointer flex-grow">Bank Transfer (Details will be provided)</Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border border-border/50 rounded-md hover:border-primary/70 transition-colors cursor-pointer has-[:checked]:bg-primary/5 has-[:checked]:border-primary">
            <RadioGroupItem value="Cash" id="payment-cash" />
            <Label htmlFor="payment-cash" className="font-normal cursor-pointer flex-grow">Cash (Pay at Hotel)</Label>
          </div>
        </RadioGroup>
        <p className="text-xs text-muted-foreground mt-1.5">
          Full payment will be processed upon arrival or as per bank transfer instructions.
        </p>
      </div>
    </div>
  );
};

export default Step3PaymentRequests;