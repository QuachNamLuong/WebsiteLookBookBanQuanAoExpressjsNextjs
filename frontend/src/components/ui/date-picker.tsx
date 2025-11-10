"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { vi } from "date-fns/locale";
import { CalendarMonth } from "react-day-picker"

type DatePickerProps = {
  className?: string
}

export function DatePicker({ className }: DatePickerProps) {
  const [date, setDate] = React.useState<Date>()

  return (
    <div className={cn("w-full", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "dd/MM/yyyy", { locale: vi }) : <span>Chọn ngày</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            captionLayout="dropdown"
            locale={vi}
            formatters={{formatMonthDropdown: (month, dateLib) => (month.getMonth() + 1).toString()}}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
