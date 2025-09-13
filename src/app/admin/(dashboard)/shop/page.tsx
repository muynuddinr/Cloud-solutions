"use client";
import React, { useState, useEffect } from "react";

interface ShopQuote {
  _id: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  pcTypes: string[];
  usageTypes: string[];
  status: 'pending' | 'quoted' | 'followed_up' | 'completed' | 'cancelled';
  quoteAmount?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// PC Type labels for display
const pcTypeLabels: { [key: string]: string } = {
  desktop: "Desktop PC",
  laptop: "Laptop / Notebook",
  gaming: "Gaming PC",
  workstation: "Workstation PC",
  allInOne: "All-in-One PC",
  mini: "Mini PC",
  server: "Server PC"
};

// Usage Type labels for display
const usageTypeLabels: { [key: string]: string } = {
  basic: "Basic Use",
  business: "Business & Office",
  education: "Education / Student",
  creative: "Design & Creative",
  gamingCasual: "Gaming – Casual",
  gamingMid: "Gaming – Mid-Range",
  gamingHigh: "Gaming – High-End",
  professional: "Workstation / Professional",
  serverEnterprise: "Server & Enterprise",
  travel: "Travel & Portability"
};

export default function AdminShopPage() {
  const [shopQuotes, setShopQuotes] = useState<ShopQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'quoted' | 'followed_up' | 'completed' | 'cancelled'>('all');
  const [selectedQuote, setSelectedQuote] = useState<ShopQuote | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    fetchShopQuotes();
  }, []);

  const fetchShopQuotes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/shop-quote');
      if (response.ok) {
        const data = await response.json();
        setShopQuotes(data.shopQuotes || []);
      }
    } catch (error) {
      console.error('Error fetching shop quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteShopQuote = async (id: string) => {
    if (!confirm('Are you sure you want to delete this quote request?')) return;
    
    try {
      const response = await fetch(`/api/shop-quote?id=${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setShopQuotes(prev => prev.filter(quote => quote._id !== id));
      }
    } catch (error) {
      console.error('Error deleting shop quote:', error);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      // For now, we'll just update locally. You can add a PUT endpoint later
      setShopQuotes(prev => 
        prev.map(quote => 
          quote._id === id ? { ...quote, status: newStatus as any } : quote
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredQuotes = shopQuotes.filter(quote => {
    if (statusFilter !== 'all' && quote.status !== statusFilter) return false;
    return true;
  });

  const stats = {
    total: shopQuotes.length,
    pending: shopQuotes.filter(q => q.status === 'pending').length,
    quoted: shopQuotes.filter(q => q.status === 'quoted').length,
    followedUp: shopQuotes.filter(q => q.status === 'followed_up').length,
    completed: shopQuotes.filter(q => q.status === 'completed').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'quoted': return 'bg-blue-100 text-blue-800';
      case 'followed_up': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewQuote = (quote: ShopQuote) => {
    setSelectedQuote(quote);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedQuote(null);
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Shop Quote Requests</h1>
        <button 
          onClick={fetchShopQuotes}
          className="px-3 py-2 rounded-lg bg-cyan-600 text-white text-sm shadow hover:shadow-md"
        >
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="rounded-xl border bg-white p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 to-blue-100 opacity-50" />
          <div className="relative">
            <div className="text-sm text-gray-500">Total Requests</div>
            <div className="mt-1 text-2xl font-semibold">{stats.total}</div>
          </div>
        </div>
        <div className="rounded-xl border bg-white p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-orange-100 opacity-50" />
          <div className="relative">
            <div className="text-sm text-gray-500">Pending</div>
            <div className="mt-1 text-2xl font-semibold">{stats.pending}</div>
          </div>
        </div>
        <div className="rounded-xl border bg-white p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 opacity-50" />
          <div className="relative">
            <div className="text-sm text-gray-500">Quoted</div>
            <div className="mt-1 text-2xl font-semibold">{stats.quoted}</div>
          </div>
        </div>
        <div className="rounded-xl border bg-white p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 opacity-50" />
          <div className="relative">
            <div className="text-sm text-gray-500">Followed Up</div>
            <div className="mt-1 text-2xl font-semibold">{stats.followedUp}</div>
          </div>
        </div>
        <div className="rounded-xl border bg-white p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100 opacity-50" />
          <div className="relative">
            <div className="text-sm text-gray-500">Completed</div>
            <div className="mt-1 text-2xl font-semibold">{stats.completed}</div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-4 items-center">
        <div>
          <label className="text-sm font-medium text-gray-700">Status:</label>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="ml-2 px-3 py-1 border rounded-md text-sm"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="quoted">Quoted</option>
            <option value="followed_up">Followed Up</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="rounded-xl border bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Quote Requests ({filteredQuotes.length})</h2>
        </div>
        
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="px-3 py-3 font-medium">Customer</th>
                  <th className="px-3 py-3 font-medium">PC Types</th>
                  <th className="px-3 py-3 font-medium">Usage Types</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-3 py-3 font-medium">Date</th>
                  <th className="px-3 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotes.map((quote) => (
                  <tr key={quote._id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-3">
                      <div>
                        <div className="font-medium">{quote.contactInfo.name}</div>
                        <div className="text-xs text-gray-500">{quote.contactInfo.email}</div>
                        <div className="text-xs text-gray-500">{quote.contactInfo.phone}</div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-1">
                        {quote.pcTypes.slice(0, 2).map((type) => (
                          <span key={type} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {pcTypeLabels[type] || type}
                          </span>
                        ))}
                        {quote.pcTypes.length > 2 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            +{quote.pcTypes.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-1">
                        {quote.usageTypes.slice(0, 2).map((type) => (
                          <span key={type} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            {usageTypeLabels[type] || type}
                          </span>
                        ))}
                        {quote.usageTypes.length > 2 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            +{quote.usageTypes.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <select 
                        value={quote.status} 
                        onChange={(e) => updateStatus(quote._id, e.target.value)}
                        className={`text-xs rounded px-2 py-1 border-0 ${getStatusColor(quote.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="quoted">Quoted</option>
                        <option value="followed_up">Followed Up</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-3 py-3">
                      <div className="text-xs text-gray-500">
                        {new Date(quote.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleViewQuote(quote)}
                          className="text-cyan-700 hover:underline text-xs"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => deleteShopQuote(quote._id)}
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
            
            {filteredQuotes.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No quote requests found
              </div>
            )}
          </div>
        )}
      </div>

      {/* PC Type and Usage Type Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-white p-5">
          <h2 className="text-lg font-semibold mb-4">PC Type Popularity</h2>
          <div className="space-y-3">
            {Object.entries(pcTypeLabels).map(([key, label]) => {
              const count = shopQuotes.filter(quote => quote.pcTypes.includes(key)).length;
              return (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-sm">{label}</span>
                  </div>
                  <span className="text-xs text-gray-500">{count} requests</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <h2 className="text-lg font-semibold mb-4">Usage Type Popularity</h2>
          <div className="space-y-3">
            {Object.entries(usageTypeLabels).map(([key, label]) => {
              const count = shopQuotes.filter(quote => quote.usageTypes.includes(key)).length;
              return (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm">{label}</span>
                  </div>
                  <span className="text-xs text-gray-500">{count} requests</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && selectedQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Quote Request Details</h2>
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
                      <p className="text-gray-900">{selectedQuote.contactInfo.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-gray-900">{selectedQuote.contactInfo.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Phone</label>
                      <p className="text-gray-900">{selectedQuote.contactInfo.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <span className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(selectedQuote.status)}`}>
                        {selectedQuote.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                  </div>
                </div>

                {/* PC Types */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">PC Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedQuote.pcTypes.map((type) => (
                      <span key={type} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {pcTypeLabels[type] || type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Usage Types */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Usage Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedQuote.usageTypes.map((type) => (
                      <span key={type} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {usageTypeLabels[type] || type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Request Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Request Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Submitted Date</label>
                      <p className="text-gray-900">
                        {new Date(selectedQuote.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Last Updated</label>
                      <p className="text-gray-900">
                        {new Date(selectedQuote.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

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
                      navigator.clipboard.writeText(selectedQuote.contactInfo.email);
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