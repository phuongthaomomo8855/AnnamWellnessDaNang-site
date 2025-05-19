import React from 'react';
import Step1BookingDetailsForm from './Step1BookingDetailsForm';
import Step2GuestInfoForm from './Step2GuestInfoForm';
import Step3PaymentRequestsForm from './Step3PaymentRequestsForm';
import BookingErrorCard from '@/components/booking/BookingErrorCard';

const BookingFormRenderer = ({ stepName, data, setData, roomsData }) => {
  switch (stepName) {
    case 'Step1BookingDetailsForm':
      return <Step1BookingDetailsForm data={data} setData={setData} roomsData={roomsData} />;
    case 'Step2GuestInfoForm':
      return <Step2GuestInfoForm data={data} setData={setData} />;
    case 'Step3PaymentRequestsForm':
      return <Step3PaymentRequestsForm data={data} setData={setData} />;
    default:
      return <BookingErrorCard message={`Unknown form step: ${stepName}. Please contact support.`} />;
  }
};

export default BookingFormRenderer;