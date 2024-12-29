const Task = require("../models/Task");

const createTask = async (req, res) => {
    try {
        const { title, startTime, endTime, priority, status } = req.body;
        const newTask = await Task.create({
            title,
            startTime,
            endTime,
            priority,
            status,
            userId: req.user.id,
        });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getTasks = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        const tasks = await Task.find({ userId: req.user.id })
            .skip((pageNumber - 1) * limitNumber) 
            .limit(limitNumber); 

        const totalTasks = await Task.countDocuments({ userId: req.user.id });
        const totalPages = Math.ceil(totalTasks / limitNumber); 
        
        res.status(200).json({
            tasks,
            totalTasks,
            totalPages,
            currentPage: pageNumber,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Task deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getTaskStats = async (req, res) => {
    try {
        const totalTasks = await Task.countDocuments();
        const completedTasks = await Task.countDocuments({ status: "finished" });
        const pendingTasks = totalTasks - completedTasks;

        const completedTaskData = await Task.aggregate([
            { $match: { status: "finished" } },
            { $project: { timeTaken: { $subtract: ["$endTime", "$startTime"] } } },
            { $group: { _id: null, avgTime: { $avg: "$timeTaken" } } },
        ]);

        const avgTimeToComplete = completedTaskData.length
            ? completedTaskData[0].avgTime / (1000 * 60 * 60) // convert ms to hours
            : 0;

        res.json({
            totalTasks,
            completedTasks,
            pendingTasks,
            avgTimeToComplete,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask, getTaskStats, getTask };
