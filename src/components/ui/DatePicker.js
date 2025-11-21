"use client";

import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const CustomDatePicker = forwardRef(({ value, onChange, placeholder, disabled, minDate, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <DatePicker
        ref={ref}
        selected={value}
        onChange={onChange}
        placeholderText={placeholder}
        disabled={disabled}
        minDate={minDate}
        dateFormat="PPP"
        className={cn(
          "flex h-12 w-full rounded-xl border border-border/60 bg-background/50 pl-3 pr-10 py-2 text-sm",
          "ring-offset-background",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          !value && "text-muted-foreground"
        )}
        calendarClassName="!shadow-2xl !border-border/20 !rounded-2xl !font-sans"
        wrapperClassName="w-full"
        showPopperArrow={false}
        popperPlacement="bottom-start"
        popperModifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
        ]}
        {...props}
      />
      <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
    </div>
  );
});

CustomDatePicker.displayName = "CustomDatePicker";

export { CustomDatePicker };

