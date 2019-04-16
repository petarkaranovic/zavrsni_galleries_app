import http from "./http-service";

class AuthService {
  setAuthHeaders(token) {
    if (!token) {
      delete http.defaults.headers.common["Authorization"];
    }
    return (http.defaults.headers.common["Authorization"] = `Bearer ${token}`);
  }
  login(email, password) {
    return http
      .post("auth/login", {
        email,
        password
      })
      .then(response => {
        this.logger(response.data);
        return response;
      });
  }
  logout() {
    return http.get("auth/logout").then(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      this.setAuthHeaders();
    });
  }
  register({
    first_name,
    last_name,
    email,
    password,
    password_confirmation,
    terms
  }) {
    return http
      .post("auth/register", {
        first_name,
        last_name,
        email,
        password,
        password_confirmation,
        terms
      })
      .then(({ data }) => {
        this.logger(data);
        return data;
      })
      .catch(error => Promise.reject(error.response.data.errors));
  }
  logger(data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    this.setAuthHeaders(data.token);
  }
}
const tokenCheck = service => {
  let token = localStorage.getItem("token");
  if (token) {
    service.setAuthHeaders(token);
  }
};

const authService = new AuthService();
tokenCheck(authService);
export default authService;
