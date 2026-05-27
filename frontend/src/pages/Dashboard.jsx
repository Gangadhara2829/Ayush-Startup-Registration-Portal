import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  const [apps,setApps] = useState([]);
  useEffect(()=> {
    API.get('/startup/mine').then(res => setApps(res.data)).catch(()=> setApps([]));
  }, []);
  return (
    <div>
      <div className="header"><div className="logo">AYUSH Startup Registration Portal</div></div>
      <div className="container">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2>Dashboard</h2>
          <div>
            <Link to="/apply"><button className="button">Register Now</button></Link>
            <Link to="/profile" style={{marginLeft:8}}><button className="button">My Profile</button></Link>
          </div>
        </div>

        <h3>My Applications</h3>
        {apps.length === 0 && <p className="small">No applications yet.</p>}
        {apps.map(a => (
          <div className="card" key={a._id}>
            <strong>{a.startupName}</strong> — <span className="small">{a.sector} • {a.city}, {a.state}</span>
            <div className="small">Status: {a.status}</div>
            <div className="small">Submitted: {new Date(a.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

