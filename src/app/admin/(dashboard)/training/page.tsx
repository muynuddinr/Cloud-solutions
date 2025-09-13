"use client";
import React, { useState, useEffect } from "react";

interface TrainingEnquiry {
  _id: string;
  contactInfo: {
    name: string;
    phone: string;
    email: string;
    address?: string;
  };
  trainingPrograms: string[];
  preferredFormat: 'inPerson' | 'online' | 'onSite';
  status: 'pending' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  scheduledDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Training Program labels for display
const trainingProgramLabels: { [key: string]: string } = {
  laptop: "Laptop Training",
  pc: "PC / Desktop Training",
  printer: "Printer Training",
  gadget: "Gadget Training",
  corporate: "Corporate / Custom Training"
};

// Format labels for display
const formatLabels: { [key: string]: string } = {
  inPerson: "In-Person (@Center)",
  online: "Online (Live Class)",
  onSite: "On-Site (Business/Institute)"
};

export default function AdminTrainingPage() {
  const [trainingEnquiries, setTrainingEnquiries] = useState<TrainingEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'contacted' | 'scheduled' | 'completed' | 'cancelled'>('all');
  const [formatFilter, setFormatFilter] = useState<'all' | 'inPerson' | 'online' | 'onSite'>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<TrainingEnquiry | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    fetchTrainingEnquiries();
  }, []);

  const fetchTrainingEnquiries = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/training-enquiry');
      if (response.ok) {
        const data = await response.json();
        setTrainingEnquiries(data.trainingEnquiries || []);
      }
    } catch (error) {
      console.error('Error fetching training enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTrainingEnquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this training enquiry?')) return;
    
    try {
      const response = await fetch(`/api/training-enquiry?id=${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setTrainingEnquiries(prev => prev.filter(enquiry => enquiry._id !== id));
      }
    } catch (error) {
      console.error('Error deleting training enquiry:', error);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      // For now, we'll just update locally. You can add a PUT endpoint later
      setTrainingEnquiries(prev => 
        prev.map(enquiry => 
          enquiry._id === id ? { ...enquiry, status: newStatus as any } : enquiry
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredEnquiries = trainingEnquiries.filter(enquiry => {
    if (statusFilter !== 'all' && enquiry.status !== statusFilter) return false;
    if (formatFilter !== 'all' && enquiry.preferredFormat !== formatFilter) return false;
    return true;
  });

  const stats = {
    total: trainingEnquiries.length,
    pending: trainingEnquiries.filter(e => e.status === 'pending').length,
    contacted: trainingEnquiries.filter(e => e.status === 'contacted').length,
    scheduled: trainingEnquiries.filter(e => e.status === 'scheduled').length,
    completed: trainingEnquiries.filter(e => e.status === 'completed').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewEnquiry = (enquiry: TrainingEnquiry) => {
    setSelectedEnquiry(enquiry);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedEnquiry(null);
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Training Enquiries</h1>
        <button 
          onClick={fetchTrainingEnquiries}
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
            <div className="text-sm text-gray-500">Total Enquiries</div>
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
            <div className="text-sm text-gray-500">Contacted</div>
            <div className="mt-1 text-2xl font-semibold">{stats.contacted}</div>
          </div>
        </div>
        <div className="rounded-xl border bg-white p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 opacity-50" />
          <div className="relative">
            <div className="text-sm text-gray-500">Scheduled</div>
            <div className="mt-1 text-2xl font-semibold">{stats.scheduled}</div>
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

      {/* Filters */}
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
            <option value="contacted">Contacted</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Format:</label>
          <select 
            value={formatFilter} 
            onChange={(e) => setFormatFilter(e.target.value as any)}
            className="ml-2 px-3 py-1 border rounded-md text-sm"
          >
            <option value="all">All</option>
            <option value="inPerson">In-Person</option>
            <option value="online">Online</option>
            <option value="onSite">On-Site</option>
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="rounded-xl border bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Training Enquiries ({filteredEnquiries.length})</h2>
        </div>
        
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="px-3 py-3 font-medium">Student</th>
                  <th className="px-3 py-3 font-medium">Programs</th>
                  <th className="px-3 py-3 font-medium">Format</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-3 py-3 font-medium">Date</th>
                  <th className="px-3 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-3">
                      <div>
                        <div className="font-medium">{enquiry.contactInfo.name}</div>
                        <div className="text-xs text-gray-500">{enquiry.contactInfo.email}</div>
                        <div className="text-xs text-gray-500">{enquiry.contactInfo.phone}</div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-1">
                        {enquiry.trainingPrograms.slice(0, 2).map((program) => (
                          <span key={program} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {trainingProgramLabels[program] || program}
                          </span>
                        ))}
                        {enquiry.trainingPrograms.length > 2 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            +{enquiry.trainingPrograms.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {formatLabels[enquiry.preferredFormat] || enquiry.preferredFormat}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <select 
                        value={enquiry.status} 
                        onChange={(e) => updateStatus(enquiry._id, e.target.value)}
                        className={`text-xs rounded px-2 py-1 border-0 ${getStatusColor(enquiry.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-3 py-3">
                      <div className="text-xs text-gray-500">
                        {new Date(enquiry.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleViewEnquiry(enquiry)}
                          className="text-cyan-700 hover:underline text-xs"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => deleteTrainingEnquiry(enquiry._id)}
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
            
            {filteredEnquiries.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No training enquiries found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Program and Format Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-white p-5">
          <h2 className="text-lg font-semibold mb-4">Program Popularity</h2>
          <div className="space-y-3">
            {Object.entries(trainingProgramLabels).map(([key, label]) => {
              const count = trainingEnquiries.filter(enquiry => enquiry.trainingPrograms.includes(key)).length;
              return (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-sm">{label}</span>
                  </div>
                  <span className="text-xs text-gray-500">{count} enquiries</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <h2 className="text-lg font-semibold mb-4">Format Preference</h2>
          <div className="space-y-3">
            {Object.entries(formatLabels).map(([key, label]) => {
              const count = trainingEnquiries.filter(enquiry => enquiry.preferredFormat === key).length;
              return (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm">{label}</span>
                  </div>
                  <span className="text-xs text-gray-500">{count} enquiries</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && selectedEnquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Training Enquiry Details</h2>
                <button
                  onClick={closeViewModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Student Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Student Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Name</label>
                      <p className="text-gray-900">{selectedEnquiry.contactInfo.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-gray-900">{selectedEnquiry.contactInfo.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Phone</label>
                      <p className="text-gray-900">{selectedEnquiry.contactInfo.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <span className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(selectedEnquiry.status)}`}>
                        {selectedEnquiry.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                    {selectedEnquiry.contactInfo.address && (
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-gray-600">Address</label>
                        <p className="text-gray-900">{selectedEnquiry.contactInfo.address}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Training Programs */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Training Programs</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedEnquiry.trainingPrograms.map((program) => (
                      <span key={program} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {trainingProgramLabels[program] || program}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Preferred Format */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Preferred Format</h3>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {formatLabels[selectedEnquiry.preferredFormat] || selectedEnquiry.preferredFormat}
                  </span>
                </div>

                {/* Request Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Request Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Submitted Date</label>
                      <p className="text-gray-900">
                        {new Date(selectedEnquiry.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Last Updated</label>
                      <p className="text-gray-900">
                        {new Date(selectedEnquiry.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                {selectedEnquiry.notes && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Notes</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedEnquiry.notes}</p>
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
                      navigator.clipboard.writeText(selectedEnquiry.contactInfo.email);
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