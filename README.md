# 🛍️ ProductList – SPA Challenge

A single-page application (SPA) built with Knockout.js, Sammy.js, and Bootstrap as part of a coding challenge. Users can log in, view a product list, and add new products.

---

## 🌍 Overview

ProductList was developed as part of a job interview challenge, achieving second place in the final results. The goal was to design a functional SPA with authentication, product listing, and product creation features.  

Routing is handled by Sammy.js, data binding by Knockout.js, and styling by Bootstrap with custom CSS.

---

## ✨ Features

- 👤 Login system with token-based authentication  
- 📦 Product listing for authenticated users  
- ➕ Product creation form with validation  
- 🔀 Routing handled by Sammy.js (`#/products`, `#/create`)  
- 🎨 Responsive UI with Bootstrap + custom CSS  
- ⚡ Lightweight and modular SPA architecture  

---

## 🛠 Tech Stack

- **Framework:** Knockout.js  
- **Routing:** Sammy.js  
- **Styling:** Bootstrap + CSS  
- **Helpers:** jQuery for data operations  
- **Bundler:** Vite  

---

## 📂 Project Structure

```text
app/
 ├── components/
 │   ├── Login/
 │   │ ├── login.html
 │   │ └── login.js
 │   ├── Products/
 │   │ ├── products.html
 │   │ └── products.js
 │   └── Create/
 │       ├── index.html
 │       └── index.js
 ├── styles.css
 ├── app.js
 └── index.html
package.json
```
---

## 📸 Showcase
_(Screenshots, GIFs, or demo videos will be added here)_

---

## ⚙️ Installation & Setup

### Requirements
- Node.js (v14 or higher)
- npm (v6 or higher)

### Clone repo
```bash
git clone https://github.com/tu-org/productlist.git
cd productlist
```

### Install dependencies
```bash
npm install
```

### Run in development
```bash
npm run dev
```

Default server: http://localhost:5173

---

## 📖 Case Study

ProductList was completed as a coding challenge for a job interview, achieving second place. It demonstrated the ability to quickly design a modular SPA using Knockout.js, implement token-based authentication, and integrate routing with Sammy.js.

---

## 📈 Future Improvements

- 🔐 Add password recovery and improved session handling
- 📊 Integrate product persistence with a backend API
- 🧪 Add unit tests for components
- 🌐 Deploy demo version online
