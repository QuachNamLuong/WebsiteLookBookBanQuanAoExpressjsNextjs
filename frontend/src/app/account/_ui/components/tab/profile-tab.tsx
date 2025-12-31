import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function ProfileTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin tài khoản</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Info label="Họ tên" value="Nguyễn Thị Lan" />
        <Info label="Email" value="lan@gmail.com" />
        <Info label="Số điện thoại" value="0909 123 456" />
        <Info label="Địa chỉ" value="Quận 1, TP.HCM" />

        <Button className="bg-[#7a2e2e] text-white">
          Chỉnh sửa thông tin
        </Button>
      </CardContent>
    </Card>
  );
}


function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <Label className="text-sm text-muted-foreground">{label}</Label>
      <p className="font-medium">{value}</p>
    </div>
  );
}
