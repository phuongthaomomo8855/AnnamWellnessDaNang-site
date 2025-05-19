import React, { useState } from 'react';
import { MessageSquare, CreditCard, Landmark, Globe, ShieldCheck, School as University, User, Calendar, Lock } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

const paymentMethods = [
  { id: 'mastercard', name: 'MasterCard', icon: CreditCard, type: 'card' },
  { id: 'visa', name: 'Visa', icon: CreditCard, type: 'card' },
  { id: 'jcb', name: 'JCB', icon: CreditCard, type: 'card' },
  { id: 'napas', name: 'Napas', icon: CreditCard, type: 'card' },
  { id: 'paypal', name: 'PayPal', icon: Globe, type: 'online_wallet' },
  { id: 'bank_transfer', name: 'Bank Transfer', icon: Landmark, type: 'transfer' },
  { id: 'cash_at_hotel', name: 'Cash at Hotel', icon: University, type: 'at_hotel' },
];

const bankAccountDetails = [
  { bankName: "Annam Wellness Bank (Virtual)", accountNumber: "8888123456789", accountName: "Annam Wellness Da Nang Resort" },
  { bankName: "Serenity Trust Bank (Demo)", accountNumber: "9999000111222", accountName: "Annam Wellness Resort Collection" },
];

const Step3PaymentRequestsForm = ({ data, setData }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(data.paymentMethod || '');
  const [paymentTiming, setPaymentTiming] = useState(data.paymentTiming || 'pay_at_hotel'); 
  
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (field, value) => {
    setData(field, value);
  };

  const handleCardDetailChange = (field, value) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentMethodChange = (methodId) => {
    setSelectedPaymentMethod(methodId);
    const method = paymentMethods.find(m => m.id === methodId);
    handleInputChange('paymentMethod', methodId);

    if (method?.type === 'card') {
      setPaymentTiming('pay_at_hotel'); 
      handleInputChange('paymentTiming', 'pay_at_hotel'); 
    } else if (method?.type === 'transfer' || method?.type === 'at_hotel') {
      setPaymentTiming('pay_at_hotel');
      handleInputChange('paymentTiming', 'pay_at_hotel');
    } else if (method?.type === 'online_wallet') {
      setPaymentTiming('pay_at_hotel'); 
      handleInputChange('paymentTiming', 'pay_at_hotel');
    }
  };


  const currentMethodType = paymentMethods.find(m => m.id === selectedPaymentMethod)?.type;

  return (
    <div className="space-y-8">
      <div>
        <Label htmlFor="special-requests" className="text-sm font-medium text-foreground/80 flex items-center mb-1.5">
          <MessageSquare className="w-4 h-4 mr-2 text-primary/70" /> Special Requests (Optional)
        </Label>
        <Textarea
          id="special-requests"
          placeholder="e.g., dietary restrictions, late check-in, feather-free room..."
          value={data.specialRequests || ''}
          onChange={(e) => handleInputChange('specialRequests', e.target.value)}
          className="min-h-[100px]"
        />
        <p className="text-xs text-muted-foreground mt-1.5">
          We'll do our best to accommodate your requests, but they are not guaranteed.
        </p>
      </div>

      <div>
        <Label className="text-sm font-medium text-foreground/80 flex items-center mb-2.5">
          <ShieldCheck className="w-4 h-4 mr-2 text-primary/70" /> Payment Method
        </Label>
        <RadioGroup
          value={selectedPaymentMethod}
          onValueChange={handlePaymentMethodChange}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {paymentMethods.map((method) => (
            <div key={method.id} className={`flex items-center space-x-3 p-3.5 border rounded-lg hover:border-primary/70 transition-colors cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary has-[:checked]:ring-2 has-[:checked]:ring-primary/50 ${selectedPaymentMethod === method.id ? 'bg-primary/10 border-primary ring-2 ring-primary/50' : 'border-border/50'}`}>
              <RadioGroupItem value={method.id} id={`payment-${method.id}`} className="border-muted-foreground"/>
              <Label htmlFor={`payment-${method.id}`} className="font-normal cursor-pointer flex-grow flex items-center text-sm">
                <method.icon className="w-5 h-5 mr-2.5 text-primary/80" />
                {method.name}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <AnimatePresence>
          {currentMethodType === 'card' && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: '1.5rem' }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="mt-6 p-4 border border-dashed border-primary/50 rounded-lg bg-primary/5 space-y-4"
            >
              <h4 className="text-sm font-semibold text-primary-dark mb-3">Enter Card Details (For Confirmation Only)</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="cardNumber" className="text-xs font-medium text-muted-foreground flex items-center">
                    <CreditCard className="w-3.5 h-3.5 mr-1.5" /> Card Number
                  </Label>
                  <Input 
                    id="cardNumber" 
                    type="text" 
                    placeholder="•••• •••• •••• ••••" 
                    value={cardDetails.cardNumber}
                    onChange={(e) => handleCardDetailChange('cardNumber', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cardName" className="text-xs font-medium text-muted-foreground flex items-center">
                    <User className="w-3.5 h-3.5 mr-1.5" /> Name on Card
                  </Label>
                  <Input 
                    id="cardName" 
                    type="text" 
                    placeholder="e.g., Nguyen Van A" 
                    value={cardDetails.cardName}
                    onChange={(e) => handleCardDetailChange('cardName', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="expiryDate" className="text-xs font-medium text-muted-foreground flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1.5" /> Expiry Date
                    </Label>
                    <Input 
                      id="expiryDate" 
                      type="text" 
                      placeholder="MM/YY" 
                      value={cardDetails.expiryDate}
                      onChange={(e) => handleCardDetailChange('expiryDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-xs font-medium text-muted-foreground flex items-center">
                      <Lock className="w-3.5 h-3.5 mr-1.5" /> CVV
                    </Label>
                    <Input 
                      id="cvv" 
                      type="text" 
                      placeholder="•••" 
                      value={cardDetails.cvv}
                      onChange={(e) => handleCardDetailChange('cvv', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              <p className="text-xs text-amber-700 dark:text-amber-500 mt-3">
                This information is for booking confirmation simulation only and will not be processed or stored securely. Do not use real card details.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {selectedPaymentMethod === 'paypal' && (
             <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="mt-4 p-4 border border-dashed border-primary/50 rounded-lg bg-primary/5"
            >
              <p className="text-xs text-foreground/90">
                You have selected PayPal. Upon clicking "Complete Payment", you would typically be redirected to PayPal. For this demo, your booking will be confirmed, and payment will be considered as "Pay at Hotel".
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedPaymentMethod === 'bank_transfer' && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="mt-4 p-4 border border-dashed border-primary/50 rounded-lg bg-primary/5 space-y-3"
            >
              <h4 className="text-sm font-semibold text-primary-dark">Bank Transfer Details:</h4>
              {bankAccountDetails.map((account, index) => (
                <div key={index} className="text-xs text-foreground/90">
                  <p><strong>Bank:</strong> {account.bankName}</p>
                  <p><strong>Account Number:</strong> {account.accountNumber}</p>
                  <p><strong>Account Name:</strong> {account.accountName}</p>
                  {index < bankAccountDetails.length - 1 && <hr className="my-2 border-primary/20"/>}
                </div>
              ))}
              <p className="text-xs text-muted-foreground mt-2">
                Please include your booking reference (will be provided after confirmation) in the transfer description. Payment confirmation may take 1-2 business days.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <p className="text-xs text-muted-foreground mt-4">
          {currentMethodType === 'card' || selectedPaymentMethod === 'paypal'
            ? 'Upon clicking "Complete Payment", your booking will be confirmed. Payment will be settled at the hotel.'
            : selectedPaymentMethod === 'bank_transfer'
            ? 'Your booking will be held pending payment confirmation. Payment will be settled via bank transfer.'
            : 'Full payment will be processed upon arrival at the hotel.'
          }
        </p>
      </div>
    </div>
  );
};

export default Step3PaymentRequestsForm;