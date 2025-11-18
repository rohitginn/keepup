import express from "express";
import { getTodos, createTodo, updateTodo, deleteTodo} from "../controllers/todo.controller.js"
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

// Route for /api/todos (GET and POST)
router.route('/')
    .get(protect, getTodos)
    .post(protect, createTodo);

// Route for /api/todos/:id (PUT and DELETE)
router.route('/:id')
    .put(protect, updateTodo)
    .delete(protect, deleteTodo);

export default router;