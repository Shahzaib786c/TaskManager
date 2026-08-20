import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: false,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters'],
        default: ""
    },
    status: {
        type: String,
        required: false,
        enum: {
            values: ['pending', 'in-progress', 'completed'],
            message: 'Status must be pending, in-progress, or completed'
        },
        default: 'pending'
    },
    priority: {
        type: String,
        required: false,
        enum: {
            values: ['low', 'medium', 'high'],
            message: 'Priority must be low, medium, or high'
        },
        default: 'medium'
    },
    dueDate: {
        type: Date,
        default: null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    }
}, {
    timestamps: true
});

taskSchema.index({ user: 1, createdAt: -1 });
taskSchema.index({ user: 1, status: 1 });

export default mongoose.model("Task", taskSchema);