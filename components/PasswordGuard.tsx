import React, { useState, useEffect } from 'react';
import configBuzz from '../configBuzz.json';

interface PasswordGuardProps {
  children: React.ReactNode;
}

const PasswordGuard: React.FC<PasswordGuardProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const HOST_PASSWORD = configBuzz.HOST_PASSWORD || "1234";

  useEffect(() => {
    const authStatus = sessionStorage.getItem('host_auth');
    if (authStatus === 'true') {
      setIsAuthorized(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    if (passwordInput === HOST_PASSWORD) {
      sessionStorage.setItem('host_auth', 'true');
      setIsAuthorized(true);
    } else {
      alert("Wrong password!");
    }
  };

  if (isLoading) return null; // Prevent "blinking" during check

  if (!isAuthorized) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 font-sans">
        <div className="bg-slate-900 p-10 rounded-3xl border border-slate-800 shadow-2xl text-center">
          <h2 className="text-white text-2xl font-bold mb-6">🔒 Host Access</h2>
          <input 
            type="password" 
            autoFocus
            className="bg-slate-800 text-white p-4 rounded-xl block mb-4 w-64 border-2 border-transparent focus:border-indigo-500 outline-none text-center"
            placeholder="Enter Password"
            onChange={(e) => setPasswordInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button 
            onClick={handleLogin}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all"
          >
            Unlock System
          </button>
        </div>
      </div>
    );
  }

  // If authorized, render the actual app
  return <>{children}</>;
};

export default PasswordGuard;