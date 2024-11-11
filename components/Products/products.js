import { Product } from "./product"

export function ProductsViewModel({authToken}) {

    this.productList = ko.observableArray([])
    this.authToken = authToken
    this.getData = function(token) {
       
        $.ajax({
            url: "http://vps.churrasco.digital:3000/products", 
            method: "GET",
            contentType: "application/json",
            headers: {'Authorization': 'Bearer ' + token},
            success: (response) => {
               
                if (response) {
                    console.log("response", response)
                   const productsMap = response.map(({ name, description, price, sku, currency, pictures }) => new Product({ name, description, price, sku, currency, pictures }))
                   this.productList(productsMap)
                } 
            },
            error: ({error}) => {
                console.log("error", error)
              
            },
            complete: () => {
               
            },
        });
    }
  
    this.getData(this.authToken())
}
