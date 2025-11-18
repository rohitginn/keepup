import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/authContextAndApi'
import { api } from '../context/authContextAndApi'
import toast from 'react-hot-toast'
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Check, 
  X, 
  LogOut, 
  ListTodo,
  Search,
  CheckCircle2,
  Circle,
  ListIcon,
  ListChecks
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const TodoAppPage = () => {
  const { user, logout } = useAuth()
  const [todos, setTodos] = useState([])
  const [filteredTodos, setFilteredTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [filter, setFilter] = useState('all') // 'all', 'active', 'completed'
  const [searchQuery, setSearchQuery] = useState('')
  
  // Form states
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const { data } = await api.get('/todos')
      setTodos(data)
      setIsLoading(false)
    } catch (error) {
      toast.error('Failed to fetch todos')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // Filter and search todos
  useEffect(() => {
    let filtered = todos

    // Apply filter
    if (filter === 'active') {
      filtered = filtered.filter(todo => !todo.completed)
    } else if (filter === 'completed') {
      filtered = filtered.filter(todo => todo.completed)
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(todo => 
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredTodos(filtered)
  }, [todos, filter, searchQuery])

  // Add new todo
  const handleAddTodo = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      toast.error('Title is required')
      return
    }

    try {
      const { data } = await api.post('/todos', { title, description })
      setTodos([data, ...todos])
      setTitle('')
      setDescription('')
      setIsAdding(false)
      toast.success('Todo added successfully!')
    } catch (error) {
      toast.error('Failed to add todo')
    }
  }

  // Update todo completion status
  const handleToggleComplete = async (id, currentStatus) => {
    try {
      const { data } = await api.put(`/todos/${id}`, { completed: !currentStatus })
      setTodos(todos.map(todo => todo._id === id ? data : todo))
      toast.success(currentStatus ? 'Todo marked as incomplete' : 'Todo completed!')
    } catch (error) {
      toast.error('Failed to update todo')
    }
  }

  // Update todo
  const handleUpdateTodo = async (id) => {
    if (!editTitle.trim()) {
      toast.error('Title is required')
      return
    }

    try {
      const { data } = await api.put(`/todos/${id}`, { 
        title: editTitle, 
        description: editDescription 
      })
      setTodos(todos.map(todo => todo._id === id ? data : todo))
      setEditingId(null)
      setEditTitle('')
      setEditDescription('')
      toast.success('Todo updated successfully!')
    } catch (error) {
      toast.error('Failed to update todo')
    }
  }

  // Delete todo
  const handleDeleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`)
      setTodos(todos.filter(todo => todo._id !== id))
      toast.success('Todo deleted successfully!')
    } catch (error) {
      toast.error('Failed to delete todo')
    }
  }

  // Start editing
  const startEditing = (todo) => {
    setEditingId(todo._id)
    setEditTitle(todo.title)
    setEditDescription(todo.description || '')
  }

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null)
    setEditTitle('')
    setEditDescription('')
  }

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Get statistics
  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length
  }

  return (
    <div className="min-h-screen bg-linear-to-br font-geist from-gray-950 via-gray-900 to-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 font-inter bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <ListTodo className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">KeepUp</h1>
              <p className="text-sm text-gray-400">Stay focused, stay productive</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Welcome back,</p>
              <p className="text-white font-medium">{user?.username}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Tasks</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <ListChecks className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active</p>
                <p className="text-3xl font-bold text-blue-400 mt-1">{stats.active}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Circle className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-3xl font-bold text-green-400 mt-1">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search todos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                  filter === f
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 border border-gray-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Add Todo Form */}
        {isAdding ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
          >
            <form onSubmit={handleAddTodo} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Todo title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  autoFocus
                />
              </div>
              <div>
                <textarea
                  placeholder="Description (optional)..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Todo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false)
                    setTitle('')
                    setDescription('')
                  }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full mb-6 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg transition-all shadow-lg shadow-indigo-500/20"
          >
            <Plus className="w-5 h-5" />
            Add New Todo
          </button>
        )}

        {/* Todos List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-700 border-t-indigo-500"></div>
            <p className="text-gray-400 mt-4">Loading todos...</p>
          </div>
        ) : filteredTodos.length === 0 ? (
          <div className="text-center py-12 bg-gray-800/30 border border-gray-700 rounded-xl">
            <ListTodo className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              {searchQuery ? 'No todos found matching your search' : 'No todos yet. Add one to get started!'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filteredTodos.map((todo) => (
                <motion.div
                  key={todo._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className={`bg-gray-800/50 backdrop-blur-sm border rounded-xl p-4 transition-all ${
                    todo.completed
                      ? 'border-green-500/30 bg-green-500/5'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {editingId === todo._id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        autoFocus
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        rows="2"
                        className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateTodo(todo._id)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-green-500/85 hover:bg-green-600 text-white rounded-lg transition-colors text-sm"
                        >
                          <Check className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => handleToggleComplete(todo._id, todo.completed)}
                        className={`mt-1 transition-all ${
                          todo.completed ? 'text-green-400' : 'text-gray-500 hover:text-indigo-400'
                        }`}
                      >
                        {todo.completed ? (
                          <CheckCircle2 className="w-6 h-6 " />
                        ) : (
                          <Circle className="w-6 h-6 " />
                        )}
                      </button>
                      <div className="flex-1">
                        <h3
                          className={`text-lg font-semibold ${
                            todo.completed
                              ? 'text-gray-500 line-through'
                              : 'text-white'
                          }`}
                        >
                          {todo.title}
                        </h3>
                        {todo.description && (
                          <p
                            className={`mt-1 text-sm ${
                              todo.completed ? 'text-gray-600' : 'text-gray-400'
                            }`}
                          >
                            {todo.description}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                           {new Date(todo.updatedAt).toLocaleTimeString()}, {new Date(todo.createdAt).toLocaleDateString()}
                        </p>
              
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditing(todo)}
                          className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-blue-400"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTodo(todo._id)}
                          className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  )
}

export default TodoAppPage
