export const companyInfo = {
  name: "Link BD",
  fullName: "Link BD Internet Service Provider",
  slogan: "Connect to The World",
  owner: "Md. Hasan Mahmud",
  ownerName: "Md. Hasan Mahmud",
  ownerTitle: "Owner, Link BD / Vison Broadband",
  ownerQuote: "আমরা গ্রাহকদের নিরবচ্ছিন্ন ও ঝামেলামুক্ত ইন্টারনেট সেবা প্রদানে অঙ্গীকারবদ্ধ। সঠিক গতি এবং নির্ভরযোগ্য ২৪/৭ সাপোর্ট আমাদের মূল লক্ষ্য।",
  ownerPhoto: "/assets/owner-info.png",
  ownerPhone: "+8801995-648616",
  ownerEmail: "linkbd86@gmail.com",
  hotline1: "+8801995-648616",
  hotline2: "+8801897-785024",
  whatsapp: "+8801995648616",
  email1: "linkbd86@gmail.com",
  email2: "mdhasanm3@gmail.com",
  website: "www.linkbd.net",
  billingPortalUrl: "https://client.linkbd.net/pay.php?c=1255",
  billingHelpline: "01995648616",
  wazeLink: "https://www.waze.com/live-map/directions/bd/dhaka-division/dhaka/uttara-house-building?to=place.ChIJyQYztTvEVTcRKxgFKC2Dno8",
  offices: [
    {
      id: "head-office",
      type: "Head Office",
      name: "Link BD - Head Office",
      city: "উত্তরা, ঢাকা",
      cityEn: "Dhaka",
      address: "Sarmin Market, 4th floor 27/4, Road No.13, Uttara House Building, Dhaka 1230 Bangladesh",
      phone: "+8801995-648616",
      supportNumber: "+8801897-785024",
      email: "linkbd86@gmail.com",
      website: "www.linkbd.net",
      wazeLink: "https://www.waze.com/live-map/directions/bd/dhaka-division/dhaka/uttara-house-building?to=place.ChIJyQYztTvEVTcRKxgFKC2Dno8",
      isHead: true
    },
    {
      id: "branch-office",
      type: "Branch Office",
      name: "Link BD - Branch Office",
      city: "কুষ্টিয়া সদর",
      cityEn: "Kushtia",
      address: "Rohan Market, (Gr Floor) Kushtia city bypass road, Kushtia Sadar, Bangladesh.",
      phone: "01731326832",
      supportNumber: "+8801897-785024",
      email: "linkbd86@gmail.com",
      website: "www.linkbd.net",
      isHead: false
    },
    {
      id: "owner-office",
      type: "Regional Office",
      name: "Link BD - Faridpur Office",
      city: "মধুখালী, ফরিদপুর",
      cityEn: "Faridpur",
      address: "M.S Mansion, 2nd floor, Madhukhali Rail Gate, Madhukhali, Faridpur",
      phone: "+88 01877282171, 01995648616",
      supportNumber: "+8801897-785024",
      email: "mdhasanm3@gmail.com",
      website: "www.linkbd.net",
      isHead: false
    },
    {
      id: "singapore-office",
      type: "Singapore Office",
      name: "Link BD - Singapore Office",
      city: "সিঙ্গাপুর",
      cityEn: "Singapore",
      address: "1 Raffles Place, #19-20, One Raffles Place Tower 2, Singapore 048616",
      phone: "+8801995-648616",
      supportNumber: "+8801897-785024",
      email: "linkbd86@gmail.com",
      website: "www.linkbd.net",
      isHead: false
    }
  ]
};

