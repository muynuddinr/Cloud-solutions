import type { Metadata } from "next";
import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export const metadata: Metadata = {
  title: "Admin | Cloud IT Solution",
  description: "Admin dashboard",
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 text-gray-900">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 px-4 md:px-10 pb-10">
          <AdminTopbar />
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}


