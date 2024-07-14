import "./login.scss";
import { Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigeat = useNavigate();

  const {updateUser} = useContext(AuthContext);


  const handleSumbit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      setIsLoading(true);
      const res = await apiRequest.post("/auth/login", data);
      // localStorage.setItem("user", JSON.stringify(res.data.userInfo));
      updateUser(res.data.userInfo);
      console.log(res.data.message);
      navigeat("/profile");
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSumbit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          {error && <span className="error">{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
