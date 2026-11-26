// =============================================================================
// AgencyLanding.jsx — single-file landing page for a software development agency
// React 18 + Tailwind CSS (utility classes only, no extra CSS, no icon library).
//
// Pages (switched with local state, swap for react-router later):
//   "home"    → Navbar, Hero, TrustBar, Services, MoreServices, Process, TechStack,
//               Work, WhyUs, Testimonials, Engagement, FAQ, CTA, Contact, Footer
//   "careers" → CareersHero, Perks, Openings, ApplyForm, Footer
//
// To split later: every section below is its own component; DATA lives at the top.
// Replace BRAND / contact details / form onSubmit handlers with your own.
// =============================================================================
import React, { useState } from "react";

// -----------------------------------------------------------------------------
// DATA
// -----------------------------------------------------------------------------
const BRAND = {
  name: "Codexa",
  tagline: "Software, automation & growth — built in one place",
  email: "hello@example.com",
  phone: "+91 00000 00000",
  address: "Your Office Address, City, Country",
};

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#engagement" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { value: "250+", label: "Projects delivered" },
  { value: "120+", label: "Happy clients" },
  { value: "15+", label: "Countries served" },
  { value: "98%", label: "Client retention" },
];

const SERVICES = [
  {
    icon: "phone",
    title: "Mobile App Development",
    desc: "Native and cross-platform apps that feel fast and look polished.",
    points: ["iOS & Android", "React Native / Flutter", "App Store launch", "Push & in-app payments"],
  },
  {
    icon: "browser",
    title: "Web App Development",
    desc: "Scalable SaaS products, dashboards and portals built for growth.",
    points: ["React / Next.js", "Node / Python APIs", "Multi-tenant SaaS", "Admin dashboards"],
  },
  {
    icon: "globe",
    title: "Website Development",
    desc: "High-converting business websites and landing pages.",
    points: ["Corporate websites", "Landing pages", "CMS (WordPress / Headless)", "Speed & SEO ready"],
  },
  {
    icon: "spark",
    title: "AI Automation",
    desc: "Put AI to work on the repetitive parts of your business.",
    points: ["AI chatbots & agents", "Document processing", "Workflow automation", "LLM integrations"],
  },
  {
    icon: "chat",
    title: "WhatsApp Automation",
    desc: "Sell, support and notify customers where they already are.",
    points: ["WhatsApp Business API", "Chatbots & flows", "Broadcast campaigns", "CRM integration"],
  },
  {
    icon: "pen",
    title: "UI / UX Design",
    desc: "Research-led design that users understand on the first try.",
    points: ["User research", "Wireframes & prototypes", "Design systems", "Usability testing"],
  },
  {
    icon: "target",
    title: "Performance Ads",
    desc: "ROI-focused campaigns that turn spend into customers.",
    points: ["Google Ads", "Meta (FB / Instagram) Ads", "LinkedIn Ads", "Conversion tracking"],
  },
  {
    icon: "megaphone",
    title: "Social Media Marketing",
    desc: "Consistent content and community that builds your brand.",
    points: ["Content calendar", "Reels & creatives", "Community management", "Monthly analytics"],
  },
];

const MORE_SERVICES = [
  { icon: "search", title: "SEO & Content", desc: "Rank higher with technical SEO and content strategy." },
  { icon: "cart", title: "E-commerce", desc: "Shopify, WooCommerce and custom stores." },
  { icon: "cloud", title: "Cloud & DevOps", desc: "AWS / Azure / GCP setup, CI/CD and monitoring." },
  { icon: "layers", title: "Custom CRM / ERP", desc: "Internal tools shaped around your workflow." },
  { icon: "plug", title: "API & Integrations", desc: "Payment gateways, CRMs, ERPs and third-party APIs." },
  { icon: "shield", title: "QA & Testing", desc: "Manual, automated and performance testing." },
  { icon: "chart", title: "Data & Analytics", desc: "Dashboards, BI reports and data pipelines." },
  { icon: "brush", title: "Branding & Graphics", desc: "Logos, brand identity and marketing collateral." },
  { icon: "video", title: "Video & UGC", desc: "Product videos, explainers and creator content." },
  { icon: "mail", title: "Email & SMS Marketing", desc: "Automated journeys and campaigns that convert." },
  { icon: "wrench", title: "Maintenance & Support", desc: "Updates, security patches and 24/7 monitoring." },
  { icon: "users", title: "Dedicated Teams", desc: "Hire vetted developers and designers by the month." },
];

