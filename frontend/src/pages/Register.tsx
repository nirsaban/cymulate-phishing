import { useState } from "react";
import { register } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e: any) => {
  e.preventDefault();
  try {
    await register(email, password);
    alert("Registration successful!");
    navigate("/login");
  } catch (err) {
   console.error(err)
  }
};

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <button>Register</button>
      </form>

      <div className="link">
        <Link to="/login">Already have an account? Login</Link>
      </div>
    </div>
  );
}
