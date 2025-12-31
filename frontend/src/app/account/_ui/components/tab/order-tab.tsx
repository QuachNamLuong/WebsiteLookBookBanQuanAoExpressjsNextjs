import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function OrdersTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Đơn hàng của tôi</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead className="text-muted-foreground">
            <tr>
              <th className="text-left">Mã đơn</th>
              <th>Ngày</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td>#AD001</td>
              <td className="text-center">12/03/2025</td>
              <td className="text-center">3.200.000₫</td>
              <td className="text-center text-orange-600">Đang may</td>
            </tr>
            <tr className="border-t">
              <td>#AD002</td>
              <td className="text-center">20/03/2025</td>
              <td className="text-center">2.800.000₫</td>
              <td className="text-center text-green-600">Hoàn thành</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
