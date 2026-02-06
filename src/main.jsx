import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import AuthProvider from './authcontext/authcontext.jsx';
import EmployeeProvider from './authcontext/employeefetchcontext.jsx';
import LeavesProvider from './authcontext/leavesContext.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
    <EmployeeProvider>
      <LeavesProvider>
    <App />
    </LeavesProvider>
    </EmployeeProvider>
  </AuthProvider>
  </BrowserRouter>
);
