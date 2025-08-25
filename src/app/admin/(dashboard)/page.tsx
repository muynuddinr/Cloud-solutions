import React from "react";
import Sparkline from "../components/Sparkline";

export default function AdminHomePage() {
  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome to your admin dashboard.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-lg border bg-white text-sm hover:bg-gray-50">Export</button>
          <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm shadow hover:shadow-md">New</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Products", value: 128, color: "from-cyan-100 to-blue-100", spark: [5,8,7,9,12,10,14,13,15,18,17,19] },
          { label: "Total Orders", value: 342, color: "from-emerald-100 to-teal-100", spark: [3,4,6,5,7,9,8,10,12,11,13,14] },
          { label: "Active Users", value: 86, color: "from-violet-100 to-fuchsia-100", spark: [1,2,3,3,4,6,5,7,9,8,10,12] },
          { label: "Revenue", value: "$12.4k", color: "from-amber-100 to-orange-100", spark: [2,3,4,6,5,7,8,9,11,10,12,13] },
        ].map((card) => (
          <div key={card.label} className="rounded-xl border bg-white p-5 relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-50`} />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">{card.label}</div>
                <div className="text-xs text-gray-400">Last 12d</div>
              </div>
              <div className="mt-1 text-2xl font-semibold">{card.value as any}</div>
              <div className="mt-2"><Sparkline values={card.spark as number[]} /></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-xl border bg-white p-5 lg:col-span-2">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="px-3 py-2 font-medium">Order</th>
                  <th className="px-3 py-2 font-medium">Customer</th>
                  <th className="px-3 py-2 font-medium">Total</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                  <th className="px-3 py-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {[1,2,3,4,5].map((i) => (
                  <tr key={i} className="border-t">
                    <td className="px-3 py-2">#ORD-{1200 + i}</td>
                    <td className="px-3 py-2">User {i}</td>
                    <td className="px-3 py-2">${(50 + i * 12).toFixed(2)}</td>
                    <td className="px-3 py-2">
                      <span className={`rounded-full px-2 py-1 text-xs ${i % 2 === 0 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                        {i % 2 === 0 ? "Paid" : "Pending"}
                      </span>
                    </td>
                    <td className="px-3 py-2">2025-08-0{i}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              "Add Product",
              "Create User",
              "View Orders",
              "Settings",
            ].map((action) => (
              <button key={action} className="rounded-lg border px-3 py-2 text-sm bg-white hover:bg-gray-50">
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


