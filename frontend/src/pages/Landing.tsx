import { useNavigate, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import {
  Sparkles, ArrowRight, Youtube, FileText, Link as LinkIcon,
  Upload, Layers, CheckCircle2, Brain, Zap, BookOpen,
  PresentationIcon, Lightbulb, Search, ChevronRight,
  Star, Play, GraduationCap, BarChart3, FileStack,
  Cpu, Database, Network, FlaskConical,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* =============================================
   SECTION REVEAL HOOK
   ============================================= */
function useSectionReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("section-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    el.classList.add("section-hidden");
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* =============================================
   HERO SECTION
   ============================================= */
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/2 w-[300px] h-[300px] bg-cyan-500/6 rounded-full blur-[90px] animate-blob animation-delay-4000" />
        {/* Grid */}
        <div className="absolute inset-0 grid-pattern opacity-100" />
        {/* Radial fade at edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(var(--background))_100%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Badge */}
        <div className="animate-fade-in inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/8 backdrop-blur-sm">
          <span className="flex h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-[11px] font-semibold tracking-wider text-purple-300/90 uppercase">
            AI-Powered Teaching Content Generator
          </span>
        </div>

        {/* Heading */}
        <div className="animate-fade-in-delay-1 space-y-2">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]">
            <span className="text-white/95">Turn Learning</span>{" "}
            <span className="text-white/95">Resources Into</span>
          </h1>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-gradient-animated">
            Beautiful Learning Materials.
          </h1>
        </div>

        {/* Subtitle */}
        <p className="animate-fade-in-delay-2 mx-auto max-w-2xl text-base sm:text-lg text-white/45 leading-relaxed font-normal">
          Transform YouTube videos, articles, PDFs, and documents into structured notes,
          summaries, quizzes, and presentation-ready slides in minutes.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-delay-3 flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            size="lg"
            className="h-12 px-7 text-sm font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-0 shadow-[0_0_40px_rgba(124,58,237,0.3)] hover:shadow-[0_0_50px_rgba(124,58,237,0.45)] transition-all duration-300 hover:-translate-y-0.5"
            onClick={() => navigate("/select")}
          >
            Create Learning Content
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="h-12 px-7 text-sm font-semibold rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300"
            onClick={() => document.getElementById("preview")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Play className="mr-2 h-4 w-4" />
            Explore Examples
          </Button>
        </div>

        {/* Trust line */}
        <div className="animate-fade-in-delay-4 flex flex-wrap items-center justify-center gap-2 text-[11px] text-white/25 font-medium tracking-wider uppercase">
          {["YouTube", "PDF", "DOCX", "Web Articles", "AI Generated"].map((item, i) => (
            <span key={item} className="flex items-center gap-2">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-white/15" />}
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

/* =============================================
   PRODUCT PREVIEW
   ============================================= */
const ProductPreview = () => {
  const ref = useSectionReveal();
  return (
    <section id="preview" className="px-4 sm:px-6 max-w-7xl mx-auto pb-24" ref={ref}>
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] bg-[#090b14] shadow-[0_0_80px_rgba(0,0,0,0.6)] animate-float-slow">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 text-[11px] text-white/30 font-mono">
              <span className="w-2 h-2 rounded-full bg-green-400/60" />
              app.eduslide.ai
            </div>
          </div>
        </div>

        <div className="flex min-h-[480px]">
          {/* Sidebar */}
          <div className="w-52 shrink-0 border-r border-white/[0.05] bg-white/[0.01] p-4 hidden sm:block">
            <div className="space-y-1 mb-6">
              {[
                { icon: BarChart3, label: "Dashboard", active: false },
                { icon: Sparkles, label: "Create Content", active: true },
                { icon: FileStack, label: "My Projects", active: false },
                { icon: GraduationCap, label: "Templates", active: false },
                { icon: BookOpen, label: "History", active: false },
              ].map((item) => (
                <div key={item.label}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all duration-200 ${
                    item.active
                      ? "bg-purple-500/15 text-purple-300 border border-purple-500/20"
                      : "text-white/35 hover:text-white/60 hover:bg-white/5"
                  }`}
                >
                  <item.icon className="h-3.5 w-3.5" />
                  {item.label}
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-white/[0.05]">
              <div className="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/15">
                <p className="text-[10px] text-purple-300/80 font-medium mb-1">Storage Used</p>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-3/5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                </div>
                <p className="text-[10px] text-white/30 mt-1">3.2 GB / 5 GB</p>
              </div>
            </div>
          </div>

          {/* Main area */}
          <div className="flex-1 p-5 sm:p-7 space-y-6 overflow-hidden">
            <div>
              <h3 className="text-base font-semibold text-white/90 mb-1">Create New Learning Material</h3>
              <p className="text-xs text-white/35">Select a source to get started</p>
            </div>

            {/* Source cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: Youtube, label: "YouTube Video", desc: "Paste any YouTube URL", color: "from-red-500/15 to-red-600/5", border: "border-red-500/15", icon_color: "text-red-400" },
                { icon: LinkIcon, label: "Web Article", desc: "Extract from any URL", color: "from-blue-500/15 to-blue-600/5", border: "border-blue-500/15", icon_color: "text-blue-400", active: true },
                { icon: Upload, label: "Upload Document", desc: "PDF, DOCX, images", color: "from-purple-500/15 to-purple-600/5", border: "border-purple-500/15", icon_color: "text-purple-400" },
              ].map((src) => (
                <div key={src.label}
                  className={`relative group p-4 rounded-xl border bg-gradient-to-br cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${src.color} ${src.border} ${src.active ? "ring-1 ring-blue-500/30" : ""}`}
                >
                  {src.active && (
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-blue-500/20 border border-blue-500/30 text-[9px] text-blue-300 font-semibold">
                      Selected
                    </div>
                  )}
                  <src.icon className={`h-5 w-5 mb-2.5 ${src.icon_color}`} />
                  <p className="text-xs font-semibold text-white/80 mb-1">{src.label}</p>
                  <p className="text-[10px] text-white/35">{src.desc}</p>
                </div>
              ))}
            </div>

            {/* URL Input mockup */}
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-xs text-white/30 font-mono">
                <LinkIcon className="h-3 w-3 shrink-0 text-white/20" />
                https://example.com/article-about-machine-learning
              </div>
            </div>

            {/* Content type */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">Content Type</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Structured Notes", active: true },
                  { label: "Summary", active: true },
                  { label: "MCQs", active: false },
                  { label: "Glossary", active: false },
                  { label: "Presentation", active: true },
                ].map((t) => (
                  <div key={t.label}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer border transition-all duration-200 ${
                      t.active
                        ? "bg-purple-500/15 border-purple-500/25 text-purple-300"
                        : "border-white/8 text-white/30 hover:border-white/15 hover:text-white/50"
                    }`}
                  >
                    {t.active && <span className="mr-1.5 text-purple-400">✓</span>}
                    {t.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Generate button */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 transition-all duration-200 hover:-translate-y-0.5">
                <Sparkles className="h-4 w-4" />
                Generate Content
              </button>
              <span className="text-[11px] text-white/25">Estimated: ~30 seconds</span>
            </div>
          </div>
        </div>

        {/* Bottom glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      </div>
    </section>
  );
};

/* =============================================
   FEATURES SECTION
   ============================================= */
const features = [
  {
    icon: Layers,
    title: "Multi-Source Input",
    desc: "YouTube, web articles, PDFs, DOCX and more — all in one unified pipeline.",
    gradient: "from-purple-500/15 to-purple-600/5",
    border: "border-purple-500/15",
    glow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    icon_color: "text-purple-400",
    icon_bg: "bg-purple-500/10",
  },
  {
    icon: Search,
    title: "Intelligent RAG",
    desc: "Retrieve relevant knowledge using semantic search, embeddings, and vector databases.",
    gradient: "from-blue-500/15 to-blue-600/5",
    border: "border-blue-500/15",
    glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    icon_color: "text-blue-400",
    icon_bg: "bg-blue-500/10",
  },
  {
    icon: FileText,
    title: "AI-Powered Notes",
    desc: "Generate beautifully structured, easy-to-understand educational notes automatically.",
    gradient: "from-cyan-500/15 to-cyan-600/5",
    border: "border-cyan-500/15",
    glow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
    icon_color: "text-cyan-400",
    icon_bg: "bg-cyan-500/10",
  },
  {
    icon: Brain,
    title: "Smart Quizzes",
    desc: "Create MCQs with explanations, difficulty control, and pedagogical reasoning.",
    gradient: "from-violet-500/15 to-violet-600/5",
    border: "border-violet-500/15",
    glow: "group-hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]",
    icon_color: "text-violet-400",
    icon_bg: "bg-violet-500/10",
  },
  {
    icon: PresentationIcon,
    title: "Presentation Generator",
    desc: "Turn structured knowledge into professional, classroom-ready PowerPoint presentations.",
    gradient: "from-pink-500/15 to-pink-600/5",
    border: "border-pink-500/15",
    glow: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]",
    icon_color: "text-pink-400",
    icon_bg: "bg-pink-500/10",
  },
  {
    icon: Lightbulb,
    title: "Learning Assistance",
    desc: "Add analogies, real-world examples, misconceptions, and glossary terms automatically.",
    gradient: "from-amber-500/15 to-amber-600/5",
    border: "border-amber-500/15",
    glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    icon_color: "text-amber-400",
    icon_bg: "bg-amber-500/10",
  },
];

const FeaturesSection = () => {
  const ref = useSectionReveal();
  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto" ref={ref}>
      {/* Header */}
      <div className="text-center space-y-3 mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-semibold text-white/50 uppercase tracking-wider">
          <Zap className="h-3 w-3 text-purple-400" />
          Features
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white/95">
          Everything You Need to{" "}
          <span className="text-gradient">Teach Smarter</span>
        </h2>
        <p className="text-white/40 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          A complete AI toolkit for educators, students, and content creators.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f) => (
          <div
            key={f.title}
            className={`group relative shine p-6 rounded-2xl border bg-gradient-to-br cursor-default transition-all duration-300 hover:-translate-y-1 ${f.gradient} ${f.border} ${f.glow}`}
          >
            <div className={`w-10 h-10 rounded-xl ${f.icon_bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <f.icon className={`h-5 w-5 ${f.icon_color}`} />
            </div>
            <h3 className="text-sm font-bold text-white/90 mb-2">{f.title}</h3>
            <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

/* =============================================
   HOW IT WORKS
   ============================================= */
const steps = [
  {
    number: "01",
    title: "Choose Your Source",
    desc: "Upload a document, paste a URL, or provide a YouTube video link.",
    icon: Upload,
    color: "purple",
  },
  {
    number: "02",
    title: "AI Understands",
    desc: "The system extracts, chunks, embeds, and retrieves relevant information semantically.",
    icon: Brain,
    color: "blue",
  },
  {
    number: "03",
    title: "Generate Content",
    desc: "AI generates structured educational material using RAG and Google Gemini.",
    icon: Sparkles,
    color: "cyan",
  },
  {
    number: "04",
    title: "Learn & Present",
    desc: "Review notes, practice MCQs, and download a professional presentation.",
    icon: GraduationCap,
    color: "violet",
  },
];

const colorMap: Record<string, string> = {
  purple: "border-purple-500/25 bg-purple-500/8 text-purple-400",
  blue: "border-blue-500/25 bg-blue-500/8 text-blue-400",
  cyan: "border-cyan-500/25 bg-cyan-500/8 text-cyan-400",
  violet: "border-violet-500/25 bg-violet-500/8 text-violet-400",
};
const numColorMap: Record<string, string> = {
  purple: "text-purple-500/40",
  blue: "text-blue-500/40",
  cyan: "text-cyan-500/40",
  violet: "text-violet-500/40",
};

const HowItWorksSection = () => {
  const ref = useSectionReveal();
  return (
    <section className="py-24 px-4 sm:px-6 bg-white/[0.01] border-y border-white/[0.04]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-semibold text-white/50 uppercase tracking-wider">
            <ChevronRight className="h-3 w-3 text-blue-400" />
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white/95">
            From Resource to{" "}
            <span className="text-gradient">Learning Material</span>
          </h2>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Connector line (desktop) */}
          <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-purple-500/30 via-blue-500/20 to-violet-500/30 hidden lg:block" />

          {steps.map((step, i) => (
            <div key={step.number} className="relative group">
              {/* Number */}
              <div className={`text-5xl font-black mb-3 leading-none select-none ${numColorMap[step.color]}`}>
                {step.number}
              </div>
              {/* Icon circle */}
              <div className={`relative w-12 h-12 rounded-2xl border flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${colorMap[step.color]}`}>
                <step.icon className="h-5 w-5" />
                {/* Connector arrow (between steps) */}
                {i < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 text-white/10 hidden lg:block">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                )}
              </div>
              <h3 className="text-sm font-bold text-white/90 mb-2">{step.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =============================================
   RAG PIPELINE
   ============================================= */
const pipelineNodes = [
  { label: "SOURCE", icon: FileStack, color: "from-purple-500/20 to-purple-600/10", border: "border-purple-500/25", text: "text-purple-400" },
  { label: "Text Extraction", icon: FileText, color: "from-blue-500/15 to-blue-600/5", border: "border-blue-500/20", text: "text-blue-400" },
  { label: "Semantic Chunking", icon: Layers, color: "from-sky-500/15 to-sky-600/5", border: "border-sky-500/20", text: "text-sky-400" },
  { label: "Embeddings", icon: Cpu, color: "from-cyan-500/15 to-cyan-600/5", border: "border-cyan-500/20", text: "text-cyan-400" },
  { label: "Vector Search", icon: Database, color: "from-teal-500/15 to-teal-600/5", border: "border-teal-500/20", text: "text-teal-400" },
  { label: "RAG Retrieval", icon: Network, color: "from-emerald-500/15 to-emerald-600/5", border: "border-emerald-500/20", text: "text-emerald-400" },
  { label: "AI Generation", icon: Brain, color: "from-violet-500/15 to-violet-600/5", border: "border-violet-500/20", text: "text-violet-400" },
  { label: "Learning Content", icon: GraduationCap, color: "from-pink-500/20 to-pink-600/10", border: "border-pink-500/25", text: "text-pink-400" },
];

const RAGSection = () => {
  const ref = useSectionReveal();
  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto" ref={ref}>
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left text */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-semibold text-white/50 uppercase tracking-wider">
            <FlaskConical className="h-3 w-3 text-cyan-400" />
            Under The Hood
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white/95">
            Powered by{" "}
            <span className="text-gradient">Intelligent Retrieval</span>
          </h2>
          <p className="text-white/40 text-sm leading-relaxed">
            EduSlide AI uses a multi-stage RAG (Retrieval-Augmented Generation) pipeline — not just a simple chatbot.
            Your content is extracted, semantically chunked, embedded into vectors, and retrieved with precision
            before Gemini generates your educational material.
          </p>
          <div className="space-y-3">
            {[
              "Local embeddings — fast, free, and private",
              "Pinecone vector database for semantic search",
              "Multi-query retrieval with Reciprocal Rank Fusion",
              "Google Gemini 3.6 Flash for generation",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-sm text-white/55">
                <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right pipeline */}
        <div className="relative flex flex-col items-center gap-0">
          {pipelineNodes.map((node, i) => (
            <div key={node.label} className="relative w-full max-w-xs flex flex-col items-center">
              {/* Node */}
              <div className={`group w-full flex items-center gap-3 px-4 py-3 rounded-xl border bg-gradient-to-r transition-all duration-300 hover:-translate-x-1 cursor-default ${node.color} ${node.border}`}>
                <div className={`w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0`}>
                  <node.icon className={`h-3.5 w-3.5 ${node.text}`} />
                </div>
                <span className={`text-xs font-semibold ${node.text}`}>{node.label}</span>
                {(i === 0 || i === pipelineNodes.length - 1) && (
                  <div className="ml-auto flex h-1.5 w-1.5 rounded-full animate-ping-slow" style={{backgroundColor: i === 0 ? 'rgba(139,92,246,0.8)' : 'rgba(236,72,153,0.8)'}} />
                )}
              </div>
              {/* Connector */}
              {i < pipelineNodes.length - 1 && (
                <div className="relative h-6 flex items-center justify-center">
                  <div className="w-px h-full pipeline-line opacity-60" />
                  <div className="absolute bottom-0 w-1.5 h-1.5 rotate-45 border-r border-b border-purple-400/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =============================================
   CONTENT OUTPUT (SPLIT SCREEN)
   ============================================= */
const ContentOutputSection = () => {
  const ref = useSectionReveal();
  return (
    <section className="py-24 px-4 sm:px-6 bg-white/[0.01] border-y border-white/[0.04]" ref={ref}>
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-semibold text-white/50 uppercase tracking-wider">
            <Sparkles className="h-3 w-3 text-purple-400" />
            The Transformation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white/95">
            Raw Content →{" "}
            <span className="text-gradient">Complete Learning Kit</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left — source */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs text-white/35 font-semibold uppercase tracking-wider">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
              From raw content...
            </div>
            <div className="rounded-xl border border-red-500/15 bg-red-500/5 p-4 flex items-start gap-3">
              <Youtube className="h-8 w-8 text-red-400 shrink-0 mt-1" />
              <div>
                <p className="text-xs font-semibold text-white/70 mb-1">YouTube Video</p>
                <p className="text-[11px] text-white/35 leading-relaxed font-mono">
                  https://youtube.com/watch?v=dQw4w9WgXcQ
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="px-2 py-0.5 rounded bg-red-500/15 text-[10px] text-red-300">1:24:07</div>
                  <div className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-white/30">Auto-transcript</div>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="text-[11px] text-white/25 font-mono leading-relaxed line-clamp-6">
                "...and so today we're going to talk about machine learning fundamentals.
                When we think about neural networks, we have to consider the basic building blocks —
                the perceptron. The perceptron was invented in 1957 by Frank Rosenblatt and it's
                essentially a mathematical model of a biological neuron. We start with inputs x1, x2, x3..."
              </p>
            </div>
          </div>

          {/* Right — outputs */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs text-white/35 font-semibold uppercase tracking-wider">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              ...to complete learning material
            </div>
            {[
              { icon: FileText, label: "Structured Notes", desc: "7–10 organized sections", color: "text-purple-400", bg: "bg-purple-500/8", border: "border-purple-500/15" },
              { icon: Layers, label: "Executive Summary", desc: "Key takeaways at a glance", color: "text-blue-400", bg: "bg-blue-500/8", border: "border-blue-500/15" },
              { icon: Brain, label: "MCQs + Explanations", desc: "10 quality questions", color: "text-cyan-400", bg: "bg-cyan-500/8", border: "border-cyan-500/15" },
              { icon: BookOpen, label: "Glossary", desc: "Key terms defined", color: "text-violet-400", bg: "bg-violet-500/8", border: "border-violet-500/15" },
              { icon: Lightbulb, label: "Real-World Examples", desc: "Analogies & context", color: "text-amber-400", bg: "bg-amber-500/8", border: "border-amber-500/15" },
              { icon: PresentationIcon, label: "PowerPoint Slides", desc: "Ready to present", color: "text-pink-400", bg: "bg-pink-500/8", border: "border-pink-500/15" },
            ].map((out) => (
              <div key={out.label} className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl border ${out.bg} ${out.border} transition-all duration-200 hover:-translate-x-0.5`}>
                <div className={`w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0`}>
                  <out.icon className={`h-3.5 w-3.5 ${out.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white/80">{out.label}</p>
                  <p className="text-[10px] text-white/35">{out.desc}</p>
                </div>
                <CheckCircle2 className="h-3.5 w-3.5 text-green-400/70 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* =============================================
   TEMPLATES SECTION
   ============================================= */
const templates = [
  { title: "Lecture Notes", desc: "Structured weekly lecture prep", icon: BookOpen, badge: "Popular", color: "purple" },
  { title: "Exam Preparation", desc: "MCQs, summaries, and revision", icon: Brain, badge: "Hot", color: "red" },
  { title: "Quick Revision", desc: "Concise bullet-point summaries", icon: Zap, badge: null, color: "blue" },
  { title: "Technical Topic", desc: "Deep dives with examples", icon: Cpu, badge: null, color: "cyan" },
  { title: "Research Summary", desc: "Academic paper breakdown", icon: FlaskConical, badge: "New", color: "violet" },
  { title: "Presentation", desc: "Slide-optimized content", icon: PresentationIcon, badge: null, color: "pink" },
];

const templateColorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  purple: { bg: "bg-purple-500/8", border: "border-purple-500/15", text: "text-purple-400", badge: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
  red:    { bg: "bg-red-500/8",    border: "border-red-500/15",    text: "text-red-400",    badge: "bg-red-500/20 text-red-300 border-red-500/30" },
  blue:   { bg: "bg-blue-500/8",   border: "border-blue-500/15",   text: "text-blue-400",   badge: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  cyan:   { bg: "bg-cyan-500/8",   border: "border-cyan-500/15",   text: "text-cyan-400",   badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
  violet: { bg: "bg-violet-500/8", border: "border-violet-500/15", text: "text-violet-400", badge: "bg-violet-500/20 text-violet-300 border-violet-500/30" },
  pink:   { bg: "bg-pink-500/8",   border: "border-pink-500/15",   text: "text-pink-400",   badge: "bg-pink-500/20 text-pink-300 border-pink-500/30" },
};

const TemplatesSection = () => {
  const ref = useSectionReveal();
  const navigate = useNavigate();
  return (
    <section id="templates" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto" ref={ref}>
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-semibold text-white/50 uppercase tracking-wider">
          <Star className="h-3 w-3 text-amber-400" />
          Templates
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white/95">
          Start with a{" "}
          <span className="text-gradient">Proven Template</span>
        </h2>
        <p className="text-white/40 text-sm max-w-md mx-auto">
          Pre-configured content strategies built for specific learning scenarios.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((t) => {
          const c = templateColorMap[t.color];
          return (
            <div
              key={t.title}
              className={`group shine relative p-5 rounded-2xl border cursor-pointer transition-all duration-300 hover:-translate-y-1 hover-glow-purple ${c.bg} ${c.border}`}
              onClick={() => navigate("/select")}
            >
              {t.badge && (
                <div className={`absolute top-4 right-4 px-2 py-0.5 rounded-md border text-[10px] font-semibold ${c.badge}`}>
                  {t.badge}
                </div>
              )}
              <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <t.icon className={`h-5 w-5 ${c.text}`} />
              </div>
              {/* Mini preview */}
              <div className="mb-4 space-y-1.5 opacity-60">
                {[70, 50, 80, 40].map((w, i) => (
                  <div key={i} className="h-1 rounded-full bg-white/10" style={{ width: `${w}%` }} />
                ))}
              </div>
              <h3 className="text-sm font-bold text-white/90 mb-1">{t.title}</h3>
              <p className="text-[11px] text-white/40">{t.desc}</p>
              <div className={`flex items-center gap-1 mt-3 text-[11px] font-semibold ${c.text} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                Use Template <ChevronRight className="h-3 w-3" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

/* =============================================
   PRICING SECTION
   ============================================= */
const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Perfect to get started",
    features: ["5 generations/month", "YouTube & URL sources", "Notes + Summary", "Basic MCQs", "Community support"],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    desc: "For serious educators",
    features: ["Unlimited generations", "All source types", "Notes, Summary, MCQs", "Glossary + Examples", "PPT Export", "Priority support"],
    cta: "Start Pro",
    highlight: true,
    badge: "Recommended",
  },
  {
    name: "Team",
    price: "$39",
    period: "per month",
    desc: "For institutions & schools",
    features: ["Everything in Pro", "5 team members", "Shared workspace", "Admin dashboard", "API access", "Dedicated support"],
    cta: "Contact Us",
    highlight: false,
  },
];

const PricingSection = () => {
  const ref = useSectionReveal();
  const navigate = useNavigate();
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 bg-white/[0.01] border-y border-white/[0.04]" ref={ref}>
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-semibold text-white/50 uppercase tracking-wider">
            <BarChart3 className="h-3 w-3 text-purple-400" />
            Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white/95">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                plan.highlight
                  ? "bg-gradient-to-b from-purple-500/10 to-blue-500/5 border-purple-500/30 shadow-[0_0_40px_rgba(124,58,237,0.1)] glow-purple"
                  : "bg-white/[0.02] border-white/[0.07] hover-glow-purple"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-[10px] font-bold text-white shadow-lg shadow-purple-900/40">
                  {plan.badge}
                </div>
              )}
              <div className="mb-5">
                <h3 className="text-sm font-bold text-white/70 mb-2">{plan.name}</h3>
                <div className="flex items-end gap-1.5 mb-1">
                  <span className="text-4xl font-extrabold text-white/95 tracking-tight">{plan.price}</span>
                  <span className="text-xs text-white/30 mb-1.5">/{plan.period}</span>
                </div>
                <p className="text-xs text-white/35">{plan.desc}</p>
              </div>

              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-white/55">
                    <CheckCircle2 className="h-3.5 w-3.5 text-purple-400 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full h-9 text-xs font-semibold rounded-xl transition-all duration-200 ${
                  plan.highlight
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-900/30"
                    : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/8 hover:text-white"
                }`}
                onClick={() => navigate("/select")}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =============================================
   FINAL CTA SECTION
   ============================================= */
const CTASection = () => {
  const ref = useSectionReveal();
  const navigate = useNavigate();
  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto" ref={ref}>
      <div className="relative text-center rounded-3xl border border-purple-500/15 bg-gradient-to-b from-purple-500/8 to-blue-500/5 py-20 px-6 overflow-hidden">
        {/* Blobs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-[11px] font-semibold text-purple-300 uppercase tracking-wider">
            <Sparkles className="h-3 w-3" />
            Ready to Start?
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white/95 max-w-2xl mx-auto leading-tight">
            Transform Your Learning{" "}
            <span className="text-gradient-animated">Resources Today</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Join educators and students who create better learning materials in minutes, not hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              size="lg"
              className="h-12 px-8 text-sm font-bold rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-0 shadow-[0_0_40px_rgba(124,58,237,0.35)] hover:shadow-[0_0_50px_rgba(124,58,237,0.5)] transition-all duration-300 hover:-translate-y-0.5"
              onClick={() => navigate("/select")}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Create Learning Content — It's Free
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-12 px-6 text-sm font-semibold rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300"
              onClick={() => document.getElementById("preview")?.scrollIntoView({ behavior: "smooth" })}
            >
              See How It Works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =============================================
   LANDING PAGE (root)
   ============================================= */
const Landing = () => {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <ProductPreview />
      <FeaturesSection />
      <HowItWorksSection />
      <RAGSection />
      <ContentOutputSection />
      <TemplatesSection />
      <PricingSection />
      <CTASection />
    </div>
  );
};

export default Landing;
