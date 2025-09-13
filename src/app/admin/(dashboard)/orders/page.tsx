"use client";
import React, { useState, useEffect } from "react";

type Order = {
  orderId: string;
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discount: number;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmark: string;
  };
  orderDate: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/orders?includeDetails=true');
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      
      const data = await response.json();
      setOrders(data.orders || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders?orderId=${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderStatus: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      const updatedOrders = orders.map(order => 
        order.orderId === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
    } catch (err) {
      console.error('Error updating order status:', err);
      alert(`Failed to update order status: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handlePaymentStatusChange = async (orderId: string, newPaymentStatus: string) => {
    try {
      const response = await fetch(`/api/orders?orderId=${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentStatus: newPaymentStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update payment status');
      }

      const updatedOrders = orders.map(order => 
        order.orderId === orderId ? { ...order, paymentStatus: newPaymentStatus } : order
      );
      setOrders(updatedOrders);
    } catch (err) {
      console.error('Error updating payment status:', err);
      alert(`Failed to update payment status: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this order? This action cannot be undone.');
      if (!confirmDelete) return;

      const response = await fetch(`/api/orders?orderId=${orderId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete order');
      }

      setOrders(prev => prev.filter(order => order.orderId !== orderId));
    } catch (err) {
      console.error('Error deleting order:', err);
      alert(`Failed to delete order: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-700';
      case 'Processing':
        return 'bg-blue-100 text-blue-700';
      case 'Shipped':
        return 'bg-purple-100 text-purple-700';
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-orange-100 text-orange-700';
      case 'Paid':
        return 'bg-green-100 text-green-700';
      case 'Failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="text-sm text-gray-600">
          Total Orders: {orders.length}
        </div>
      </div>

      {loading ? (
        <div className="rounded-xl border bg-white p-8 text-center">
          <div className="text-6xl mb-4">⚙️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Orders...</h3>
          <p className="text-gray-600">Please wait while we fetch the latest orders.</p>
        </div>
      ) : error ? (
        <div className="rounded-xl border bg-white p-8 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error: {error}</h3>
          <p className="text-gray-600">Failed to load orders. Please try again later.</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Yet</h3>
          <p className="text-gray-600">Orders will appear here once customers place them.</p>
        </div>
      ) : (
        <div className="rounded-xl border bg-white p-5 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="px-3 py-2 font-medium">Order ID</th>
                <th className="px-3 py-2 font-medium">Customer</th>
                <th className="px-3 py-2 font-medium">Product</th>
                <th className="px-3 py-2 font-medium">Quantity</th>
                <th className="px-3 py-2 font-medium">Total</th>
                <th className="px-3 py-2 font-medium">Order Status</th>
                <th className="px-3 py-2 font-medium">Payment</th>
                <th className="px-3 py-2 font-medium">Date</th>
                <th className="px-3 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId} className="border-t hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium">#{order.orderId}</td>
                  <td className="px-3 py-2">
                    <div>
                      <div className="font-medium">{order.customerInfo.firstName} {order.customerInfo.lastName}</div>
                      <div className="text-xs text-gray-500">{order.customerInfo.email}</div>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <img
                        src={order.productImage}
                        alt={order.productName}
                        className="w-8 h-8 object-cover rounded"
                      />
                      <span className="max-w-32 truncate">{order.productName}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2">{order.quantity}</td>
                  <td className="px-3 py-2 font-medium">₹{order.totalPrice.toLocaleString()}</td>
                  <td className="px-3 py-2">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                      className={`rounded-full px-2 py-1 text-xs border-0 ${getStatusColor(order.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-3 py-2">
                    <select
                      value={order.paymentStatus}
                      onChange={(e) => handlePaymentStatusChange(order.orderId, e.target.value)}
                      className={`rounded-full px-2 py-1 text-xs border-0 ${getPaymentStatusColor(order.paymentStatus)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </td>
                  <td className="px-3 py-2 text-gray-600">
                    {new Date(order.orderDate).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowModal(true);
                      }}
                      className="text-sky-600 hover:text-sky-700 text-xs font-medium"
                    >
                      View Details
                    </button>
                    <span className="mx-2 text-gray-300">|</span>
                    <button
                      onClick={() => handleDeleteOrder(order.orderId)}
                      className="text-red-600 hover:text-red-700 text-xs font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Order Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Order Information</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Order ID:</span> #{selectedOrder.orderId}</p>
                    <p><span className="text-gray-600">Date:</span> {new Date(selectedOrder.orderDate).toLocaleString('en-IN')}</p>
                    <p><span className="text-gray-600">Payment Method:</span> {selectedOrder.paymentMethod}</p>
                    <p><span className="text-gray-600">Payment Status:</span> {selectedOrder.paymentStatus}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Product Details</h3>
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedOrder.productImage}
                      alt={selectedOrder.productName}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{selectedOrder.productName}</p>
                      <p className="text-sm text-gray-600">Qty: {selectedOrder.quantity}</p>
                      <p className="text-sm text-gray-600">₹{selectedOrder.unitPrice.toLocaleString()} each</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><span className="text-gray-600">Name:</span> {selectedOrder.customerInfo.firstName} {selectedOrder.customerInfo.lastName}</p>
                    <p><span className="text-gray-600">Email:</span> {selectedOrder.customerInfo.email}</p>
                    <p><span className="text-gray-600">Phone:</span> {selectedOrder.customerInfo.phone}</p>
                  </div>
                  <div>
                    <p><span className="text-gray-600">Address:</span> {selectedOrder.customerInfo.address}</p>
                    <p><span className="text-gray-600">City:</span> {selectedOrder.customerInfo.city}, {selectedOrder.customerInfo.state}</p>
                    <p><span className="text-gray-600">Pincode:</span> {selectedOrder.customerInfo.pincode}</p>
                    {selectedOrder.customerInfo.landmark && (
                      <p><span className="text-gray-600">Landmark:</span> {selectedOrder.customerInfo.landmark}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Amount:</span>
                  <span className="text-2xl font-bold text-green-600">₹{selectedOrder.totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


