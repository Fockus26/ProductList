import LoginTemplate from "./components/Login/login.html"
import { LoginViewModel } from "./components/Login/login.js";
import ProductsTemplate from "./components/Products/products.html"
import { ProductsViewModel } from "./components/Products/products.js";
import "./styles.css"

 function AppViewModel() {
    this.loginToken = ko.observable("");

    // localStorage.removeItem("isLogged");
    const appModel = this
    this.router = Sammy(function () {
        // Ruta de Login
        this.get('/', (context) => {
            context.swap(LoginTemplate);
            ko.applyBindings(new LoginViewModel({loginToken: appModel.loginToken, context: context})); // Aplicar bindings de Knockout.js
        });

        // Ruta de Products
        this.get('#/products', (context) => {
            if (appModel.loginToken()) {
                context.swap(ProductsTemplate); // Cargar el template de Products
                ko.applyBindings(new ProductsViewModel({loginToken: appModel.loginToken})); // Aplicar bindings de Knockout.js
                // Aplicar bindings de Knockout.js para Products
            } else {
                context.redirect('#/'); // Redirigir al login si no está logueado
            }
        });
    });

    // Iniciar Sammy.js y ejecutar la aplicación
    this.router.run('/');
}

new AppViewModel()