export const packages = [
  {
    id: "silver-plus",
    name: "Silver+",
    speed: 50,
    speedUnit: "Mbps",
    price: 890,
    currency: "৳",
    badge: "Popular",
    category: "home",
    featured: false,
    accentColor: "from-blue-600 to-cyan-500",
    isActive: true,
    sortOrder: 1,
    features: [
      "High speed BDIX and CDN connectivity",
      "4K Youtube and Facebook Stream",
      "Optical Fiber Connection",
      "IPv6 Public IP Only",
      "24/7 Phone and Online Support",
      "1:8 Contention Ratio"
    ]
  },
  {
    id: "gold-plus",
    name: "Gold+",
    speed: 80,
    speedUnit: "Mbps",
    price: 1050,
    currency: "৳",
    badge: "Hot",
    category: "home",
    featured: false,
    accentColor: "from-amber-500 to-orange-500",
    isActive: true,
    sortOrder: 2,
    features: [
      "High speed BDIX and CDN connectivity",
      "4K Youtube and Facebook Stream",
      "Optical Fiber Connection",
      "IPv6 Public IP Only",
      "24/7 Phone and Online Support",
      "1:8 Contention Ratio"
    ]
  },
  {
    id: "platinum-plus",
    name: "Platinum+",
    speed: 100,
    speedUnit: "Mbps",
    price: 1260,
    currency: "৳",
    badge: "Best Value",
    category: "home",
    featured: true,
    accentColor: "from-indigo-600 to-purple-600",
    isActive: true,
    sortOrder: 3,
    features: [
      "High speed BDIX and CDN connectivity",
      "4K Youtube and Facebook Stream",
      "Optical Fiber Connection",
      "IPv6 Public IP Only",
      "24/7 Phone and Online Support",
      "1:8 Contention Ratio"
    ]
  },
  {
    id: "diamond-plus",
    name: "Diamond+",
    speed: 150,
    speedUnit: "Mbps",
    price: 1575,
    currency: "৳",
    badge: "Ultra",
    category: "home",
    featured: false,
    accentColor: "from-blue-700 to-indigo-800",
    isActive: true,
    sortOrder: 4,
    features: [
      "High speed BDIX and CDN connectivity",
      "4K Youtube and Facebook Stream",
      "Optical Fiber Connection",
      "IPv6 Public IP Only",
      "24/7 Phone and Online Support",
      "1:8 Contention Ratio"
    ]
  },
  {
    id: "sapphire-plus",
    name: "Sapphire+",
    speed: 200,
    speedUnit: "Mbps",
    price: 2100,
    currency: "৳",
    badge: "Power",
    category: "pro",
    featured: false,
    accentColor: "from-purple-600 to-pink-600",
    isActive: true,
    sortOrder: 5,
    features: [
      "Ultra High Speed BDIX & CDN (200 Mbps)",
      "Dedicated 4K Streaming & Bufferless",
      "Pure Optical Fiber Connection",
      "IPv6 Public IP Included",
      "Priority 24/7 Phone & Field Support",
      "1:8 Low Contention Ratio"
    ]
  },
  {
    id: "star-plus",
    name: "Star+",
    speed: 250,
    speedUnit: "Mbps",
    price: 3150,
    currency: "৳",
    badge: "Gamer Choice",
    category: "pro",
    featured: false,
    accentColor: "from-blue-600 to-violet-700",
    isActive: true,
    sortOrder: 6,
    features: [
      "250 Mbps Ultra Low-Latency Gaming Fiber",
      "High-speed BDIX, Steam, Discord CDN",
      "Zero Packet Loss Gaming Path",
      "IPv6 Public IP Included",
      "Dedicated VIP Customer Care",
      "1:8 Contention Ratio"
    ]
  },
  {
    id: "sky-plus",
    name: "Sky+",
    speed: 300,
    speedUnit: "Mbps",
    price: 4200,
    currency: "৳",
    badge: "Enterprise Grade",
    category: "pro",
    featured: false,
    accentColor: "from-yellow-600 to-amber-700",
    isActive: true,
    sortOrder: 7,
    features: [
      "Maximum 300 Mbps Super-Fast Fiber",
      "Unlimited High-Speed Multi-Device Stream",
      "Enterprise Grade Optical Backbone",
      "Public Static IP Feasible",
      "Round-the-Clock Priority SLA Support",
      "1:8 Lowest Contention Ratio"
    ]
  }
];

