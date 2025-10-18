export function LoginViewModel({ loginToken, context }) {
  this.username = ko.observable(localStorage.getItem("username") || "");
  this.password = ko.observable("");
  this.isLoading = ko.observable(false);
  this.rememberMe = ko.observable(
    localStorage.getItem("rememberMe") === "true"
  );
  this.errorMessage = ko.observable("");
  this.loginToken = loginToken;
  this.appContext = context;

  this.login = () => {
    const username = this.username();
    const password = this.password();
    const rememberMe = this.rememberMe();

    this.isLoading(true);
    this.errorMessage("");

    if (!username || !password) {
      this.errorMessage("Please type your Username and Password.");
      this.isLoading(false);
      return;
    }

    const BASE_URL = import.meta.env.VITE_SERVER_URL;
    const endpoint = "/login";
    const url = BASE_URL + endpoint;

    $.ajax({
      url: url,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ username, password }), // Send JSON data
      success: (response) => {
        // Success answer and token
        if (response.token) {
          if (rememberMe) {
            localStorage.setItem("rememberMe", "true");
            localStorage.setItem("username", username);
            localStorage.setItem("loginToken", response.token);
          } else {
            localStorage.removeItem("rememberMe");
            localStorage.removeItem("username");
            localStorage.setItem("loginToken", response.token);
          }

          this.loginToken(response.token);
          this.errorMessage("");
          this.username("");
          this.password("");

          this.appContext.redirect("#/products");
        } else {
          this.errorMessage(
            "There as a problem with the request, please try again."
          );
        }
      },
      error: (xhr, status, error) => {
        const {
          responseJSON: { msg },
        } = xhr;
        this.errorMessage(`${msg}`);
      },
      complete: () => {
        this.isLoading(false);
      },
    });
  };
}
