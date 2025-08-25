"use client";

import React, { useState, useEffect } from "react";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/contact?includeMessage=true');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch contacts');
      }
      
      setContacts(data.contacts || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    
    try {
      const response = await fetch(`/api/contact?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }
      
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (err) {
      alert('Failed to delete contact');
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

  const openModal = (contact: Contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  if (loading) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Contact Messages</h1>
        </div>
        <div className="rounded-xl border bg-white p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading contacts...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Contact Messages</h1>
        </div>
        <div className="rounded-xl border bg-white p-8 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchContacts}
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
        <h1 className="text-2xl font-bold">Contact Messages</h1>
        <div className="flex gap-2">
          <button 
            onClick={fetchContacts}
            className="px-3 py-2 rounded-lg border bg-white text-sm hover:bg-gray-50"
          >
            Refresh
          </button>
          <button className="px-3 py-2 rounded-lg border bg-white text-sm hover:bg-gray-50">
            Export CSV
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-5 overflow-x-auto">
        {contacts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No contact messages yet.</p>
          </div>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="px-3 py-2 font-medium">Name</th>
                <th className="px-3 py-2 font-medium">Email</th>
                <th className="px-3 py-2 font-medium">Subject</th>
                <th className="px-3 py-2 font-medium">Received</th>
                <th className="px-3 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id} className="border-t hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium">{contact.name}</td>
                  <td className="px-3 py-2">{contact.email}</td>
                  <td className="px-3 py-2">
                    {contact.subject || <span className="text-gray-400">No subject</span>}
                  </td>
                  <td className="px-3 py-2 text-gray-600">
                    {formatDate(contact.createdAt)}
                  </td>
                  <td className="px-3 py-2 space-x-2">
                    <button 
                      onClick={() => openModal(contact)}
                      className="text-cyan-700 hover:underline"
                    >
                      View
                    </button>
                    <button className="text-emerald-700 hover:underline">Mark Resolved</button>
                    <button 
                      onClick={() => handleDelete(contact._id)}
                      className="text-rose-700 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Contact Details</h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-gray-900">{selectedContact.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-900">{selectedContact.email}</p>
              </div>
              
              {selectedContact.phone && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="mt-1 text-gray-900">{selectedContact.phone}</p>
                </div>
              )}
              
              {selectedContact.subject && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject</label>
                  <p className="mt-1 text-gray-900">{selectedContact.subject}</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg text-gray-900 whitespace-pre-wrap">
                  {selectedContact.message}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Received</label>
                <p className="mt-1 text-gray-900">{formatDate(selectedContact.createdAt)}</p>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button 
                onClick={() => window.open(`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject || 'Your inquiry'}`)}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
              >
                Reply via Email
              </button>
              <button 
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-xl border bg-white p-5">
        <h2 className="text-lg font-semibold">Auto-Reply Template</h2>
        <p className="text-sm text-gray-600 mt-1">Customize the email sent as an instant acknowledgment.</p>
        <div className="mt-4 space-y-3">
          <input className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="Subject" defaultValue="We received your message" />
          <textarea
            className="w-full rounded-lg border px-3 py-2 text-sm h-32"
            placeholder="Message"
            defaultValue={`Hi {{name}},\n\nThanks for contacting Cloud IT Solution. Our team will get back to you shortly.\n\nBest,\nSupport Team`}
          />
          <div>
            <button className="px-3 py-2 rounded-lg bg-cyan-600 text-white text-sm">Save Template</button>
          </div>
        </div>
      </div>
    </section>
  );
}


