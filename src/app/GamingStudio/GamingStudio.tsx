"use client";
import React, { useEffect, useState } from "react";

const ACCENT_FROM = "from-sky-500"; // matches site accent
const ACCENT_TO = "to-cyan-500";   // matches site accent

type Capability = {
  id: number;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  points: string[];
};

const capabilities: Capability[] = [
  {
    id: 1,
    title: "Game Development",
    description:
      "End-to-end development for mobile, PC, and console. Prototyping to live ops.",
    icon: "🎮",
    gradient: `from-sky-500 to-cyan-500`,
    points: ["Unity / Unreal", "Multiplayer", "Live Ops"],
  },
  {
    id: 2,
    title: "Art & Design",
    description:
      "Stylized to realistic art, UI/UX, and motion. Concept to production-ready assets.",
    icon: "🎨",
    gradient: `from-cyan-500 to-blue-500`,
    points: ["2D/3D Art", "UI/UX", "Animation"],
  },
  {
    id: 3,
    title: "QA & Optimization",
    description:
      "Performance profiling, device coverage, and automated testing for stability.",
    icon: "🧪",
    gradient: `from-blue-500 to-indigo-500`,
    points: ["Automation", "Perf Tuning", "Device Lab"],
  },
  {
    id: 4,
    title: "Monetization & Growth",
    description:
      "Design, implement and tune monetization funnels with data-driven experimentation.",
    icon: "🚀",
    gradient: `from-indigo-500 to-purple-500`,
    points: ["IAP/Ads", "A/B Tests", "Analytics"],
  },
];

type PortfolioItem = {
  id: number;
  name: string;
  category: string;
  emoji: string;
  gradient: string;
};

const portfolio: PortfolioItem[] = [
  { id: 1, name: "Neon Drift", category: "Mobile", emoji: "🏎️", gradient: "from-sky-400 to-cyan-500" },
  { id: 2, name: "Star Forge", category: "PC", emoji: "🛰️", gradient: "from-cyan-500 to-blue-600" },
  { id: 3, name: "Myth Quest", category: "Console", emoji: "🐉", gradient: "from-blue-500 to-indigo-600" },
  { id: 4, name: "City Builder", category: "PC", emoji: "🏗️", gradient: "from-indigo-500 to-purple-600" },
  { id: 5, name: "Puzzle Bloom", category: "Mobile", emoji: "🧩", gradient: "from-purple-500 to-pink-500" },
  { id: 6, name: "Arena Royale", category: "Console", emoji: "⚔️", gradient: "from-sky-500 to-blue-600" },
];

const techStack = [
  { name: "Unity", tag: "C#", color: "text-sky-600" },
  { name: "Unreal", tag: "C++", color: "text-cyan-600" },
  { name: "Godot", tag: "GDScript", color: "text-blue-600" },
  { name: "Blender", tag: "3D", color: "text-indigo-600" },
  { name: "Maya", tag: "3D", color: "text-purple-600" },
  { name: "Photoshop", tag: "2D", color: "text-sky-700" },
  { name: "Figma", tag: "UI", color: "text-cyan-700" },
  { name: "Firebase", tag: "Live Ops", color: "text-blue-700" },
];

type Testimonial = {
  id: number;
  quote: string;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "They delivered a polished game on time. Incredible art direction and tight gameplay.",
    name: "Aarav Kapoor",
    role: "Producer, Flux Games",
  },
  {
    id: 2,
    quote:
      "Our KPIs improved 2x after their monetization pass. Data-driven and creative.",
    name: "Maya Singh",
    role: "Head of Growth, HyperPlay",
  },
  {
    id: 3,
    quote:
      "Super responsive team with deep engine knowledge. Perf issues vanished.",
    name: "Daniel Lee",
    role: "Technical Director, Overbyte",
  },
];

