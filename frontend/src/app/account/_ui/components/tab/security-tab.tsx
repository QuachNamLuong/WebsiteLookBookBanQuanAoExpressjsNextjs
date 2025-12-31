import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SecurityTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bảo mật tài khoản</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-row gap-2">
        <Button variant="outline">Đổi mật khẩu</Button>
        <Button variant="outline">Đăng xuất tất cả thiết bị</Button>
      </CardContent>
    </Card>
  );
}