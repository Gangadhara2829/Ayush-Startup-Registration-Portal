import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Profile(){
  const [user, setUser] = useState(null);
  useEffect(()=> {
    // simple approach: token contains user id? we'll show email from backend via a protected call if you add a /me endpoint.
    // For now show token presence and localStorage data
    const token = localStorage.getItem('token');
    setUser({ email: token ? 'Logged in' : 'Not logged in' });
  }, []);
  return (
    <div>
      <div className="header"><div className="logo">AYUSH Startup Registration Portal</div></div>
      <div className="container">
        <h2>My Profile</h2>
        <div className="card">
          <div><strong>Email</strong>: {user?.email}</div>
        </div>
      </div>
    </div>
  );
}
