# Single Page Application with Knockout.js, Sammy, and Bootstrap

This project is a SPA (Single Page Application) built with **Knockout.js** for data binding, **Sammy** for routing, **Bootstrap** and **CSS** for styling, and **jQuery** for handling some data operations. The application includes three main views:

1. **Login**: Login form.
2. **Products**: Displays a list of products.
3. **Create**: Form to add new products.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Component Description](#component-description)
- [Routes](#routes)
- [Styling](#styling)
- [Libraries and Tools](#libraries-and-tools)
- [Authors](#authors)

---

### Requirements

To run this project locally, you need:

- **Node.js** (version 14 or higher)
- **npm** (version 6 or higher)

### Installation

In your terminal follow this steps.

1. Install dependencies using npm install
2. Run server using npm run dev.

### Project Structure

├── app/
│   ├── components/
│   │   ├── Login/
│   │   │   ├── login.html
│   │   │   └── login.js
│   │   ├── Products/
│   │   │   ├── products.html
│   │   │   └── products.js
│   │   └── Create/
│   │       ├── index.html
│   │       └── index.js
│   ├── styles.css
│   ├── app.js
│   └── index.html
└── package.json


### Component Description

- Login Component

File: /components/Login/login.js
Description: Displays a basic login form where users can enter their credentials. Upon successful login, the user receives a token (loginToken) that grants access to other routes.
Interface: HTML with Knockout.js for data-binding and Bootstrap for styling.
Products Component

- Products Component

File: /components/Products/products.js
Description: Displays a list of products retrieved from an API or local data source. Access to this view is restricted to authenticated users.
Interface: HTML with Knockout.js for data binding and Bootstrap for styling.
Create Component

- Create Component

 -File: /components/Create/index.js
Description: Provides a form to add new products to the list. This view is also restricted to authenticated users.
Interface: HTML with Knockout.js and jQuery for data submission, with Bootstrap for styling.
Routes
The routing is managed by Sammy and defined in the app.js file within the AppViewModel function. Below are the main application routes:

### Routes

#/products: Displays the list of products. Requires authentication.
#/create: Displays the form to add new products. Requires authentication.
Usage Example
After opening the app, start with the Login view where you enter your credentials.
Once authenticated, navigate to the Products view to see the list of available products.
Use the Create view to add new products to the list.


### Styling
The project uses Bootstrap and custom CSS for responsive layouts and styling. Each component has its HTML structure defined in separate files (.html) for better modularity, styled using both Bootstrap classes and additional CSS.


### Libraries and Tools
Knockout.js - For declarative data binding.
Sammy - For routing and navigation.
Bootstrap - For styling and layout.
jQuery - For handling data operations and some DOM manipulations.
Vite - For bundling and serving the application during development.



### Authors

Cesar Leon - Front End Developer - 
Mail: kaos4everl@gmail.com
Linkedin: https://www.linkedin.com/in/cesar-leon-634940236/