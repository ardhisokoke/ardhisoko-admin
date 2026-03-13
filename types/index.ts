// ── Project Types ──────────────────────────────────────────
export interface GallerySlot {
  url: string;
}

export interface Spec {
  value: string;
  label: string;
}

export interface PaymentPlan {
  label: string;
  deposit: string;
  detail: string;
  featured?: boolean;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  price: string;
  priceSubtitle: string;
  plotSize: string;
  statusBadge: string;
  shortDesc: string;
  type: "land" | "apt" | "house" | "commercial";
  imageUrl: string;
  features: string[];
  gallery: GallerySlot[];
  // Page details
  availBadge: string;
  availNote: string;
  fullDesc: string;
  specs: Spec[];
  detailFeatures: string[];
  paymentPlans: PaymentPlan[];
}

// ── Banner Types ────────────────────────────────────────────
export interface Banner {
  img: string;
  tag: string;
  title: string;
  desc: string;
}

// ── Testimonial Types ───────────────────────────────────────
export interface Testimonial {
  initials: string;
  name: string;
  role: string;
  quote: string;
}

// ── Blog Post Types ─────────────────────────────────────────
export type BlogCategory = "market" | "update" | "tips";

export interface BlogPost {
  img: string;
  category: BlogCategory;
  statusBadge: string;
  location: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

// ── Site Settings Types ─────────────────────────────────────
export interface ContactSettings {
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  facebook: string;
  instagram: string;
  youtube: string;
}

export interface LogoSettings {
  part1: string;
  part2: string;
  tagline: string;
  heroImage: string;
  heroOverlayText: string;
}

// ── Full Site Data ──────────────────────────────────────────
export interface SiteData {
  projects: Project[];
  banners: Banner[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  contact: ContactSettings;
  logo: LogoSettings;
}
