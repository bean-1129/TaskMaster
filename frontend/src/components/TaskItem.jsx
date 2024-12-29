import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Importing icons

const TaskItem = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [sortFilter, setSortFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [tasksPerPage] = useState(10); 

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found, authorization denied");
                    return;
                }

                const response = await fetch(`https://taskmaster-bb5b.onrender.com/api/tasks?page=${currentPage}&limit=${tasksPerPage}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setTasks(data.tasks); 
                setTotalPages(data.totalPages); 
                setFilteredTasks(data.tasks); 
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, [currentPage, tasksPerPage]);

    useEffect(() => {
        let filtered = tasks;

        if (statusFilter !== 'all') {
            filtered = filtered.filter((taskItem) => taskItem.status === statusFilter);
        }

        if (priorityFilter !== 'all') {
            filtered = filtered.filter((taskItem) => taskItem.priority === Number(priorityFilter));
        }

        if (sortFilter !== 'all') {
            const [sortBy, sortOrder] = sortFilter.split('-');
            filtered = filtered.sort((a, b) => {
                const aTime = new Date(a[sortBy]);
                const bTime = new Date(b[sortBy]);
                return sortOrder === 'asc' ? aTime - bTime : bTime - aTime;
            });
        }

        if (searchTerm.trim() !== '') {
            const lowerCaseSearch = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (taskItem) =>
                    taskItem.title?.toLowerCase().includes(lowerCaseSearch) 
            );
        }

        setFilteredTasks(filtered);
    }, [statusFilter, priorityFilter, tasks, sortFilter, searchTerm]);

    const handleAddButton = () => {
        navigate('/createTask');
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="taskList p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-700 text-center">Task Manager</h1>
            <div className="addTask-filter flex flex-wrap gap-4 justify-between items-center">
                <div className="addTask">
                    <button
                        onClick={handleAddButton}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        + Add Task
                    </button>
                </div>
                <div className="filters flex flex-wrap gap-4">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                    >
                        <option value="all">All Status</option>
                        <option value="finished">Finished</option>
                        <option value="pending">Pending</option>
                    </select>

                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                    >
                        <option value="all">All Priority</option>
                        {[1, 2, 3, 4, 5].map((priority) => (
                            <option key={priority} value={priority}>
                                Priority {priority}
                            </option>
                        ))}
                    </select>

                    <select
                        value={sortFilter}
                        onChange={(e) => setSortFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                    >
                        <option value="all">Sort</option>
                        <option value="startTime-asc">Start time: ASC</option>
                        <option value="startTime-desc">Start time: DESC</option>
                        <option value="endTime-asc">End time: ASC</option>
                        <option value="endTime-desc">End time: DESC</option>
                    </select>
                </div>
            </div>
            <div className="taskblocks">
                {isLoading ? (
                    <p className="text-center text-lg text-gray-500">Loading tasks...</p>
                ) : filteredTasks.length > 0 ? (
                    <>
                        <p className="text-center text-lg text-gray-700">
                            Showing {filteredTasks.length} tasks.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredTasks.map((taskItem, index) => (
                                <TaskCard key={taskItem._id} task={taskItem} serialNumber={index + 1} />
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="text-center text-lg text-red-500">No tasks available.</p>
                )}
            </div>
            <div className="pagination flex justify-center gap-4 mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition flex items-center gap-2"
                >
                    <FaArrowLeft />
                    <span>Previous</span>
                </button>
                <span className="text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition flex items-center gap-2"
                >
                    <span>Next</span>
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
