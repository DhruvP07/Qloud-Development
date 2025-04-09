const { default: mongoose } = require("mongoose");
const Task = require("../models/Task");

const createTask = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { title, description, date } = req.body;

        const newTask = new Task({
            userId,
            title,
            description,
            date: date? new Date(date) : new Date(),
            completed: false,
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

const getTasks = async (req, res) => {
    try {
        const { _id: userId } = req.user;

        //Get all tasks grouped by date
        const tasks = await Task.aggregate([
            { $match: { userId : new mongoose.Types.ObjectId("67f286ddf78b8b9ce86e7bd7") } },
            {
                $group : {
                _id : {$dateToString : {date : "$date" , format : "%d-%m-%Y"}},
                tasks: { $push: "$$ROOT" }
                }
            }
        ]);

        // const tasks = await Task.find({userId});
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title, description, completed, date } = req.body;
        const { _id: userId } = req.user;

        const updateFields = {}; // Store only provided fields

        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (completed) updateFields.completed = completed;
        if (date) updateFields.date = new Date(date);

        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, userId },
            updateFields,
            { new: true }
        );

        if (!updatedTask) return res.status(404).json({ error: "Task not found or unauthorized" });

        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { _id: userId } = req.user;

        const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId });

        if (!deletedTask) return res.status(404).json({ error: "Task not found or unauthorized" });

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask }