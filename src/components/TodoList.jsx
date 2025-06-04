import React from 'react';
import TodoItem from './TodoItem';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const TodoList = ({ todos, deleteTodo, toggleComplete, updateTodo }) => {
  const { theme } = useTheme();

  // Group todos by priority
  const priorityGroups = {
    high: todos.filter(todo => todo.priority === 'high'),
    medium: todos.filter(todo => todo.priority === 'medium'),
    low: todos.filter(todo => todo.priority === 'low')
  };

  return (
    <div>
      {todos.length > 0 && (
        <h2 className={`text-xl font-semibold mb-4 ${
          theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Your Tasks
        </h2>
      )}

      {Object.entries(priorityGroups).map(([priority, priorityTodos]) => (
        priorityTodos.length > 0 && (
          <div key={priority} className="mb-6">
            <h3 className={`text-sm font-medium mb-2 flex items-center ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                priority === 'high' ? 'bg-red-500' : 
                priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
              }`}></span>
              {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
            </h3>
            <AnimatePresence>
              <motion.ul 
                className={`space-y-3 ${
                  theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'
                }`}
              >
                {priorityTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    deleteTodo={deleteTodo}
                    toggleComplete={toggleComplete}
                    updateTodo={updateTodo}
                  />
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        )
      ))}
    </div>
  );
};

export default TodoList;