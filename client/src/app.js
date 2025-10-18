import LoginTemplate from "./components/Login/login.html?raw";
import ProductsTemplate from "./components/Products/products.html?raw";
import CreateTemplate from "./components/Create/create.html?raw";

import { LoginViewModel } from "./components/Login/login.js";
import { ProductsViewModel } from "./components/Products/products.js";
import { CreateViewModel } from "./components/Create/create.js";

import "./styles.css";

console.log("app.js running", {
  ko: typeof ko,
  jQuery: typeof jQuery,
  $: typeof $,
  Sammy: typeof Sammy,
});

if (typeof ko === "undefined") {
  console.error(
    "KO (knockout) is undefined. Make sure knockout is loaded before the bundle."
  );
}

function AppViewModel() {
  this.loginToken = ko.observable(localStorage.getItem("loginToken") || "");
  this.allProducts = ko.observableArray([]);
  const appModel = this;
  this.router = Sammy(function () {
    // Main Route

    this.get("/", (context) => {
      context.swap(LoginTemplate);
      ko.applyBindings(
        new LoginViewModel({
          loginToken: appModel.loginToken,
          context: context,
        }),
        $("#login")[0]
      );
    });

    // Products Route
    this.get("#/products", (context) => {
      if (appModel.loginToken()) {
        context.swap(ProductsTemplate);

        ko.applyBindings(
          new ProductsViewModel({
            authToken: appModel.loginToken,
            context,
            products: appModel.allProducts,
          }),
          $("#products")[0]
        );
      } else {
        context.redirect("/");
      }
    });

    // Create Route
    this.get("#/create", (context) => {
      if (appModel.loginToken()) {
        context.swap(CreateTemplate);

        ko.applyBindings(
          new CreateViewModel({
            authToken: appModel.loginToken,
            context,
            products: appModel.allProducts,
          }),
          $("#create")[0]
        );
      } else {
        context.redirect("/");
      }
    });
  });

  this.router.run("/");
}

new AppViewModel();
