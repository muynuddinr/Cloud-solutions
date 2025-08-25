import type { Metadata } from "next";
import React from "react";
import AdminSidebar from "../AdminSidebar";
import AdminTopbar from "../AdminTopbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin | Cloud IT Solution",
  description: "Admin dashboard",
};

export default async function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  const isValid = token ? await verifyAdminToken(token) : null;
  if (!isValid) {
    redirect('/admin/login');
  }

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


