"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { vi } from "date-fns/locale" // Import Vietnamese locale

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// ⚠️ Removed unused import: CalendarMonth

// Define a type for the date selection event for React Day Picker
type SelectDate = Date | undefined

type DatePickerProps = {
  className?: string
  // 1. Allow selected date to be optional (undefined or null)
  selected: SelectDate
  // 2. Add an onSelect handler to send the new date back to the parent
  onSelect: (date: SelectDate) => void
}

// 3. Destructure onSelect and use the selected prop directly
export function DatePicker({ className, selected, onSelect }: DatePickerProps) {
  // 4. Removed internal useState. The selected prop acts as the single source of truth.

  return (
    <div className={cn("w-full", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              // Use selected prop for conditional class
              !selected && "text-muted-foreground" 
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {/* Display the selected date or default text */}
            {selected ? (
              format(selected, "dd/MM/yyyy", { locale: vi })
            ) : (
              <span>Chọn ngày</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            // Use selected prop here
            selected={selected} 
            // Pass the onSelect prop directly to Calendar
            onSelect={onSelect} 
            captionLayout="dropdown"
            locale={vi}
            // Removed formatters prop as it's not standard for default Calendar setup
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}