import React from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users as UsersIcon, Tag } from "lucide-react";

const isValidImageUrl = (url) => url && typeof url === 'string' && url.startsWith('https://i.postimg.cc');
const placeholderImage = "https://i.postimg.cc/Fs7Gf0b2/placeholder-room.webp";

const AirportShuttleOptionsModal = ({ isOpen, onClose, service, onSelectVehicle }) => {
  if (!service || !service.vehicleOptions) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card text-card-foreground p-0">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="text-xl font-semibold text-primary">{service.title} - Select Vehicle</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Choose your preferred vehicle for airport transfer.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {service.vehicleOptions.map((vehicle, index) => (
            <motion.div
              key={vehicle.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow bg-background/50"
            >
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <img
                  src={isValidImageUrl(vehicle.image) ? vehicle.image : placeholderImage}
                  alt={vehicle.name}
                  className="w-full sm:w-32 h-24 sm:h-auto object-cover rounded-md flex-shrink-0 border border-border"
                />
                <div className="flex-grow text-center sm:text-left">
                  <h4 className="font-semibold text-heading-foreground">{vehicle.name}</h4>
                  <p className="text-xs text-muted-foreground flex items-center mt-1 justify-center sm:justify-start">
                    <UsersIcon className="w-3 h-3 mr-1.5 text-primary" /> {vehicle.seats}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center justify-center sm:justify-start">
                    <Tag className="w-3 h-3 mr-1.5 text-primary" /> {vehicle.price}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => onSelectVehicle(vehicle)}
                className="w-full mt-3 bg-primary/90 hover:bg-primary text-primary-foreground text-xs py-2.5 button-glow-effect"
              >
                Select {vehicle.name}
              </Button>
            </motion.div>
          ))}
        </div>
        <DialogFooter className="p-6 pt-4 border-t border-border">
          <DialogClose asChild>
            <Button type="button" variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AirportShuttleOptionsModal;