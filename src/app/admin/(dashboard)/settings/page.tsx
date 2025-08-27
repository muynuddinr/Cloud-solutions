import React from "react";

export default function AdminSettingsPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <form className="rounded-xl border bg-white p-5 space-y-4">
          <h2 className="text-lg font-semibold">General</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Site Name</label>
              <input className="w-full rounded-lg border px-3 py-2 text-sm" defaultValue="Cloud IT Solution" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Support Email</label>
              <input className="w-full rounded-lg border px-3 py-2 text-sm" defaultValue="cloudsolutions1@gmail.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Primary Color</label>
            <input type="color" className="w-16 h-10 p-1 rounded-lg border" defaultValue="#06b6d4" />
          </div>
          <div className="pt-2">
            <button className="px-3 py-2 rounded-lg bg-cyan-600 text-white text-sm">Save Changes</button>
          </div>
        </form>

        <div className="rounded-xl border bg-white p-5">
          <h2 className="text-lg font-semibold">Danger Zone</h2>
          <p className="text-sm text-gray-600 mt-1">Irreversible actions, handle with care.</p>
          <div className="mt-4">
            <button className="px-3 py-2 rounded-lg bg-rose-600 text-white text-sm">Delete All Data</button>
          </div>
        </div>
      </div>
    </section>
  );
}


