import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoStats from './TodoStats';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const TodoContainer = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [];
  });
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const { theme } = useTheme();

  // Save todos to localStorage when they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    if (!todo.title.trim()) return;
    setTodos([todo, ...todos]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`rounded-xl p-6 shadow-lg ${
        theme === 'dark' 
          ? 'bg-gray-800 shadow-purple-900/20' 
          : 'bg-white shadow-purple-300/30'
      }`}
    >
      <TodoForm addTodo={addTodo} />
      <TodoStats stats={stats} filter={filter} setFilter={setFilter} />
      <TodoList
        todos={filteredTodos}
        deleteTodo={deleteTodo}
        toggleComplete={toggleComplete}
        updateTodo={updateTodo}
      />

      {filteredTodos.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`text-center py-8 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          <p className="text-lg">No tasks found</p>
          <p className="text-sm mt-2">
            {filter === 'all' 
              ? 'Add a new task to get started'
              : `No ${filter} tasks`}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TodoContainer;