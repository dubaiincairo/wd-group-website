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
    badgeAr: 'الأكثر طلبًا',
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
    fullDescEn: 'A masterpiece of material contrast celebrating geological texture and master woodwork. The honed un-filled travertine tabletop features organic natural veins, sealed with an invisible hydrophobic coat for everyday hospitality endurance.',
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
      { id: 'marquina-marble', nameEn: 'Nero Marquina Black', nameAr: 'رخام ماركينا أسود', colorCode: '#1A1A1A' },
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
    id: 'gw-tuwaiq-boardroom-table',
    sku: 'GW-EX-990',
    nameEn: 'The Tuwaiq Executive Boardroom Table',
    nameAr: 'طاولة اجتماعات طويق التنفيذية للمقرات والشركات',
    category: 'dining',
    categoryEn: 'Executive & Dining',
    categoryAr: 'طاولات الطعام والمكاتب التنفيذية',
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
    fullDescEn: 'Inspired by the monumental sandstone formations of Al-Ula, this armchair delivers an unmistakable sculptural presence. The supple full-grain aniline leather develops a rich, distinctive patina over decades of use.',
    fullDescAr: 'مستوحى من التكوينات الصخرية الخلابة في العلا، يمنح هذا الكرسي حضوراً نحتياً استثنائياً. يكتسب الجلد الإيطالي الطبيعي الفاخر رونقاً وأصالة متزايدة مع مرور السنين.',
    materialsEn: 'Full-Grain Italian Aniline Leather, Solid White Oak, Feather Down Cushioning',
    materialsAr: 'جلد أنيلين إيطالي طبيعي، خشب سنديان أبيض صلب، حشوة ريش طبيعي وإسفنج',
    materialKey: 'leather',
    dimensions: { width: 92, depth: 90, height: 82, unit: 'cm' },
    leadTimeEn: '8–12 Business Days',
    leadTimeAr: '8 – 12 يوم عمل',
    images: [
      'https://images.unsplash.com/photo-1580481077195-73ab013f3367?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85'
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
    id: 'gw-rawdah-fluted-credenza',
    sku: 'GW-JN-550',
    nameEn: 'The Rawdah Fluted Walnut Credenza & Media Unit',
    nameAr: 'خزانة ووحدة كونسول الروضة المضلعة الفاخرة',
    category: 'joinery',
    categoryEn: 'Joinery & Cladding',
    categoryAr: 'الخزائن والتجاليد المعمارية',
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
    id: 'gw-riyadh-dining-suite',
    sku: 'GW-DN-610',
    nameEn: 'The Riyadh Luxury 8-Seater Dining Suite',
    nameAr: 'طاولة طعام الرياض الملكية لـ 8 أشخاص',
    category: 'dining',
    categoryEn: 'Executive & Dining',
    categoryAr: 'طاولات الطعام والمكاتب التنفيذية',
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
      'قلب خندسي متعدد الطبقات يمنع أي تقوس بفعل التغيرات المناخية بالمملكة',
      'تتناسق مع كراسي الطعام الفاخرة المنجدة من جرين وود'
    ],
    inStock: true,
    isHospitalityGrade: true,
    factoryLocationEn: 'GreenWood Factory 1 — Riyadh',
    factoryLocationAr: 'مصنع جرين وود 1 — الرياض',
  },
  {
    id: 'gw-acoustic-geometric-panels',
    sku: 'GW-CL-100',
    nameEn: 'Architectural Geometric Acoustic Wood Wall Panels',
    nameAr: 'تجاليد جدارية معمارية ممتصة للصوت ثلاثية الأبعاد',
    category: 'joinery',
    categoryEn: 'Joinery & Cladding',
    categoryAr: 'الخزائن والتجاليد المعمارية',
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
    factoryLocationEn: 'GreenWood Factory 1 — Riyadh & Najran',
    factoryLocationAr: 'مصنع جرين وود 1 — الرياض ونجران',
  },
  {
    id: 'gw-oasis-brass-chandelier',
    sku: 'GW-LT-204',
    nameEn: 'The Oasis Brushed Brass Architectural Pendant',
    nameAr: 'ثريا الواحة المعمارية من النحاس المصقول',
    category: 'decor',
    categoryEn: 'Lighting & Metal Décor',
    categoryAr: 'الإضاءة والديكورات المعدنية',
    price: 11200,
    originalPrice: 13000,
    rating: 4.8,
    reviewsCount: 18,
    badgeEn: 'Hand-Finished Brass',
    badgeAr: 'نحاس مشغول يدوياً',
    shortDescEn: 'Suspended architectural brass fixture with hand-blown fluted amber glass diffusers and integrated smart dimming.',
    shortDescAr: 'وحدة إضاءة معمارية معلقة من النحاس المصقول مع ناشرات زجاجية مضلعة بلون العنبر وإضاءة ذكية خافتة.',
    fullDescEn: 'Fabricated in our dedicated architectural metal workshop (Factory 2), each piece is hand-spun from solid brass, electroplated, and clear-sealed to resist oxidation in desert environments.',
    fullDescAr: 'صُنعت في مصنع الألومنيوم والمعادن المعمارية (مصنع 2)، حيث تُشكل كل قطعة يدوياً من سبائك النحاس المصقول والمحمي بطبقة مانعة للأكسدة لمقاومة العوامل الجوية.',
    materialsEn: 'Solid Brushed Brass, Hand-Blown Murano-Style Fluted Glass, Dimmable LED',
    materialsAr: 'نحاس أصفر مصقول، زجاج مضلع منفوخ يدوياً، إضاءة LED قابلة للخفت',
    materialKey: 'brass',
    dimensions: { width: 120, depth: 40, height: 85, unit: 'cm' },
    leadTimeEn: '8–12 Business Days',
    leadTimeAr: '8 – 12 يوم عمل',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85'
    ],
    finishes: [
      { id: 'brushed-satin-brass', nameEn: 'Brushed Satin Gold Brass', nameAr: 'نحاس ذهبي حريري مصقول', colorCode: '#C9A86A' },
      { id: 'antique-bronze', nameEn: 'Antique Patina Bronze', nameAr: 'برونز معتق أثري', colorCode: '#5C442A' },
      { id: 'matte-black-brass', nameEn: 'Matte Obsidian Black & Brass', nameAr: 'أسود مطفي مع حواف نحاسية', colorCode: '#1A1A1A' },
    ],
    featuresEn: [
      'Compatible with DALI, Lutron, and KNX smart home / hotel automation systems',
      'Warm 2200K–3000K tunable circadian white LED light engine',
      'Reinforced aircraft-grade stainless steel suspension cables',
      'Designed and engineered locally in Saudi Arabia'
    ],
    featuresAr: [
      'متوافقة مع أنظمة المنازل الذكية والفنادق (DALI و Lutron و KNX)',
      'إضاءة دافئة ذكية متغيرة بين 2200K و 3000K لمحاكاة الإيقاع الحيوي',
      'كابلات تعليق فولاذية غير مرئية عالية التحمل',
      'تصميم وهندسة وطنية سعودية 100%'
    ],
    inStock: true,
    isHospitalityGrade: true,
    factoryLocationEn: 'GreenWood Factory 2 — Metal & Aluminum Works',
    factoryLocationAr: 'مصنع جرين وود 2 — مصنع المعادن والألومنيوم',
  },
  {
    id: 'gw-king-road-lounge-sofa',
    sku: 'GW-LV-815',
    nameEn: 'The King Road Executive Lounge Sofa',
    nameAr: 'أريكة صالون طريق الملك التنفيذية',
    category: 'living',
    categoryEn: 'Living & Lounge',
    categoryAr: 'الصالونات وغرف المعيشة',
    price: 16500,
    originalPrice: 18900,
    rating: 4.9,
    reviewsCount: 25,
    badgeEn: 'Luxury Velvet',
    badgeAr: 'مخمل فاخر',
    shortDescEn: 'Deep-seated tuxedo sofa enveloped in jewel-tone emerald Italian velvet with channel tufting and solid brass trim.',
    shortDescAr: 'أريكة توكسيدو عميقة الجلسة مكسوة بالمخمل الإيطالي الزمردي الفاخر مع تضليع طولي وقاعدة نحاسية صلبة.',
    fullDescEn: 'Combining classic proportions with contemporary clean lines, this 3-seater sofa offers supportive ergonomic depth and cloud-like softness, making it a focal point for private offices and grand salons.',
    fullDescAr: 'تجمع بين الأبعاد الكلاسيكية والخطوط العصرية، وتوفر جلسة عميقة مدعمة بنعومة فائقة، لتكون القطعة المحورية في المكاتب التنفيذية والصالونات الفخمة.',
    materialsEn: 'Italian Cotton Velvet, Solid Ashwood Core, Brushed Brass Trim',
    materialsAr: 'مخمل قطني إيطالي فاخر، هيكل خشب رماد صلب، إطار نحاسي مصقول',
    materialKey: 'boucle',
    dimensions: { width: 240, depth: 100, height: 75, unit: 'cm' },
    leadTimeEn: '10–14 Business Days',
    leadTimeAr: '10 – 14 يوم عمل',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85'
    ],
    finishes: [
      { id: 'emerald-velvet', nameEn: 'Imperial Emerald Green', nameAr: 'أخضر زمردي إمبراطوري', colorCode: '#0B5C3D' },
      { id: 'royal-navy-velvet', nameEn: 'SwissBlue Oceanic Navy', nameAr: 'كحلي سويس بلو ملكي', colorCode: '#1A476A' },
      { id: 'sand-taupe-velvet', nameEn: 'Najd Desert Taupe', nameAr: 'بيج رمادي نجد', colorCode: '#A39382' },
    ],
    featuresEn: [
      'High rub-count velvet exceeding 100,000 Martindale cycles',
      'Double-dowelled corner-blocked timber joinery',
      'Custom width sizing available on request for project orders',
      'Handcrafted at GreenWood Upholstery Facility'
    ],
    featuresAr: [
      'مخمل فائق المتانة يتحمل أكثر من 100,000 دورة احتكاك فندقية',
      'وصلات خشبية معشقة ومدعمة في الزوايا لتحمل أقصى درجات الاستخدام',
      'إمكانية تفصيل مقاسات خاصة بالطلب لمشاريع الضيافة',
      'صُنع يدوي بمصنع جرين وود للتنجيد'
    ],
    inStock: true,
    isHospitalityGrade: true,
    factoryLocationEn: 'GreenWood Factory 3 — Riyadh',
    factoryLocationAr: 'مصنع جرين وود 3 — الرياض',
  },
  {
    id: 'gw-swissblue-nightstand',
    sku: 'GW-BD-710',
    nameEn: 'SwissBlue Signature Hotel Nightstand with Qi Charger',
    nameAr: 'طاولة سرير فندقية سويس بلو مع شاحن لاسلكي مدمج',
    category: 'bedroom',
    categoryEn: 'Hospitality & Suites',
    categoryAr: 'الأجنحة والضيافة الفندقية',
    price: 4800,
    originalPrice: 5500,
    rating: 4.9,
    reviewsCount: 38,
    badgeEn: 'Smart Hotel',
    badgeAr: 'ذكي ومدمج',
    shortDescEn: 'Wall-mounted or freestanding smoked oak bedside unit featuring integrated concealed Qi wireless charging and soft ambient nightlight.',
    shortDescAr: 'طاولة سرير جانبية من خشب السنديان المدخن مع شاحن لاسلكي Qi مدمج تحت الخشب وإضاءة ليلية خافتة.',
    fullDescEn: 'Designed to elevate guest convenience in boutique and 5-star hotels. Phone charges effortlessly through the natural wood top with zero visible wires or cluttered plugs.',
    fullDescAr: 'صُممت لتعزيز راحة النزيل في الفنادق الفاخرة؛ حيث يتم شحن الهواتف الذكية بوضعها مباشرة على سطح الخشب الطبيعي بدون أي أسلاك ظاهرة.',
    materialsEn: 'Solid Smoked Oak, Brushed Brass Trim, Fast-Charge Qi Electronics',
    materialsAr: 'خشب سنديان مدخن، حواف نحاسية، شاحن لاسلكي سريع مدمج',
    materialKey: 'walnut',
    dimensions: { width: 55, depth: 42, height: 48, unit: 'cm' },
    leadTimeEn: '5–8 Business Days',
    leadTimeAr: '5 – 8 أيام عمل',
    images: [
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85'
    ],
    finishes: [
      { id: 'smoked-oak-brass', nameEn: 'Smoked Oak with Brass Inlay', nameAr: 'سنديان مدخن مع نحاس', colorCode: '#3A2E26' },
      { id: 'natural-walnut-champagne', nameEn: 'Walnut with Champagne Brass', nameAr: 'جوز طبيعي مع نحاس شامبين', colorCode: '#5C4033' },
      { id: 'bleached-oak-chrome', nameEn: 'Nordic Bleached Oak & Chrome', nameAr: 'سنديان فاتح مع كروم', colorCode: '#D2C3B2' },
    ],
    featuresEn: [
      'Invisible 15W Fast Qi wireless charger built under the wood veneer',
      'Motion-activated subtle downward LED floor illuminator for nighttime convenience',
      'Felt-lined silent push drawer with integrated USB-C output',
      'Built in quantity for SwissBlue hospitality properties'
    ],
    featuresAr: [
      'شاحن لاسلكي سريع 15 واط مدمج تماماً ومخفي أسفل قشرة الخشب',
      'إضاءة أرضية خافتة تعمل بحساس الحركة ليلاً لراحة النزيل',
      'درج مبطن باللباد الصامت مع مخرج USB-C داخلي',
      'مُنتجة بكميات معتمدة لسلاسل فنادق سويس بلو'
    ],
    inStock: true,
    isHospitalityGrade: true,
    factoryLocationEn: 'GreenWood Factory 1 — Riyadh',
    factoryLocationAr: 'مصنع جرين وود 1 — الرياض',
  },
  {
    id: 'gw-hegra-metal-divider',
    sku: 'GW-DC-902',
    nameEn: 'The Hegra Architectural Metal Room Divider Screen',
    nameAr: 'قاطع مساحات الحجر المعماري من الألومنيوم والنحاس',
    category: 'decor',
    categoryEn: 'Lighting & Metal Décor',
    categoryAr: 'الإضاءة والديكورات المعدنية',
    price: 7900,
    originalPrice: 8900,
    rating: 5.0,
    reviewsCount: 11,
    badgeEn: 'Laser CNC Screen',
    badgeAr: 'قص ليزر دقيق',
    shortDescEn: 'Freestanding 3-panel geometric metal partition screen featuring Islamic architectural motifs in brushed champagne gold.',
    shortDescAr: 'قاطع مساحات ثلاثي الطيات بنقوش هندسية إسلامية معمارية مقصوصة بالليزر بلون الذهب الشامبين المصقول.',
    fullDescEn: 'Engineered in Factory 2, this sculptural privacy screen divides grand lobbies, VIP lounges, and dining suites with elegance, allowing soft filtered light and air passage while preserving intimacy.',
    fullDescAr: 'صُنع في مصنع 2 للألومنيوم والمعادن، ويوفر هذا القاطع فصلاً أنيقاً للمساحات في ردهات الفنادق وصالات كبار الشخصيات مع السماح بمرور الضوء الخافت بانسيابية.',
    materialsEn: 'Aircraft-Grade Architectural Aluminum, Solid Brass Pivot Hinges, Brushed Champagne PVD',
    materialsAr: 'ألومنيوم معماري عالي المتانة، مفصلات نحاسية صلبة، طلاء PVD ذهبي شامبين',
    materialKey: 'brass',
    dimensions: { width: 180, depth: 4, height: 210, unit: 'cm' },
    leadTimeEn: '7–10 Business Days',
    leadTimeAr: '7 – 10 أيام عمل',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85'
    ],
    finishes: [
      { id: 'champagne-pvd-gold', nameEn: 'Brushed Champagne PVD Gold', nameAr: 'ذهب شامبين PVD مصقول', colorCode: '#C9A86A' },
      { id: 'matte-anthracite', nameEn: 'Matte Anthracite Metallic', nameAr: 'رمادي أنثراسيت معدني مطفي', colorCode: '#2B2E36' },
      { id: 'rose-bronze', nameEn: 'Warm Desert Rose Bronze', nameAr: 'برونز وردي صحراوي', colorCode: '#8A5A44' },
    ],
    featuresEn: [
      'Heavy-duty precision laser cutting with zero burrs or rough edges',
      '360-degree bi-directional solid brass pivot hinges',
      'Floor-weighted stabilizing base with non-marking rubber pads',
      'Custom geometric motifs available for hotel brand identities'
    ],
    featuresAr: [
      'قص ليزر فائق الدقة بدون أي حواف حادة أو تشوهات',
      'مفصلات نحاسية دوارة 360 درجة لمرونة كاملة في التشكيل والطي',
      'قواعد موزونة مانعة للانزلاق تحمي كافة أنواع الأرضيات والرخام',
      'إمكانية تفصيل نقوش وشعارات خاصة للفنادق والمشاريع'
    ],
    inStock: true,
    isHospitalityGrade: true,
    factoryLocationEn: 'GreenWood Factory 2 — Metal & Aluminum',
    factoryLocationAr: 'مصنع جرين وود 2 — المعادن والألومنيوم',
  }
];
