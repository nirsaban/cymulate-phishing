import { useState, useContext } from "react";
import { login } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: saveToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e: any) => {
  e.preventDefault();
  try {
    const res = await login(email, password);
    saveToken(res.data.token);
    navigate("/dashboard");
  } catch (err) {
    console.error(err)
  }
};


  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <button>Login</button>
      </form>

      <div className="link">
        <Link to="/register">Don't have an account? Register</Link>
      </div>
    </div>
  );
}
