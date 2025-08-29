import { Product } from "@/types/product";

// Indian Electronics
import samsungGalaxyM15 from "@/assets/products/indian/samsung-galaxy-m15.jpg";
import redmiNote13 from "@/assets/products/indian/redmi-note-13.jpg";
import onePlus12R from "@/assets/products/indian/oneplus-12r.jpg";
import hpPavilionLaptop from "@/assets/products/indian/hp-pavilion-laptop.jpg";
import lenovoIdeapad3 from "@/assets/products/indian/lenovo-ideapad-3.jpg";
import sonyWHCH720N from "@/assets/products/indian/sony-wh-ch720n.jpg";
import boatAirdopes131 from "@/assets/products/indian/boat-airdopes-131.jpg";
import noiseBudsVS104 from "@/assets/products/indian/noise-buds-vs104.jpg";
import miPowerbank3i from "@/assets/products/indian/mi-powerbank-3i.jpg";
import realmeGTMaster from "@/assets/products/indian/realme-gt-master.jpg";
import pocoX6Pro from "@/assets/products/indian/poco-x6-pro.jpg";
import appleIphone15 from "@/assets/products/indian/apple-iphone-15.jpg";
import asusVivobook15 from "@/assets/products/asus-vivobook-15.jpg";

// Indian Fashion
import mensKurtaWhite from "@/assets/products/indian/mens-kurta-white.jpg";
import silkSareeRed from "@/assets/products/indian/silk-saree-red.jpg";
import womensKurtiBlue from "@/assets/products/indian/womens-kurti-blue.jpg";
import goldenJuttis from "@/assets/products/indian/golden-juttis.jpg";

// Indian Home & Kitchen
import brassPujaThali from "@/assets/products/indian/brass-puja-thali.jpg";
import pressureCooker from "@/assets/products/indian/pressure-cooker.jpg";
import masalaDabba from "@/assets/products/indian/masala-dabba.jpg";
import ceramicTeaSet from "@/assets/products/indian/ceramic-tea-set.jpg";
import copperWaterBottle from "@/assets/products/indian/copper-water-bottle.jpg";
import decorativeDiyas from "@/assets/products/indian/decorative-diyas.jpg";
import woodenCoffeeTable from "@/assets/products/indian/wooden-coffee-table.jpg";

// Beauty & Personal Care
import ayurvedicFacePack from "@/assets/products/indian/ayurvedic-face-pack.jpg";

// Existing product imports
import headphones1 from "@/assets/products/headphones-1.jpg";
import phoneCase1 from "@/assets/products/phone-case-1.jpg";
import tshirt1 from "@/assets/products/tshirt-1.jpg";
import jeans1 from "@/assets/products/jeans-1.jpg";
import mug1 from "@/assets/products/mug-1.jpg";
import shoes1 from "@/assets/products/shoes-1.jpg";
import laptopStand1 from "@/assets/products/laptop-stand-1.jpg";
import jacket1 from "@/assets/products/jacket-1.jpg";