const PROCESS = [
  { step: "01", title: "Discover", desc: "We learn your goals, users and constraints in a free consultation." },
  { step: "02", title: "Plan & Design", desc: "Scope, timeline, wireframes and a clickable prototype." },
  { step: "03", title: "Build", desc: "Agile sprints with weekly demos so you see progress early." },
  { step: "04", title: "Test & Launch", desc: "QA, performance checks and a smooth go-live." },
  { step: "05", title: "Grow & Support", desc: "Marketing, analytics and ongoing improvements." },
];

const TECH = [
  "React", "Next.js", "React Native", "Flutter", "Node.js", "Python", "Laravel", "TypeScript",
  "PostgreSQL", "MongoDB", "AWS", "Firebase", "OpenAI", "LangChain", "Figma", "WhatsApp API",
];

const WORK = [
  { tag: "Web App", title: "Logistics SaaS dashboard", result: "40% faster dispatching", color: "from-indigo-500 to-violet-500" },
  { tag: "Mobile App", title: "Fitness booking app", result: "50K+ downloads", color: "from-emerald-500 to-teal-500" },
  { tag: "AI Automation", title: "Invoice reading assistant", result: "20 hrs/week saved", color: "from-amber-500 to-orange-500" },
  { tag: "WhatsApp", title: "Retail order bot", result: "3x repeat orders", color: "from-green-500 to-lime-500" },
  { tag: "Ads + Social", title: "D2C brand growth", result: "4.2x ROAS", color: "from-pink-500 to-rose-500" },
  { tag: "Website", title: "Real-estate portal", result: "2x qualified leads", color: "from-sky-500 to-cyan-500" },
];

const WHY_US = [
  { title: "One partner, full stack", desc: "Design, development, automation and marketing under one roof." },
  { title: "Transparent pricing", desc: "Fixed quotes or clear monthly rates. No hidden costs." },
  { title: "Weekly demos", desc: "You see working software every week, not just at the end." },
  { title: "You own the code", desc: "Full source code and IP handed over on delivery." },
  { title: "Secure by default", desc: "NDAs, access controls and secure coding practices." },
  { title: "Post-launch support", desc: "Free support window after launch, then flexible plans." },
];

const TESTIMONIALS = [
  { name: "Client A", role: "Founder, Retail Brand", quote: "They built our app and WhatsApp bot in one go. Orders went up and support calls went down." },
  { name: "Client B", role: "CEO, Logistics Startup", quote: "Clear communication, weekly demos and they actually hit the deadline. Rare to find." },
  { name: "Client C", role: "Marketing Head, D2C", quote: "Our ad spend finally makes sense. The reporting is clear and ROAS keeps improving." },
];

const ENGAGEMENT = [
  {
    name: "Fixed Project",
    price: "Custom quote",
    desc: "Best for clearly defined scopes like websites or MVPs.",
    features: ["Fixed timeline & cost", "Milestone payments", "Design + development", "30 days free support"],
    featured: false,
  },
  {
    name: "Dedicated Team",
    price: "Monthly",
    desc: "Best for products that keep evolving.",
    features: ["Full-time developers / designers", "Project manager included", "Scale up or down monthly", "Daily standups"],
    featured: true,
  },
  {
    name: "Growth Retainer",
    price: "Monthly",
    desc: "Best for ads, social media and ongoing automation.",
    features: ["Ads & social management", "Monthly content plan", "Automation upkeep", "Monthly performance report"],
    featured: false,
  },
];

const FAQS = [
  { q: "How long does a typical project take?", a: "A website takes 2–4 weeks, an MVP app 6–12 weeks. We share a detailed timeline after the discovery call." },
  { q: "How much does it cost?", a: "It depends on scope. After a free consultation we send a fixed quote or a monthly rate with no hidden costs." },
  { q: "Do I own the source code?", a: "Yes. Full source code and intellectual property are transferred to you on final payment." },
  { q: "Do you sign an NDA?", a: "Yes, we are happy to sign an NDA before you share any details." },
  { q: "Do you provide support after launch?", a: "Every project includes a free support window, followed by optional maintenance plans." },
  { q: "Can you work with my existing team?", a: "Yes. We can add developers or designers to your team or take over a part of the project." },
];

