# 🛍️ ProductList – SPA Challenge

**English**

A single-page application (SPA) built with Knockout.js, Sammy.js, and Bootstrap as part of a coding challenge. The app allows users to log in, view a product list, and add new products.

**Español**

Una aplicación de una sola página (SPA) desarrollada con Knockout.js, Sammy.js y Bootstrap como parte de un reto técnico. La app permite a los usuarios iniciar sesión, visualizar una lista de productos y agregar nuevos productos.

---

## 🌍 Overview / Descripción

**English**

ProductList was developed as part of a job interview challenge, achieving second place in the final results. The goal was to design a functional SPA with authentication, product listing, and product creation features. Routing is handled by Sammy.js, data binding by Knockout.js, and styling by Bootstrap and custom CSS.

**Español**

ProductList fue desarrollado como parte de un reto para una entrevista de trabajo, alcanzando el segundo lugar en los resultados finales. El objetivo era crear una SPA funcional con autenticación, listado de productos y formulario de creación de productos. El enrutamiento está gestionado con Sammy.js, el data binding con Knockout.js, y el estilo con Bootstrap y CSS personalizado.

---

## ✨ Features / Características

**English**

- 👤 Login system with token-based authentication

- 📦 Product listing for authenticated users

- ➕ Product creation form with validation

- 🔀 Routing handled by Sammy.js (#/products, #/create)

- 🎨 Responsive UI with Bootstrap + custom CSS

- ⚡ Lightweight and modular SPA architecture

**Español**

- 👤 Sistema de login con autenticación basada en token

- 📦 Listado de productos disponible para usuarios autenticados

- ➕ Formulario de creación de productos con validación

- 🔀 Ruteo manejado con Sammy.js (#/products, #/create)

- 🎨 Interfaz responsiva con Bootstrap + CSS personalizado

- ⚡ Arquitectura SPA ligera y modular

---

## 🛠️ Tech Stack / Tecnologías

- **Framework:** Knockout.js

- **Routing:** Sammy.js

- **Styling:** Bootstrap + CSS

- **Helpers:** jQuery para operaciones de datos

- **Bundler:** Vite

---

## 📂 Project Structure / Estructura del Proyecto

```text
app/
 ├── components/
 │   ├── Login/
 │   │   ├── login.html
 │   │   └── login.js
 │   ├── Products/
 │   │   ├── products.html
 │   │   └── products.js
 │   └── Create/
 │       ├── index.html
 │       └── index.js
 ├── styles.css
 ├── app.js
 └── index.html
package.json
```

---

## ⚙️ Installation & Setup / Instalación y Configuración

### Requirements / Requisitos

- Node.js (v14 o superior)

- npm (v6 o superior)

### Clone repo / Clonar repositorio
```bash
git clone https://github.com/tu-org/productlist.git
cd productlist
```

### Install dependencies / Instalar dependencias
```bash
npm install
```

### Run in development / Ejecutar en desarrollo
```bash
npm run dev
```

Default server: http://localhost:5173

---

## 📖 Case Study / Estudio de Caso

**English**

This project was completed as a coding challenge for a job interview, where I finished second place. It showcased my ability to quickly design a modular SPA using Knockout.js, implement token-based authentication, and integrate routing with Sammy.js.

**Español**

Este proyecto fue realizado como parte de un reto técnico en una entrevista de trabajo, donde obtuve el segundo lugar. Demostró mi capacidad para diseñar rápidamente una SPA modular con Knockout.js, implementar autenticación con tokens e integrar enrutamiento con Sammy.js.

---

### 📈 Future Improvements / Mejoras Futuras

**English**

- 🔐 Add password recovery and better session handling

- 📊 Integrate product persistence with a backend API

- 🧪 Add unit tests for components

- 🌐 Deploy demo version online

**Español**

- 🔐 Agregar recuperación de contraseña y mejor manejo de sesión

- 📊 Integrar persistencia de productos con una API backend

- 🧪 Agregar pruebas unitarias para componentes

- 🌐 Desplegar versión demo en línea

---

## 📜 License / Licencia

**English**

This project is licensed under the MIT License – you are free to use, modify, and distribute it with proper attribution.

**Español**

Este proyecto está licenciado bajo la Licencia MIT – eres libre de usarlo, modificarlo y distribuirlo con la debida atribución.
