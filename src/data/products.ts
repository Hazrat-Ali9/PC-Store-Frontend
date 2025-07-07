import { Product, Category } from '../types';

export const categories: Category[] = [
  {
    id: 'graphics-cards',
    name: 'Graphics Cards',
    description: 'High-performance GPUs for gaming and professional work',
    icon: 'Zap',
    count: 15
  },
  {
    id: 'processors',
    name: 'Processors',
    description: 'Latest CPU technology from Intel and AMD',
    icon: 'Cpu',
    count: 12
  },
  {
    id: 'motherboards',
    name: 'Motherboards',
    description: 'Premium motherboards for all socket types',
    icon: 'CircuitBoard',
    count: 18
  },
  {
    id: 'ram',
    name: 'Memory (RAM)',
    description: 'DDR4 and DDR5 memory modules',
    icon: 'MemoryStick',
    count: 14
  },
  {
    id: 'storage',
    name: 'Storage',
    description: 'SSDs, HDDs, and NVMe drives',
    icon: 'HardDrive',
    count: 16
  },
  {
    id: 'cooling',
    name: 'Cooling',
    description: 'Air and liquid cooling solutions',
    icon: 'Fan',
    count: 10
  },
  {
    id: 'monitors',
    name: 'Monitors',
    description: '4K, ultrawide, and gaming displays',
    icon: 'Monitor',
    count: 12
  },
  {
    id: 'peripherals',
    name: 'Peripherals',
    description: 'Gaming keyboards, mice, and accessories',
    icon: 'Gamepad2',
    count: 20
  }
];

