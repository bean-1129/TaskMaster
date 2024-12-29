import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
        setIsDrawerOpen(false); 
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    return (
        <header className="bg-blue-600 text-white shadow-md">
            <nav className="container mx-auto flex items-center justify-between px-4 py-3">
                <div className="text-2xl font-bold">
                    <NavLink to="/" className="hover:text-blue-200">
                        TaskMaster
                    </NavLink>
                </div>

                <div className="md:hidden">
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="text-2xl focus:outline-none"
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                </div>

                <div className="hidden md:flex space-x-6">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `text-lg hover:text-blue-200 ${isActive ? 'font-bold underline' : ''}`
                        }
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/taskList"
                        className={({ isActive }) =>
                            `text-lg hover:text-blue-200 ${isActive ? 'font-bold underline' : ''}`
                        }
                    >
                        Task List
                    </NavLink>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                        >
                            Log Out
                        </button>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md transition"
                            >
                                Log In
                            </NavLink>
                            <NavLink
                                to="/register"
                                className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md transition"
                            >
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>

            {isDrawerOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-50"
                    onClick={() => setIsDrawerOpen(false)}
                >
                    <div
                        className="fixed left-0 top-0 h-full w-3/4 bg-blue-700 text-white p-6 space-y-6"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <button
                            onClick={() => setIsDrawerOpen(false)}
                            className="text-xl mb-4"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                        <NavLink
                            to="/dashboard"
                            onClick={() => setIsDrawerOpen(false)}
                            className={({ isActive }) =>
                                `text-lg hover:text-blue-300 block ${isActive ? 'font-bold underline' : ''}`
                            }
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/taskList"
                            onClick={() => setIsDrawerOpen(false)}
                            className={({ isActive }) =>
                                `text-lg hover:text-blue-300 block ${isActive ? 'font-bold underline' : ''}`
                            }
                        >
                            Task List
                        </NavLink>

                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition w-full text-left"
                            >
                                Log Out
                            </button>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    onClick={() => setIsDrawerOpen(false)}
                                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md transition block"
                                >
                                    Log In
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    onClick={() => setIsDrawerOpen(false)}
                                    className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md transition block"
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
