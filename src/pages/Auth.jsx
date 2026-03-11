import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (isLogin) {
      const res = await login(username, password);
      if (res.success) {
        navigate('/admin');
      } else {
        setError(res.message);
      }
    } else {
      // Registration not implemented in this demo iteration
      setError('Registration is disabled. Please contact support.');
    }
  };

  return (
    <div className="auth-page animate-fade-in">
      <div className="auth-container card-clean">
        <div className="auth-header">
           <h2>{isLogin ? 'Admin Access' : 'Create Account'}</h2>
           <p className="text-muted">
             {isLogin ? 'Sign in with your admin credentials to manage services.' : 'Join Coolex AC Solution for premium cooling services.'}
           </p>
        </div>

        {error && (
          <div className="error-alert mb-4">
            <AlertCircle size={16} /> <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <div className="input-icon-wrapper">
                <User size={18} className="input-icon" />
                <input type="text" className="input-field with-icon" placeholder="John Doe" />
              </div>
            </div>
          )}
          
          <div className="input-group">
            <label className="input-label">{isLogin ? 'Username / Email' : 'Email Address'}</label>
            <div className="input-icon-wrapper">
              <Mail size={18} className="input-icon" />
              <input 
                type="text" 
                className="input-field with-icon" 
                placeholder={isLogin ? "Enter username (admin)" : "you@example.com"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="input-icon-wrapper">
              <Lock size={18} className="input-icon" />
              <input 
                 type="password" 
                 className="input-field with-icon" 
                 placeholder="••••••••" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required 
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            {isLogin ? 'Sign In' : 'Register'} <ArrowRight size={18} />
          </button>
        </form>

        <div className="auth-footer">
           <p className="text-muted">
             {isLogin ? "Need access?" : "Already have an account?"}
             <button type="button" className="text-btn" onClick={() => setIsLogin(!isLogin)}>
               {isLogin ? ' Contact Support' : ' Sign In'}
             </button>
           </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