const JOBS = [
  { title: "Senior React Developer", type: "Full-time", location: "Remote / Hybrid", exp: "3–5 yrs", dept: "Engineering" },
  { title: "Flutter Developer", type: "Full-time", location: "On-site", exp: "2–4 yrs", dept: "Engineering" },
  { title: "Node.js Backend Engineer", type: "Full-time", location: "Remote", exp: "3+ yrs", dept: "Engineering" },
  { title: "AI / Automation Engineer", type: "Full-time", location: "Hybrid", exp: "2+ yrs", dept: "AI" },
  { title: "UI / UX Designer", type: "Full-time", location: "Hybrid", exp: "2–4 yrs", dept: "Design" },
  { title: "Performance Marketing Executive", type: "Full-time", location: "On-site", exp: "1–3 yrs", dept: "Marketing" },
  { title: "Social Media Intern", type: "Internship", location: "Remote", exp: "Fresher", dept: "Marketing" },
];

const PERKS = [
  { title: "Flexible hours", desc: "Results matter more than clock time." },
  { title: "Remote friendly", desc: "Work from home or the office." },
  { title: "Learning budget", desc: "Courses, books and certifications covered." },
  { title: "Health cover", desc: "Medical insurance for you and family." },
  { title: "Real projects", desc: "Ship products used by real customers." },
  { title: "Fast growth", desc: "Clear paths to senior and lead roles." },
];

const BUDGETS = ["Under $1,000", "$1,000 – $5,000", "$5,000 – $15,000", "$15,000+", "Not sure yet"];

// -----------------------------------------------------------------------------
// ICONS (inline SVG, stroke = currentColor)
// -----------------------------------------------------------------------------
const ICON_PATHS = {
  phone: "M8 2h8a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2zm3 17h2",
  browser: "M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 4h18M7 6h.01M10 6h.01",
  globe: "M12 21a9 9 0 100-18 9 9 0 000 18zm-9-9h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18",
  spark: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z",
  chat: "M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12zM8.5 10.5c.5 2 2 3.5 4 4l1.2-1.2 2 .8-.3 1.6c-3.5.3-7.4-3.6-7.1-7.1l1.6-.3.8 2-1.2 1.2z",
  pen: "M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.6 7.6M11 13a2 2 0 100-4 2 2 0 000 4z",
  target: "M12 21a9 9 0 100-18 9 9 0 000 18zm0-4a5 5 0 100-10 5 5 0 000 10zm0-4a1 1 0 100-2 1 1 0 000 2z",
  megaphone: "M3 11v3a1 1 0 001 1h2l5 4V6L6 10H4a1 1 0 00-1 1zm12-3a5 5 0 010 9M18 5a9 9 0 010 15",
  search: "M11 19a8 8 0 100-16 8 8 0 000 16zm10 2l-4.35-4.35",
  cart: "M3 3h2l2.4 12.2a2 2 0 002 1.8h8.2a2 2 0 002-1.6L21 8H6M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z",
  cloud: "M7 18a5 5 0 01-.6-10A6 6 0 0118 9a4.5 4.5 0 01-.5 9H7z",
  layers: "M12 2l10 5-10 5L2 7l10-5zm-10 10l10 5 10-5M2 17l10 5 10-5",
  plug: "M9 2v6m6-6v6M6 8h12v4a6 6 0 01-12 0V8zm6 10v4",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zm-3-10l2 2 4-4",
  chart: "M3 3v18h18M7 15l4-4 3 3 5-6",
  brush: "M9.5 14.5L3 21M14 4l6 6-8 8-6-6 8-8zm2-2l6 6",
  video: "M15 10l5-3v10l-5-3M3 6h12v12H3V6z",
  mail: "M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm18 2l-10 7L2 6",
  wrench: "M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5z",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zm14 10v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8",
  check: "M5 13l4 4L19 7",
  arrow: "M5 12h14m-6-6l6 6-6 6",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "M6 6l12 12M18 6L6 18",
  plus: "M12 5v14M5 12h14",
  pin: "M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12zm0-9a3 3 0 100-6 3 3 0 000 6z",
  call: "M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z",
  star: "M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z",
  briefcase: "M3 7h18v13H3V7zm5 0V5a2 2 0 012-2h4a2 2 0 012 2v2M3 13h18",
};

function Icon({ name, className = "h-6 w-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICON_PATHS[name] || ICON_PATHS.spark} />
    </svg>
  );
}

