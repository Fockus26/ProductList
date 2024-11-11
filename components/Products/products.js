export function ProductsViewModel({isLogged, context}) {
    this.appContext = context

    this.logout = () => {
        isLogged(false);
        localStorage.setItem("isLogged", "false");
        this.appContext.redirect("#/")
    }
}