import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

interface CartButtonProps {
  count?: number
  onClick?: () => void
}

export const CartButton = ({ count = 10, onClick }: CartButtonProps) => {
  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        className="relative"
      >
        <ShoppingCart className="h-5 w-5" />
      </Button>

      {count > 0 && (
        <Badge
          className="absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5 rounded-full bg-red-500 text-white"
        >
          {count}
        </Badge>
      )}
    </div>
  )
}