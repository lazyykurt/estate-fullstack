import "./register.scss";
import { Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigeat = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    }

    try {
      setIsLoading(true);
      await apiRequest.post("/auth/register", data);
      navigeat("/login");
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSumbit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          {error && <span className="error">{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
