import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState(1);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [status, setStatus] = useState("pending");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = {
            title,
            priority,
            startTime,
            endTime,
            status,
        };

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("https://taskmaster-bb5b.onrender.com/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) throw new Error("Failed to create task");

            alert("Task created successfully!");
            navigate("/taskList");
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleCancel = () => {
        navigate("/taskList");
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Create Task</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter task title"
                    />
                </div>

                <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                        Priority (1-5)
                    </label>
                    <input
                        type="number"
                        id="priority"
                        min="1"
                        max="5"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                        Start Time
                    </label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                        End Time
                    </label>
                    <input
                        type="datetime-local"
                        id="endTime"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                    </label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="pending">Pending</option>
                        <option value="finished">Finished</option>
                    </select>
                </div>

                <div className="flex justify-between items-center">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Create Task
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTask;