export const coverageAreas = [
  {
    hubName: "উত্তরা ঢাকা হাব (হেড অফিস)",
    district: "Dhaka",
    division: "Dhaka",
    hubTitle: "উত্তরা হাউস বিল্ডিং, ঢাকা ১২৩০",
    address: "Sarmin Market, 4th floor 27/4, Road No.13, Uttara House Building, Dhaka 1230 Bangladesh",
    phone: "+8801995-648616",
    supportNumber: "+8801897-785024",
    email: "linkbd86@gmail.com",
    wazeLink: "https://www.waze.com/live-map/directions/bd/dhaka-division/dhaka/uttara-house-building?to=place.ChIJyQYztTvEVTcRKxgFKC2Dno8",
    status: "সক্রিয় ফাইবার হাব",
    badge: "Head Office Hub",
    areas: ["উত্তরা হাউস বিল্ডিং (সারমিন মার্কেট)", "রোড নং ১৩", "সেক্টর জোন", "ঢাকা ১২৩০"]
  },
  {
    hubName: "কুষ্টিয়া সদর হাব (শাখা অফিস)",
    district: "Kushtia",
    division: "Khulna",
    hubTitle: "কুষ্টিয়া সদর, কুষ্টিয়া",
    address: "Rohan Market, (Gr Floor) Kushtia city bypass road, Kushtia Sadar, Bangladesh.",
    phone: "01731326832",
    supportNumber: "+8801897-785024",
    email: "linkbd86@gmail.com",
    status: "সক্রিয় ফাইবার হাব",
    badge: "Branch Office Hub",
    areas: ["কুষ্টিয়া সিটি বাইপাস রোড (রোহান মার্কেট)", "কুষ্টিয়া সদর", "কুষ্টিয়া শহর"]
  },
  {
    hubName: "মধুখালী ফরিদপুর হাব (আঞ্চলিক অফিস)",
    district: "Faridpur",
    division: "Dhaka",
    hubTitle: "মধুখালী, ফরিদপুর",
    address: "M.S Mansion, 2nd floor, Madhukhali Rail Gate, Madhukhali, Faridpur",
    phone: "+88 01877282171, 01995648616",
    supportNumber: "+8801897-785024",
    email: "mdhasanm3@gmail.com",
    status: "সক্রিয় ফাইবার হাব",
    badge: "Regional Hub",
    areas: ["মধুখালী রেল গেট (এম.এস ম্যানশন)", "মধুখালী", "ফরিদপুর"]
  }
];

export const coverageFeatures = [
  {
    num: "০১",
    title: "সারা বাংলাদেশ ডিজিটাল সেবা",
    desc: "এক নেটওয়ার্কে সারা বাংলাদেশ — আধুনিক অপটিক্যাল ফাইবার প্রযুক্তিতে প্রতিটি অঞ্চলে দ্রুত ও নিরবচ্ছিন্ন ইন্টারনেট সংযোগ নিশ্চিতকরণ।"
  },
  {
    num: "০২",
    title: "দ্রুত ও স্থিতিশীল ইন্টারনেট",
    desc: "বাফারলেস 4K স্ট্রিমিং ও আল্ট্রা লো-পিং গেমিংয়ের জন্য নির্ভরযোগ্য উচ্চগতির ডেডিকেটেড ব্যাকবোন।"
  },
  {
    num: "০৩",
    title: "প্রতিটি জেলা-শহরে আমাদের উপস্থিতি",
    desc: "হেড অফিস ও রিজিওনাল ব্রাঞ্চের মাধ্যমে দেশব্যাপী ইন্টারনেট নেটওয়ার্ক সম্প্রসারণ ও সরাসরি ফিল্ড সাপোর্ট।"
  },
  {
    num: "০৪",
    title: "নিরাপদ ও নির্ভরযোগ্য নেটওয়ার্ক",
    desc: "৯৯.৯% আপটাইম নিশ্চয়তা, সার্বক্ষণিক ব্যাকআপ ফাইবার পাথ ও পাবলিক IPv6 নেটওয়ার্ক সিকিউরিটি।"
  },
  {
    num: "০৫",
    title: "২৪/৭ কাস্টমার সাপোর্ট",
    desc: "সরাসরি হটলাইন কল ও হোয়াটসঅ্যাপে সার্বক্ষণিক টেকনিক্যাল হেল্পডেস্ক ও দ্রুত সমাধান নিশ্চয়তা।"
  }
];

