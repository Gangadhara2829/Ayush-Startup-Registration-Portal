import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function ApplicationForm(){
  const [form, setForm] = useState({
    startupName:'', founderName:'', contactNumber:'', email:'', state:'', city:'', sector:''
  });
  const [regCert, setRegCert] = useState(null);
  const [founderId, setFounderId] = useState(null);
  const [complianceDocs, setComplianceDocs] = useState([]);
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach(k => data.append(k, form[k]));
    if(regCert) data.append('registrationCertificate', regCert);
    if(founderId) data.append('founderId', founderId);
    for(let i=0;i<complianceDocs.length;i++) data.append('complianceDocs', complianceDocs[i]);

    try {
      await API.post('/startup/apply', data, { headers: {'Content-Type':'multipart/form-data'} });
      alert('Submitted');
      nav('/dashboard');
    } catch(err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Submission failed');
    }
  };

  return (
    <div>
      <div className="header"><div className="logo">AYUSH Startup Registration Portal</div></div>
      <div className="container">
        <h2>AYUSH Startup Registration Form</h2>
        <form onSubmit={submit}>
          <div className="form-row">
            <input placeholder="Startup Name" value={form.startupName} onChange={e=>setForm({...form, startupName: e.target.value})} />
            <input placeholder="Founder Name" value={form.founderName} onChange={e=>setForm({...form, founderName: e.target.value})} />
          </div>
          <div className="form-row">
            <input placeholder="Contact Number" value={form.contactNumber} onChange={e=>setForm({...form, contactNumber: e.target.value})} />
            <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
          </div>
          <div className="form-row">
            <input placeholder="State" value={form.state} onChange={e=>setForm({...form, state: e.target.value})} />
            <input placeholder="City" value={form.city} onChange={e=>setForm({...form, city: e.target.value})} />
          </div>
          <div className="form-row">
            <input placeholder="Sector" value={form.sector} onChange={e=>setForm({...form, sector: e.target.value})} />
          </div>

          <div className="form-row">
            <label style={{flex:1}}>
              Registration Certificate (PDF)
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e=>setRegCert(e.target.files[0])} />
            </label>
          </div>

          <div className="form-row">
            <label style={{flex:1}}>
              Founder Aadhaar/PAN (PDF/JPEG)
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e=>setFounderId(e.target.files[0])} />
            </label>
          </div>

          <div className="form-row">
            <label style={{flex:1}}>
              Compliance Documents (multiple)
              <input type="file" multiple onChange={e=>setComplianceDocs(e.target.files)} />
            </label>
          </div>

          <button className="button">Submit Application</button>
        </form>
      </div>
    </div>
  );
}
