export const opportunities = [
  {
    id: 1,
    name: "Damascus Reconstruction",
    location: [33.5138, 36.2765],
    type: "Urban Development",
    image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    address: "Damascus, Syria",
    shortDescription: "Large-scale reconstruction project in the historic city center"
  },
  {
    id: 2,
    name: "Aleppo Industrial Zone",
    location: [36.2021, 37.1343],
    type: "Industrial",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    address: "Aleppo, Syria",
    shortDescription: "New industrial park with modern manufacturing facilities"
  },
  {
    id: 3,
    name: "Coastal Tourism Project",
    location: [35.5357, 35.7822],
    type: "Tourism",
    image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    address: "Latakia, Syria",
    shortDescription: "Beach resort development along the Mediterranean coast"
  },
  {
    id: 4,
    name: "Homs Agricultural Center",
    location: [34.7324, 36.7132],
    type: "Agriculture",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    address: "Homs, Syria",
    shortDescription: "Research and development center for modern farming techniques"
  },
  {
    id: 5,
    name: "Latakia Port Expansion",
    location: [35.5215, 35.7924],
    type: "Industrial",
    image: "https://images.unsplash.com/photo-1600679472829-3044539ce8ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    address: "Latakia, Syria",
    shortDescription: "Major expansion project to increase cargo capacity"
  },
  {
    id: 6,
    name: "Palmyra Heritage Site",
    location: [34.5560, 38.2739],
    type: "Tourism",
    image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    address: "Palmyra, Syria",
    shortDescription: "Restoration of ancient ruins and visitor center development"
  },
  {
    id: 7,
    name: "Deir ez-Zor Oil Facility",
    location: [35.3309, 40.1406],
    type: "Industrial",
    image: "https://images.unsplash.com/photo-1610500795225-f5d008a08a1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    address: "Deir ez-Zor, Syria",
    shortDescription: "New oil refining complex with modern safety features"
  },
  {
    id: 8,
    name: "Hama Water Wheels Renovation",
    location: [35.1318, 36.7578],
    type: "Urban Development",
    image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    address: "Hama, Syria",
    shortDescription: "Restoration of historic norias and surrounding area"
  },
  {
    id: 9,
    name: "Quneitra Border Trade Zone",
    location: [33.1256, 35.8243],
    type: "Commercial",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    address: "Quneitra, Syria",
    shortDescription: "Cross-border trade complex with customs facilities"
  },
  {
    id: 10,
    name: "Tartus Free Zone",
    location: [34.8950, 35.8865],
    type: "Commercial",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    address: "Tartus, Syria",
    shortDescription: "Tax-free commercial and industrial zone development"
  },
  {
    id: 11,
    name: "Raqqa Bridge Reconstruction",
    location: [35.9594, 39.0391],
    type: "Infrastructure",
    image: "https://images.unsplash.com/photo-1558088458-b65180740294?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    address: "Raqqa, Syria",
    shortDescription: "New bridge across the Euphrates river with modern design"
  },
  {
    id: 12,
    name: "Idleb Olive Oil Factory",
    location: [35.9297, 36.6317],
    type: "Agriculture",
    image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    address: "Idleb, Syria",
    shortDescription: "Modern olive oil processing plant with export facilities"
  },
  {
    id: 13,
    name: "Daraa Railway Station",
    location: [32.6189, 36.1023],
    type: "Infrastructure",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    address: "Daraa, Syria",
    shortDescription: "New regional railway hub with modern passenger facilities"
  }
];

export const adminUser = {
  name:"belal",
  email:"belal.alkador1@gmail.com",
  password:"12345",
  isAdmin:true,
  ok:true
}

