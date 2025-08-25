"use client";

import React, { useState, useEffect } from "react";

interface Subscriber {
  _id: string;
  email: string;
  status: 'active' | 'pending' | 'unsubscribed';
  subscribedAt: string;
  updatedAt: string;
}

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newEmail, setNewEmail] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/newsletter');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch subscribers');
      }
      
      setSubscribers(data.subscribers || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch subscribers');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    setIsAdding(true);
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newEmail.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setNewEmail('');
        fetchSubscribers();
        alert('Subscriber added successfully!');
      } else {
        alert(data.error || 'Failed to add subscriber');
      }
    } catch (error) {
      alert('Failed to add subscriber');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this subscriber?')) return;
    
    try {
      const response = await fetch(`/api/newsletter?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove subscriber');
      }
      
      setSubscribers(subscribers.filter(subscriber => subscriber._id !== id));
    } catch (err) {
      alert('Failed to remove subscriber');
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'active' | 'pending' | 'unsubscribed') => {
    try {
      const response = await fetch(`/api/newsletter?id=${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setSubscribers(subscribers.map(subscriber => 
        subscriber._id === id 
          ? { ...subscriber, status: newStatus }
          : subscriber
      ));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-700';
      case 'pending':
        return 'bg-sky-100 text-sky-700';
      case 'unsubscribed':
        return 'bg-slate-100 text-slate-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Newsletter</h1>
        </div>
        <div className="rounded-xl border bg-white p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading subscribers...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Newsletter</h1>
        </div>
        <div className="rounded-xl border bg-white p-8 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchSubscribers}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Newsletter</h1>
        <div className="flex gap-2">
          <button 
            onClick={fetchSubscribers}
            className="px-3 py-2 rounded-lg border bg-white text-sm hover:bg-gray-50"
          >
            Refresh
          </button>
          <button className="px-3 py-2 rounded-lg bg-cyan-600 text-white text-sm shadow hover:shadow-md">
            Create Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-xl border bg-white p-5 lg:col-span-2">
          <h2 className="text-lg font-semibold">Subscribers ({subscribers.length})</h2>
          <div className="mt-4 overflow-x-auto">
            {subscribers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No subscribers yet.</p>
              </div>
            ) : (
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="px-3 py-2 font-medium">Email</th>
                    <th className="px-3 py-2 font-medium">Status</th>
                    <th className="px-3 py-2 font-medium">Joined</th>
                    <th className="px-3 py-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((subscriber) => (
                    <tr key={subscriber._id} className="border-t hover:bg-gray-50">
                      <td className="px-3 py-2 font-medium">{subscriber.email}</td>
                      <td className="px-3 py-2">
                        <select
                          value={subscriber.status}
                          onChange={(e) => handleStatusChange(subscriber._id, e.target.value as any)}
                          className={`rounded-full px-2 py-1 text-xs border-0 ${getStatusColor(subscriber.status)}`}
                        >
                          <option value="active">Active</option>
                          <option value="pending">Pending</option>
                          <option value="unsubscribed">Unsubscribed</option>
                        </select>
                      </td>
                      <td className="px-3 py-2 text-gray-600">
                        {formatDate(subscriber.subscribedAt)}
                      </td>
                      <td className="px-3 py-2 space-x-2">
                        <button 
                          onClick={() => handleDelete(subscriber._id)}
                          className="text-rose-700 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <h2 className="text-lg font-semibold">Quick Add</h2>
          <form onSubmit={handleAddSubscriber} className="mt-3 space-y-3">
            <input 
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm" 
              placeholder="Email address"
              disabled={isAdding}
            />
            <button 
              type="submit"
              disabled={isAdding || !newEmail.trim()}
              className="px-3 py-2 rounded-lg bg-cyan-600 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdding ? 'Adding...' : 'Add Subscriber'}
            </button>
          </form>

          <div className="mt-6">
            <h3 className="text-sm font-semibold">Import CSV</h3>
            <div className="mt-2 flex items-center gap-3">
              <input type="file" className="text-sm" accept=".csv" />
              <button className="px-3 py-2 rounded-lg border bg-white text-sm hover:bg-gray-50">
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-5">
        <h2 className="text-lg font-semibold">Templates</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["Announcement", "Weekly Digest", "Sale"].map((name) => (
            <div key={name} className="rounded-lg border p-4">
              <div className="h-24 rounded bg-gray-100 mb-3" />
              <div className="font-medium">{name}</div>
              <button className="mt-3 text-sm text-cyan-700 hover:underline">Use Template</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


