"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504707749092-6c8c4c4c4c4c?w=800&h=600&fit=crop"
    ],
    specs: {
      "Processor": "Apple M2 chip",
      "Memory": "16GB unified memory",
      "Storage": "512GB SSD",
      "Display": "14-inch Liquid Retina XDR display",
      "Graphics": "Integrated 10-core GPU",
      "Battery": "Up to 20 hours"
    },
    longDescription: "The MacBook Pro M2 represents the pinnacle of Apple's laptop engineering. With the revolutionary M2 chip, this laptop delivers exceptional performance while maintaining incredible battery life. Perfect for professionals, creatives, and power users who demand the best."
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
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop"
    ],
    specs: {
      "Processor": "Intel Core i7-1250U",
      "Memory": "16GB LPDDR5",
      "Storage": "1TB PCIe NVMe SSD",
      "Display": "13.4-inch 4K UHD+ Touch",
      "Graphics": "Intel Iris Xe Graphics",
      "Battery": "Up to 12 hours"
    },
    longDescription: "The Dell XPS 13 continues to set the standard for premium ultrabooks. With its stunning InfinityEdge display, powerful Intel processor, and premium build quality, it's the perfect companion for professionals on the go."
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
    images: [
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop"
    ],
    specs: {
      "Processor": "Intel Core i9-13900K",
      "Memory": "32GB DDR5-5600",
      "Storage": "2TB NVMe SSD",
      "Graphics": "NVIDIA RTX 4080 16GB",
      "Power Supply": "850W Gold",
      "Cooling": "Liquid CPU Cooler"
    },
    longDescription: "This gaming desktop is built for enthusiasts who demand the absolute best performance. With the latest RTX 4080 graphics card and Intel's flagship processor, you'll experience gaming like never before."
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
    images: [
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop"
    ],
    specs: {
      "Switch Type": "Cherry MX Blue",
      "Connectivity": "2.4GHz Wireless + Bluetooth",
      "Battery Life": "Up to 200 hours",
      "Backlight": "RGB per-key",
      "Layout": "Full-size with numpad",
      "Material": "Aluminum frame"
    },
    longDescription: "Experience the perfect blend of performance and style with this wireless mechanical keyboard. Featuring premium Cherry MX switches and stunning RGB lighting, it's designed for both work and play."
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
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop"
    ],
    specs: {
      "Print Speed": "Up to 30 ppm",
      "Resolution": "1200 x 1200 dpi",
      "Connectivity": "Wi-Fi, Ethernet, USB",
      "Paper Capacity": "250 sheets",
      "Duplex": "Automatic",
      "Mobile Printing": "HP Smart App"
    },
    longDescription: "The HP LaserJet Pro delivers professional-quality prints with exceptional speed and reliability. Perfect for small offices and home businesses that need consistent, high-quality output."
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
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop"
    ],
    specs: {
      "Included Apps": "Photoshop, Illustrator, InDesign",
      "License Type": "Annual subscription",
      "Platform": "Windows & macOS",
      "Cloud Storage": "100GB included",
      "Updates": "Automatic",
      "Support": "24/7 Adobe support"
    },
    longDescription: "Adobe Creative Suite is the industry standard for creative professionals. This comprehensive package includes all the tools you need to bring your creative vision to life, from photo editing to graphic design."
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
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop"
    ],
    specs: {
      "Screen Size": "27 inches",
      "Resolution": "3840 x 2160 (4K)",
      "Refresh Rate": "144Hz",
      "Response Time": "1ms",
      "Panel Type": "IPS",
      "HDR": "HDR400"
    },
    longDescription: "Immerse yourself in stunning 4K visuals with this high-performance gaming monitor. With a 144Hz refresh rate and 1ms response time, you'll experience smooth, lag-free gaming like never before."
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
    images: [
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop"
    ],
    specs: {
      "Processor": "Apple M1 chip",
      "Memory": "8GB unified memory",
      "Storage": "256GB SSD",
      "Display": "13.3-inch Retina display",
      "Graphics": "Integrated 7-core GPU",
      "Battery": "Up to 18 hours"
    },
    longDescription: "The MacBook Air M1 redefines what's possible in a lightweight laptop. With the revolutionary M1 chip, you get incredible performance and battery life in a beautifully designed package."
  },
];

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  const productId = parseInt(params.id as string);
  const product = products.find(p => p.id === productId);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('product-detail');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  if (!product) {
    return (
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
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  return (
    <>
    <Navbar />
    <section id="product-detail" className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        {/* Back Button */}
        <button
          onClick={() => router.push('/Shop')}
          className="mb-8 flex items-center text-sky-600 hover:text-sky-700 font-semibold transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Shop
        </button>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              {product.discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{product.discount}%
                </div>
              )}
              {product.featured && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Featured
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative bg-white rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                      selectedImage === index ? 'border-sky-400' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>
            </div>

                         {/* Price */}
             <div className="flex items-center gap-4">
               <span className="text-3xl font-bold text-gray-900">
                 ₹{product.price.toLocaleString()}
               </span>
               {product.originalPrice && (
                 <span className="text-xl text-gray-400 line-through">
                   ₹{product.originalPrice.toLocaleString()}
                 </span>
               )}
             </div>

            {/* Long Description */}
            {product.longDescription && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.longDescription}
                </p>
              </div>
            )}

            {/* Specifications */}
            {product.specs && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">{key}</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

                         {/* Quantity and Action Buttons */}
             <div className="space-y-4">
               <div className="flex items-center gap-4">
                 <label className="font-medium text-gray-700">Quantity:</label>
                 <div className="flex items-center border border-gray-300 rounded-lg">
                   <button
                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
                     className="px-3 py-2 hover:bg-gray-100 transition-colors"
                   >
                     -
                   </button>
                   <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                   <button
                     onClick={() => setQuantity(quantity + 1)}
                     className="px-3 py-2 hover:bg-gray-100 transition-colors"
                   >
                     +
                   </button>
                 </div>
               </div>

                               {/* Buy Now Button */}
                <button
                  disabled={!product.inStock}
                  onClick={() => {
                    if (product.inStock) {
                      router.push(`/Shop/buy-now?productId=${product.id}&quantity=${quantity}`);
                    }
                  }}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    product.inStock
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-emerald-500 hover:to-green-500 hover:scale-105 shadow-lg hover:shadow-green-500/25"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {product.inStock ? "Buy Now" : "Out of Stock"}
                </button>

               {/* Add to Cart Button */}
               <button
                 disabled={!product.inStock}
                 className={`w-full py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 border-2 ${
                   product.inStock
                     ? "border-sky-400 text-sky-600 hover:bg-sky-50 hover:scale-105"
                     : "border-gray-300 text-gray-500 cursor-not-allowed"
                 }`}
               >
                 {product.inStock ? "Add to Cart" : "Out of Stock"}
               </button>
             </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
}
