import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task, serialNumber }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        const response = await fetch(`https://taskmaster-bb5b.onrender.com/api/tasks/${task._id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (response.ok) {
            window.location.reload();
        }
    };

    const handleEdit = () => {
        navigate(`/editTask/${task._id}`);
    };

    return (
        <div className="task-card-container">
            <div className="task-card">
                <div className="front">
                <p className="text-gray-500">Task ID: {serialNumber}</p> 
                    <h3 className="font-semibold text-xl">{task.title}</h3>
                    <p>Priority: {task.priority}</p>
                    <p className={`status ${task.status === 'pending' ? 'text-red-500' : 'text-green-500'}`}>
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </p>
                </div>
                <div className="back">
                    <p>Start Date: {new Date(task.startTime).toLocaleString()}</p>
                    <p>End Date: {new Date(task.endTime).toLocaleString()}</p>
                    <button
                        onClick={handleEdit}
                        className="bg-yellow-500 text-white p-2 mt-2"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white p-2 mt-2 ml-2"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
