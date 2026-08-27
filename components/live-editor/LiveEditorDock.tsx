'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { 
  Edit3, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  ChevronDown, 
  ExternalLink,
  LayoutDashboard,
  ArrowUpRight,
  MapPin,
  Mail,
  Phone,
  Building2,
  Factory,
  HardHat,
  Briefcase,
  Home,
  Info,
  Layers,
  Sparkles,
  Quote,
  Handshake,
  FileText
} from 'lucide-react';

const en = translations.en;
const ar = translations.ar;

// Helper to check if a string contains Arabic characters
function containsArabic(str: string): boolean {
  if (!str) return false;
  return /[\u0600-\u06FF]/.test(str);
}

// Clean fallback that prioritizes pure Arabic if server data had English polluted into Arabic fields
function getArabicField(serverVal: any, fallbackVal: string): string {
  if (serverVal && typeof serverVal === 'string' && containsArabic(serverVal)) {
    return serverVal;
  }
  return fallbackVal;
}

function createDefaultState() {
  return {
    home: {
      hero: {
        eyebrow_en: en.home.hero.eyebrow,
        eyebrow_ar: ar.home.hero.eyebrow,
        title_line1_en: en.home.hero.title_line1,
        title_line1_ar: ar.home.hero.title_line1,
        title_line2_en: en.home.hero.title_line2,
        title_line2_ar: ar.home.hero.title_line2,
        title_line3_en: en.home.hero.title_line3,
        title_line3_ar: ar.home.hero.title_line3,
        body_en: en.home.hero.body,
        body_ar: ar.home.hero.body,
        primary_cta_en: en.home.hero.primaryCta,
        primary_cta_ar: ar.home.hero.primaryCta,
        secondary_cta_en: en.home.hero.secondaryCta,
        secondary_cta_ar: ar.home.hero.secondaryCta,
      },
      metrics: {
        stat1_num: en.home.metrics.stat1_num,
        stat1_text_en: en.home.metrics.stat1_text,
        stat1_text_ar: ar.home.metrics.stat1_text,
        stat2_num: en.home.metrics.stat2_num,
        stat2_text_en: en.home.metrics.stat2_text,
        stat2_text_ar: ar.home.metrics.stat2_text,
        stat3_num: en.home.metrics.stat3_num,
        stat3_text_en: en.home.metrics.stat3_text,
        stat3_text_ar: ar.home.metrics.stat3_text,
        stat4_num: en.home.metrics.stat4_num,
        stat4_text_en: en.home.metrics.stat4_text,
        stat4_text_ar: ar.home.metrics.stat4_text,
      },
      sectors: {
        label_en: en.home.sectors.label,
        label_ar: ar.home.sectors.label,
        heading_en: en.home.sectors.heading,
        heading_ar: ar.home.sectors.heading,
        intro_en: en.home.sectors.intro,
        intro_ar: ar.home.sectors.intro,
        hospitality_eyebrow_en: en.home.sectors.hospitality.eyebrow,
        hospitality_eyebrow_ar: ar.home.sectors.hospitality.eyebrow,
        hospitality_title_en: en.home.sectors.hospitality.title,
        hospitality_title_ar: ar.home.sectors.hospitality.title,
        hospitality_desc_en: en.home.sectors.hospitality.desc,
        hospitality_desc_ar: ar.home.sectors.hospitality.desc,
        hospitality_proof_en: en.home.sectors.hospitality.proof,
        hospitality_proof_ar: ar.home.sectors.hospitality.proof,
        hospitality_cta_en: en.home.sectors.hospitality.cta,
        hospitality_cta_ar: ar.home.sectors.hospitality.cta,

        manufacturing_eyebrow_en: en.home.sectors.manufacturing.eyebrow,
        manufacturing_eyebrow_ar: ar.home.sectors.manufacturing.eyebrow,
        manufacturing_title_en: en.home.sectors.manufacturing.title,
        manufacturing_title_ar: ar.home.sectors.manufacturing.title,
        manufacturing_desc_en: en.home.sectors.manufacturing.desc,
        manufacturing_desc_ar: ar.home.sectors.manufacturing.desc,
        manufacturing_proof_en: en.home.sectors.manufacturing.proof,
        manufacturing_proof_ar: ar.home.sectors.manufacturing.proof,
        manufacturing_cta_en: en.home.sectors.manufacturing.cta,
        manufacturing_cta_ar: ar.home.sectors.manufacturing.cta,

        contracting_eyebrow_en: en.home.sectors.contracting.eyebrow,
        contracting_eyebrow_ar: ar.home.sectors.contracting.eyebrow,
        contracting_title_en: en.home.sectors.contracting.title,
        contracting_title_ar: ar.home.sectors.contracting.title,
        contracting_desc_en: en.home.sectors.contracting.desc,
        contracting_desc_ar: ar.home.sectors.contracting.desc,
        contracting_proof_en: en.home.sectors.contracting.proof,
        contracting_proof_ar: ar.home.sectors.contracting.proof,
        contracting_cta_en: en.home.sectors.contracting.cta,
        contracting_cta_ar: ar.home.sectors.contracting.cta,
      },
      synergy: {
        label_en: en.home.synergy.label,
        label_ar: ar.home.synergy.label,
        heading_en: en.home.synergy.heading,
        heading_ar: ar.home.synergy.heading,
        intro_en: en.home.synergy.intro,
        intro_ar: ar.home.synergy.intro,
        step1_title_en: en.home.synergy.step1_title,
        step1_title_ar: ar.home.synergy.step1_title,
        step1_text_en: en.home.synergy.step1_text,
        step1_text_ar: ar.home.synergy.step1_text,
        step2_title_en: en.home.synergy.step2_title,
        step2_title_ar: ar.home.synergy.step2_title,
        step2_text_en: en.home.synergy.step2_text,
        step2_text_ar: ar.home.synergy.step2_text,
        step3_title_en: en.home.synergy.step3_title,
        step3_title_ar: ar.home.synergy.step3_title,
        step3_text_en: en.home.synergy.step3_text,
        step3_text_ar: ar.home.synergy.step3_text,
      },
      identity: {
        vision_desc_en: en.home.identity.vision_desc,
        vision_desc_ar: ar.home.identity.vision_desc,
        mission_desc_en: en.home.identity.mission_desc,
        mission_desc_ar: ar.home.identity.mission_desc,
      },
      ceo: {
        quote_en: en.home.ceo.quote,
        quote_ar: ar.home.ceo.quote,
        name_en: en.home.ceo.name,
        name_ar: ar.home.ceo.name,
        title_en: en.home.ceo.title,
        title_ar: ar.home.ceo.title,
      },
      partnership: {
        heading_en: en.home.partnership.heading,
        heading_ar: ar.home.partnership.heading,
        body_en: en.home.partnership.body,
        body_ar: ar.home.partnership.body,
        primary_cta_en: en.home.partnership.primaryCta,
        primary_cta_ar: ar.home.partnership.primaryCta,
      },
    },
    about: {
      hero_eyebrow_en: en.about.hero.eyebrow,
      hero_eyebrow_ar: ar.about.hero.eyebrow,
      hero_title_en: en.about.hero.title,
      hero_title_ar: ar.about.hero.title,
      hero_body_en: en.about.hero.body,
      hero_body_ar: ar.about.hero.body,
      story_heading_en: en.about.story.heading,
      story_heading_ar: ar.about.story.heading,
      story_body_en: en.about.story.body,
      story_body_ar: ar.about.story.body,
      governance_statement_en: en.about.governance.statement,
      governance_statement_ar: ar.about.governance.statement,
    },
    hospitality: {
      hero_eyebrow_en: en.hospitality.hero.eyebrow,
      hero_eyebrow_ar: ar.hospitality.hero.eyebrow,
      hero_title_en: en.hospitality.hero.title,
      hero_title_ar: ar.hospitality.hero.title,
      hero_body_en: en.hospitality.hero.body,
      hero_body_ar: ar.hospitality.hero.body,
      services_heading_en: en.hospitality.services.heading,
      services_heading_ar: ar.hospitality.services.heading,
      services_intro_en: en.hospitality.services.intro,
      services_intro_ar: ar.hospitality.services.intro,
      rfp_heading_en: en.hospitality.rfp.heading,
      rfp_heading_ar: ar.hospitality.rfp.heading,
      rfp_body_en: en.hospitality.rfp.body,
      rfp_body_ar: ar.hospitality.rfp.body,
    },
    manufacturing: {
      hero_eyebrow_en: en.manufacturing.hero.eyebrow,
      hero_eyebrow_ar: ar.manufacturing.hero.eyebrow,
      hero_title_en: en.manufacturing.hero.title,
      hero_title_ar: ar.manufacturing.hero.title,
      hero_body_en: en.manufacturing.hero.body,
      hero_body_ar: ar.manufacturing.hero.body,
      capabilities_heading_en: en.manufacturing.capabilities.heading,
      capabilities_heading_ar: ar.manufacturing.capabilities.heading,
      rfp_heading_en: en.manufacturing.rfp.heading,
      rfp_heading_ar: ar.manufacturing.rfp.heading,
      rfp_body_en: en.manufacturing.rfp.body,
      rfp_body_ar: ar.manufacturing.rfp.body,
    },
    contracting: {
      hero_eyebrow_en: en.contracting.hero.eyebrow,
      hero_eyebrow_ar: ar.contracting.hero.eyebrow,
      hero_title_en: en.contracting.hero.title,
      hero_title_ar: ar.contracting.hero.title,
      hero_body_en: en.contracting.hero.body,
      hero_body_ar: ar.contracting.hero.body,
      lifecycle_heading_en: en.contracting.lifecycle.heading,
      lifecycle_heading_ar: ar.contracting.lifecycle.heading,
      rfp_heading_en: en.contracting.rfp.heading,
      rfp_heading_ar: ar.contracting.rfp.heading,
      rfp_body_en: en.contracting.rfp.body,
      rfp_body_ar: ar.contracting.rfp.body,
    },
    careers: {
      hero_eyebrow_en: en.careers.hero.eyebrow,
      hero_eyebrow_ar: ar.careers.hero.eyebrow,
      hero_title_en: en.careers.hero.title,
      hero_title_ar: ar.careers.hero.title,
      hero_body_en: en.careers.hero.body,
      hero_body_ar: ar.careers.hero.body,
      hero_proof_en: en.careers.hero.proof,
      hero_proof_ar: ar.careers.hero.proof,
    },
    contact: {
      hero_eyebrow_en: en.contact.hero.eyebrow,
      hero_eyebrow_ar: ar.contact.hero.eyebrow,
      hero_title_en: en.contact.hero.title,
      hero_title_ar: ar.contact.hero.title,
      hero_body_en: en.contact.hero.body,
      hero_body_ar: ar.contact.hero.body,
      hq_address_en: en.contact.cards.hq_address,
      hq_address_ar: ar.contact.cards.hq_address,
      general_email: en.contact.cards.general_email,
      primary_phone: en.contact.cards.primary_phone,
      secondary_email: en.contact.cards.secondary_email,
      secondary_phone: en.contact.cards.secondary_phone,
    },
    settings: {
      nav_cta_en: en.nav.contactCta,
      nav_cta_ar: ar.nav.contactCta,
    }
  };
}

