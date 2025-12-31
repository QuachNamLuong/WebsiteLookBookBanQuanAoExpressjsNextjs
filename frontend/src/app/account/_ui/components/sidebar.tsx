import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLogout } from "@/hooks/auth/use-logout";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import { User, ShoppingBag, Heart, LogOut, Lock } from "lucide-react";
import ProfileTab from "./tab/profile-tab";
import OrdersTab from "./tab/order-tab";

export default function Sidebar({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}) {
  const logout = useLogout();
  return (
      <Card className="bg-[#fdfaf6]">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?img=47" />
              <AvatarFallback>LN</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Nguyễn Thị Lan</p>
              <p className="text-sm text-muted-foreground">lan@gmail.com</p>
            </div>
          </div>

          <Separator />

          <MenuItem
            icon={<User size={18} />}
            label="Tài khoản của tôi"
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
          <MenuItem
            icon={<ShoppingBag size={18} />}
            label="Đơn hàng của tôi"
            active={activeTab === "orders"}
            onClick={() => setActiveTab("orders")}
          />
          <MenuItem
            icon={<Lock size={18} />}
            label="Bảo mật"
            active={activeTab === "security"}
            onClick={() => setActiveTab("security")}
          />

          <Separator />

          <Button
            variant="ghost"
            className="w-full justify-start text-red-600"
            onClick={logout}
          >
            <LogOut size={18} className="mr-2" />
            Đăng xuất
          </Button>
        </CardContent>
      </Card>
  );
}

function MenuItem({ icon, label, active, onClick }: any) {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      className="w-full justify-start"
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </Button>
  );
}
