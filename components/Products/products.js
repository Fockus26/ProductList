export function ProductsViewModel({loginToken}) {
    
    console.log('queso')
    this.getproducts = () => {
        console.log('hola')
        console.log(loginToken())
    }
}