export const indianProducts: Product[] = [
  // Electronics
  {
    id: "IND-001",
    name: "Samsung Galaxy M15 5G",
    category: "Electronics",
    brand: "Samsung",
    price: 15999,
    image: samsungGalaxyM15,
    description: "6GB RAM, 128GB Storage, 6000mAh Battery, 50MP Triple Camera",
    tags: ["smartphone", "5G", "samsung", "android", "mobile"],
    color: "Blue",
    material: "Glass"
  },
  {
    id: "IND-002",
    name: "Redmi Note 13 5G",
    category: "Electronics",
    brand: "Xiaomi",
    price: 17999,
    image: redmiNote13,
    description: "8GB RAM, 128GB Storage, 108MP Camera, AMOLED Display",
    tags: ["smartphone", "redmi", "xiaomi", "5G", "camera"],
    color: "Midnight Black",
    material: "Glass"
  },
  {
    id: "IND-003", 
    name: "OnePlus 12R 5G",
    category: "Electronics",
    brand: "OnePlus",
    price: 39999,
    image: onePlus12R,
    description: "12GB RAM, 256GB Storage, Snapdragon 8 Gen 2, 120Hz Display",
    tags: ["oneplus", "flagship", "snapdragon", "premium"],
    color: "Cool Blue",
    material: "Glass"
  },
  {
    id: "IND-004",
    name: "HP Pavilion 15 Laptop",
    category: "Electronics",
    brand: "HP",
    price: 55999,
    image: hpPavilionLaptop,
    description: "Intel Core i5, 8GB RAM, 512GB SSD, Windows 11",
    tags: ["laptop", "hp", "intel", "windows", "ssd"],
    color: "Silver",
    material: "Aluminum"
  },
  {
    id: "IND-005",
    name: "Lenovo IdeaPad 3",
    category: "Electronics", 
    brand: "Lenovo",
    price: 42999,
    image: lenovoIdeapad3,
    description: "AMD Ryzen 5, 8GB RAM, 512GB SSD, 15.6\" FHD Display",
    tags: ["laptop", "lenovo", "amd", "ryzen", "gaming"],
    color: "Arctic Grey",
    material: "Plastic"
  },
  {
    id: "IND-006",
    name: "ASUS VivoBook 15",
    category: "Electronics",
    brand: "ASUS", 
    price: 38999,
    image: asusVivobook15,
    description: "Intel Core i3, 8GB RAM, 256GB SSD, Windows 11 Home",
    tags: ["laptop", "asus", "vivobook", "student", "lightweight"],
    color: "Slate Grey",
    material: "Plastic"
  },
  {
    id: "IND-007",
    name: "Sony WH-CH720N",
    category: "Electronics",
    brand: "Sony",
    price: 8999,
    image: sonyWHCH720N,
    description: "Wireless Noise Canceling Headphones, 35Hr Battery Life",
    tags: ["headphones", "sony", "wireless", "noise-cancelling", "bluetooth"],
    color: "Black",
    material: "Plastic"
  },
  {
    id: "IND-008",
    name: "boAt Airdopes 131",
    category: "Electronics",
    brand: "boAt",
    price: 1299,
    image: boatAirdopes131,
    description: "True Wireless Earbuds, IPX4, 12Hr Playback, Voice Assistant",
    tags: ["earbuds", "boat", "tws", "wireless", "indian-brand"],
    color: "Active Black",
    material: "Plastic"
  },
  {
    id: "IND-009",
    name: "Noise Buds VS104",
    category: "Electronics",
    brand: "Noise",
    price: 999,
    image: noiseBudsVS104,
    description: "True Wireless Earbuds, 50Hr Playtime, Quad Mic ENC",
    tags: ["earbuds", "noise", "tws", "budget", "indian-brand"],
    color: "Jet Black",
    material: "Plastic"
  },
  {
    id: "IND-010",
    name: "Mi Power Bank 3i 20000mAh",
    category: "Electronics",
    brand: "Xiaomi",
    price: 1899,
    image: miPowerbank3i,
    description: "20000mAh Capacity, 18W Fast Charging, Dual USB Output",
    tags: ["powerbank", "xiaomi", "mi", "fast-charging", "portable"],
    color: "Black",
    material: "Plastic"
  },
  {
    id: "IND-011",
    name: "Realme GT Master Edition",
    category: "Electronics",
    brand: "Realme",
    price: 25999,
    image: realmeGTMaster,
    description: "8GB RAM, 128GB Storage, Snapdragon 778G, 120Hz Super AMOLED",
    tags: ["realme", "snapdragon", "amoled", "camera", "performance"],
    color: "Voyager Grey",
    material: "Glass"
  },
  {
    id: "IND-012",
    name: "POCO X6 Pro 5G",
    category: "Electronics",
    brand: "POCO",
    price: 26999,
    image: pocoX6Pro,
    description: "12GB RAM, 256GB Storage, MediaTek Dimensity 8300, 120Hz",
    tags: ["poco", "mediatek", "gaming", "5G", "performance"],
    color: "Yellow",
    material: "Glass"
  },
  {
    id: "IND-013",
    name: "Apple iPhone 15",
    category: "Electronics",
    brand: "Apple",
    price: 79900,
    image: appleIphone15,
    description: "128GB Storage, A16 Bionic Chip, 48MP Camera, USB-C",
    tags: ["iphone", "apple", "ios", "premium", "camera"],
    color: "Pink",
    material: "Aluminum"
  },

  // Fashion
  {
    id: "IND-014",
    name: "Men's Cotton Kurta",
    category: "Fashion",
    brand: "FabIndia",
    price: 1299,
    image: mensKurtaWhite,
    description: "100% Pure Cotton, Regular Fit, Traditional Indian Wear",
    tags: ["kurta", "men", "cotton", "traditional", "ethnic"],
    color: "White",
    material: "Cotton"
  },
  {
    id: "IND-015",
    name: "Silk Saree",
    category: "Fashion", 
    brand: "Kanchipuram Silk",
    price: 8999,
    image: silkSareeRed,
    description: "Pure Silk Saree with Golden Border, Traditional Weave",
    tags: ["saree", "silk", "traditional", "wedding", "ethnic"],
    color: "Red",
    material: "Silk"
  },
  {
    id: "IND-016",
    name: "Women's Cotton Kurti",
    category: "Fashion",
    brand: "W for Woman",
    price: 899,
    image: womensKurtiBlue,
    description: "Cotton Straight Kurti, 3/4 Sleeves, Casual Wear",
    tags: ["kurti", "women", "cotton", "casual", "ethnic"],
    color: "Blue",
    material: "Cotton"
  },
  {
    id: "IND-017",
    name: "Traditional Juttis",
    category: "Fashion",
    brand: "Needledust",
    price: 1599,
    image: goldenJuttis,
    description: "Handcrafted Leather Juttis with Golden Embroidery",
    tags: ["juttis", "footwear", "traditional", "handcrafted", "leather"],
    color: "Golden",
    material: "Leather"
  },

  // Home & Kitchen
  {
    id: "IND-018",
    name: "Brass Puja Thali Set",
    category: "Home & Garden",
    brand: "Craftam",
    price: 799,
    image: brassPujaThali,
    description: "Traditional Brass Thali Set for Puja, 7 Pieces",
    tags: ["puja", "brass", "traditional", "religious", "thali"],
    color: "Golden",
    material: "Brass"
  },
  {
    id: "IND-019",
    name: "Stainless Steel Pressure Cooker",
    category: "Home & Garden",
    brand: "Prestige",
    price: 2199,
    image: pressureCooker,
    description: "5 Litre Capacity, Induction Compatible, ISI Certified",
    tags: ["pressure-cooker", "kitchen", "cooking", "stainless-steel"],
    color: "Silver",
    material: "Stainless Steel"
  },
  {
    id: "IND-020",
    name: "Masala Dabba Spice Box",
    category: "Home & Garden",
    brand: "Kitchen Craft",
    price: 599,
    image: masalaDabba,
    description: "7 Compartment Stainless Steel Spice Box with Spoons",
    tags: ["spice-box", "kitchen", "storage", "indian-cooking"],
    color: "Silver",
    material: "Stainless Steel"
  },
  {
    id: "IND-021",
    name: "Ceramic Tea Set",
    category: "Home & Garden",
    brand: "Clay Craft",
    price: 1299,
    image: ceramicTeaSet,
    description: "6 Piece Ceramic Tea Set with Teapot and Cups",
    tags: ["tea-set", "ceramic", "kitchen", "serving"],
    color: "White",
    material: "Ceramic"
  },
  {
    id: "IND-022",
    name: "Copper Water Bottle",
    category: "Home & Garden",
    brand: "Copperware",
    price: 899,
    image: copperWaterBottle,
    description: "Pure Copper Water Bottle, 1 Litre, Health Benefits",
    tags: ["water-bottle", "copper", "health", "ayurvedic"],
    color: "Copper",
    material: "Copper"
  },
  {
    id: "IND-023",
    name: "Decorative Diyas Set",
    category: "Home & Garden", 
    brand: "Handicrafts",
    price: 399,
    image: decorativeDiyas,
    description: "Set of 5 Clay Diyas for Diwali and Festivals",
    tags: ["diya", "clay", "festival", "decoration", "diwali"],
    color: "Terracotta",
    material: "Clay"
  },
  {
    id: "IND-024",
    name: "Wooden Coffee Table",
    category: "Home & Garden",
    brand: "Wooden Street",
    price: 4999,
    image: woodenCoffeeTable,
    description: "Solid Wood Coffee Table, Sheesham Wood, Center Table",
    tags: ["furniture", "table", "wood", "living-room"],
    color: "Brown",
    material: "Wood"
  },

  // Beauty & Personal Care
  {
    id: "IND-025",
    name: "Ayurvedic Face Pack",
    category: "Beauty & Personal Care",
    brand: "Patanjali",
    price: 149,
    image: ayurvedicFacePack,
    description: "Natural Herbal Face Pack for Glowing Skin, 60g",
    tags: ["face-pack", "ayurvedic", "natural", "skincare", "herbal"],
    color: "Green",
    material: "Powder"
  },

  // Additional products from existing collection with Indian pricing
  {
    id: "IND-026",
    name: "Audio-Technica ATH-M50x",
    category: "Electronics",
    brand: "Audio-Technica",
    price: 12999,
    image: headphones1,
    description: "Professional Studio Monitor Headphones",
    tags: ["headphones", "professional", "studio", "audio"],
    color: "Black",
    material: "Plastic"
  },
  {
    id: "IND-027",
    name: "iPhone 13 Case",
    category: "Electronics",
    brand: "Spigen",
    price: 1499,
    image: phoneCase1,
    description: "Clear Protection Case for iPhone 13 Series",
    tags: ["case", "iphone", "protection", "clear"],
    color: "Transparent",
    material: "TPU"
  },
  {
    id: "IND-028",
    name: "Cotton Crew Neck T-Shirt",
    category: "Fashion",
    brand: "H&M",
    price: 799,
    image: tshirt1,
    description: "100% Cotton Basic T-Shirt, Regular Fit",
    tags: ["t-shirt", "cotton", "casual", "basic"],
    color: "Navy Blue",
    material: "Cotton"
  },
  {
    id: "IND-029",
    name: "Slim Fit Jeans",
    category: "Fashion",
    brand: "Levi's",
    price: 3499,
    image: jeans1,
    description: "511 Slim Fit Jeans, Stretch Denim",
    tags: ["jeans", "denim", "slim-fit", "casual"],
    color: "Dark Blue",
    material: "Denim"
  },
  {
    id: "IND-030",
    name: "Ceramic Coffee Mug",
    category: "Home & Garden",
    brand: "Borosil",
    price: 299,
    image: mug1,
    description: "Premium Ceramic Mug, 350ml Capacity",
    tags: ["mug", "coffee", "ceramic", "kitchen"],
    color: "White",
    material: "Ceramic"
  },
  {
    id: "IND-031",
    name: "Nike Air Max Shoes",
    category: "Fashion",
    brand: "Nike",
    price: 7999,
    image: shoes1,
    description: "Air Max Running Shoes, Lightweight Design",
    tags: ["shoes", "nike", "running", "sports"],
    color: "Red",
    material: "Synthetic"
  },
  {
    id: "IND-032",
    name: "Aluminum Laptop Stand",
    category: "Electronics",
    brand: "Portronics",
    price: 1999,
    image: laptopStand1,
    description: "Adjustable Laptop Stand, Ergonomic Design",
    tags: ["laptop-stand", "aluminum", "ergonomic", "adjustable"],
    color: "Silver",
    material: "Aluminum"
  },
  {
    id: "IND-033",
    name: "Leather Jacket",
    category: "Fashion",
    brand: "Zara",
    price: 8999,
    image: jacket1,
    description: "Genuine Leather Biker Jacket, Premium Quality",
    tags: ["jacket", "leather", "biker", "premium"],
    color: "Black",
    material: "Leather"
  }
];

