import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { fetchPostCategories } from "../api/fetch-post-categories";

type PostCategoryComboboxProps = {
  postCategoryId?: number;
  onChange: (postCategoryId: number) => void;
};

export function PostCategoryCombobox({
  postCategoryId,
  onChange,
}: PostCategoryComboboxProps) {
  const [open, setOpen] = useState(false);

  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchPostCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const selectedCategory = categories.find((c) => c.id === postCategoryId);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {selectedCategory ? selectedCategory.name : "Chọn danh mục..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Tìm danh mục..." />
          <CommandEmpty>Không tìm thấy.</CommandEmpty>

          <CommandGroup>
            {categories.map((item) => (
              <CommandItem
                key={item.id}
                value={item.name}
                onSelect={(currentValue) => {
                  onChange(item.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    postCategoryId === item.id ? "opacity-100" : "opacity-0",
                  )}
                />
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
