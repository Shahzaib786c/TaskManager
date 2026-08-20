import Task from "../models/taskModel.js";

export async function createTask(req, res) {
    try {
        const { title, description, status, priority, dueDate } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            user: req.userId
        });

        res.status(201).json({
            message: "Task created Successfully!",
            task
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export async function getTasks(req, res) {
    try {
        const filter = { user: req.userId };

        if (req.query.status) {
            filter.status = req.query.status;
        }
        if (req.query.priority) {
            filter.priority = req.query.priority;
        }
        if (req.query.search) {
            filter.title = { $regex: req.query.search, $options: "i" };
        }

        const tasks = await Task.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            total: tasks.length,
            data: tasks
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export async function getTask(req, res) {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export async function updateTask(req, res) {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            req.body,
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export async function deleteTask(req, res) {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        res.status(200).json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export async function updateTaskStatus(req, res) {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                message: "Status is required"
            });
        }

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { status },
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}