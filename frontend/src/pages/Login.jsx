import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlashCard } from "../components/FlashCardProvider"; 

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { showFlashCard } = useFlashCard(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://taskmaster-bb5b.onrender.com/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            localStorage.setItem("token", data.token);
            showFlashCard("Login successful!", "success");
            // console.log(data.token);
            navigate("/dashboard");
            // window.location.reload();
        } catch (err) {
            setError(err.message);
            showFlashCard(err.message, "error"); 
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleLogin}>
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>
                <p className="text-sm mt-3 text-center">
                    Don't have an account? <a href="/register" className="text-blue-500">Register</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
