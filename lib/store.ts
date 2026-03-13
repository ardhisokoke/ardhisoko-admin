"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SiteData, Project, Banner, Testimonial, BlogPost, ContactSettings, LogoSettings } from "@/types";
import { DEFAULT_SITE_DATA } from "@/lib/defaultData";

interface SiteStore {
  data: SiteData;
  isDirty: boolean;

  // Project actions
  updateProject: (id: string, updates: Partial<Project>) => void;
  addProject: (project: Project) => void;

  // Banner actions
  updateBanner: (index: number, updates: Partial<Banner>) => void;

  // Testimonial actions
  updateTestimonial: (index: number, updates: Partial<Testimonial>) => void;

  // Blog actions
  updateBlogPost: (index: number, updates: Partial<BlogPost>) => void;

  // Settings actions
  updateContact: (updates: Partial<ContactSettings>) => void;
  updateLogo: (updates: Partial<LogoSettings>) => void;

  // Persistence
  markSaved: () => void;
  resetToDefault: () => void;
}

export const useSiteStore = create<SiteStore>()(
  persist(
    (set) => ({
      data: DEFAULT_SITE_DATA,
      isDirty: false,

      updateProject: (id, updates) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.map((p) =>
              p.id === id ? { ...p, ...updates } : p
            ),
          },
          isDirty: true,
        })),

      addProject: (project) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: [...state.data.projects, project],
          },
          isDirty: true,
        })),

      updateBanner: (index, updates) =>
        set((state) => ({
          data: {
            ...state.data,
            banners: state.data.banners.map((b, i) =>
              i === index ? { ...b, ...updates } : b
            ),
          },
          isDirty: true,
        })),

      updateTestimonial: (index, updates) =>
        set((state) => ({
          data: {
            ...state.data,
            testimonials: state.data.testimonials.map((t, i) =>
              i === index ? { ...t, ...updates } : t
            ),
          },
          isDirty: true,
        })),

      updateBlogPost: (index, updates) =>
        set((state) => ({
          data: {
            ...state.data,
            blogPosts: state.data.blogPosts.map((b, i) =>
              i === index ? { ...b, ...updates } : b
            ),
          },
          isDirty: true,
        })),

      updateContact: (updates) =>
        set((state) => ({
          data: {
            ...state.data,
            contact: { ...state.data.contact, ...updates },
          },
          isDirty: true,
        })),

      updateLogo: (updates) =>
        set((state) => ({
          data: {
            ...state.data,
            logo: { ...state.data.logo, ...updates },
          },
          isDirty: true,
        })),

      markSaved: () => set({ isDirty: false }),

      resetToDefault: () =>
        set({ data: DEFAULT_SITE_DATA, isDirty: false }),
    }),
    {
      name: "ardhisoko-site-data",
    }
  )
);