// Companies with their branches and centers
export const companies = [
  {
    id: 1,
    name: "الطرق والجسور",
    nameEn: "Roads and Bridges",
    type: "Infrastructure",
    description: "شركة متخصصة في بناء الطرق والجسور والبنية التحتية",
    descriptionEn: "Company specialized in building roads, bridges and infrastructure",
    location: [33.5138, 36.2765] as [number, number], // Damascus center
    branches: [
      {
        id: 11,
        name: "فرع دمشق",
        nameEn: "Damascus Branch",
        location: [33.5138, 36.2765] as [number, number],
        address: "دمشق، المزة",
        addressEn: "Damascus, Mazzeh",
        centers: [
          {
            id: 111,
            name: "مركز المطار",
            nameEn: "Airport Center",
            location: [33.4114, 36.5156] as [number, number],
            address: "طريق المطار، دمشق",
            addressEn: "Airport Road, Damascus",
            opportunities: [
              {
                id: 1111,
                name: "مشروع توسيع طريق المطار",
                nameEn: "Airport Road Expansion Project",
                description: "توسيع وتطوير طريق المطار الدولي بدمشق",
                descriptionEn: "Expansion and development of Damascus International Airport road",
                budget: "50 مليون دولار",
                budgetEn: "$50 Million",
                duration: "18 شهر",
                durationEn: "18 months",
                image: "https://images.unsplash.com/photo-1558088458-b65180740294?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
                status: "available"
              }
            ]
          },
          {
            id: 112,
            name: "مركز صحنايا",
            nameEn: "Sahnaya Center",
            location: [33.3689, 36.1453] as [number, number],
            address: "صحنايا، ريف دمشق",
            addressEn: "Sahnaya, Damascus Countryside",
            opportunities: [
              {
                id: 1121,
                name: "جسر صحنايا الجديد",
                nameEn: "New Sahnaya Bridge",
                description: "بناء جسر جديد لربط مناطق صحنايا",
                descriptionEn: "Construction of a new bridge connecting Sahnaya areas",
                budget: "25 مليون دولار",
                budgetEn: "$25 Million",
                duration: "12 شهر",
                durationEn: "12 months",
                image: "https://images.unsplash.com/photo-1558088458-b65180740294?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
                status: "available"
              }
            ]
          }
        ]
      },
      {
        id: 12,
        name: "فرع حمص",
        nameEn: "Homs Branch",
        location: [34.7324, 36.7132] as [number, number],
        address: "حمص، الوعر",
        addressEn: "Homs, Al-Waer",
        centers: [
          {
            id: 121,
            name: "مركز الوعر",
            nameEn: "Al-Waer Center",
            location: [34.7324, 36.7132] as [number, number],
            address: "الوعر، حمص",
            addressEn: "Al-Waer, Homs",
            opportunities: [
              {
                id: 1211,
                name: "طريق الوعر السريع",
                nameEn: "Al-Waer Highway",
                description: "إنشاء طريق سريع يربط الوعر بوسط حمص",
                descriptionEn: "Construction of highway connecting Al-Waer to Homs center",
                budget: "40 مليون دولار",
                budgetEn: "$40 Million",
                duration: "24 شهر",
                durationEn: "24 months",
                image: "https://images.unsplash.com/photo-1558088458-b65180740294?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
                status: "available"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "الإسكان والتعمير",
    nameEn: "Housing and Construction",
    type: "Real Estate",
    description: "شركة متخصصة في مشاريع الإسكان والتطوير العقاري",
    descriptionEn: "Company specialized in housing projects and real estate development",
    location: [33.5138, 36.2765] as [number, number],
    branches: [
      {
        id: 21,
        name: "فرع دمشق",
        nameEn: "Damascus Branch",
        location: [33.5138, 36.2765] as [number, number],
        address: "دمشق، أبو رمانة",
        addressEn: "Damascus, Abu Rummaneh",
        centers: [
          {
            id: 211,
            name: "مركز أبو رمانة",
            nameEn: "Abu Rummaneh Center",
            location: [33.5138, 36.2765] as [number, number],
            address: "أبو رمانة، دمشق",
            addressEn: "Abu Rummaneh, Damascus",
            opportunities: [
              {
                id: 2111,
                name: "مجمع سكني فاخر",
                nameEn: "Luxury Residential Complex",
                description: "بناء مجمع سكني فاخر في منطقة أبو رمانة",
                descriptionEn: "Construction of luxury residential complex in Abu Rummaneh area",
                budget: "100 مليون دولار",
                budgetEn: "$100 Million",
                duration: "36 شهر",
                durationEn: "36 months",
                image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
                status: "available"
              }
            ]
          }
        ]
      },
      {
        id: 22,
        name: "فرع حلب",
        nameEn: "Aleppo Branch",
        location: [36.2021, 37.1343] as [number, number],
        address: "حلب، الفرقان",
        addressEn: "Aleppo, Al-Furqan",
        centers: [
          {
            id: 221,
            name: "مركز الفرقان",
            nameEn: "Al-Furqan Center",
            location: [36.2021, 37.1343] as [number, number],
            address: "الفرقان، حلب",
            addressEn: "Al-Furqan, Aleppo",
            opportunities: [
              {
                id: 2211,
                name: "إعادة إعمار الفرقان",
                nameEn: "Al-Furqan Reconstruction",
                description: "مشروع إعادة إعمار وتأهيل منطقة الفرقان",
                descriptionEn: "Reconstruction and rehabilitation project for Al-Furqan area",
                budget: "80 مليون دولار",
                budgetEn: "$80 Million",
                duration: "30 شهر",
                durationEn: "30 months",
                image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
                status: "available"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "الطاقة والمياه",
    nameEn: "Energy and Water",
    type: "Utilities",
    description: "شركة متخصصة في مشاريع الطاقة والمياه",
    descriptionEn: "Company specialized in energy and water projects",
    location: [33.5138, 36.2765] as [number, number],
    branches: [
      {
        id: 31,
        name: "فرع اللاذقية",
        nameEn: "Latakia Branch",
        location: [35.5357, 35.7822] as [number, number],
        address: "اللاذقية، الزراعة",
        addressEn: "Latakia, Al-Ziraa",
        centers: [
          {
            id: 311,
            name: "مركز الزراعة",
            nameEn: "Al-Ziraa Center",
            location: [35.5357, 35.7822] as [number, number],
            address: "الزراعة، اللاذقية",
            addressEn: "Al-Ziraa, Latakia",
            opportunities: [
              {
                id: 3111,
                name: "محطة تحلية المياه",
                nameEn: "Water Desalination Plant",
                description: "إنشاء محطة تحلية مياه البحر",
                descriptionEn: "Construction of seawater desalination plant",
                budget: "120 مليون دولار",
                budgetEn: "$120 Million",
                duration: "42 شهر",
                durationEn: "42 months",
                image: "https://images.unsplash.com/photo-1600679472829-3044539ce8ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
                status: "available"
              }
            ]
          }
        ]
      }
    ]
  }
];

// User requests tracking
export const userRequests: Array<{
  userId: string;
  opportunityId: number;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
}> = [
  // This will store user requests with opportunity IDs
];
