"use client";
import React from "react";
import Link from 'next/link';
const DARK_BLUE = "#1e3a8a";
const ORANGE = "#f97316";
// --- SVG Icon Components (unchanged) ---
const ChevronDown = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);
const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// --- Navigation Data (unchanged) ---
const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/About" },

  {
    name: "Services",
    href: "/services", // Keep href for reference, but this item will act as a button
    dropdown: [
      { name: "Digital Solutions", href: "/Digital" },
      { name: "Business Applications", href: "/Business" },
      { name: "IT Hardware", href: "/It" },
      { name: "Security Solutions", href: "/Security" },
      { name: "Software Development", href: "/Software" },
    ],
  },
  { name: "Repair", href: "/Repair" },
  { name: "Products", href: "/Products" },
  { name: "Gaming PC", href: "/GamingStudio" },
  { name: "Training", href: "/Training" },
  { name: "Contact Us", href: "/Contact" },
];
export default function Navbar() {
  const [active, setActive] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const navRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    // Determine active link on mount from URL
    const currentPath = window.location.pathname;
    // Find the best match, including dropdown items
    let currentLink = navLinks.find(link => link.href === currentPath);
    if (!currentLink) {
        navLinks.forEach(link => {
            if (link.dropdown) {
                const dropdownMatch = link.dropdown.find(item => item.href === currentPath);
                if (dropdownMatch) currentLink = dropdownMatch;
            }
        });
    }
    if (currentLink) setActive(currentLink.name);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    setIsLoaded(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // --- REFACTORED: Simplified dropdown toggle ---
  const handleDropdownToggle = (e: React.MouseEvent, name: string) => {
      e.preventDefault();
      setOpenDropdown(prev => (prev === name ? null : name));
  };
  
  // --- REMOVED: handleNavClick and handleLogoClick are no longer needed ---
  return (
    <>
      <style jsx global>{`
        /* --- Styles are unchanged, but the body transition will no longer work as navigation is client-side. For page transitions, consider a library like Framer Motion. --- */
        body {
          /* transition: opacity 0.3s ease-in-out; */
        }
        @keyframes slideInFromTop { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slide-in { animation: slideInFromTop 0.7s cubic-bezier(0.23, 1, 0.32, 1); }
        .nav-link-container {
            position: relative;
        }
        
        .nav-link {
            transition: color 0.3s ease;
            color: ${scrolled ? '#374151' : '#4b5563'};
        }
        
        .nav-link:hover, .nav-button:hover {
            color: ${ORANGE};
        }
        .active-link-indicator {
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 6px;
            height: 6px;
            background-color: ${ORANGE};
            border-radius: 50%;
            transition: all 0.3s ease;
        }
      `}</style>
      
      <header className="relative z-50 w-full">
        <nav
          ref={navRef}
          className={`fixed z-50 flex items-center justify-between transition-all duration-300 ease-in-out
            ${scrolled 
              ? "top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full border border-orange-200/50 shadow-lg bg-white/70 backdrop-blur-lg px-6 h-16" 
              : "top-0 w-full bg-transparent px-6 h-24"
            }
            ${isLoaded ? "animate-slide-in" : "opacity-0"}
          `}
          aria-label="Main navigation"
        >
          {/* --- FIXED: Logo Section uses Link --- */}
          <div className="flex items-center">
            <Link href="/" onClick={() => setActive("Home")} className="flex items-center gap-3 cursor-pointer group">
              <img src="/hero.jpg" alt="Cloud IT Solution Logo" width={scrolled ? 48 : 56} height={scrolled ? 48 : 56} className="object-contain transition-all duration-300 group-hover:rotate-6 group-hover:scale-110" />
              <div className="flex flex-col">
                <span className="font-bold text-xl" style={{ color: DARK_BLUE }}>Cloud IT Solution
</span>
              </div>
            </Link>
          </div>
          
          {/* --- FIXED: Desktop Navigation uses Link and button for dropdowns --- */}
          <div className="hidden lg:flex flex-1 justify-center items-center gap-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="nav-link-container">
                {link.dropdown ? (
                  <button
                    onClick={(e) => handleDropdownToggle(e, link.name)}
                    className="nav-button flex items-center gap-1.5 font-semibold text-gray-700 hover:text-orange-500"
                    aria-haspopup="true"
                    aria-expanded={openDropdown === link.name}
                  >
                    {link.name}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="nav-link flex items-center gap-1.5 font-semibold text-gray-700 hover:text-orange-500"
                    onClick={() => setActive(link.name)}
                  >
                    {link.name}
                  </Link>
                )}
                {active === link.name && <div className="active-link-indicator" />}
                
                {link.dropdown && (
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 origin-top rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 p-2 transition-all duration-300 ease-out ${openDropdown === link.name ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                    {link.dropdown.map((item) => (
                      <Link 
                        key={item.name} 
                        href={item.href} 
                        onClick={() => {
                          setActive(item.name);
                          setOpenDropdown(null);
                        }} 
                        className="block px-4 py-3 text-sm font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Mobile Hamburger Menu Button (unchanged) */}
          <div className="lg:hidden">
            <button onClick={() => setOpen(!open)} className="focus:outline-none p-2 rounded-full text-gray-700 hover:bg-orange-100/50" aria-label="Toggle menu" aria-expanded={open}>
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
        
        {/* --- FIXED: Mobile Menu Drawer uses Link and button --- */}
        <div className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-500 lg:hidden ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setOpen(false)} />
        <div 
            className={`fixed top-0 right-0 w-[85vw] max-w-sm h-full bg-white shadow-2xl z-50 flex flex-col p-6 transition-transform duration-500 ease-in-out lg:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`}
        >
            <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-xl" style={{ color: DARK_BLUE }}>Menu</span>
                <button onClick={() => setOpen(false)} className="p-2 -mr-2 rounded-full hover:bg-gray-100"><CloseIcon /></button>
            </div>
             <div className="flex flex-col space-y-2">
                 {navLinks.map((link) => (
                  <React.Fragment key={link.name}>
                    {link.dropdown ? (
                      <div>
                        <button onClick={(e) => handleDropdownToggle(e, link.name)} className={`w-full flex justify-between items-center text-left font-bold text-lg px-4 py-3 rounded-xl transition-colors ${active === link.name ? 'text-orange-600 bg-orange-50' : 'text-gray-700'}`}>
                          <span>{link.name}</span>
                          <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openDropdown === link.name ? 'max-h-96' : 'max-h-0'}`}>
                          <div className="flex flex-col pl-6 pt-2 space-y-1">
                            {link.dropdown.map((item) => (
                              <Link 
                                key={item.name} 
                                href={item.href} 
                                onClick={() => {
                                  setActive(item.name);
                                  setOpen(false);
                                  setOpenDropdown(null);
                                }} 
                                className="block w-full text-left font-medium text-gray-600 px-4 py-2.5 rounded-lg hover:bg-orange-50 hover:text-orange-600"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link 
                        href={link.href} 
                        className={`w-full text-left font-bold text-lg px-4 py-3 rounded-xl ${active === link.name ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-100'}`} 
                        onClick={() => {
                          setActive(link.name);
                          setOpen(false);
                        }}
                      >
                        {link.name}
                      </Link>
                    )}
                  </React.Fragment>
                ))}
             </div>
        </div>
        
        <div className="h-24" />
      </header>
    </>
  );
}