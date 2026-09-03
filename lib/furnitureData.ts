export interface FurnitureItem {
  id: string;
  sku: string;
  nameEn: string;
  nameAr: string;
  category: 'living' | 'bedroom' | 'dining' | 'joinery' | 'decor';
  categoryEn: string;
  categoryAr: string;
  price: number;
  originalPrice?: number;
  isCustomQuote?: boolean;
  rating: number;
  reviewsCount: number;
  badgeEn?: string;
  badgeAr?: string;
  shortDescEn: string;
  shortDescAr: string;
  fullDescEn: string;
  fullDescAr: string;
  materialsEn: string;
  materialsAr: string;
  materialKey: 'walnut' | 'leather' | 'brass' | 'boucle' | 'marble';
  dimensions: {
    width: number;
    depth: number;
    height: number;
    unit: string;
  };
  leadTimeEn: string;
  leadTimeAr: string;
  images: string[];
  finishes: {
    id: string;
    nameEn: string;
    nameAr: string;
    colorCode: string;
  }[];
  featuresEn: string[];
  featuresAr: string[];
  inStock: boolean;
  isHospitalityGrade: boolean;
  factoryLocationEn: string;
  factoryLocationAr: string;
}

export const FURNITURE_CATALOG: FurnitureItem[] = [
  // 1. LIVING & LOUNGE
  {
    id: 'gw-diriyah-curved-sofa',
    sku: 'GW-LV-801',
    nameEn: 'The Al-Diriyah Modular Curved Sofa',
    nameAr: 'أريكة الدرعية المنحنية الفاخرة',
    category: 'living',
    categoryEn: 'Living & Lounge',
    categoryAr: 'الصالونات وغرف المعيشة',
    price: 18900,
    originalPrice: 21500,
    rating: 4.9,
    reviewsCount: 28,
    badgeEn: 'Bestseller',
    badgeAr: 'الأكثر طلباً',
    shortDescEn: 'Sculptural organic silhouette upholstered in textured Italian bouclé with hidden solid walnut plinth base.',
    shortDescAr: 'تصميم عضوي نحتي منجد بقماش البوكليه الإيطالي الفاخر مع قاعدة مدمجة من خشب الجوز الطبيعي.',
    fullDescEn: 'Designed for prestigious living spaces and hotel lounges, the Al-Diriyah sofa combines generous curved ergonomics with heavy-duty commercial grade interior frames. Built with kiln-dried solid beech and multi-density high-resilience foam for lasting comfort.',
    fullDescAr: 'صُممت لأفخم المجالس والصالونات وردهات الفنادق، حيث تجمع أريكة الدرعية بين الانحناءات المريحة والهيكل الداخلي الصلب المصنوع من خشب الزان المعالج حرارياً والإسفنج عالي الكثافة لضمان راحة تدوم لسنوات.',
    materialsEn: 'Textured Bouclé Fabric, Solid American Walnut Plinth, High-Resilience Foam',
    materialsAr: 'قماش بوكليه إيطالي فاخر، قاعدة خشب جوز أمريكي، إسفنج عالي المرونة HR',
    materialKey: 'boucle',
    dimensions: { width: 290, depth: 120, height: 78, unit: 'cm' },
    leadTimeEn: '10–14 Business Days',
    leadTimeAr: '10 – 14 يوم عمل',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=85'
    ],
    finishes: [
      { id: 'cream-boucle', nameEn: 'Ivory Bouclé', nameAr: 'بوكليه عاجي', colorCode: '#F4F1EA' },
      { id: 'camel-velvet', nameEn: 'Desert Camel Velvet', nameAr: 'مخمل صحراوي جملي', colorCode: '#C9A86A' },
      { id: 'slate-grey', nameEn: 'Charcoal Slate', nameAr: 'رمادي حجري داكن', colorCode: '#333842' },
    ],
    featuresEn: [
      'Kiln-dried solid beech inner frame with 10-year structural guarantee',
      'Commercial-grade stain-resistant treatment (PFC-free)',
      'Engineered & hand-upholstered at GreenWood Factory 3 in Riyadh',
      'Modular configuration tailored to room layout'
    ],
    featuresAr: [
      'هيكل داخلي من خشب الزان المعالج حرارياً مع ضمان هيكلي 10 سنوات',
      'معالجة متقدمة مقاومة للبقع والسوائل للاستخدام الفندقي والسكني',
      'تنجيد يدوي متقن بمصنع جرين وود 3 بالرياض',
      'تصميم موديلي قابل للتعديل بحسب مساحة المجلس'
    ],
    inStock: true,
    isHospitalityGrade: true,
    factoryLocationEn: 'GreenWood Factory 3 — Riyadh',
    factoryLocationAr: 'مصنع جرين وود 3 — الرياض',
  },
  {
    id: 'gw-najran-travertine-table',
    sku: 'GW-TB-405',
    nameEn: 'The Najran Travertine & Smoked Oak Coffee Table',
    nameAr: 'طاولة قهوة نجران من الترافرتين وخشب البلوط',
    category: 'living',
    categoryEn: 'Living & Lounge',
    categoryAr: 'الصالونات وغرف المعيشة',
    price: 8750,
    originalPrice: 9800,
    rating: 4.8,
    reviewsCount: 34,
    badgeEn: 'Natural Stone',
    badgeAr: 'حجر طبيعي',
    shortDescEn: 'Hand-honed Roman travertine slab floating atop a multi-faceted fluted smoked oak architectural pedestal.',
    shortDescAr: 'لوح حجر ترافرتين روماني مصقول يدوياً يرتكز على قاعدة أسطوانية مضلعة من خشب البلوط المدخن.',
    fullDescEn: 'A masterpiece of material contrast celebrating geological texture and master woodwork. The honed un-filled travertine tabletop features organic natural veins, sealed with an invisible hydrophobic coat for everyday endurance.',
    fullDescAr: 'تحفة فنية تحتفي بتناغم المواد الطبيعية بين الحجر الجيولوجي الفاخر والنجارة اليدوية. سطح الترافرتين الطبيعي معالج بطبقة نانو غير مرئية عازلة للبقع تضمن المتانة العالية.',
    materialsEn: 'Natural Honed Travertine Stone, Solid Smoked Oak, CNC Fluted Finish',
    materialsAr: 'حجر ترافرتين طبيعي غير مفرغ، خشب بلوط مدخن، تشكيل CNC مضلع',
    materialKey: 'marble',
    dimensions: { width: 140, depth: 80, height: 38, unit: 'cm' },
    leadTimeEn: '7–10 Business Days',
    leadTimeAr: '7 – 10 أيام عمل',
    images: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85'
    ],
    finishes: [
      { id: 'beige-travertine', nameEn: 'Warm Beige Travertine', nameAr: 'ترافرتين بيج دافئ', colorCode: '#DFD5C6' },
      { id: 'silver-travertine', nameEn: 'Silver Titanium Travertine', nameAr: 'ترافرتين فضي تيتانيوم', colorCode: '#A8A49C' },
      { id: 'marquina-black', nameEn: 'Nero Marquina Black Marble', nameAr: 'رخام ماركينا أسود', colorCode: '#1A1A1A' },
    ],
    featuresEn: [
      'Each slab is uniquely veined and selected by GreenWood master craftsmen',
      'Nano-sealed anti-stain matte protective finish',
      'Internal structural steel brace to prevent stress fractures',
      'Matches the Al-Diriyah sofa and SwissBlue lounge seating'
    ],
    featuresAr: [
      'كل لوح حجر ذو تعريقات فريدة ومختارة بعناية من خبراء جرين وود',
      'معالجة نانو مطفية مانعة لامتصاص القهوة والسوائل',
      'تدعيم فولاذي داخلي لمنع أي إجهاد أو كسر',
      'يتناسق بانسجام مع أريكة الدرعية وجلسات سويس بلو'
    ],
    inStock: true,
    isHospitalityGrade: true,
    factoryLocationEn: 'GreenWood Factory 1 — Najran',
    factoryLocationAr: 'مصنع جرين وود 1 — نجران',
  },
  {
    id: 'gw-alula-lounge-armchair',
    sku: 'GW-CH-304',
    nameEn: 'The Al-Ula Sculptural Lounge Armchair',
    nameAr: 'كرسي الاسترخاء النحتي الفاخر العلا',
    category: 'living',
    categoryEn: 'Living & Lounge',
    categoryAr: 'الصالونات وغرف المعيشة',
    price: 9200,
    originalPrice: 10500,
    rating: 4.9,
    reviewsCount: 42,
    badgeEn: 'Artisanal Leather',
    badgeAr: 'جلد طبيعي فاخر',
    shortDescEn: 'Ergonomic wrap-around lounge chair clad in full-grain Italian cognac leather with hand-carved solid oak legs.',
    shortDescAr: 'كرسي استرخاء مريح يحتضن الجلسة مكسو بالجلد الإيطالي بلون الكونياك مع أرجل من خشب السنديان المحفور يدوياً.',
    fullDescEn: 'Inspired by the monumental sandstone formations of Al-Ula, this armchair delivers an unmistakable sculptural presence. The supple full-grain aniline leather develops a rich patina over decades of use.',
    fullDescAr: 'مستوحى من التكوينات الصخرية الخلابة في العلا، يمنح هذا الكرسي حضوراً نحتياً استثنائياً. يكتسب الجلد الإيطالي الطبيعي الفاخر رونقاً وأصالة متزايدة مع مرور السنين.',
    materialsEn: 'Full-Grain Italian Aniline Leather, Solid White Oak, Feather Down Cushioning',
    materialsAr: 'جلد أنيلين إيطالي طبيعي، خشب سنديان أبيض صلب، حشوة ريش طبيعي وإسفنج',
    materialKey: 'leather',
    dimensions: { width: 92, depth: 90, height: 82, unit: 'cm' },
    leadTimeEn: '8–12 Business Days',
    leadTimeAr: '8 – 12 يوم عمل',
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85'
    ],
    finishes: [
      { id: 'cognac-leather', nameEn: 'Heritage Cognac Leather', nameAr: 'جلد كونياك كلاسيكي', colorCode: '#9E5B32' },
      { id: 'espresso-leather', nameEn: 'Deep Espresso Leather', nameAr: 'جلد إسبريسو داكن', colorCode: '#382218' },
      { id: 'emerald-leather', nameEn: 'Saudi Forest Emerald Leather', nameAr: 'جلد أخضر زمردي فاخر', colorCode: '#0B5C3D' },
    ],
    featuresEn: [
      'Premium European hides hand-cut and stitched by master leather artisans',
      'Dual-layer high-density memory foam core with duck-feather topper',
      'Concealed 360-degree silent swivel mechanism option available',
      '5-year upholstery and frame warranty'
    ],
    featuresAr: [
      'جلود أوروبية مختارة مقصوصة ومخيطة يدوياً بواسطة أمهر الحرفيين',
      'طبقتان من الميموري فوم عالي الكثافة مع طبقة ريش ناعمة للأعلى',
      'خيار آلية الدوران الصامت بزاوية 360 درجة مخفية بالكامل',
      'ضمان شامل 5 سنوات على الجلد والهيكل'
    ],
    inStock: true,
    isHospitalityGrade: true,
    factoryLocationEn: 'GreenWood Factory 3 — Upholstery Center',
    factoryLocationAr: 'مصنع جرين وود 3 — مركز التنجيد والجلود',
  },
  {
    id: 'gw-nakheel-l-sectional',
    sku: 'GW-LV-815',
    nameEn: 'The Al-Nakheel Royal L-Shape Sectional Sofa',
    nameAr: 'طقم كنب النخيل الملكي المتصل للمجالس',
    category: 'living',
    categoryEn: 'Living & Lounge',
    categoryAr: 'الصالونات وغرف المعيشة',
    price: 26800,
    originalPrice: 29500,
    rating: 5.0,
    reviewsCount: 17,
    badgeEn: 'Royal Collection',
    badgeAr: 'المجموعة الملكية',
    shortDescEn: 'Expansive luxury L-shape sectional with integrated marble side ledge, brushed bronze base, and deep feather seating.',
    shortDescAr: 'كنب زاوية فخم متصل مع طاولة رخامية جانبية مدمجة، وقاعدة برونزية عريضة، وجلسة عميقة بحشوة الريش.',
    fullDescEn: 'Engineered for prestigious majlis halls and grand penthouses. Handcrafted with high-tensile spring steel core and plush down filling, complemented by an integrated Emperador marble side console.',
    fullDescAr: 'صُمم خصيصاً للمجالس والقصور الفاخرة. يتميز بنوابض فولاذية معالجة وحشوة ريش فائقة النعومة مع رف كونسول مدمج من رخام الإمبرادور الفاخر.',
    materialsEn: 'Imported Linen-Velvet, Solid Beech Frame, Dark Emperador Marble',
    materialsAr: 'مخمل كتاني فاخر، هيكل خشب زان، رخام إمبرادور داكن',
    materialKey: 'boucle',
    dimensions: { width: 360, depth: 240, height: 80, unit: 'cm' },
    leadTimeEn: '14–18 Business Days',
    leadTimeAr: '14 – 18 يوم عمل',
    images: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85'
    ],
    finishes: [
      { id: 'desert-sand', nameEn: 'Desert Sand Linen', nameAr: 'كتان رملي صحراوي', colorCode: '#D2B48C' },
      { id: 'royal-navy', nameEn: 'Royal Arabian Navy', nameAr: 'كحلي ملكي فاخر', colorCode: '#1B263B' },
      { id: 'olive-velvet', nameEn: 'Olive Branch Velvet', nameAr: 'مخمل زيتي هادئ', colorCode: '#4B5320' },
    ],
    featuresEn: [
      'Modular L-configuration with reversible chaise section',
      'Integrated marble beverage tray and wireless Qi charging pad',
      'Double-doweled solid beech kiln-dried frame',
      'Certified for ultra-heavy contract endurance'
    ],
    featuresAr: [
      'تصميم موديلي مرن يمكن عكس اتجاه الشيزلونج بحسب الصالون',
      'طاولة رخامية مدمجة مع شاحن لاسلكي Qi',
      'هيكل زان معالج حرارياً ومثبت بوصلات متقابلة مضاعفة',
      'مطابق للمواصفات الفندقية للأحمال الثقيلة'
    ],
    inStock: true,
    isHospitalityGrade: true,
    factoryLocationEn: 'GreenWood Factory 3 — Riyadh',
    factoryLocationAr: 'مصنع جرين وود 3 — الرياض',
  },

  // 2. BEDROOM & HOSPITALITY SUITES
  {
    id: 'gw-swissblue-suite-bed',
    sku: 'GW-BD-702',
    nameEn: 'SwissBlue Presidential Suite Bed & Joinery',
    nameAr: 'سرير الجناح الرئاسي سويس بلو مع التجاليد المدمجة',
    category: 'bedroom',
    categoryEn: 'Hospitality & Suites',
    categoryAr: 'الأجنحة والضيافة الفندقية',
    price: 24500,
    originalPrice: 28000,
    rating: 5.0,
    reviewsCount: 19,
    badgeEn: 'Hotel Signature',
    badgeAr: 'معتمد فندقيًا',
    shortDescEn: 'Integrated floating king bed with full-height fluted walnut wall headboard, warm indirect LED channels, and brushed brass charging plates.',
    shortDescAr: 'سرير فندقي عائم بمقاس كينج مع لوح جداري مضلع من خشب الجوز، وقنوات إضاءة LED مدمجة، ومنافذ شحن نحاسية.',
    fullDescEn: 'Originally custom-engineered for SwissBlue Hotel luxury presidential suites, this integrated master bed system connects architectural wall paneling, floating cantilevered bedside nightstands, and dimmable mood lighting in one unified installation.',
    fullDescAr: 'صُمم خصيصاً للأجنحة الرئاسية في فنادق سويس بلو الفاخرة، حيث يجمع هذا النظام بين تجاليد الجدار الخشبية المضلعة، والكمودينات العائمة، والإضاءة المحيطية المدمجة في منظومة متكاملة.',
    materialsEn: 'Natural American Walnut, Brushed Champagne Brass, Fluted Acoustic Backing',
    materialsAr: 'خشب جوز أمريكي طبيعي، نحاس شامبين مصقول، بطانة عازلة للصوت',
    materialKey: 'walnut',
    dimensions: { width: 340, depth: 225, height: 160, unit: 'cm' },
    leadTimeEn: '14–18 Business Days',
    leadTimeAr: '14 – 18 يوم عمل',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85'
    ],
    finishes: [
      { id: 'natural-walnut', nameEn: 'Natural American Walnut', nameAr: 'جوز أمريكي طبيعي', colorCode: '#5C4033' },
      { id: 'smoked-oak', nameEn: 'Smoked Crown Oak', nameAr: 'سنديان مدخن فاخر', colorCode: '#3A2E26' },
      { id: 'ebony-ash', nameEn: 'Ebony Brushed Ash', nameAr: 'خشب الدردار الأبنوسي', colorCode: '#1C1C1C' },
    ],
    featuresEn: [
      'Includes dual floating nightstands with concealed soft-close Blum drawers',
      'Integrated warm 2700K indirect LED illumination channels with master control',
      'Universal USB-C / wireless Qi charging inserts finished in champagne brass',
      'Precision CNC milled joinery ready for rapid on-site assembly'
    ],
    featuresAr: [
      'يشمل طاولتين جانبيتين عائمتين مع سحابات هيدروليك ناعمة الإغلاق من Blum',
      'مسارات إضاءة LED مدمجة بدرجة 2700K دافئة مع مفتاح تحكم رئيسي',
      'منافذ شحن مدمجة USB-C وشاحن لاسلكي Qi بإطار نحاسي فاخر',
      'نجارة وتجميع مسبق بدقة CNC لتركيب موقعي سريع ومتقن'
    ],
    inStock: true,
    isHospitalityGrade: true,
    factoryLocationEn: 'GreenWood Factory 1 — Woodworking & Joinery',
    factoryLocationAr: 'مصنع جرين وود 1 — النجارة والأعمال الخشبية',
  },
  {
    id: 'gw-ammariyah-master-bed',
    sku: 'GW-BD-740',
    nameEn: 'The Ammariyah Master Bedroom Suite',
    nameAr: 'طقم غرفة نوم العمارية الملكية',
    category: 'bedroom',
    categoryEn: 'Hospitality & Suites',
    categoryAr: 'الأجنحة والضيافة الفندقية',
    price: 32000,
    originalPrice: 36000,
    rating: 4.9,
    reviewsCount: 15,
    badgeEn: 'Masterpiece',
    badgeAr: 'تحفة ملكية',
    shortDescEn: 'Upholstered platform king bed with extended channel-tufted velvet headboard, walnut storage base, and matching ottoman bench.',
    shortDescAr: 'سرير كينج ملكي منجد بالمخمل المضلع الفاخر مع قاعدة تخزين هيدروليكية من خشب الجوز وبوف جلوس متناسق.',
    fullDescEn: 'Designed for bespoke master suites in villas and boutique retreats. Features a sweeping 3.8m acoustic headboard with integrated brushed gold reading spotlights and pneumatic under-bed storage.',
    fullDescAr: 'صُممت لأجنحة النوم الرئيسية في الفلل الفاخرة، مع ظهر سرير عريض 3.8 م عازل للصوت مدمج به كشافات قراءة ذهبية وخزنة سرية أسفل السرير بنظام رفع هيدروليكي.',
    materialsEn: 'Italian Micro-Velvet, Natural American Walnut, Brass Lighting Fixtures',
    materialsAr: 'مخمل إيطالي ناعم، خشب جوز أمريكي، إضاءات نحاسية مدمجة',
    materialKey: 'brass',
    dimensions: { width: 380, depth: 230, height: 175, unit: 'cm' },
    leadTimeEn: '14–20 Business Days',
    leadTimeAr: '14 – 20 يوم عمل',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85'
    ],
    finishes: [
      { id: 'champagne-velvet', nameEn: 'Champagne Taupe Velvet', nameAr: 'مخمل شامبين توب', colorCode: '#C8B9A6' },
      { id: 'forest-emerald', nameEn: 'Royal Emerald Velvet', nameAr: 'مخمل زمردي ملكي', colorCode: '#0B5C3D' },
      { id: 'pearl-grey', nameEn: 'Pearl Oyster Velvet', nameAr: 'مخمل لؤلؤي رمادي', colorCode: '#DCDCDC' },
    ],
    featuresEn: [
      'German pneumatic lifting system for effortless under-bed storage access',
      'Dual swivel LED reading lights with touch dimming',
      'Matching 160cm upholstered end-of-bed bench included',
      'Anti-creak structural metal sub-frame'
    ],
    featuresAr: [
      'نظام رفع هيدروليكي ألماني لسهولة فتح واستخدام مساحة التخزين السفلية',
      'كشافا قراءة LED متحركان مع خاصية التحكم باللمس',
      'يشمل بوف جلوس متناسق بطول 160 سم عند نهاية السرير',
      'شاسيه معدني داخلي معزول تماماً ضد أي أصوات احتكاك'
    ],
    inStock: true,
    isHospitalityGrade: true,
    factoryLocationEn: 'GreenWood Factory 1 & 3 — Riyadh',
    factoryLocationAr: 'مصنع جرين وود 1 و 3 — الرياض',
  },
  {
    id: 'gw-rawdah-smart-nightstand',
    sku: 'GW-BD-725',
    nameEn: 'The Rawdah Smart Wireless Nightstand',
    nameAr: 'كمودينة الروضة الذكية بالشاحن اللاسلكي',
    category: 'bedroom',
    categoryEn: 'Hospitality & Suites',
    categoryAr: 'الأجنحة والضيافة الفندقية',
    price: 4600,
    originalPrice: 5200,
    rating: 4.8,
    reviewsCount: 39,
    badgeEn: 'Smart Tech',
    badgeAr: 'تقنية ذكية',
    shortDescEn: 'Curved solid oak nightstand with invisible marble-top wireless Qi charging and velvet-lined dual soft-close drawers.',
    shortDescAr: 'طاولة جانبية بتصميم منحنٍ من خشب البلوط الصلب مع شاحن لاسلكي مخفي تحت السطح الرخامي ودرجين مبطنين بالشمواه.',
    fullDescEn: 'Engineered for modern high-end residential bedrooms and suites. Integrates fast-charging electronics beneath a genuine Carrara marble surface without breaking the organic timber aesthetic.',
    fullDescAr: 'تجمع بين فخامة الخشب الطبيعي ورخام الكرارا الإيطالي مع تقنيات الشحن اللاسلكي السريع المدمجة بشكل غير مرئي أسفل الرخام.',
    materialsEn: 'Solid Smoked Oak, Carrara Marble, Brushed Brass Ring Base',
    materialsAr: 'خشب بلوط مدخن، رخام كرارا، حلقة قاعدة نحاسية مصقولة',
    materialKey: 'walnut',
    dimensions: { width: 55, depth: 45, height: 52, unit: 'cm' },
    leadTimeEn: '6–8 Business Days',
    leadTimeAr: '6 – 8 أيام عمل',
    images: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85'
    ],
    finishes: [
      { id: 'smoked-oak', nameEn: 'Smoked Oak & Gold Brass', nameAr: 'بلوط مدخن مع نحاس ذهبي', colorCode: '#3A2E26' },
      { id: 'natural-ash', nameEn: 'Natural White Ash', nameAr: 'خشب الدردار الطبيعي', colorCode: '#C2B69D' },
      { id: 'midnight-black', nameEn: 'Midnight Black Ash', nameAr: 'دردار أسود ملكي', colorCode: '#1A1A1A' },
    ],
    featuresEn: [
      'Fast 15W Qi wireless charger built beneath stone top',
      'Concealed Blum soft-close push-to-open drawer slides',
      'Interior drawer motion-sensor night light',
      'Solid brass machined feet with floor protectors'
    ],
    featuresAr: [
      'شاحن لاسلكي سريع 15W مدمج أسفل الرخام مباشرة',
      'سحابات هيدروليكية ألمانية من Blum تفتح باللمس',
      'إضاءة ليلية داخلية ذكية تعمل بمستشعر الحركة',
      'أرجل نحاسية صلبة مزودة بحماية للأرضيات والباركيه'
    ],
    inStock: true,
    isHospitalityGrade: true,
    factoryLocationEn: 'GreenWood Factory 1 — Riyadh',
    factoryLocationAr: 'مصنع جرين وود 1 — الرياض',
  },

  // 3. DINING & BANQUET
  {
    id: 'gw-riyadh-dining-suite',
    sku: 'GW-DN-610',
    nameEn: 'The Riyadh Luxury 8-Seater Dining Suite',
    nameAr: 'طاولة طعام الرياض الملكية لـ 8 أشخاص',
    category: 'dining',
    categoryEn: 'Dining & Banquet',
    categoryAr: 'غرف الطعام والولائم',
    price: 22400,
    originalPrice: 25800,
    rating: 5.0,
    reviewsCount: 16,
    badgeEn: 'Signature Dining',
    badgeAr: 'طعام ملكي',
    shortDescEn: 'Sublime boat-shaped solid walnut dining table featuring sculptural double-pedestal architectural bases and brass inlay borders.',
    shortDescAr: 'طاولة طعام بيضاوية انسيابية من خشب الجوز الصلب بقاعدتين نحتيتين وتطعيمات نحاسية محيطية.',
    fullDescEn: 'The centerpiece of stately dining rooms, this 8-to-10 person dining suite is crafted from hand-picked American walnut boards, unified with a heat-resistant matte ceramic-oil finish that celebrates natural grain flow.',
    fullDescAr: 'تحفة غرف الطعام الفاخرة، تتسع لـ 8 إلى 10 أشخاص ومصنوعة من ألواح خشب الجوز المنتقاة بعناية، ومحمية بطبقة زيت وسيراميك مطفية مقاومة للحرارة والأواني الساخنة.',
    materialsEn: 'Solid American Walnut, Heavy Gauge Steel Base, Brushed Gold Accents',
    materialsAr: 'خشب جوز أمريكي صلب، هيكل داخلي فولاذي، تطعيمات ذهبية مصقولة',
    materialKey: 'walnut',
    dimensions: { width: 280, depth: 115, height: 76, unit: 'cm' },
    leadTimeEn: '12–16 Business Days',
    leadTimeAr: '12 – 16 يوم عمل',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
    ],
    finishes: [
      { id: 'natural-oiled-walnut', nameEn: 'Natural Oiled Walnut', nameAr: 'جوز طبيعي معالج بالزيوت العضوية', colorCode: '#5C4033' },
      { id: 'dark-chocolate-walnut', nameEn: 'Dark Chocolate Walnut', nameAr: 'جوز شوكولاتة داكن', colorCode: '#302018' },
      { id: 'smoked-raw-oak', nameEn: 'Smoked White Oak', nameAr: 'سنديان أبيض مدخن', colorCode: '#6B5A4B' },
    ],
    featuresEn: [
      'Generous 2.8m length comfortable for 8 to 10 armchairs',
      'Chamfered 45-degree edge profile with brass shadowline',
      'Engineered multi-ply core to eliminate seasonal warping in Saudi climates',
      'Matches GreenWood executive upholstered dining chairs'
    ],
    featuresAr: [
      'طول رحب 2.8 م يتسع بأريحية لـ 8 إلى 10 كراسٍ بذراعين',
      'حواف مشطوفة بزاوية 45 درجة مع خط ظل نحاسي أنيق',
      'قلب هندسي متعدد الطبقات يمنع أي تقوس بفعل التغيرات المناخية بالمملكة',
      'تتناسق مع كراسي الطعام الفاخرة المنجدة من جرين وود'
    ],
    inStock: true,
    isHospitalityGrade: true,
    factoryLocationEn: 'GreenWood Factory 1 — Riyadh',
    factoryLocationAr: 'مصنع جرين وود 1 — الرياض',
  },
  {
    id: 'gw-tuwaiq-round-marble-table',
    sku: 'GW-DN-640',
    nameEn: 'The Tuwaiq Round Calacatta Marble Dining Table',
    nameAr: 'طاولة طعام طويق الدائرية من رخام كلاكتا الفاخر',
    category: 'dining',
    categoryEn: 'Dining & Banquet',
    categoryAr: 'غرف الطعام والولائم',
    price: 19800,
    originalPrice: 22500,
    rating: 4.9,
    reviewsCount: 21,
    badgeEn: 'Italian Marble',
    badgeAr: 'رخام إيطالي',
    shortDescEn: '180cm circular dining table with book-matched Calacatta Gold marble and fluted walnut cone base.',
    shortDescAr: 'طاولة طعام دائرية بقطر 180 سم من رخام كلاكتا جولد الإيطالي مع قاعدة مخروطية مضلعة من خشب الجوز.',
    fullDescEn: 'Facilitating intimate conversation and grand banquet hospitality, this circular table features a rotating flush-mounted marble Lazy Susan center disc and solid fluted timber column.',
    fullDescAr: 'صُممت لأفخم الجمعات العائلية والمناسبات، وتتضمن قرصاً دائرياً دواراً مدمجاً (Lazy Susan) من نفس عروق الرخام مع قاعدة أسطوانية خشبية ثقيلة تضمن ثباتاً مطلقاً.',
    materialsEn: 'Natural Calacatta Gold Marble, Solid American Walnut, Cast Iron Counterweight',
    materialsAr: 'رخام كلاكتا جولد طبيعي، خشب جوز أمريكي صلب، ثقل داخلي من الحديد الزهر',
    materialKey: 'marble',
    dimensions: { width: 180, depth: 180, height: 76, unit: 'cm' },
    leadTimeEn: '10–14 Business Days',
    leadTimeAr: '10 – 14 يوم عمل',
    images: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
    ],
    finishes: [
      { id: 'calacatta-gold', nameEn: 'Calacatta Gold & Walnut', nameAr: 'كلاكتا جولد مع جوز أمريكي', colorCode: '#F8F6F0' },
      { id: 'black-laurent', nameEn: 'Noir Saint Laurent & Oak', nameAr: 'رخام سان لوران أسود مع بلوط', colorCode: '#222222' },
    ],
    featuresEn: [
      'Comfortably accommodates 8 diners',
      'Includes flush 80cm silent-bearing marble Lazy Susan turntable',
      'Anti-stain diamond seal protection',
      'Ultra-stable anti-tip counterweighted pedestal'
    ],
    featuresAr: [
      'تتسع لـ 8 مقاعد براحة تامة وانسيابية',
      'تشمل قرصاً رخامياً دواراً 80 سم بحركة صامتة فائقة السلاسة',
      'معالجة دايموند سيل عازلة تماماً للبقع والحرارة',
      'قاعدة مخروطية موزونة بثقل لمنع أي اهتزاز أو ميلان'
    ],
    inStock: true,
    isHospitalityGrade: true,
    factoryLocationEn: 'GreenWood Factory 1 — Riyadh',
    factoryLocationAr: 'مصنع جرين وود 1 — الرياض',
  },

  // 4. ARCHITECTURAL JOINERY & EXECUTIVE OFFICES
  {
    id: 'gw-tuwaiq-boardroom-table',
    sku: 'GW-EX-990',
    nameEn: 'The Tuwaiq Executive Boardroom Table',
    nameAr: 'طاولة اجتماعات طويق التنفيذية للمقرات والشركات',
    category: 'joinery',
    categoryEn: 'Architectural Joinery',
    categoryAr: 'التجاليد والكونسول والمكاتب',
    price: 38000,
    originalPrice: 42000,
    rating: 5.0,
    reviewsCount: 14,
    badgeEn: 'Bespoke Corporate',
    badgeAr: 'تنفيذي مخصص',
    shortDescEn: 'Monolithic 4.2m book-matched American walnut conference table with concealed cable routing and brushed bronze inlays.',
    shortDescAr: 'طاولة اجتماعات بطول 4.2 م من خشب الجوز المتقابل مع مسارات كابلات مخفية وتطعيمات برونزية فاخرة.',
    fullDescEn: 'Engineered for visionary corporate headquarters and government ministries. The Tuwaiq boardroom table features matched wood grains, integrated pop-up motorized connectivity modules (HDMI, Power, Cat6), and leather cable trough management.',
    fullDescAr: 'صُممت لمقرات الشركات الكبرى والجهات الحكومية، وتتميز بتطابق تعريقات خشب الجوز الطبيعي، مع وحدات توصيل كهربائية وتقنية مدمجة تفتح بنعومة، وقنوات تنظيم كابلات مكسوة بالجلد.',
    materialsEn: 'Book-Matched Solid Walnut Veneer, Anodized Bronze Aluminum, Italian Saddle Leather',
    materialsAr: 'قشرة جوز أمريكي متطابقة هندسياً، ألومنيوم برونزي مؤكسد، جلد سادل إيطالي',
    materialKey: 'walnut',
    dimensions: { width: 420, depth: 140, height: 75, unit: 'cm' },
    leadTimeEn: '15–20 Business Days',
    leadTimeAr: '15 – 20 يوم عمل',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=85'
    ],
    finishes: [
      { id: 'royal-walnut', nameEn: 'Royal American Walnut', nameAr: 'جوز أمريكي ملكي', colorCode: '#4A3525' },
      { id: 'smoked-eucalyptus', nameEn: 'Smoked Figured Eucalyptus', nameAr: 'أوكالبتوس مدخن مموج', colorCode: '#2E221B' },
      { id: 'santos-rosewood', nameEn: 'Santos Rosewood Finish', nameAr: 'خشب الورد سانتوس', colorCode: '#3D1C16' },
    ],
    featuresEn: [
      'Seats 12–16 executive participants comfortably',
      'Custom motorized pop-up boxes with international power sockets and high-speed data',
      'Laser-cut architectural bronze center raceway',
      'Produced in compliance with Saudi Vision 2030 local procurement standards'
    ],
    featuresAr: [
      'تتسع لـ 12 إلى 16 مقعداً تنفيذياً براحة تامة',
      'وحدات توصيل ذكية آلية الصعود تدعم كافة المنافذ الدولية والشبكات',
      'شريط وسطي من البرونز المعماري المقصوص بالليزر',
      'مُصنعة بالكامل محلياً وفق معايير المحتوى المحلي لرؤية 2030'
    ],
    inStock: false,
    isHospitalityGrade: true,
    factoryLocationEn: 'GreenWood Factory 1 & 2 — Wood & Aluminum Hub',
    factoryLocationAr: 'مصنع جرين وود 1 و 2 — مركز الأخشاب والألومنيوم',
  },
  {
    id: 'gw-rawdah-fluted-credenza',
    sku: 'GW-JN-550',
    nameEn: 'The Rawdah Fluted Walnut Credenza & Media Unit',
    nameAr: 'خزانة ووحدة كونسول الروضة المضلعة الفاخرة',
    category: 'joinery',
    categoryEn: 'Architectural Joinery',
    categoryAr: 'التجاليد والكونسول والمكاتب',
    price: 13800,
    originalPrice: 15900,
    rating: 4.9,
    reviewsCount: 22,
    badgeEn: 'CNC Precision',
    badgeAr: 'دقة CNC',
    shortDescEn: 'Low-profile architectural sideboard with continuous 3D fluted walnut doors, Calacatta marble top, and brushed brass legs.',
    shortDescAr: 'وحدة كونسول منخفضة بأبواب خشبية مضلعة ثلاثية الأبعاد، وسطح رخام كلاكتا، وأرجل نحاسية مصقولة.',
    fullDescEn: 'Milled on our 5-axis CNC machines, the Rawdah credenza features seamless wrap-around fluting that conceals 4 push-to-open acoustic storage bays, integrated cable pathways, and soft-close internal cutlery and bar trays.',
    fullDescAr: 'شُكلت على ماكينات CNC خماسية المحاور المتطورة، وتتميز الخزانة بتضليع خشبي مستمر يخفي 4 أبواب تعمل باللمس، مع مسارات كابلات مدمجة وأدراج داخلية مبطنة بالشمواه.',
    materialsEn: 'CNC Milled American Walnut, Natural Calacatta Gold Marble, Brushed Brass Hardware',
    materialsAr: 'خشب جوز أمريكي مشكل بـ CNC، رخام كلاكتا جولد طبيعي، نحاس مصقول',
    materialKey: 'walnut',
    dimensions: { width: 220, depth: 50, height: 72, unit: 'cm' },
    leadTimeEn: '10–12 Business Days',
    leadTimeAr: '10 – 12 يوم عمل',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85'
    ],
    finishes: [
      { id: 'walnut-brass', nameEn: 'Natural Walnut & Champagne Brass', nameAr: 'جوز طبيعي مع نحاس شامبين', colorCode: '#5C4033' },
      { id: 'black-oak-brass', nameEn: 'Midnight Oak & Brushed Brass', nameAr: 'سنديان أسود مع نحاس أصفر', colorCode: '#1B1B1B' },
      { id: 'camel-lacquer', nameEn: 'Warm Camel Matte PU Lacquer', nameAr: 'دهان بولي يوريثان جملي مطفي', colorCode: '#C9A86A' },
    ],
    featuresEn: [
      'Precision push-to-open doors with German Blum Tip-On concealed hinges',
      'Subtle internal LED ribbon lights activated upon opening',
      'Rear ventilation slots for media components & AV receivers',
      'Hand-finished with multi-layer non-yellowing polyurethane'
    ],
    featuresAr: [
      'أبواب بنظام الفتح بالضغط مع مفصلات ألمانية مخفية من Blum',
      'إضاءة LED داخلية ذكية تعمل تلقائياً عند فتح الأبواب',
      'فتحات تهوية خلفية مخصصة للأجهزة الإلكترونية وأجهزة الصوت',
      'تشطيب يدوي بدهان بولي يوريثان مقاوم للخدش والاصفرار'
    ],
    inStock: true,
    isHospitalityGrade: true,
    factoryLocationEn: 'GreenWood Factory 1 — Riyadh',
    factoryLocationAr: 'مصنع جرين وود 1 — الرياض',
  },
  {
    id: 'gw-waha-executive-desk',
    sku: 'GW-EX-910',
    nameEn: 'The Al-Waha Presidential Executive Desk',
    nameAr: 'مكتب الواحة الرئاسي من خشب الجوز والجلد',
    category: 'joinery',
    categoryEn: 'Architectural Joinery',
    categoryAr: 'التجاليد والكونسول والمكاتب',
    price: 28500,
    originalPrice: 32000,
    rating: 5.0,
    reviewsCount: 12,
    badgeEn: 'Executive Suite',
    badgeAr: 'مكتبي رئاسي',
    shortDescEn: '2.4m cantilevered executive desk with integrated saddle-leather blotter, biometric lock drawer, and wireless device charging pad.',
    shortDescAr: 'مكتب رئاسي عائم بطول 2.4 م مع لبادة جلد سادل إيطالي مدمجة، ودرج بخزنة إلكترونية ببصمة الإصبع، وشاحن لاسلكي.',
    fullDescEn: 'Crafted for C-suite executive offices. The Al-Waha desk features a floating desktop design supported by an asymmetric solid walnut pedestal and bronze blade leg.',
    fullDescAr: 'صُمم لأصحاب المعالي والرؤساء التنفيذيين. يتميز بسطح عائم يرتكز على وحدة أدراج غير متماثلة من خشب الجوز وقاعدة برونزية منحوتة.',
    materialsEn: 'Solid American Walnut, Full-Grain Italian Leather, Brushed Bronze Aluminum',
    materialsAr: 'خشب جوز أمريكي صلب، جلد إيطالي طبيعي، ألومنيوم برونزي مصقول',
    materialKey: 'walnut',
    dimensions: { width: 240, depth: 105, height: 76, unit: 'cm' },
    leadTimeEn: '12–16 Business Days',
    leadTimeAr: '12 – 16 يوم عمل',
    images: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=85'
    ],
    finishes: [
      { id: 'walnut-cognac', nameEn: 'Walnut & Cognac Leather', nameAr: 'جوز طبيعي مع جلد كونياك', colorCode: '#5C4033' },
      { id: 'ebony-black', nameEn: 'Ebony Ash & Black Leather', nameAr: 'دردار أبنوسي مع جلد أسود', colorCode: '#1A1A1A' },
    ],
    featuresEn: [
      'Biometric fingerprint drawer lock for confidential executive documents',
      'Concealed internal wire management raceway connecting to floor boxes',
      'Built-in 3-device fast charging hub',
      'Includes matching modesty panel'
    ],
    featuresAr: [
      'درج مصفح مزود بقفل ذكي يعمل ببصمة الإصبع لحفظ المستندات السرية',
      'مسارات كابلات مخفية تمتد من سطح المكتب إلى منافذ الأرضية مباشرة',
      'محطة شحن مدمجة تدعم شحن 3 أجهزة ذكية في وقت واحد',
      'يشمل ساتراً أمامياً خشبياً مضلعاً متناسقاً'
    ],
    inStock: true,
    isHospitalityGrade: true,
    factoryLocationEn: 'GreenWood Factory 1 & 2 — Riyadh',
    factoryLocationAr: 'مصنع جرين وود 1 و 2 — الرياض',
  },
  {
    id: 'gw-acoustic-geometric-panels',
    sku: 'GW-CL-100',
    nameEn: 'Architectural Geometric Acoustic Wood Wall Panels',
    nameAr: 'تجاليد جدارية معمارية ممتصة للصوت ثلاثية الأبعاد',
    category: 'joinery',
    categoryEn: 'Architectural Joinery',
    categoryAr: 'التجاليد والكونسول والمكاتب',
    price: 680,
    isCustomQuote: true,
    rating: 4.9,
    reviewsCount: 31,
    badgeEn: 'Bespoke / Sqm',
    badgeAr: 'حسب المتر المربع',
    shortDescEn: 'Modular 3D micro-perforated acoustic timber cladding panels engineered for auditoriums, hotel lobbies, and executive suites.',
    shortDescAr: 'ألواح تجليد جدارية خشبية ثلاثية الأبعاد ماصة للصدى مصممة للقاعات الكبرى وردهات الفنادق والمجالس الفخمة.',
    fullDescEn: 'Transform plain walls into sculptural acoustic monuments. Fabricated from natural wood veneers backed with recycled high-density acoustic PET felt, absorbing unwanted reverberation while providing warm architectural luxury.',
    fullDescAr: 'تحول الجدران العادية إلى جداريات معمارية فخمة تمنع ارتداد الصوت والصدى. تُصنع من قشور الأخشاب الطبيعية مع طبقة خلفية عازلة للصوت تمنح المكان هدوءاً ودفئاً استثنائياً.',
    materialsEn: 'Natural Crown Walnut Veneer, Class-A Fire Rated MDF, Recycled Acoustic Felt',
    materialsAr: 'قشرة جوز طبيعي، خشب MDF معالج ضد الحريق تصنيف A، لباد عازل للصوت',
    materialKey: 'walnut',
    dimensions: { width: 60, depth: 3, height: 280, unit: 'cm' },
    leadTimeEn: '7–14 Business Days',
    leadTimeAr: '7 – 14 يوم عمل',
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85'
    ],
    finishes: [
      { id: 'walnut-black-felt', nameEn: 'American Walnut on Black Felt', nameAr: 'جوز أمريكي على لباد أسود', colorCode: '#5C4033' },
      { id: 'oak-grey-felt', nameEn: 'Natural Oak on Charcoal Felt', nameAr: 'سنديان طبيعي على لباد رمادي', colorCode: '#B8976C' },
      { id: 'teak-black-felt', nameEn: 'Burmese Teak on Black Felt', nameAr: 'خشب التيك على لباد أسود', colorCode: '#7F461B' },
    ],
    featuresEn: [
      'NRC (Noise Reduction Coefficient) rating of 0.85 for pristine acoustic comfort',
      'Easy interlocking tongue-and-groove track installation system',
      'Available in custom curved configurations for round columns and arches',
      'Tested and certified for commercial fire safety'
    ],
    featuresAr: [
      'معامل امتصاص صوتي (NRC) يصل إلى 0.85 لبيئة هادئة ومريحة',
      'نظام تعشيق وتثبيت مخفي سريع التركيب على مجاري ألومنيوم',
      'إمكانية تصنيع قطاعات منحنية للأعمدة والجدران الدائرية',
      'مطابقة لاشتراطات الدفاع المدني ومقاومة انتشار اللهب'
    ],
    inStock: true,
    isHospitalityGrade: true,
    factoryLocationEn: 'GreenWood Factory 1 & 2 — Cladding Facility',
    factoryLocationAr: 'مصنع جرين وود 1 و 2 — منشأة التجاليد',
  },

  // 5. DECOR, SCREENS & PARTITIONS
  {
    id: 'gw-hegra-brass-partition',
    sku: 'GW-DC-210',
    nameEn: 'The Hegra Architectural Brass & Oak Room Divider',
    nameAr: 'فاصل حِجر المعماري من النحاس وخشب البلوط',
    category: 'decor',
    categoryEn: 'Decor & Partitions',
    categoryAr: 'القواطع والإكسسوارات الفاخرة',
    price: 11500,
    originalPrice: 13200,
    rating: 4.9,
    reviewsCount: 23,
    badgeEn: 'Artisanal Screen',
    badgeAr: 'ساتر معماري',
    shortDescEn: 'Floor-to-ceiling 3-panel acoustic partition screen with laser-cut geometric brass lattice and rotating solid oak louvers.',
    shortDescAr: 'ساتر قاطع معماري ثلاثي الألواح مع شبكة نحاسية هندسية مقصوصة بالليزر وشرائح خشب بلوط قابلة للتدوير.',
    fullDescEn: 'Crafted to create elegant privacy zones in open-plan luxury villas, executive VIP suites, and hotel lounges. Combines warm satin brass latticework with adjustable solid wood blades that filter natural sunlight beautifully.',
    fullDescAr: 'صُمم لتوفير خصوصية راقية وتقسيم المساحات في الفلل الفاخرة والأجنحة الفندقية. يجمع بين النحاس المصقول والشرائح الخشبية المتحركة للتحكم بدرجة الإضاءة والخصوصية.',
    materialsEn: 'Brushed Champagne Brass, Solid White Oak, Heavy Duty Pivot Hinges',
    materialsAr: 'نحاس شامبين مصقول، خشب سنديان أبيض صلب، مفصلات محورية ثقيلة',
    materialKey: 'brass',
    dimensions: { width: 180, depth: 15, height: 240, unit: 'cm' },
    leadTimeEn: '8–12 Business Days',
    leadTimeAr: '8 – 12 يوم عمل',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85'
    ],
    finishes: [
      { id: 'champagne-brass-oak', nameEn: 'Champagne Brass & Smoked Oak', nameAr: 'نحاس شامبين وبلوط مدخن', colorCode: '#C9A86A' },
      { id: 'bronze-walnut', nameEn: 'Antique Bronze & American Walnut', nameAr: 'برونز عتيق وجوز أمريكي', colorCode: '#4A3525' },
    ],
    featuresEn: [
      '360-degree rotating timber louvers for adjustable privacy and light filtration',
      'Heavy-duty weighted base requiring zero floor drilling',
      'Hand-patinated protective lacquer finish',
      'Modular connecting brackets to extend width seamlessly'
    ],
    featuresAr: [
      'شرائح خشبية تدور بزاوية 360 درجة للتحكم الكامل بمستوى الخصوصية والضوء',
      'قاعدة ثقيلة متوازنة لا تحتاج إلى أي تخريم أو تثبيت بالأرضيات',
      'معالجة بطبقة ورنيش واقية تحافظ على بريق النحاس للأبد',
      'وصلات موديولية مخفية تتيح وصل عدة قواطع معاً بانسيابية'
    ],
    inStock: true,
    isHospitalityGrade: true,
    factoryLocationEn: 'GreenWood Factory 2 — Metal & Architectural Hub',
    factoryLocationAr: 'مصنع جرين وود 2 — مركز المعادن والأعمال المعمارية',
  },
  {
    id: 'gw-tuwaiq-bronze-mirror',
    sku: 'GW-DC-230',
    nameEn: 'The Tuwaiq Sculptural Bronze Floor Mirror',
    nameAr: 'مرآة طويق الجدارية النحتية بإطار برونزي مقوس',
    category: 'decor',
    categoryEn: 'Decor & Partitions',
    categoryAr: 'القواطع والإكسسوارات الفاخرة',
    price: 7400,
    originalPrice: 8500,
    rating: 4.9,
    reviewsCount: 19,
    badgeEn: 'Art Déco',
    badgeAr: 'تصميم نحتي',
    shortDescEn: 'Full-length 210cm leaning architectural mirror framed in heavy solid cast brass with soft rear halo LED glow.',
    shortDescAr: 'مرآة أرضية جدارية بطول 210 سم بإطار نحاسي مصبوب ثقيل مع إضاءة هالة LED دافئة محيطية خلفية.',
    fullDescEn: 'An imposing statement piece for grand entry foyers, luxury walk-in closets, and presidential suites. Features ultra-clear Belgian bronze-tinted glass and concealed structural wall safety anchors.',
    fullDescAr: 'قطعة ديكورية بارزة لبهو المداخل وغرف الملابس والأجنحة الملكية. مصنوعة من زجاج بلجيكي فائق النقاوة مع إضاءة خلفية دافئة تمنح المكان اتساعاً وفخامة.',
    materialsEn: 'Cast Solid Brass, Belgian Ultra-Clear Glass, Dimmable 2700K LED Ribbon',
    materialsAr: 'نحاس صلب مصبوب، زجاج بلجيكي عالي النقاوة، شريط إضاءة LED 2700K',
    materialKey: 'brass',
    dimensions: { width: 100, depth: 8, height: 210, unit: 'cm' },
    leadTimeEn: '6–8 Business Days',
    leadTimeAr: '6 – 8 أيام عمل',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85'
    ],
    finishes: [
      { id: 'satin-brass', nameEn: 'Satin Brushed Brass', nameAr: 'نحاس مطفي مصقول', colorCode: '#DFBA73' },
      { id: 'antique-bronze', nameEn: 'Aged Monumental Bronze', nameAr: 'برونز عتيق داكن', colorCode: '#4A3B32' },
    ],
    featuresEn: [
      'Shatter-proof safety film backing on glass',
      'Touchless wave sensor for backlight on/off and dimming control',
      'Includes seismic safety anchoring kit for drywall and concrete',
      'Hand-cast brass corner brackets'
    ],
    featuresAr: [
      'طبقة حماية خلفية ضد الكسر والتناثر للأمان الكامل',
      'مستشعر حركة باليد بدون لمس لتشغيل الإضاءة الخلفية والتحكم في سطوعها',
      'يشمل طقم تثبيت أمان جداري معتمد للجبس والخرسانة',
      'زوايا نحاسية مصبوبة ومصقولة يدوياً'
    ],
    inStock: true,
    isHospitalityGrade: true,
    factoryLocationEn: 'GreenWood Factory 2 — Riyadh',
    factoryLocationAr: 'مصنع جرين وود 2 — الرياض',
  },
];
