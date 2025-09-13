"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

const mobileNav = [
  { label: "Dashboard", value: "/admin" },
  { label: "Products", value: "/admin/products" },
  { label: "Shop", value: "/admin/shop" },
  { label: "Repair", value: "/admin/repair" },
  { label: "Training", value: "/admin/training" },
  { label: "Orders", value: "/admin/orders" },
  { label: "Users", value: "/admin/users" },
  { label: "Contact", value: "/admin/contact" },
  { label: "Newsletter", value: "/admin/newsletter" },
  { label: "Settings", value: "/admin/settings" },
];

export default function AdminTopbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-30 -mx-4 md:mx-0 mb-6 md:mb-8 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="px-4 md:px-0 py-3 md:py-4 flex items-center gap-3 md:gap-6">
        <div className="hidden sm:block">
          <h1 className="text-lg md:text-xl font-semibold tracking-tight">Admin</h1>
          <p className="text-xs md:text-sm text-gray-500">Manage your app content and settings</p>
        </div>

        <div className="flex-1" />

        <div className="relative hidden md:block w-72">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 4.29 11.955l3.752 3.753a.75.75 0 1 0 1.06-1.061l-3.752-3.752A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" clipRule="evenodd" /></svg>
          </span>
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg border bg-white/70 pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div className="md:hidden ml-auto">
          <label className="sr-only" htmlFor="admin-mobile-nav">Navigate</label>
          <select
            id="admin-mobile-nav"
            className="rounded-lg border bg-white/90 px-3 py-2 text-sm"
            value={mobileNav.find(v => v.value === pathname)?.value ?? pathname}
            onChange={(e) => router.push(e.target.value)}
          >
            {mobileNav.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>

        <button
          onClick={async () => {
            try {
              await fetch('/api/admin/logout', { method: 'POST' });
            } catch {}
            router.replace('/admin/login');
          }}
          className="rounded-lg border bg-white px-3 py-2 text-sm hover:bg-gray-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
}


