'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ProjectBoard {
  id: string;
  name: string;
  itemIds: string[];
  createdAt: string;
}

interface WishlistContextType {
  wishlistIds: string[];
  projects: ProjectBoard[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  createProject: (name: string) => string;
  deleteProject: (id: string) => void;
  toggleItemInProject: (productId: string, projectId: string) => void;
  isWishlistDrawerOpen: boolean;
  setIsWishlistDrawerOpen: (open: boolean) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [projects, setProjects] = useState<ProjectBoard[]>([]);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('wd_furniture_wishlist');
      if (savedWishlist) {
        setWishlistIds(JSON.parse(savedWishlist));
      }

      const savedProjects = localStorage.getItem('wd_furniture_projects');
      if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
      } else {
        // Default sample moodboard
        setProjects([
          {
            id: 'proj-living-salon',
            name: 'Riyadh Private Villa — Main Salon',
            itemIds: ['gw-diriyah-curved-sofa', 'gw-najran-travertine-table', 'gw-alula-lounge-armchair'],
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    } catch (e) {
      console.error(e);
    }
    setLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem('wd_furniture_wishlist', JSON.stringify(wishlistIds));
      } catch (e) {}
    }
  }, [wishlistIds, loaded]);

  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem('wd_furniture_projects', JSON.stringify(projects));
      } catch (e) {}
    }
  }, [projects, loaded]);

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const createProject = (name: string) => {
    const newProj: ProjectBoard = {
      id: `proj-${Date.now()}`,
      name: name.trim(),
      itemIds: [],
      createdAt: new Date().toISOString(),
    };
    setProjects((prev) => [...prev, newProj]);
    return newProj.id;
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleItemInProject = (productId: string, projectId: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === projectId) {
          const exists = proj.itemIds.includes(productId);
          const updated = exists
            ? proj.itemIds.filter((id) => id !== productId)
            : [...proj.itemIds, productId];
          return { ...proj, itemIds: updated };
        }
        return proj;
      })
    );
  };

  const clearWishlist = () => setWishlistIds([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        projects,
        toggleWishlist,
        isInWishlist,
        createProject,
        deleteProject,
        toggleItemInProject,
        isWishlistDrawerOpen,
        setIsWishlistDrawerOpen,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
