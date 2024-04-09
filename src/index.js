import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {PostContextProvider} from './context/PostsContext';
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <PostContextProvider>
    <App />
    </PostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
