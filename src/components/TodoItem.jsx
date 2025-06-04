import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Trash2, Edit, Check, X, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import RichTextEditor from './RichTextEditor';

const TodoItem = ({ todo, deleteTodo, toggleComplete, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [editedPriority, setEditedPriority] = useState(todo.priority);
  const { theme } = useTheme();

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleSave = () => {
    updateTodo(todo.id, {
      title: editedTitle,
      description: editedDescription,
      priority: editedPriority
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
    setEditedPriority(todo.priority);
    setIsEditing(false);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-blue-500'
    };
    return colors[priority] || colors.medium;
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
  };

  return (
    <motion.li
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className={`p-4 rounded-lg transition-all duration-300 relative ${
        theme === 'dark' 
          ? 'bg-gray-700 hover:bg-gray-650' 
          : 'bg-white hover:bg-gray-50 border border-gray-200'
      } ${todo.completed ? 'opacity-70' : ''}`}
    >
      <div className="flex items-start space-x-3">
        <button
          onClick={() => toggleComplete(todo.id)}
          className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 ${
            todo.completed
              ? `${theme === 'dark' ? 'bg-purple-500 border-purple-600' : 'bg-purple-500 border-purple-600'}`
              : `${theme === 'dark' ? 'border-gray-400' : 'border-gray-400'}`
          } transition-colors duration-200`}
        >
          {todo.completed && <Check className="w-4 h-4 text-white" />}
        </button>

        <div className="flex-grow">
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg mb-2 ${
                  theme === 'dark'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              />
              <RichTextEditor value={editedDescription} onChange={setEditedDescription} />
              
              <div className="mt-3 flex space-x-2">
                {['low', 'medium', 'high'].map(priority => (
                  <button
                    key={priority}
                    type="button"
                    onClick={() => setEditedPriority(priority)}
                    className={`px-2 py-1 rounded-full text-xs ${
                      editedPriority === priority
                        ? `${getPriorityColor(priority)} text-white`
                        : `${theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'}`
                    }`}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </button>
                ))}
                
                <div className="ml-auto flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSave}
                    className={`p-1 rounded ${
                      theme === 'dark' ? 'bg-green-600 text-white' : 'bg-green-500 text-white'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCancel}
                    className={`p-1 rounded ${
                      theme === 'dark' ? 'bg-red-600 text-white' : 'bg-red-500 text-white'
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h3 
                className={`text-lg font-medium mb-1 ${
                  todo.completed ? 'line-through opacity-70' : ''
                } ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              >
                {todo.title}
              </h3>
              
              {todo.description && (
                <div 
                  className={`mb-2 ${todo.completed ? 'line-through opacity-70' : ''} ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                  dangerouslySetInnerHTML={{ __html: todo.description }}
                />
              )}
              
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span 
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                    getPriorityColor(todo.priority)
                  } text-white`}
                >
                  {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                </span>
                
                <span className={`inline-flex items-center text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <Clock className="w-3 h-3 mr-1" />
                  {formatDate(todo.createdAt)}
                </span>
                
                <div className="ml-auto flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsEditing(true)}
                    className={`p-1 rounded ${
                      theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                    disabled={todo.completed}
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteTodo(todo.id)}
                    className={`p-1 rounded ${
                      theme === 'dark' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.li>
  );
};

export default TodoItem;