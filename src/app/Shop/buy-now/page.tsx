"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
  discount?: number;
  images?: string[];
  specs?: { [key: string]: string };
  longDescription?: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "MacBook Pro M2",
    description: "Latest MacBook Pro with M2 chip, 16GB RAM, 512GB SSD",
    price: 1999,
    originalPrice: 2199,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
    category: "laptops",
    rating: 4.8,
    reviews: 127,
    inStock: true,
    featured: true,
    discount: 9,
  },
  {
    id: 2,
    name: "Dell XPS 13",
    description: "Premium ultrabook with Intel i7, 16GB RAM, 1TB SSD",
    price: 1499,
    originalPrice: 1699,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop",
    category: "laptops",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    featured: true,
    discount: 12,
  },
  {
    id: 3,
    name: "Gaming Desktop RTX 4080",
    description: "High-performance gaming PC with RTX 4080, 32GB RAM",
    price: 2499,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&h=600&fit=crop",
    category: "desktops",
    rating: 4.9,
    reviews: 45,
    inStock: true,
    featured: true,
  },
  {
    id: 4,
    name: "Wireless Mechanical Keyboard",
    description: "RGB mechanical keyboard with wireless connectivity",
    price: 129,
    originalPrice: 159,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&h=600&fit=crop",
    category: "accessories",
    rating: 4.4,
    reviews: 203,
    inStock: true,
    discount: 19,
  },
  {
    id: 5,
    name: "HP LaserJet Pro",
    description: "Professional laser printer with wireless printing",
    price: 299,
    originalPrice: 349,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    category: "printers",
    rating: 4.3,
    reviews: 67,
    inStock: true,
    discount: 14,
  },
  {
    id: 6,
    name: "Adobe Creative Suite",
    description: "Complete creative software package for professionals",
    price: 599,
    originalPrice: 699,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    category: "software",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    discount: 14,
  },
  {
    id: 7,
    name: "4K Gaming Monitor",
    description: "27-inch 4K monitor with 144Hz refresh rate",
    price: 449,
    originalPrice: 549,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=600&fit=crop",
    category: "accessories",
    rating: 4.5,
    reviews: 78,
    inStock: true,
    discount: 18,
  },
  {
    id: 8,
    name: "MacBook Air M1",
    description: "Lightweight laptop with M1 chip, 8GB RAM, 256GB SSD",
    price: 999,
    originalPrice: 1199,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop",
    category: "laptops",
    rating: 4.6,
    reviews: 234,
    inStock: false,
    discount: 17,
  },
];

type OrderFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
  paymentMethod: string;
};

type OrderDetails = {
  id: string;
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discount: number;
  customerInfo: OrderFormData;
  orderDate: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
};

function BuyNowContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [redirectProgress, setRedirectProgress] = useState(0);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [formData, setFormData] = useState<OrderFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    paymentMethod: 'COD'
  });
  const orderCounterRef = useRef(0);

  const productId = parseInt(searchParams.get('productId') || '0');
  const quantity = parseInt(searchParams.get('quantity') || '1');

  useEffect(() => {
    setMounted(true);
    // Add loading animation
    // setIsLoaded(true); // This line was removed
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('buy-now');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
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

  const totalPrice = product.price * quantity;
  const discount = product.originalPrice ? (product.originalPrice - product.price) * quantity : 0;
  const finalPrice = totalPrice;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);

    try {
      // Create order object with a more stable ID generation
      const timestamp = Date.now();
      const counter = orderCounterRef.current++;
      const orderId = `order_${timestamp}_${counter}`;
      
      console.log('Generated order ID:', orderId);
      console.log('Timestamp:', timestamp);
      console.log('Counter:', counter);
      
      const order = {
        id: orderId,
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        quantity: quantity,
        unitPrice: product.price,
        totalPrice: finalPrice,
        discount: discount,
        customerInfo: formData,
        orderDate: new Date().toISOString(),
        status: 'Pending',
        paymentMethod: 'COD',
        paymentStatus: 'Pending'
      };

      // Store order in localStorage (in a real app, this would go to a database)
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('orders', JSON.stringify(existingOrders));
      
      console.log('Order created:', order);
      console.log('All orders in localStorage:', existingOrders);

      // Show success animation first
      setShowSuccess(true);
      setIsLoading(false);
      setOrderDetails(order);

      // Start progress bar animation
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 2; // 2% every 40ms = 2 seconds total
        setRedirectProgress(progress);
        if (progress >= 100) {
          clearInterval(progressInterval);
        }
      }, 40);

      // After animation completes, show order details (no redirect)
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000); // Show success message for 2 seconds
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an error placing your order. Please try again.');
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.address.trim() !== '' &&
      formData.city.trim() !== '' &&
      formData.state.trim() !== '' &&
      formData.pincode.trim() !== ''
    );
  };

  // Show success animation overlay
  if (showSuccess) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50 flex items-center justify-center relative">
          {/* Success Animation Overlay */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-md mx-4 text-center transform animate-scale-in">
              {/* Success Icon with Animation */}
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <svg className="w-12 h-12 text-green-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* Success Message */}
              <h1 className="text-3xl font-bold text-green-600 mb-4 animate-fade-in">
                🎉 Order Successfully Placed!
              </h1>
              <p className="text-gray-600 mb-6 animate-fade-in-delay">
                Thank you for your purchase! Preparing your order details...
              </p>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-100 ease-out"
                  style={{ width: `${redirectProgress}%` }}
                ></div>
              </div>
              
              {/* Progress Text */}
              <p className="text-sm text-gray-500 mb-4">
                Loading order details in {Math.ceil((100 - redirectProgress) / 50)} seconds...
              </p>
              
              {/* Loading Spinner */}
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Show order details after animation
  if (orderDetails) {
    return (
      <>
        <Navbar />
        <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50">
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-20">
            {/* Success Header */}
            <div className="text-center mb-12">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Order Placed Successfully!
              </h1>
              <p className="text-xl text-gray-600">
                Thank you for your purchase. Your order has been confirmed and will be processed soon.
              </p>
            </div>

            {/* Order Details Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Order Info */}
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600">Order ID:</span>
                      <span className="font-semibold text-gray-900 ml-2">#{orderDetails.id}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Order Date:</span>
                      <span className="font-semibold text-gray-900 ml-2">
                        {new Date(orderDetails.orderDate).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <span className="font-semibold text-blue-600 ml-2">{orderDetails.status}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-semibold text-gray-900 ml-2">{orderDetails.paymentMethod}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Payment Status:</span>
                      <span className="font-semibold text-orange-600 ml-2">{orderDetails.paymentStatus}</span>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <img
                      src={orderDetails.productImage}
                      alt={orderDetails.productName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{orderDetails.productName}</h4>
                      <p className="text-sm text-gray-600">Quantity: {orderDetails.quantity}</p>
                      <p className="text-sm text-gray-600">Price: ₹{orderDetails.unitPrice.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-green-50 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Total Amount:</span>
                      <span className="text-2xl font-bold text-green-600">₹{orderDetails.totalPrice.toLocaleString()}</span>
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
                    <p>{orderDetails.customerInfo.firstName} {orderDetails.customerInfo.lastName}</p>
                    <p>{orderDetails.customerInfo.email}</p>
                    <p>{orderDetails.customerInfo.phone}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Delivery Address</h4>
                  <div className="space-y-1 text-gray-600">
                    <p>{orderDetails.customerInfo.address}</p>
                    <p>{orderDetails.customerInfo.city}, {orderDetails.customerInfo.state} - {orderDetails.customerInfo.pincode}</p>
                    {orderDetails.customerInfo.landmark && (
                      <p>Landmark: {orderDetails.customerInfo.landmark}</p>
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
                Return to Shop
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
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section id="buy-now" className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-20">
          {/* Header */}
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
              Complete Your Order
            </h1>
            <p className="text-lg text-gray-600">Fill in your delivery information to proceed with the purchase</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                {/* Product Info */}
                <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600">Qty: {quantity}</p>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span>-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>₹{finalPrice.toLocaleString()}</span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-2">Payment Method</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">₹</span>
                    </div>
                    <span className="text-blue-900 font-medium">Cash on Delivery (COD)</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-2">Pay when you receive your order</p>
                </div>
              </div>
            </div>

            {/* Order Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Information</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Address</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Address *</label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                          placeholder="House/Flat No., Street, Area"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                          <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Landmark (Optional)</label>
                        <input
                          type="text"
                          name="landmark"
                          value={formData.landmark}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                          placeholder="Near hospital, school, etc."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={!isFormValid() || isLoading}
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                        isFormValid() && !isLoading
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-emerald-500 hover:to-green-500 hover:scale-105 shadow-lg hover:shadow-green-500/25"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        `Place Order - ₹${finalPrice.toLocaleString()}`
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default function BuyNowPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Loading...</h1>
          <p className="text-gray-600">Please wait while we prepare your order form.</p>
        </div>
      </div>
    }>
      <BuyNowContent />
    </Suspense>
  );
}