// -----------------------------------------------------------------------------
// SHARED UI
// -----------------------------------------------------------------------------
function Container({ children, className = "" }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

function SectionHeading({ eyebrow, title, subtitle, center = true, dark = false }) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && (
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${dark ? "bg-white/10 text-indigo-200" : "bg-indigo-50 text-indigo-600"}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`mt-4 text-3xl font-bold tracking-tight sm:text-4xl ${dark ? "text-white" : "text-slate-900"}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-base sm:text-lg ${dark ? "text-slate-300" : "text-slate-600"}`}>{subtitle}</p>}
    </div>
  );
}

function Button({ children, href, onClick, variant = "primary", className = "", type = "button" }) {
  const styles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/25",
    secondary: "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50",
    ghost: "text-white ring-1 ring-white/30 hover:bg-white/10",
  };
  const cls = `inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${styles[variant]} ${className}`;
  if (href) return <a href={href} onClick={onClick} className={cls}>{children}</a>;
  return <button type={type} onClick={onClick} className={cls}>{children}</button>;
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-rose-600">{error}</span>}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

function SuccessBox({ title, text, onReset }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-emerald-50 p-8 text-center ring-1 ring-emerald-200">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
        <Icon name="check" className="h-7 w-7" />
      </span>
      <h3 className="mt-4 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{text}</p>
      <button onClick={onReset} className="mt-6 text-sm font-semibold text-indigo-600 hover:text-indigo-500">
        Send another
      </button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// NAVBAR
// -----------------------------------------------------------------------------
function Navbar({ page, setPage }) {
  const [open, setOpen] = useState(false);

  const go = (href) => {
    setOpen(false);
    if (page !== "home") {
      setPage("home");
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-lg">
      <Container className="flex h-16 items-center justify-between">
        <button onClick={() => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white">
            {BRAND.name.charAt(0)}
          </span>
          <span className="text-lg font-bold text-slate-900">{BRAND.name}</span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => go(n.href)} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
              {n.label}
            </a>
          ))}
          <button
            onClick={() => { setPage("careers"); window.scrollTo({ top: 0 }); }}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-slate-100 ${page === "careers" ? "text-indigo-600" : "text-slate-600 hover:text-slate-900"}`}
          >
            Careers
          </button>
        </nav>

        <div className="hidden lg:block">
          <Button href="#contact" onClick={() => go("#contact")} className="py-2.5">
            Get a free quote
          </Button>
        </div>

        <button onClick={() => setOpen(!open)} className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden" aria-label="Toggle menu" aria-expanded={open}>
          <Icon name={open ? "close" : "menu"} />
        </button>
      </Container>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => go(n.href)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100">
                {n.label}
              </a>
            ))}
            <button
              onClick={() => { setOpen(false); setPage("careers"); window.scrollTo({ top: 0 }); }}
              className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Careers
            </button>
            <Button href="#contact" onClick={() => go("#contact")} className="mt-2 w-full">
              Get a free quote
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}

// -----------------------------------------------------------------------------
// HOME SECTIONS
// -----------------------------------------------------------------------------
function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-600/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-indigo-200 ring-1 ring-white/15">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Now booking projects for this quarter
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              We build software that{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">grows your business</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-slate-300 sm:text-lg lg:mx-0">
              Apps, web apps, websites, AI and WhatsApp automation, design and digital marketing — one team from idea to launch to growth.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button href="#contact">
                Start your project <Icon name="arrow" className="h-4 w-4" />
              </Button>
              <Button href="#work" variant="ghost">
                See our work
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
              <div className="flex -space-x-2">
                {["bg-indigo-400", "bg-emerald-400", "bg-amber-400", "bg-pink-400"].map((c, i) => (
                  <span key={i} className={`h-8 w-8 rounded-full ring-2 ring-slate-950 ${c}`} />
                ))}
              </div>
              <div className="text-left text-sm">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="star" className="h-4 w-4 fill-current" />)}
                </div>
                <span className="text-slate-400">Rated 4.9/5 by our clients</span>
              </div>
            </div>
          </div>

          {/* Visual card */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur sm:p-6">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
                {SERVICES.slice(0, 4).map((s) => (
                  <div key={s.title} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300">
                      <Icon name={s.icon} className="h-5 w-5" />
                    </span>
                    <p className="mt-3 text-sm font-semibold text-white">{s.title.replace(" Development", "")}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-4">
                <div className="flex items-center justify-between text-white">
                  <span className="text-sm font-medium">Monthly leads</span>
                  <span className="text-sm font-bold">+182%</span>
                </div>
                <div className="mt-3 flex h-16 items-end gap-1.5">
                  {[30, 45, 35, 60, 50, 75, 65, 90, 80, 100].map((h, i) => (
                    <span key={i} className="flex-1 rounded-t bg-white/70" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-3 hidden rounded-2xl bg-white p-3 shadow-xl sm:flex sm:items-center sm:gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <Icon name="chat" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-slate-500">WhatsApp bot</p>
                <p className="text-sm font-semibold text-slate-900">1,240 chats handled</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:mt-20 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white/5 p-5 text-center ring-1 ring-white/10">
              <p className="text-3xl font-extrabold text-white sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-xs text-slate-400 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TrustBar() {
  const logos = ["Northwind", "Acme Corp", "Globex", "Initech", "Umbrella", "Hooli"];
  return (
    <section className="border-b border-slate-200 bg-white py-10">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400">Trusted by startups and growing businesses</p>
        <div className="mt-6 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((l) => (
            <div key={l} className="text-center text-lg font-bold text-slate-300 transition hover:text-slate-500">{l}</div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="scroll-mt-16 bg-slate-50 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="Everything you need to build and grow online"
          subtitle="From the first line of code to the first thousand customers — pick one service or let us handle it all."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div key={s.title} className="group flex flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70 hover:ring-indigo-200">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                <Icon name={s.icon} />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              <ul className="mt-4 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-slate-600">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {p}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-indigo-600 hover:gap-2 transition-all">
                Get a quote <Icon name="arrow" className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function MoreServices() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="And more" title="Other services we provide" subtitle="Everything around your product, so you only need one partner." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MORE_SERVICES.map((s) => (
            <div key={s.title} className="flex gap-4 rounded-2xl p-5 ring-1 ring-slate-200 transition hover:bg-slate-50 hover:ring-indigo-200">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="scroll-mt-16 bg-slate-950 py-20 sm:py-24">
      <Container>
        <SectionHeading dark eyebrow="How we work" title="A simple, transparent process" subtitle="You always know what is happening, what is next and what it costs." />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS.map((p, i) => (
            <div key={p.step} className="relative rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <span className="text-4xl font-extrabold text-indigo-500/60">{p.step}</span>
              <h3 className="mt-3 text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{p.desc}</p>
              {i < PROCESS.length - 1 && (
                <Icon name="arrow" className="absolute -right-5 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-indigo-400/60 lg:block" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TechStack() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Technology" title="Modern, proven tech stack" />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {TECH.map((t) => (
            <span key={t} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 transition hover:bg-indigo-50 hover:text-indigo-700 hover:ring-indigo-200">
              {t}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="scroll-mt-16 bg-slate-50 py-20 sm:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading center={false} eyebrow="Case studies" title="Results we have delivered" subtitle="A few recent projects and what they changed for our clients." />
          <Button href="#contact" variant="secondary">Discuss your project</Button>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WORK.map((w) => (
            <article key={w.title} className="group overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition hover:shadow-xl hover:shadow-slate-200/70">
              <div className={`relative h-44 bg-gradient-to-br ${w.color} p-5`}>
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{w.tag}</span>
                <div className="absolute bottom-0 left-5 right-5 h-24 translate-y-4 rounded-t-xl bg-white/90 p-3 shadow-lg transition group-hover:translate-y-2">
                  <div className="h-2 w-1/3 rounded bg-slate-200" />
                  <div className="mt-2 h-2 w-2/3 rounded bg-slate-100" />
                  <div className="mt-2 h-2 w-1/2 rounded bg-slate-100" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900">{w.title}</h3>
                <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
                  <Icon name="chart" className="h-4 w-4" /> {w.result}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading center={false} eyebrow="Why choose us" title="A partner, not just a vendor" subtitle="We care about the outcome — more customers, less manual work, better products." />
            <div className="mt-8 grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-2xl bg-indigo-50 p-5">
                  <p className="text-2xl font-extrabold text-indigo-700 sm:text-3xl">{s.value}</p>
                  <p className="mt-1 text-sm text-slate-600">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {WHY_US.map((w) => (
              <div key={w.title} className="rounded-2xl p-5 ring-1 ring-slate-200">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                  <Icon name="check" className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-semibold text-slate-900">{w.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Testimonials" title="What our clients say" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="star" className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 flex-1 text-slate-700">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white">
                  {t.name.split(" ").map((p) => p[0]).join("")}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Engagement() {
  return (
    <section id="engagement" className="scroll-mt-16 bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Engagement models" title="Flexible ways to work with us" subtitle="Choose what fits your budget and stage. Every plan starts with a free consultation." />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {ENGAGEMENT.map((e) => (
            <div
              key={e.name}
              className={`relative flex flex-col rounded-3xl p-8 ${e.featured ? "bg-slate-950 text-white ring-2 ring-indigo-500 lg:scale-105" : "bg-white ring-1 ring-slate-200"}`}
            >
              {e.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">Most popular</span>
              )}
              <h3 className={`text-lg font-semibold ${e.featured ? "text-white" : "text-slate-900"}`}>{e.name}</h3>
              <p className={`mt-2 text-sm ${e.featured ? "text-slate-300" : "text-slate-600"}`}>{e.desc}</p>
              <p className={`mt-6 text-3xl font-extrabold ${e.featured ? "text-white" : "text-slate-900"}`}>{e.price}</p>
              <ul className="mt-6 space-y-3">
                {e.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2 text-sm ${e.featured ? "text-slate-200" : "text-slate-600"}`}>
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> {f}
                  </li>
                ))}
              </ul>
              <Button href="#contact" variant={e.featured ? "primary" : "secondary"} className="mt-8 w-full">
                Get started
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="scroll-mt-16 bg-slate-50 py-20 sm:py-24">
      <Container className="max-w-4xl">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => (
            <div key={f.q} className="rounded-2xl bg-white ring-1 ring-slate-200">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-slate-900">{f.q}</span>
                <Icon name="plus" className={`h-5 w-5 shrink-0 text-indigo-600 transition ${open === i ? "rotate-45" : ""}`} />
              </button>
              {open === i && <p className="px-6 pb-5 text-sm text-slate-600">{f.a}</p>}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CTA() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-6 py-14 text-center sm:px-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <h2 className="relative text-3xl font-bold text-white sm:text-4xl">Have an idea? Let’s build it together.</h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-indigo-100">Get a free consultation and a clear quote within 24 hours.</p>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="#contact" variant="secondary">Book a free call</Button>
            <Button href={`https://wa.me/`} variant="ghost">Chat on WhatsApp</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Contact() {
  const empty = { name: "", email: "", phone: "", company: "", service: "", budget: "", message: "", consent: false };
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Please enter a valid email";
    if (form.phone && !/^[+\d\s()-]{7,}$/.test(form.phone)) e.phone = "Please enter a valid phone number";
    if (!form.service) e.service = "Please choose a service";
    if (form.message.trim().length < 10) e.message = "Tell us a little more (10+ characters)";
    if (!form.consent) e.consent = "Please accept to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // TODO: replace with your API call, e.g. await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) })
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  };

  const services = [...SERVICES, ...MORE_SERVICES].map((s) => s.title);

  return (
    <section id="contact" className="scroll-mt-16 bg-slate-50 py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading center={false} eyebrow="Contact us" title="Let’s talk about your project" subtitle="Fill in the form and our team will get back to you within one business day." />
            <div className="mt-8 space-y-4">
              {[
                { icon: "mail", label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
                { icon: "call", label: "Phone", value: BRAND.phone, href: `tel:${BRAND.phone.replace(/\s/g, "")}` },
                { icon: "pin", label: "Office", value: BRAND.address },
              ].map((c) => (
                <a key={c.label} href={c.href} className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200 transition hover:ring-indigo-200">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon name={c.icon} className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">{c.label}</p>
                    <p className="truncate text-sm font-semibold text-slate-900">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            {sent ? (
              <SuccessBox title="Thanks! We got your message." text="Our team will contact you within one business day." onReset={() => { setForm(empty); setSent(false); }} />
            ) : (
              <form onSubmit={submit} noValidate className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name *" error={errors.name}>
                    <input className={inputCls} value={form.name} onChange={set("name")} placeholder="Your name" />
                  </Field>
                  <Field label="Email *" error={errors.email}>
                    <input type="email" className={inputCls} value={form.email} onChange={set("email")} placeholder="you@example.com" />
                  </Field>
                  <Field label="Phone / WhatsApp" error={errors.phone}>
                    <input type="tel" className={inputCls} value={form.phone} onChange={set("phone")} placeholder="+00 00000 00000" />
                  </Field>
                  <Field label="Company">
                    <input className={inputCls} value={form.company} onChange={set("company")} placeholder="Company name" />
                  </Field>
                  <Field label="Service needed *" error={errors.service}>
                    <select className={inputCls} value={form.service} onChange={set("service")}>
                      <option value="">Select a service</option>
                      {services.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Budget">
                    <select className={inputCls} value={form.budget} onChange={set("budget")}>
                      <option value="">Select a range</option>
                      {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Project details *" error={errors.message}>
                      <textarea rows={5} className={inputCls} value={form.message} onChange={set("message")} placeholder="Tell us about your idea, goals and timeline" />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex items-start gap-3 text-sm text-slate-600">
                      <input type="checkbox" checked={form.consent} onChange={set("consent")} className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                      I agree to be contacted about my enquiry and accept the privacy policy.
                    </label>
                    {errors.consent && <span className="mt-1 block text-xs text-rose-600">{errors.consent}</span>}
                  </div>
                </div>
                <Button type="submit" className="mt-6 w-full sm:w-auto">
                  {loading ? "Sending…" : <>Send message <Icon name="arrow" className="h-4 w-4" /></>}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

// -----------------------------------------------------------------------------
// CAREERS PAGE
// -----------------------------------------------------------------------------
function CareersHero() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-violet-600/30 blur-3xl" />
      <Container className="relative py-20 text-center sm:py-28">
        <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-200">Careers</span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Build products people use. <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">Grow with us.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-slate-300 sm:text-lg">
          Join a team of developers, designers and marketers shipping real work for clients around the world.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="#openings">View open roles</Button>
          <Button href="#apply" variant="ghost">Send your CV</Button>
        </div>
      </Container>
    </section>
  );
}

function Perks() {
  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeading eyebrow="Life here" title="Why you’ll enjoy working with us" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PERKS.map((p) => (
            <div key={p.title} className="rounded-2xl p-6 ring-1 ring-slate-200">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Icon name="star" className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{p.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Openings({ onApply }) {
  const depts = ["All", ...new Set(JOBS.map((j) => j.dept))];
  const [dept, setDept] = useState("All");
  const list = dept === "All" ? JOBS : JOBS.filter((j) => j.dept === dept);

  return (
    <section id="openings" className="scroll-mt-16 bg-slate-50 py-20">
      <Container className="max-w-5xl">
        <SectionHeading eyebrow="Open positions" title="Current openings" />
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {depts.map((d) => (
            <button
              key={d}
              onClick={() => setDept(d)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${dept === d ? "bg-indigo-600 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"}`}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="mt-8 space-y-4">
          {list.map((j) => (
            <div key={j.title} className="flex flex-col gap-4 rounded-2xl bg-white p-5 ring-1 ring-slate-200 transition hover:ring-indigo-200 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-4">
                <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 sm:flex">
                  <Icon name="briefcase" className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">{j.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {[j.dept, j.type, j.location, j.exp].map((t) => (
                      <span key={t} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <Button onClick={() => onApply(j.title)} variant="secondary" className="w-full shrink-0 sm:w-auto">
                Apply now
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ApplyForm({ role, setRole }) {
  const empty = { name: "", email: "", phone: "", experience: "", portfolio: "", resume: null, note: "" };
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: k === "resume" ? e.target.files?.[0] || null : e.target.value });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Please enter a valid email";
    if (!/^[+\d\s()-]{7,}$/.test(form.phone)) e.phone = "Please enter a valid phone number";
    if (!role) e.role = "Please choose a role";
    if (!form.resume) e.resume = "Please attach your CV";
    else if (form.resume.size > 5 * 1024 * 1024) e.resume = "File must be under 5 MB";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // TODO: replace with your API call using FormData (for the CV upload)
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  };

  return (
    <section id="apply" className="scroll-mt-16 bg-white py-20">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Apply" title="Send us your application" subtitle="Don’t see the right role? Choose “General application” and tell us what you do best." />
        <div className="mt-10">
          {sent ? (
            <SuccessBox title="Application received!" text="Thanks for applying. We review every application and reply within a week." onReset={() => { setForm(empty); setRole(""); setSent(false); }} />
          ) : (
            <form onSubmit={submit} noValidate className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name *" error={errors.name}>
                  <input className={inputCls} value={form.name} onChange={set("name")} placeholder="Your name" />
                </Field>
                <Field label="Email *" error={errors.email}>
                  <input type="email" className={inputCls} value={form.email} onChange={set("email")} placeholder="you@example.com" />
                </Field>
                <Field label="Phone *" error={errors.phone}>
                  <input type="tel" className={inputCls} value={form.phone} onChange={set("phone")} placeholder="+00 00000 00000" />
                </Field>
                <Field label="Role *" error={errors.role}>
                  <select className={inputCls} value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Select a role</option>
                    {JOBS.map((j) => <option key={j.title}>{j.title}</option>)}
                    <option>General application</option>
                  </select>
                </Field>
                <Field label="Experience">
                  <select className={inputCls} value={form.experience} onChange={set("experience")}>
                    <option value="">Select</option>
                    {["Fresher", "0–1 years", "1–3 years", "3–5 years", "5+ years"].map((x) => <option key={x}>{x}</option>)}
                  </select>
                </Field>
                <Field label="Portfolio / LinkedIn / GitHub">
                  <input type="url" className={inputCls} value={form.portfolio} onChange={set("portfolio")} placeholder="https://" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="CV / Resume * (PDF or DOC, max 5 MB)" error={errors.resume}>
                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 px-4 py-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50/50">
                      <Icon name="plus" className="h-6 w-6 text-indigo-500" />
                      <span className="mt-2 text-sm font-medium text-slate-700">{form.resume ? form.resume.name : "Click to upload your CV"}</span>
                      <input type="file" accept=".pdf,.doc,.docx" onChange={set("resume")} className="sr-only" />
                    </label>
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Why do you want to join us?">
                    <textarea rows={4} className={inputCls} value={form.note} onChange={set("note")} placeholder="A few lines about you" />
                  </Field>
                </div>
              </div>
              <Button type="submit" className="mt-6 w-full sm:w-auto">
                {loading ? "Submitting…" : <>Submit application <Icon name="arrow" className="h-4 w-4" /></>}
              </Button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}

function CareersPage() {
  const [role, setRole] = useState("");
  const apply = (title) => {
    setRole(title);
    document.querySelector("#apply")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <CareersHero />
      <Perks />
      <Openings onApply={apply} />
      <ApplyForm role={role} setRole={setRole} />
    </>
  );
}

// -----------------------------------------------------------------------------
// FOOTER
// -----------------------------------------------------------------------------
function Footer({ setPage }) {
  const cols = [
    { title: "Services", links: SERVICES.slice(0, 5).map((s) => ({ label: s.title, href: "#services" })) },
    { title: "More", links: MORE_SERVICES.slice(0, 5).map((s) => ({ label: s.title, href: "#services" })) },
    {
      title: "Company",
      links: [
        { label: "Our work", href: "#work" },
        { label: "Process", href: "#process" },
        { label: "Careers", page: "careers" },
        { label: "FAQ", href: "#faq" },
        { label: "Contact", href: "#contact" },
      ],
    },
  ];
  const go = (l) => (e) => {
    if (l.page) {
      e.preventDefault();
      setPage(l.page);
      window.scrollTo({ top: 0 });
    } else {
      setPage("home");
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400">
      <Container className="py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white">{BRAND.name.charAt(0)}</span>
              <span className="text-lg font-bold text-white">{BRAND.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm">{BRAND.tagline}</p>
            <div className="mt-6 space-y-2 text-sm">
              <p className="flex items-center gap-2"><Icon name="mail" className="h-4 w-4" /> {BRAND.email}</p>
              <p className="flex items-center gap-2"><Icon name="call" className="h-4 w-4" /> {BRAND.phone}</p>
              <p className="flex items-start gap-2"><Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0" /> {BRAND.address}</p>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold text-white">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href || "#"} onClick={go(l)} className="text-sm transition hover:text-white">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <div className="flex gap-2">
            {["in", "ig", "fb", "x", "yt"].map((s) => (
              <a key={s} href="#" aria-label={s} className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-xs font-semibold uppercase text-slate-300 ring-1 ring-white/10 transition hover:bg-indigo-600 hover:text-white">
                {s}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

// -----------------------------------------------------------------------------
// FLOATING WHATSAPP BUTTON
// -----------------------------------------------------------------------------
function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 transition hover:scale-105 hover:bg-emerald-400"
    >
      <Icon name="chat" className="h-7 w-7" />
    </a>
  );
}

// -----------------------------------------------------------------------------
// ROOT
// -----------------------------------------------------------------------------
export default function AgencyLanding() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-900 antialiased scroll-smooth">
      <Navbar page={page} setPage={setPage} />
      <main>
        {page === "home" ? (
          <>
            <Hero />
            <TrustBar />
            <Services />
            <MoreServices />
            <Process />
            <TechStack />
            <Work />
            <WhyUs />
            <Testimonials />
            <Engagement />
            <FAQ />
            <CTA />
            <Contact />
          </>
        ) : (
          <CareersPage />
        )}
      </main>
      <Footer setPage={setPage} />
      <WhatsAppFab />
    </div>
  );
}