export const heroSlides = [
  {
    id: 1,
    title: "ঘরে বসেই উপভোগ করুন দ্রুত ও স্থিতিশীল ইন্টারনেট",
    subtitle: "কাজ হোক, পড়াশোনা হোক, বিনোদন হোক — সবকিছু এখন আরও সহজ ও নিরবচ্ছিন্ন!",
    badge: "Best ISP in Town",
    tagline: "আজই সংযোগ নিন — আপনার ডিজিটাল জীবনের জন্য",
    bannerImg: "/assets/hero-home.png",
    ctaText: "নতুন সংযোগ নিন",
    ctaLink: "/packages",
    ctaAction: "order",
    theme: {
      btnGradient: "from-blue-600 via-cyan-500 to-blue-700 hover:from-blue-500 hover:to-cyan-400",
      btnShadow: "shadow-cyan-500/30",
      badgeClass: "bg-blue-500/20 text-cyan-300 border-blue-500/30",
      badgeDot: "bg-cyan-400",
      taglineClass: "border-cyan-400 bg-blue-950/60 text-cyan-200",
      dotActive: "w-8 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-400/50",
      secondaryBorder: "border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-100",
      glowBg: "bg-cyan-500/10",
    }
  },
  {
    id: 2,
    title: "সুপার-ফাস্ট গেমিং ও ফ্যামিলি হোম ইন্টারনেট",
    subtitle: "Stay Connected To What Matters! বাফারলেস 4K স্ট্রিমিং ও আল্ট্রা-লো লেটেন্সি গেমিং।",
    badge: "Ultra Low Ping",
    tagline: "Better Internet, Brighter Tomorrow",
    bannerImg: "/assets/hero-gaming.png",
    ctaText: "গেমিং প্যাকেজ দেখুন",
    ctaLink: "/packages",
    ctaAction: "packages",
    theme: {
      btnGradient: "from-purple-600 via-fuchsia-500 to-pink-600 hover:from-purple-500 hover:to-fuchsia-400",
      btnShadow: "shadow-purple-500/40",
      badgeClass: "bg-purple-500/25 text-fuchsia-300 border-purple-500/40",
      badgeDot: "bg-fuchsia-400",
      taglineClass: "border-fuchsia-400 bg-purple-950/70 text-fuchsia-200",
      dotActive: "w-8 bg-gradient-to-r from-fuchsia-400 to-purple-600 shadow-lg shadow-purple-400/50",
      secondaryBorder: "border-purple-500/40 hover:border-pink-400 hover:bg-purple-500/15 text-purple-100",
      glowBg: "bg-purple-500/15",
    }
  },
  {
    id: 3,
    title: "সারা বাংলাদেশ জুড়ে আমাদের NETWORK",
    subtitle: "বাংলাদেশের প্রতিটি জেলা-শহরে দ্রুত সংযোগ সবার জন্য। নিরাপদ ও নির্ভরযোগ্য ফাইবার নেটওয়ার্ক।",
    badge: "Nationwide Fiber",
    tagline: "এক নেটওয়ার্কে সারা বাংলাদেশ",
    bannerImg: "/assets/banner-coverage.png",
    ctaText: "কাভারেজ চেক করুন",
    ctaLink: "/coverage",
    ctaAction: "coverage",
    theme: {
      btnGradient: "from-emerald-600 via-teal-500 to-cyan-600 hover:from-emerald-500 hover:to-teal-400",
      btnShadow: "shadow-emerald-500/40",
      badgeClass: "bg-emerald-500/25 text-emerald-300 border-emerald-500/40",
      badgeDot: "bg-emerald-400",
      taglineClass: "border-emerald-400 bg-emerald-950/70 text-emerald-200",
      dotActive: "w-8 bg-gradient-to-r from-emerald-400 to-teal-500 shadow-lg shadow-emerald-400/50",
      secondaryBorder: "border-emerald-500/40 hover:border-emerald-400 hover:bg-emerald-500/15 text-emerald-100",
      glowBg: "bg-emerald-500/15",
    }
  },
  {
    id: 4,
    title: "মুভি, নাটক সহ লাইভ বিনোদন Link BD সার্ভারে",
    subtitle: "FTP / Live TV Server — ১৫০+ লাইভ চ্যানেল, ৪কে মুভি, স্পোর্টস ও ওয়েব সিরিজ এক ক্লিকে!",
    badge: "10 Gbps BDIX FTP",
    tagline: "More Entertainment, More Happiness",
    bannerImg: "/assets/banner-ftptv.png",
    ctaText: "মিডিয়া সার্ভার দেখুন",
    ctaLink: "/ftp-tv",
    ctaAction: "ftp",
    theme: {
      btnGradient: "from-amber-500 via-orange-500 to-rose-600 hover:from-amber-400 hover:to-orange-400",
      btnShadow: "shadow-orange-500/40",
      badgeClass: "bg-amber-500/25 text-amber-300 border-amber-500/40",
      badgeDot: "bg-amber-400",
      taglineClass: "border-amber-400 bg-amber-950/70 text-amber-200",
      dotActive: "w-8 bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg shadow-amber-400/50",
      secondaryBorder: "border-amber-500/40 hover:border-amber-400 hover:bg-amber-500/15 text-amber-100",
      glowBg: "bg-orange-500/15",
    }
  }
];

