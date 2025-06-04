import React, { useEffect } from 'react';
import TodoContainer from './components/TodoContainer';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './context/ThemeContext';
import CustomCursor from './components/CustomCursor';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

function App() {
  const { theme } = useTheme();

  // Set body class based on theme
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <CustomCursor />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <Sparkles className={`w-8 h-8 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
              <h1 className={`text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                TaskVibe
              </h1>
            </motion.div>
            <ThemeToggle />
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Organize your tasks with style and vibes ✨
          </motion.p>
        </header>
        
        <main>
          <TodoContainer />
        </main>
      </div>
    </div>
  );
}

export default App;