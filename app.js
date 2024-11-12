import LoginTemplate from "./components/Login/login.html"
import ProductsTemplate from "./components/Products/products.html"
import CreateTemplate from "./components/Create/index.html"
import { LoginViewModel } from "./components/Login/login.js";
import { ProductsViewModel } from "./components/Products/products.js";
import 
import "./styles.css"
import { CreateViewModel } from "./components/Create/index.js";

 function AppViewModel() {
    this.loginToken = ko.observable("");

    const appModel = this
    this.router = Sammy(function () {
        
        this.get('/', (context) => {
            context.swap(LoginTemplate);    
    
            ko.applyBindings(new LoginViewModel({ loginToken: appModel.loginToken, context: context }));
        });
    
        // Ruta de Products
        this.get('#/products', (context) => {
            
            if (appModel.loginToken()) {
                
            
                context.swap(ProductsTemplate);
    
                const productsElement = context.$element()[0]; // Obtener el nodo DOM donde se aplicarán los bindings
                ko.cleanNode(productsElement);
    
                ko.applyBindings(new ProductsViewModel({ authToken: appModel.loginToken }));
               
            } else {
                console.log('No token found, redirecting to login...');
               
                context.redirect('/');
            }
        });


          // Ruta de Products
          this.get('#/addproduct', (context) => {
            
            if (appModel.loginToken()) {
                 
                context.swap(CreateTemplate);
    
                const productsElement = context.$element()[0]; // Obtener el nodo DOM donde se aplicarán los bindings
                ko.cleanNode(productsElement);
    
                ko.applyBindings(new CreateViewModel({ authToken: appModel.loginToken }));
               
            } else { 
                context.redirect('/');
            }
        });

    });
    
    this.router.run('/');
}

new AppViewModel()

