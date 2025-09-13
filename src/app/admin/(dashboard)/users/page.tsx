import React from "react";

export default function AdminUsersPage() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users</h1>
        <button className="px-3 py-2 rounded-lg bg-cyan-600 text-white text-sm shadow hover:shadow-md">Invite User</button>
      </div>

      <div className="rounded-xl border bg-white p-5 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="px-3 py-2 font-medium">Name</th>
              <th className="px-3 py-2 font-medium">Email</th>
              <th className="px-3 py-2 font-medium">Role</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1,2,3,4,5].map((i) => (
              <tr key={i} className="border-t">
                <td className="px-3 py-2">User {i}</td>
                <td className="px-3 py-2">user{i}@example.com</td>
                <td className="px-3 py-2">{i % 2 === 0 ? "Admin" : "Editor"}</td>
                <td className="px-3 py-2">
                  <span className={`rounded-full px-2 py-1 text-xs ${i % 2 === 0 ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}>
                    {i % 2 === 0 ? "Active" : "Disabled"}
                  </span>
                </td>
                <td className="px-3 py-2 space-x-2">
                  <button className="text-cyan-700 hover:underline">Edit</button>
                  <button className="text-rose-700 hover:underline">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}