export const products: Product[] = [
  // Graphics Cards
  {
    id: 'rtx-4090-gaming-x',
    name: 'NVIDIA GeForce RTX 4090 Gaming X Trio 24GB',
    category: 'graphics-cards',
    price: 1599.99,
    originalPrice: 1799.99,
    description: 'The ultimate gaming graphics card with 24GB GDDR6X memory, featuring advanced ray tracing and DLSS 3.0 technology for unparalleled 4K gaming performance.',
    image: 'https://images.pexels.com/photos/7945685/pexels-photo-7945685.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/7945685/pexels-photo-7945685.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    specifications: {
      'GPU': 'NVIDIA GeForce RTX 4090',
      'Memory': '24GB GDDR6X',
      'Memory Interface': '384-bit',
      'Base Clock': '2230 MHz',
      'Boost Clock': '2520 MHz',
      'CUDA Cores': '16384',
      'Ray Tracing Cores': '128 (3rd gen)',
      'Tensor Cores': '512 (4th gen)',
      'Power Consumption': '450W',
      'Recommended PSU': '850W',
      'Outputs': '3x DisplayPort 1.4a, 1x HDMI 2.1',
      'DirectX Support': 'DirectX 12 Ultimate',
      'Dimensions': '336 x 140 x 61 mm'
    },
    rating: 4.8,
    reviews: 342,
    inStock: true,
    features: ['Ray Tracing', 'DLSS 3.0', '4K Gaming', 'RGB Lighting'],
    brand: 'MSI',
    tags: ['gaming', 'high-end', 'ray-tracing', '4k']
  },
  {
    id: 'rtx-4080-super',
    name: 'NVIDIA GeForce RTX 4080 SUPER 16GB',
    category: 'graphics-cards',
    price: 999.99,
    originalPrice: 1199.99,
    description: 'High-performance graphics card perfect for 1440p and 4K gaming with 16GB GDDR6X memory and advanced cooling technology.',
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/7945685/pexels-photo-7945685.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    specifications: {
      'GPU': 'NVIDIA GeForce RTX 4080 SUPER',
      'Memory': '16GB GDDR6X',
      'Memory Interface': '256-bit',
      'Base Clock': '2295 MHz',
      'Boost Clock': '2550 MHz',
      'CUDA Cores': '10240',
      'Ray Tracing Cores': '80 (3rd gen)',
      'Tensor Cores': '320 (4th gen)',
      'Power Consumption': '320W',
      'Recommended PSU': '750W',
      'Outputs': '3x DisplayPort 1.4a, 1x HDMI 2.1',
      'DirectX Support': 'DirectX 12 Ultimate'
    },
    rating: 4.7,
    reviews: 256,
    inStock: true,
    features: ['Ray Tracing', 'DLSS 3.0', '1440p Gaming', 'Efficient Cooling'],
    brand: 'ASUS',
    tags: ['gaming', 'performance', 'ray-tracing']
  },

  // Processors
  {
    id: 'intel-i9-14900k',
    name: 'Intel Core i9-14900K Desktop Processor',
    category: 'processors',
    price: 589.99,
    description: 'Latest 14th generation Intel processor with 24 cores (8P+16E) and 32 threads, perfect for gaming and content creation.',
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/7945685/pexels-photo-7945685.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    specifications: {
      'Cores': '24 (8P+16E)',
      'Threads': '32',
      'Base Clock': '3.2 GHz',
      'Max Turbo': '6.0 GHz',
      'Cache': '36MB Intel Smart Cache',
      'Socket': 'LGA1700',
      'Process': 'Intel 7 (10nm)',
      'TDP': '125W',
      'Max Turbo Power': '253W',
      'Memory Support': 'DDR4-3200, DDR5-5600',
      'PCIe Lanes': '20 (PCIe 5.0 & 4.0)',
      'Graphics': 'Intel UHD Graphics 770'
    },
    rating: 4.6,
    reviews: 189,
    inStock: true,
    features: ['24 Cores', 'DDR5 Support', 'PCIe 5.0', 'Overclockable'],
    brand: 'Intel',
    tags: ['high-end', 'gaming', 'content-creation', 'overclocking']
  },
  {
    id: 'amd-ryzen-9-7950x',
    name: 'AMD Ryzen 9 7950X Desktop Processor',
    category: 'processors',
    price: 549.99,
    originalPrice: 699.99,
    description: 'Flagship AMD processor with 16 cores and 32 threads, built on advanced 5nm technology for exceptional performance.',
    image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/7945685/pexels-photo-7945685.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    specifications: {
      'Cores': '16',
      'Threads': '32',
      'Base Clock': '4.5 GHz',
      'Max Boost': '5.7 GHz',
      'Cache': '80MB (64MB L3 + 16MB L2)',
      'Socket': 'AM5',
      'Process': 'TSMC 5nm',
      'TDP': '170W',
      'Memory Support': 'DDR5-5200',
      'PCIe Lanes': '28 (PCIe 5.0)',
      'Graphics': 'AMD Radeon Graphics'
    },
    rating: 4.8,
    reviews: 234,
    inStock: true,
    features: ['16 Cores', '5nm Process', 'DDR5', 'PCIe 5.0'],
    brand: 'AMD',
    tags: ['high-end', 'gaming', 'workstation', 'content-creation']
  },

  // Motherboards
  {
    id: 'asus-rog-maximus-z790',
    name: 'ASUS ROG Maximus Z790 Hero WiFi 7',
    category: 'motherboards',
    price: 629.99,
    description: 'Premium Z790 motherboard with WiFi 7, DDR5 support, and advanced overclocking features for enthusiast builds.',
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/7945685/pexels-photo-7945685.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    specifications: {
      'Socket': 'LGA1700',
      'Chipset': 'Intel Z790',
      'Memory': 'DDR5-7800+ (OC), 4x DIMM, Max 128GB',
      'Expansion Slots': '2x PCIe 5.0 x16, 1x PCIe 4.0 x16',
      'Storage': '4x M.2 (PCIe 5.0/4.0), 6x SATA 6Gb/s',
      'USB Ports': '2x USB 3.2 Gen 2x2, 6x USB 3.2 Gen 2',
      'Network': 'Intel 2.5Gb Ethernet, WiFi 7',
      'Audio': 'SupremeFX 7.1 Surround',
      'Form Factor': 'ATX',
      'RGB': 'Aura Sync RGB'
    },
    rating: 4.7,
    reviews: 156,
    inStock: true,
    features: ['WiFi 7', 'DDR5-7800+', 'PCIe 5.0', 'RGB Lighting'],
    brand: 'ASUS',
    tags: ['gaming', 'overclocking', 'premium', 'rgb']
  },

  // Memory (RAM)
  {
    id: 'corsair-dominator-ddr5-32gb',
    name: 'Corsair Dominator Platinum RGB 32GB DDR5-6000',
    category: 'ram',
    price: 299.99,
    originalPrice: 349.99,
    description: 'Premium DDR5 memory kit with RGB lighting and exceptional performance for high-end gaming and workstation builds.',
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/7945685/pexels-photo-7945685.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    specifications: {
      'Capacity': '32GB (2x16GB)',
      'Type': 'DDR5',
      'Speed': '6000 MHz',
      'Timings': 'CL36-36-36-76',
      'Voltage': '1.35V',
      'Form Factor': 'DIMM',
      'Heat Spreader': 'Aluminum',
      'RGB': 'Capellix RGB LEDs',
      'Warranty': 'Lifetime',
      'XMP': 'XMP 3.0 Ready'
    },
    rating: 4.6,
    reviews: 89,
    inStock: true,
    features: ['DDR5-6000', 'RGB Lighting', 'Premium Design', 'XMP 3.0'],
    brand: 'Corsair',
    tags: ['memory', 'ddr5', 'rgb', 'premium']
  },

  // Storage
  {
    id: 'samsung-980-pro-2tb',
    name: 'Samsung 980 PRO 2TB NVMe SSD with Heatsink',
    category: 'storage',
    price: 199.99,
    originalPrice: 249.99,
    description: 'Ultra-fast PCIe 4.0 NVMe SSD with integrated heatsink for optimal thermal performance and lightning-fast load times.',
    image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/7945685/pexels-photo-7945685.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    specifications: {
      'Capacity': '2TB',
      'Interface': 'PCIe 4.0 x4, NVMe 1.3c',
      'Form Factor': 'M.2 2280',
      'Sequential Read': 'Up to 7,000 MB/s',
      'Sequential Write': 'Up to 6,900 MB/s',
      'Random Read': 'Up to 1,000K IOPS',
      'Random Write': 'Up to 1,300K IOPS',
      'NAND Type': 'Samsung V-NAND 3-bit MLC',
      'Controller': 'Samsung Elpis',
      'Heatsink': 'Integrated Aluminum',
      'Warranty': '5 Years'
    },
    rating: 4.8,
    reviews: 445,
    inStock: true,
    features: ['PCIe 4.0', '7000 MB/s', 'Heatsink', '5-Year Warranty'],
    brand: 'Samsung',
    tags: ['storage', 'nvme', 'fast', 'gaming']
  },

  // Cooling
  {
    id: 'nzxt-kraken-x73-rgb',
    name: 'NZXT Kraken X73 RGB 360mm AIO Liquid Cooler',
    category: 'cooling',
    price: 279.99,
    description: 'Premium 360mm all-in-one liquid cooler with customizable RGB lighting and advanced pump technology for superior cooling performance.',
    image: 'https://images.pexels.com/photos/7945685/pexels-photo-7945685.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/7945685/pexels-photo-7945685.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    specifications: {
      'Radiator Size': '360mm',
      'Fan Size': '3x 120mm',
      'Fan Speed': '500-2000 RPM',
      'Pump Speed': '800-2800 RPM',
      'Socket Support': 'Intel LGA1700/1200/115x, AMD AM5/AM4',
      'Pump Noise': '<25 dBA',
      'Fan Noise': '<36 dBA',
      'RGB': 'Customizable RGB',
      'Software': 'CAM Software',
      'Warranty': '6 Years'
    },
    rating: 4.5,
    reviews: 234,
    inStock: true,
    features: ['360mm Radiator', 'RGB Lighting', 'CAM Software', 'Quiet Operation'],
    brand: 'NZXT',
    tags: ['cooling', 'aio', 'rgb', 'quiet']
  },

  // Monitors
  {
    id: 'lg-27gn950-4k-gaming',
    name: 'LG 27GN950-B 27" 4K UltraGear Gaming Monitor',
    category: 'monitors',
    price: 799.99,
    originalPrice: 899.99,
    description: '27-inch 4K gaming monitor with 144Hz refresh rate, 1ms response time, and NVIDIA G-SYNC compatibility for smooth gaming.',
    image: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    specifications: {
      'Screen Size': '27 inches',
      'Resolution': '3840 x 2160 (4K UHD)',
      'Panel Type': 'Nano IPS',
      'Refresh Rate': '144Hz',
      'Response Time': '1ms (GtG)',
      'Color Gamut': '98% DCI-P3',
      'HDR': 'HDR10, VESA DisplayHDR 600',
      'Connectivity': '2x HDMI 2.1, 1x DisplayPort 1.4, 2x USB 3.0',
      'G-SYNC': 'Compatible',
      'Stand': 'Height/Tilt/Pivot Adjustable',
      'VESA Mount': '100x100mm'
    },
    rating: 4.7,
    reviews: 312,
    inStock: true,
    features: ['4K 144Hz', 'Nano IPS', 'G-SYNC Compatible', 'HDR600'],
    brand: 'LG',
    tags: ['monitor', '4k', 'gaming', 'hdr']
  },

  // Peripherals
  {
    id: 'logitech-g-pro-x-superlight',
    name: 'Logitech G PRO X SUPERLIGHT Wireless Gaming Mouse',
    category: 'peripherals',
    price: 149.99,
    description: 'Ultra-lightweight wireless gaming mouse weighing less than 63g with HERO 25K sensor and 70-hour battery life.',
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    specifications: {
      'Weight': '<63g',
      'Sensor': 'HERO 25K',
      'DPI': '100-25,600',
      'Tracking Speed': '>40G',
      'Battery Life': 'Up to 70 hours',
      'Connectivity': 'LIGHTSPEED Wireless',
      'Switches': 'Mechanical (50M clicks)',
      'Feet': 'PTFE',
      'Compatibility': 'Windows, macOS',
      'Software': 'Logitech G HUB'
    },
    rating: 4.8,
    reviews: 567,
    inStock: true,
    features: ['Ultra-Light', 'HERO 25K', 'Wireless', '70h Battery'],
    brand: 'Logitech',
    tags: ['mouse', 'gaming', 'wireless', 'lightweight']
  },
  {
    id: 'corsair-k95-rgb-platinum',
    name: 'Corsair K95 RGB Platinum XT Mechanical Gaming Keyboard',
    category: 'peripherals',
    price: 199.99,
    originalPrice: 229.99,
    description: 'Premium mechanical gaming keyboard with Cherry MX switches, per-key RGB lighting, and dedicated macro keys.',
    image: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    specifications: {
      'Switch Type': 'Cherry MX Speed Silver',
      'Layout': 'Full Size (104 keys)',
      'Backlighting': 'Per-key RGB',
      'Macro Keys': '6 Dedicated',
      'Media Controls': 'Dedicated Volume Wheel',
      'Wrist Rest': 'Detachable Leatherette',
      'Connectivity': 'USB 3.0',
      'Polling Rate': '1000Hz',
      'Key Rollover': 'Full NKRO',
      'Software': 'iCUE'
    },
    rating: 4.6,
    reviews: 423,
    inStock: true,
    features: ['Cherry MX', 'RGB Per-Key', 'Macro Keys', 'Media Controls'],
    brand: 'Corsair',
    tags: ['keyboard', 'mechanical', 'gaming', 'rgb']
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.originalPrice).slice(0, 6);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};