export const corporateClients = [
  "Trust Bank",
  "NCC Bank",
  "Global Islami Bank",
  "First Security Islami Bank",
  "Bangladesh Krishi Bank",
  "Bashundhara Group",
  "Premier Bank",
  "NRB Bank",
  "Union Bank Ltd",
  "EXIM Bank",
  "bKash",
  "Akij Group",
  "Liz Fashion",
  "DBG Technology",
  "Snowtex",
  "Daffodil Computers",
  "Shanta Group",
  "White Palace Hotel"
];

export const defaultServers = [
  {
    id: "server-ftp-1",
    name: "Link BD Primary FTP Server",
    type: "ftp",
    ip: "10.16.100.244",
    url: "http://10.16.100.244",
    category: "মুভি ও ওয়েব সিরিজ",
    categoryEn: "Movies & Series",
    speed: "10 Gbps BDIX",
    description: "লেটেস্ট বাংলা, হিন্দি ও হলিউড মুভি, ড্রামা সিরিজ এবং টিভি শোর বিশাল কালেকশন।",
    protocol: "HTTP / BDIX Fast Cache",
    badge: "Primary Hub",
    isActive: true,
    sortOrder: 1
  },
  {
    id: "server-ftp-2",
    name: "Link BD BDIX Ultra Media Hub",
    type: "ftp",
    ip: "103.179.128.246",
    url: "http://103.179.128.246",
    category: "৪K আল্ট্রা এইচডি মিডিয়া",
    categoryEn: "4K Ultra HD",
    speed: "10 Gbps BDIX",
    description: "৪K ব্লুরে ও 1080p হাই-রেজোলিউশন চলচ্চিত্র, অ্যানিমেশন ও ডকুমেন্টারি কালেকশন।",
    protocol: "HTTP / BDIX Direct",
    badge: "Ultra 4K",
    isActive: true,
    sortOrder: 2
  },
  {
    id: "server-ftp-3",
    name: "Link BD Local Optical Cache",
    type: "ftp",
    ip: "172.16.16.10",
    url: "http://172.16.16.10",
    category: "সফটওয়্যার ও পিসি গেমস",
    categoryEn: "Software & Games",
    speed: "10 Gbps BDIX",
    description: "পিসি গেমস, উইন্ডোজ ও ম্যাক ওএস সফটওয়্যার, ড্রাইভার এবং ইউটিলিটি ফাইল ডাউনলোড।",
    protocol: "HTTP / Optical Core",
    badge: "High-Speed",
    isActive: true,
    sortOrder: 3
  },
  {
    id: "server-ftp-4",
    name: "Link BD Cinema & Entertainment Hub",
    type: "ftp",
    ip: "172.16.50.4",
    url: "http://172.16.50.4",
    category: "সিনেমা ও নাটক লাইব্রেরি",
    categoryEn: "Cinema & Drama",
    speed: "10 Gbps BDIX",
    description: "জনপ্রিয় বাংলা নাটক, টেলিফিল্ম, ক্লাসিক সিনেমা ও বিশেষ বিনোদন সম্ভার।",
    protocol: "HTTP / Fast Stream",
    badge: "Cinema Hub",
    isActive: true,
    sortOrder: 4
  },
  {
    id: "server-ftp-5",
    name: "Link BD Public Media Mirror",
    type: "ftp",
    ip: "103.179.58.126",
    url: "http://103.179.58.126",
    category: "মাল্টিমিডিয়া আর্কাইভ ও ব্যাকআপ",
    categoryEn: "Media Archive",
    speed: "10 Gbps BDIX",
    description: "চিরসবুজ চলচ্চিত্র, গান, কনসার্ট এবং মাল্টিমিডিয়া এন্টারটেইনমেন্ট ব্যাকআপ মিরর।",
    protocol: "HTTP / Dedicated Mirror",
    badge: "Mirror 10G",
    isActive: true,
    sortOrder: 5
  },
  {
    id: "server-tv-1",
    name: "Link BD Official Live TV & IPTV Portal",
    type: "tv",
    ip: "10.9.9.10",
    url: "http://10.9.9.10",
    category: "১৫০+ লাইভ টিভি চ্যানেল",
    categoryEn: "150+ Live Channels",
    speed: "10 Gbps BDIX Zero Buffer",
    description: "টি-স্পোর্টস, স্টার স্পোর্টস, সনি নেটওয়ার্ক, সংবাদ ও বিনোদনের ১৫০+ লাইভ চ্যানেল ফুল এইচডি।",
    protocol: "IPTV / Live Web Portal",
    badge: "Live IPTV",
    isActive: true,
    sortOrder: 6
  }
];

