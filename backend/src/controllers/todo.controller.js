import Todo from "../models/todos.models.js";

export const getTodos = async (req , res) => {
    try {
        const todos = await Todo.find({ createdBy: req.user._id}).sort({ createdAt: -1 });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch todos", error: error.message });
    }
};

export const createTodo = async (req , res) => {
    const { title , description } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    try {
        const newTodo = await Todo.create({
            title,
            description,
            createdBy: req.user._id
        });
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: "Failed to create todo", error: error.message });
    }
}

export const updateTodo = async (req , res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        if (todo.createdBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to update this todo" });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id, 
            req.body,
            { new: true, runValidators: true }
        );
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: "Failed to update todo", error: error.message });
    }
}

export const deleteTodo = async (req , res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        if (todo.createdBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to delete this todo" });
        }
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete todo", error: error.message });
    }
}