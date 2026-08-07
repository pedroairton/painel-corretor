import { Building } from "lucide-react";
import "./Login.scss";
import { useState } from "react";
import { authService } from "../../services/auth.service";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const response = await authService.login(email, password);
      console.log(response);
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("auth_user", JSON.stringify(response.user));
      alert(response.message);
      window.location.href = "/home";
    } catch (error) {
      console.error("Error ao fazer login:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <article className="page-login">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="img-logo">
            <Building size={96} color="white" />
            <h1>Painel do Corretor</h1>
          </div>
          <div className="input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Digite seu Email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              placeholder="Digite sua Senha"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
      </article>
    </>
  );
};
