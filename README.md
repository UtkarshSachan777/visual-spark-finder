# Visual Product Matcher

A responsive web application that allows users to upload an image (via file upload or URL) and receive a curated list of visually similar products.

---

## 🚀 Live Demo

Check out the app here: **[Insert Your Live App URL Here]**

---

## ✨ Features

- Upload an image via file upload or provide a URL.  
- View the uploaded image directly on the interface.  
- Display visually similar products from a dataset of 50+ items.  
- Filter results based on similarity score.  
- Responsive design for seamless use on both desktop and mobile devices.  
- Smooth UX with loading states and error handling.  

---

## 🛠 Tech Stack

- **Frontend**: React (with Vite) & TypeScript  
- **UI**: Tailwind CSS + shadcn-ui components  
- **Image Processing**: Pre-trained model (e.g., CLIP / ResNet) for embeddings + cosine similarity ranking  
- **Hosting**: Deployed on a free hosting platform (e.g., Vercel / Netlify / Render)  

---

## 📂 Project Structure

├── public/ # Static assets & public files
├── src/ # Main source code
│ ├── components/ # Reusable UI components
│ ├── pages/ # Views and routes
│ └── utils/ # Helper functions (e.g., similarity, API calls)
├── supabase/ # If using Supabase for backend/data
├── README.md # You're here
├── package.json # Project metadata & dependencies
└── tailwind.config.ts


---

## ⚙️ Local Setup & Development

1. Clone the repository:  
   ```bash
   git clone https://github.com/UtkarshSachan777/visual-product-matcher.git
   cd visual-product-matcher

   📖 Technical Approach

The Visual Product Matcher ingests an image (either uploaded or via URL) and processes it through a pre-trained image embedding model to generate feature vectors. The same process is applied to a curated product dataset containing images and metadata. Cosine similarity between embeddings ranks visual similarity.

The frontend, built with React, Vite, TypeScript, and styled using Tailwind CSS and shadcn-ui, allows users to view their uploaded image, browse similar products, and filter by similarity. Loading states and basic error handling ensure smooth UX, and the design is fully responsive for mobile devices.

The application is deployed on a free hosting platform for accessibility. The codebase is modular and maintainable, with clear separation between UI, logic, and API layers. Inline comments and documentation explain the methodology and setup steps.
