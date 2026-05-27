import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login(){
  const [form,setForm] = useState({ email:'', password:'' });
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      nav('/dashboard');
    } catch(err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div>
      <div className="header"><div className="logo">AYUSH Startup Registration Portal</div></div>
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={submit}>
          <div className="form-row">
            <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
          </div>
          <div className="form-row">
            <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
          </div>
          <button className="button">Login</button>
        </form>
        <p className="small">New? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
}

