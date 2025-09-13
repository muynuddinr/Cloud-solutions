"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "Products", href: "/admin/products" },
  { label: "Shop", href: "/admin/shop" },
  { label: "Repair", href: "/admin/repair" },
  { label: "Training", href: "/admin/training" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Users", href: "/admin/users" },
  { label: "Contact", href: "/admin/contact" },
  { label: "Newsletter", href: "/admin/newsletter" },
  { label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setMounted(true);
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <aside className="hidden md:flex md:w-64 lg:w-72 xl:w-80 flex-col border-r bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="px-6 py-5 border-b">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-500" />
          <div>
            <h2 className="text-xl font-semibold leading-tight">Admin Panel</h2>
            <p className="text-xs text-gray-500">Cloud IT Solution</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <button
              key={item.href}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center gap-3 ${
                isActive
                  ? "bg-cyan-100 text-cyan-700"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => router.push(item.href)}
            >
              <span className="inline-flex h-5 w-5 items-center justify-center">
                {item.label === "Dashboard" && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M11.47 3.84a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06l-.72-.72V18a2.25 2.25 0 0 1-2.25 2.25H8.25A2.25 2.25 0 0 1 6 18v-6.32l-.72.72a.75.75 0 1 1-1.06-1.06l7.5-7.5Z" /><path d="M12 5.06 18 11v7a.75.75 0 0 1-.75.75h-10.5A.75.75 0 0 1 6 18v-7l6-5.94Z" /></svg>
                )}
                {item.label === "Products" && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2.25a.75.75 0 0 1 .53.22l8.25 8.25a.75.75 0 0 1 .22.53V20.25a1.5 1.5 0 0 1-1.5 1.5H14.25a.75.75 0 0 1-.75-.75V15h-3v5.25a.75.75 0 0 1-.75.75H4.5a1.5 1.5 0 0 1-1.5-1.5V11.25a.75.75 0 0 1 .22-.53l8.25-8.25a.75.75 0 0 1 .53-.22Z" /></svg>
                )}
                {item.label === "Shop" && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.423 8.5a.75.75 0 0 0 .704.538H18a.75.75 0 0 0 0-1.5H5.378l-2.423-8.5H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM12.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" /></svg>
                )}
                {item.label === "Repair" && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 5.25 5.25v.75a.75.75 0 0 1-1.5 0v-.75a3.75 3.75 0 1 0-7.5 0v.75a.75.75 0 0 1-1.5 0v-.75A5.25 5.25 0 0 1 12 6.75ZM12 9a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75A.75.75 0 0 1 12 9ZM12 12a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75A.75.75 0 0 1 12 12Z" clipRule="evenodd" /><path d="M8.25 18.75a.75.75 0 0 1-.75-.75v-1.5a.75.75 0 0 1 1.5 0v1.5a.75.75 0 0 1-.75.75ZM15.75 18.75a.75.75 0 0 1-.75-.75v-1.5a.75.75 0 0 1 1.5 0v1.5a.75.75 0 0 1-.75.75Z" /></svg>
                )}
                {item.label === "Training" && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.949 49.949 0 0 1-9.902 3.912l-.003.002-.34.3a.75.75 0 0 1-.707 0A50.009 50.009 0 0 1 7.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 0 1 4.653-2.52.75.75 0 0 1-.186-1.374c-.266-.15-.567-.275-.889-.35a59.81 59.81 0 0 1 2.45-1.158ZM15.75 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4.459 15.75a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" /></svg>
                )}
                {item.label === "Orders" && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M6 3.75A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6Zm1.5 3h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1 0-1.5Zm0 3.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1 0-1.5ZM9 15h6a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 9 15Z" /></svg>
                )}
                {item.label === "Users" && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M15 8.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path fillRule="evenodd" d="M4.5 19.5a7.5 7.5 0 1 1 15 0 .75.75 0 0 1-.75.75h-13.5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" /></svg>
                )}
                {item.label === "Settings" && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M11.984 1.5a2.25 2.25 0 0 1 2.212 1.84l.101.607c.133.8.78 1.405 1.548 1.52l.613.092a2.25 2.25 0 0 1 1.568 3.39l-.334.54a1.875 1.875 0 0 0 0 1.96l.334.54a2.25 2.25 0 0 1-1.568 3.39l-.613.092a1.875 1.875 0 0 0-1.548 1.52l-.101.606a2.25 2.25 0 0 1-2.212 1.84h-.468a2.25 2.25 0 0 1-2.212-1.84l-.101-.607a1.875 1.875 0 0 0-1.548-1.52l-.613-.092a2.25 2.25 0 0 1-1.568-3.39l.334-.54a1.875 1.875 0 0 0 0-1.96l-.334-.54a2.25 2.25 0 0 1 1.568-3.39l.613-.092a1.875 1.875 0 0 0 1.548-1.52l.101-.606A2.25 2.25 0 0 1 11.516 1.5h.468Zm.016 7.125a3.375 3.375 0 1 0 0 6.75 3.375 3.375 0 0 0 0-6.75Z" clipRule="evenodd" /></svg>
                )}
                {item.label === "Contact" && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M1.5 6.75A2.25 2.25 0 0 1 3.75 4.5h16.5A2.25 2.25 0 0 1 22.5 6.75v.431l-9.75 5.453a2.25 2.25 0 0 1-2.25 0L1.5 7.181V6.75Z" /><path d="M22.5 8.869l-8.988 5.023a3.75 3.75 0 0 1-3.024 0L1.5 8.869V17.25A2.25 2.25 0 0 0 3.75 19.5h16.5a2.25 2.25 0 0 0 2.25-2.25V8.869Z" /></svg>
                )}
                {item.label === "Newsletter" && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M3.75 4.5A2.25 2.25 0 0 0 1.5 6.75v10.5A2.25 2.25 0 0 0 3.75 19.5h12.75A2.25 2.25 0 0 0 18.75 17.25V6.75A2.25 2.25 0 0 0 16.5 4.5H3.75ZM6 8.25h9a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1 0-1.5ZM6 11.25h9a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1 0-1.5Zm0 3h5.25a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1 0-1.5Z" /><path d="M19.5 7.5a1.5 1.5 0 0 1 3 0v10.125A3.375 3.375 0 0 1 19.125 21H8.25a1.5 1.5 0 1 1 0-3h10.875a.375.375 0 0 0 .375-.375V7.5Z" /></svg>
                )}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-3 border-t text-xs text-gray-500">© {currentYear} Cloud IT Solution</div>
    </aside>
  );
}


