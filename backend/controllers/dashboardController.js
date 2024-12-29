const Task = require("../models/Task");

const getDashboardStats = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });

        const totalTasks = tasks.length;

        const completedTasks = tasks.filter((task) => task.status === "finished");
        const pendingTasks = tasks.filter((task) => task.status === "pending");

        const completedCount = completedTasks.length;
        const pendingCount = pendingTasks.length;

        const completedPercentage = (completedCount / totalTasks) * 100;
        const pendingPercentage = (pendingCount / totalTasks) * 100;

        const timeLapsedAndBalance = { priority: {} };
        pendingTasks.forEach((task) => {
            const currentTime = Date.now();
            const startTime = new Date(task.startTime).getTime();
            const endTime = new Date(task.endTime).getTime();

            let timeLapsed = currentTime - startTime;
            if (timeLapsed < 0) timeLapsed = 0; 

            let balanceTime = endTime - currentTime;
            if (balanceTime < 0) balanceTime = 0;

            if (!timeLapsedAndBalance.priority[task.priority]) {
                timeLapsedAndBalance.priority[task.priority] = {
                    timeLapsed: 0,
                    balanceTime: 0,
                };
            }

            timeLapsedAndBalance.priority[task.priority].timeLapsed += timeLapsed;
            timeLapsedAndBalance.priority[task.priority].balanceTime += balanceTime;
        });

        Object.keys(timeLapsedAndBalance.priority).forEach((priority) => {
            timeLapsedAndBalance.priority[priority].timeLapsed =
                timeLapsedAndBalance.priority[priority].timeLapsed / (1000 * 60 * 60); 
            timeLapsedAndBalance.priority[priority].balanceTime =
                timeLapsedAndBalance.priority[priority].balanceTime / (1000 * 60 * 60); 
        });

        const totalActualTime = completedTasks.reduce((acc, task) => {
            const startTime = new Date(task.startTime).getTime();
            const endTime = new Date(task.endTime).getTime();
            return acc + (endTime - startTime);
        }, 0);

        const averageActualTime =
            completedCount > 0 ? totalActualTime / completedCount / (1000 * 60 * 60) : 0; 

        res.json({
            totalTasks,
            completedPercentage,
            pendingPercentage,
            timeLapsedAndBalance,
            averageActualTime,
        });
    } catch (error) {
        res.status(500).json({ message: "Error calculating dashboard stats" });
    }
};

module.exports = { getDashboardStats };
