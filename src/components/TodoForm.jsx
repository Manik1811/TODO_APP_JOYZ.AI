import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import RichTextEditor from './RichTextEditor';
import { PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import EmojiPicker from 'emoji-picker-react';

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low', color: 'bg-blue-500' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
  { value: 'high', label: 'High', color: 'bg-red-500' }
];

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { theme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    const newTodo = {
      id: Date.now(),
      title,
      description,
      priority,
      completed: false,
      createdAt: new Date().toISOString()
    };

    addTodo(newTodo);
    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  const onEmojiClick = (emojiData) => {
    setTitle(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label 
            htmlFor="title" 
            className={`block mb-2 font-medium ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}
          >
            Task Title
          </label>
          <div className="relative">
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white border-gray-600'
                  : 'bg-white text-gray-900 border-gray-300'
              } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
              placeholder="What needs to be done?"
            />
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl"
            >
              😊
            </button>
            {showEmojiPicker && (
              <div className="absolute right-0 mt-2 z-50">
                <EmojiPicker onEmojiClick={onEmojiClick} theme={theme} />
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label 
            htmlFor="description" 
            className={`block mb-2 font-medium ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}
          >
            Description (optional)
          </label>
          <RichTextEditor value={description} onChange={setDescription} />
        </div>
        
        <div className="mb-4">
          <label 
            className={`block mb-2 font-medium ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}
          >
            Priority
          </label>
          <div className="flex space-x-2">
            {PRIORITY_OPTIONS.map(option => (
              <motion.button
                key={option.value}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPriority(option.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  priority === option.value
                    ? `${option.color} text-white ring-2 ring-offset-2 ${theme === 'dark' ? 'ring-offset-gray-800' : 'ring-offset-white'}`
                    : `${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} hover:${option.color} hover:text-white`
                }`}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>
        
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full flex items-center justify-center py-2 px-4 rounded-lg font-medium transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-purple-500 hover:bg-purple-600 text-white'
          }`}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Task
        </motion.button>
      </form>
    </motion.div>
  );
};

export default TodoForm;