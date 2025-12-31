"use client";

import { useState } from "react";
import Sidebar from "./_ui/components/sidebar";
import ProfileTab from "./_ui/components/tab/profile-tab";
import OrdersTab from "./_ui/components/tab/order-tab";
import SecurityTab from "./_ui/components/tab/security-tab";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<
    "profile" | "orders" | "favorites" | "security"
  >("profile");

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content */}
        <div className="md:col-span-3">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "orders" && <OrdersTab />}
          {activeTab === "security" && <SecurityTab />}
        </div>
      </div>
    </div>
  );
}
