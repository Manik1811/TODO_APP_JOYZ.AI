import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTheme } from '../context/ThemeContext';

const RichTextEditor = ({ value, onChange }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration issues with SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ],
  };

  if (!mounted) {
    return (
      <div 
        className={`min-h-[100px] p-4 border rounded-lg ${
          theme === 'dark' 
            ? 'bg-gray-700 border-gray-600 text-gray-300' 
            : 'bg-white border-gray-300 text-gray-700'
        }`}
      >
        Loading editor...
      </div>
    );
  }

  return (
    <div className={`rich-text-editor ${theme}`}>
      <style jsx="true">{`
        .rich-text-editor .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          border-color: ${theme === 'dark' ? '#4b5563' : '#e5e7eb'};
          background-color: ${theme === 'dark' ? '#374151' : '#f9fafb'};
        }
        
        .rich-text-editor .ql-container {
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          border-color: ${theme === 'dark' ? '#4b5563' : '#e5e7eb'};
          background-color: ${theme === 'dark' ? '#1f2937' : '#ffffff'};
          color: ${theme === 'dark' ? '#e5e7eb' : '#111827'};
          min-height: 100px;
        }
        
        .rich-text-editor .ql-editor {
          min-height: 100px;
        }
        
        .rich-text-editor .ql-editor.ql-blank::before {
          color: ${theme === 'dark' ? '#9ca3af' : '#9ca3af'};
          font-style: italic;
        }
        
        .rich-text-editor .ql-stroke {
          stroke: ${theme === 'dark' ? '#e5e7eb' : '#374151'};
        }
        
        .rich-text-editor .ql-fill {
          fill: ${theme === 'dark' ? '#e5e7eb' : '#374151'};
        }
        
        .rich-text-editor .ql-picker {
          color: ${theme === 'dark' ? '#e5e7eb' : '#374151'};
        }
      `}</style>
      <ReactQuill
        theme="snow"
        modules={modules}
        value={value}
        onChange={onChange}
        placeholder="What needs to be done?"
      />
    </div>
  );
};

export default RichTextEditor;