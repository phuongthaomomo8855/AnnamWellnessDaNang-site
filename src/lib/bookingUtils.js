import { differenceInCalendarDays, isBefore, startOfDay } from 'date-fns';

export const calculateNights = (checkIn, checkOut) => {
  if (checkIn && checkOut && new Date(checkOut) > new Date(checkIn)) {
    return differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }
  return 0;
};

export const calculateTotalPrice = (checkInDate, checkOutDate, pricePerNight, numRooms) => {
  const nights = calculateNights(checkInDate, checkOutDate);
  if (pricePerNight && nights > 0) {
    const numberOfRooms = parseInt(String(numRooms).replace('+', '')) || 1;
    return nights * pricePerNight * numberOfRooms;
  }
  return 0;
};

export const validateBookingStep = (stepIndex, data, roomDetails, isFinalSubmission = false) => {
  switch (stepIndex) {
    case 0: // Booking Details
      if (!data.selectedRoomSlug) return { isValid: false, message: "Please select a room." };
      if (!data.checkInDate) return { isValid: false, message: "Please select a check-in date." };
      if (!data.checkOutDate) return { isValid: false, message: "Please select a check-out date." };
      if (isBefore(startOfDay(new Date(data.checkOutDate)), startOfDay(new Date(data.checkInDate)))) {
        return { isValid: false, message: "Check-out date must be after check-in date." };
      }
      if (calculateNights(data.checkInDate, data.checkOutDate) < 1) {
        return { isValid: false, message: "Minimum stay is 1 night." };
      }
      if (!data.numAdults || data.numAdults < 1) return { isValid: false, message: "At least one adult is required." };
      if (roomDetails) {
        const totalGuests = parseInt(data.numAdults, 10) + (parseInt(data.numChildren, 10) || 0);
        if (totalGuests > roomDetails.maxGuests * data.numRooms) {
          return { isValid: false, message: `Selected room(s) can only accommodate ${roomDetails.maxGuests * data.numRooms} guests.` };
        }
      }
      return { isValid: true, message: "" };

    case 1: // Guest Information
      if (!data.guestFirstName.trim()) return { isValid: false, message: "Please enter guest's first name." };
      if (!data.guestLastName.trim()) return { isValid: false, message: "Please enter guest's last name." };
      if (!data.guestEmail.trim()) return { isValid: false, message: "Please enter guest's email address." };
      if (!/\S+@\S+\.\S+/.test(data.guestEmail)) return { isValid: false, message: "Please enter a valid email address." };
      if (!data.guestPhone.trim()) return { isValid: false, message: "Please enter guest's phone number." };
      // Basic phone validation (e.g., at least 7 digits) - can be more complex
      if (!/^\+?[0-9\s-]{7,}$/.test(data.guestPhone)) return { isValid: false, message: "Please enter a valid phone number."};
      if (!data.guestCountry) return { isValid: false, message: "Please select guest's country." };
      return { isValid: true, message: "" };

    case 2: // Payment & Requests
      if (!data.paymentMethod) return { isValid: false, message: "Please select a payment method." };
      if (isFinalSubmission && !data.agreeToTerms) {
        return { isValid: false, message: "Please agree to the terms and conditions." };
      }
      // Add specific validation for card details if paymentMethod is 'card' and details are required
      // For this project, card details are for simulation, so not strictly validated here for submission.
      return { isValid: true, message: "" };

    default:
      return { isValid: true, message: "" };
  }
};