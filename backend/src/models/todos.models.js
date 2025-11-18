import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    // New field for detailed description
    description: {
        type: String,
        trim: true,
        default: '', // Make it optional by setting a default empty string
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        // This is a reference to the User model
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // The name of the model to which we are linking
    },
}, {
    timestamps: true,
});

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;