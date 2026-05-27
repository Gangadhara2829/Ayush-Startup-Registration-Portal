import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register(){
  const [form, setForm] = useState({ name:'', email:'', phone:'', password:'' });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      nav('/dashboard');
    } catch(err) {
      alert(err.response?.data?.msg || 'Error');
    }
  };
  return (
    <div>
      <div className="header">
        <div className="logo">AYUSH Startup Registration Portal</div>
      </div>
      <div className="container">
        <h2>Register</h2>
        <form onSubmit={submit}>
          <div className="form-row">
            <input placeholder="Full Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
            <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
          </div>
          <div className="form-row">
            <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
            <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
          </div>
          <button className="button">Register</button>
        </form>
        <p className="small">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

