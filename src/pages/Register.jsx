import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/register", {
        email,
        password,
      });
      toast.success("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      toast.error("Đăng ký thất bại!");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Đăng ký</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="border w-full p-2 rounded"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Mật khẩu"
          className="border w-full p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded w-full"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