export default function GamingStudio() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  return (
    <section
      id="gaming-studio"
      className="relative bg-gradient-to-br from-gray-50 via-white to-sky-50 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-24 left-10 w-32 h-32 border-2 border-sky-400 rounded-full animate-spin" style={{ animationDuration: "24s" }}></div>
        <div className="absolute bottom-32 right-20 w-28 h-28 border-2 border-cyan-400 rounded-lg rotate-45 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-blue-400 rounded-lg rotate-12 animate-bounce" style={{ animationDelay: "1.6s" }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32">
        {/* Hero */}
        <div className={`relative mb-24 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-sky-100 to-cyan-100 px-6 py-3 rounded-full border border-sky-200 shadow">
            <span className="text-2xl">⚡</span>
            <span className="text-sky-700 font-bold">Gaming Studio</span>
          </div>
          <div className="mt-6 relative">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-gray-900 via-sky-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
              We design and build immersive games
            </h1>
            <div className="absolute -bottom-2 left-0 w-56 h-4 bg-gradient-to-r from-sky-400 to-cyan-400 opacity-20 blur-sm rounded-full"></div>
          </div>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl">
            From prototype to launch and live operations, our team crafts memorable
            experiences powered by solid engineering and striking art.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className={`group inline-flex items-center px-8 py-4 rounded-2xl font-bold text-white shadow-2xl border-2 border-cyan-400 transition-all duration-300 bg-gradient-to-r ${ACCENT_FROM} ${ACCENT_TO} hover:scale-105 hover:shadow-cyan-500/25`}
            >
              <span>Start a Project</span>
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center px-6 py-4 rounded-2xl font-semibold text-gray-700 border-2 border-gray-300 hover:border-sky-400 hover:text-sky-600 transition-all duration-300 bg-white/80 backdrop-blur-sm"
            >
              View Portfolio
            </a>
          </div>
        </div>

        {/* Capabilities */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 text-center mb-12">
            What we do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, index) => (
              <div
                key={cap.id}
                className="group relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-500 overflow-hidden"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cap.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl`}></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mb-6 rounded-2xl bg-white/60 backdrop-blur-sm border-2 border-gray-100 flex items-center justify-center text-4xl">
                    {cap.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cap.title}</h3>
                  <p className="text-gray-600 mb-4">{cap.description}</p>
                  <ul className="space-y-2">
                    {cap.points.map((p) => (
                      <li key={p} className="flex items-center text-sm text-gray-600">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${cap.gradient} mr-3`}></div>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio */}
        <div id="portfolio" className="mb-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">Selected work</h2>
            <p className="mt-3 text-gray-600">A snapshot of worlds we helped bring to life.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((item) => (
              <div key={item.id} className="group relative rounded-3xl overflow-hidden border-2 border-gray-100 bg-white shadow hover:shadow-xl transition-all duration-300">
                <div className={`h-48 flex items-center justify-center text-7xl bg-gradient-to-br ${item.gradient}`}>{item.emoji}</div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-sky-700 transition-colors">{item.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">{item.category}</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-24">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">Tech & Tools</h2>
            <p className="mt-3 text-gray-600">Engine, art, and ops tooling we use daily.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {techStack.map((t) => (
              <div key={t.name} className="flex items-center justify-between px-5 py-4 rounded-2xl bg-white border-2 border-gray-100 shadow-sm hover:shadow-md transition-all">
                <span className={`font-semibold ${t.color}`}>{t.name}</span>
                <span className="text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-1">{t.tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-24">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">What clients say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="relative bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100">
                <div className="text-4xl mb-4">“</div>
                <p className="text-gray-700 leading-relaxed mb-6">{t.quote}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.role}</div>
                  </div>
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${ACCENT_FROM} ${ACCENT_TO} opacity-80`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-8 left-8 w-16 h-16 border-2 border-sky-400 rounded-lg rotate-12 animate-pulse"></div>
              <div className="absolute bottom-8 right-8 w-12 h-12 border-2 border-cyan-400 rounded-full animate-bounce"></div>
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-sky-600 bg-clip-text text-transparent">
                Ready to build your next hit?
              </h3>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Get a free proposal with scope, timeline, and team composition.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  className={`group px-8 py-4 bg-gradient-to-r ${ACCENT_FROM} ${ACCENT_TO} text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-xl hover:shadow-2xl`}
                >
                  Get Free Quote
                </a>
                <a
                  href="mailto:hello@example.com"
                  className="group px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:border-sky-400 hover:text-sky-600 transition-all bg-white hover:bg-gray-50"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional subtle background blobs */}
      <div className="absolute top-24 -left-10 w-80 h-80 bg-gradient-to-r from-sky-100 to-cyan-100 opacity-30 rounded-full blur-3xl" />
      <div className="absolute bottom-24 -right-10 w-96 h-96 bg-gradient-to-r from-cyan-100 to-blue-100 opacity-30 rounded-full blur-3xl" />
    </section>
  );
}