// Generate additional products to reach 50+
const generateAdditionalIndianProducts = (): Product[] => {
  const categories = [
    "Electronics", "Fashion", "Home & Garden", "Beauty & Personal Care", 
    "Sports & Fitness", "Books & Education", "Automotive", "Health & Wellness"
  ];
  
  const indianBrands = [
    "Tata", "Mahindra", "Bajaj", "Hero", "Godrej", "ITC", "Dabur", "Himalaya",
    "Patanjali", "Amul", "Britannia", "Parle", "Haldiram's", "MTR"
  ];
  
  const products: Product[] = [];
  
  for (let i = 34; i <= 60; i++) {
    const category = categories[i % categories.length];
    const brand = indianBrands[i % indianBrands.length];
    const basePrice = Math.floor(Math.random() * 10000) + 500;
    
    products.push({
      id: `IND-${String(i).padStart(3, '0')}`,
      name: `${brand} ${category} Product ${i}`,
      category,
      brand,
      price: basePrice,
      image: "/api/placeholder/400/400",
      description: `Premium ${category.toLowerCase()} product from ${brand}`,
      tags: [category.toLowerCase().replace(/ & /g, '-'), brand.toLowerCase(), "indian"],
      color: ["Black", "White", "Red", "Blue", "Green", "Silver"][i % 6],
      material: ["Cotton", "Plastic", "Metal", "Glass", "Wood"][i % 5]
    });
  }
  
  return products;
};

export const allIndianProducts = [...indianProducts, ...generateAdditionalIndianProducts()];
