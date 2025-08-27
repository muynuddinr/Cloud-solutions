"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
};

type Category = {
  id: string;
  name: string;
  icon: string;
  count: number;
  gradient: string;
};

const categories: Category[] = [
  { id: "all", name: "All Products", icon: "🛍️", count: 48, gradient: "from-[#0553aa] to-[#0553aa]" },
  { id: "laptops", name: "Laptops", icon: "💻", count: 12, gradient: "from-[#0553aa] to-[#0553aa]" },
  { id: "desktops", name: "Desktops", icon: "🖥️", count: 8, gradient: "from-[#0553aa] to-[#0553aa]" },
  { id: "accessories", name: "Accessories", icon: "⌨️", count: 15, gradient: "from-[#0553aa] to-[#0553aa]" },
  { id: "printers", name: "Printers", icon: "🖨️", count: 6, gradient: "from-[#0553aa] to-[#0553aa]" },
  { id: "software", name: "Software", icon: "💾", count: 7, gradient: "from-[#0553aa] to-[#0553aa]" },
];

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

export default function Shop() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('shop');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "featured":
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  return (
    <section id="shop" className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-[#0553aa] rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-32 right-20 w-24 h-24 border-2 border-[#0553aa] rounded-lg rotate-45 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-[#0553aa] rounded-lg rotate-12 animate-bounce" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-[#0553aa] to-[#0553aa] bg-clip-text text-transparent">
            Our Shop
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our comprehensive range of technology products and solutions. 
            From laptops to software, we have everything you need to power your business.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 focus:border-[#0553aa] focus:ring-2 focus:ring-[#0553aa] transition-all duration-300 bg-white/50 backdrop-blur-sm"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#0553aa] focus:ring-2 focus:ring-[#0553aa] transition-all duration-300 bg-white/50 backdrop-blur-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id
                    ? `border-[#0553aa] bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                    : "border-gray-200 bg-white/80 backdrop-blur-sm hover:border-[#0553aa] hover:shadow-lg"
                }`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-semibold text-sm">{category.name}</div>
                <div className={`text-xs ${selectedCategory === category.id ? 'text-white/80' : 'text-gray-500'}`}>
                  {category.count} items
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-200 hover:border-[#0553aa] transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden cursor-pointer"
              onClick={(e) => {
                // Don't navigate if clicking on buttons
                if (!(e.target as HTMLElement).closest('button')) {
                  router.push(`/Shop/${product.id}`);
                }
              }}
            >
              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{product.discount}%
                </div>
              )}

              {/* Featured Badge */}
              {product.featured && (
                <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-[#0553aa] to-[#0553aa] text-white px-3 py-1 rounded-full text-sm font-bold">
                  Featured
                </div>
              )}

              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-sky-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  disabled={!product.inStock}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    product.inStock
                      ? "bg-gradient-to-r from-[#0553aa] to-[#0553aa] text-white hover:from-[#0553aa] hover:to-[#0553aa] hover:scale-105 shadow-lg hover:shadow-[#0553aa]/25"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>

                {/* View Details Button */}
                <button
                  onClick={() => router.push(`/Shop/${product.id}`)}
                  className="w-full mt-2 py-2 px-4 rounded-xl font-semibold border-2 border-[#0553aa] text-[#0553aa] hover:bg-[#0553aa]/10 transition-all duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
