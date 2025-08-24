"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";

function OrderSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const orderId = searchParams.get('orderId');

  useEffect(() => {
    setMounted(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('order-success');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (orderId) {
      console.log('OrderSuccess: orderId received:', orderId);
      // Get order from localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      console.log('OrderSuccess: All orders from localStorage:', orders);
      console.log('OrderSuccess: Looking for orderId:', orderId);
      
      const foundOrder = orders.find((o: any) => o.id === orderId);
      console.log('OrderSuccess: Found order:', foundOrder);
      
      if (foundOrder) {
        setOrder(foundOrder);
        console.log('OrderSuccess: Order set successfully');
      } else {
        console.log('OrderSuccess: Order not found, will redirect');
        // If order not found, show a loading state briefly then redirect
        setTimeout(() => {
          alert('Order not found. Redirecting to shop...');
          router.push('/Shop');
        }, 1000);
      }
      setIsLoading(false);
    } else {
      console.log('OrderSuccess: No orderId received');
      setIsLoading(false);
    }
  }, [orderId, router]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Loading Order Details...</h1>
            <p className="text-gray-600">Please wait while we fetch your order information.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Not Found</h1>
            <p className="text-gray-600 mb-8">The order you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push('/Shop')}
              className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-cyan-500 hover:to-sky-500 transition-all duration-300"
            >
              Back to Shop
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section id="order-success" className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-20">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Success Icon */}
            <div className="mb-8">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Order Placed Successfully!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for your purchase. Your order has been confirmed and will be processed soon.
            </p>

            {/* Order Details Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Order Info */}
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600">Order ID:</span>
                      <span className="font-semibold text-gray-900 ml-2">#{order.id}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Order Date:</span>
                      <span className="font-semibold text-gray-900 ml-2">
                        {new Date(order.orderDate).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <span className="font-semibold text-blue-600 ml-2">{order.status}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-semibold text-gray-900 ml-2">{order.paymentMethod}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Payment Status:</span>
                      <span className="font-semibold text-orange-600 ml-2">{order.paymentStatus}</span>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <img
                      src={order.productImage}
                      alt={order.productName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{order.productName}</h4>
                      <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                      <p className="text-sm text-gray-600">Price: ₹{order.unitPrice.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-green-50 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Total Amount:</span>
                      <span className="text-2xl font-bold text-green-600">₹{order.totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Customer Details</h4>
                  <div className="space-y-1 text-gray-600">
                    <p>{order.customerInfo.firstName} {order.customerInfo.lastName}</p>
                    <p>{order.customerInfo.email}</p>
                    <p>{order.customerInfo.phone}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Delivery Address</h4>
                  <div className="space-y-1 text-gray-600">
                    <p>{order.customerInfo.address}</p>
                    <p>{order.customerInfo.city}, {order.customerInfo.state} - {order.customerInfo.pincode}</p>
                    {order.customerInfo.landmark && (
                      <p>Landmark: {order.customerInfo.landmark}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">What's Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h4 className="font-medium text-blue-900 mb-2">Order Confirmed</h4>
                  <p className="text-sm text-blue-700">Your order has been received and confirmed</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <h4 className="font-medium text-blue-900 mb-2">Processing</h4>
                  <p className="text-sm text-blue-700">We'll process and prepare your order</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <h4 className="font-medium text-blue-900 mb-2">Delivery</h4>
                  <p className="text-sm text-blue-700">Your order will be delivered within 3-5 days</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/Shop')}
                className="px-8 py-3 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-cyan-500 hover:to-sky-500 transition-all duration-300"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  // In a real app, this would download or email the invoice
                  alert('Invoice download feature will be implemented here');
                }}
                className="px-8 py-3 border-2 border-sky-400 text-sky-600 rounded-xl font-semibold hover:bg-sky-50 transition-all duration-300"
              >
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Loading...</h1>
          <p className="text-gray-600">Please wait while we prepare your order details.</p>
        </div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
