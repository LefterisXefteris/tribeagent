"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Globe,
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  Menu,
  X,
  Workflow,
  ExternalLink,
  ShoppingCart,
} from "lucide-react";

// ─── Logo ──────────────────────────────────────────────────────────────────

function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {/* Background */}
      <rect width="32" height="32" rx="8.5" fill="#18181b" />
      <rect width="32" height="32" rx="8.5" stroke="white" strokeOpacity="0.12" strokeWidth="1" />
      {/* Top highlight */}
      <rect x="1" y="1" width="30" height="13" rx="7.5" fill="white" fillOpacity="0.05" />
      {/* Connection lines */}
      <line x1="16" y1="10" x2="10" y2="22.5" stroke="white" strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="16" y1="10" x2="22" y2="22.5" stroke="white" strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="10" y1="22.5" x2="22" y2="22.5" stroke="white" strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round" />
      {/* Node glow */}
      <circle cx="16" cy="10" r="4.5" fill="white" fillOpacity="0.1" />
      {/* Nodes */}
      <circle cx="16" cy="10" r="2.6" fill="white" />
      <circle cx="10" cy="22.5" r="2.1" fill="white" fillOpacity="0.72" />
      <circle cx="22" cy="22.5" r="2.1" fill="white" fillOpacity="0.72" />
    </svg>
  );
}

function Logo({ size = 32 }: { size?: number }) {
  const fs = size <= 28 ? "0.875rem" : "1rem";
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark size={size} />
      <span
        style={{
          fontFamily: "var(--font-outfit), system-ui, sans-serif",
          letterSpacing: "-0.028em",
          lineHeight: 1,
        }}
      >
        <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: 400, fontSize: fs }}>tribe</span>
        <span style={{ color: "rgba(255,255,255,1)", fontWeight: 700, fontSize: fs }}>agent</span>
      </span>
    </div>
  );
}

// ─── Reveal-on-scroll hook ─────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// ─── Nav ───────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-zinc-950/90 backdrop-blur-md border-b border-white/5"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#">
          <Logo size={32} />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 font-medium"
            >
              {l.label}
            </a>
          ))}
          <a href="#contact">
            <Button
              size="sm"
              className="bg-white text-zinc-950 hover:bg-zinc-100 shadow-lg shadow-white/10 transition-all hover:shadow-white/20 hover:-translate-y-0.5 cursor-pointer"
            >
              Get in touch
            </Button>
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-zinc-950/95 backdrop-blur-xl border-b border-white/5">
          <div className="px-5 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-zinc-300 hover:text-white py-1"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              <Button
                size="sm"
                className="w-full bg-white text-zinc-950 hover:bg-zinc-100 cursor-pointer"
              >
                Get in touch
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────

const automationSteps = [
  {
    icon: <Globe className="w-4 h-4" />,
    label: "New enquiry from website",
    sub: "Contact form submitted",
    color: "violet" as const,
  },
  {
    icon: <Bot className="w-4 h-4" />,
    label: "AI agent qualifies lead",
    sub: "Scoring & routing in progress",
    color: "sky" as const,
  },
  {
    icon: <CheckCircle2 className="w-4 h-4" />,
    label: "CRM updated + reply sent",
    sub: "Done in 1.2s",
    color: "emerald" as const,
  },
];

const stepColors = {
  violet: { bg: "bg-white/10", text: "text-white", ring: "ring-white/20", dot: "bg-white" },
  sky: { bg: "bg-white/7", text: "text-zinc-200", ring: "ring-white/15", dot: "bg-zinc-200" },
  emerald: { bg: "bg-white/5", text: "text-zinc-300", ring: "ring-white/10", dot: "bg-zinc-300" },
};

const integrationLogos = [
  "n8n", "OpenAI", "Shopify", "Google Sheets", "Stripe",
  "Slack", "Notion", "WhatsApp", "Airtable", "Gmail",
  "n8n", "OpenAI", "Shopify", "Google Sheets", "Stripe",
  "Slack", "Notion", "WhatsApp", "Airtable", "Gmail",
];