export const defaultAdPopup = {
  id: "ad-popup-main",
  isActive: true,
  title: "Link BD স্পেশাল অফার ও মেগা ডিসকাউন্ট",
  imageUrl: "/assets/promo-popup.svg",
  targetUrl: "",
  actionType: "connection_modal",
  cooldownMinutes: 5,
  showOnPages: "all"
};

export const defaultPageImages = [
  {
    id: "home_slide1",
    page: "Home",
    pageLabel: "হোম পেইজ",
    name: "হিরো স্লাইড ১ — হোম ইন্টারনেট",
    currentUrl: "/assets/hero-home.png",
    defaultUrl: "/assets/hero-home.png",
    description: "হোম ইন্টারনেট স্লাইডারের মূল ব্যানার (4K স্ট্রিমিং ও ফ্যামিলি নেটওয়ার্ক)"
  },
  {
    id: "home_slide2",
    page: "Home",
    pageLabel: "হোম পেইজ",
    name: "হিরো স্লাইড ২ — আল্ট্রা গেমিং",
    currentUrl: "/assets/hero-gaming.png",
    defaultUrl: "/assets/hero-gaming.png",
    description: "গেমিং ও লো-পিং স্লাইডারের ব্যানার (Zero Packet Loss)"
  },
  {
    id: "home_slide3",
    page: "Home",
    pageLabel: "হোম পেইজ",
    name: "হিরো স্লাইড ৩ — ফ্যামিলি এন্টারটেইনমেন্ট",
    currentUrl: "/assets/hero-family.png",
    defaultUrl: "/assets/hero-family.png",
    description: "ফ্যামিলি ইন্টারনেট ও বিনোদনের ব্যানার চিত্র"
  },
  {
    id: "home_slide4",
    page: "Home",
    pageLabel: "হোম পেইজ",
    name: "হিরো স্লাইড ৪ — দেশব্যাপী নেটওয়ার্ক",
    currentUrl: "/assets/banner-coverage.png",
    defaultUrl: "/assets/banner-coverage.png",
    description: "দেশব্যাপী কাভারেজ স্লাইডারের ব্যানার (এক নেটওয়ার্কে সারা বাংলাদেশ)"
  },
  {
    id: "packages_banner",
    page: "Packages",
    pageLabel: "প্যাকেজ পেইজ",
    name: "প্যাকেজ পেইজ হেডার ব্যানার",
    currentUrl: "/assets/hero-home.png",
    defaultUrl: "/assets/hero-home.png",
    description: "প্যাকেজ পেইজের শীর্ষ ব্যানার"
  },
  {
    id: "packages_promo",
    page: "Packages",
    pageLabel: "প্যাকেজ পেইজ",
    name: "প্যাকেজ রেট কার্ড / অফার ইনফোগ্রাফিক ১",
    currentUrl: "/assets/packages-tier1.png",
    defaultUrl: "/assets/packages-tier1.png",
    description: "অফিসিয়াল প্যাকেজ রেট কার্ড ইনফোগ্রাফিক ১"
  },
  {
    id: "packages_tier2",
    page: "Packages",
    pageLabel: "প্যাকেজ পেইজ",
    name: "প্যাকেজ কর্পোরেট / এন্টারপ্রাইজ ইনফোগ্রাফিক ২",
    currentUrl: "/assets/packages-tier2.png",
    defaultUrl: "/assets/packages-tier2.png",
    description: "অফিসিয়াল প্যাকেজ রেট কার্ড ইনফোগ্রাফিক ২"
  },
  {
    id: "coverage_banner",
    page: "Coverage",
    pageLabel: "কাভারেজ এরিয়া",
    name: "কাভারেজ পেইজ হেডার ব্যানার",
    currentUrl: "/assets/banner-coverage.png",
    defaultUrl: "/assets/banner-coverage.png",
    description: "কাভারেজ পেইজ ও হোমপেইজের কাভারেজ সেকশনের মূল ব্যানার"
  },
  {
    id: "coverage_map",
    page: "Coverage",
    pageLabel: "কাভারেজ এরিয়া",
    name: "ফাইবার নেটওয়ার্ক ম্যাপ ইনফোগ্রাফিক",
    currentUrl: "/assets/banner-coverage.png",
    defaultUrl: "/assets/banner-coverage.png",
    description: "ফাইবার অপটিক ব্যাকবোন ম্যাপ চিত্র"
  },
  {
    id: "billpay_banner",
    page: "BillPay",
    pageLabel: "বিল পরিশোধ",
    name: "বিল পে পেইজ হেডার ব্যানার",
    currentUrl: "/assets/banner-billpay.png",
    defaultUrl: "/assets/banner-billpay.png",
    description: "অনলাইন বিল পরিশোধ পেইজের শীর্ষ ব্যানার"
  },
  {
    id: "payment_step1",
    page: "BillPay",
    pageLabel: "বিল পরিশোধ",
    name: "পেমেন্ট গাইড ধাপ ১ — আইডি ইনপুট",
    currentUrl: "/assets/payment-step1.jpg",
    defaultUrl: "/assets/payment-step1.jpg",
    description: "বিকাশ/অনলাইন বিল পরিশোধ ধাপ ১ এর নির্দেশিকা ছবি"
  },
  {
    id: "payment_step2",
    page: "BillPay",
    pageLabel: "বিল পরিশোধ",
    name: "পেমেন্ট গাইড ধাপ ২ — মেথড যাচাই",
    currentUrl: "/assets/payment-step2.jpg",
    defaultUrl: "/assets/payment-step2.jpg",
    description: "বিকাশ/অনলাইন বিল পরিশোধ ধাপ ২ এর নির্দেশিকা ছবি"
  },
  {
    id: "payment_step3",
    page: "BillPay",
    pageLabel: "বিল পরিশোধ",
    name: "পেমেন্ট গাইড ধাপ ৩ — কনফার্মেশন",
    currentUrl: "/assets/payment-step3.jpg",
    defaultUrl: "/assets/payment-step3.jpg",
    description: "বিকাশ/অনলাইন বিল পরিশোধ ধাপ ৩ এর নির্দেশিকা ছবি"
  },
  {
    id: "ftptv_banner",
    page: "FtpTv",
    pageLabel: "এফটিপি ও টিভি",
    name: "এফটিপি ও টিভি হেডার ব্যানার",
    currentUrl: "/assets/banner-ftptv.png",
    defaultUrl: "/assets/banner-ftptv.png",
    description: "মিডিয়া সার্ভার হেডার ও হোম সেকশন ব্যানার"
  },
  {
    id: "ftptv_feature",
    page: "FtpTv",
    pageLabel: "এফটিপি ও টিভি",
    name: "মিডিয়া সার্ভার ফিচার ছবি",
    currentUrl: "/assets/banner-ftptv.png",
    defaultUrl: "/assets/banner-ftptv.png",
    description: "লাইভ টিভি ও সিনেমা ওটিটি প্রিভিউ চিত্র"
  },
  {
    id: "clients_banner",
    page: "Clients",
    pageLabel: "ক্লায়েন্টবৃন্দ",
    name: "কর্পোরেট ক্লায়েন্ট হেডার ব্যানার",
    currentUrl: "/assets/clients-1.png",
    defaultUrl: "/assets/clients-1.png",
    description: "ক্লায়েন্ট পেইজের শীর্ষ ব্যানার"
  },
  {
    id: "clients_grid",
    page: "Clients",
    pageLabel: "ক্লায়েন্টবৃন্দ",
    name: "ক্লায়েন্ট পার্টনার লোগো ব্যানার",
    currentUrl: "/assets/clients-2.png",
    defaultUrl: "/assets/clients-2.png",
    description: "ব্যাংক ও কর্পোরেট পার্টনারদের লোগো গ্রিড চিত্র"
  },
  {
    id: "offices_banner",
    page: "Offices",
    pageLabel: "আমাদের অফিস",
    name: "অফিস পেইজ হেডার ব্যানার",
    currentUrl: "/assets/banner-contact.png",
    defaultUrl: "/assets/banner-contact.png",
    description: "অফিস পেইজের মূল শীর্ষ ব্যানার"
  },
  {
    id: "head_office_img",
    page: "Offices",
    pageLabel: "আমাদের অফিস",
    name: "হেড অফিস (উত্তরা) ফটো / ভিজিটিং কার্ড",
    currentUrl: "/assets/owner-info.png",
    defaultUrl: "/assets/owner-info.png",
    description: "উত্তরা হেড অফিস ও মালিক পরিচিতি কার্ডের চিত্র"
  },
  {
    id: "contact_banner",
    page: "Contact",
    pageLabel: "যোগাযোগ",
    name: "যোগাযোগ পেইজ মূল ব্যানার",
    currentUrl: "/assets/banner-contact.png",
    defaultUrl: "/assets/banner-contact.png",
    description: "কন্টাক্ট পেইজ ও হোমপেইজের কন্টাক্ট সেকশনের মূল ব্যানার"
  },
  {
    id: "contact_support",
    page: "Contact",
    pageLabel: "যোগাযোগ",
    name: "২৪/৭ হেল্পডেস্ক সাপোর্ট ছবি",
    currentUrl: "/assets/banner-contact.png",
    defaultUrl: "/assets/banner-contact.png",
    description: "সার্বক্ষণিক কাস্টমার কেয়ার হেল্পডেস্ক চিত্র"
  }
];
