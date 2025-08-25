import React from "react";

export default function AdminProductsPage() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <button className="px-3 py-2 rounded-lg bg-cyan-600 text-white text-sm shadow hover:shadow-md">Add Product</button>
      </div>

      <div className="rounded-xl border bg-white p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="rounded-lg border p-4">
              <div className="h-28 rounded bg-gray-100 mb-3" />
              <div className="font-medium">Sample Product {i}</div>
              <div className="text-sm text-gray-500">$ {(20 + i * 3).toFixed(2)}</div>
              <button className="mt-3 text-sm text-cyan-700 hover:underline">Edit</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


