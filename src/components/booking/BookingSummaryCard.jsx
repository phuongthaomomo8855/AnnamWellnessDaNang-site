import React from "react";

const BookingSummaryCard = ({ selectedRoomId, checkInDate, checkOutDate, numAdults, numChildren, numRooms, roomsData, nights, totalPrice }) => {
  const currentRoom = selectedRoomId && roomsData && roomsData[selectedRoomId] ? roomsData[selectedRoomId] : null;

  return (
    <div className="glass-card-professional p-6">
      <h3 className="text-xl font-serif text-secondary-dark mb-4">Booking Summary</h3>
      {currentRoom && (
        <div className="space-y-2 text-sm text-muted-foreground">
          <p><strong className="text-heading-foreground">Room Type:</strong> {currentRoom.name}</p>
          {checkInDate && <p><strong className="text-heading-foreground">Check-In:</strong> {checkInDate.toLocaleDateString('en-GB')}</p>}
          {checkOutDate && <p><strong className="text-heading-foreground">Check-Out:</strong> {checkOutDate.toLocaleDateString('en-GB')}</p>}
          {nights > 0 && <p><strong className="text-heading-foreground">Nights:</strong> {nights}</p>}
          <p><strong className="text-heading-foreground">Rooms:</strong> {numRooms}</p>
          <p><strong className="text-heading-foreground">Adults:</strong> {numAdults}</p>
          <p><strong className="text-heading-foreground">Children:</strong> {numChildren}</p>
          {totalPrice > 0 && (
            <p className="text-lg font-semibold text-primary mt-3 pt-3 border-t border-border">
              Total: {totalPrice.toLocaleString('vi-VN')} VND
            </p>
          )}
        </div>
      )}
      {!currentRoom && <p className="text-muted-foreground">Select a room to see summary.</p>}
    </div>
  );
};

export default BookingSummaryCard;