function Hero() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveStep((s) => (s + 1) % 3), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-white/[0.03] blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 w-full pt-24 pb-8">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── Left col ── */}
          <div className="animate-fade-in-up" style={{ animationFillMode: "backwards" }}>
            <h1
              className="text-5xl sm:text-6xl xl:text-7xl text-white mb-6 leading-[1.04]"
              style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif", fontWeight: 800, letterSpacing: "-0.03em", animationFillMode: "backwards" }}
            >
              Your business,
              <br />
              <span style={{ color: "rgba(255,255,255,0.55)" }}>
                on autopilot.
              </span>
            </h1>

            <p className="text-lg text-zinc-400 max-w-lg mb-8 leading-relaxed">
              We build modern 2026-ready websites with SEO &amp; AEO built in — so
              Google <em>and</em> AI tools find you. Plus custom automations that run
              your ops while you sleep.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a href="#contact">
                <Button
                  size="lg"
                  className="bg-white text-zinc-950 px-8 hover:bg-zinc-100 shadow-xl shadow-white/10 hover:shadow-white/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  Start a project
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
              <a href="#work">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/15 text-zinc-300 hover:text-white hover:border-white/30 hover:bg-white/5 cursor-pointer"
                >
                  See our work
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-zinc-500">
              {["SEO + AEO Ready", "SME-focused", "London-based", "Hospitality expertise"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right col — live automation card ── */}
          <div
            className="animate-fade-in-up relative"
            style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
          >
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-2xl bg-white/[0.03] blur-xl" />

            <div className="relative rounded-2xl border border-white/8 bg-zinc-900/70 backdrop-blur-xl overflow-hidden shadow-2xl">
              {/* Card header */}
              <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-xs text-zinc-400 font-medium">Live automation preview</span>
                </div>
                <span className="text-xs text-zinc-600 font-mono">tribe-agent.n8n</span>
              </div>

              {/* Steps */}
              <div className="p-5 space-y-3">
                {automationSteps.map((step, i) => {
                  const c = stepColors[step.color];
                  const isActive = activeStep === i;
                  const isDone = activeStep > i;
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-4 p-3.5 rounded-xl border transition-all duration-500 ${isActive
                        ? `${c.bg} border-transparent ring-1 ${c.ring}`
                        : isDone
                          ? "bg-zinc-800/30 border-zinc-800/60 opacity-60"
                          : "bg-zinc-800/20 border-zinc-800/40 opacity-40"
                        }`}
                    >
                      <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${isActive || isDone ? c.bg : "bg-zinc-800/50"}`}>
                        <span className={isDone ? "text-white" : isActive ? c.text : "text-zinc-600"}>
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : step.icon}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${isActive ? "text-white" : "text-zinc-400"}`}>
                          {step.label}
                        </p>
                        <p className="text-xs text-zinc-600 truncate">{step.sub}</p>
                      </div>
                      {isActive && (
                        <div className="flex gap-1 shrink-0">
                          {[0, 1, 2].map((d) => (
                            <div
                              key={d}
                              className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse`}
                              style={{ animationDelay: `${d * 0.2}s` }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Stats row */}
              <div className="px-5 pb-5 grid grid-cols-3 gap-3">
                {[
                  { label: "Leads saved", value: "3.2k" },
                  { label: "Hours saved / mo", value: "140+" },
                  { label: "Avg response", value: "< 2s" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-zinc-800/40 border border-zinc-700/40 p-3 text-center">
                    <p className="text-base font-bold text-white" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating integration badges */}
            <div className="absolute -top-4 -right-4 bg-zinc-900 border border-white/10 rounded-full px-3 py-1.5 text-xs text-zinc-300 font-medium shadow-lg flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-white/60" /> n8n
            </div>
            <div className="absolute -bottom-4 -left-4 bg-zinc-900 border border-white/10 rounded-full px-3 py-1.5 text-xs text-zinc-300 font-medium shadow-lg flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-white/60" /> OpenAI
            </div>
            <div className="absolute top-1/2 -right-5 -translate-y-1/2 bg-zinc-900 border border-white/10 rounded-full px-3 py-1.5 text-xs text-zinc-300 font-medium shadow-lg flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-white/60" /> Shopify
            </div>
          </div>

        </div>
      </div>

      {/* Integration marquee */}
      <div className="relative z-10 mt-4 pb-10 overflow-hidden border-t border-zinc-800/60 pt-6">
        <p className="text-center text-xs text-zinc-600 uppercase tracking-widest mb-4">Integrates with your tools</p>
        <div className="flex">
          <div className="flex gap-6 animate-marquee whitespace-nowrap">
            {integrationLogos.map((name, i) => (
              <span key={i} className="text-xs text-zinc-500 font-medium px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 hover:text-zinc-300 hover:border-zinc-600 transition-colors cursor-default shrink-0">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ──────────────────────────────────────────────────────────────

const services = [
  {
    icon: <Workflow className="w-6 h-6" />,
    badge: "Automation",
    title: "AI Automations",
    tagline: "Work smarter, not harder",
    description:
      "Custom n8n workflows and AI agents that run your repetitive tasks on autopilot — lead gen, customer support, inventory sync, document processing and more.",
    features: [
      "Lead generation pipelines",
      "Customer support bots",
      "Inventory sync & alerts",
      "Document processing",
    ],
    pricing: "Custom pricing",
    color: "violet",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    badge: "Web Design",
    title: "Website Modernisation",
    tagline: "Your best salesperson, 24/7",
    description:
      "Modern 2026-ready websites built to rank on Google and get discovered by AI tools like ChatGPT and Perplexity — so your business shows up everywhere customers look.",
    features: [
      "Framer & Next.js builds",
      "SEO + AEO optimised",
      "AI-discoverable content",
      "Mobile-first & CMS-ready",
    ],
    pricing: "From £300",
    color: "sky",
  },
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    badge: "SaaS Product",
    title: "Photo to Product Tool",
    tagline: "Automate your ecommerce listings",
    description:
      "A SaaS tool that takes batches of up to 100 product images and creates high-converting descriptions, SEO, and AEO to increase visibility by up to 100%.",
    features: [
      "Batch process up to 100 images",
      "AI-generated descriptions & AEO",
      "SEO & visibility optimisation",
      "Sync to Shopify, Amazon & Etsy",
    ],
    pricing: "£30 / mo",
    color: "violet",
  },
];

const colorMap: Record<
  string,
  { bg: string; text: string; border: string; badge: string; glow: string }
> = {
  violet: {
    bg: "bg-white/8",
    text: "text-white",
    border: "border-white/10",
    badge: "bg-white/8 text-zinc-200 border-white/15",
    glow: "group-hover:shadow-white/5",
  },
  sky: {
    bg: "bg-white/6",
    text: "text-zinc-200",
    border: "border-white/8",
    badge: "bg-white/6 text-zinc-300 border-white/12",
    glow: "group-hover:shadow-white/5",
  },
  emerald: {
    bg: "bg-white/5",
    text: "text-zinc-300",
    border: "border-white/8",
    badge: "bg-white/5 text-zinc-400 border-white/10",
    glow: "group-hover:shadow-white/5",
  },
};

function Services() {
  const ref = useReveal();

  return (
    <section id="services" className="py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="reveal text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-zinc-700 text-zinc-400 bg-zinc-800/40 text-xs uppercase tracking-widest"
          >
            What we do
          </Badge>
          <h2
            className="text-4xl sm:text-5xl font-display font-700 text-white mb-4"
            style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif", fontWeight: 700 }}
          >
            How we help
            <br />
            your business grow
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg">
            Not a generic agency. We focus on practical, high-impact solutions
            for small and medium businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((svc, i) => {
            const c = colorMap[svc.color];
            return (
              <ServiceCard key={svc.title} svc={svc} c={c} delay={i * 120} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  svc,
  c,
  delay,
}: {
  svc: (typeof services)[0];
  c: (typeof colorMap)["violet"];
  delay: number;
}) {
  const ref = useReveal();

  return (
    <div
      ref={ref}
      className="reveal group"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Card
        className={`h-full bg-zinc-900/50 border-zinc-800/60 hover:border-zinc-700 transition-all duration-300 group-hover:shadow-2xl ${c.glow} p-7 flex flex-col gap-5`}
      >
        {/* Icon + badge */}
        <div className="flex items-start justify-between">
          <div
            className={`w-12 h-12 rounded-xl ${c.bg} ${c.text} flex items-center justify-center`}
          >
            {svc.icon}
          </div>
          <Badge
            variant="outline"
            className={`text-xs font-medium px-2.5 py-0.5 ${c.badge}`}
          >
            {svc.badge}
          </Badge>
        </div>

        {/* Text */}
        <div className="flex-1">
          <p className={`text-xs font-medium ${c.text} mb-1.5 uppercase tracking-wider`}>
            {svc.tagline}
          </p>
          <h3
            className="text-xl font-display font-700 text-white mb-3"
            style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif", fontWeight: 700 }}
          >
            {svc.title}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {svc.description}
          </p>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-2 pt-4 border-t border-zinc-800/60 mb-2">
          {svc.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-zinc-400">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
              {f}
            </li>
          ))}
        </ul>

        {/* Pricing */}
        <div className="pt-4 mt-auto border-t border-zinc-800/60 flex flex-row items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">Pricing</span>
          <span className="text-base font-bold text-white tracking-wide" style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}>
            {svc.pricing}
          </span>
        </div>
      </Card>
    </div>
  );
}

// ─── Contact ───────────────────────────────────────────────────────────────

function Contact() {
  const ref = useReveal();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    business: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production, wire to a backend / Resend / Formspree etc.
    setSubmitted(true);
  }

  return (
    <section id="contact" className="py-28 px-5 bg-zinc-950/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <div ref={ref} className="reveal">
            <Badge
              variant="outline"
              className="mb-5 border-zinc-700 text-zinc-400 bg-zinc-800/40 text-xs uppercase tracking-widest"
            >
              Get in touch
            </Badge>
            <h2
              className="text-4xl sm:text-5xl font-display font-700 text-white mb-5"
              style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif", fontWeight: 700 }}
            >
              Ready to automate
              <br />
              your business?
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed mb-10">
              Tell us what&apos;s slowing you down. We&apos;ll come back with a clear
              plan and a straight price — no fluff, no obligation.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:lefteris@tribeagent.co.uk"
                className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/60 hover:border-white/20 group transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-white/8 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-0.5">Email us</p>
                  <p className="text-sm text-white font-medium group-hover:text-zinc-300 transition-colors">
                    lefteris@tribeagent.co.uk
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-600 ml-auto group-hover:text-white transition-colors" />
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/60">
                <div className="w-10 h-10 rounded-lg bg-white/8 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-0.5">Location</p>
                  <p className="text-sm text-white font-medium">
                    Shoreditch, London, UK
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <ContactForm
            formState={formState}
            setFormState={setFormState}
            submitted={submitted}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
}

function ContactForm({
  formState,
  setFormState,
  submitted,
  onSubmit,
}: {
  formState: { name: string; email: string; business: string; message: string };
  setFormState: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      business: string;
      message: string;
    }>
  >;
  submitted: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const ref = useReveal();

  if (submitted) {
    return (
      <div ref={ref} className="reveal flex items-center justify-center">
        <div className="text-center p-10 rounded-2xl bg-zinc-900/50 border border-zinc-800/60 w-full">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h3
            className="text-2xl font-display font-700 text-white mb-2"
            style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
          >
            Message sent!
          </h3>
          <p className="text-zinc-400 text-sm">
            Thanks — we&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: "150ms" }}>
      <form
        onSubmit={onSubmit}
        className="p-7 rounded-2xl bg-zinc-900/50 border border-zinc-800/60 space-y-5"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
              Your name
            </label>
            <Input
              required
              placeholder="Jane Smith"
              className="bg-zinc-800/60 border-zinc-700/60 text-white placeholder:text-zinc-600 focus:border-white/30 focus:ring-white/10"
              value={formState.name}
              onChange={(e) =>
                setFormState((s) => ({ ...s, name: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
              Email
            </label>
            <Input
              required
              type="email"
              placeholder="jane@business.com"
              className="bg-zinc-800/60 border-zinc-700/60 text-white placeholder:text-zinc-600 focus:border-white/30 focus:ring-white/10"
              value={formState.email}
              onChange={(e) =>
                setFormState((s) => ({ ...s, email: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
            Business name
          </label>
          <Input
            placeholder="Your Business Ltd."
            className="bg-zinc-800/60 border-zinc-700/60 text-white placeholder:text-zinc-600 focus:border-white/30 focus:ring-white/10"
            value={formState.business}
            onChange={(e) =>
              setFormState((s) => ({ ...s, business: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
            How can we help?
          </label>
          <Textarea
            required
            placeholder="Tell us about your business and what you'd like to automate or build..."
            rows={4}
            className="bg-zinc-800/60 border-zinc-700/60 text-white placeholder:text-zinc-600 focus:border-white/30 focus:ring-white/10 resize-none"
            value={formState.message}
            onChange={(e) =>
              setFormState((s) => ({ ...s, message: e.target.value }))
            }
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-white text-zinc-950 hover:bg-zinc-100 shadow-lg shadow-white/10 hover:shadow-white/20 hover:-translate-y-0.5 transition-all cursor-pointer"
        >
          Send message
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>

        <p className="text-center text-xs text-zinc-600">
          We respond within 24 hours. No spam, ever.
        </p>
      </form>
    </div>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-12 px-5 border-t border-zinc-800/60">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo size={28} />

        <p className="text-xs text-zinc-600 text-center">
          © {new Date().getFullYear()} Tribe Agent. All rights reserved.
          London, UK.
        </p>

        <div className="flex items-center gap-5 text-xs text-zinc-600">
          <a
            href="mailto:lefteris@tribeagent.co.uk"
            className="hover:text-zinc-400 transition-colors"
          >
            lefteris@tribeagent.co.uk
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Nav />
      <Hero />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}
