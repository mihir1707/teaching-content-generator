import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Github, MessageSquare, Menu, X, Sparkles, ArrowRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Create", to: "/select" },
    { label: "Templates", to: "#templates" },
    { label: "Pricing", to: "#pricing" },
  ];

  const isActive = (to: string) => {
    if (to === "/") return isHome;
    if (to.startsWith("#")) return false;
    return location.pathname.startsWith(to);
  };

  return (
    <div className="relative min-h-screen flex flex-col font-sans text-foreground bg-background">

      {/* ===== NAVBAR ===== */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-white/[0.06] bg-background/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.04)]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-cyan-400 rounded-lg opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300" />
              <div className="relative flex items-center justify-center w-full h-full">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
            </div>
            <span className="text-[15px] font-bold tracking-tight">
              <span className="text-white/90">EduSlide</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"> AI</span>
            </span>
          </Link>

          {/* Center Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(link.to)
                    ? "text-white bg-white/8"
                    : "text-white/50 hover:text-white/90 hover:bg-white/5"
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center gap-1">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-all duration-200"
                title="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <button
                className="p-2 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-all duration-200"
                title="Feedback"
              >
                <MessageSquare className="h-4 w-4" />
              </button>
            </div>
            <div className="w-px h-4 bg-white/10 hidden sm:block" />
            <ThemeToggle />
            <div className="w-px h-4 bg-white/10 hidden md:block" />
            <Link to="/select" className="hidden md:flex">
              <Button
                size="sm"
                className="h-8 px-4 text-xs font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-0 shadow-lg shadow-purple-900/30 transition-all duration-200"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                Create Free
              </Button>
            </Link>
            {/* Hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/[0.06] bg-background/95 backdrop-blur-xl animate-slide-down">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive(link.to)
                      ? "text-white bg-purple-500/10 border border-purple-500/20"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 pb-1">
                <Link to="/select" className="block">
                  <Button className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
                    <Sparkles className="h-4 w-4 mr-2" /> Create Learning Content
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 relative z-10 w-full">
        {children}
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="relative border-t border-white/[0.06] bg-background">
        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-14">

            {/* Brand col */}
            <div className="md:col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-2.5 group w-fit">
                <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <span className="text-[15px] font-bold text-white/90">EduSlide<span className="text-purple-400"> AI</span></span>
              </Link>
              <p className="text-sm text-white/40 leading-relaxed max-w-[240px]">
                Transform knowledge into meaningful learning materials in minutes.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all duration-200">
                  <Github className="h-3.5 w-3.5" />
                </a>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all duration-200">
                  <MessageSquare className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Link cols */}
            {[
              {
                title: "Product",
                links: ["Create Content", "Templates", "Pricing", "Changelog"]
              },
              {
                title: "Resources",
                links: ["Documentation", "API Reference", "GitHub", "Support"]
              },
              {
                title: "Company",
                links: ["About", "Blog", "Contact", "Privacy"]
              },
            ].map((col) => (
              <div key={col.title} className="space-y-4">
                <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-white/50 hover:text-white/90 transition-colors duration-200">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/25">
              © 2026 EduSlide AI. Powered by RAG + Google Gemini + Pinecone.
            </p>
            <div className="flex items-center gap-6 text-xs text-white/25">
              <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white/60 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
