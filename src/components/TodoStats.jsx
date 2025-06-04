import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, ListTodo } from 'lucide-react';

const TodoStats = ({ stats, filter, setFilter }) => {
  const { theme } = useTheme();

  const filters = [
    { id: 'all', label: 'All', count: stats.total, icon: ListTodo },
    { id: 'active', label: 'Active', count: stats.active, icon: Circle },
    { id: 'completed', label: 'Completed', count: stats.completed, icon: CheckCircle },
  ];

  return (
    <div className="mb-6">
      <div className={`grid grid-cols-3 gap-4 p-4 rounded-lg ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
      }`}>
        {filters.map(({ id, label, count, icon: Icon }) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilter(id)}
            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
              filter === id
                ? theme === 'dark'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-500 text-white'
                : theme === 'dark'
                ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-5 h-5 mb-2" />
            <span className="text-sm font-medium">{label}</span>
            <span className="text-lg font-bold">{count}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TodoStats;