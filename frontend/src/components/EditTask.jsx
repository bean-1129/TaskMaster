import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState(1);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [status, setStatus] = useState("pending");
    const { id } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`https://taskmaster-bb5b.onrender.com/api/tasks/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch task");

                const task = await response.json();
                setTitle(task.title);
                setPriority(task.priority);
                setStatus(task.status);

                const formatDate = (isoDate) => {
                    const date = new Date(isoDate);
                    const yyyy = date.getFullYear();
                    const mm = String(date.getMonth() + 1).padStart(2, "0");
                    const dd = String(date.getDate()).padStart(2, "0");
                    const hh = String(date.getHours()).padStart(2, "0");
                    const min = String(date.getMinutes()).padStart(2, "0");
                    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
                };

                setStartTime(formatDate(task.startTime));
                setEndTime(formatDate(task.endTime));
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchTask();
    }, [id]); 
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedTask = {
            title,
            priority,
            startTime,
            endTime,
            status,
        };

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`https://taskmaster-bb5b.onrender.com/api/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedTask),
            });

            if (!response.ok) throw new Error("Failed to update task");

            alert("Task updated successfully!");
            navigate("/taskList");
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleCancel = () => {
        navigate("/taskList"); // Redirect to task list if cancel is clicked
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label htmlFor="priority" className="block text-sm font-medium">Priority (1-5)</label>
                    <input
                        type="number"
                        id="priority"
                        min="1"
                        max="5"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label htmlFor="startTime" className="block text-sm font-medium">Start Time</label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label htmlFor="endTime" className="block text-sm font-medium">End Time</label>
                    <input
                        type="datetime-local"
                        id="endTime"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label htmlFor="status" className="block text-sm font-medium">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="pending">Pending</option>
                        <option value="finished">Finished</option>
                    </select>
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Update Task
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTask;
