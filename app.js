import LoginTemplate from "./components/Login/login.html"
import ProductsTemplate from "./components/Products/products.html"
import CreateTemplate from "./components/Create/index.html"
import { LoginViewModel } from "./components/Login/login.js";
import { ProductsViewModel } from "./components/Products/products.js";
import "./styles.css"
import { CreateViewModel } from "./components/Create/index.js";

 function AppViewModel() {
    this.loginToken = ko.observable("");
    this.allProducts = ko.observableArray([])
    const appModel = this
    this.router = Sammy(function () {
        
        // Main Route

        this.get('/', (context) => {
            context.swap(LoginTemplate);    
            ko.applyBindings(new LoginViewModel({ loginToken: appModel.loginToken, context: context }), $("#login")[0]);
        });
    
        // Products Route
        this.get('#/products', (context) => {
            
            if (appModel.loginToken()) {
                
            
                context.swap(ProductsTemplate);
    
                ko.applyBindings(new ProductsViewModel({ authToken: appModel.loginToken, context, products:appModel.allProducts }), $("#products")[0]);
               
            } else {
                context.redirect('/');
            }
        });


          // Create Route
          this.get('#/create', (context) => {
            
            if (appModel.loginToken()) {
                 
                context.swap(CreateTemplate)
    
                ko.applyBindings(new CreateViewModel({ authToken: appModel.loginToken, context, products:appModel.allProducts  }),$("#create")[0]);
               
            } else { 
                context.redirect('/');
            }
        });

    });
    
    this.router.run('/');
}

new AppViewModel()

