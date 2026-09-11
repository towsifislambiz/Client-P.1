export const companyInfo = {
  name: "Link BD",
  fullName: "Link BD Internet Service Provider",
  slogan: "Connect to The World",
  owner: "Md. Hasan Mahmud",
  hotline1: "+8801995-648616",
  hotline2: "+8801897-785024",
  whatsapp: "+8801995648616",
  email1: "linkbd86@gmail.com",
  email2: "mdhasanm3@gmail.com",
  website: "www.linkbd.net",
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
    price: 1,
    badge: "Popular",
    category: "home",
    accentColor: "from-blue-600 to-cyan-500",
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
    badge: "Hot",
    category: "home",
    accentColor: "from-amber-500 to-orange-500",
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
    badge: "Best Value",
    category: "home",
    featured: true,
    accentColor: "from-indigo-600 to-purple-600",
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
    badge: "Ultra",
    category: "home",
    accentColor: "from-blue-700 to-indigo-800",
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
    badge: "Power",
    category: "pro",
    accentColor: "from-purple-600 to-pink-600",
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
    badge: "Gamer Choice",
    category: "pro",
    accentColor: "from-blue-600 to-violet-700",
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
    badge: "Enterprise Grade",
    category: "pro",
    accentColor: "from-yellow-600 to-amber-700",
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
