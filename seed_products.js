const products = [
  {
    name: "LEORA Signature Hoodie",
    description: "A premium heavy-weight cotton hoodie featuring a subtle embroidered logo. Perfect for everyday wear.",
    price: 3499.00,
    stockQuantity: 50
  },
  {
    name: "Cyber-Mesh Runner Sneakers",
    description: "Lightweight and breathable sneakers with neon accents and a comfortable foam sole.",
    price: 5999.00,
    stockQuantity: 120
  },
  {
    name: "Minimalist Tech Backpack",
    description: "Water-resistant backpack with smart compartments for your laptop and daily essentials.",
    price: 4500.00,
    stockQuantity: 35
  },
  {
    name: "Midnight Cargo Pants",
    description: "Utility meets aesthetic. High-quality cargo pants with adjustable straps and deep pockets.",
    price: 2899.00,
    stockQuantity: 75
  },
  {
    name: "Neon-Edge Aviator Glasses",
    description: "Classic aviator sunglasses updated with a futuristic neon rim and UV protection.",
    price: 1599.00,
    stockQuantity: 200
  },
  {
    name: "Oversized Graphic Tee",
    description: "100% organic cotton tee with a bold, cyber-inspired graphic print on the back.",
    price: 1299.00,
    stockQuantity: 80
  },
  {
    name: "Quantum Smart Watch",
    description: "A sleek, dark-mode default smartwatch tracking your daily metrics with a glowing interface.",
    price: 12999.00,
    stockQuantity: 15
  },
  {
    name: "LEORA Essential Beanie",
    description: "Stay warm while looking cool. A soft knit beanie available in dark ash.",
    price: 799.00,
    stockQuantity: 150
  },
  {
    name: "Tactical Crossbody Bag",
    description: "Compact crossbody bag made from durable ballistic nylon. Perfect for city exploration.",
    price: 1899.00,
    stockQuantity: 60
  }
];

async function seedProducts() {
  console.log("Starting to seed products...");
  for (const product of products) {
    try {
      const response = await fetch("http://localhost:8080/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });
      
      if (response.ok) {
        console.log(`✅ Successfully added: ${product.name}`);
      } else {
        const text = await response.text();
        console.error(`❌ Failed to add ${product.name}: ${response.status} ${text}`);
      }
    } catch (error) {
      console.error(`❌ Network error for ${product.name}: ${error.message}`);
    }
  }
  console.log("Finished seeding!");
}

seedProducts();
