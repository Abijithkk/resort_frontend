"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./Button";
import "react-day-picker/dist/style.css";

export function Calendar({ className, classNames, ...props }) {
  return (
    <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-border/20">
      <style jsx global>{`
        .rdp {
          --rdp-cell-size: 40px;
          --rdp-accent-color: hsl(var(--primary));
          --rdp-background-color: hsl(var(--accent));
          margin: 0;
        }
        .rdp-table {
          width: 100%;
          max-width: 100%;
        }
        .rdp-head_cell {
          width: var(--rdp-cell-size);
          font-weight: 600;
        }
        .rdp-cell {
          width: var(--rdp-cell-size);
          height: var(--rdp-cell-size);
        }
        .rdp-day {
          width: var(--rdp-cell-size);
          height: var(--rdp-cell-size);
        }
      `}</style>
      <DayPicker
        {...props}
        className={cn("w-full", className)}
        classNames={{
          months: "flex flex-col space-y-4",
          month: "space-y-4 w-full",
          caption: "flex justify-between items-center px-1 mb-4",
          caption_label: "text-base font-semibold text-foreground",
          nav: "flex items-center gap-1",
          button_previous: cn(
            buttonVariants({ variant: "outline" }),
            "h-8 w-8 p-0 rounded-md hover:bg-primary/10 hover:border-primary/50"
          ),
          button_next: cn(
            buttonVariants({ variant: "outline" }),
            "h-8 w-8 p-0 rounded-md hover:bg-primary/10 hover:border-primary/50"
          ),
          month_caption: "flex justify-center items-center",
          table: "w-full border-collapse",
          head_row: "flex",
          head_cell:
            "text-muted-foreground w-[40px] h-10 flex items-center justify-center text-xs font-semibold uppercase tracking-wider",
          row: "flex w-full mt-1",
          cell: "h-[40px] w-[40px] text-center text-sm p-0 relative flex items-center justify-center",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-[40px] w-[40px] p-0 font-normal rounded-full hover:bg-primary/10 transition-colors"
          ),
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full font-semibold shadow-md",
          day_today: "bg-accent text-accent-foreground font-semibold rounded-full border-2 border-primary/50",
          day_outside: "text-muted-foreground opacity-40",
          day_disabled: "text-muted-foreground opacity-30 cursor-not-allowed hover:bg-transparent",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: () => <ChevronLeft className="h-4 w-4" />,
          IconRight: () => <ChevronRight className="h-4 w-4" />,
        }}
      />
    </div>
  );
}
