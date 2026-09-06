export interface HotspotPoint {
  id: string;
  top: string; // percentage e.g. "45%"
  left: string; // percentage e.g. "60%"
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}

export interface MaterialSwatch {
  id: string;
  nameAr: string;
  nameEn: string;
  typeAr: string;
  typeEn: string;
  colorHex: string;
  image: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  macroImage: string;
  tagEn: string;
  tagAr: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  ctaCatalogEn: string;
  ctaCatalogAr: string;
  ctaQuoteEn: string;
  ctaQuoteAr: string;
  pieceNameEn: string;
  pieceNameAr: string;
  materialsEn: string;
  materialsAr: string;
  specs: {
    woodAr: string;
    woodEn: string;
    upholsteryAr: string;
    upholsteryEn: string;
    factoryAr: string;
    factoryEn: string;
    leadTimeAr: string;
    leadTimeEn: string;
  };
  hotspots: HotspotPoint[];
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'living-collection',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85',
    macroImage: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=800&q=80',
    tagEn: 'Signature 2025 Living Collection',
    tagAr: 'مجموعة الصالونات المعمارية 2025',
    titleEn: 'Timeless Craftsmanship. Architectural Distinction.',
    titleAr: 'حِرفية أصيلة. فخامة صُممت لتدوم.',
    subtitleEn: 'Sculptural organic seating, solid American walnut joinery, and Italian textured bouclés handcrafted in our specialized Saudi industrial facilities.',
    subtitleAr: 'مقاعد نحتية انسيابية، نجارة من خشب الجوز الأمريكي الطبيعي، وأقمشة بوكليه إيطالية فاخرة تُصنع بأيدي وطنية في مصانعنا بالرياض ونجران.',
    ctaCatalogEn: 'Explore Collection',
    ctaCatalogAr: 'استكشف المجموعة',
    ctaQuoteEn: 'Request Custom Order',
    ctaQuoteAr: 'طلب تفصيل مخصص',
    pieceNameEn: 'Architectural Sculptural Lounge Suite',
    pieceNameAr: 'طقم صالون نحتي معماري انسيابي',
    materialsEn: 'Solid American Walnut • Italian Textured Bouclé',
    materialsAr: 'خشب جوز أمريكي مصمت • قماش بوكليه إيطالي فاخر',
    specs: {
      woodAr: 'خشب جوز أمريكي مصمت مجفف بالفرن (Kiln-Dried)',
      woodEn: 'Kiln-Dried Solid American Walnut Core',
      upholsteryAr: 'نسيج بوكليه إيطالي عالي الكثافة مقاوم للبقع',
      upholsteryEn: 'High-Density Italian Textured Bouclé (Stain-Resistant)',
      factoryAr: 'مصانع WD للمفروشات (الرياض ونجران)',
      factoryEn: 'WD Industrial Manufacturing Plants (KSA)',
      leadTimeAr: '7 - 12 يوم عمل (شامل التوصيل والتركيب)',
      leadTimeEn: '7 - 12 Working Days (Turnkey Delivery)',
    },
    hotspots: [
      {
        id: 'hs-walnut-frame',
        top: '72%',
        left: '42%',
        titleAr: 'قاعدة جوز أمريكي مصمت',
        titleEn: 'Solid Walnut Base',
        descAr: 'نجارة يدوية معمارية بزوايا ميتري مخفية وحماية ضد الرطوبة.',
        descEn: 'Architectural concealed joinery with moisture-sealed natural matte finish.'
      },
      {
        id: 'hs-boucle-seat',
        top: '48%',
        left: '60%',
        titleAr: 'بوكليه إيطالي منسوج',
        titleEn: 'Italian Bouclé Weave',
        descAr: 'إسفنج فندقي عالي المرونة HR مع طبقة ريش داون لدعم مثالي.',
        descEn: 'High-resilience hotel-grade HR core with feather-down topper for ergonomic ease.'
      },
      {
        id: 'hs-modular-joint',
        top: '35%',
        left: '28%',
        titleAr: 'هيكل تركيبي مخصص',
        titleEn: 'Modular Bespoke Frame',
        descAr: 'قابل للتمدد وتعديل الأبعاد حسب المخطط الهندسي للمجلس.',
        descEn: 'Fully adaptable to fit exact architectural room blueprints.'
      }
    ]
  },
  {
    id: 'presidential-suites',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2000&q=85',
    macroImage: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
    tagEn: 'Hospitality & Luxury Suites',
    tagAr: 'أجنحة الضيافة والفنادق الفاخرة',
    titleEn: 'Presidential Suites Engineered for 5-Star Serenity.',
    titleAr: 'أجنحة رئاسية صُممت لأرقى معايير الضيافة العالمية.',
    subtitleEn: 'Turnkey hotel bedroom suites featuring floating upholstered headboards, acoustic fluted paneling, and invisible inductive charging.',
    subtitleAr: 'حلول تأثيث وتجهيز فندقي شاملة تشمل أسرّة فندقية عائمة، تجاليد جدارية عازلة للصوت، وشواحن لاسلكية ذكية مدمجة.',
    ctaCatalogEn: 'View Suite Collection',
    ctaCatalogAr: 'استعرض أجنحة النوم',
    ctaQuoteEn: 'Hotel Procurement RFP',
    ctaQuoteAr: 'كراسة توريدات الفنادق',
    pieceNameEn: 'Turnkey Presidential Master Suite',
    pieceNameAr: 'جناح سويت رئاسي فندقي متكامل',
    materialsEn: 'Fluted Acoustic Oak • Floating Upholstery',
    materialsAr: 'تجاليد بلوط مجزّعة عازلة • رأس سرير عائم مبطن',
    specs: {
      woodAr: 'قشور بلوط طبيعي مجزع مع ألياف عازلة للصوت NRC 0.85',
      woodEn: 'Natural Fluted Oak with Acoustic Absorption (NRC 0.85)',
      upholsteryAr: 'كتان هولندي مقاوم للاحتراق واختبار مارتينديل 80K',
      upholsteryEn: 'Dutch Flame-Retardant Linen (80,000 Rubs Martindale)',
      factoryAr: 'خط إنتاج المشاريع الفندقية (مصنع نجران والرياض)',
      factoryEn: 'Hospitality FF&E Dedicated Facility (KSA)',
      leadTimeAr: '10 - 16 يوم عمل للمجموعات الفندقية والفلل',
      leadTimeEn: '10 - 16 Working Days (Contract Volumes Available)',
    },
    hotspots: [
      {
        id: 'hs-acoustic-cladding',
        top: '28%',
        left: '38%',
        titleAr: 'تجليد جداري عازل للصوت',
        titleEn: 'Acoustic Fluted Paneling',
        descAr: 'شرائح بلوط مجزع عازلة لترددات الصوت المحيطة لأقصى هدوء فندقي.',
        descEn: 'Engineered fluted panels with sound-dampening acoustic core.'
      },
      {
        id: 'hs-floating-bed',
        top: '60%',
        left: '52%',
        titleAr: 'سرير كينج فندقي عائم',
        titleEn: 'Floating King Cantilever',
        descAr: 'إضاءة خافتة LED سفلية غير مرئية مع شواحن لاسلكية بالكودينات.',
        descEn: 'Concealed perimeter LED underglow with Qi wireless bedside pads.'
      }
    ]
  },
  {
    id: 'executive-boardrooms',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85',
    macroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    tagEn: 'Executive Boardroom & Joinery',
    tagAr: 'المكاتب وقاعات الاجتماعات التنفيذية',
    titleEn: 'Monumental Walnut & Travertine Boardroom Centers.',
    titleAr: 'طاولات اجتماعات ومكاتب تنفيذية من الجوز والترافرتين الطبيعي.',
    subtitleEn: 'Commanding executive tables engineered with solid American walnut live edges, Saudi travertine pedestals, and motorized German wire architecture.',
    subtitleAr: 'طاولات اجتماعات فخمة من خشب الجوز الأمريكي المصمت وقواعد الترافرتين الطبيعي مع ممرات كابلات آلية ألمانية الصنع.',
    ctaCatalogEn: 'Discover Boardrooms',
    ctaCatalogAr: 'استكشف طاولات الاجتماعات',
    ctaQuoteEn: 'Corporate RFP',
    ctaQuoteAr: 'طلب تسعير الشركات',
    pieceNameEn: 'Monumental Live-Edge Boardroom Table',
    pieceNameAr: 'طاولة اجتماعات مونومنتال الحافة الحية',
    materialsEn: 'Solid Walnut Live-Edge • Natural Travertine',
    materialsAr: 'خشب جوز طبيعي لايف إيدج • قواعد ترافرتين طبيعي',
    specs: {
      woodAr: 'كتل جوز أمريكي لايف إيدج سماكة 65 ملم مع ترافرتين نجراني',
      woodEn: '65mm Solid Live-Edge Walnut with Saudi Travertine Columns',
      upholsteryAr: 'جلود إيطالية نابا مدبوغة نباتياً لكراسي الرؤساء',
      upholsteryEn: 'Italian Full-Grain Vegetable-Tanned Nappa Leather',
      factoryAr: 'وحدة الأعمال الخاصة والنجارة المعمارية المتقدمة',
      factoryEn: 'Executive Bespoke Joinery Unit (Riyadh)',
      leadTimeAr: '12 - 18 يوم عمل مع تفصيل الممرات الكهربائية الألمانية',
      leadTimeEn: '12 - 18 Working Days with German Motorized Cable Hubs',
    },
    hotspots: [
      {
        id: 'hs-travertine-pedestal',
        top: '68%',
        left: '32%',
        titleAr: 'قواعد حجر ترافرتين سعودي',
        titleEn: 'Saudi Travertine Pedestal',
        descAr: 'حجر طبيعي صلب مصقول يدوياً يتحمل أوزان الألواح الخشبية الضخمة.',
        descEn: 'Honed natural travertine pedestals engineered for monumental stability.'
      },
      {
        id: 'hs-cable-hub',
        top: '45%',
        left: '56%',
        titleAr: 'بوابات توصيل ذكية مخفية',
        titleEn: 'Concealed Tech Architecture',
        descAr: 'منافذ كهرباء وشبكات ألمانية آلية ترتفع بلمسة مستشعر ناعمة.',
        descEn: 'Motorized pop-up power & HDMI connectivity with walnut flush covers.'
      }
    ]
  }
];

export const MATERIAL_SWATCHES: MaterialSwatch[] = [
  {
    id: 'walnut',
    nameAr: 'خشب جوز أمريكي داكن',
    nameEn: 'American Black Walnut',
    typeAr: 'أخشاب صلبة طبيعية مجففة',
    typeEn: 'Kiln-Dried Solid Hardwood',
    colorHex: '#42281D',
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'smoked-oak',
    nameAr: 'بلوط أوربي مدخن',
    nameEn: 'Smoked European Oak',
    typeAr: 'أخشاب مصمتة فاخرة',
    typeEn: 'Architectural Oak',
    colorHex: '#695545',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'travertine',
    nameAr: 'ترافرتين نجراني طبيعي',
    nameEn: 'Saudi Cream Travertine',
    typeAr: 'أحجار طبيعية سعودية',
    typeEn: 'Natural Saudi Stone',
    colorHex: '#D6C8B2',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'boucle',
    nameAr: 'بوكليه إيطالي عاجي',
    nameEn: 'Italian Ivory Bouclé',
    typeAr: 'منسوجات فاخرة 80K دورة',
    typeEn: 'High-Martindale Fabric',
    colorHex: '#EDE6D6',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80'
  }
];
