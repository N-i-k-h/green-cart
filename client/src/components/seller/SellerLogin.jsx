import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      console.log("Attempting to log in with:", { email, password }); // Log credentials
      const { data } = await axios.post('/api/seller/login', { email, password });
      console.log("Login response:", data); // Log response
      if (data.success) {
        setIsSeller(true);
        localStorage.setItem('isSeller', 'true');
        navigate("/seller/add-product");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error); // Log error
      toast.error(error.response?.data?.message || error.message || "An error occurred during login");
    }
  };

  useEffect(() => {
    const savedIsSeller = localStorage.getItem('isSeller');
    if (savedIsSeller === 'true') {
      setIsSeller(true);
      navigate("/seller/add-product");
    }
  }, [isSeller, navigate, setIsSeller]);

  return (
    !isSeller && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex items-center justify-center text-sm text-gray-600"
      >
        <div className="flex flex-col gap-5 items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
          <p className="text-2xl font-medium m-auto">
            <span className="text-primary">Seller</span> Login
          </p>

          <div className="w-full">
            <p>Email</p>
            <input
              type="email"
              placeholder="enter your email"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="w-full">
            <p>Password</p>
            <input
              type="password"
              placeholder="enter your password"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Login
          </button>
        </div>
      </form>
    )
  );
};

export default SellerLogin;
