import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const handleGetStarted = () => {
        navigate('/dashboard'); 
    };

    return (
        <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute w-96 h-96 bg-blue-300 opacity-20 rounded-full blur-3xl top-20 left-10 animate-pulse"></div>
                <div className="absolute w-80 h-80 bg-pink-300 opacity-20 rounded-full blur-3xl bottom-20 right-10 animate-pulse delay-1500"></div>
                <div className="absolute w-72 h-72 bg-purple-300 opacity-20 rounded-full blur-3xl top-32 right-20 animate-pulse delay-3000"></div>
            </div>

            <div className="relative z-10 text-center px-6">
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                    Welcome to <span className="text-yellow-300">TaskMaster</span>
                </h1>
                <p className="mt-4 text-lg md:text-2xl text-gray-100 max-w-2xl mx-auto">
                    TaskMaster helps you manage, prioritize, and track your tasks effortlessly. Organize your day with ease and achieve your goals faster.
                </p>
                <div className="mt-8">
                    <button
                        onClick={handleGetStarted} 
                        className="px-8 py-4 bg-yellow-300 text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
