import { useState } from "react";
import {register} from "../api/user";

export const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "",username:""});
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async () => {
    setError(null);
    setSuccessMessage(null);

    if (formData.username === "") {
      setError("username is required!");
      return;
    }
    if (formData.email === "") {
      setError("Email is required!");
      return;
    }

    if (formData.password === "") {
      setError("Password is required!");
      return;
    }

    try {
      const data = await register(formData);
      setSuccessMessage(data.message);
      setFormData({ email: "", password: "",username:""});
    } catch (err) {
      setError(err.message || "An error occurred during registration.");
    }
  };

  return (
    <div className="my-20 flex justify-center items-center">
      <div className="bg-slate-200 flex flex-col w-1/2 p-10 rounded-xl">
        <p className="text-2xl">Register</p>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

        <input
          type="text"
          name="username"
          placeholder="username"
          className="m-2 p-2 rounded text-lg"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="m-2 p-2 rounded text-lg"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="m-2 p-2 rounded text-lg"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <button
          className="bg-blue-300 m-2 p-2 rounded text-xl text-white hover:bg-blue-400"
          onClick={handleSubmit}
        >
          Register
        </button>
      </div>
    </div>
  );
};
