import { Product } from "@/types/product";
import { allIndianProducts } from "./indianProducts";
import { allExpandedProducts } from "./expandedProducts";

// Legacy products for backward compatibility
import headphones1 from "@/assets/products/headphones-1.jpg";
import phoneCase1 from "@/assets/products/phone-case-1.jpg";
import tshirt1 from "@/assets/products/tshirt-1.jpg";
import jeans1 from "@/assets/products/jeans-1.jpg";
import mug1 from "@/assets/products/mug-1.jpg";
import shoes1 from "@/assets/products/shoes-1.jpg";
import laptopStand1 from "@/assets/products/laptop-stand-1.jpg";
import jacket1 from "@/assets/products/jacket-1.jpg";

export const mockProducts: Product[] = [
  // Electronics
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    brand: "AudioTech",
    price: 199.99,
    image: headphones1,
    description: "Premium wireless headphones with noise cancellation",
    tags: ["headphones", "wireless", "bluetooth", "audio"],
    color: "Black"
  },
  {
    id: "2", 
    name: "Smartphone Case",
    category: "Electronics",
    brand: "ProtectPro",
    price: 29.99,
    image: phoneCase1,
    description: "Durable protective case for smartphones",
    tags: ["phone", "case", "protection", "accessories"],
    color: "Clear"
  },
  {
    id: "3",
    name: "Laptop Stand",
    category: "Electronics",
    brand: "WorkSpace",
    price: 79.99,
    image: laptopStand1, 
    description: "Adjustable aluminum laptop stand",
    tags: ["laptop", "stand", "desk", "ergonomic"],
    material: "Aluminum"
  },
  {
    id: "4",
    name: "Wireless Mouse",
    category: "Electronics", 
    brand: "TechFlow",
    price: 49.99,
    image: "/api/placeholder/400/400",
    description: "Ergonomic wireless mouse with precision tracking",
    tags: ["mouse", "wireless", "computer", "ergonomic"],
    color: "White"
  },
  {
    id: "5",
    name: "Portable Speaker",
    category: "Electronics",
    brand: "SoundWave",
    price: 89.99,
    image: "/api/placeholder/400/400",
    description: "Compact Bluetooth speaker with powerful sound",
    tags: ["speaker", "bluetooth", "portable", "audio"],
    color: "Blue"
  },

  // Fashion
  {
    id: "6",
    name: "Cotton T-Shirt",
    category: "Fashion",
    brand: "ComfortWear",
    price: 24.99,
    image: tshirt1,
    description: "100% organic cotton t-shirt",
    tags: ["shirt", "cotton", "casual", "organic"],
    color: "Navy",
    material: "Cotton"
  },
  {
    id: "7",
    name: "Denim Jeans",
    category: "Fashion",
    brand: "UrbanStyle",
    price: 79.99,
    image: jeans1,
    description: "Classic fit denim jeans",
    tags: ["jeans", "denim", "pants", "casual"],
    color: "Blue",
    material: "Denim"
  },
  {
    id: "8",
    name: "Leather Jacket",
    category: "Fashion",
    brand: "EdgeWear",
    price: 199.99,
    image: jacket1, 
    description: "Genuine leather motorcycle jacket",
    tags: ["jacket", "leather", "outerwear", "motorcycle"],
    color: "Black",
    material: "Leather"
  },
  {
    id: "9",
    name: "Running Shoes",
    category: "Fashion",
    brand: "SpeedFit",
    price: 129.99,
    image: shoes1,
    description: "Lightweight running shoes with cushioned sole",
    tags: ["shoes", "running", "athletic", "sports"],
    color: "Red"
  },
  {
    id: "10",
    name: "Baseball Cap",
    category: "Fashion",
    brand: "CapCo",
    price: 19.99,
    image: "/api/placeholder/400/400",
    description: "Adjustable cotton baseball cap",
    tags: ["hat", "cap", "baseball", "accessories"],
    color: "Black",
    material: "Cotton"
  },

  // Home & Garden
  {
    id: "11",
    name: "Coffee Mug",
    category: "Home & Garden",
    brand: "BrewMaster",
    price: 12.99,
    image: mug1,
    description: "Ceramic coffee mug with ergonomic handle",
    tags: ["mug", "coffee", "ceramic", "kitchen"],
    color: "White",
    material: "Ceramic"
  },
  {
    id: "12",
    name: "Throw Pillow",
    category: "Home & Garden",
    brand: "CozyHome",
    price: 34.99,
    image: "/api/placeholder/400/400",
    description: "Soft decorative throw pillow",
    tags: ["pillow", "home", "decor", "comfort"],
    color: "Beige",
    material: "Cotton"
  },
  {
    id: "13",
    name: "Table Lamp",
    category: "Home & Garden",
    brand: "LightWorks",
    price: 89.99,
    image: "/api/placeholder/400/400",
    description: "Modern LED table lamp with touch control",
    tags: ["lamp", "lighting", "led", "modern"],
    color: "Silver"
  },
  {
    id: "14",
    name: "Plant Pot",
    category: "Home & Garden", 
    brand: "GreenSpace",
    price: 18.99,
    image: "/api/placeholder/400/400",
    description: "Ceramic plant pot with drainage",
    tags: ["pot", "plant", "ceramic", "garden"],
    color: "Terracotta",
    material: "Ceramic"
  },
  {
    id: "15",
    name: "Wall Clock",
    category: "Home & Garden",
    brand: "TimeKeeper",
    price: 45.99,
    image: "/api/placeholder/400/400",
    description: "Silent wall clock with modern design",
    tags: ["clock", "wall", "time", "decor"],
    color: "White"
  }
];

// Add more products to reach 50+
const additionalProducts: Product[] = Array.from({ length: 40 }, (_, i) => {
  const categories = ["Electronics", "Fashion", "Home & Garden", "Sports", "Books"];
  const colors = ["Black", "White", "Blue", "Red", "Green", "Gray", "Brown"];
  const category = categories[i % categories.length];
  
  return {
    id: `${16 + i}`,
    name: `Product ${16 + i}`,
    category,
    brand: `Brand${16 + i}`,
    price: Math.floor(Math.random() * 500) + 10,
    image: "/api/placeholder/400/400",
    description: `Description for product ${16 + i}`,
    tags: [category.toLowerCase(), "product", `item${16 + i}`],
    color: colors[i % colors.length]
  };
});

export const allProducts = [...allIndianProducts, ...allExpandedProducts, ...mockProducts, ...additionalProducts];