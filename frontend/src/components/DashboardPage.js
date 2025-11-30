import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    startupName: '',
    sector: '',
    founderName: '',
    contactNumber: '',
  });

  // ---------------- FETCH PROFILE ----------------
  useEffect(() => {
    const fetchStartupData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const config = { headers: { 'x-auth-token': token } };

        // ✅ Correct API endpoint
        const res = await axios.get(
          `${API_BASE_URL}/api/dashboard/profile`,
          config
        );

        const data = res.data || {};

        setStartup(data);

        // Pre-fill form for edit mode
        setFormData({
          startupName: data.startupName || '',
          sector: data.sector || '',
          founderName: data.founderName || '',
          contactNumber: data.contactNumber || '',
        });
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchStartupData();
  }, [navigate]);

  // ---------------- EDIT HANDLERS ----------------
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const config = {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify(formData);

      // ✅ Correct API endpoint for update
      const res = await axios.put(
        `${API_BASE_URL}/api/dashboard/profile`,
        body,
        config
      );

      const updated = res.data || {};

      setStartup(updated);
      setFormData({
        startupName: updated.startupName || '',
        sector: updated.sector || '',
        founderName: updated.founderName || '',
        contactNumber: updated.contactNumber || '',
      });

      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    if (!startup) {
      setIsEditing(false);
      return;
    }
    // reset form back to original startup data
    setFormData({
      startupName: startup.startupName || '',
      sector: startup.sector || '',
      founderName: startup.founderName || '',
      contactNumber: startup.contactNumber || '',
    });
    setIsEditing(false);
  };

  // ---------------- RENDER ----------------
  if (loading) {
    return <div>Loading your profile...</div>;
  }

  if (!startup) {
    return <div>Could not load profile. Please try logging in again.</div>;
  }

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <nav className="dashboard-sidebar-nav">
          <Link to="/dashboard" className="active">
            My Profile
          </Link>
          <Link to="/my-application">My Application</Link>
          <Link to="/status">Status</Link>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="profile-card">
          <div className="profile-header">
            <h2>My Profile</h2>

            {!isEditing ? (
              <button
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            ) : (
              <div className="edit-actions">
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="profile-details">
            {isEditing ? (
              <>
                <p>
                  <strong>Startup Name:</strong>
                  <input
                    type="text"
                    name="startupName"
                    value={formData.startupName}
                    onChange={handleInputChange}
                    className="profile-input"
                  />
                </p>
                <p>
                  <strong>Sector:</strong>
                  <input
                    type="text"
                    name="sector"
                    value={formData.sector}
                    onChange={handleInputChange}
                    className="profile-input"
                  />
                </p>
                <p>
                  <strong>Founder Name:</strong>
                  <input
                    type="text"
                    name="founderName"
                    value={formData.founderName}
                    onChange={handleInputChange}
                    className="profile-input"
                  />
                </p>
                <p>
                  <strong>Contact Number:</strong>
                  <input
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="profile-input"
                  />
                </p>
                <p>
                  <strong>Email:</strong> {startup.email}{' '}
                  <small>(cannot be changed)</small>
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>Startup Name:</strong> {startup.startupName || '-'}
                </p>
                <p>
                  <strong>Sector:</strong> {startup.sector || '-'}
                </p>
                <p>
                  <strong>Founder Name:</strong>{' '}
                  {startup.founderName || '-'}
                </p>
                <p>
                  <strong>Contact Number:</strong>{' '}
                  {startup.contactNumber || '-'}
                </p>
                <p>
                  <strong>Email:</strong> {startup.email || '-'}
                </p>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
