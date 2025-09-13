"use client";
import React, { useState, useEffect } from "react";

interface ProductDemo {
  _id: string;
  customerType: 'new' | 'existing';
  contactDetails: {
    name: string;
    phone: string;
    email: string;
    company?: string;
    location?: string;
  };
  interestedIn: string[];
  requestType: 'productDemo' | 'enquiryPricing';
  notes?: string;
  status: 'pending' | 'contacted' | 'demo_scheduled' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export default function AdminProductsPage() {
  const [productDemos, setProductDemos] = useState<ProductDemo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'existing'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'contacted' | 'demo_scheduled' | 'completed' | 'cancelled'>('all');
  const [selectedDemo, setSelectedDemo] = useState<ProductDemo | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    fetchProductDemos();
  }, []);

  const fetchProductDemos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/product-demo');
      if (response.ok) {
        const data = await response.json();
        setProductDemos(data.productDemos || []);
      }
    } catch (error) {
      console.error('Error fetching product demos:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProductDemo = async (id: string) => {
    if (!confirm('Are you sure you want to delete this request?')) return;
    
    try {
      const response = await fetch(`/api/product-demo?id=${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setProductDemos(prev => prev.filter(demo => demo._id !== id));
      }
    } catch (error) {
      console.error('Error deleting product demo:', error);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      // For now, we'll just update locally. You can add a PUT endpoint later
      setProductDemos(prev => 
        prev.map(demo => 
          demo._id === id ? { ...demo, status: newStatus as any } : demo
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredDemos = productDemos.filter(demo => {
    if (filter !== 'all' && demo.customerType !== filter) return false;
    if (statusFilter !== 'all' && demo.status !== statusFilter) return false;
    return true;
  });

  const stats = {
    total: productDemos.length,
    newCustomers: productDemos.filter(d => d.customerType === 'new').length,
    existingCustomers: productDemos.filter(d => d.customerType === 'existing').length,
    pending: productDemos.filter(d => d.status === 'pending').length,
    contacted: productDemos.filter(d => d.status === 'contacted').length,
    demoScheduled: productDemos.filter(d => d.status === 'demo_scheduled').length,
    completed: productDemos.filter(d => d.status === 'completed').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'demo_scheduled': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCustomerTypeColor = (type: string) => {
    return type === 'new' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
  };

  const handleViewDemo = (demo: ProductDemo) => {
    setSelectedDemo(demo);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedDemo(null);
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Product Demo Requests</h1>
        <button 
          onClick={fetchProductDemos}
          className="px-3 py-2 rounded-lg bg-cyan-600 text-white text-sm shadow hover:shadow-md"
        >
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border bg-white p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 to-blue-100 opacity-50" />
          <div className="relative">
            <div className="text-sm text-gray-500">Total Requests</div>
            <div className="mt-1 text-2xl font-semibold">{stats.total}</div>
          </div>
        </div>
        <div className="rounded-xl border bg-white p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100 opacity-50" />
          <div className="relative">
            <div className="text-sm text-gray-500">New Customers</div>
            <div className="mt-1 text-2xl font-semibold">{stats.newCustomers}</div>
          </div>
        </div>
        <div className="rounded-xl border bg-white p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 opacity-50" />
          <div className="relative">
            <div className="text-sm text-gray-500">Existing Customers</div>
            <div className="mt-1 text-2xl font-semibold">{stats.existingCustomers}</div>
          </div>
        </div>
        <div className="rounded-xl border bg-white p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100 opacity-50" />
          <div className="relative">
            <div className="text-sm text-gray-500">Pending</div>
            <div className="mt-1 text-2xl font-semibold">{stats.pending}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div>
          <label className="text-sm font-medium text-gray-700">Customer Type:</label>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value as any)}
            className="ml-2 px-3 py-1 border rounded-md text-sm"
          >
            <option value="all">All</option>
            <option value="new">New Customers</option>
            <option value="existing">Existing Customers</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Status:</label>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="ml-2 px-3 py-1 border rounded-md text-sm"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="demo_scheduled">Demo Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Requests Table */}
      <div className="rounded-xl border bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Demo Requests ({filteredDemos.length})</h2>
        </div>
        
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="px-3 py-3 font-medium">Customer</th>
                  <th className="px-3 py-3 font-medium">Type</th>
                  <th className="px-3 py-3 font-medium">Products</th>
                  <th className="px-3 py-3 font-medium">Request</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-3 py-3 font-medium">Date</th>
                  <th className="px-3 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDemos.map((demo) => (
                  <tr key={demo._id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-3">
                      <div>
                        <div className="font-medium">{demo.contactDetails.name}</div>
                        <div className="text-xs text-gray-500">{demo.contactDetails.email}</div>
                        <div className="text-xs text-gray-500">{demo.contactDetails.phone}</div>
                        {demo.contactDetails.company && (
                          <div className="text-xs text-gray-500">{demo.contactDetails.company}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs ${getCustomerTypeColor(demo.customerType)}`}>
                        {demo.customerType === 'new' ? 'New' : 'Existing'}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-1">
                        {demo.interestedIn.map((product) => (
                          <span key={product} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {product}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-xs">
                        {demo.requestType === 'productDemo' ? 'Demo' : 'Pricing'}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <select 
                        value={demo.status} 
                        onChange={(e) => updateStatus(demo._id, e.target.value)}
                        className={`text-xs rounded px-2 py-1 border-0 ${getStatusColor(demo.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="demo_scheduled">Demo Scheduled</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-3 py-3">
                      <div className="text-xs text-gray-500">
                        {new Date(demo.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleViewDemo(demo)}
                          className="text-cyan-700 hover:underline text-xs"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => deleteProductDemo(demo._id)}
                          className="text-red-700 hover:underline text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredDemos.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No demo requests found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Interest Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-white p-5">
          <h2 className="text-lg font-semibold mb-4">Product Interest Summary</h2>
          <div className="space-y-3">
            {['EMS', 'SMA', 'MMA', 'QMS'].map((product) => {
              const count = productDemos.filter(demo => demo.interestedIn.includes(product)).length;
              return (
                <div key={product} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-cyan-500" />
                    <span className="text-sm">{product}</span>
                  </div>
                  <span className="text-xs text-gray-500">{count} requests</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <h2 className="text-lg font-semibold mb-4">Status Distribution</h2>
          <div className="space-y-3">
            {[
              { status: 'Pending', count: stats.pending, color: 'bg-yellow-500' },
              { status: 'Contacted', count: stats.contacted, color: 'bg-blue-500' },
              { status: 'Demo Scheduled', count: stats.demoScheduled, color: 'bg-purple-500' },
              { status: 'Completed', count: stats.completed, color: 'bg-green-500' },
            ].map((item) => (
              <div key={item.status} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-sm">{item.status}</span>
                </div>
                <span className="text-xs text-gray-500">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && selectedDemo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Demo Request Details</h2>
                <button
                  onClick={closeViewModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Customer Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Name</label>
                      <p className="text-gray-900">{selectedDemo.contactDetails.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-gray-900">{selectedDemo.contactDetails.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Phone</label>
                      <p className="text-gray-900">{selectedDemo.contactDetails.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Customer Type</label>
                      <span className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getCustomerTypeColor(selectedDemo.customerType)}`}>
                        {selectedDemo.customerType === 'new' ? 'New Customer' : 'Existing Customer'}
                      </span>
                    </div>
                    {selectedDemo.contactDetails.company && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Company</label>
                        <p className="text-gray-900">{selectedDemo.contactDetails.company}</p>
                      </div>
                    )}
                    {selectedDemo.contactDetails.location && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Location</label>
                        <p className="text-gray-900">{selectedDemo.contactDetails.location}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Request Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Request Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Request Type</label>
                      <p className="text-gray-900">
                        {selectedDemo.requestType === 'productDemo' ? 'Product Demo' : 'Pricing Enquiry'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <span className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(selectedDemo.status)}`}>
                        {selectedDemo.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Submitted Date</label>
                      <p className="text-gray-900">
                        {new Date(selectedDemo.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Last Updated</label>
                      <p className="text-gray-900">
                        {new Date(selectedDemo.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Product Interests */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDemo.interestedIn.map((product) => (
                      <span key={product} className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Additional Notes */}
                {selectedDemo.notes && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Notes</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedDemo.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    onClick={closeViewModal}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedDemo.contactDetails.email);
                      alert('Email copied to clipboard!');
                    }}
                    className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                  >
                    Copy Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}