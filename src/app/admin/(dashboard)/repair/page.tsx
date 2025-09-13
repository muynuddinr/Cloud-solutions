"use client";
import React, { useState, useEffect } from "react";

interface Repair {
  _id: string;
  customerType: 'new' | 'existing';
  customerDetails: {
    name: string;
    phone: string;
    email?: string;
    address?: string;
  };
  deviceDetails: {
    deviceType: string;
    brandModel: string;
    serialNumber?: string;
  };
  issues: string[];
  otherIssue?: string;
  preferredService: 'bringToCenter' | 'requestHomeService';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

interface RepairStats {
  total: number;
  pending: number;
  in_progress: number;
  completed: number;
  cancelled: number;
}

export default function AdminRepairPage() {
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [stats, setStats] = useState<RepairStats>({
    total: 0,
    pending: 0,
    in_progress: 0,
    completed: 0,
    cancelled: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRepair, setSelectedRepair] = useState<Repair | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRepairs();
  }, []);

  const fetchRepairs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/repair');
      const data = await response.json();
      
      if (data.success) {
        setRepairs(data.data.repairs);
        setStats(data.data.statistics);
      } else {
        setError(data.message || 'Failed to fetch repairs');
      }
    } catch (err) {
      setError('Failed to fetch repairs');
      console.error('Error fetching repairs:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return "bg-emerald-100 text-emerald-700";
      case 'in_progress':
        return "bg-amber-100 text-amber-700";
      case 'pending':
        return "bg-blue-100 text-blue-700";
      case 'cancelled':
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const newCustomers = repairs.filter(repair => repair.customerType === 'new').length;
  const existingCustomers = repairs.filter(repair => repair.customerType === 'existing').length;

  const handleViewRepair = (repair: Repair) => {
    setSelectedRepair(repair);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRepair(null);
  };

  if (loading) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading repairs...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={fetchRepairs}
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Repair Services</h1>
        <button 
          onClick={fetchRepairs}
          className="px-3 py-2 rounded-lg bg-cyan-600 text-white text-sm shadow hover:shadow-md"
        >
          Refresh Data
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Repairs", value: stats.total, color: "from-cyan-100 to-blue-100" },
          { label: "New Customers", value: newCustomers, color: "from-green-100 to-emerald-100" },
          { label: "Existing Customers", value: existingCustomers, color: "from-purple-100 to-indigo-100" },
          { label: "Pending Repairs", value: stats.pending, color: "from-amber-100 to-orange-100" },
          { label: "In Progress", value: stats.in_progress, color: "from-yellow-100 to-amber-100" },
          { label: "Completed", value: stats.completed, color: "from-emerald-100 to-teal-100" },
        ].map((card) => (
          <div key={card.label} className="rounded-xl border bg-white p-5 relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-50`} />
            <div className="relative">
              <div className="text-sm text-gray-500">{card.label}</div>
              <div className="mt-1 text-2xl font-semibold">{card.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-white p-5">
        <h2 className="text-lg font-semibold mb-4">Recent Repair Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="px-3 py-2 font-medium">Request ID</th>
                <th className="px-3 py-2 font-medium">Customer</th>
                <th className="px-3 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">Device</th>
                <th className="px-3 py-2 font-medium">Issues</th>
                <th className="px-3 py-2 font-medium">Service</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium">Date</th>
                <th className="px-3 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {repairs.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-3 py-8 text-center text-gray-500">
                    No repair requests found
                  </td>
                </tr>
              ) : (
                repairs.map((repair) => (
                  <tr key={repair._id} className="border-t">
                    <td className="px-3 py-2">#{repair._id.slice(-6).toUpperCase()}</td>
                    <td className="px-3 py-2">
                      <div>
                        <div className="font-medium">{repair.customerDetails.name}</div>
                        <div className="text-xs text-gray-500">{repair.customerDetails.phone}</div>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`rounded-full px-2 py-1 text-xs ${
                        repair.customerType === 'new' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {repair.customerType === 'new' ? 'New' : 'Existing'}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <div>
                        <div className="font-medium">{repair.deviceDetails.deviceType}</div>
                        <div className="text-xs text-gray-500">{repair.deviceDetails.brandModel}</div>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="max-w-xs">
                        <div className="text-xs text-gray-600">
                          {repair.issues.slice(0, 2).join(', ')}
                          {repair.issues.length > 2 && ` +${repair.issues.length - 2} more`}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <span className="text-xs text-gray-600">
                        {repair.preferredService === 'bringToCenter' ? 'Center' : 'Home'}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`rounded-full px-2 py-1 text-xs ${getStatusColor(repair.status)}`}>
                        {repair.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-3 py-2">{formatDate(repair.createdAt)}</td>
                    <td className="px-3 py-2">
                      <button 
                        onClick={() => handleViewRepair(repair)}
                        className="text-cyan-700 hover:underline text-xs"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-white p-5">
          <h2 className="text-lg font-semibold mb-4">Customer Types</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium">New Customers</span>
              <span className="text-sm text-green-600 font-semibold">{newCustomers}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium">Existing Customers</span>
              <span className="text-sm text-blue-600 font-semibold">{existingCustomers}</span>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              "Refresh Data",
              "Export Reports",
              "Update Status",
              "View Details",
            ].map((action) => (
              <button 
                key={action} 
                onClick={action === "Refresh Data" ? fetchRepairs : undefined}
                className="rounded-lg border px-3 py-2 text-sm bg-white hover:bg-gray-50"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Repair Details Modal */}
      {showModal && selectedRepair && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Repair Request Details</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Customer Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Customer Type</label>
                      <div className="mt-1">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                          selectedRepair.customerType === 'new' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {selectedRepair.customerType === 'new' ? 'New Customer' : 'Existing Customer'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Name</label>
                      <p className="mt-1 text-gray-900">{selectedRepair.customerDetails.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Phone</label>
                      <p className="mt-1 text-gray-900">{selectedRepair.customerDetails.phone}</p>
                    </div>
                    {selectedRepair.customerDetails.email && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <p className="mt-1 text-gray-900">{selectedRepair.customerDetails.email}</p>
                      </div>
                    )}
                    {selectedRepair.customerDetails.address && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Address</label>
                        <p className="mt-1 text-gray-900">{selectedRepair.customerDetails.address}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Device Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Device Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Device Type</label>
                      <p className="mt-1 text-gray-900">{selectedRepair.deviceDetails.deviceType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Brand & Model</label>
                      <p className="mt-1 text-gray-900">{selectedRepair.deviceDetails.brandModel}</p>
                    </div>
                    {selectedRepair.deviceDetails.serialNumber && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Serial Number</label>
                        <p className="mt-1 text-gray-900 font-mono text-sm">{selectedRepair.deviceDetails.serialNumber}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Issues */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Reported Issues</h3>
                  <div className="space-y-2">
                    {selectedRepair.issues.map((issue, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span className="text-gray-900">{issue}</span>
                      </div>
                    ))}
                    {selectedRepair.otherIssue && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <label className="text-sm font-medium text-gray-500">Additional Details</label>
                        <p className="mt-1 text-gray-900 text-sm">{selectedRepair.otherIssue}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Service & Status */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Service Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Preferred Service</label>
                      <p className="mt-1 text-gray-900">
                        {selectedRepair.preferredService === 'bringToCenter' 
                          ? 'Bring to Service Center' 
                          : 'Request Home Service'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Status</label>
                      <div className="mt-1">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedRepair.status)}`}>
                          {selectedRepair.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Request Date</label>
                      <p className="mt-1 text-gray-900">{formatDate(selectedRepair.createdAt)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Last Updated</label>
                      <p className="mt-1 text-gray-900">{formatDate(selectedRepair.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Here you can add functionality to update status
                    console.log('Update status for repair:', selectedRepair._id);
                  }}
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
