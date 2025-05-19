import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, CreditCard, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient"; 

const isValidImageUrl = (url) => url && typeof url === 'string' && url.startsWith('https://i.postimg.cc');
const placeholderImage = "https://i.postimg.cc/Fs7Gf0b2/placeholder-room.webp";

const BookingCartSheet = ({ isOpen, onOpenChange }) => {
  const [cartItems, setCartItems] = useState([]);
  const [dbRoomsData, setDbRoomsData] = useState([]);

  useEffect(() => {
    const fetchRoomsFromDb = async () => {
      const { data, error } = await supabase.from("rooms").select("id, name, images, slug");
      if (!error && data) {
        setDbRoomsData(data);
      }
    };
    fetchRoomsFromDb();
  }, []);

  useEffect(() => {
    if (isOpen && dbRoomsData.length > 0) {
      const latestBookingRaw = localStorage.getItem("latestBooking");
      if (latestBookingRaw) {
        const booking = JSON.parse(latestBookingRaw);
        const roomSlug = booking.room_id || booking.room;
        const roomDetails = dbRoomsData.find(r => r.id === roomSlug || r.slug === roomSlug || r.name === booking.room);

        if (roomDetails) {
          const imageUrl = roomDetails.images && roomDetails.images.length > 0 && isValidImageUrl(roomDetails.images[0]) 
            ? roomDetails.images[0] 
            : placeholderImage;

          setCartItems([{
            id: roomDetails.id, 
            name: roomDetails.name,
            price: booking.totalPrice,
            nights: booking.nights,
            checkIn: booking.check_in_date ? new Date(booking.check_in_date).toLocaleDateString('en-GB') : 'N/A',
            checkOut: booking.check_out_date ? new Date(booking.check_out_date).toLocaleDateString('en-GB') : 'N/A',
            image: imageUrl,
          }]);
        } else {
           setCartItems([]); 
        }
      } else {
        setCartItems([]); 
      }
    }
  }, [isOpen, dbRoomsData]);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleRemoveItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    localStorage.removeItem("latestBooking"); 
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="text-2xl font-serif text-secondary-dark flex items-center">
            <ShoppingBag className="w-6 h-6 mr-3 text-primary" /> Your Booking Cart
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Review your selected room and proceed to payment.
          </SheetDescription>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/50 mb-4" />
            <p className="text-lg font-medium text-heading-foreground mb-2">Your cart is empty.</p>
            <p className="text-sm text-muted-foreground mb-6">Looks like you haven't added any rooms to your cart yet.</p>
            <SheetClose asChild>
              <Link to="/rooms">
                <Button className="bg-gradient-button text-white">Explore Rooms</Button>
              </Link>
            </SheetClose>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-grow p-6">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 p-4 rounded-lg border border-border bg-card/50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md shadow-sm"
                    />
                    <div className="flex-grow">
                      <h4 className="text-md font-semibold text-heading-foreground">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {item.checkIn} - {item.checkOut} ({item.nights} night{item.nights > 1 ? 's' : ''})
                      </p>
                      <p className="text-sm font-medium text-primary mt-1">
                        {item.price.toLocaleString('vi-VN')} VND
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 h-8 w-8" onClick={() => handleRemoveItem(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <SheetFooter className="p-6 border-t bg-background">
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span className="text-heading-foreground">Total:</span>
                  <span className="text-primary">{totalAmount.toLocaleString('vi-VN')} VND</span>
                </div>
                <SheetClose asChild>
                  <Link to="/booking" className="w-full block">
                    <Button size="lg" className="w-full bg-gradient-button text-white text-base">
                      <CreditCard className="w-5 h-5 mr-2" /> Proceed to Payment
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="outline" className="w-full">Continue Browsing</Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default BookingCartSheet;