import { useEffect, useState } from "react";
import { useFlashCard } from "../components/FlashCardProvider";

const Dashboard = () => {
    const { showFlashCard } = useFlashCard();
    const [stats, setStats] = useState(null);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("https://taskmaster-bb5b.onrender.com/api/auth/profile", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUserName(userData.name);
                } else if (response.status === 401) {
                    showFlashCard("Please login to access the dashboard.", "warning");
                } else {
                    showFlashCard("Failed to fetch user data.", "error");
                }
            } catch (error) {
                showFlashCard("Network error occurred.", "error");
            }
        };

        const fetchStats = async () => {
            try {
                const response = await fetch("https://taskmaster-bb5b.onrender.com/api/dashboard/stats", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                } else {
                    showFlashCard("Failed to fetch dashboard stats.", "error");
                }
            } catch (error) {
                showFlashCard("Network error occurred.", "error");
            }
        };

        fetchUserData();
        fetchStats();
    }, [showFlashCard]);

    if (!stats) return <div>Loading...</div>;

    // Safeguards for stats
    const totalTasks = stats.totalTasks || 0;
    const completedTasksPercentage = stats.completedPercentage ?? 0; // Default to 0 if undefined
    const pendingTasksPercentage = stats.pendingPercentage ?? 0; // Default to 0 if undefined
    const averageActualTime = stats.averageActualTime ?? 0; // Default to 0 if undefined
    const timeLapsedAndBalance = stats.timeLapsedAndBalance?.priority || {}; // Default to empty object

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded shadow-md">
                <div className="mb-4 text-center">
                    <h1 className="text-3xl font-bold text-gray-700">
                        Hello, {userName ? userName : "User"}! Welcome to your Dashboard
                    </h1>
                </div>

                <h2 className="text-3xl font-semibold mb-4 text-center">Task Dashboard</h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
                        <p className="text-5xl font-bold text-green-500">{totalTasks}</p>
                        <p className="text-sm text-gray-600 mt-2">Total Tasks</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-green-100 rounded-lg shadow-md">
                        <p className="text-5xl font-bold text-green-700">{completedTasksPercentage.toFixed(2)}%</p>
                        <p className="text-sm text-gray-600 mt-2">Completed Tasks</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-red-100 rounded-lg shadow-md">
                        <p className="text-5xl font-bold text-red-700">{pendingTasksPercentage.toFixed(2)}%</p>
                        <p className="text-sm text-gray-600 mt-2">Pending Tasks</p>
                    </div>
                </div>

                <div className="mt-6 flex justify-center">
                    <div className="flex flex-col items-center p-4 bg-blue-100 rounded-lg shadow-md">
                        <p className="text-5xl font-bold text-blue-700">{averageActualTime.toFixed(2)}</p>
                        <p className="text-sm text-gray-600 mt-2">Avg. Time to Complete (hrs)</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="font-semibold text-xl text-center mb-4">Task Completion Overview</h3>
                    <div className="flex flex-col justify-center space-y-4" style={{ alignItems: 'center' }}>
                        <div className="w-1/2 bg-gray-200 rounded-full h-6 mb-4">
                            <div
                                className="bg-green-500 h-6 rounded-full"
                                style={{ width: `${completedTasksPercentage}%` }}
                            ></div>
                        </div>
                        <p className="text-center text-xl text-green-700">{completedTasksPercentage.toFixed(2)}% Completed</p>

                        <div className="w-1/2 bg-gray-200 rounded-full h-6 mb-4">
                            <div
                                className="bg-red-500 h-6 rounded-full"
                                style={{ width: `${pendingTasksPercentage}%` }}
                            ></div>
                        </div>
                        <p className="text-center text-xl text-red-700">{pendingTasksPercentage.toFixed(2)}% Pending</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="font-semibold text-lg text-center mb-6">Pending Tasks Time Analysis</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.keys(timeLapsedAndBalance).map((priority) => {
                            const { timeLapsed = 0, balanceTime = 0 } = timeLapsedAndBalance[priority] || {};
                            return (
                                <div
                                    key={priority}
                                    className="bg-white shadow-md rounded-lg p-6 border border-gray-200 flex flex-col items-center"
                                >
                                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Priority: {priority}</h4>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Time Lapsed:</span> {timeLapsed.toFixed(2)} hrs
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Balance Time:</span> {balanceTime.toFixed(2)} hrs
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
