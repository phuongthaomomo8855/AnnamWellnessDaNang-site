import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function DatePicker({
  selected,
  onSelect,
  className,
  buttonClassName,
  icon,
  placeholderText = "Pick a date",
  fromDate,
  toDate,
  disabled,
  modal = false, 
  ...props
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (date) => {
    if (onSelect) {
      onSelect(date);
    }
    setIsOpen(false); 
  };
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal={modal}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal group", 
            !selected && "text-muted-foreground",
            className, 
            buttonClassName 
          )}
          disabled={disabled}
          onClick={() => setIsOpen(true)} 
        >
          {icon ? React.cloneElement(icon, { className: cn(icon.props.className, "group-hover:text-white") }) : <CalendarIcon className="mr-2 h-4 w-4 group-hover:text-white" />}
          <span className={cn("group-hover:text-white", className?.includes("text-white") ? "text-white" : "")}>{selected ? format(selected, "PPP") : placeholderText}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          initialFocus
          fromDate={fromDate}
          toDate={toDate}
          disabled={disabled}
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
}