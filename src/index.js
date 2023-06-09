import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserLoginContextStore from './contexts/userLoginContextStore';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserLoginContextStore>
    <App />
    </UserLoginContextStore>
  </React.StrictMode>
);