export default function LiveEditorDock() {
  const pathname = usePathname();
  const { lang, setLanguage, setDynamicContent } = useLanguage();

  const [isMinimized, setIsMinimized] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [localEdits, setLocalEdits] = useState<any>(() => createDefaultState());
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Derive current page from pathname
  const getCurrentPageKey = (path: string): 'home' | 'about' | 'hospitality' | 'manufacturing' | 'contracting' | 'careers' | 'contact' => {
    if (!path || path === '/') return 'home';
    if (path.startsWith('/about')) return 'about';
    if (path.startsWith('/sectors/hospitality')) return 'hospitality';
    if (path.startsWith('/sectors/manufacturing')) return 'manufacturing';
    if (path.startsWith('/sectors/contracting')) return 'contracting';
    if (path.startsWith('/careers')) return 'careers';
    if (path.startsWith('/contact')) return 'contact';
    return 'home';
  };

  const [selectedPage, setSelectedPage] = useState<'home' | 'about' | 'hospitality' | 'manufacturing' | 'contracting' | 'careers' | 'contact'>('home');

  // Sync selectedPage whenever pathname changes
  useEffect(() => {
    if (pathname) {
      setSelectedPage(getCurrentPageKey(pathname));
    }
  }, [pathname]);

  // Suppress completely on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  // Initialize and merge content from API
  useEffect(() => {
    async function initEditorContent() {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const d = await res.json();
          if (d.data) {
            const defaults = createDefaultState();
            const server = d.data;

            // Safe merge to ensure Arabic fields always hold pure Arabic strings
            const merged = {
              ...defaults,
              ...server,
              home: {
                ...defaults.home,
                ...(server.home || {}),
                hero: {
                  ...defaults.home.hero,
                  ...(server.home?.hero || {}),
                  eyebrow_ar: getArabicField(server.home?.hero?.eyebrow_ar, defaults.home.hero.eyebrow_ar),
                  title_line1_ar: getArabicField(server.home?.hero?.title_line1_ar, defaults.home.hero.title_line1_ar),
                  title_line2_ar: getArabicField(server.home?.hero?.title_line2_ar, defaults.home.hero.title_line2_ar),
                  title_line3_ar: getArabicField(server.home?.hero?.title_line3_ar, defaults.home.hero.title_line3_ar),
                  body_ar: getArabicField(server.home?.hero?.body_ar, defaults.home.hero.body_ar),
                  primary_cta_ar: getArabicField(server.home?.hero?.primary_cta_ar, defaults.home.hero.primary_cta_ar),
                  secondary_cta_ar: getArabicField(server.home?.hero?.secondary_cta_ar, defaults.home.hero.secondary_cta_ar),
                },
                metrics: {
                  ...defaults.home.metrics,
                  ...(server.home?.metrics || {}),
                  stat1_text_ar: getArabicField(server.home?.metrics?.stat1_text_ar, defaults.home.metrics.stat1_text_ar),
                  stat2_text_ar: getArabicField(server.home?.metrics?.stat2_text_ar, defaults.home.metrics.stat2_text_ar),
                  stat3_text_ar: getArabicField(server.home?.metrics?.stat3_text_ar, defaults.home.metrics.stat3_text_ar),
                  stat4_text_ar: getArabicField(server.home?.metrics?.stat4_text_ar, defaults.home.metrics.stat4_text_ar),
                },
                sectors: {
                  ...defaults.home.sectors,
                  ...(server.home?.sectors || {}),
                  label_ar: getArabicField(server.home?.sectors?.label_ar, defaults.home.sectors.label_ar),
                  heading_ar: getArabicField(server.home?.sectors?.heading_ar, defaults.home.sectors.heading_ar),
                  intro_ar: getArabicField(server.home?.sectors?.intro_ar, defaults.home.sectors.intro_ar),
                  hospitality_eyebrow_ar: getArabicField(server.home?.sectors?.hospitality_eyebrow_ar, defaults.home.sectors.hospitality_eyebrow_ar),
                  hospitality_title_ar: getArabicField(server.home?.sectors?.hospitality_title_ar, defaults.home.sectors.hospitality_title_ar),
                  hospitality_desc_ar: getArabicField(server.home?.sectors?.hospitality_desc_ar, defaults.home.sectors.hospitality_desc_ar),
                  hospitality_proof_ar: getArabicField(server.home?.sectors?.hospitality_proof_ar, defaults.home.sectors.hospitality_proof_ar),
                  hospitality_cta_ar: getArabicField(server.home?.sectors?.hospitality_cta_ar, defaults.home.sectors.hospitality_cta_ar),
                  manufacturing_eyebrow_ar: getArabicField(server.home?.sectors?.manufacturing_eyebrow_ar, defaults.home.sectors.manufacturing_eyebrow_ar),
                  manufacturing_title_ar: getArabicField(server.home?.sectors?.manufacturing_title_ar, defaults.home.sectors.manufacturing_title_ar),
                  manufacturing_desc_ar: getArabicField(server.home?.sectors?.manufacturing_desc_ar, defaults.home.sectors.manufacturing_desc_ar),
                  manufacturing_proof_ar: getArabicField(server.home?.sectors?.manufacturing_proof_ar, defaults.home.sectors.manufacturing_proof_ar),
                  manufacturing_cta_ar: getArabicField(server.home?.sectors?.manufacturing_cta_ar, defaults.home.sectors.manufacturing_cta_ar),
                  contracting_eyebrow_ar: getArabicField(server.home?.sectors?.contracting_eyebrow_ar, defaults.home.sectors.contracting_eyebrow_ar),
                  contracting_title_ar: getArabicField(server.home?.sectors?.contracting_title_ar, defaults.home.sectors.contracting_title_ar),
                  contracting_desc_ar: getArabicField(server.home?.sectors?.contracting_desc_ar, defaults.home.sectors.contracting_desc_ar),
                  contracting_proof_ar: getArabicField(server.home?.sectors?.contracting_proof_ar, defaults.home.sectors.contracting_proof_ar),
                  contracting_cta_ar: getArabicField(server.home?.sectors?.contracting_cta_ar, defaults.home.sectors.contracting_cta_ar),
                },
                synergy: {
                  ...defaults.home.synergy,
                  ...(server.home?.synergy || {}),
                  heading_ar: getArabicField(server.home?.synergy?.heading_ar, defaults.home.synergy.heading_ar),
                  intro_ar: getArabicField(server.home?.synergy?.intro_ar, defaults.home.synergy.intro_ar),
                  step1_title_ar: getArabicField(server.home?.synergy?.step1_title_ar, defaults.home.synergy.step1_title_ar),
                  step1_text_ar: getArabicField(server.home?.synergy?.step1_text_ar, defaults.home.synergy.step1_text_ar),
                  step2_title_ar: getArabicField(server.home?.synergy?.step2_title_ar, defaults.home.synergy.step2_title_ar),
                  step2_text_ar: getArabicField(server.home?.synergy?.step2_text_ar, defaults.home.synergy.step2_text_ar),
                  step3_title_ar: getArabicField(server.home?.synergy?.step3_title_ar, defaults.home.synergy.step3_title_ar),
                  step3_text_ar: getArabicField(server.home?.synergy?.step3_text_ar, defaults.home.synergy.step3_text_ar),
                },
                identity: {
                  ...defaults.home.identity,
                  ...(server.home?.identity || {}),
                  vision_desc_ar: getArabicField(server.home?.identity?.vision_desc_ar, defaults.home.identity.vision_desc_ar),
                  mission_desc_ar: getArabicField(server.home?.identity?.mission_desc_ar, defaults.home.identity.mission_desc_ar),
                },
                ceo: {
                  ...defaults.home.ceo,
                  ...(server.home?.ceo || {}),
                  quote_ar: getArabicField(server.home?.ceo?.quote_ar, defaults.home.ceo.quote_ar),
                  name_ar: getArabicField(server.home?.ceo?.name_ar, defaults.home.ceo.name_ar),
                  title_ar: getArabicField(server.home?.ceo?.title_ar, defaults.home.ceo.title_ar),
                },
                partnership: {
                  ...defaults.home.partnership,
                  ...(server.home?.partnership || {}),
                  heading_ar: getArabicField(server.home?.partnership?.heading_ar, defaults.home.partnership.heading_ar),
                  body_ar: getArabicField(server.home?.partnership?.body_ar, defaults.home.partnership.body_ar),
                  primary_cta_ar: getArabicField(server.home?.partnership?.primary_cta_ar, defaults.home.partnership.primary_cta_ar),
                },
              },
              about: {
                ...defaults.about,
                ...(server.about || {}),
                hero_eyebrow_ar: getArabicField(server.about?.hero_eyebrow_ar, defaults.about.hero_eyebrow_ar),
                hero_title_ar: getArabicField(server.about?.hero_title_ar, defaults.about.hero_title_ar),
                hero_body_ar: getArabicField(server.about?.hero_body_ar, defaults.about.hero_body_ar),
                story_heading_ar: getArabicField(server.about?.story_heading_ar, defaults.about.story_heading_ar),
                story_body_ar: getArabicField(server.about?.story_body_ar, defaults.about.story_body_ar),
                governance_statement_ar: getArabicField(server.about?.governance_statement_ar, defaults.about.governance_statement_ar),
              },
              hospitality: {
                ...defaults.hospitality,
                ...(server.hospitality || {}),
                hero_eyebrow_ar: getArabicField(server.hospitality?.hero_eyebrow_ar, defaults.hospitality.hero_eyebrow_ar),
                hero_title_ar: getArabicField(server.hospitality?.hero_title_ar, defaults.hospitality.hero_title_ar),
                hero_body_ar: getArabicField(server.hospitality?.hero_body_ar, defaults.hospitality.hero_body_ar),
                services_heading_ar: getArabicField(server.hospitality?.services_heading_ar, defaults.hospitality.services_heading_ar),
                services_intro_ar: getArabicField(server.hospitality?.services_intro_ar, defaults.hospitality.services_intro_ar),
                rfp_heading_ar: getArabicField(server.hospitality?.rfp_heading_ar, defaults.hospitality.rfp_heading_ar),
                rfp_body_ar: getArabicField(server.hospitality?.rfp_body_ar, defaults.hospitality.rfp_body_ar),
              },
              manufacturing: {
                ...defaults.manufacturing,
                ...(server.manufacturing || {}),
                hero_eyebrow_ar: getArabicField(server.manufacturing?.hero_eyebrow_ar, defaults.manufacturing.hero_eyebrow_ar),
                hero_title_ar: getArabicField(server.manufacturing?.hero_title_ar, defaults.manufacturing.hero_title_ar),
                hero_body_ar: getArabicField(server.manufacturing?.hero_body_ar, defaults.manufacturing.hero_body_ar),
                capabilities_heading_ar: getArabicField(server.manufacturing?.capabilities_heading_ar, defaults.manufacturing.capabilities_heading_ar),
                rfp_heading_ar: getArabicField(server.manufacturing?.rfp_heading_ar, defaults.manufacturing.rfp_heading_ar),
                rfp_body_ar: getArabicField(server.manufacturing?.rfp_body_ar, defaults.manufacturing.rfp_body_ar),
              },
              contracting: {
                ...defaults.contracting,
                ...(server.contracting || {}),
                hero_eyebrow_ar: getArabicField(server.contracting?.hero_eyebrow_ar, defaults.contracting.hero_eyebrow_ar),
                hero_title_ar: getArabicField(server.contracting?.hero_title_ar, defaults.contracting.hero_title_ar),
                hero_body_ar: getArabicField(server.contracting?.hero_body_ar, defaults.contracting.hero_body_ar),
                lifecycle_heading_ar: getArabicField(server.contracting?.lifecycle_heading_ar, defaults.contracting.lifecycle_heading_ar),
                rfp_heading_ar: getArabicField(server.contracting?.rfp_heading_ar, defaults.contracting.rfp_heading_ar),
                rfp_body_ar: getArabicField(server.contracting?.rfp_body_ar, defaults.contracting.rfp_body_ar),
              },
              careers: {
                ...defaults.careers,
                ...(server.careers || {}),
                hero_eyebrow_ar: getArabicField(server.careers?.hero_eyebrow_ar, defaults.careers.hero_eyebrow_ar),
                hero_title_ar: getArabicField(server.careers?.hero_title_ar, defaults.careers.hero_title_ar),
                hero_body_ar: getArabicField(server.careers?.hero_body_ar, defaults.careers.hero_body_ar),
                hero_proof_ar: getArabicField(server.careers?.hero_proof_ar, defaults.careers.hero_proof_ar),
              },
              contact: {
                ...defaults.contact,
                ...(server.contact || {}),
                hero_eyebrow_ar: getArabicField(server.contact?.hero_eyebrow_ar, defaults.contact.hero_eyebrow_ar),
                hero_title_ar: getArabicField(server.contact?.hero_title_ar, defaults.contact.hero_title_ar),
                hero_body_ar: getArabicField(server.contact?.hero_body_ar, defaults.contact.hero_body_ar),
                hq_address_ar: getArabicField(server.contact?.hq_address_ar, defaults.contact.hq_address_ar),
              },
              settings: {
                ...defaults.settings,
                ...(server.settings || {}),
                nav_cta_ar: getArabicField(server.settings?.nav_cta_ar, defaults.settings.nav_cta_ar),
              }
            };

            setLocalEdits(merged);
            setDynamicContent(merged);
          }
        }
      } catch (e) {
        console.error('Failed to load initial live editor content:', e);
      }
    }

    initEditorContent();
  }, [setDynamicContent]);

  // Handle nested update
  const updateField = (path: string[], value: any) => {
    setLocalEdits((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev || {}));
      let current = next;
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (!current[key]) current[key] = {};
        current = current[key];
      }
      current[path[path.length - 1]] = value;

      // Update global language context immediately for instant real-time live preview
      setDynamicContent(next);
      setHasUnsavedChanges(true);
      return next;
    });
  };

  // Handle saving and publishing to database
  const handleSave = async () => {
    setSaving(true);
    setErrorMessage(null);
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localEdits),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save content to database');
      }

      setSaveSuccess(true);
      setHasUnsavedChanges(false);
      setTimeout(() => setSaveSuccess(false), 5000);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  // Discard local changes and revert
  const handleDiscard = async () => {
    if (!confirm(lang === 'ar' ? 'هل أنت متأكد من التراجع عن جميع التعديلات غير المحفوظة؟' : 'Are you sure you want to discard unsaved edits?')) {
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const d = await res.json();
        const base = createDefaultState();
        const serverData = d.data ? { ...base, ...d.data } : base;
        setLocalEdits(serverData);
        setDynamicContent(serverData);
      } else {
        const base = createDefaultState();
        setLocalEdits(base);
        setDynamicContent(base);
      }
      setHasUnsavedChanges(false);
      window.location.reload();
    } finally {
      setSaving(false);
    }
  };

  const PAGE_OPTIONS = [
    { id: 'home', label: lang === 'ar' ? 'الرئيسية' : 'Home', icon: Home },
    { id: 'about', label: lang === 'ar' ? 'عنّا' : 'About', icon: Info },
    { id: 'hospitality', label: lang === 'ar' ? 'الضيافة' : 'Hospitality', icon: Building2 },
    { id: 'manufacturing', label: lang === 'ar' ? 'التصنيع' : 'Manufacturing', icon: Factory },
    { id: 'contracting', label: lang === 'ar' ? 'المقاولات' : 'Contracting', icon: HardHat },
    { id: 'careers', label: lang === 'ar' ? 'الوظائف' : 'Careers', icon: Briefcase },
    { id: 'contact', label: lang === 'ar' ? 'تواصل' : 'Contact', icon: Mail },
  ];

  return (
    <div className="fixed bottom-5 inset-x-0 z-50 pointer-events-none flex justify-center px-4">
      
      {/* Minimized Floating Launcher Badge */}
      {isMinimized ? (
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="pointer-events-auto group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0F1117]/95 hover:bg-[#151922] text-white border border-blue-500/40 hover:border-blue-400 shadow-[0_0_25px_rgba(37,99,235,0.4)] backdrop-blur-2xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          title="Open Live On-Page Visual Editor"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </span>
          <Edit3 className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold tracking-wide">
            {lang === 'ar' ? 'المحرر المباشر' : 'Live Visual Editor'}
          </span>
          {hasUnsavedChanges && (
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 font-mono font-bold">
              {lang === 'ar' ? 'تعديلات غير محفوظة' : 'Unsaved'}
            </span>
          )}
        </button>
      ) : (
        /* Full Floating Editor HUD */
        <div className="pointer-events-auto w-full max-w-4xl bg-[#0F1117]/95 border border-white/20 rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur-2xl text-white space-y-3.5 animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400">
                <Edit3 className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                    {lang === 'ar' ? 'محرر النصوص المباشر' : 'Live On-Page Visual Editor'}
                  </h4>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    MATCHING URL: {pathname || '/'}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  {lang === 'ar' ? 'التعديلات تنعكس فوراً أثناء الكتابة وتُحفظ مباشرة في قاعدة البيانات' : 'Type to preview live and sync directly with the live database'}
                </p>
              </div>
            </div>

            {/* Top Toolbar Actions */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              
              {/* Language Switcher inside Editor HUD */}
              <div className="flex items-center rounded-xl bg-black/40 border border-white/10 p-0.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    lang === 'en' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('ar')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    lang === 'ar' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  العربية
                </button>
              </div>

              {/* Save & Publish Button */}
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-glow-blue disabled:opacity-50 transition-all cursor-pointer whitespace-nowrap leading-none"
              >
                {saving ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                <span className="whitespace-nowrap leading-none">{saving ? (lang === 'ar' ? 'جارٍ الحفظ…' : 'Saving…') : (lang === 'ar' ? 'حفظ ونشر' : 'Save & Publish')}</span>
              </button>

              {hasUnsavedChanges && (
                <button
                  type="button"
                  onClick={handleDiscard}
                  disabled={saving}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer"
                  title="Discard changes and reload"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer"
                title="Minimize Editor"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Feedback Alerts */}
          {saveSuccess && (
            <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between animate-in fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'ar' ? 'تم حفظ ونشر التعديلات بنجاح وتحديث قاعدة البيانات!' : 'Changes saved & published live to database!'}</span>
              </div>
              <Link
                href="/admin/content/pages"
                className="text-[11px] font-mono text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>View Full CMS</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          )}

          {errorMessage && (
            <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Active Page Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 border-b border-white/5 pb-2">
            {PAGE_OPTIONS.map((page) => {
              const Icon = page.icon;
              const isSelected = selectedPage === page.id;
              return (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => setSelectedPage(page.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400/50'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{page.label}</span>
                </button>
              );
            })}
          </div>

          {/* Live Editable Fields Container */}
          <div className="max-h-80 overflow-y-auto pr-1 space-y-4 text-xs">
            
            {/* ══════════ PAGE 1: HOMEPAGE (/) ══════════ */}
            {selectedPage === 'home' && (
              <div className="space-y-3.5">
                
                {/* 1. Hero Headline & Eyebrow */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="text-[11px] font-mono font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Hero Section & 3-Line Slogan</span>
                  </div>

                  {/* Eyebrow */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Eyebrow (English)</label>
                      <input
                        type="text"
                        value={localEdits?.home?.hero?.eyebrow_en || ''}
                        onChange={(e) => updateField(['home', 'hero', 'eyebrow_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                        placeholder="WD Group for Business"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Eyebrow (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.home?.hero?.eyebrow_ar || ''}
                        onChange={(e) => updateField(['home', 'hero', 'eyebrow_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                        placeholder="مجموعة دبليو دي للأعمال"
                      />
                    </div>
                  </div>

                  {/* Line 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Line 1 (English)</label>
                      <input
                        type="text"
                        value={localEdits?.home?.hero?.title_line1_en || ''}
                        onChange={(e) => updateField(['home', 'hero', 'title_line1_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                        placeholder="Solid Vision."
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Line 1 (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.home?.hero?.title_line1_ar || ''}
                        onChange={(e) => updateField(['home', 'hero', 'title_line1_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                        placeholder="رؤية راسخة."
                      />
                    </div>
                  </div>

                  {/* Line 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-sky-400 font-semibold mb-1">Line 2 [Accent] (English)</label>
                      <input
                        type="text"
                        value={localEdits?.home?.hero?.title_line2_en || ''}
                        onChange={(e) => updateField(['home', 'hero', 'title_line2_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-sky-950/40 border border-sky-500/40 text-sky-200"
                        placeholder="Diverse Sectors."
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-sky-400 font-semibold mb-1">Line 2 [Accent] (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.home?.hero?.title_line2_ar || ''}
                        onChange={(e) => updateField(['home', 'hero', 'title_line2_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-sky-950/40 border border-sky-500/40 text-sky-200"
                        placeholder="قطاعات متعددة."
                      />
                    </div>
                  </div>

                  {/* Line 3 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Line 3 (English)</label>
                      <input
                        type="text"
                        value={localEdits?.home?.hero?.title_line3_en || ''}
                        onChange={(e) => updateField(['home', 'hero', 'title_line3_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                        placeholder="Promising Future."
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Line 3 (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.home?.hero?.title_line3_ar || ''}
                        onChange={(e) => updateField(['home', 'hero', 'title_line3_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                        placeholder="مستقبل واعد."
                      />
                    </div>
                  </div>

                  {/* Hero Subtitle */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle Narrative (English)</label>
                      <textarea
                        rows={2}
                        value={localEdits?.home?.hero?.body_en || ''}
                        onChange={(e) => updateField(['home', 'hero', 'body_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle Narrative (Arabic)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={localEdits?.home?.hero?.body_ar || ''}
                        onChange={(e) => updateField(['home', 'hero', 'body_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                  </div>

                  {/* Primary & Secondary Hero CTAs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Primary CTA Button (EN / AR)</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={localEdits?.home?.hero?.primary_cta_en || 'Discover Our Group'}
                          onChange={(e) => updateField(['home', 'hero', 'primary_cta_en'], e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/15 text-xs"
                        />
                        <input
                          type="text"
                          dir="rtl"
                          value={localEdits?.home?.hero?.primary_cta_ar || 'تعرّف على المجموعة'}
                          onChange={(e) => updateField(['home', 'hero', 'primary_cta_ar'], e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/15 text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Secondary CTA Button (EN / AR)</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={localEdits?.home?.hero?.secondary_cta_en || 'Explore Our Sectors'}
                          onChange={(e) => updateField(['home', 'hero', 'secondary_cta_en'], e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/15 text-xs"
                        />
                        <input
                          type="text"
                          dir="rtl"
                          value={localEdits?.home?.hero?.secondary_cta_ar || 'استكشف قطاعاتنا'}
                          onChange={(e) => updateField(['home', 'hero', 'secondary_cta_ar'], e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/15 text-xs"
                        />
                      </div>
                    </div>
                  </div>

                </div>

                {/* 2. 4-Metric Statistics Bar */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>4-Metric Statistics Bar</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {/* Stat 1 */}
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-sky-400 font-bold">Stat 1</span>
                        <input
                          type="text"
                          value={localEdits?.home?.metrics?.stat1_num || '6'}
                          onChange={(e) => updateField(['home', 'metrics', 'stat1_num'], e.target.value)}
                          className="w-12 text-center px-1.5 py-0.5 rounded bg-sky-950 border border-sky-500/40 text-sky-300 font-mono font-bold text-xs"
                        />
                      </div>
                      <input
                        type="text"
                        value={localEdits?.home?.metrics?.stat1_text_en || ''}
                        onChange={(e) => updateField(['home', 'metrics', 'stat1_text_en'], e.target.value)}
                        placeholder="Label EN"
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 text-[11px]"
                      />
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.home?.metrics?.stat1_text_ar || ''}
                        onChange={(e) => updateField(['home', 'metrics', 'stat1_text_ar'], e.target.value)}
                        placeholder="الوصف AR"
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 text-[11px]"
                      />
                    </div>

                    {/* Stat 2 */}
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">Stat 2</span>
                        <input
                          type="text"
                          value={localEdits?.home?.metrics?.stat2_num || '3'}
                          onChange={(e) => updateField(['home', 'metrics', 'stat2_num'], e.target.value)}
                          className="w-12 text-center px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-xs"
                        />
                      </div>
                      <input
                        type="text"
                        value={localEdits?.home?.metrics?.stat2_text_en || ''}
                        onChange={(e) => updateField(['home', 'metrics', 'stat2_text_en'], e.target.value)}
                        placeholder="Label EN"
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 text-[11px]"
                      />
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.home?.metrics?.stat2_text_ar || ''}
                        onChange={(e) => updateField(['home', 'metrics', 'stat2_text_ar'], e.target.value)}
                        placeholder="الوصف AR"
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 text-[11px]"
                      />
                    </div>

                    {/* Stat 3 */}
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-purple-400 font-bold">Stat 3</span>
                        <input
                          type="text"
                          value={localEdits?.home?.metrics?.stat3_num || '80+'}
                          onChange={(e) => updateField(['home', 'metrics', 'stat3_num'], e.target.value)}
                          className="w-12 text-center px-1.5 py-0.5 rounded bg-purple-950 border border-purple-500/40 text-purple-300 font-mono font-bold text-xs"
                        />
                      </div>
                      <input
                        type="text"
                        value={localEdits?.home?.metrics?.stat3_text_en || ''}
                        onChange={(e) => updateField(['home', 'metrics', 'stat3_text_en'], e.target.value)}
                        placeholder="Label EN"
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 text-[11px]"
                      />
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.home?.metrics?.stat3_text_ar || ''}
                        onChange={(e) => updateField(['home', 'metrics', 'stat3_text_ar'], e.target.value)}
                        placeholder="الوصف AR"
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 text-[11px]"
                      />
                    </div>

                    {/* Stat 4 */}
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-amber-400 font-bold">Stat 4</span>
                        <input
                          type="text"
                          value={localEdits?.home?.metrics?.stat4_num || '3'}
                          onChange={(e) => updateField(['home', 'metrics', 'stat4_num'], e.target.value)}
                          className="w-12 text-center px-1.5 py-0.5 rounded bg-amber-950 border border-amber-500/40 text-amber-300 font-mono font-bold text-xs"
                        />
                      </div>
                      <input
                        type="text"
                        value={localEdits?.home?.metrics?.stat4_text_en || ''}
                        onChange={(e) => updateField(['home', 'metrics', 'stat4_text_en'], e.target.value)}
                        placeholder="Label EN"
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 text-[11px]"
                      />
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.home?.metrics?.stat4_text_ar || ''}
                        onChange={(e) => updateField(['home', 'metrics', 'stat4_text_ar'], e.target.value)}
                        placeholder="الوصف AR"
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Strategic Sectors Hub */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="text-[11px] font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Strategic Sectors Hub</span>
                  </div>

                  {/* Sectors Heading */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Section Heading (English)</label>
                      <input
                        type="text"
                        value={localEdits?.home?.sectors?.heading_en || ''}
                        onChange={(e) => updateField(['home', 'sectors', 'heading_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Section Heading (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.home?.sectors?.heading_ar || ''}
                        onChange={(e) => updateField(['home', 'sectors', 'heading_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>

                  {/* Hospitality Card */}
                  <div className="p-2.5 rounded-xl bg-sky-950/20 border border-sky-500/20 space-y-2">
                    <span className="text-[10px] font-mono text-sky-400 font-bold">1. SwissBlue Hospitality</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <textarea
                        rows={2}
                        value={localEdits?.home?.sectors?.hospitality_desc_en || ''}
                        onChange={(e) => updateField(['home', 'sectors', 'hospitality_desc_en'], e.target.value)}
                        placeholder="Description (EN)"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs resize-none"
                      />
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={localEdits?.home?.sectors?.hospitality_desc_ar || ''}
                        onChange={(e) => updateField(['home', 'sectors', 'hospitality_desc_ar'], e.target.value)}
                        placeholder="الوصف (AR)"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs resize-none"
                      />
                    </div>
                  </div>

                  {/* Manufacturing Card */}
                  <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">2. GreenWood Manufacturing</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <textarea
                        rows={2}
                        value={localEdits?.home?.sectors?.manufacturing_desc_en || ''}
                        onChange={(e) => updateField(['home', 'sectors', 'manufacturing_desc_en'], e.target.value)}
                        placeholder="Description (EN)"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs resize-none"
                      />
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={localEdits?.home?.sectors?.manufacturing_desc_ar || ''}
                        onChange={(e) => updateField(['home', 'sectors', 'manufacturing_desc_ar'], e.target.value)}
                        placeholder="الوصف (AR)"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs resize-none"
                      />
                    </div>
                  </div>

                  {/* Contracting Card */}
                  <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-2">
                    <span className="text-[10px] font-mono text-amber-400 font-bold">3. Turnkey Contracting</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <textarea
                        rows={2}
                        value={localEdits?.home?.sectors?.contracting_desc_en || ''}
                        onChange={(e) => updateField(['home', 'sectors', 'contracting_desc_en'], e.target.value)}
                        placeholder="Description (EN)"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs resize-none"
                      />
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={localEdits?.home?.sectors?.contracting_desc_ar || ''}
                        onChange={(e) => updateField(['home', 'sectors', 'contracting_desc_ar'], e.target.value)}
                        placeholder="الوصف (AR)"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Holding Synergy Lifecycle Chain */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Integrated Holding Synergy & Lifecycle Chain</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Synergy Heading (English)</label>
                      <input
                        type="text"
                        value={localEdits?.home?.synergy?.heading_en || ''}
                        onChange={(e) => updateField(['home', 'synergy', 'heading_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Synergy Heading (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.home?.synergy?.heading_ar || ''}
                        onChange={(e) => updateField(['home', 'synergy', 'heading_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Synergy Intro Body (English)</label>
                      <textarea
                        rows={2}
                        value={localEdits?.home?.synergy?.intro_en || ''}
                        onChange={(e) => updateField(['home', 'synergy', 'intro_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Synergy Intro Body (Arabic)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={localEdits?.home?.synergy?.intro_ar || ''}
                        onChange={(e) => updateField(['home', 'synergy', 'intro_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Vision & Mission Statements */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="text-[11px] font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Quote className="w-3.5 h-3.5" />
                    <span>Vision & Mission Statements</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Vision Statement (English)</label>
                      <textarea
                        rows={3}
                        value={localEdits?.home?.identity?.vision_desc_en || ''}
                        onChange={(e) => updateField(['home', 'identity', 'vision_desc_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Vision Statement (Arabic)</label>
                      <textarea
                        rows={3}
                        dir="rtl"
                        value={localEdits?.home?.identity?.vision_desc_ar || ''}
                        onChange={(e) => updateField(['home', 'identity', 'vision_desc_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Mission Statement (English)</label>
                      <textarea
                        rows={3}
                        value={localEdits?.home?.identity?.mission_desc_en || ''}
                        onChange={(e) => updateField(['home', 'identity', 'mission_desc_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Mission Statement (Arabic)</label>
                      <textarea
                        rows={3}
                        dir="rtl"
                        value={localEdits?.home?.identity?.mission_desc_ar || ''}
                        onChange={(e) => updateField(['home', 'identity', 'mission_desc_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 6. CEO Leadership Statement */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="text-[11px] font-mono font-bold text-[#C9A86A] uppercase tracking-wider flex items-center gap-1.5">
                    <Quote className="w-3.5 h-3.5" />
                    <span>CEO Leadership Statement</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Executive Quote (English)</label>
                      <textarea
                        rows={2}
                        value={localEdits?.home?.ceo?.quote_en || ''}
                        onChange={(e) => updateField(['home', 'ceo', 'quote_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Executive Quote (Arabic)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={localEdits?.home?.ceo?.quote_ar || ''}
                        onChange={(e) => updateField(['home', 'ceo', 'quote_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Leader Name (English)</label>
                      <input
                        type="text"
                        value={localEdits?.home?.ceo?.name_en || ''}
                        onChange={(e) => updateField(['home', 'ceo', 'name_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Leader Name (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.home?.ceo?.name_ar || ''}
                        onChange={(e) => updateField(['home', 'ceo', 'name_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* 7. Partnership & Contact CTA */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="text-[11px] font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Handshake className="w-3.5 h-3.5" />
                    <span>Partnership & Contact CTA Banner</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">CTA Heading (English)</label>
                      <input
                        type="text"
                        value={localEdits?.home?.partnership?.heading_en || ''}
                        onChange={(e) => updateField(['home', 'partnership', 'heading_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">CTA Heading (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.home?.partnership?.heading_ar || ''}
                        onChange={(e) => updateField(['home', 'partnership', 'heading_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">CTA Body Narrative (English)</label>
                      <textarea
                        rows={2}
                        value={localEdits?.home?.partnership?.body_en || ''}
                        onChange={(e) => updateField(['home', 'partnership', 'body_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">CTA Body Narrative (Arabic)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={localEdits?.home?.partnership?.body_ar || ''}
                        onChange={(e) => updateField(['home', 'partnership', 'body_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ══════════ PAGE 2: ABOUT US (/about) ══════════ */}
            {selectedPage === 'about' && (
              <div className="space-y-3.5">
                
                {/* About Hero */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="text-[11px] font-mono font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    <span>About Us Hero Section</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Title (English)</label>
                      <input
                        type="text"
                        value={localEdits?.about?.hero_title_en || ''}
                        onChange={(e) => updateField(['about', 'hero_title_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Title (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.about?.hero_title_ar || ''}
                        onChange={(e) => updateField(['about', 'hero_title_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle Narrative (English)</label>
                      <textarea
                        rows={2}
                        value={localEdits?.about?.hero_body_en || ''}
                        onChange={(e) => updateField(['about', 'hero_body_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle Narrative (Arabic)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={localEdits?.about?.hero_body_ar || ''}
                        onChange={(e) => updateField(['about', 'hero_body_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* About Story */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Corporate Story & Heritage</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Story Heading (English)</label>
                      <input
                        type="text"
                        value={localEdits?.about?.story_heading_en || ''}
                        onChange={(e) => updateField(['about', 'story_heading_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Story Heading (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.about?.story_heading_ar || ''}
                        onChange={(e) => updateField(['about', 'story_heading_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Story Narrative (English)</label>
                      <textarea
                        rows={3}
                        value={localEdits?.about?.story_body_en || ''}
                        onChange={(e) => updateField(['about', 'story_body_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Story Narrative (Arabic)</label>
                      <textarea
                        rows={3}
                        dir="rtl"
                        value={localEdits?.about?.story_body_ar || ''}
                        onChange={(e) => updateField(['about', 'story_body_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Governance Statement */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Quote className="w-3.5 h-3.5" />
                    <span>Executive Governance & Saudi 2030 Alignment</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Governance Statement (English)</label>
                      <textarea
                        rows={3}
                        value={localEdits?.about?.governance_statement_en || ''}
                        onChange={(e) => updateField(['about', 'governance_statement_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Governance Statement (Arabic)</label>
                      <textarea
                        rows={3}
                        dir="rtl"
                        value={localEdits?.about?.governance_statement_ar || ''}
                        onChange={(e) => updateField(['about', 'governance_statement_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ══════════ PAGE 3: HOSPITALITY ══════════ */}
            {selectedPage === 'hospitality' && (
              <div className="space-y-3.5">
                
                {/* Hero Section */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-sky-500/20 space-y-3">
                  <div className="text-[11px] font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>SwissBlue Hospitality Hero Section</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Title (English)</label>
                      <input
                        type="text"
                        value={localEdits?.hospitality?.hero_title_en || ''}
                        onChange={(e) => updateField(['hospitality', 'hero_title_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Title (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.hospitality?.hero_title_ar || ''}
                        onChange={(e) => updateField(['hospitality', 'hero_title_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (English)</label>
                      <textarea
                        rows={2}
                        value={localEdits?.hospitality?.hero_body_en || ''}
                        onChange={(e) => updateField(['hospitality', 'hero_body_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (Arabic)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={localEdits?.hospitality?.hero_body_ar || ''}
                        onChange={(e) => updateField(['hospitality', 'hero_body_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Hotel Management Services */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-sky-500/20 space-y-3">
                  <div className="text-[11px] font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Hospitality Management & Asset Operations</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Services Heading (English)</label>
                      <input
                        type="text"
                        value={localEdits?.hospitality?.services_heading_en || ''}
                        onChange={(e) => updateField(['hospitality', 'services_heading_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Services Heading (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.hospitality?.services_heading_ar || ''}
                        onChange={(e) => updateField(['hospitality', 'services_heading_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Hospitality RFP */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-sky-500/20 space-y-3">
                  <div className="text-[11px] font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Handshake className="w-3.5 h-3.5" />
                    <span>Hotel Property RFP & Operator Partnership</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">RFP Heading (English)</label>
                      <input
                        type="text"
                        value={localEdits?.hospitality?.rfp_heading_en || ''}
                        onChange={(e) => updateField(['hospitality', 'rfp_heading_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">RFP Heading (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.hospitality?.rfp_heading_ar || ''}
                        onChange={(e) => updateField(['hospitality', 'rfp_heading_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ══════════ PAGE 4: MANUFACTURING ══════════ */}
            {selectedPage === 'manufacturing' && (
              <div className="space-y-3.5">
                
                {/* Hero Section */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-emerald-500/20 space-y-3">
                  <div className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Factory className="w-3.5 h-3.5" />
                    <span>GreenWood Manufacturing Hero Section</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Title (English)</label>
                      <input
                        type="text"
                        value={localEdits?.manufacturing?.hero_title_en || ''}
                        onChange={(e) => updateField(['manufacturing', 'hero_title_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Title (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.manufacturing?.hero_title_ar || ''}
                        onChange={(e) => updateField(['manufacturing', 'hero_title_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (English)</label>
                      <textarea
                        rows={2}
                        value={localEdits?.manufacturing?.hero_body_en || ''}
                        onChange={(e) => updateField(['manufacturing', 'hero_body_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (Arabic)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={localEdits?.manufacturing?.hero_body_ar || ''}
                        onChange={(e) => updateField(['manufacturing', 'hero_body_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Capabilities */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-emerald-500/20 space-y-3">
                  <div className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Specialized Industrial & CNC Capabilities</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Capabilities Heading (English)</label>
                      <input
                        type="text"
                        value={localEdits?.manufacturing?.capabilities_heading_en || ''}
                        onChange={(e) => updateField(['manufacturing', 'capabilities_heading_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Capabilities Heading (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.manufacturing?.capabilities_heading_ar || ''}
                        onChange={(e) => updateField(['manufacturing', 'capabilities_heading_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Manufacturing RFP */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-emerald-500/20 space-y-3">
                  <div className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Handshake className="w-3.5 h-3.5" />
                    <span>Custom Contract Furniture & Production RFP</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">RFP Heading (English)</label>
                      <input
                        type="text"
                        value={localEdits?.manufacturing?.rfp_heading_en || ''}
                        onChange={(e) => updateField(['manufacturing', 'rfp_heading_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">RFP Heading (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.manufacturing?.rfp_heading_ar || ''}
                        onChange={(e) => updateField(['manufacturing', 'rfp_heading_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ══════════ PAGE 5: CONTRACTING ══════════ */}
            {selectedPage === 'contracting' && (
              <div className="space-y-3.5">
                
                {/* Hero Section */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-amber-500/20 space-y-3">
                  <div className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <HardHat className="w-3.5 h-3.5" />
                    <span>Contracting & Fit-Out Hero Section</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Title (English)</label>
                      <input
                        type="text"
                        value={localEdits?.contracting?.hero_title_en || ''}
                        onChange={(e) => updateField(['contracting', 'hero_title_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Title (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.contracting?.hero_title_ar || ''}
                        onChange={(e) => updateField(['contracting', 'hero_title_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (English)</label>
                      <textarea
                        rows={2}
                        value={localEdits?.contracting?.hero_body_en || ''}
                        onChange={(e) => updateField(['contracting', 'hero_body_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (Arabic)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={localEdits?.contracting?.hero_body_ar || ''}
                        onChange={(e) => updateField(['contracting', 'hero_body_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Lifecycle Heading */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-amber-500/20 space-y-3">
                  <div className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Project Execution Lifecycle & Stages</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Lifecycle Heading (English)</label>
                      <input
                        type="text"
                        value={localEdits?.contracting?.lifecycle_heading_en || ''}
                        onChange={(e) => updateField(['contracting', 'lifecycle_heading_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Lifecycle Heading (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.contracting?.lifecycle_heading_ar || ''}
                        onChange={(e) => updateField(['contracting', 'lifecycle_heading_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Contracting RFP */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-amber-500/20 space-y-3">
                  <div className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Handshake className="w-3.5 h-3.5" />
                    <span>Turnkey Contracting & Tender RFP</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">RFP Heading (English)</label>
                      <input
                        type="text"
                        value={localEdits?.contracting?.rfp_heading_en || ''}
                        onChange={(e) => updateField(['contracting', 'rfp_heading_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">RFP Heading (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.contracting?.rfp_heading_ar || ''}
                        onChange={(e) => updateField(['contracting', 'rfp_heading_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ══════════ PAGE 6: CAREERS ══════════ */}
            {selectedPage === 'careers' && (
              <div className="space-y-3.5">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-3">
                  <div className="text-[11px] font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Careers & Saudi Talent Development</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Title (English)</label>
                      <input
                        type="text"
                        value={localEdits?.careers?.hero_title_en || ''}
                        onChange={(e) => updateField(['careers', 'hero_title_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Title (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.careers?.hero_title_ar || ''}
                        onChange={(e) => updateField(['careers', 'hero_title_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (English)</label>
                      <textarea
                        rows={2}
                        value={localEdits?.careers?.hero_body_en || ''}
                        onChange={(e) => updateField(['careers', 'hero_body_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (Arabic)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={localEdits?.careers?.hero_body_ar || ''}
                        onChange={(e) => updateField(['careers', 'hero_body_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Proof Badge (English)</label>
                      <input
                        type="text"
                        value={localEdits?.careers?.hero_proof_en || ''}
                        onChange={(e) => updateField(['careers', 'hero_proof_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Proof Badge (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.careers?.hero_proof_ar || ''}
                        onChange={(e) => updateField(['careers', 'hero_proof_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ══════════ PAGE 7: CONTACT US ══════════ */}
            {selectedPage === 'contact' && (
              <div className="space-y-3.5">
                
                {/* Contact Hero */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="text-[11px] font-mono font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Contact Us Hero Section</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Title (English)</label>
                      <input
                        type="text"
                        value={localEdits?.contact?.hero_title_en || ''}
                        onChange={(e) => updateField(['contact', 'hero_title_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Title (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.contact?.hero_title_ar || ''}
                        onChange={(e) => updateField(['contact', 'hero_title_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (English)</label>
                      <textarea
                        rows={2}
                        value={localEdits?.contact?.hero_body_en || ''}
                        onChange={(e) => updateField(['contact', 'hero_body_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (Arabic)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={localEdits?.contact?.hero_body_ar || ''}
                        onChange={(e) => updateField(['contact', 'hero_body_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Headquarters Details */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Headquarters & Credentials</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">HQ Address (English)</label>
                      <input
                        type="text"
                        value={localEdits?.contact?.hq_address_en || ''}
                        onChange={(e) => updateField(['contact', 'hq_address_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">HQ Address (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.contact?.hq_address_ar || ''}
                        onChange={(e) => updateField(['contact', 'hq_address_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">General Inquiries Email</label>
                      <input
                        type="email"
                        value={localEdits?.contact?.general_email || 'info@wdgroup.com.sa'}
                        onChange={(e) => updateField(['contact', 'general_email'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Primary Telephone</label>
                      <input
                        type="text"
                        value={localEdits?.contact?.primary_phone || '+966 17 522 2229'}
                        onChange={(e) => updateField(['contact', 'primary_phone'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white font-mono"
                      />
                    </div>
                  </div>

                  {/* Header Top-Right CTA Button Text */}
                  <div className="pt-2 border-t border-white/10">
                    <label className="block text-[11px] text-[#C9A86A] font-semibold mb-1">
                      Header Top-Right Contact Button (EN / AR)
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        value={localEdits?.settings?.nav_cta_en || 'Contact Us'}
                        onChange={(e) => updateField(['settings', 'nav_cta_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-[#C9A86A]/40 text-[#C9A86A]"
                      />
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.settings?.nav_cta_ar || 'تواصل معنا'}
                        onChange={(e) => updateField(['settings', 'nav_cta_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-[#C9A86A]/40 text-[#C9A86A]"
                      />
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>

          {/* Persistent Footer with Direct Link to Main Admin Dashboard */}
          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="font-mono text-[11px] text-zinc-300 font-semibold">WD GROUP REALTIME LIVE CMS</span>
            </div>
            
            <div className="flex items-center gap-2.5">
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 hover:border-blue-500 transition-all font-mono text-[11px] font-bold shadow-sm cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Go to Main Dashboard</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>

              <Link
                href="/admin/content/pages"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-all font-mono text-[11px] font-semibold cursor-pointer"
              >
                <span>Full Pages CMS</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
