
export function LoginViewModel({loginToken, context}) {
    this.username = ko.observable("");  
    this.password = ko.observable(""); 
    this.mensaje = ko.observable(""); 
    this.isLoading = ko.observable(false); 
    this.rememberMe = ko.observable(false);
    this.errorMessage = ko.observable("");
    this.loginToken = loginToken;
    this.appContext = context
    this.login = () => {
       
        const username = this.username();
        const password = this.password();

      
        this.isLoading(true);  
        this.errorMessage(""); 

       
        if (!username || !password) {
            this.errorMessage("Please type your Username and Password.");
            this.isLoading(false);
            return;
        }

        // Enviar el request POST usando jQuery Ajax
        $.ajax({
            url: "http://vps.churrasco.digital:3000/login",  // URL del endpoint de login
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ username, password }),  // Enviar datos como JSON
            success: (response) => {
                // Si la respuesta es exitosa y contiene un token
                if (response.token) {
                    this.loginToken(response.token);
                    this.errorMessage("");
                    this.username("");
                    this.password("")
                    
                    this.appContext.redirect("#/products")

                } else {
                    this.errorMessage("There as a problem with the request, please try again.");
                }
            },
            error: (xhr, status, error) => {
                const {responseJSON: {msg}} = xhr
               
                // Si ocurre un error en la solicitud
                this.errorMessage(`${msg}`);
            },
            complete: () => {
                
                this.isLoading(false);
            }
        });
    };

    $('body').css('background', 'linear-gradient(to bottom, hsl(246, 39%, 33%), hsl(246, 37%, 20%))');
    $('body').css('background-repeat', 'no-repeat')
}
